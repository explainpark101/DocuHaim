import { useEffect, useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { advancedSearchEngine } from '@/utils/advancedSearch';
import {
  analyzeIndexCoverage,
  formatIndexCoveragePercent,
  type IndexCoverageFolderRow,
} from '@/utils/advancedSearch/indexCoverageAnalysis';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import type { StorageTreeNode } from '@/utils/storageUsageAnalysis';

type Props = {
  storageMode?: string;
  onScanTree?: () => Promise<StorageTreeNode[]>;
  canScan?: boolean;
};

function storageLabel(mode: string | undefined): string {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  if (mode === STORAGE_MODE_S3) return 'S3 Haim';
  return '저장소';
}

/** Coverage bar color: low → high (red → green). */
function coverageBarColor(percent: number): string {
  const t = Math.min(1, Math.max(0, percent / 100));
  const r = Math.round(255 * (1 - t) + 34 * t);
  const g = Math.round(68 * (1 - t) + 197 * t);
  const b = Math.round(68 * (1 - t) + 94 * t);
  return `rgb(${r} ${g} ${b})`;
}

function visibleFolderRows(
  folders: IndexCoverageFolderRow[],
  expandedPaths: Set<string>,
): IndexCoverageFolderRow[] {
  const visiblePaths = new Set<string>();
  const visible: IndexCoverageFolderRow[] = [];

  for (const row of folders) {
    const parentOk =
      row.parentPath == null ||
      (visiblePaths.has(row.parentPath) && expandedPaths.has(row.parentPath));
    if (!parentOk) continue;
    visible.push(row);
    visiblePaths.add(row.path);
  }

  return visible;
}

function CoverageBar({ percent, indexableCount }: { percent: number; indexableCount: number }) {
  const width =
    indexableCount > 0 ? Math.min(100, Math.max(0, percent)) : 0;
  return (
    <div
      className="h-3 min-w-20 flex-1 overflow-hidden rounded-sm bg-gray-900/90 dark:bg-black/50"
      aria-hidden
    >
      <div
        className="h-full min-w-0 transition-[width] duration-150"
        style={{
          width: `${width}%`,
          backgroundColor: coverageBarColor(percent),
        }}
      />
    </div>
  );
}

function TreeIndent({
  depth,
  expandable,
  expanded,
  label,
}: {
  depth: number;
  expandable: boolean;
  expanded: boolean;
  label: ReactNode;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-0.5 font-mono text-[11px]">
      <span
        className="inline-block shrink-0"
        style={{ width: `${depth * 12}px` }}
        aria-hidden
      />
      {expandable ? (
        <span
          className="inline-flex size-4 shrink-0 items-center justify-center text-gray-500 dark:text-odp-muted"
          aria-hidden
        >
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
      ) : (
        <span className="inline-block size-4 shrink-0" aria-hidden />
      )}
      <span className="min-w-0 truncate">{label}</span>
    </span>
  );
}

export default function InvertedIndexCoverage({
  storageMode = STORAGE_MODE_S3,
  onScanTree,
  canScan = true,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tree, setTree] = useState<StorageTreeNode[] | null>(null);
  const [expandedFolderPaths, setExpandedFolderPaths] = useState<Set<string>>(
    () => new Set(),
  );
  const [indexRevision, setIndexRevision] = useState(0);

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      setIndexRevision((n) => n + 1);
    });
  }, []);

  useEffect(() => {
    setTree(null);
    setError(null);
    setExpandedFolderPaths(new Set());
  }, [storageMode]);

  const indexStatus = advancedSearchEngine.getStatus();
  const analysis = useMemo(() => {
    if (!tree) return null;
    void indexRevision;
    return analyzeIndexCoverage(
      tree,
      advancedSearchEngine.getIndex().docs,
      { includeOtherFiles: indexStatus.includeOtherFiles },
    );
  }, [tree, indexRevision, indexStatus.includeOtherFiles]);

  const folderRows = visibleFolderRows(
    analysis?.folders ?? [],
    expandedFolderPaths,
  );

  const toggleFolder = (path: string) => {
    setExpandedFolderPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleScan = async () => {
    if (!onScanTree || !canScan || loading) return;
    setLoading(true);
    setError(null);
    try {
      const nextTree = await onScanTree();
      setTree(nextTree);
      setExpandedFolderPaths(new Set());
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || '폴더 트리를 불러오지 못했습니다.');
      setTree(null);
      setExpandedFolderPaths(new Set());
    } finally {
      setLoading(false);
    }
  };

  const summary = analysis?.summary;
  const summaryPercent = summary
    ? formatIndexCoveragePercent(summary.percent, summary.indexableCount)
    : '—';

  return (
    <div
      id="settings-inverted-index"
      tabIndex={-1}
      className="scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">역색인</h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
            현재 선택: <span className="font-semibold">{storageLabel(storageMode)}</span>
            . 폴더별로 색인 대상 파일 중 역색인된 비율을 표시합니다.
            {indexStatus.includeOtherFiles
              ? ' (Markdown + 기타 텍스트 파일)'
              : ' (Markdown만)'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleScan}
          disabled={!canScan || loading || typeof onScanTree !== 'function'}
          className="inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {loading ? '불러오는 중…' : tree ? '다시 불러오기' : '폴더 트리 불러오기'}
        </button>
      </div>

      {!canScan && (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          선택한 저장소가 아직 연결되지 않았습니다. 연결 후 다시 시도하세요.
        </p>
      )}

      {!indexStatus.enabled && (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          역색인이 꺼져 있습니다. Advanced Search에서 역색인을 켠 뒤 색인을 생성하세요.
        </p>
      )}

      {error ? (
        <p className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {summary ? (
        <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs dark:border-odp-borderStrong dark:bg-odp-bgSoft">
          <span className="font-semibold text-gray-700 dark:text-odp-fgStrong">전체</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="tabular-nums text-gray-700 dark:text-odp-fg">
            {summary.indexedCount.toLocaleString()} / {summary.indexableCount.toLocaleString()} 파일
          </span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="font-mono tabular-nums text-gray-700 dark:text-odp-fg">
            {summaryPercent}
          </span>
        </div>
      ) : null}

      <div className="max-h-96 overflow-auto rounded-md border border-gray-800 bg-[#1a1b26] p-2 font-mono text-[11px] text-gray-100 dark:border-gray-700">
        {folderRows.length === 0 ? (
          <p className="px-2 py-6 text-center text-gray-500">
            {tree
              ? '표시할 폴더가 없습니다.'
              : '「폴더 트리 불러오기」를 눌러 역색인 현황을 확인하세요.'}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {folderRows.map((row, idx) => {
              const expanded = expandedFolderPaths.has(row.path);
              const clickable = row.hasChildFolders;
              const percentLabel = formatIndexCoveragePercent(
                row.percent,
                row.indexableCount,
              );
              const onRowKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
                if (!clickable) return;
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                toggleFolder(row.path);
              };
              return (
                <li
                  key={row.path}
                  className={`flex flex-wrap items-center gap-x-2 gap-y-1 rounded px-1 py-0.5 ${
                    clickable
                      ? 'cursor-pointer hover:bg-white/5 focus-visible:outline-1 focus-visible:outline-blue-400'
                      : ''
                  }`}
                  onClick={clickable ? () => toggleFolder(row.path) : undefined}
                  onKeyDown={onRowKeyDown}
                  tabIndex={clickable ? 0 : undefined}
                  aria-expanded={clickable ? expanded : undefined}
                >
                  <span className="w-5 shrink-0 text-right tabular-nums text-gray-500">
                    {idx + 1}
                  </span>
                  <CoverageBar
                    percent={row.percent}
                    indexableCount={row.indexableCount}
                  />
                  <span className="w-12 shrink-0 text-right tabular-nums text-gray-200">
                    {percentLabel}
                  </span>
                  <span className="shrink-0 text-gray-600" aria-hidden>
                    |
                  </span>
                  <span className="min-w-24 flex-1">
                    <TreeIndent
                      depth={row.depth}
                      expandable={row.hasChildFolders}
                      expanded={expanded}
                      label={<span title={row.path}>{row.name}</span>}
                    />
                  </span>
                  <span className="shrink-0 tabular-nums text-gray-400">
                    {row.indexableCount > 0
                      ? `${row.indexedCount.toLocaleString()} / ${row.indexableCount.toLocaleString()}`
                      : '—'}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="text-[10px] text-gray-500 dark:text-odp-muted">
        폴더를 클릭해 하위 폴더를 펼칩니다. 채팅 day 파일은 해당 날짜 메시지가 하나라도 색인되면
        완료로 집계합니다.
      </p>
    </div>
  );
}
