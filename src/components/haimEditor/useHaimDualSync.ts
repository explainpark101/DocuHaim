/**
 * Bidirectional TipTap <-> CodeMirror sync with debounce + origin tags.
 * Keyboard focus picks the sync author: only the focused pane drives
 * cross-pane updates. On focus handoff, flush the previous author once.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import type { EditorView } from '@codemirror/view';
import { editorToVaultMarkdown } from '@/components/haimEditor/markdownIo';
import {
  isCmPointerSelecting,
  replaceCmDocPreservingView,
  replaceCmDocPreservingViewAsync,
} from '@/components/haimEditor/haimCmDocReplace';
import {
  HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  replaceTipTapPreservingView,
  canDriveVaultSync,
  resolveHaimDualSyncAuthor,
  shouldRewriteFollowerPane,
  type HaimDualSyncAuthor,
} from '@/components/haimEditor/haimDualSyncApply';
import { runDualIdleFlush } from '@/components/haimEditor/haimDualIdleFlush';
import {
  shouldAbortScheduledApply,
  shouldUseFullTipTapReplace,
  tryPatchTipTapTopLevelBlocks,
} from '@/components/haimEditor/haimTipTapBlockPatch';
import { shouldUseWasmLineDiff, dirtySpanBytes, prefixSuffixChange } from '@/components/haimEditor/haimTextDiff';
import {
  captureHaimScrollerPin,
  haimMaxScrollTop,
  retainHaimScrollerPin,
} from '@/components/haimEditor/haimDoubleScrollSyncCore';
import { yieldToMain } from '@/components/haimEditor/yieldToMain';

/** Full TipTap parse above this size yields once before setContent. */
const HAIM_FULL_TIPTAP_YIELD_CHARS = 32_000;

export type SyncOrigin = 'tiptap' | 'cm' | 'external' | null;

/** Re-export — idle debounce while local input is ongoing. */
export { HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS };

type Options = {
  editor: Editor | null;
  cmViewRef: React.MutableRefObject<EditorView | null>;
  metaPrefixRef: React.MutableRefObject<string>;
  enabled: boolean;
  debounceMs?: number;
  /** Parent vault onChange — markdown only. */
  onVaultChange: (markdown: string) => void;
  /** WYSIWYG overflow scroller — preserve scroll when applying CM → TipTap. */
  wysiwygScrollRef?: React.RefObject<HTMLElement | null>;
  /**
   * Timestamp (ms) until which scroll sync should ignore echo events from
   * cross-pane doc writes (avoids flicker on the typing pane).
   */
  suppressScrollSyncUntilRef?: React.MutableRefObject<number>;
  /**
   * When true, skip scheduling / applying cross-pane content sync so block
   * drag-and-drop is not aborted by setContent / CM replace.
   */
  blockDragActiveRef?: React.MutableRefObject<boolean>;
  /**
   * Updated on every local TipTap/CM edit schedule (Date.now).
   * Parent value sync uses this to avoid stomping mid-keystroke.
   */
  localInputAtRef?: React.MutableRefObject<number>;
  /**
   * False until the parent note body has been applied to the editor.
   * Blocks mount-time updates from publishing "" over a file that just opened.
   */
  vaultReadyRef?: React.MutableRefObject<boolean>;
};

function bumpScrollSuppress(
  ref: React.MutableRefObject<number> | undefined,
  ms = 120,
): void {
  if (!ref) return;
  ref.current = Math.max(ref.current, Date.now() + ms);
}

function bumpLocalInput(ref: React.MutableRefObject<number> | undefined): void {
  if (!ref) return;
  ref.current = Date.now();
}

/**
 * Keep origin set through the sync body and the following microtask so nested
 * TipTap transactions (trimCodeBlocks / migrateMath) still see the tag.
 * Do not clear in the same turn as the write.
 */
function runWithOrigin(
  originRef: React.MutableRefObject<SyncOrigin>,
  origin: Exclude<SyncOrigin, null>,
  fn: () => void,
): void {
  originRef.current = origin;
  try {
    fn();
  } finally {
    void Promise.resolve().then(() => {
      if (originRef.current === origin) originRef.current = null;
    });
  }
}

