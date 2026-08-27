import { Search } from 'lucide-react';
import Button from '@/components/Button';
import MlxVlmDownloadButtonContent from '@/components/settings/MlxVlmDownloadButtonContent';
import MlxVlmModelResourceMeta from '@/components/settings/MlxVlmModelResourceMeta';
import type { HfModelSearchHit } from '@/utils/mlxVlmHuggingFace';

type MlxVlmModelSearchSectionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  memoryBudgetLabel: string;
  results: HfModelSearchHit[];
  searchBusy: boolean;
  searchError: string;
  disabled?: boolean;
  cliAvailable: boolean;
  downloadBusy: boolean;
  downloadingRepoId?: string;
  abortingRepoId?: string;
  downloadProgressLabel?: string;
  isModelDownloaded: (repoId: string) => boolean;
  onDownload: (hit: HfModelSearchHit) => void;
};

export default function MlxVlmModelSearchSection({
  query,
  onQueryChange,
  onSearch,
  memoryBudgetLabel,
  results,
  searchBusy,
  searchError,
  disabled = false,
  cliAvailable,
  downloadBusy,
  downloadingRepoId = '',
  abortingRepoId = '',
  downloadProgressLabel = '',
  isModelDownloaded,
  onDownload,
}: MlxVlmModelSearchSectionProps) {
  return (
    <>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className="text-[10px] text-gray-500 dark:text-odp-muted">{memoryBudgetLabel}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-0 flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              e.preventDefault();
              if (!disabled && !searchBusy) onSearch();
            }}
            placeholder="e.g. Llama 3.2 4bit"
            disabled={disabled || searchBusy}
            className="w-full rounded border py-2 pl-8 pr-3 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={disabled || searchBusy || !query.trim()}
          onClick={onSearch}
        >
          <Search size={14} />
          검색
        </Button>
      </div>
      {searchBusy ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">Searching…</p>
      ) : null}
      {searchError ? (
        <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{searchError}</p>
      ) : null}
      {results.length > 0 ? (
        <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto">
          {results.map((hit) => {
            const isAborting = abortingRepoId === hit.id;
            const isDownloading = downloadBusy && downloadingRepoId === hit.id;
            const isDownloaded = !isDownloading && !isAborting && isModelDownloaded(hit.id);
            const buttonMode = isAborting
              ? 'aborting'
              : isDownloading
                ? 'downloading'
                : isDownloaded
                  ? 'downloaded'
                  : 'download';
            return (
              <li
                key={hit.id}
                className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium text-gray-800 dark:text-odp-fgStrong">
                    {hit.id}
                  </div>
                  <MlxVlmModelResourceMeta hit={hit} />
                </div>
                <Button
                  type="button"
                  variant={isDownloaded ? 'tertiary' : 'secondary'}
                  size="sm"
                  className={
                    isDownloading
                      ? 'min-w-[9.5rem] font-mono tabular-nums transition-none'
                      : isDownloaded
                        ? 'text-emerald-700 transition-none dark:text-emerald-300'
                        : 'transition-none'
                  }
                  disabled={
                    disabled || !cliAvailable || isAborting || (downloadBusy && !isDownloading)
                  }
                  onClick={() => onDownload(hit)}
                >
                  <MlxVlmDownloadButtonContent
                    mode={buttonMode}
                    progressLabel={isDownloading && !isAborting ? downloadProgressLabel : ''}
                  />
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
