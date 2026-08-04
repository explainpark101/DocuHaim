import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Filter, Loader2, Search, X } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Form } from 'radix-ui';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import ChatDatePicker from '@/components/chatWithMyself/ui/ChatDatePicker';
import ChatDateTimePicker from '@/components/chatWithMyself/ui/ChatDateTimePicker';
import ChatDateDivider from '@/components/chatWithMyself/ChatDateDivider';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import { chatFieldInputClass } from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  SELF_GROUP,
  formatMessageDateLabel,
  formatMessageTime,
  detectTimeZone,
  sortGroupsKo,
  renderSearchResultHtml,
  extractChatBodyAttachments,
} from '@/utils/chatWithMyself';

function SearchResultCard({ result, query, timeZone, onSelect, getPresignedUrl }) {
  const { text, attachments } = useMemo(
    () => extractChatBodyAttachments(result.body || ''),
    [result.body],
  );
  const previewSource = text.trim() || result.body || '';
  const html = useMemo(
    () => renderSearchResultHtml(previewSource, query, result.ogSearchText || ''),
    [previewSource, result.ogSearchText, query],
  );
  const time = formatMessageTime(result.at, timeZone || detectTimeZone());
  const hasAttachments = attachments.length > 0;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(result)}
      className="w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-[#243044] dark:hover:border-blue-500/50"
    >
      <div className="mb-1.5 flex items-center justify-between gap-2 text-[11px] text-gray-500 dark:text-gray-400">
        <span className="truncate font-medium text-gray-700 dark:text-gray-200">
          {result.group || SELF_GROUP}
        </span>
        <span className="shrink-0 tabular-nums">{time}</span>
      </div>
      {previewSource ? (
        <div
          className="chat-search-md max-h-40 overflow-hidden text-sm leading-relaxed text-gray-800 dark:text-odp-fg [&_a]:text-blue-600 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 [&_code]:text-[12px] dark:[&_a]:text-blue-300 dark:[&_code]:bg-white/10 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_pre]:my-1 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-black/5 [&_pre]:p-2 dark:[&_pre]:bg-black/30"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : null}
      {hasAttachments ? (
        <div
          className={`${previewSource ? 'mt-2' : ''} max-h-48 overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
        >
          <ChatLinkedText
            text={result.body}
            className="text-sm text-gray-800 dark:text-odp-fg"
            getPresignedUrl={getPresignedUrl}
          />
        </div>
      ) : null}
    </button>
  );
}

/**
 * Search / filter panel: sticky search bar, collapsible filters, bubble result cards.
 */
export default function ChatSearchPanel({
  open,
  onClose,
  groups = [],
  onSearch,
  results = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onSelectResult,
  timeZone,
  getPresignedUrl,
}) {
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('__all__');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const listRef = useRef(null);
  const tz = timeZone || detectTimeZone();
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

  const groupOptions = useMemo(
    () => [
      { value: '__all__', label: '전체' },
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g) => ({ value: g, label: g })),
    ],
    [sortedGroups],
  );

  const filtersActive =
    (groupFilter && groupFilter !== '__all__') ||
    Boolean(dateFilter) ||
    Boolean(fromDt) ||
    Boolean(toDt);

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
      });
    }, 250);
    return () => clearTimeout(t);
  }, [query, groupFilter, dateFilter, fromDt, toDt, onSearch]);

  if (!open) return null;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft">
      {/* Sticky chrome: title + search bar (+ optional filters) */}
      <div className="sticky top-0 z-10 shrink-0 border-b border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
        <div className="flex items-center gap-2 px-3 py-2">
          <Search size={16} className="shrink-0 text-gray-500" />
          <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            검색
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="검색 닫기"
          >
            <X size={16} />
          </button>
        </div>

        <Form.Root
          className="space-y-2 px-3 pb-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex items-center gap-1.5">
            <Form.Field name="query" className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <Form.Control asChild>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="부분 일치로 메시지 검색…"
                  className={`${chatFieldInputClass} pl-9 ${query ? 'pr-9' : ''}`}
                  autoComplete="off"
                  aria-label="검색어"
                />
              </Form.Control>
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-1 top-1/2 z-[1] inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-focusBg dark:hover:text-gray-200"
                  aria-label="검색어 지우기"
                  title="검색어 지우기"
                >
                  <X size={14} />
                </button>
              ) : null}
            </Form.Field>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
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
                      onValueChange={setGroupFilter}
                      options={groupOptions}
                      triggerClassName="w-full"
                      className="w-full"
                    />
                  </Form.Field>

                  <ChatDatePicker
                    label="날짜"
                    value={dateFilter}
                    onChange={setDateFilter}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <ChatDateTimePicker
                      label="부터"
                      value={fromDt}
                      onChange={setFromDt}
                    />
                    <ChatDateTimePicker
                      label="까지"
                      value={toDt}
                      onChange={setToDt}
                    />
                  </div>
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

        {resultItems.map((item) =>
          item.type === 'date' ? (
            <ChatDateDivider
              key={item.key}
              label={item.label}
              className="-mx-2 z-[1]"
              surfaceClassName="bg-[#d7e4ef] dark:bg-[#0b1220]"
              bubbleClassName="bg-[#c5d5e4] text-gray-700 dark:bg-[#152033] dark:text-gray-300"
            />
          ) : (
            <SearchResultCard
              key={item.key}
              result={item.result}
              query={query}
              timeZone={tz}
              onSelect={onSelectResult}
              getPresignedUrl={getPresignedUrl}
            />
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
