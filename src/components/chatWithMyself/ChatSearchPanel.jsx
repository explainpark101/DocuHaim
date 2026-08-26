import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  Copy,
  ExternalLink,
  Filter,
  History,
  Loader2,
  Pin,
  RefreshCw,
  Search,
  FileText,
  SmilePlus,
  X,
} from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Form, Switch } from 'radix-ui';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
} from '@/components/shared/contextMenu/AdaptiveContextMenu';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import ChatDatePicker from '@/components/chatWithMyself/ui/ChatDatePicker';
import ChatDateTimePicker from '@/components/chatWithMyself/ui/ChatDateTimePicker';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import ChatReactionGlyph from '@/components/chatWithMyself/ChatReactionGlyph';
import ChatReactionPicker from '@/components/chatWithMyself/ChatReactionPicker';
import ChatResultEnter from '@/components/chatWithMyself/ChatResultEnter';
import {
  chatFieldInputClass,
  chatMenuContentClass,
  chatMenuItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import { usePressableCardMenu } from '@/components/chatWithMyself/usePressableCardMenu';
import { copyText } from '@/utils/shared/copyText';
import {
  SELF_GROUP,
  formatMessageDateLabel,
  formatMessageTime,
  detectTimeZone,
  sortGroupsKo,
  renderSearchResultHtml,
  extractChatBodyAttachments,
  chatAttachmentsToMarkdown,
  resolveGroupLabel,
  formatChatMessagePlainText,
  reactionKey,
  fuzzyMatchText,
  splitSearchTokens,
  reactionsToSearchText,
  findGroup,
  resolveGroupId,
} from '@/utils/chatWithMyself';

const searchFilterSwitchRootClass =
  'relative h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent bg-gray-300 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:bg-blue-600 dark:bg-odp-borderStrong dark:data-[state=checked]:bg-blue-500';

const searchFilterSwitchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

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

function SearchResultMenuItems({
  result,
  onSelect,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  noteExists,
}) {
  const pinned = Boolean(result?.pinnedAt);
  return (
    <>
      <AdaptiveMenuItem className={chatMenuItemClass} onSelect={() => onSelect?.(result)}>
        <ExternalLink size={16} className="shrink-0 text-gray-500" />
        메시지로 이동
      </AdaptiveMenuItem>
      {onTogglePin ? (
        <AdaptiveMenuItem className={chatMenuItemClass} onSelect={() => onTogglePin?.(result)}>
          <Pin size={16} className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`} />
          {pinned ? '고정 해제' : '고정'}
        </AdaptiveMenuItem>
      ) : null}
      {result?.notePath &&
      onOpenNote &&
      (typeof noteExists !== 'function' || noteExists(result.notePath)) ? (
        <AdaptiveMenuItem
          className={chatMenuItemClass}
          onSelect={() => onOpenNote?.(result.notePath, result)}
        >
          <FileText size={16} className="shrink-0 text-gray-500" />
          노트 열기
        </AdaptiveMenuItem>
      ) : null}
      {result?.editedAt && onViewEditHistory ? (
        <AdaptiveMenuItem
          className={chatMenuItemClass}
          onSelect={() => onViewEditHistory?.(result)}
        >
          <History size={16} className="shrink-0 text-gray-500" />
          수정 기록
        </AdaptiveMenuItem>
      ) : null}
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        onSelect={() => {
          void copyText(formatChatMessagePlainText(result));
        }}
      >
        <Copy size={16} className="shrink-0 text-gray-500" />
        내용 복사
      </AdaptiveMenuItem>
    </>
  );
}

function SearchResultCard({
  result,
  query,
  timeZone,
  onSelect,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  getPresignedUrl,
  noteExists,
  folderExists,
  listFolderFiles,
  groups = [],
  coarse,
}) {
  const { text, attachments } = useMemo(
    () => extractChatBodyAttachments(result.body || ''),
    [result.body],
  );
  // Text only — do not fall back to raw body (avoids wiki tokens as markdown + duplicate media).
  const previewSource = text.trim();
  const html = useMemo(
    () =>
      renderSearchResultHtml(previewSource, query, result.ogSearchText || '', {
        markdown: result.markdown === true || result.markdown === '1',
      }),
    [previewSource, result.ogSearchText, result.markdown, query],
  );
  const attachmentMarkdown = useMemo(
    () => chatAttachmentsToMarkdown(attachments),
    [attachments],
  );
  const time = formatMessageTime(result.at, timeZone || detectTimeZone());
  const hasAttachments = attachments.length > 0;
  const reactions = Array.isArray(result.reactions) ? result.reactions : [];
  const q = String(query || '').trim();
  const queryTokens = splitSearchTokens(q);
  const matchedReactionKeys = new Set(
    queryTokens.length > 0
      ? reactions
          .filter((reaction) =>
            queryTokens.some((token) =>
              fuzzyMatchText(reactionsToSearchText([reaction]), token),
            ),
          )
          .map((reaction) => reactionKey(reaction))
      : [],
  );
  const showReactions = reactions.length > 0;
  const showPreview =
    Boolean(previewSource) || Boolean(String(result.ogSearchText || '').trim());

  const {
    contextMenuOpen,
    setContextMenuOpen,
    longPressOpenedRef,
    motionAnimate,
    motionTransition,
    interactiveClass,
    bindPress,
  } = usePressableCardMenu({ enabled: true, coarse });

  const card = (
    <Motion.div
      className={`w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-left shadow-sm origin-center will-change-transform select-none [-webkit-touch-callout:none] transition-[background-color,box-shadow,border-color] duration-200 ease-out dark:border-white/10 dark:bg-[#243044] ${interactiveClass}`}
      initial={false}
      animate={motionAnimate}
      transition={motionTransition}
      {...bindPress}
    >
      <button
        type="button"
        className="w-full text-left"
        onClick={() => {
          if (longPressOpenedRef.current) {
            longPressOpenedRef.current = false;
            return;
          }
          onSelect?.(result);
        }}
      >
        <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="truncate font-medium text-gray-700 dark:text-gray-200">
            {resolveGroupLabel(groups, result.group || SELF_GROUP)}
          </span>
          <span className="shrink-0 tabular-nums">{time}</span>
        </div>
        {showPreview || hasAttachments || showReactions ? (
          /* Mobile: clip preview so vertical pans scroll the results list (global),
             not a nested bubble scroller. Desktop keeps in-card scroll. */
          <div
            className={`max-h-48 ${
              coarse
                ? 'overflow-hidden'
                : 'overflow-y-auto overscroll-contain'
            }`}
          >
            {showPreview ? (
              <div
                className="chat-search-md text-sm leading-relaxed text-gray-800 dark:text-odp-fg [&_a]:text-blue-600 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:text-[12px] dark:[&_a]:text-blue-300 dark:[&_code]:bg-white/10 [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-black/5 [&_pre]:p-2 dark:[&_pre]:bg-black/30 [&_p+p]:mt-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null}
            {hasAttachments ? (
              <div
                className={`${showPreview ? 'mt-1.5' : ''} [&_a]:!mt-0 [&_button]:!mt-0 [&_div]:!mt-0`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
              >
                <ChatLinkedText
                  text={attachmentMarkdown}
                  className="text-sm text-gray-800 dark:text-odp-fg"
                  getPresignedUrl={getPresignedUrl}
                  noteExists={noteExists}
                  folderExists={folderExists}
                  listFolderFiles={listFolderFiles}
                  onOpenViewPath={
                    onOpenNote
                      ? (path) => onOpenNote(path, result)
                      : undefined
                  }
                />
              </div>
            ) : null}
            {showReactions ? (
              <div
                className={`${showPreview || hasAttachments ? 'mt-1.5' : ''} flex flex-wrap items-center gap-1`}
                aria-label="반응"
              >
                {reactions.map((reaction) => {
                  const matched = matchedReactionKeys.has(reactionKey(reaction));
                  return (
                    <span
                      key={reactionKey(reaction)}
                      className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 text-xs shadow-sm transition-[opacity,border-color,background-color] duration-200 ${
                        matched
                          ? 'border-amber-400 bg-amber-50 text-gray-800 dark:border-amber-500/50 dark:bg-amber-500/20 dark:text-odp-fg'
                          : 'border-gray-300/80 bg-white/90 text-gray-700 dark:border-white/15 dark:bg-[#1a2333] dark:text-odp-fg'
                      } ${reaction.pending ? 'opacity-40' : 'opacity-100'}`}
                      title={reaction.pending ? '반응 저장 중' : reaction.value}
                    >
                      <ChatReactionGlyph reaction={reaction} size={14} />
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}
      </button>
    </Motion.div>
  );

  const menuTitle =
    (result.body || '').replace(/\s+/g, ' ').slice(0, 120) || '(빈 메시지)';

  return (
    <AdaptiveContextMenu
      open={contextMenuOpen}
      onOpenChange={setContextMenuOpen}
      title={menuTitle}
      subtitle="검색 결과"
      contentClassName={chatMenuContentClass}
      trigger={card}
    >
      <SearchResultMenuItems
        result={result}
        onSelect={onSelect}
        onTogglePin={onTogglePin}
        onOpenNote={onOpenNote}
        onViewEditHistory={onViewEditHistory}
        noteExists={noteExists}
      />
    </AdaptiveContextMenu>
  );
}

/**
 * Search / filter panel: sticky search bar, collapsible filters, bubble result cards.
 */
export default function ChatSearchPanel({
  open,
  onClose,
  groups = [],
  dayKeys = [],
  onSearch,
  results = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onSelectResult,
  onTogglePin,
  onOpenNote,
  onViewEditHistory,
  timeZone,
  getPresignedUrl,
  noteExists,
  folderExists,
  listFolderFiles,
  focusTick = 0,
  query = '',
  onQueryChange,
  groupFilter = '__all__',
  onGroupFilterChange,
  dateFilter = '',
  onDateFilterChange,
  fromDt = '',
  onFromDtChange,
  toDt = '',
  onToDtChange,
  noReactionsOnly = false,
  onNoReactionsOnlyChange,
  filtersOpen = false,
  onFiltersOpenChange,
  onDismissGroupFilter,
}) {
  const [reactionPickerOpen, setReactionPickerOpen] = useState(false);
  const listRef = useRef(null);
  const queryInputRef = useRef(null);
  const coarse = useIsCoarsePointer();
  const tz = timeZone || detectTimeZone();
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);
  const availableDaySet = useMemo(() => new Set(dayKeys), [dayKeys]);
  const isDateUnavailable = useMemo(
    () => (date) => !availableDaySet.has(date.toString()),
    [availableDaySet],
  );
  const groupOptions = useMemo(
    () => [
      { value: '__all__', label: '전체' },
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g) => ({
        value: g.id,
        label: g.name,
        iconPath: g.iconPath,
      })),
    ],
    [sortedGroups],
  );

  const filtersActive =
    (groupFilter && groupFilter !== '__all__') ||
    Boolean(dateFilter) ||
    Boolean(fromDt) ||
    Boolean(toDt) ||
    Boolean(noReactionsOnly);
  const canSearch = Boolean(query.trim()) || filtersActive;
  const groupFilterActive = Boolean(groupFilter && groupFilter !== '__all__');
  const groupFilterMeta = useMemo(() => {
    if (!groupFilterActive) return null;
    const id = resolveGroupId(groups, groupFilter);
    if (id === SELF_GROUP) {
      return { id: SELF_GROUP, name: SELF_GROUP, iconPath: null };
    }
    const found = findGroup(groups, groupFilter);
    return {
      id,
      name: found?.name || resolveGroupLabel(groups, groupFilter),
      iconPath: found?.iconPath || null,
    };
  }, [groupFilterActive, groupFilter, groups]);

  const dismissGroupFilter = () => {
    if (onDismissGroupFilter) {
      onDismissGroupFilter();
      return;
    }
    onGroupFilterChange?.('__all__');
  };

  const handleRefreshResults = () => {
    if (!canSearch || loading) return;
    if (listRef.current) listRef.current.scrollTop = 0;
    onSearch?.({
      query: query.trim(),
      groupFilter,
      dateFilter,
      fromDt,
      toDt,
      noReactionsOnly: Boolean(noReactionsOnly),
    });
  };

  const handleReactionSearchPick = (reaction) => {
    const token =
      reaction?.kind === 'lucide'
        ? String(reaction.value || '').trim()
        : String(reaction?.value || '').trim();
    if (!token || !onQueryChange) return;
    onQueryChange((prev) => {
      const parts = splitSearchTokens(prev);
      const idx = parts.findIndex(
        (part) => part.toLowerCase() === token.toLowerCase(),
      );
      if (idx >= 0) {
        return [...parts.slice(0, idx), ...parts.slice(idx + 1)].join(' ');
      }
      return [...parts, token].join(' ');
    });
  };

  const resultItems = useMemo(() => {
    const out = [];
    let lastDate = '';
    for (const r of results) {
      const dateStr = r.dateStr || '';
      if (dateStr && dateStr !== lastDate) {
        out.push({
          type: 'date',
          key: `date-${dateStr}`,
          dateStr,
          label: formatMessageDateLabel(
            r.at || `${dateStr}T12:00:00`,
            tz,
          ),
        });
        lastDate = dateStr;
      }
      out.push({ type: 'msg', key: `${dateStr}-${r.id}`, result: r });
    }
    return out;
  }, [results, tz]);

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch?.({
        query: query.trim(),
        groupFilter,
        dateFilter,
        fromDt,
        toDt,
        noReactionsOnly: Boolean(noReactionsOnly),
      });
    }, 250);
    return () => clearTimeout(t);
  }, [query, groupFilter, dateFilter, fromDt, toDt, noReactionsOnly, onSearch]);

  useEffect(() => {
    if (!open) {
      setReactionPickerOpen(false);
      return;
    }
    const id = window.requestAnimationFrame(() => {
      queryInputRef.current?.focus();
      if (focusTick > 0) queryInputRef.current?.select?.();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open, focusTick]);

  if (!open) return null;

  return (
    <div className="@container flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft">
      {/* Sticky chrome: title + search bar (+ optional filters) */}
      <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <div className="flex min-w-0 items-center gap-2 px-3 py-2">
          <Search size={16} className="shrink-0 text-ink dark:text-odp-fgStrong" />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            검색
          </span>
          <button
            type="button"
            onClick={handleRefreshResults}
            disabled={!canSearch || loading}
            className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-odp-focusBg"
            aria-label="검색 결과 새로고침"
            title="검색 결과 새로고침"
          >
            <RefreshCw
              size={16}
              className={loading && canSearch ? 'animate-spin' : undefined}
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="검색 닫기"
          >
            <X size={16} />
          </button>
        </div>

        <Form.Root
          className="space-y-2 px-3 pb-2"
          onSubmit={(e) => e.preventDefault()}
        >
          {groupFilterMeta ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className="inline-flex max-w-full items-center gap-1 rounded-full border border-blue-200 bg-blue-50 py-0.5 pl-1 pr-1 text-[11px] font-medium text-blue-700 dark:border-blue-700/60 dark:bg-blue-900/30 dark:text-blue-200"
                title={groupFilterMeta.name}
              >
                <ChatGroupAvatar
                  name={groupFilterMeta.name}
                  colorKey={groupFilterMeta.id}
                  size="sm"
                  iconPath={groupFilterMeta.iconPath}
                  getPresignedUrl={getPresignedUrl}
                />
                <span className="min-w-0 truncate pr-0.5">
                  {groupFilterMeta.name}
                </span>
                <button
                  type="button"
                  onClick={dismissGroupFilter}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-200 dark:hover:bg-blue-800/50"
                  aria-label="그룹 필터 해제"
                  title="그룹 필터 해제"
                >
                  <X size={12} />
                </button>
              </span>
            </div>
          ) : null}

          <div className="flex flex-col gap-1.5 @[280px]:flex-row @[280px]:items-center">
            <Form.Field name="query" className="relative min-w-0 w-full @[280px]:flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <Form.Control asChild>
                <input
                  ref={queryInputRef}
                  value={query}
                  onChange={(e) => onQueryChange?.(e.target.value)}
                  placeholder="부분 일치로 메시지 검색…"
                  className={`${chatFieldInputClass} pl-9 ${query ? 'pr-9' : ''}`}
                  autoComplete="off"
                  aria-label="검색어"
                />
              </Form.Control>
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange?.('')}
                  className="absolute right-1 top-1/2 z-[1] inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-gray-200"
                  aria-label="검색어 지우기"
                  title="검색어 지우기"
                >
                  <X size={14} />
                </button>
              ) : null}
            </Form.Field>
            <div className="flex shrink-0 items-center gap-1.5 self-end @[280px]:self-auto">
              <ChatReactionPicker
                open={reactionPickerOpen}
                onOpenChange={setReactionPickerOpen}
                mode={coarse ? 'dialog' : 'popover'}
                side="bottom"
                align="end"
                title="반응으로 검색"
                closeOnSelect={false}
                onSelect={handleReactionSearchPick}
              >
                <button
                  type="button"
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md border transition ${
                    reactionPickerOpen
                      ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-odp-borderSoft dark:text-gray-300 dark:hover:bg-odp-focusBg'
                  }`}
                  aria-label="반응으로 검색"
                  title="반응으로 검색"
                  aria-expanded={reactionPickerOpen}
                >
                  <SmilePlus size={16} />
                </button>
              </ChatReactionPicker>
              <button
                type="button"
                onClick={() => onFiltersOpenChange?.((v) => !v)}
                className={`inline-flex h-9 items-center gap-1 rounded-md border px-2 text-xs transition ${
                  filtersOpen || filtersActive
                    ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-odp-borderSoft dark:text-gray-300 dark:hover:bg-odp-focusBg'
                }`}
                aria-expanded={filtersOpen}
                aria-label="필터"
                title="필터"
              >
                <Filter size={14} />
                <Motion.span
                  animate={{ rotate: filtersOpen ? 180 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  <ChevronDown size={14} />
                </Motion.span>
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen ? (
              <Motion.div
                key="search-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60">
                  <Form.Field name="group" className="block space-y-0.5">
                    <Form.Label className="text-[11px] text-gray-500">그룹</Form.Label>
                    <ChatSelect
                      ariaLabel="그룹 필터"
                      value={groupFilter}
                      onValueChange={onGroupFilterChange}
                      options={groupOptions}
                      showGroupAvatars
                      getPresignedUrl={getPresignedUrl}
                      triggerClassName="w-full"
                      className="w-full"
                    />
                  </Form.Field>

                  <ChatDatePicker
                    label="날짜"
                    value={dateFilter}
                    onChange={onDateFilterChange}
                    isDateUnavailable={isDateUnavailable}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <ChatDateTimePicker
                      label="부터"
                      value={fromDt}
                      onChange={onFromDtChange}
                      isDateUnavailable={isDateUnavailable}
                    />
                    <ChatDateTimePicker
                      label="까지"
                      value={toDt}
                      onChange={onToDtChange}
                      isDateUnavailable={isDateUnavailable}
                    />
                  </div>

                  <label
                    htmlFor="chat-search-no-reactions-only"
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderSoft dark:bg-odp-bg/40"
                    title="반응이 없는 메시지만 표시"
                  >
                    <span className="min-w-0 text-[11px] text-gray-500 dark:text-gray-400">
                      반응 없는 메시지만
                    </span>
                    <Switch.Root
                      id="chat-search-no-reactions-only"
                      className={searchFilterSwitchRootClass}
                      checked={Boolean(noReactionsOnly)}
                      onCheckedChange={(next) =>
                        onNoReactionsOnlyChange?.(Boolean(next))
                      }
                      aria-label="반응 없는 메시지만"
                    >
                      <Switch.Thumb className={searchFilterSwitchThumbClass} />
                    </Switch.Root>
                  </label>
                </div>
              </Motion.div>
            ) : null}
          </AnimatePresence>
        </Form.Root>
      </div>

      {/* Results — visually separated from filters */}
      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-[#d7e4ef] px-2 py-3 dark:bg-[#0b1220]"
        onScroll={(e) => {
          const el = e.currentTarget;
          if (
            el.scrollTop + el.clientHeight >= el.scrollHeight - 40 &&
            hasMore &&
            !loading
          ) {
            onLoadMore?.();
          }
        }}
      >
        {loading && results.length === 0 ? (
          <div className="flex justify-center py-8" aria-label="검색 중" role="status">
            <Loader2 size={18} className="animate-spin text-gray-400" />
          </div>
        ) : null}

        {resultItems.map((item, index) =>
          item.type === 'date' ? (
            <ChatResultEnter key={item.key} index={index}>
              <ChatDateDivider
                label={item.label}
                className="-mx-2 z-1"
                surfaceClassName="bg-[#d7e4ef] dark:bg-[#0b1220]"
                bubbleClassName="bg-[#c5d5e4] text-gray-700 dark:bg-[#152033] dark:text-gray-300"
              />
            </ChatResultEnter>
          ) : (
            <ChatResultEnter key={item.key} index={index}>
              <SearchResultCard
                result={item.result}
                query={query}
                timeZone={tz}
                onSelect={onSelectResult}
                onTogglePin={onTogglePin}
                onOpenNote={onOpenNote}
                onViewEditHistory={onViewEditHistory}
                getPresignedUrl={getPresignedUrl}
                noteExists={noteExists}
                folderExists={folderExists}
                listFolderFiles={listFolderFiles}
                groups={groups}
                coarse={coarse}
              />
            </ChatResultEnter>
          ),
        )}

        {!loading && results.length === 0 ? (
          <div className="py-10 text-center text-xs text-gray-500 dark:text-gray-400">
            {query.trim() || filtersActive
              ? '결과 없음'
              : '검색어 또는 필터를 입력하세요'}
          </div>
        ) : null}
        {loading && results.length > 0 ? (
          <div className="flex justify-center py-2" aria-label="더 불러오는 중" role="status">
            <Loader2 size={16} className="animate-spin text-gray-400" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
