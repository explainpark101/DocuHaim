import {
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Check, Paperclip, Pencil, Send, X, FileText, Folder } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { Compartment, StateEffect } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import ChatNavSwitch from '@/components/chatWithMyself/ui/ChatNavSwitch';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import { useChatImageLightbox } from '@/components/chatWithMyself/ChatImageLightbox';
import ChatImageFade from '@/components/chatWithMyself/ChatImageFade';
import { chatComposerAreaMaxHeight } from '@/components/chatWithMyself/ChatComposerDock';
import PromptModal from '@/components/shared/modals/PromptModal';
import {
  ADD_GROUP_VALUE,
  SELF_GROUP,
  sortGroupsKo,
  resolveGroupLabel,
  extractUrls,
  formatMessageTime,
  formatMessageDateLabel,
  detectTimeZone,
  readComposerDraftMeta,
  writeComposerDraftMeta,
  clearComposerDraft,
  syncComposerDraftImages,
  loadComposerDraftImageQueue,
  isChatImageFile,
  formatChatAttachmentSize,
  extractChatBodyAttachments,
  chatAttachmentsToMarkdown,
  getComposerHelperTextVisible,
  writeComposerHelperTextPref,
  isChatMessageMarkdown,
  looksLikeMarkdown,
  isSafariBrowser,
} from '@/utils/chatWithMyself';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { registerChatActions } from '@/utils/advancedSearch/chatActions';
import { useDocumentTheme } from '@/hooks/useDocumentTheme';

const ChatComposerMdEditor = lazy(
  () => import('@/components/chatWithMyself/ChatComposerMdEditor'),
);

const COMPOSER_MIN_H = 40;
const COMPOSER_MAX_H = 200;

/** CSS height transition — avoids nested Motion height fighting the dock autoFit. */
const EDITOR_HEIGHT_CSS_TRANSITION =
  'height 0.28s cubic-bezier(0.22, 1, 0.36, 1)';

function imageBackgroundsFromQueue(queue: any) {
  const out = {};
  for (const item of queue || []) {
    if (!item?.id || !item.background) continue;
    // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    out[item.id] = item.background;
  }
  return out;
}

function applyDraftBackgrounds(items: any, backgrounds: any) {
  if (!backgrounds || typeof backgrounds !== 'object') return items;
  return (items || []).map((item: any) => ({
    ...item,
    background: backgrounds[item.id] || item.background || null
  }));
}

function getComposerContentMaxH({ editing = false } = {}) {
  if (typeof window === 'undefined') {
    return editing ? 480 : COMPOSER_MAX_H;
  }
  if (editing) {
    // Match dock max (70% of message column) minus edit banner / group / padding.
    return Math.max(COMPOSER_MIN_H, chatComposerAreaMaxHeight() - 120);
  }
  const vvH = window.visualViewport?.height ?? window.innerHeight;
  // Keep room for chat nav, status bar, group row, and reply chrome.
  const capped = Math.floor(vvH * 0.28);
  return Math.max(COMPOSER_MIN_H, Math.min(COMPOSER_MAX_H, capped));
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () =>
      setCoarse(mq.matches || window.innerWidth < 768);
    mq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);
  return coarse;
}

/** macOS / iOS / iPadOS — Cmd is the primary modifier. */
function isApplePlatform() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  if (/iPhone|iPad|iPod/i.test(ua) || /iPhone|iPad|iPod/i.test(platform)) return true;
  if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return true;
  return false;
}

function measureComposerHeight(root: any, contentMaxH = COMPOSER_MAX_H) {
  if (!root) return COMPOSER_MIN_H;
  const textarea = root.querySelector(
    'textarea[data-chat-composer-textarea]',
  );
  if (textarea) {
    const prev = textarea.style.height;
    textarea.style.height = 'auto';
    const contentH = Math.min(
      contentMaxH,
      Math.max(COMPOSER_MIN_H, Math.ceil(textarea.scrollHeight)),
    );
    textarea.style.height = prev || '100%';
    return contentH;
  }
  const toolbar =
    root.querySelector('.md-editor-toolbar-wrapper') ||
    root.querySelector('.md-editor-toolbar');
  const toolbarH = toolbar?.offsetHeight || 0;
  const content = root.querySelector('.cm-content');
  if (!content) return Math.max(COMPOSER_MIN_H, toolbarH + COMPOSER_MIN_H);
  const scroller = root.querySelector('.cm-scroller');
  const padY = scroller
    ? Math.max(
        0,
        (parseFloat(getComputedStyle(scroller).paddingTop) || 0) +
          (parseFloat(getComputedStyle(scroller).paddingBottom) || 0),
      )
    : 8;
  const contentH = Math.min(
    contentMaxH,
    Math.max(COMPOSER_MIN_H, Math.ceil(content.scrollHeight + padY)),
  );
  return toolbarH + contentH;
}

function makeQueueId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * @typedef {{
 *   enqueueFiles: (fileList: FileList | File[] | null | undefined) => Promise<void>,
 *   enqueueShareItems: (items: Array<{ kind: 'note'|'folder', path: string, name?: string }> | null | undefined) => void,
 * }} ChatComposerHandle
 */

