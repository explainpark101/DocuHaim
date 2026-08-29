import { memo } from 'react';
import type { ContentSearchLine, ContentSearchRegion } from '@/utils/advancedSearch/contentSearchSnippets';
import { highlightPlainText } from '@/utils/advancedSearch/contentSearchSnippets';
import { FileText, MessageSquare } from 'lucide-react';

type ContentSearchResultCardProps = {
  title: string;
  path: string;
  kind: 'file' | 'chat';
  matchCount: number;
  regions: ContentSearchRegion[];
  query: string;
  terms: string[];
  onOpen: () => void;
};

function RegionLines({
  lines,
  query,
  terms,
}: {
  lines: ContentSearchLine[];
  query: string;
  terms: string[];
}) {
  return (
    <div className="overflow-x-auto font-mono text-[12px] leading-5">
      {lines.map((line) => (
        <div
          key={`${line.lineNumber}:${line.text.slice(0, 24)}`}
          className={`flex min-w-0 gap-3 px-3 py-0.5 ${
            line.isMatch
              ? 'bg-amber-50/90 dark:bg-amber-500/10'
              : 'text-gray-500 dark:text-odp-muted'
          }`}
        >
          <span className="w-9 shrink-0 select-none text-right tabular-nums text-gray-400 dark:text-odp-muted">
            {line.lineNumber}
          </span>
          <pre
            className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono text-[12px] leading-5 text-gray-800 dark:text-odp-fg"
            dangerouslySetInnerHTML={{
              __html: highlightPlainText(line.text, terms, query),
            }}
          />
        </div>
      ))}
    </div>
  );
}

function ContentSearchResultCard({
  title,
  path,
  kind,
  matchCount,
  regions,
  query,
  terms,
  onOpen,
}: ContentSearchResultCardProps) {
  const Icon = kind === 'chat' ? MessageSquare : FileText;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft">
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2.5 text-left hover:bg-gray-50 dark:border-odp-borderSoft dark:hover:bg-odp-focusBg/40"
      >
        <Icon size={16} className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">
            {title}
          </span>
          <span className="block truncate text-xs text-gray-500 dark:text-odp-muted">{path}</span>
        </span>
        <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-600 dark:bg-odp-borderStrong dark:text-odp-muted">
          {matchCount}건
        </span>
      </button>

      <div className="divide-y divide-gray-100 dark:divide-odp-borderSoft">
        {regions.map((region, idx) => (
          <div key={`${region.startLine}-${region.endLine}-${idx}`}>
            {idx > 0 ? (
              <div className="px-3 py-1 text-center text-[11px] text-gray-400 dark:text-odp-muted">
                ⋯
              </div>
            ) : null}
            <RegionLines lines={region.lines} query={query} terms={terms} />
          </div>
        ))}
      </div>
    </article>
  );
}

export default memo(ContentSearchResultCard);
