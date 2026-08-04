import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'radix-ui';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { FileText, History, Loader2, Pencil, Pin, X } from 'lucide-react';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import {
  SELF_GROUP,
  formatMessageDateLabel,
  formatMessageTime,
  detectTimeZone,
  extractChatBodyAttachments,
  chatAttachmentsToMarkdown,
  resolveGroupLabel,
} from '@/utils/chatWithMyself';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatResultEnter from '@/components/chatWithMyself/ChatResultEnter';
import {
  createPretextMeasurer,
  decideTabDensity,
  splitLabelChars,
} from '@/utils/chatWithMyself/tabPretext.js';

/** @typedef {'pinned' | 'noted' | 'edited'} CollectionTabId */
/** @typedef {'full' | 'activeLabel' | 'iconOnly'} TabDensity */

/** Preview body max height for collection cards. */
const PREVIEW_MAX_H_CLASS = 'max-h-32';

/**
 * Keep line breaks for collection previews; collapse runs of newlines to one.
 * @param {string} text
 */
function formatCollectionPreview(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
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

function CollectionCard({
  msg,
  tab,
  timeZone,
  onSelect,
  onUnpin,
  onOpenNote,
  onViewEditHistory,
  getPresignedUrl,
  groups = [],
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

  return (
    <div className="rounded-xl border border-black/8 bg-white px-3 py-2.5 shadow-sm dark:border-white/10 dark:bg-[#243044]">
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="truncate font-medium text-gray-700 dark:text-gray-200">
          {groupLabel}
        </span>
        <span className="shrink-0 tabular-nums">{time}</span>
      </div>
      <button
        type="button"
        onClick={() => onSelect?.(msg)}
        className="w-full text-left"
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
                  className={`${preview ? 'mt-1.5' : ''} [&_a]:!mt-0 [&_button]:!mt-0 [&_div]:!mt-0`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <ChatLinkedText
                    text={attachmentMarkdown}
                    className="text-sm text-gray-800 dark:text-odp-fg"
                    getPresignedUrl={getPresignedUrl}
                  />
                </div>
              ) : null}
            </div>
            {overflows ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex h-10 items-end justify-end bg-linear-to-t from-white from-25% via-white/80 to-transparent px-0.5 pb-0.5 dark:from-[#243044] dark:via-[#243044]/80"
                aria-hidden
              >
                <span className="text-xs leading-none text-gray-400 dark:text-gray-500">
                  …
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-gray-400">(빈 메시지)</div>
        )}
      </button>
      <div className="mt-2 flex justify-end gap-1">
        {tab === 'pinned' ? (
          <button
            type="button"
            onClick={() => onUnpin?.(msg)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          >
            <Pin size={12} className="rotate-45" />
            고정 해제
          </button>
        ) : null}
        {tab === 'noted' && msg.notePath ? (
          <button
            type="button"
            onClick={() => onOpenNote?.(msg.notePath, msg)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/30"
          >
            <FileText size={12} />
            노트 열기
          </button>
        ) : null}
        {tab === 'edited' ? (
          <button
            type="button"
            onClick={() => onViewEditHistory?.(msg)}
            className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          >
            <History size={12} />
            수정 기록
          </button>
        ) : null}
      </div>
    </div>
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
  }, [counts, tab, onClose]);

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
        {TABS.map(({ id, label, Icon: _Icon }) => {
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

/**
 * Collection rail: pinned / noted / edited tabs (editor-tab style).
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
  onOpenNote,
  onViewEditHistory,
  timeZone,
  getPresignedUrl,
  groups = [],
}) {
  const [tab, setTab] = useState(/** @type {CollectionTabId} */ ('pinned'));
  const tz = timeZone || detectTimeZone();

  const lists = useMemo(
    () => ({
      pinned: pinnedResults?.length ? pinnedResults : results || [],
      noted: notedResults || [],
      edited: editedResults || [],
    }),
    [pinnedResults, notedResults, editedResults, results],
  );

  const activeList = lists[tab] || [];
  const resultItems = useMemo(
    () => buildResultItems(activeList, tz),
    [activeList, tz],
  );
  const emptyHint = TABS.find((t) => t.id === tab)?.empty || '';

  const handleTabChange = useCallback((value) => {
    setTab(/** @type {CollectionTabId} */ (value));
  }, []);

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
        />
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#d7e4ef] px-2 py-3 dark:bg-[#0b1220]">
        {loading && activeList.length === 0 ? (
          <div className="flex justify-center py-8" aria-label="불러오는 중" role="status">
            <Loader2 size={18} className="animate-spin text-gray-400" />
          </div>
        ) : null}

        {resultItems.map((item, index) =>
          item.type === 'date' ? (
            <ChatResultEnter key={`${tab}-${item.key}`} index={index}>
              <ChatDateDivider
                label={item.label}
                className="-mx-2 z-1"
                surfaceClassName="bg-[#d7e4ef] dark:bg-[#0b1220]"
                bubbleClassName="bg-[#c5d5e4] text-gray-700 dark:bg-[#152033] dark:text-gray-300"
              />
            </ChatResultEnter>
          ) : (
            <ChatResultEnter key={`${tab}-${item.key}`} index={index}>
              <CollectionCard
                msg={item.result}
                tab={tab}
                timeZone={tz}
                onSelect={onSelectResult}
                onUnpin={onUnpin}
                onOpenNote={onOpenNote}
                onViewEditHistory={onViewEditHistory}
                getPresignedUrl={getPresignedUrl}
                groups={groups}
              />
            </ChatResultEnter>
          ),
        )}

        {!loading && activeList.length === 0 ? (
          <div className="py-10 text-center text-xs text-gray-500 dark:text-gray-400">
            {emptyHint}
          </div>
        ) : null}
      </div>
    </div>
  );
}
