import { Check, Download, Loader2, Search } from 'lucide-react';
import Button from '@/components/Button';
import MlxLmModelResourceMeta from '@/components/settings/MlxLmModelResourceMeta';
import type { HfModelSearchHit } from '@/utils/mlxLmHuggingFace';

type MlxLmModelSearchSectionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  memoryBudgetLabel: string;
  results: HfModelSearchHit[];
  searchBusy: boolean;
  searchError: string;
  disabled?: boolean;
  cliAvailable: boolean;
  downloadBusy: boolean;
  downloadingRepoId?: string;
  downloadProgressLabel?: string;
  isModelDownloaded: (repoId: string) => boolean;
  onDownload: (hit: HfModelSearchHit) => void;
};

export default function MlxLmModelSearchSection({
  query,
  onQueryChange,
  memoryBudgetLabel,
  results,
  searchBusy,
  searchError,
  disabled = false,
  cliAvailable,
  downloadBusy,
  downloadingRepoId = '',
  downloadProgressLabel = '',
  isModelDownloaded,
  onDownload,
}: MlxLmModelSearchSectionProps) {
  return (
    <>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className="text-[10px] text-gray-500 dark:text-odp-muted">{memoryBudgetLabel}</span>
      </div>
      <div className="relative">
        <Search
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="e.g. Llama 3.2 4bit"
          disabled={disabled}
          className="w-full rounded border py-2 pl-8 pr-3 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
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
            const isDownloading = downloadBusy && downloadingRepoId === hit.id;
            const isDownloaded = !isDownloading && isModelDownloaded(hit.id);
            const buttonLabel =
              isDownloading && downloadProgressLabel
                ? downloadProgressLabel
                : isDownloaded
                  ? 'Downloaded'
                  : 'Download';
            return (
              <li
                key={hit.id}
                className="flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-2.5 py-2 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium text-gray-800 dark:text-odp-fgStrong">
                    {hit.id}
                  </div>
                  <MlxLmModelResourceMeta hit={hit} />
                </div>
                <Button
                  type="button"
                  variant={isDownloaded ? 'tertiary' : 'secondary'}
                  size="sm"
                  className={
                    isDownloading
                      ? 'min-w-[9.5rem] font-mono tabular-nums'
                      : isDownloaded
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : undefined
                  }
                  disabled={disabled || !cliAvailable || downloadBusy}
                  onClick={() => onDownload(hit)}
                >
                  {isDownloading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : isDownloaded ? (
                    <Check size={14} />
                  ) : (
                    <Download size={14} />
                  )}
                  {buttonLabel}
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
