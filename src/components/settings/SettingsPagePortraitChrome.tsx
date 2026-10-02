import { useMemo, useState } from 'react';
import { ListTree } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  SettingsOptionHitList,
  SettingsPageSearchField,
} from '@/components/settings/SettingsPageTocDock';
import {
  filterSettingsPageGroupsFuzzy,
} from '@/utils/settingsPageOptionSearch';
import type { SettingsPageGroupDef } from '@/utils/settingsPageCatalog';

type Props = {
  groups: SettingsPageGroupDef[];
  activeSectionId: string;
  onNavigate: (sectionId: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

/**
 * Portrait settings chrome: TOC button (left of close) + bottom fuzzy search.
 * Shares `query` with landscape SettingsPageTocDock.
 */
export function SettingsPagePortraitTocButton({
  groups,
  activeSectionId,
  onNavigate,
  query,
  onQueryChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const { groups: filteredGroups, optionHits } = useMemo(
    () => filterSettingsPageGroupsFuzzy(groups, query),
    [groups, query],
  );

  return (
    <>
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              aria-label="설정 목차"
              onClick={() => setOpen(true)}
              className="inline-flex shrink-0 touch-manipulation items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-surface"
            >
              <ListTree size={16} aria-hidden />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
            >
              설정 목차
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <MobileContextMenuModal
        open={open}
        onOpenChange={setOpen}
        title="설정 목차"
        subtitle="그룹 · 섹션으로 이동"
        historyOverlayId="settings-page-toc"
      >
        <div className="px-2 pb-2">
          <SettingsPageSearchField
            value={query}
            onChange={onQueryChange}
            placeholder="그룹 · 섹션 · 선택지"
            ariaLabel="설정 목차 검색"
          />
        </div>
        {optionHits.length > 0 ? (
          <div className="px-1">
            <SettingsOptionHitList
              hits={optionHits}
              onNavigate={(id) => {
                onNavigate(id);
                setOpen(false);
              }}
            />
          </div>
        ) : null}
        <ul className="space-y-3 px-1 pb-2">
          {filteredGroups.map((group) => (
            <li key={group.id}>
              <div className="px-3 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-odp-muted">
                {group.title}
              </div>
              <ul className="mt-1 space-y-0.5">
                {group.sections.map((section) => {
                  const active = activeSectionId === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate(section.id);
                          setOpen(false);
                        }}
                        aria-current={active ? 'location' : undefined}
                        className={[
                          'w-full rounded-md px-3 py-2.5 text-left text-sm leading-snug transition',
                          active
                            ? 'bg-blue-100 font-semibold text-blue-900 dark:bg-blue-950/50 dark:text-blue-100'
                            : 'text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-bgSoft',
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
      </MobileContextMenuModal>
    </>
  );
}

export function SettingsPagePortraitSearchBar({
  groups,
  onNavigate,
  query,
  onQueryChange,
}: {
  groups: SettingsPageGroupDef[];
  onNavigate: (sectionId: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
}) {
  const { optionHits, groups: filteredGroups } = useMemo(
    () => filterSettingsPageGroupsFuzzy(groups, query),
    [groups, query],
  );
  const trimmed = query.trim();
  const showResults = trimmed.length > 0;

  return (
    <div className="shrink-0 border-t border-gray-200 bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] dark:border-odp-borderSoft dark:bg-odp-bgSoft/95">
      <SettingsPageSearchField
        value={query}
        onChange={onQueryChange}
        placeholder="설정 검색 (섹션 · 선택지)"
        ariaLabel="설정 검색"
      />
      {showResults ? (
        <div className="mt-2 max-h-40 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 dark:border-odp-borderStrong dark:bg-odp-surface">
          {filteredGroups.length === 0 && optionHits.length === 0 ? (
            <p className="px-3 py-2 text-[11px] text-gray-500 dark:text-odp-muted">
              일치하는 설정이 없습니다.
            </p>
          ) : (
            <ul className="py-1">
              {optionHits.slice(0, 12).map((hit) => (
                <li key={`opt:${hit.sectionId}:${hit.label}`}>
                  <button
                    type="button"
                    onClick={() => onNavigate(hit.sectionId)}
                    className="flex w-full flex-col px-3 py-2 text-left hover:bg-white dark:hover:bg-odp-bgSoft"
                  >
                    <span className="text-[11px] font-medium text-gray-800 dark:text-odp-fg">
                      {hit.label}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-odp-muted">
                      선택지
                    </span>
                  </button>
                </li>
              ))}
              {filteredGroups.flatMap((group) =>
                group.sections.map((section) => (
                  <li key={`sec:${section.id}`}>
                    <button
                      type="button"
                      onClick={() => onNavigate(section.id)}
                      className="flex w-full flex-col px-3 py-2 text-left hover:bg-white dark:hover:bg-odp-bgSoft"
                    >
                      <span className="text-[11px] font-medium text-gray-800 dark:text-odp-fg">
                        {section.label}
                      </span>
                      <span className="text-[10px] text-gray-500 dark:text-odp-muted">
                        {group.title}
                      </span>
                    </button>
                  </li>
                )),
              )}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
