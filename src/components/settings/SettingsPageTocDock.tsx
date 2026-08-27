import { useMemo, useState } from 'react';
import { ListTree, Search } from 'lucide-react';
import { filterSettingsPageGroups, type SettingsPageGroupDef } from '@/utils/settingsPageCatalog';

type SettingsPageTocDockProps = {
  groups: SettingsPageGroupDef[];
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
};

export default function SettingsPageTocDock({
  groups,
  activeSectionId,
  onNavigate,
}: SettingsPageTocDockProps) {
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(
    () => filterSettingsPageGroups(groups, query),
    [groups, query],
  );

  const trimmedQuery = query.trim();

  return (
    <aside
      aria-label="설정 목차"
      className="hidden w-[min(16rem,28vw)] shrink-0 border-l border-gray-200 bg-gray-50/90 dark:border-odp-borderStrong dark:bg-odp-surface/90 lg:flex lg:flex-col"
    >
      <div className="border-b border-gray-200 px-3 py-2.5 dark:border-odp-borderStrong">
        <div className="mb-2 flex items-center gap-2">
          <ListTree size={15} className="shrink-0 text-gray-500 dark:text-odp-muted" />
          <span className="text-xs font-bold text-gray-700 dark:text-odp-fgStrong">설정 목차</span>
        </div>
        <div className="relative">
          <Search
            size={13}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 dark:text-odp-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="그룹 · 섹션 검색"
            aria-label="설정 목차 검색"
            className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2 text-[11px] text-gray-800 outline-none ring-blue-500/30 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:placeholder:text-odp-muted dark:focus:border-blue-500"
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {filteredGroups.length === 0 ? (
          <p className="px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            {trimmedQuery ? `"${trimmedQuery}"에 맞는 그룹·섹션이 없습니다.` : '표시할 설정 없음'}
          </p>
        ) : (
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
        )}
      </nav>
    </aside>
  );
}
