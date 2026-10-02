import { useMemo } from 'react';
import { ListTree, Search } from 'lucide-react';
import {
  filterSettingsPageGroupsFuzzy,
  type SettingsOptionSearchEntry,
} from '@/utils/settingsPageOptionSearch';
import type { SettingsPageGroupDef } from '@/utils/settingsPageCatalog';

export type SettingsPageTocDockProps = {
  groups: SettingsPageGroupDef[];
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
  /** Shared with portrait bottom search (landscape owns this field in the dock). */
  query: string;
  onQueryChange: (query: string) => void;
  /** When true, render as a full-height flex column (default sidebar dock). */
  className?: string;
};

/**
 * Landscape / wide settings TOC + fuzzy search (groups, sections, option labels).
 */
export default function SettingsPageTocDock({
  groups,
  activeSectionId,
  onNavigate,
  query,
  onQueryChange,
  className,
}: SettingsPageTocDockProps) {
  const { groups: filteredGroups, optionHits } = useMemo(
    () => filterSettingsPageGroupsFuzzy(groups, query),
    [groups, query],
  );

  const trimmedQuery = query.trim();

  return (
    <aside
      aria-label="설정 목차"
      className={
        className ??
        'flex w-[min(16rem,28vw)] shrink-0 flex-col border-l border-gray-200 bg-gray-50/90 dark:border-odp-borderStrong dark:bg-odp-surface/90'
      }
    >
      <div className="border-b border-gray-200 px-3 py-2.5 dark:border-odp-borderStrong">
        <div className="mb-2 flex items-center gap-2">
          <ListTree size={15} className="shrink-0 text-gray-500 dark:text-odp-muted" />
          <span className="text-xs font-bold text-gray-700 dark:text-odp-fgStrong">
            설정 목차
          </span>
        </div>
        <SettingsPageSearchField
          value={query}
          onChange={onQueryChange}
          placeholder="그룹 · 섹션 · 선택지"
          ariaLabel="설정 검색"
        />
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {filteredGroups.length === 0 && optionHits.length === 0 ? (
          <p className="px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            {trimmedQuery
              ? `"${trimmedQuery}"에 맞는 설정이 없습니다.`
              : '표시할 설정 없음'}
          </p>
        ) : (
          <>
            {trimmedQuery && optionHits.length > 0 ? (
              <SettingsOptionHitList
                hits={optionHits}
                onNavigate={onNavigate}
              />
            ) : null}
            <ul className="space-y-3">
              {filteredGroups.map((group) => (
                <li key={group.id}>
                  <div className="px-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
                    {group.title}
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {group.sections.map((section) => {
                      const active = activeSectionId === section.id;
                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => onNavigate(section.id)}
                            aria-current={active ? 'location' : undefined}
                            className={[
                              'w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition',
                              active
                                ? 'bg-blue-100 font-semibold text-blue-900 dark:bg-blue-950/50 dark:text-blue-100'
                                : 'text-gray-700 hover:bg-white hover:text-gray-900 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong',
                            ].join(' ')}
                          >
                            {section.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}

export function SettingsPageSearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
  autoFocus = false,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  ariaLabel: string;
  autoFocus?: boolean;
}) {
  return (
    <div className="relative">
      <Search
        size={13}
        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
        className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2 text-[11px] text-gray-800 outline-none ring-blue-500/30 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted dark:focus:border-blue-500"
      />
    </div>
  );
}

export function SettingsOptionHitList({
  hits,
  onNavigate,
}: {
  hits: SettingsOptionSearchEntry[];
  onNavigate: (sectionId: string) => void;
}) {
  if (hits.length === 0) return null;
  return (
    <div className="mb-3 border-b border-gray-200 pb-2 dark:border-odp-borderStrong">
      <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
        선택지
      </div>
      <ul className="space-y-0.5">
        {hits.slice(0, 24).map((hit) => (
          <li key={`${hit.sectionId}:${hit.label}`}>
            <button
              type="button"
              onClick={() => onNavigate(hit.sectionId)}
              className="w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug text-gray-700 hover:bg-white dark:text-odp-fg dark:hover:bg-odp-bgSoft"
            >
              {hit.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
