import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ContextMenu, Tabs } from 'radix-ui';
import { AnimatePresence, motion as Motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  FileText,
  History,
  Loader2,
  Pencil,
  Pin,
  X,
  Copy,
  ExternalLink,
} from 'lucide-react';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import {
  SELF_GROUP,
  formatMessageDateLabel,
  formatMessageTime,
  detectTimeZone,
  extractChatBodyAttachments,
  chatAttachmentsToMarkdown,
  resolveGroupLabel,
  formatChatMessagePlainText,
} from '@/utils/chatWithMyself';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatResultEnter from '@/components/chatWithMyself/ChatResultEnter';
import {
  createPretextMeasurer,
  decideTabDensity,
  splitLabelChars,
} from '@/utils/chatWithMyself/tabPretext.js';
import {
  chatMenuContentClass,
  chatMenuItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import { usePressableCardMenu } from '@/components/chatWithMyself/usePressableCardMenu';

/** @typedef {'pinned' | 'noted' | 'edited'} CollectionTabId */
/** @typedef {'full' | 'activeLabel' | 'iconOnly'} TabDensity */

/** Preview body max height for collection cards. */
const PREVIEW_MAX_H_CLASS = 'max-h-32';

const TAB_ORDER = /** @type {const} */ (['pinned', 'noted', 'edited']);

/**
 * Keep line breaks for collection previews; collapse runs of newlines to one.
 * @param {string} text
 */
function formatCollectionPreview(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g, (_, path, name) => {
      return (
        String(name || '').trim() ||
        String(path || '')
          .split('/')
          .filter(Boolean)
          .pop() ||
        'note'
      );
    })
    .replace(
      /\[([^\]]+)\]\(((?:\/view\/[^)\s]+|https?:\/\/[^)\s]+))\)/g,
      '$1',
    )
    .replace(/\n+/g, '\n')
    .trim();
}

const TABS = [
  {
    id: /** @type {CollectionTabId} */ ('pinned'),
    label: '고정됨',
    Icon: Pin,
    empty: '고정된 메시지가 없습니다',
  },
  {
    id: /** @type {CollectionTabId} */ ('noted'),
    label: '노트화',
    Icon: FileText,
    empty: '노트로 보낸 메시지가 없습니다',
  },
  {
    id: /** @type {CollectionTabId} */ ('edited'),
    label: '수정됨',
    Icon: Pencil,
    empty: '수정된 메시지가 없습니다',
  },
];

const ICON_SIZE = 13;
const TAB_PAD_X = 8; // px-2
const TAB_GAP = 6; // gap-1.5
const COUNT_GAP = 4;
const COUNT_FONT = '10px';
/** Ignore close while the rail is still opening / extremely narrow. */
const CLOSE_MIN_AVAILABLE = 72;
const CLOSE_DEBOUNCE_MS = 320;

const CHAR_STAGGER = 0.028;
const CHAR_SPRING = { type: 'spring', stiffness: 520, damping: 34, mass: 0.45 };
const TAB_LAYOUT_SPRING = { type: 'spring', stiffness: 420, damping: 36, mass: 0.7 };
const COUNT_TWEEN = { duration: 0.18, ease: [0.22, 1, 0.36, 1] };

const tabTriggerBaseClass =
  'relative inline-flex shrink-0 items-center justify-center gap-1.5 border-b-2 border-transparent px-2 py-2 text-[11px] font-medium text-gray-500 outline-none transition-[color,border-color,background-color] hover:text-gray-800 focus-visible:bg-gray-50 data-[state=active]:border-blue-500 data-[state=active]:text-blue-700 dark:text-gray-400 dark:hover:text-gray-200 dark:focus-visible:bg-odp-focusBg dark:data-[state=active]:border-blue-400 dark:data-[state=active]:text-blue-300';

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () => setCoarse(mq.matches || window.innerWidth < 768);
    mq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);
  return coarse;
}

async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    /* ignore */
  }
}

/**
 * @param {{
 *   msg: object,
 *   onSelect?: (msg: object) => void,
 *   onTogglePin?: (msg: object) => void,
 *   onOpenNote?: (path: string, msg: object) => void,
 *   onViewEditHistory?: (msg: object) => void,
 *   _Item: any,
 * }} props
 */
