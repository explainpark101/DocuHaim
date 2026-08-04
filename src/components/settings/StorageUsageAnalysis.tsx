import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import {
  analyzeStorageTree,
  formatStorageBytes,
  type StorageTreeNode,
  type StorageUsageAnalysis,
  type StorageUsageExtensionRow,
  type StorageUsageFileEntry,
  type StorageUsageFolderRow,
} from '@/utils/storageUsageAnalysis';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import StorageExtensionFilesModal from '@/components/settings/StorageExtensionFilesModal';

type Props = {
  storageMode?: string;
  onScanTree?: () => Promise<StorageTreeNode[]>;
  canScan?: boolean;
  onOpenFile?: (file: StorageUsageFileEntry) => void | Promise<void>;
};

type SectionId = 'summary' | 'extension' | 'folder';

/** Capacity ratio color stops: light green → #ff0000. */
const USAGE_PERCENT_STOPS = [
  { t: 0, rgb: [187, 247, 208] as const }, // light green (green-200)
  { t: 1, rgb: [255, 0, 0] as const },
] as const;

const USAGE_PERCENT_GRADIENT_CSS = `linear-gradient(90deg, ${USAGE_PERCENT_STOPS.map(
  (s) => `rgb(${s.rgb.join(' ')}) ${(s.t * 100).toFixed(2)}%`,
).join(', ')})`;

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function lerpChannel(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

/** Map 0–100 percent to an RGB color along the usage gradient. */
function usagePercentColor(percent: number): string {
  const t = clamp01(percent / 100);
  let i = 0;
  while (i < USAGE_PERCENT_STOPS.length - 2 && t > USAGE_PERCENT_STOPS[i + 1]!.t) i += 1;
  const a = USAGE_PERCENT_STOPS[i]!;
  const b = USAGE_PERCENT_STOPS[i + 1]!;
  const span = b.t - a.t || 1;
  const local = clamp01((t - a.t) / span);
  const r = lerpChannel(a.rgb[0], b.rgb[0], local);
  const g = lerpChannel(a.rgb[1], b.rgb[1], local);
  const bl = lerpChannel(a.rgb[2], b.rgb[2], local);
  return `rgb(${r} ${g} ${bl})`;
}

function PercentCell({ percent }: { percent: number }) {
  const color = usagePercentColor(percent);
  return (
    <span className="inline-flex items-center justify-end gap-1.5">
      <span
        className="inline-block size-2.5 shrink-0 rounded-full border border-gray-300/80 shadow-sm dark:border-odp-borderStrong"
        style={{ backgroundColor: color }}
        title={`비율 ${percent.toFixed(1)}%`}
        aria-hidden
      />
      <span>{percent.toFixed(1)}%</span>
    </span>
  );
}

function UsagePercentLegendBar() {
  return (
    <div className="space-y-0.5" aria-label="용량 비율 색상 범례">
      <div
        className="h-1.5 w-full rounded-full border border-gray-200 dark:border-odp-borderStrong"
        style={{ backgroundImage: USAGE_PERCENT_GRADIENT_CSS }}
      />
      <div className="flex justify-between text-[9px] leading-none text-gray-500 dark:text-odp-muted">
        <span>낮음</span>
        <span>높음</span>
      </div>
    </div>
  );
}

type DataTableColumn = {
  key: string;
  header: string;
  align?: 'left' | 'right';
  className?: string;
  /** When set, this column renders expand/collapse icons from row tree meta. */
  tree?: boolean;
};

type DataTableTreeMeta = {
  depth: number;
  expandable: boolean;
  expanded: boolean;
  label: ReactNode;
};

type DataTableRow = {
  /** Stable row key when provided. */
  _key?: string;
  /** Optional whole-row click handler (e.g. open detail modal). */
  _onClick?: () => void;
  /** Tree expand meta consumed by columns with `tree: true`. */
  _tree?: DataTableTreeMeta;
  /** Column cell values (keys match `DataTableColumn.key`). */
  [key: string]: ReactNode | (() => void) | DataTableTreeMeta | undefined;
};

function storageLabel(mode: string | undefined): string {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  if (mode === STORAGE_MODE_S3) return 'S3 Haim';
  return '저장소';
}

function GraphPlaceholder() {
  return (
    <div className="flex h-40 min-h-40 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-xs text-gray-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-muted md:h-full md:min-h-48">
      그래프 준비중
    </div>
  );
}

function TreeCell({
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

function DataTable({
  columns,
  rows,
  emptyText = '데이터가 없습니다.',
  maxHeightClass = 'max-h-64',
  legendColumnKey = null,
}: {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  emptyText?: string;
  maxHeightClass?: string;
  /** When set, render a green→red gradient legend under this column (same width as its th). */
  legendColumnKey?: string | null;
}) {
  return (
    <div
      className={`${maxHeightClass} overflow-auto rounded-md border border-gray-200 dark:border-odp-borderStrong`}
    >
      <table className="min-w-full border-separate border-spacing-0 text-left text-xs">
        <thead className="text-gray-600 dark:text-odp-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`sticky top-0 z-10 border-b border-gray-200 bg-gray-100 px-3 py-2 font-semibold whitespace-nowrap dark:border-odp-borderStrong dark:bg-odp-bgSoft ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                } ${col.className ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-odp-bgSofter">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-gray-500 dark:text-odp-muted"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => {
              const clickable = typeof row._onClick === 'function';
              const treeExpanded = row._tree?.expandable ? row._tree.expanded : undefined;
              const prevDepth = rows[idx - 1]?._tree?.depth;
              const curDepth = row._tree?.depth;
              // Thick border only when leaving a subtree (depth decreases), not parent→child.
              const levelBoundary =
                idx > 0 &&
                typeof prevDepth === 'number' &&
                typeof curDepth === 'number' &&
                curDepth < prevDepth;
              const onRowKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
                if (!clickable) return;
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                row._onClick?.();
              };
              return (
                <tr
                  key={row._key ?? idx}
                  onClick={clickable ? row._onClick : undefined}
                  onKeyDown={onRowKeyDown}
                  tabIndex={clickable ? 0 : undefined}
                  aria-expanded={treeExpanded}
                  className={`hover:bg-gray-50 dark:hover:bg-odp-focusBg/40 ${
                    clickable ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => {
                    const tree = col.tree ? row._tree : undefined;
                    return (
                      <td
                        key={col.key}
                        className={`px-3 py-1.5 text-gray-700 dark:text-odp-fg ${
                          levelBoundary
                            ? 'border-t-2 border-gray-300 dark:border-odp-borderStrong'
                            : 'border-t border-gray-100 dark:border-odp-borderSoft'
                        } ${col.align === 'right' ? 'text-right tabular-nums' : ''} ${col.className ?? ''}`}
                      >
                        {tree ? (
                          <TreeCell
                            depth={tree.depth}
                            expandable={tree.expandable}
                            expanded={tree.expanded}
                            label={tree.label}
                          />
                        ) : (
                          (row[col.key] as ReactNode)
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
        {legendColumnKey ? (
          <tfoot>
            <tr>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="sticky bottom-0 border-t border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                >
                  {col.key === legendColumnKey ? <UsagePercentLegendBar /> : null}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

function visibleFolderRows(
  folders: StorageUsageFolderRow[],
  expandedPaths: Set<string>,
): StorageUsageFolderRow[] {
  const visiblePaths = new Set<string>();
  const visible: StorageUsageFolderRow[] = [];

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

function AnalysisSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-bold text-gray-700 transition hover:bg-gray-50 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg/40"
      >
        {open ? (
          <ChevronDown size={14} className="shrink-0 text-gray-500" />
        ) : (
          <ChevronRight size={14} className="shrink-0 text-gray-500" />
        )}
        <span>{title}</span>
      </button>
      {open ? (
        <div className="grid grid-cols-1 gap-3 border-t border-gray-200 p-3 dark:border-odp-borderStrong md:grid-cols-[minmax(10rem,14rem)_minmax(0,1fr)] md:items-stretch">
          <div className="min-w-0">
            <GraphPlaceholder />
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export default function StorageUsageAnalysis({
  storageMode = STORAGE_MODE_S3,
  onScanTree,
  canScan = true,
  onOpenFile,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<StorageUsageAnalysis | null>(null);
  const [expandedFolderPaths, setExpandedFolderPaths] = useState<Set<string>>(() => new Set());
  const [extensionModal, setExtensionModal] = useState<StorageUsageExtensionRow | null>(null);
  const [openSections, setOpenSections] = useState<Record<SectionId, boolean>>({
    summary: true,
    extension: false,
    folder: false,
  });

  useEffect(() => {
    setAnalysis(null);
    setError(null);
    setExpandedFolderPaths(new Set());
    setExtensionModal(null);
    setOpenSections({
      summary: true,
      extension: false,
      folder: false,
    });
  }, [storageMode]);

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFolder = (path: string) => {
    setExpandedFolderPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleAnalyze = async () => {
    if (!onScanTree || !canScan || loading) return;
    setLoading(true);
    setError(null);
    try {
      const tree = await onScanTree();
      setAnalysis(analyzeStorageTree(tree));
      setExpandedFolderPaths(new Set());
      setExtensionModal(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || '용량 분석에 실패했습니다.');
      setAnalysis(null);
      setExpandedFolderPaths(new Set());
      setExtensionModal(null);
    } finally {
      setLoading(false);
    }
  };

  const summary = analysis?.summary;
  const summaryRows = summary
    ? [
        { label: '총 용량', value: formatStorageBytes(summary.totalSize) },
        { label: '파일 수', value: summary.fileCount.toLocaleString() },
        { label: '폴더 수', value: summary.folderCount.toLocaleString() },
        { label: '0 byte 파일', value: summary.zeroByteCount.toLocaleString() },
        ...(summary.unknownSizeCount > 0
          ? [
              {
                label: '크기 미확인 파일',
                value: summary.unknownSizeCount.toLocaleString(),
              },
            ]
          : []),
      ]
    : [];

  const folderRows = visibleFolderRows(analysis?.folders ?? [], expandedFolderPaths);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">용량 분석</h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
            현재 선택: <span className="font-semibold">{storageLabel(storageMode)}</span>
            . 전체 트리를 스캔해 용량 사용량을 집계합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!canScan || loading || typeof onScanTree !== 'function'}
          className="inline-flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {loading ? '분석 중…' : analysis ? '다시 분석' : '분석 시작'}
        </button>
      </div>

      {!canScan && (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          선택한 저장소가 아직 연결되지 않았습니다. 연결 후 다시 시도하세요.
        </p>
      )}

      {error && (
        <p className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="space-y-2">
        <AnalysisSection
          title="용량 사용량"
          open={openSections.summary}
          onToggle={() => toggleSection('summary')}
        >
          <DataTable
            columns={[
              { key: 'label', header: '항목' },
              { key: 'value', header: '값', align: 'right' },
            ]}
            rows={summaryRows.map((r) => ({ label: r.label, value: r.value }))}
            emptyText="분석을 시작하면 용량 사용량이 표시됩니다."
          />
        </AnalysisSection>

        <AnalysisSection
          title="파일 형식별 용량 사용량"
          open={openSections.extension}
          onToggle={() => toggleSection('extension')}
        >
          <DataTable
            columns={[
              { key: 'label', header: '확장자' },
              { key: 'count', header: '파일 수', align: 'right' },
              { key: 'size', header: '용량', align: 'right' },
              { key: 'percent', header: '비율', align: 'right' },
            ]}
            rows={(analysis?.byExtension ?? []).map((row) => ({
              _key: row.ext,
              label: row.label,
              count: row.count.toLocaleString(),
              size: formatStorageBytes(row.size),
              percent: <PercentCell percent={row.percent} />,
              _onClick: () => setExtensionModal(row),
            }))}
            emptyText="분석을 시작하면 형식별 용량이 표시됩니다."
            legendColumnKey="percent"
          />
        </AnalysisSection>

        <AnalysisSection
          title="폴더별 용량 (Tree Size)"
          open={openSections.folder}
          onToggle={() => toggleSection('folder')}
        >
          <DataTable
            maxHeightClass="max-h-80"
            columns={[
              { key: 'name', header: '폴더', tree: true },
              { key: 'fileCount', header: '파일 수', align: 'right' },
              { key: 'size', header: '용량', align: 'right' },
              { key: 'percent', header: '비율', align: 'right' },
            ]}
            rows={folderRows.map((row) => {
              const expanded = expandedFolderPaths.has(row.path);
              return {
                _key: row.path,
                fileCount: row.fileCount.toLocaleString(),
                size: formatStorageBytes(row.size),
                percent: <PercentCell percent={row.percent} />,
                ...(row.hasChildFolders
                  ? { _onClick: () => toggleFolder(row.path) }
                  : {}),
                _tree: {
                  depth: row.depth,
                  expandable: row.hasChildFolders,
                  expanded,
                  label: (
                    <span title={row.path}>{row.name}</span>
                  ),
                },
              };
            })}
            emptyText="분석을 시작하면 폴더별 용량이 표시됩니다."
            legendColumnKey="percent"
          />
        </AnalysisSection>
      </div>

      <StorageExtensionFilesModal
        open={extensionModal != null}
        extension={extensionModal}
        onOpenChange={(next) => {
          if (!next) setExtensionModal(null);
        }}
        onOpenFile={async (file) => {
          setExtensionModal(null);
          await onOpenFile?.(file);
        }}
      />
    </div>
  );
}
