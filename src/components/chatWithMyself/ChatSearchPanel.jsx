import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  SELF_GROUP,
  formatMessageTime,
  detectTimeZone,
  sortGroupsKo,
} from '@/utils/chatWithMyself';

/**
 * Search / filter panel: right sidebar (wide) or fullscreen (mobile).
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
  fullscreen = false,
}) {
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('__all__');
  const [dateFilter, setDateFilter] = useState('');
  const [fromDt, setFromDt] = useState('');
  const [toDt, setToDt] = useState('');
  const listRef = useRef(null);
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

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

  const panel = (
    <div
      className={`flex h-full min-h-0 flex-col bg-white dark:bg-odp-bgSoft border-gray-200 dark:border-odp-borderSoft ${
        fullscreen ? 'fixed inset-0 z-80' : 'w-80 shrink-0 border-l'
      }`}
    >
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-odp-borderSoft px-3 py-2">
        <Search size={16} className="text-gray-500 shrink-0" />
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

      <div className="space-y-2 border-b border-gray-100 dark:border-odp-borderSoft px-3 py-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="메시지 검색"
          className="w-full rounded-md border border-gray-300 dark:border-odp-borderStrong bg-transparent px-2 py-1.5 text-sm"
        />
        <label className="block text-[11px] text-gray-500">
          그룹
          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="mt-0.5 w-full rounded-md border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-surface px-2 py-1 text-sm"
          >
            <option value="__all__">전체</option>
            <option value={SELF_GROUP}>{SELF_GROUP}</option>
            {sortedGroups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[11px] text-gray-500">
          날짜
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="mt-0.5 w-full rounded-md border border-gray-300 dark:border-odp-borderStrong bg-transparent px-2 py-1 text-sm"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-[11px] text-gray-500">
            부터
            <input
              type="datetime-local"
              value={fromDt}
              onChange={(e) => setFromDt(e.target.value)}
              className="mt-0.5 w-full rounded-md border border-gray-300 dark:border-odp-borderStrong bg-transparent px-1 py-1 text-xs"
            />
          </label>
          <label className="block text-[11px] text-gray-500">
            까지
            <input
              type="datetime-local"
              value={toDt}
              onChange={(e) => setToDt(e.target.value)}
              className="mt-0.5 w-full rounded-md border border-gray-300 dark:border-odp-borderStrong bg-transparent px-1 py-1 text-xs"
            />
          </label>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto"
        onScroll={(e) => {
          const el = e.currentTarget;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40 && hasMore && !loading) {
            onLoadMore?.();
          }
        }}
      >
        {loading && results.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-400">검색 중…</div>
        ) : null}
        {results.map((r) => (
          <button
            key={`${r.dateStr}-${r.id}`}
            type="button"
            onClick={() => onSelectResult?.(r)}
            className="w-full border-b border-gray-50 dark:border-odp-borderSoft px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-odp-focusBg"
          >
            <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500">
              <span className="truncate font-medium">{r.group}</span>
              <span className="shrink-0">
                {r.dateStr} {formatMessageTime(r.at, detectTimeZone())}
              </span>
            </div>
            <div className="mt-0.5 line-clamp-2 text-sm text-gray-800 dark:text-odp-fg">
              {r.body}
            </div>
          </button>
        ))}
        {!loading && results.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-400">결과 없음</div>
        ) : null}
        {loading && results.length > 0 ? (
          <div className="p-2 text-center text-[10px] text-gray-400">더 불러오는 중…</div>
        ) : null}
      </div>
    </div>
  );

  return panel;
}