function CollectionCardMenuItems({
  msg,
  onSelect,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  _Item,
}) {
  const pinned = Boolean(msg?.pinnedAt);
  return (
    <>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onSelect?.(msg)}
      >
        <ExternalLink size={16} className="shrink-0 text-gray-500" />
        메시지로 이동
      </_Item>
      <_Item
        className={chatMenuItemClass}
        onSelect={() => onTogglePin?.(msg)}
      >
        <Pin size={16} className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`} />
        {pinned ? '고정 해제' : '고정'}
      </_Item>
      {msg?.notePath ? (
        <_Item
          className={chatMenuItemClass}
          onSelect={() => onOpenNote?.(msg.notePath, msg)}
        >
          <FileText size={16} className="shrink-0 text-gray-500" />
          노트 열기
        </_Item>
      ) : null}
      {msg?.editedAt ? (
        <_Item
          className={chatMenuItemClass}
          onSelect={() => onViewEditHistory?.(msg)}
        >
          <History size={16} className="shrink-0 text-gray-500" />
          수정 기록
        </_Item>
      ) : null}
      <_Item
        className={chatMenuItemClass}
        onSelect={() => {
          void copyText(formatChatMessagePlainText(msg));
        }}
      >
        <Copy size={16} className="shrink-0 text-gray-500" />
        내용 복사
      </_Item>
    </>
  );
}

function CollectionCard({
  msg,
  tab,
  timeZone,
  onSelect,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  getPresignedUrl,
  groups = [],
  coarse,
}) {
  const tz = timeZone || detectTimeZone();
  const time = formatMessageTime(msg.at, tz);
  const { text, attachments } = extractChatBodyAttachments(msg.body || '');
  const preview = formatCollectionPreview(text);
  const attachmentMarkdown = chatAttachmentsToMarkdown(attachments);
  const hasAttachments = attachments.length > 0;
  const hasContent = Boolean(preview) || hasAttachments;
  const groupLabel = resolveGroupLabel(groups, msg.group || SELF_GROUP);

  const previewRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [overflows, setOverflows] = useState(false);
  const {
    contextMenuOpen,
    setContextMenuOpen,
    shapeActive,
    longPressOpenedRef,
    motionAnimate,
    motionTransition,
    interactiveClass,
    bindPress,
  } = usePressableCardMenu({ enabled: true, coarse });

  useLayoutEffect(() => {
    const el = previewRef.current;
    if (!el) {
      setOverflows(false);
      return undefined;
    }
    const check = () => {
      setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [preview, attachmentMarkdown, hasContent]);

  const cardInner = (
    <Motion.div
      className={`rounded-xl border border-black/8 bg-white px-3 py-2.5 shadow-sm origin-center will-change-transform select-none [-webkit-touch-callout:none] transition-[background-color,box-shadow,border-color] duration-200 ease-out dark:border-white/10 dark:bg-[#243044] ${interactiveClass}`}
      initial={false}
      animate={motionAnimate}
      transition={motionTransition}
      {...bindPress}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="truncate font-medium text-gray-700 dark:text-gray-200">
          {groupLabel}
        </span>
        <span className="shrink-0 tabular-nums">{time}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          if (longPressOpenedRef.current) {
            longPressOpenedRef.current = false;
            return;
          }
          onSelect?.(msg);
        }}
        className="w-full text-left select-text"
      >
        {hasContent ? (
          <div className="relative">
            <div
              ref={previewRef}
              className={`${PREVIEW_MAX_H_CLASS} overflow-hidden`}
            >
              {preview ? (
                <div className="whitespace-pre-wrap wrap-anywhere text-sm leading-relaxed text-gray-800 dark:text-odp-fg">
                  {preview}
                </div>
              ) : null}
              {hasAttachments ? (
                <div
                  className={`${preview ? 'mt-1.5' : ''} [&_a]:mt-0! [&_button]:mt-0! [&_div]:mt-0!`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <ChatLinkedText
                    text={attachmentMarkdown}
                    className="text-sm text-gray-800 dark:text-odp-fg"
                    getPresignedUrl={getPresignedUrl}
                    onOpenViewPath={
                      onOpenNote ? (path) => onOpenNote(path, msg) : undefined
                    }
                  />
                </div>
              ) : null}
            </div>
            {overflows ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-end justify-end px-0.5 pb-0.5"
                aria-hidden
              >
                {/* Base fade matches card surface */}
                <div className="absolute inset-0 bg-linear-to-t from-white from-25% via-white/80 to-transparent transition-opacity duration-200 dark:from-[#243044] dark:via-[#243044]/80" />
                {/* Press / menu tint — same sky wash as card interactiveClass */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-sky-500/20 from-25% via-sky-500/12 to-transparent transition-opacity duration-200 dark:from-sky-400/20 dark:via-sky-400/12 ${
                    shapeActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <span className="relative text-xs leading-none text-gray-400 dark:text-gray-500">
                  …
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-gray-400">(빈 메시지)</div>
        )}
      </button>
      {tab === 'noted' && msg.notePath ? (
        <div className="mt-2 flex justify-end gap-1">
          <button
            type="button"
            onClick={() => onOpenNote?.(msg.notePath, msg)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/30"
          >
            <FileText size={12} />
            노트 열기
          </button>
        </div>
      ) : null}
      {tab === 'edited' ? (
        <div className="mt-2 flex justify-end gap-1">
          <button
            type="button"
            onClick={() => onViewEditHistory?.(msg)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          >
            <History size={12} />
            수정 기록
          </button>
        </div>
      ) : null}
    </Motion.div>
  );

  return (
    <ContextMenu.Root open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
      <ContextMenu.Trigger asChild>{cardInner}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={chatMenuContentClass}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <CollectionCardMenuItems
            msg={msg}
            onSelect={onSelect}
            onTogglePin={onTogglePin}
            onOpenNote={onOpenNote}
            onViewEditHistory={onViewEditHistory}
            _Item={ContextMenu.Item}
          />
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

function buildResultItems(results, tz) {
  const out = [];
  let lastDate = '';
  for (const r of results) {
    const dateStr = r.dateStr || '';
    if (dateStr && dateStr !== lastDate) {
      out.push({
        type: 'date',
        key: `date-${dateStr}`,
        label: formatMessageDateLabel(r.at || `${dateStr}T12:00:00`, tz),
      });
      lastDate = dateStr;
    }
    out.push({ type: 'msg', key: `${dateStr}-${r.id}`, result: r });
  }
  return out;
}

function estimateTabWidth({
  measureLabel,
  measureCount,
  labelSlice,
  count,
  showCount,
}) {
  let w = TAB_PAD_X * 2 + ICON_SIZE;
  if (labelSlice) {
    w += TAB_GAP + measureLabel(labelSlice);
  }
  if (showCount && count > 0) {
    w += COUNT_GAP + measureCount(String(count));
  }
  return Math.ceil(w);
}

/**
 * Adaptive tabs: pretext width → Motion char stagger → icon-only → close rail.
 */
function CollectionTabList({
  tab,
  onTabChange,
  lists,
  onClose,
  allowAutoClose = true,
}) {
  const listRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const fontSampleRef = useRef(/** @type {HTMLSpanElement | null} */ (null));
  const [density, setDensity] = useState(/** @type {TabDensity} */ ('full'));
  const closeTimerRef = useRef(/** @type {ReturnType<typeof setTimeout> | null} */ (null));
  const measurersRef = useRef({
    label: createPretextMeasurer('500 11px ui-sans-serif, system-ui, sans-serif'),
    count: createPretextMeasurer(`500 ${COUNT_FONT} ui-sans-serif, system-ui, sans-serif`),
  });

  const counts = useMemo(
    () => ({
      pinned: lists.pinned?.length || 0,
      noted: lists.noted?.length || 0,
      edited: lists.edited?.length || 0,
    }),
    [lists],
  );

  const visibleCharCounts = useMemo(() => {
    /** @type {Record<string, number>} */
    const targets = {};
    for (const t of TABS) {
      const full = splitLabelChars(t.label).length;
      if (density === 'full') targets[t.id] = full;
      else if (density === 'activeLabel') targets[t.id] = t.id === tab ? full : 0;
      else targets[t.id] = 0;
    }
    return targets;
  }, [density, tab]);

  // Sync measurers to live computed font.
  useLayoutEffect(() => {
    const el = fontSampleRef.current;
    if (!el || typeof window === 'undefined') return;
    const cs = window.getComputedStyle(el);
    const weight = cs.fontWeight || '500';
    const size = cs.fontSize || '11px';
    const family = cs.fontFamily || 'sans-serif';
    measurersRef.current.label = createPretextMeasurer(`${weight} ${size} ${family}`);
    measurersRef.current.count = createPretextMeasurer(
      `${weight} ${COUNT_FONT} ${family}`,
    );
  }, [tab, density]);

  const evaluateDensity = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const available = list.clientWidth;
    if (available <= 0) return;

    const { label: measureLabel, count: measureCount } = measurersRef.current;

    let fullTotal = 0;
    let activeLabelTotal = 0;
    let iconOnlyTotal = 0;

    for (const t of TABS) {
      const count = counts[t.id] || 0;
      const fullLabel = t.label;
      fullTotal += estimateTabWidth({
        measureLabel,
        measureCount,
        labelSlice: fullLabel,
        count,
        showCount: count > 0,
      });
      activeLabelTotal += estimateTabWidth({
        measureLabel,
        measureCount,
        labelSlice: t.id === tab ? fullLabel : '',
        count,
        showCount: t.id === tab && count > 0,
      });
      iconOnlyTotal += estimateTabWidth({
        measureLabel,
        measureCount,
        labelSlice: '',
        count,
        showCount: false,
      });
    }

    const next = decideTabDensity({
      available,
      fullTotal,
      activeLabelTotal,
      iconOnlyTotal,
    });

    if (next === 'close') {
      if (!allowAutoClose) {
        setDensity('iconOnly');
        return;
      }
      if (available < CLOSE_MIN_AVAILABLE) {
        setDensity('iconOnly');
        return;
      }
      setDensity('iconOnly');
      if (closeTimerRef.current) return;
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        const w = listRef.current?.clientWidth ?? 0;
        if (w < CLOSE_MIN_AVAILABLE) return;
        const { label: ml, count: mc } = measurersRef.current;
        let icons = 0;
        for (const t of TABS) {
          icons += estimateTabWidth({
            measureLabel: ml,
            measureCount: mc,
            labelSlice: '',
            count: counts[t.id] || 0,
            showCount: false,
          });
        }
        if (icons > w + 2) {
          onClose?.();
        }
      }, CLOSE_DEBOUNCE_MS);
      return;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setDensity((prev) => (prev === next ? prev : next));
  }, [counts, tab, onClose, allowAutoClose]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') {
      evaluateDensity();
      return undefined;
    }
    const ro = new ResizeObserver(() => evaluateDensity());
    ro.observe(list);
    evaluateDensity();
    return () => ro.disconnect();
  }, [evaluateDensity]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <Tabs.Root value={tab} onValueChange={onTabChange}>
      <span
        ref={fontSampleRef}
        className="sr-only text-[11px] font-medium"
        aria-hidden
      >
        고정됨
      </span>
      <Tabs.List
        ref={listRef}
        className="flex w-full items-stretch justify-start gap-0 overflow-hidden px-1"
        aria-label="모아보기 분류"
      >
        {TABS.map(({ id, label, Icon }) => {
          const count = counts[id] || 0;
          const chars = splitLabelChars(label);
          const visible = Math.max(0, Math.min(chars.length, visibleCharCounts[id] ?? 0));
          const showCount = visible > 0 && count > 0;
          return (
            <Tabs.Trigger key={id} value={id} asChild>
              <Motion.button
                type="button"
                layout
                transition={TAB_LAYOUT_SPRING}
                className={tabTriggerBaseClass}
                aria-label={label}
                title={label}
              >
                <Icon size={ICON_SIZE} className="shrink-0 opacity-80" aria-hidden />
                <span className="inline-flex items-center overflow-hidden whitespace-nowrap">
                  <AnimatePresence initial={false} mode="popLayout">
                    {chars.slice(0, visible).map((ch, i) => (
                      <Motion.span
                        key={`${id}-ch-${i}`}
                        layout
                        initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          filter: 'blur(3px)',
                          transition: {
                            ...CHAR_SPRING,
                            delay: Math.max(0, visible - 1 - i) * CHAR_STAGGER,
                          },
                        }}
                        transition={{
                          ...CHAR_SPRING,
                          delay: i * CHAR_STAGGER,
                        }}
                        className="inline-block"
                      >
                        {ch}
                      </Motion.span>
                    ))}
                  </AnimatePresence>
                </span>
                <AnimatePresence initial={false}>
                  {showCount ? (
                    <Motion.span
                      key={`${id}-count`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 0.6, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={COUNT_TWEEN}
                      className="tabular-nums text-[10px]"
                    >
                      {count}
                    </Motion.span>
                  ) : null}
                </AnimatePresence>
              </Motion.button>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}

function CollectionSlide({
  tabId,
  list,
  loading,
  emptyHint,
  timeZone,
  onSelect,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  getPresignedUrl,
  groups,
  coarse,
}) {
  const tz = timeZone || detectTimeZone();
  const resultItems = useMemo(() => buildResultItems(list, tz), [list, tz]);

  return (
    <div className="h-full min-h-0 min-w-0 flex-[0_0_100%] overflow-y-auto overscroll-contain bg-[#d7e4ef] px-2 py-3 dark:bg-[#0b1220]">
      <div className="space-y-2">
        {loading && list.length === 0 ? (
          <div className="flex justify-center py-8" aria-label="불러오는 중" role="status">
            <Loader2 size={18} className="animate-spin text-gray-400" />
          </div>
        ) : null}

        {resultItems.map((item, index) =>
          item.type === 'date' ? (
            <ChatResultEnter key={`${tabId}-${item.key}`} index={index}>
              <ChatDateDivider
                label={item.label}
                className="-mx-2 z-1"
                surfaceClassName="bg-[#d7e4ef] dark:bg-[#0b1220]"
                bubbleClassName="bg-[#c5d5e4] text-gray-700 dark:bg-[#152033] dark:text-gray-300"
              />
            </ChatResultEnter>
          ) : (
            <ChatResultEnter key={`${tabId}-${item.key}`} index={index}>
              <CollectionCard
                msg={item.result}
                tab={tabId}
                timeZone={tz}
                onSelect={onSelect}
                onTogglePin={onTogglePin}
                onOpenNote={onOpenNote}
                onViewEditHistory={onViewEditHistory}
                getPresignedUrl={getPresignedUrl}
                groups={groups}
                coarse={coarse}
              />
            </ChatResultEnter>
          ),
        )}

        {!loading && list.length === 0 ? (
          <div className="py-10 text-center text-xs text-gray-500 dark:text-gray-400">
            {emptyHint}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Collection rail: pinned / noted / edited tabs (editor-tab style) + swipe carousel.
 */
export default function ChatPinnedPanel({
  open,
  onClose,
  pinnedResults = [],
  notedResults = [],
  editedResults = [],
  /** @deprecated Prefer pinnedResults */
  results,
  loading = false,
  onSelectResult,
  onUnpin,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  timeZone,
  getPresignedUrl,
  groups = [],
  disableTabAutoClose = false,
}) {
  const [tab, setTab] = useState(/** @type {CollectionTabId} */ ('pinned'));
  const coarse = useIsCoarsePointer();
  const togglePin = onTogglePin || onUnpin;

  const lists = useMemo(
    () => ({
      pinned: pinnedResults?.length ? pinnedResults : results || [],
      noted: notedResults || [],
      edited: editedResults || [],
    }),
    [pinnedResults, notedResults, editedResults, results],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    containScroll: 'trimSnaps',
    duration: 22,
    // Mouse drag fights card select / context menu; keep touch swipe + tab clicks.
    watchDrag: (_api, evt) => evt.type === 'touchstart',
  });

  // Swipe → tab header
  useEffect(() => {
    if (!emblaApi) return undefined;
    const onSelect = () => {
      const i = emblaApi.selectedScrollSnap();
      const next = TAB_ORDER[i] || 'pinned';
      setTab((prev) => (prev === next ? prev : next));
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Tab header → carousel
  const handleTabChange = useCallback(
    (value) => {
      const next = /** @type {CollectionTabId} */ (value);
      setTab(next);
      const idx = TAB_ORDER.indexOf(next);
      if (idx >= 0) emblaApi?.scrollTo(idx);
    },
    [emblaApi],
  );

  // Keep snap in sync if tab restored while closed/reopened.
  useEffect(() => {
    if (!open || !emblaApi) return;
    const idx = TAB_ORDER.indexOf(tab);
    if (idx >= 0 && emblaApi.selectedScrollSnap() !== idx) {
      emblaApi.scrollTo(idx, true);
    }
  }, [open, emblaApi, tab]);

  if (!open) return null;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft">
      <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <div className="flex items-center gap-2 px-3 py-2">
          <Pin size={16} className="shrink-0 text-gray-500" />
          <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            모아보기
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="모아보기 닫기"
          >
            <X size={16} />
          </button>
        </div>

        <CollectionTabList
          tab={tab}
          onTabChange={handleTabChange}
          lists={lists}
          onClose={onClose}
          allowAutoClose={!disableTabAutoClose}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {TABS.map(({ id, empty }) => (
            <CollectionSlide
              key={id}
              tabId={id}
              list={lists[id] || []}
              loading={loading}
              emptyHint={empty}
              timeZone={timeZone}
              onSelect={onSelectResult}
              onTogglePin={togglePin}
              onOpenNote={onOpenNote}
              onViewEditHistory={onViewEditHistory}
              getPresignedUrl={getPresignedUrl}
              groups={groups}
              coarse={coarse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