export function useHaimDualSync({
  editor,
  cmViewRef,
  metaPrefixRef,
  enabled,
  debounceMs = HAIM_DUAL_CONTENT_SYNC_DEBOUNCE_MS,
  onVaultChange,
  wysiwygScrollRef,
  suppressScrollSyncUntilRef,
  blockDragActiveRef,
  localInputAtRef,
  vaultReadyRef,
}: Options): {
  originRef: React.MutableRefObject<SyncOrigin>;
  lastAuthorRef: React.MutableRefObject<HaimDualSyncAuthor>;
  notifyCmDocChanged: () => void;
  flush: () => void;
  cancelPending: () => void;
  pushEditorMarkdownToCmNow: () => void;
  pushCmMarkdownToEditorNow: () => void;
} {
  const originRef = useRef<SyncOrigin>(null);
  const onVaultChangeRef = useRef(onVaultChange);
  onVaultChangeRef.current = onVaultChange;

  const vaultIsReady = () => (vaultReadyRef ? vaultReadyRef.current : true);
  const tipTapDrivesVault = () =>
    canDriveVaultSync({
      paneFocused: Boolean(editor?.isFocused),
      vaultReady: vaultIsReady(),
    });
  const cmDrivesVault = () =>
    canDriveVaultSync({
      paneFocused: Boolean(cmViewRef.current?.hasFocus),
      vaultReady: vaultIsReady(),
    });
  const tipTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composingRef = useRef(false);
  /** Last markdown pushed to vault / follower — skip no-op feedback sync. */
  const lastPushedMdRef = useRef<string | null>(null);
  /** Last markdown applied to TipTap, so a source patch can diff blocks. */
  const tipTapMdRef = useRef<string | null>(null);
  /** CM doc length + localInputAt captured when a source sync was scheduled. */
  const cmScheduleRef = useRef({ docLength: -1, inputAt: 0 });
  const cmPatchRafRef = useRef<number | null>(null);
  const cmIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Pointer is down in the source pane (set before focusin). */
  const sourcePointerDownRef = useRef(false);
  const deferredCmReplaceRef = useRef(false);
  /** Last pane that held keyboard focus (fallback when neither is focused). */
  const lastAuthorRef = useRef<HaimDualSyncAuthor>('tiptap');
  const debounceMsRef = useRef(debounceMs);
  debounceMsRef.current = debounceMs;

  const isBlockDragActive = () => Boolean(blockDragActiveRef?.current);

  const clearTipTapTimer = () => {
    if (tipTapTimer.current) {
      clearTimeout(tipTapTimer.current);
      tipTapTimer.current = null;
    }
  };

  const clearCmTimer = () => {
    if (cmTimer.current) {
      clearTimeout(cmTimer.current);
      cmTimer.current = null;
    }
  };

  const readFocusFlags = useCallback(() => {
    const tipTapFocused = Boolean(editor?.isFocused);
    const cmFocused = Boolean(cmViewRef.current?.hasFocus);
    return { tipTapFocused, cmFocused };
  }, [editor, cmViewRef]);

  const resolveAuthor = useCallback((): HaimDualSyncAuthor => {
    const { tipTapFocused, cmFocused } = readFocusFlags();
    return resolveHaimDualSyncAuthor({
      tipTapFocused,
      cmFocused,
      lastAuthor: lastAuthorRef.current,
    });
  }, [readFocusFlags]);

  const refreshSourceLines = useCallback(
    (ed: Editor) => {
      try {
        ed.commands.updateDecorations('haimSourceLine');
      } catch {
        // Extension is off when scroll sync is disabled.
      }
    },
    [],
  );

  const writeCmFollower = useCallback(
    (cm: EditorView, md: string) => {
      if (sourcePointerDownRef.current || isCmPointerSelecting(cm)) {
        deferredCmReplaceRef.current = true;
        return;
      }
      const before = cm.state.doc.toString();
      const span = prefixSuffixChange(before, md);
      const useWasm =
        span != null &&
        shouldUseWasmLineDiff(before, md, dirtySpanBytes(span));
      bumpScrollSuppress(suppressScrollSyncUntilRef);
      if (!useWasm) {
        const wrote = replaceCmDocPreservingView(cm, md);
        if (!wrote && isCmPointerSelecting(cm)) deferredCmReplaceRef.current = true;
        return;
      }
      const generation = cmScheduleRef.current.inputAt;
      void replaceCmDocPreservingViewAsync(cm, md).then((wrote) => {
        if (cmScheduleRef.current.inputAt !== generation) return;
        if (!wrote && isCmPointerSelecting(cm)) deferredCmReplaceRef.current = true;
      });
    },
    [suppressScrollSyncUntilRef],
  );

  const applyTipTapToOther = useCallback(
    (options?: { forceFollower?: boolean }) => {
      if (!editor) return;
      if (isBlockDragActive()) return;
      runDualIdleFlush({
        readVaultMarkdown: () => editorToVaultMarkdown(editor, metaPrefixRef.current),
        applyFollower: (md) => {
          if (md === lastPushedMdRef.current) return;
          runWithOrigin(originRef, 'tiptap', () => {
            lastPushedMdRef.current = md;
            tipTapMdRef.current = md;
            onVaultChangeRef.current(md);
            const cm = cmViewRef.current;
            if (!cm) return;
            const force = Boolean(options?.forceFollower);
            if (!force && !shouldRewriteFollowerPane(cm.hasFocus)) return;
            writeCmFollower(cm, md);
          });
        },
        updateSourceLines: () => {
          refreshSourceLines(editor);
        },
      });
    },
    [
      editor,
      cmViewRef,
      metaPrefixRef,
      blockDragActiveRef,
      writeCmFollower,
      refreshSourceLines,
    ],
  );

  const applyCmFullReplace = useCallback(
    async (md: string) => {
      if (!editor) return;
      if (md.length >= HAIM_FULL_TIPTAP_YIELD_CHARS) {
        await yieldToMain();
      }
      const cm = cmViewRef.current;
      if (!cm || cm.state.doc.toString() !== md) return;
      if (
        shouldAbortScheduledApply({
          scheduledDocLength: cmScheduleRef.current.docLength,
          currentDocLength: cm.state.doc.length,
          scheduledInputAt: cmScheduleRef.current.inputAt,
          currentInputAt: localInputAtRef?.current ?? 0,
        })
      ) {
        return;
      }
      originRef.current = 'cm';
      try {
        bumpScrollSuppress(suppressScrollSyncUntilRef);
        replaceTipTapPreservingView(
          editor,
          md,
          metaPrefixRef,
          wysiwygScrollRef?.current,
        );
        tipTapMdRef.current = md;
        refreshSourceLines(editor);
      } finally {
        void Promise.resolve().then(() => {
          if (originRef.current === 'cm') originRef.current = null;
        });
      }
    },
    [
      editor,
      cmViewRef,
      metaPrefixRef,
      suppressScrollSyncUntilRef,
      wysiwygScrollRef,
      localInputAtRef,
      refreshSourceLines,
    ],
  );

  const scheduleIdleFullReplace = useCallback(() => {
    if (cmIdleTimerRef.current) clearTimeout(cmIdleTimerRef.current);
    const scheduledLength = cmScheduleRef.current.docLength;
    const scheduledInputAt = cmScheduleRef.current.inputAt;
    const wait = Math.max(debounceMsRef.current, 400);
    cmIdleTimerRef.current = setTimeout(() => {
      cmIdleTimerRef.current = null;
      const cm = cmViewRef.current;
      if (!editor || !cm) return;
      if (
        shouldAbortScheduledApply({
          scheduledDocLength: scheduledLength,
          currentDocLength: cm.state.doc.length,
          scheduledInputAt,
          currentInputAt: localInputAtRef?.current ?? 0,
        })
      ) {
        return;
      }
      const md = cm.state.doc.toString();
      void applyCmFullReplace(md);
    }, wait);
  }, [editor, cmViewRef, localInputAtRef, applyCmFullReplace]);

  const applyCmToOther = useCallback(
    (options?: { forceFollower?: boolean }) => {
      if (!editor) return;
      if (isBlockDragActive()) return;
      const cm = cmViewRef.current;
      if (!cm) return;
      if (cm.composing) return;
      const sourceFocused = Boolean(cm.hasFocus);
      const forceFull = Boolean(options?.forceFollower);
      if (
        !forceFull &&
        shouldAbortScheduledApply({
          scheduledDocLength: cmScheduleRef.current.docLength,
          currentDocLength: cm.state.doc.length,
          scheduledInputAt: cmScheduleRef.current.inputAt,
          currentInputAt: localInputAtRef?.current ?? 0,
        })
      ) {
        return;
      }
      runDualIdleFlush({
        readVaultMarkdown: () => cm.state.doc.toString(),
        applyFollower: (md) => {
          const tipTapMd = tipTapMdRef.current;
          if (md === lastPushedMdRef.current && tipTapMd === md) return;
          lastPushedMdRef.current = md;
          onVaultChangeRef.current(md);
          if (!forceFull && editor.isFocused) return;
          if (
            !shouldUseFullTipTapReplace({
              sourceFocused,
              forceFull,
            })
          ) {
            let before = tipTapMdRef.current;
            if (before == null) {
              before = editorToVaultMarkdown(editor, metaPrefixRef.current);
              tipTapMdRef.current = before;
            }
            originRef.current = 'cm';
            let patched = false;
            const wysiwyg = wysiwygScrollRef?.current ?? null;
            const wysiwygPin = wysiwyg
              ? captureHaimScrollerPin(
                  wysiwyg.scrollTop,
                  haimMaxScrollTop(wysiwyg),
                  wysiwyg.scrollLeft,
                )
              : null;
            try {
              patched =
                before === md ||
                tryPatchTipTapTopLevelBlocks(editor, before, md);
              if (patched && before !== md && wysiwyg && wysiwygPin) {
                retainHaimScrollerPin(wysiwyg, wysiwygPin);
              }
            } finally {
              void Promise.resolve().then(() => {
                if (originRef.current === 'cm') originRef.current = null;
              });
            }
            if (patched) {
              tipTapMdRef.current = md;
              return;
            }
            scheduleIdleFullReplace();
            return;
          }
          if (md.length >= HAIM_FULL_TIPTAP_YIELD_CHARS) {
            void applyCmFullReplace(md);
            return;
          }
          originRef.current = 'cm';
          try {
            bumpScrollSuppress(suppressScrollSyncUntilRef);
            replaceTipTapPreservingView(
              editor,
              md,
              metaPrefixRef,
              wysiwygScrollRef?.current,
            );
            tipTapMdRef.current = md;
          } finally {
            void Promise.resolve().then(() => {
              if (originRef.current === 'cm') originRef.current = null;
            });
          }
        },
        updateSourceLines: () => {
          refreshSourceLines(editor);
        },
      });
    },
    [
      editor,
      cmViewRef,
      metaPrefixRef,
      suppressScrollSyncUntilRef,
      wysiwygScrollRef,
      blockDragActiveRef,
      localInputAtRef,
      scheduleIdleFullReplace,
      applyCmFullReplace,
      refreshSourceLines,
    ],
  );

  const flush = useCallback(() => {
    if (!editor) return;
    clearTipTapTimer();
    clearCmTimer();
    const author = resolveAuthor();
    if (author === 'cm') {
      applyCmToOther({ forceFollower: true });
      return;
    }
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    lastPushedMdRef.current = md;
    onVaultChangeRef.current(md);
  }, [editor, metaPrefixRef, resolveAuthor, applyCmToOther]);

  /** Cancel pending debounced sync (e.g. before image upload apply). */
  const cancelPending = useCallback(() => {
    clearTipTapTimer();
    clearCmTimer();
  }, []);

  /**
   * Push current TipTap vault markdown into CM immediately (even if CM focused).
   * Used after wiki-image upload so source + WYSIWYG stay in sync.
   */
  const pushEditorMarkdownToCmNow = useCallback(() => {
    if (!editor) return;
    clearTipTapTimer();
    clearCmTimer();
    const md = editorToVaultMarkdown(editor, metaPrefixRef.current);
    lastPushedMdRef.current = md;
    onVaultChangeRef.current(md);
    const cm = cmViewRef.current;
    if (!cm) return;
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    runWithOrigin(originRef, 'external', () => {
      replaceCmDocPreservingView(cm, md);
    });
  }, [editor, cmViewRef, metaPrefixRef, suppressScrollSyncUntilRef]);

  /**
   * Push CM doc into TipTap + vault immediately.
   */
  const pushCmMarkdownToEditorNow = useCallback(() => {
    if (!editor) return;
    const cm = cmViewRef.current;
    if (!cm) return;
    clearTipTapTimer();
    clearCmTimer();
    bumpScrollSuppress(suppressScrollSyncUntilRef);
    runWithOrigin(originRef, 'external', () => {
      const md = cm.state.doc.toString();
      lastPushedMdRef.current = md;
      onVaultChangeRef.current(md);
      replaceTipTapPreservingView(
        editor,
        md,
        metaPrefixRef,
        wysiwygScrollRef?.current,
      );
    });
  }, [
    editor,
    cmViewRef,
    metaPrefixRef,
    suppressScrollSyncUntilRef,
    wysiwygScrollRef,
  ]);

  // Track keyboard focus → author; flush previous author on handoff.
  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const tipTapDom = editor.view.dom;

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const tipTapFocused = tipTapDom.contains(target);
      const cm = cmViewRef.current;
      const cmFocused = Boolean(cm && cm.dom.contains(target));
      if (!tipTapFocused && !cmFocused) return;

      const prev = lastAuthorRef.current;
      const next = resolveHaimDualSyncAuthor({
        tipTapFocused,
        cmFocused,
        lastAuthor: prev,
      });
      if (next === prev) {
        lastAuthorRef.current = next;
        return;
      }
      // Handoff: push the leaving pane into the newly focused follower once.
      clearTipTapTimer();
      clearCmTimer();
      if (prev === 'tiptap' && next === 'cm') {
        if (sourcePointerDownRef.current) {
          deferredCmReplaceRef.current = true;
        } else {
          applyTipTapToOther({ forceFollower: true });
        }
      } else if (prev === 'cm' && next === 'tiptap') {
        if (cmIdleTimerRef.current) {
          clearTimeout(cmIdleTimerRef.current);
          cmIdleTimerRef.current = null;
        }
        applyCmToOther({ forceFollower: true });
      }
      lastAuthorRef.current = next;
    };

    // Capture so CM (lazy dual mount) is covered without polling.
    document.addEventListener('focusin', onFocusIn, true);

    const onPointerDown = (event: PointerEvent) => {
      const cm = cmViewRef.current;
      const target = event.target;
      if (!cm || !(target instanceof Node) || !cm.dom.contains(target)) return;
      sourcePointerDownRef.current = true;
    };
    const onPointerUp = () => {
      if (!sourcePointerDownRef.current && !deferredCmReplaceRef.current) return;
      sourcePointerDownRef.current = false;
      if (!deferredCmReplaceRef.current) return;
      deferredCmReplaceRef.current = false;
      applyTipTapToOther({ forceFollower: true });
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('pointerup', onPointerUp, true);
    document.addEventListener('pointercancel', onPointerUp, true);
    return () => {
      document.removeEventListener('focusin', onFocusIn, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('pointercancel', onPointerUp, true);
    };
  }, [editor, enabled, cmViewRef, applyTipTapToOther, applyCmToOther]);

  // TipTap → CM + vault (only while TipTap is the keyboard-focus author)
  useEffect(() => {
    if (!editor || !enabled) return undefined;

    const scheduleTipTapSync = () => {
      if (originRef.current === 'cm' || originRef.current === 'external') return;
      if (composingRef.current) return;
      if (isBlockDragActive()) return;
      // Unfocused split panes must not publish (mount updates often serialize as "").
      if (!tipTapDrivesVault()) return;
      const author = resolveAuthor();
      if (author !== 'tiptap') return;
      lastAuthorRef.current = 'tiptap';
      bumpLocalInput(localInputAtRef);
      // Latest author wins — drop pending CM → TipTap so we do not stomp TipTap.
      clearCmTimer();
      clearTipTapTimer();
      const delay = debounceMsRef.current;
      if (delay <= 0) {
        if (!tipTapDrivesVault()) return;
        applyTipTapToOther();
        return;
      }
      tipTapTimer.current = setTimeout(() => {
        tipTapTimer.current = null;
        if (!editor) return;
        if (originRef.current === 'cm' || originRef.current === 'external') return;
        if (isBlockDragActive()) return;
        // Focus may have moved during debounce — only the focused pane may apply.
        if (!tipTapDrivesVault()) return;
        applyTipTapToOther();
      }, delay);
    };

    const onCompositionStart = () => {
      composingRef.current = true;
    };
    const onCompositionEnd = () => {
      composingRef.current = false;
      // IME commit may not emit another update — force cross-pane sync.
      scheduleTipTapSync();
    };
    const dom = editor.view.dom;
    dom.addEventListener('compositionstart', onCompositionStart);
    dom.addEventListener('compositionend', onCompositionEnd);

    editor.on('update', scheduleTipTapSync);
    return () => {
      editor.off('update', scheduleTipTapSync);
      dom.removeEventListener('compositionstart', onCompositionStart);
      dom.removeEventListener('compositionend', onCompositionEnd);
      clearTipTapTimer();
    };
  }, [
    editor,
    enabled,
    debounceMs,
    resolveAuthor,
    applyTipTapToOther,
    blockDragActiveRef,
    localInputAtRef,
    vaultReadyRef,
  ]);

  const notifyCmDocChanged = () => {
    if (!enabled || !editor) return;
    if (originRef.current === 'tiptap' || originRef.current === 'external') return;
    if (isBlockDragActive()) return;
    // Ignore programmatic CM replaces and unfocused panes.
    if (!cmDrivesVault()) return;
    const author = resolveAuthor();
    if (author !== 'cm') return;
    lastAuthorRef.current = 'cm';
    bumpLocalInput(localInputAtRef);
    clearTipTapTimer();
    clearCmTimer();
    if (cmIdleTimerRef.current) {
      clearTimeout(cmIdleTimerRef.current);
      cmIdleTimerRef.current = null;
    }
    const cm = cmViewRef.current;
    cmScheduleRef.current = {
      docLength: cm?.state.doc.length ?? 0,
      inputAt: localInputAtRef?.current ?? 0,
    };
    const delay = debounceMsRef.current;
    const run = () => {
      if (!editor) return;
      if (originRef.current === 'tiptap' || originRef.current === 'external') return;
      if (isBlockDragActive()) return;
      if (!cmDrivesVault()) return;
      const view = cmViewRef.current;
      if (view?.composing) return;
      if (
        shouldAbortScheduledApply({
          scheduledDocLength: cmScheduleRef.current.docLength,
          currentDocLength: view?.state.doc.length ?? -1,
          scheduledInputAt: cmScheduleRef.current.inputAt,
          currentInputAt: localInputAtRef?.current ?? 0,
        })
      ) {
        return;
      }
      applyCmToOther();
    };
    if (delay <= 0 && cm?.hasFocus) {
      if (cmPatchRafRef.current != null) return;
      cmPatchRafRef.current = requestAnimationFrame(() => {
        cmPatchRafRef.current = null;
        run();
      });
      return;
    }
    if (delay <= 0) {
      run();
      return;
    }
    cmTimer.current = setTimeout(() => {
      cmTimer.current = null;
      run();
    }, delay);
  };

  return {
    originRef,
    lastAuthorRef,
    notifyCmDocChanged,
    flush,
    cancelPending,
    pushEditorMarkdownToCmNow,
    pushCmMarkdownToEditorNow,
  };
}