const ChatComposer = forwardRef(function ChatComposer(
  {
    // @ts-expect-error TS(2339) FIXME: Property 'groups' does not exist on type '{}'.
    groups = [],
    // @ts-expect-error TS(2339) FIXME: Property 'selectedGroup' does not exist on type '{... Remove this comment to see the full error message
    selectedGroup,
    // @ts-expect-error TS(2339) FIXME: Property 'onSelectedGroupChange' does not exist on... Remove this comment to see the full error message
    onSelectedGroupChange,
    // @ts-expect-error TS(2339) FIXME: Property 'onAddGroup' does not exist on type '{}'.
    onAddGroup,
    // @ts-expect-error TS(2339) FIXME: Property 'onSend' does not exist on type '{}'.
    onSend,
    // @ts-expect-error TS(2339) FIXME: Property '_sending' does not exist on type '{}'.
    _sending = false,
    // @ts-expect-error TS(2339) FIXME: Property 'theme' does not exist on type '{}'.
    theme,
    // @ts-expect-error TS(2339) FIXME: Property 'replyTo' does not exist on type '{}'.
    replyTo = null,
    // @ts-expect-error TS(2339) FIXME: Property 'onClearReply' does not exist on type '{}... Remove this comment to see the full error message
    onClearReply,
    // @ts-expect-error TS(2339) FIXME: Property 'editTarget' does not exist on type '{}'.
    editTarget = null,
    // @ts-expect-error TS(2339) FIXME: Property 'onClearEdit' does not exist on type '{}'... Remove this comment to see the full error message
    onClearEdit,
    // @ts-expect-error TS(2339) FIXME: Property 'onSaveEdit' does not exist on type '{}'.
    onSaveEdit,
    // @ts-expect-error TS(2339) FIXME: Property 'ogStorage' does not exist on type '{}'.
    ogStorage = null,
    // @ts-expect-error TS(2339) FIXME: Property 'timeZone' does not exist on type '{}'.
    timeZone,
    // @ts-expect-error TS(2339) FIXME: Property 'getPresignedUrl' does not exist on type ... Remove this comment to see the full error message
    getPresignedUrl,
    /** When true, outer bar has no bg (parent paints full-bleed). */
    // @ts-expect-error TS(2339) FIXME: Property 'bare' does not exist on type '{}'.
    bare = false,
    // @ts-expect-error TS(2339) FIXME: Property 'showToolbar' does not exist on type '{}'... Remove this comment to see the full error message
    showToolbar = true,
    // @ts-expect-error TS(2339) FIXME: Property 'showLineNumbers' does not exist on type ... Remove this comment to see the full error message
    showLineNumbers = false,
    /** Prefer native textarea over MdEditor/CodeMirror (perf). */
    // @ts-expect-error TS(2339) FIXME: Property 'lightweight' does not exist on type '{}'... Remove this comment to see the full error message
    lightweight = false,
    /** Share-target (or similar) seed: replace compose body once consumed. */
    // @ts-expect-error TS(2339) FIXME: Property 'seedBody' does not exist on type '{}'.
    seedBody = null,
    // @ts-expect-error TS(2339) FIXME: Property 'onSeedConsumed' does not exist on type '... Remove this comment to see the full error message
    onSeedConsumed,
    /** Fill parent height (resizable dock); editor expands to remaining space. */
    // @ts-expect-error TS(2339) FIXME: Property 'fillParent' does not exist on type '{}'.
    fillParent = false,
    /** Storage-backend scope so drafts never cross S3 / Local / WebDAV. */
    // @ts-expect-error TS(2339) FIXME: Property 'draftScope' does not exist on type '{}'.
    draftScope = '',
    /** Focus the message input once when the chat composer becomes ready. */
    // @ts-expect-error TS(2339) FIXME: Property 'autoFocusOnMount' does not exist on type... Remove this comment to see the full error message
    autoFocusOnMount = true,
  },
  ref,
) {
  const [value, setValue] = useState('');
  const [markdownEnabled, setMarkdownEnabled] = useState(false);
  const [inlineAddOpen, setInlineAddOpen] = useState(false);
  const [inlineGroupName, setInlineGroupName] = useState('');
  const [addingGroup, setAddingGroup] = useState(false);
  const [editorHeight, setEditorHeight] = useState(COMPOSER_MIN_H);
  const [contentMaxH, setContentMaxH] = useState(() =>
    getComposerContentMaxH({ editing: Boolean(editTarget) }),
  );
  const [imageQueue, setImageQueue] = useState([]);
  const [draftReady, setDraftReady] = useState(false);
  const [showHelperText, setShowHelperText] = useState(() => getComposerHelperTextVisible());
  const [encryptPromptOpen, setEncryptPromptOpen] = useState(false);
  /** Markdown messages prefer MdEditor so toolbar formatting matches render. */
  const useLightweightEditor = lightweight && !markdownEnabled;
  const openChatImage = useChatImageLightbox();
  const wrapRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const inlineGroupInputRef = useRef(null);
  const valueRef = useRef(value);
  const markdownEnabledRef = useRef(markdownEnabled);
  /** When user turns Markdown off while markup remains, skip auto-enable until markup clears. */
  const markdownUserOffRef = useRef(false);
  /** Safari + lightweight: defer textarea→MdEditor until Space/Enter after markdown is detected. */
  const safariDeferMdEditor = lightweight && isSafariBrowser();
  const wasLightweightEditorRef = useRef(null);
  const imageQueueRef = useRef(imageQueue);
  const prevEditTargetRef = useRef(editTarget);
  const didAutofocusOnMountRef = useRef(false);
  const removedExistingPathsRef = useRef([]);
  const lineNumbersCompartmentRef = useRef(null);
  const lineNumbersViewsRef = useRef(new WeakSet());
  const appTheme = useDocumentTheme();
  const resolvedTheme = theme || appTheme;
  const isMobile = useIsCoarsePointer();
  const applePlatform = useMemo(() => isApplePlatform(), []);
  const sendModLabel = applePlatform ? 'Cmd+Enter' : 'Ctrl+Enter';
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);
  const tz = timeZone || detectTimeZone();
  const replyUrls = useMemo(
    () => (replyTo?.body ? extractUrls(replyTo.body) : []),
    [replyTo?.body],
  );
  const replyWhen = replyTo?.at
    ? `${formatMessageDateLabel(replyTo.at, tz)} ${formatMessageTime(replyTo.at, tz)}`
    : '';

  const groupOptions = useMemo(
    () => [
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g: any) => ({
        value: g.id,
        label: g.name,
        iconPath: g.iconPath
      })),
      { value: ADD_GROUP_VALUE, label: '직접추가' },
    ],
    [sortedGroups],
  );

  const groupSelectValue = inlineAddOpen
    ? ADD_GROUP_VALUE
    : selectedGroup || SELF_GROUP;

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    markdownEnabledRef.current = markdownEnabled;
  }, [markdownEnabled]);

  const setMarkdownFromUser = useCallback((next: any) => {
    const enabled = Boolean(next);
    markdownUserOffRef.current = !enabled;
    setMarkdownEnabled(enabled);
  }, []);

  const applyComposerValue = useCallback((next: any) => {
    const text = String(next ?? '');
    setValue(text);
    if (looksLikeMarkdown(text)) {
      // Safari lightweight: keep textarea until Space/Enter promotes to MdEditor.
      if (!markdownUserOffRef.current && !safariDeferMdEditor) {
        setMarkdownEnabled(true);
      }
    } else {
      markdownUserOffRef.current = false;
      setMarkdownEnabled(false);
    }
  }, [safariDeferMdEditor]);

  useEffect(() => {
    imageQueueRef.current = imageQueue;
  }, [imageQueue]);

  // Keep helper text in sync if settings (or another tab) changes the pref.
  useEffect(() => {
    const sync = () => setShowHelperText(getComposerHelperTextVisible());
    const onStorage = (event: any) => {
      if (event.key == null || event.key.includes('composer_helper_text')) sync();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  // Restore unsent compose draft (text + images) once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const meta = readComposerDraftMeta(draftScope);
        if (meta?.body) {
          setValue(meta.body);
        }
        setMarkdownEnabled(looksLikeMarkdown(meta?.body));
        markdownUserOffRef.current = false;
        if (meta?.imageIds?.length) {
          const imgs = await loadComposerDraftImageQueue(draftScope, meta.imageIds);
          if (!cancelled && imgs.length) {
            setImageQueue(applyDraftBackgrounds(imgs, meta.imageBackgrounds));
          }
        }
      } catch {
        /* ignore corrupt draft */
      } finally {
        if (!cancelled) setDraftReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Apply share-target (or similar) seed into the editor + draft meta.
  useEffect(() => {
    if (!seedBody?.id || seedBody.body == null || !draftReady || editTarget) return;
    const nextBody = String(seedBody.body);
    applyComposerValue(nextBody);
    const meta = readComposerDraftMeta(draftScope) || {};
    writeComposerDraftMeta(draftScope, {
      ...meta,
      body: nextBody,
      group: selectedGroup || SELF_GROUP,
      markdown: looksLikeMarkdown(nextBody),
    });
    onSeedConsumed?.();
  }, [
    seedBody?.id,
    seedBody?.body,
    draftReady,
    editTarget,
    selectedGroup,
    onSeedConsumed,
    draftScope,
    applyComposerValue,
  ]);

  const getPresignedUrlRef = useRef(getPresignedUrl);
  getPresignedUrlRef.current = getPresignedUrl;

  useEffect(() => {
    if (!editTarget) return undefined;
    let cancelled = false;
    removedExistingPathsRef.current = [];
    const { text, attachments } = extractChatBodyAttachments(editTarget.body || '');
    const items = attachments.map((a, i) => ({
      id: `existing-${a.path}-${i}`,
      kind: a.kind,
      path: a.path,
      name: a.name,
      size: a.size,
      background: a.background || null,
      file: null,
      existing: true,
      previewUrl: null
    }));
    setValue(text);
    markdownUserOffRef.current = false;
    setMarkdownEnabled(isChatMessageMarkdown(editTarget));
    setImageQueue((prev) => {
      prev.forEach((item) => {
        // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
        if (item?.previewUrl && item.previewUrl.startsWith('blob:')) {
          // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return items;
    });

    const resolver = getPresignedUrlRef.current;
    (async () => {
      if (!resolver) return;
      for (const item of items) {
        if (item.kind !== 'image' || !item.path) continue;
        try {
          const url = await resolveWikiImageUrl(item.path, resolver);
          if (cancelled || !url) continue;
          // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: never[]) => any[]' is not... Remove this comment to see the full error message
          setImageQueue((prev) =>
            // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
            prev.map((p) => (p.id === item.id ? { ...p, previewUrl: url } : p)),
          );
        } catch {
          /* keep placeholder */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // Hydrate once per edit target. Do not reset draft when resolver identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- editTarget.body snapshotted on id change
  }, [editTarget?.id]);

  useEffect(() => {
    if (!editTarget) return undefined;
    const root = wrapRef.current;
    if (!root) return undefined;

    const focusComposer = () => {
      // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const cmEl = root.querySelector('.cm-editor');
      const view = cmEl ? EditorView.findFromDOM(cmEl) : null;
      if (view) view.focus();
      // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      else root.querySelector('.cm-content')?.focus?.();
    };

    const onWindowBlur = () => {
      window.setTimeout(() => {
        const active = document.activeElement;
        if (active?.tagName === 'IFRAME') focusComposer();
      }, 0);
    };

    window.addEventListener('blur', onWindowBlur);
    return () => window.removeEventListener('blur', onWindowBlur);
  }, [editTarget]);

  // Leaving edit mode → restore compose draft into the editor.
  useEffect(() => {
    const prev = prevEditTargetRef.current;
    prevEditTargetRef.current = editTarget;
    if (!prev || editTarget || !draftReady) return;
    removedExistingPathsRef.current = [];
    let cancelled = false;
    (async () => {
      const meta = readComposerDraftMeta(draftScope);
      if (cancelled) return;
      setValue(meta?.body || '');
      setMarkdownEnabled(looksLikeMarkdown(meta?.body));
      markdownUserOffRef.current = false;
      setImageQueue((prevQueue) => {
        prevQueue.forEach((item) => {
          // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
          if (item?.previewUrl && item.previewUrl.startsWith('blob:')) {
            // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
            URL.revokeObjectURL(item.previewUrl);
          }
        });
        return [];
      });
      if (meta?.imageIds?.length) {
        const imgs = await loadComposerDraftImageQueue(draftScope, meta.imageIds);
        if (!cancelled && imgs.length) {
          setImageQueue(applyDraftBackgrounds(imgs, meta?.imageBackgrounds));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [editTarget, draftReady, draftScope]);

  useEffect(() => {
    return () => {
      imageQueueRef.current.forEach((item) => {
        // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
        if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  // Persist unsent compose draft (skip while editing an existing message).
  useEffect(() => {
    if (!draftReady || editTarget) return undefined;
    const t = window.setTimeout(() => {
      // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
      const imageIds = imageQueue.map((item) => item.id);
      writeComposerDraftMeta(draftScope, {
        body: value,
        group: selectedGroup || SELF_GROUP,
        replyTo: replyTo
          ? {
              id: replyTo.id,
              group: replyTo.group,
              body: replyTo.body,
              snippet: replyTo.snippet,
              dateStr: replyTo.dateStr,
              at: replyTo.at,
            }
          : null,
        imageIds,
        imageBackgrounds: imageBackgroundsFromQueue(imageQueue),
        markdown: markdownEnabled,
      });
      void syncComposerDraftImages(draftScope, imageQueue);
    }, 280);
    return () => window.clearTimeout(t);
  }, [draftReady, editTarget, value, imageQueue, selectedGroup, replyTo, draftScope, markdownEnabled]);

  // Flush draft on hide / unload.
  useEffect(() => {
    if (!draftReady) return undefined;
    const flush = () => {
      if (editTarget) return;
      writeComposerDraftMeta(draftScope, {
        body: valueRef.current,
        group: selectedGroup || SELF_GROUP,
        replyTo: replyTo
          ? {
              id: replyTo.id,
              group: replyTo.group,
              body: replyTo.body,
              snippet: replyTo.snippet,
              dateStr: replyTo.dateStr,
              at: replyTo.at,
            }
          : null,
        // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
        imageIds: imageQueueRef.current.map((item) => item.id),
        imageBackgrounds: imageBackgroundsFromQueue(imageQueueRef.current),
        markdown: markdownEnabledRef.current,
      });
      void syncComposerDraftImages(draftScope, imageQueueRef.current);
    };
    const onVis = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [draftReady, editTarget, selectedGroup, replyTo, draftScope]);

  const syncEditorHeight = useCallback(() => {
    if (fillParent) return;
    const next = measureComposerHeight(wrapRef.current, contentMaxH);
    setEditorHeight((prev) => (prev === next ? prev : next));
  }, [contentMaxH, fillParent]);

  // Leaving edit / switching to fillParent: drop the expanded editor height.
  useLayoutEffect(() => {
    if (!fillParent) return;
    setEditorHeight(COMPOSER_MIN_H);
    setContentMaxH(getComposerContentMaxH({ editing: false }));
  }, [fillParent]);

  useEffect(() => {
    if (fillParent) return undefined;
    const syncMax = () => {
      const next = getComposerContentMaxH({ editing: Boolean(editTarget) });
      setContentMaxH((prev) => (prev === next ? prev : next));
    };
    syncMax();
    const vv = window.visualViewport;
    vv?.addEventListener('resize', syncMax);
    window.addEventListener('resize', syncMax);
    return () => {
      vv?.removeEventListener('resize', syncMax);
      window.removeEventListener('resize', syncMax);
    };
  }, [fillParent, editTarget]);

  useLayoutEffect(() => {
    if (fillParent) return;
    syncEditorHeight();
    const raf = window.requestAnimationFrame(() => syncEditorHeight());
    // Group / inline-add chrome can reflow after Select closes; remeasure once settled.
    const t = window.setTimeout(syncEditorHeight, 50);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [
    fillParent,
    value,
    imageQueue.length,
    showLineNumbers,
    showToolbar,
    useLightweightEditor,
    contentMaxH,
    editTarget,
    selectedGroup,
    inlineAddOpen,
    syncEditorHeight,
  ]);

  const focusComposerInput = useCallback(() => {
    if (useLightweightEditor) {
      // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
      textareaRef.current?.focus?.();
    } else {
      const root = wrapRef.current;
      if (!root) return;
      // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const cmEl = root.querySelector('.cm-editor');
      const view = cmEl ? EditorView.findFromDOM(cmEl) : null;
      if (view) {
        view.focus();
      } else {
        // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
        root.querySelector('.cm-content')?.focus?.();
      }
    }
    // Undo mobile browser scroll-into-view that pushes chat chrome off-screen.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [useLightweightEditor]);

  const scheduleFocusComposer = useCallback(() => {
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      focusComposerInput();
    };
    // Retries cover lazy MdEditor mount and mobile dialog close timing.
    const raf = window.requestAnimationFrame(run);
    const t1 = window.setTimeout(run, 50);
    const t2 = window.setTimeout(run, 200);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [focusComposerInput]);

  // After textarea → MdEditor promotion, focus the CodeMirror editor surface.
  useEffect(() => {
    const wasLightweight = wasLightweightEditorRef.current;
    wasLightweightEditorRef.current = useLightweightEditor;
    if (wasLightweight === true && !useLightweightEditor) {
      return scheduleFocusComposer();
    }
    return undefined;
  }, [useLightweightEditor, scheduleFocusComposer]);

  // Advanced Search: "입력창에 포커스" while this composer is mounted.
  useEffect(() => {
    return registerChatActions({
      'chat-focus-composer': () => {
        scheduleFocusComposer();
      },
    });
  }, [scheduleFocusComposer]);

  // Focus the message input when chat opens (composer draft ready).
  useEffect(() => {
    if (!autoFocusOnMount || !draftReady || editTarget) return undefined;
    if (didAutofocusOnMountRef.current) return undefined;
    didAutofocusOnMountRef.current = true;
    return scheduleFocusComposer();
  }, [autoFocusOnMount, draftReady, editTarget, scheduleFocusComposer]);

  // Focus the editor when entering (or switching) reply mode.
  useEffect(() => {
    if (!replyTo?.id || editTarget) return undefined;
    return scheduleFocusComposer();
  }, [replyTo?.id, editTarget, scheduleFocusComposer]);

  // Install lineNumbers once; visibility is toggled via CSS class.
  useEffect(() => {
    if (useLightweightEditor || !draftReady) return undefined;
    const root = wrapRef.current;
    if (!root) return undefined;
    let cancelled = false;

    if (!lineNumbersCompartmentRef.current) {
      lineNumbersCompartmentRef.current = new Compartment();
    }

    const install = () => {
      if (cancelled) return;
      // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      const cmEl = root.querySelector('.cm-editor');
      if (!cmEl) return;
      const view = EditorView.findFromDOM(cmEl);
      if (!view) return;
      if (lineNumbersViewsRef.current.has(view)) return;
      // Global MarkdownEditor config may already provide lineNumbers.
      // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
      if (root.querySelector('.cm-lineNumbers')) {
        lineNumbersViewsRef.current.add(view);
        return;
      }
      view.dispatch({
        effects: StateEffect.appendConfig.of(
          // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
          lineNumbersCompartmentRef.current.of(lineNumbers()),
        ),
      });
      lineNumbersViewsRef.current.add(view);
      syncEditorHeight();
    };

    install();
    const t1 = window.setTimeout(install, 50);
    const t2 = window.setTimeout(install, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [draftReady, syncEditorHeight, useLightweightEditor]);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;
    // @ts-expect-error TS(2339) FIXME: Property 'querySelector' does not exist on type 'n... Remove this comment to see the full error message
    const content = root.querySelector('.cm-content');
    if (!content) {
      const t = window.setTimeout(syncEditorHeight, 50);
      return () => window.clearTimeout(t);
    }
    const ro = new ResizeObserver(() => syncEditorHeight());
    ro.observe(content);
    return () => ro.disconnect();
  }, [value, syncEditorHeight]);

  const clearImageQueue = useCallback(() => {
    setImageQueue((prev) => {
      prev.forEach((item) => {
        // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
        if (item?.previewUrl && item.previewUrl.startsWith('blob:')) {
          // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
          URL.revokeObjectURL(item.previewUrl);
        }
      });
      return [];
    });
  }, []);

  const enqueueFiles = useCallback(async (fileList: any) => {
    const files = [...(fileList || [])];
    if (!files.length) return;
    const accepted: any = [];
    for (const file of files) {
      if (!file) continue;
      const isImage = await isChatImageFile(file);
      accepted.push({
        id: makeQueueId(),
        file,
        kind: isImage ? 'image' : 'file',
        previewUrl: isImage ? URL.createObjectURL(file) : null,
      });
    }
    if (!accepted.length) return;
    // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: never[]) => any[]' is not... Remove this comment to see the full error message
    setImageQueue((prev) => [...prev, ...accepted]);
  }, []);

  const enqueueShareItems = useCallback((items: any) => {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) return;
    const accepted: any = [];
    for (const item of list) {
      if (!item) continue;
      const kind = item.kind === 'folder' ? 'folder' : item.kind === 'note' ? 'note' : null;
      const path = String(item.path || '').trim();
      if (!kind || !path) continue;
      const name =
        String(item.name || '').trim() ||
        path.replace(/\/+$/, '').split('/').filter(Boolean).pop() ||
        (kind === 'folder' ? 'folder' : 'note');
      accepted.push({
        id: makeQueueId(),
        kind,
        path,
        name,
        size: null,
        file: null,
        existing: false,
        previewUrl: null,
      });
    }
    if (!accepted.length) return;
    // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: never[]) => any[]' is not... Remove this comment to see the full error message
    setImageQueue((prev) => {
      const seen = new Set(
        prev
          // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
          .filter((p) => (p.kind === 'note' || p.kind === 'folder') && p.path)
          // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
          .map((p) => `${p.kind}:${p.path}`),
      );
      const next = accepted.filter((a: any) => !seen.has(`${a.kind}:${a.path}`));
      return next.length ? [...prev, ...next] : prev;
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      enqueueFiles,
      enqueueShareItems,
    }),
    [enqueueFiles, enqueueShareItems],
  );

  const removeQueuedImage = useCallback((id: any) => {
    setImageQueue((prev) => {
      // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
      const target = prev.find((p) => p.id === id);
      // Only chat-uploaded image/file keys are safe to delete from storage.
      // Note shares are references to existing notes — do not delete them.
      if (
        // @ts-expect-error TS(2339) FIXME: Property 'existing' does not exist on type 'never'... Remove this comment to see the full error message
        target?.existing &&
        // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type 'never'.
        target.path &&
        // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
        (target.kind === 'image' || target.kind === 'file')
      ) {
        removedExistingPathsRef.current = [
          // @ts-expect-error TS(2322) FIXME: Type 'any' is not assignable to type 'never'.
          ...removedExistingPathsRef.current,
          // @ts-expect-error TS(2322) FIXME: Type 'any' is not assignable to type 'never'.
          target.path,
        ];
      }
      // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
      if (target?.previewUrl && target.previewUrl.startsWith('blob:')) {
        // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
        URL.revokeObjectURL(target.previewUrl);
      }
      // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const doSend = useCallback(async (options = {}) => {
    const encryptPassword =
      // @ts-expect-error TS(2339) FIXME: Property 'encryptPassword' does not exist on type ... Remove this comment to see the full error message
      typeof options.encryptPassword === 'string' ? options.encryptPassword.trim() : '';
    const body = valueRef.current.trim();
    const queued = imageQueueRef.current;
    const markdown = Boolean(markdownEnabledRef.current);
    if (!body && queued.length === 0) return;
    const newAttachments = queued
      // @ts-expect-error TS(2339) FIXME: Property 'file' does not exist on type 'never'.
      .filter((q) => q.file)
      .map((q) => ({
        // @ts-expect-error TS(2339) FIXME: Property 'file' does not exist on type 'never'.
        file: q.file,
        // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
        background: q.kind === 'image' ? q.background || null : null,
      }));
    const stagedShareMarkdown = chatAttachmentsToMarkdown(
      queued
        .filter(
          (q) =>
            // @ts-expect-error TS(2339) FIXME: Property 'file' does not exist on type 'never'.
            !q.file &&
            // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type 'never'.
            q.path &&
            // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
            (q.kind === 'note' || q.kind === 'folder') &&
            // @ts-expect-error TS(2339) FIXME: Property 'existing' does not exist on type 'never'... Remove this comment to see the full error message
            !q.existing,
        )
        .map((q) => ({
          // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
          kind: q.kind,
          // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type 'never'.
          path: q.path,
          // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
          name: q.name,
          size: null,
        })),
    );
    if (editTarget) {
      const existingMarkdown = chatAttachmentsToMarkdown(
        queued
          // @ts-expect-error TS(2339) FIXME: Property 'existing' does not exist on type 'never'... Remove this comment to see the full error message
          .filter((q) => q.existing && q.path)
          .map((q) => ({
            // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
            kind: q.kind,
            // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type 'never'.
            path: q.path,
            // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
            name: q.name,
            // @ts-expect-error TS(2339) FIXME: Property 'size' does not exist on type 'never'.
            size: q.size,
            // @ts-expect-error TS(2339) FIXME: Property 'background' does not exist on type 'neve... Remove this comment to see the full error message
            background: q.background || null,
          })),
      );
      // New note/folder shares staged during edit join existing attachment markdown.
      const mergedExisting = [existingMarkdown, stagedShareMarkdown]
        .filter(Boolean)
        .join('\n');
      if (!body && !mergedExisting && newAttachments.length === 0) return;
      const removedPaths = [...removedExistingPathsRef.current];
      removedExistingPathsRef.current = [];
      void onSaveEdit?.(
        body,
        selectedGroup || SELF_GROUP,
        editTarget,
        newAttachments,
        { existingMarkdown: mergedExisting, removedPaths, markdown },
      );
      setValue('');
      setMarkdownEnabled(false);
      markdownUserOffRef.current = false;
      clearImageQueue();
      onClearEdit?.();
      return;
    }
    const finalBody = [stagedShareMarkdown, body].filter(Boolean).join('\n\n');
    if (!finalBody && newAttachments.length === 0) return;
    onSend?.(finalBody, selectedGroup || SELF_GROUP, replyTo || null, newAttachments, {
      markdown,
      ...(encryptPassword ? { encryptPassword } : {}),
    });
    setValue('');
    setMarkdownEnabled(false);
    markdownUserOffRef.current = false;
    clearImageQueue();
    onClearReply?.();
    await clearComposerDraft(draftScope);
  }, [
    onSend,
    onSaveEdit,
    selectedGroup,
    replyTo,
    editTarget,
    onClearReply,
    onClearEdit,
    clearImageQueue,
    draftScope,
  ]);

  const openEncryptSendPrompt = useCallback(() => {
    if (editTarget) return;
    const body = valueRef.current.trim();
    const queued = imageQueueRef.current;
    if (!body && queued.length === 0) return;
    setEncryptPromptOpen(true);
  }, [editTarget]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const onKeyDown = (e: any) => {
      if (e.isComposing) return;
      // @ts-expect-error TS(2339) FIXME: Property 'contains' does not exist on type 'never'... Remove this comment to see the full error message
      if (!el.contains(e.target)) return;

      // Ctrl+M toggles Markdown (Ctrl on Mac too — not Cmd).
      if (
        (e.key === 'm' || e.key === 'M') &&
        e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        setMarkdownFromUser(!markdownEnabledRef.current);
        return;
      }

      // Safari lightweight: promote textarea → MdEditor only on Space/Enter
      // once markdown markup is already present (do not auto-switch on detect).
      if (
        safariDeferMdEditor &&
        useLightweightEditor &&
        !markdownEnabledRef.current &&
        !markdownUserOffRef.current &&
        (e.key === ' ' || e.key === 'Enter') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        looksLikeMarkdown(valueRef.current)
      ) {
        e.preventDefault();
        e.stopPropagation();
        const suffix = e.key === 'Enter' ? '\n' : ' ';
        const next = `${valueRef.current}${suffix}`;
        valueRef.current = next;
        setValue(next);
        setMarkdownEnabled(true);
        return;
      }

      if (e.key !== 'Enter') return;

      // Opt/Alt+Enter: no-op (do not send, do not insert newline).
      if (e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+Enter: encrypt send (compose only; all platforms).
      if (e.ctrlKey && e.shiftKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        if (!editTarget) openEncryptSendPrompt();
        return;
      }

      // Cmd+Enter always sends (or saves while editing).
      if (e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        doSend();
        return;
      }

      // Ctrl+Enter: no-op on Apple (iOS/macOS); send on Windows/Linux.
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        if (!applePlatform) doSend();
        return;
      }

      // Edit: Enter = newline, Shift+Enter = save (always, even single-line).
      if (editTarget) {
        if (e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          doSend();
        }
        return;
      }

      // Compose: Enter sends; Shift+Enter inserts a newline.
      if (isMobile || e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();
      doSend();
    };
    // @ts-expect-error TS(2339) FIXME: Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    el.addEventListener('keydown', onKeyDown, true);
    // @ts-expect-error TS(2339) FIXME: Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
    return () => el.removeEventListener('keydown', onKeyDown, true);
  }, [
    doSend,
    openEncryptSendPrompt,
    isMobile,
    editTarget,
    applePlatform,
    setMarkdownFromUser,
    safariDeferMdEditor,
    useLightweightEditor,
  ]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const onPaste = (e: any) => {
      const items = e.clipboardData?.files;
      if (!items?.length) return;
      e.preventDefault();
      e.stopPropagation();
      enqueueFiles(items);
    };
    // @ts-expect-error TS(2339) FIXME: Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    el.addEventListener('paste', onPaste, true);
    // @ts-expect-error TS(2339) FIXME: Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
    return () => el.removeEventListener('paste', onPaste, true);
  }, [enqueueFiles]);

  const handleGroupChange = (next: any) => {
    if (next === ADD_GROUP_VALUE) {
      setInlineAddOpen(true);
      setInlineGroupName('');
      return;
    }
    setInlineAddOpen(false);
    setInlineGroupName('');
    onSelectedGroupChange?.(next);
  };

  useEffect(() => {
    if (!inlineAddOpen) return undefined;
    const id = window.requestAnimationFrame(() => {
      // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
      inlineGroupInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [inlineAddOpen]);

  const closeInlineAdd = () => {
    setInlineAddOpen(false);
    setInlineGroupName('');
  };

  const commitInlineGroup = async () => {
    const trimmed = inlineGroupName.trim();
    if (!trimmed || addingGroup) return;
    setAddingGroup(true);
    try {
      const next = await onAddGroup?.(trimmed);
      const created = Array.isArray(next)
        ? next.find((g) => g.name === trimmed) || next[next.length - 1]
        : null;
      onSelectedGroupChange?.(created?.id || trimmed);
      closeInlineAdd();
    } catch {
      /* keep input on failure */
    } finally {
      setAddingGroup(false);
    }
  };

  const canSend = Boolean(value.trim()) || imageQueue.length > 0;

  const markdownSwitch = (
    <ChatNavSwitch
      id="chat-composer-markdown"
      label="Markdown"
      title="마크다운 문법으로 렌더링 (Ctrl+M)"
      checked={markdownEnabled}
      onCheckedChange={setMarkdownFromUser}
    />
  );

  return (
    <div
      className={
        fillParent
          ? `flex h-full min-h-0 flex-col overflow-hidden ${editTarget ? 'pb-0.5' : ''}`
          : bare
            ? `shrink-0 ${editTarget ? 'pb-1.5 md:pb-2' : ''}`
            : `shrink-0 border-t border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${editTarget ? 'pb-1.5 md:pb-2' : ''}`
      }
    >
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div
        className={
          fillParent
            ? 'flex min-h-0 flex-1 flex-col overflow-hidden'
            : bare
              ? ''
              : 'px-2 py-1 md:px-3 md:py-1.5'
        }
      >        {editTarget ? (
          <div className="mb-1 flex items-start gap-2 rounded-md border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 px-2 py-1 dark:border-amber-800/60 dark:border-l-amber-400 dark:bg-amber-950/40">
            <Pencil size={14} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" />
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="min-w-0 flex-1">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-200">
                메시지 수정 중
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="truncate text-[10px] text-amber-700/80 dark:text-amber-300/80">
                {(editTarget.body || '').replace(/\s+/g, ' ').slice(0, 80) || '(빈 메시지)'}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              onClick={() => {
                removedExistingPathsRef.current = [];
                setValue('');
                setMarkdownEnabled(false);
                markdownUserOffRef.current = false;
                clearImageQueue();
                onClearEdit?.();
              }}
              className="rounded p-0.5 text-amber-700 hover:bg-amber-100 dark:text-amber-200 dark:hover:bg-amber-900/40"
              aria-label="수정 취소"
            >
              <X size={14} />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : null}
        {replyTo && !editTarget ? (
          <div className="mb-1 min-w-0 max-w-full overflow-hidden rounded-md border border-blue-200 border-l-4 border-l-blue-500 bg-blue-100 px-2 py-1 shadow-sm dark:border-blue-800/60 dark:border-l-blue-400 dark:bg-blue-950 dark:shadow-none">
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div className="flex min-w-0 items-start gap-2">
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="min-w-0 flex-1 overflow-hidden">
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                <div className="truncate text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                  {resolveGroupLabel(groups, replyTo.group || SELF_GROUP)} 에게 답장
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
                {replyWhen ? (
                  <div className="truncate text-[10px] text-gray-500 dark:text-gray-400">{replyWhen}</div>
                ) : null}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              <button
                type="button"
                onClick={onClearReply}
                className="rounded p-0.5 text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                aria-label="답장 취소"
              >
                <X size={14} />
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              </button>
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            <ChatLinkedText
              text={replyTo.body || replyTo.snippet || ''}
              className="mt-1 line-clamp-3 overflow-hidden whitespace-pre-wrap wrap-anywhere text-xs text-gray-700 dark:text-gray-200"
              getPresignedUrl={getPresignedUrl}
            />
            {replyUrls.length > 0 ? (
              <div className="mt-1 space-y-1">
                {replyUrls.map((u: any) => <ChatOgCard key={u} url={u} ogStorage={ogStorage} compact />)}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            ) : null}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : null}

        {imageQueue.length > 0 ? (
          <div className="mb-1 flex flex-wrap gap-2">
            {imageQueue.map((item) =>
              // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
              item.kind === 'file' || item.kind === 'note' || item.kind === 'folder' ? (
                <div
                  // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                  key={item.id}
                  className={`relative flex max-w-[11rem] items-center gap-2 rounded-md border px-2 py-1.5 ${
                    // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                    item.kind === 'note'
                      ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/50 dark:bg-emerald-950/40'
                      // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                      : item.kind === 'folder'
                        ? 'border-amber-200 bg-amber-50/80 dark:border-amber-800/50 dark:bg-amber-950/40'
                        : 'border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bg/50'
                  }`}
                >
                  // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
                  // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                  // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
                  // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                  {item.kind === 'folder' ? (
                    <Folder
                      size={16}
                      className="shrink-0 text-amber-600 dark:text-amber-300"
                    />
                  ) : (
                    <FileText
                      size={16}
                      className={`shrink-0 ${
                        // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                        item.kind === 'note'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-blue-600 dark:text-blue-300'
                      }`}
                    />
                  )}
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  <div className="min-w-0 flex-1">
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    <div className="truncate text-[11px] font-medium text-gray-800 dark:text-odp-fg">
                      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                      // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
                      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                      // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
                      {item.name ||
                        // @ts-expect-error TS(2339) FIXME: Property 'file' does not exist on type 'never'.
                        item.file?.name ||
                        // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                        (item.kind === 'folder'
                          ? 'folder'
                          // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                          : item.kind === 'note'
                            ? 'note'
                            : 'file')}
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    </div>
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    <div className="text-[10px] text-gray-400">
                      // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
                      // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                      // @ts-expect-error TS(2339): Property 'kind' does not exist on type 'never'.
                      // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                      {item.kind === 'note'
                        ? '노트'
                        // @ts-expect-error TS(2339) FIXME: Property 'kind' does not exist on type 'never'.
                        : item.kind === 'folder'
                          ? '폴더'
                          // @ts-expect-error TS(2339) FIXME: Property 'size' does not exist on type 'never'.
                          : formatChatAttachmentSize(item.size ?? item.file?.size)}
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    </div>
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                  </div>
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                    onClick={() => removeQueuedImage(item.id)}
                    className="rounded-full p-0.5 text-gray-500 hover:bg-black/10 dark:hover:bg-white/10"
                    aria-label="첨부 제거"
                  >
                    <X size={12} />
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  </button>
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              ) : (
                <div
                  // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                  key={item.id}
                  className="relative h-16 w-16 overflow-hidden rounded-md border border-gray-200 dark:border-odp-borderSoft"
                  // @ts-expect-error TS(2339) FIXME: Property 'background' does not exist on type 'neve... Remove this comment to see the full error message
                  style={item.background ? { backgroundColor: item.background } : undefined}
                >
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    className="h-full w-full"
                    onClick={() => {
                      // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                      if (!item.previewUrl) return;
                      // @ts-expect-error TS(2349) FIXME: This expression is not callable.
                      openChatImage?.(item.previewUrl, {
                        // @ts-expect-error TS(2339) FIXME: Property 'name' does not exist on type 'never'.
                        alt: item.name || item.file?.name || '첨부 이미지',
                        // @ts-expect-error TS(2339) FIXME: Property 'background' does not exist on type 'neve... Remove this comment to see the full error message
                        backgroundColor: item.background || null,
                        onBackgroundColorChange: (next: any) => {
                          // @ts-expect-error TS(2345) FIXME: Argument of type '(prev: never[]) => any[]' is not... Remove this comment to see the full error message
                          setImageQueue((prev) =>
                            prev.map((p) =>
                              // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                              p.id === item.id ? { ...p, background: next || null } : p,
                            ),
                          );
                        },
                      });
                    }}
                    aria-label="이미지 배경색 설정"
                  >
                    // @ts-expect-error TS(2339): Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                    {item.previewUrl ? (
                      <ChatImageFade
                        // @ts-expect-error TS(2339) FIXME: Property 'previewUrl' does not exist on type 'neve... Remove this comment to see the full error message
                        src={item.previewUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        // @ts-expect-error TS(2339) FIXME: Property 'background' does not exist on type 'neve... Remove this comment to see the full error message
                        style={item.background ? { backgroundColor: item.background } : undefined}
                      />
                    ) : (
                      <div className="h-full w-full animate-pulse bg-black/10 dark:bg-white/10" />
                    )}
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  </button>
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
                    onClick={() => removeQueuedImage(item.id)}
                    className="absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white"
                    aria-label="첨부 제거"
                  >
                    <X size={12} />
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  </button>
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                </div>
              ),
            )}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : null}

        // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e: any) => {
            enqueueFiles(e.target.files);
            e.target.value = '';
          }}
        />

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div
          className={
            showToolbar
              ? fillParent
                ? 'grid min-h-0 flex-1 grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-1.5'
                : 'grid grid-cols-[auto_minmax(0,1fr)] gap-1.5'
              : fillParent
                ? 'flex min-h-0 flex-1 flex-col gap-1.5'
                : 'flex flex-col gap-1.5'
          }
        >
          {showToolbar ? (
            <>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex items-center gap-2">
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                <button
                  type="button"
                  // @ts-expect-error TS(2339) FIXME: Property 'click' does not exist on type 'never'.
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderSoft dark:hover:bg-odp-focusBg"
                  title="파일 첨부"
                  aria-label="파일 첨부"
                >
                  <Paperclip size={18} />
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                </button>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              <div className="flex min-w-0 items-center gap-1.5">
                <ChatSelect
                  id="chat-group-select"
                  ariaLabel="그룹"
                  value={groupSelectValue}
                  onValueChange={handleGroupChange}
                  options={groupOptions}
                  showGroupAvatars
                  getPresignedUrl={getPresignedUrl}
                  triggerClassName="w-full max-w-full"
                  className="min-w-0 flex-1"
                />
                {inlineAddOpen ? (
                  <>
                    // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                    <input
                      ref={inlineGroupInputRef}
                      type="text"
                      value={inlineGroupName}
                      onChange={(e: any) => setInlineGroupName(e.target.value)}
                      onKeyDown={(e: any) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          void commitInlineGroup();
                        } else if (e.key === 'Escape') {
                          e.preventDefault();
                          closeInlineAdd();
                        }
                      }}
                      placeholder="그룹명"
                      disabled={addingGroup}
                      className="w-[7.5rem] shrink-0 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                      aria-label="그룹 직접 추가"
                    />
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    <button
                      type="button"
                      title="그룹 추가"
                      aria-label="그룹 추가"
                      disabled={addingGroup || !inlineGroupName.trim()}
                      onMouseDown={(e: any) => e.preventDefault()}
                      onClick={() => void commitInlineGroup()}
                      className="inline-flex shrink-0 items-center justify-center rounded p-1 text-blue-600 hover:bg-blue-50 disabled:opacity-40 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                      <Check size={16} />
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                    </button>
                  </>
                ) : (
                  markdownSwitch
                )}
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
              </div>
            </>
          ) : (
            <div className="flex min-w-0 items-center gap-1.5">
              <ChatSelect
                id="chat-group-select"
                ariaLabel="그룹"
                value={groupSelectValue}
                onValueChange={handleGroupChange}
                options={groupOptions}
                showGroupAvatars
                getPresignedUrl={getPresignedUrl}
                triggerClassName="max-w-full"
                className={inlineAddOpen ? 'min-w-0 max-w-[42%]' : 'min-w-0 flex-1'}
              />
              {inlineAddOpen ? (
                <>
                  // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
                  <input
                    ref={inlineGroupInputRef}
                    type="text"
                    value={inlineGroupName}
                    onChange={(e: any) => setInlineGroupName(e.target.value)}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        void commitInlineGroup();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        closeInlineAdd();
                      }
                    }}
                    placeholder="그룹명"
                    disabled={addingGroup}
                    className="min-w-0 flex-1 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                    aria-label="그룹 직접 추가"
                  />
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    title="그룹 추가"
                    aria-label="그룹 추가"
                    disabled={addingGroup || !inlineGroupName.trim()}
                    onMouseDown={(e: any) => e.preventDefault()}
                    onClick={() => void commitInlineGroup()}
                    className="inline-flex shrink-0 items-center justify-center rounded p-1 text-blue-600 hover:bg-blue-50 disabled:opacity-40 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  >
                    <Check size={16} />
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  </button>
                </>
              ) : (
                markdownSwitch
              )}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
          )}

          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div
            className={`flex items-start gap-2 ${
              showToolbar ? 'col-span-2' : ''
            } ${fillParent ? 'min-h-0 flex-1' : ''}`}
          >
            {!showToolbar ? (
              <button
                type="button"
                // @ts-expect-error TS(2339) FIXME: Property 'click' does not exist on type 'never'.
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderSoft dark:hover:bg-odp-focusBg"
                title="파일 첨부"
                aria-label="파일 첨부"
              >
                <Paperclip size={18} />
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
              </button>
            ) : null}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            <div
              ref={wrapRef}
              className={`chat-composer-editor min-w-0 flex-1 overflow-hidden rounded-md border border-gray-200 dark:border-odp-borderSoft ${
                !useLightweightEditor && showLineNumbers
                  ? 'chat-composer-editor--line-numbers'
                  : ''
              } ${
                useLightweightEditor || !showToolbar
                  ? 'chat-composer-editor--no-toolbar'
                  : ''
              } ${fillParent ? 'h-full min-h-0' : 'shrink-0'}`}
              style={
                fillParent
                  ? undefined
                  : {
                      height: editorHeight,
                      minHeight: COMPOSER_MIN_H,
                      // Instant while editing so the dock can grow with content;
                      // animate only for normal compose auto-grow.
                      transition: editTarget
                        ? undefined
                        : EDITOR_HEIGHT_CSS_TRANSITION,
                    }
              }
            >
              {useLightweightEditor ? (
                <textarea
                  ref={textareaRef}
                  data-chat-composer-textarea=""
                  value={value}
                  onChange={(e: any) => applyComposerValue(e.target.value)}
                  placeholder="메시지 입력…"
                  className="box-border h-full min-h-0 w-full resize-none border-0 bg-transparent px-2.5 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-odp-fgStrong dark:placeholder:text-gray-500"
                  style={
                    fillParent
                      ? { height: '100%' }
                      : { height: '100%', minHeight: COMPOSER_MIN_H }
                  }
                  aria-label="메시지 입력"
                />
              ) : (
                <Suspense
                  fallback={
                    <div className="flex h-full items-center px-2.5 text-sm text-gray-400">
                      에디터 불러오는 중…
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
                    </div>
                  }
                >
                  <ChatComposerMdEditor
                    value={value}
                    onChange={applyComposerValue}
                    theme={resolvedTheme}
                    showToolbar={showToolbar}
                    onUploadImg={async (files: any, callback: any) => {
                      await enqueueFiles(files);
                      callback([]);
                    }}
                  />
                </Suspense>
              )}
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
            </div>
            <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  <button
                    type="button"
                    onClick={() => doSend()}
                    onContextMenu={(e: any) => {
                      if (editTarget) return;
                      e.preventDefault();
                      e.stopPropagation();
                      openEncryptSendPrompt();
                    }}
                    disabled={!canSend}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40 ${
                      editTarget
                        ? 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    aria-label={editTarget ? '수정 완료' : '전송'}
                  >
                    {editTarget ? <Check size={18} /> : <Send size={18} />}
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="top"
                    sideOffset={6}
                    className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
                  >
                    {editTarget
                      ? '수정 완료'
                      : '전송 · 우클릭 또는 Ctrl+Shift+Enter로 암호화 전송'}
                    <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        {!isMobile && showHelperText ? (
          <div className="mt-0.5 flex shrink-0 items-center gap-1.5">
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            <p className="min-w-0 flex-1 text-[10px] text-gray-400 dark:text-gray-500">
              {editTarget
                ? `Shift+Enter / ${sendModLabel} 수정 완료 · Enter 줄바꿈 · Ctrl+M 마크다운`
                : `${sendModLabel} / Enter 전송 · Ctrl+Shift+Enter 암호화 · Shift+Enter 줄바꿈 · Ctrl+M 마크다운 · 첨부는 전송 시 업로드`}
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
            </p>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              onClick={() => {
                writeComposerHelperTextPref(false);
                setShowHelperText(false);
              }}
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-gray-400 hover:bg-black/5 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-white/10 dark:hover:text-gray-300"
              aria-label="단축키 안내 숨기기"
            >
              <X size={12} strokeWidth={2.25} />
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        ) : null}
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
      <PromptModal
        isOpen={encryptPromptOpen}
        title="암호화해서 보내기"
        message={"이 메시지를 암호화할 비밀번호를 입력하세요.\n같은 비밀번호로만 다시 열 수 있습니다."}
        placeholder="비밀번호"
        confirmLabel="암호화 전송"
        cancelLabel="취소"
        inputType="password"
        onCancel={() => setEncryptPromptOpen(false)}
        onConfirm={(password: any) => {
          setEncryptPromptOpen(false);
          void doSend({ encryptPassword: password });
        }}
      />
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
});

export default ChatComposer;
