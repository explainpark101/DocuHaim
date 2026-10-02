import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronDown, ChevronRight, Loader2, RefreshCw, Search, X } from 'lucide-react';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
} from '@/components/contextMenu/AdaptiveContextMenu';
import {
  DESKTOP_CONTEXT_MENU_Z_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { usePressableCardMenu } from '@/components/chatWithMyself/usePressableCardMenu';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { advancedSearchEngine } from '@/utils/advancedSearch';
import {
  analyzeIndexCoverage,
  formatIndexCoveragePercent,
  type IndexCoverageFolderRow,
} from '@/utils/advancedSearch/indexCoverageAnalysis';
import {
  enqueueFolderIndexPath,
  folderIndexRowTone,
  normalizeFolderIndexPath,
  removeFolderIndexPath,
  type FolderIndexRowTone,
} from '@/utils/advancedSearch/folderIndexQueue';
import { isSystemIndexExcludedFolder } from '@/utils/advancedSearch/paths';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
  STORAGE_MODE_IDB,
} from '@/utils/storageSettings';
import type { StorageTreeNode } from '@/utils/storageUsageAnalysis';

type Props = {
  storageMode?: string;
  onScanTree?: () => Promise<StorageTreeNode[]>;
  canScan?: boolean;
  /** When true, render as a nested block inside the 역색인 settings card. */
  embedded?: boolean;
};

const coverageMenuContentClass = `${DESKTOP_CONTEXT_MENU_Z_CLASS} min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft`;

function storageLabel(mode: string | undefined): string {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  if (mode === STORAGE_MODE_IDB) return 'IDB Haim';
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

function rowToneClass(tone: FolderIndexRowTone): string {
  if (tone === 'active') {
    return 'bg-sky-500/30 ring-1 ring-inset ring-sky-400/60';
  }
  if (tone === 'queued') {
    return 'bg-amber-500/25 ring-1 ring-inset ring-amber-400/50';
  }
  return 'hover:bg-white/5';
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

function CoverageBar({
  percent,
  indexableCount,
  className = '',
}: {
  percent: number;
  indexableCount: number;
  className?: string;
}) {
  const width =
    indexableCount > 0 ? Math.min(100, Math.max(0, percent)) : 0;
  return (
    <div
      className={`h-3 w-28 shrink-0 overflow-hidden rounded-sm bg-gray-900/90 dark:bg-black/50 ${className}`}
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

function CoverageFolderRowItem({
  row,
  index,
  expanded,
  tone,
  indexEnabled,
  onToggle,
  onEnqueueFolder,
  onRemoveFromQueue,
}: {
  row: IndexCoverageFolderRow;
  index: number;
  expanded: boolean;
  tone: FolderIndexRowTone;
  indexEnabled: boolean;
  onToggle: (path: string) => void;
  onEnqueueFolder: (path: string) => void;
  onRemoveFromQueue: (path: string) => void;
}) {
  const mobile = useMobileContextMenuMode();
  const {
    contextMenuOpen,
    setContextMenuOpen,
    longPressOpenedRef,
    bindPress,
  } = usePressableCardMenu({ enabled: true, coarse: mobile });

  const clickable = row.hasChildFolders;
  const systemFolder = isSystemIndexExcludedFolder(row.path);
  const canEnqueue = indexEnabled && !systemFolder && tone === 'idle';
  const canRemoveQueued = tone === 'queued';
  const percentLabel = formatIndexCoveragePercent(
    row.percent,
    row.indexableCount,
  );

  const onRowKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (!clickable) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    onToggle(row.path);
  };

  const statusLabel =
    tone === 'active' ? '색인 중' : tone === 'queued' ? '대기열' : null;

  const rowEl = (
    <li
      className={`flex cursor-pointer items-center gap-2 rounded px-1 py-0.5 focus-visible:outline-1 focus-visible:outline-blue-400 ${rowToneClass(tone)}`}
      onClick={() => {
        if (mobile && longPressOpenedRef.current) {
          longPressOpenedRef.current = false;
          return;
        }
        if (clickable) onToggle(row.path);
      }}
      onKeyDown={onRowKeyDown}
      tabIndex={clickable ? 0 : undefined}
      aria-expanded={clickable ? expanded : undefined}
      aria-current={tone === 'active' ? 'true' : undefined}
      data-index-tone={tone}
      {...(mobile ? bindPress : {})}
    >
      <span className="w-5 shrink-0 text-right tabular-nums text-gray-500">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1 overflow-hidden">
        <TreeIndent
          depth={row.depth}
          expandable={row.hasChildFolders}
          expanded={expanded}
          label={
            <span title={row.path} className="inline-flex min-w-0 items-center gap-1.5">
              <span className="min-w-0 truncate">{row.name}</span>
              {statusLabel ? (
                <span
                  className={`shrink-0 rounded px-1 py-px text-[9px] font-semibold uppercase tracking-wide ${
                    tone === 'active'
                      ? 'bg-sky-400/30 text-sky-100'
                      : 'bg-amber-400/30 text-amber-100'
                  }`}
                >
                  {statusLabel}
                </span>
              ) : null}
            </span>
          }
        />
      </span>
      <span className="w-16 shrink-0 text-right tabular-nums text-gray-400">
        {row.indexableCount > 0
          ? `${row.indexedCount.toLocaleString()}/${row.indexableCount.toLocaleString()}`
          : '—'}
      </span>
      <CoverageBar percent={row.percent} indexableCount={row.indexableCount} />
      <span className="w-12 shrink-0 text-right tabular-nums text-gray-200">
        {percentLabel}
      </span>
    </li>
  );

  return (
    <AdaptiveContextMenu
      {...(mobile
        ? { open: contextMenuOpen, onOpenChange: setContextMenuOpen }
        : {})}
      title={row.path.replace(/\/$/, '') || row.name}
      subtitle="폴더 커버리지"
      contentClassName={coverageMenuContentClass}
      trigger={rowEl}
    >
      {tone === 'active' ? (
        <AdaptiveMenuItem className={MOBILE_CONTEXT_MENU_ITEM_CLASS} disabled>
          <Loader2 size={14} className="animate-spin" />
          이 폴더 색인 중…
        </AdaptiveMenuItem>
      ) : canRemoveQueued ? (
        <AdaptiveMenuItem
          className={MOBILE_CONTEXT_MENU_ITEM_CLASS}
          onSelect={() => onRemoveFromQueue(row.path)}
        >
          <X size={14} />
          대기열에서 제거
        </AdaptiveMenuItem>
      ) : (
        <AdaptiveMenuItem
          className={MOBILE_CONTEXT_MENU_ITEM_CLASS}
          disabled={!canEnqueue}
          onSelect={() => {
            if (!canEnqueue) return;
            onEnqueueFolder(row.path);
          }}
        >
          <Search size={14} />
          이 폴더 역색인
          {systemFolder ? ' (시스템 제외)' : ''}
        </AdaptiveMenuItem>
      )}
    </AdaptiveContextMenu>
  );
}

export default function InvertedIndexCoverage({
  storageMode = STORAGE_MODE_S3,
  onScanTree,
  canScan = true,
  embedded = false,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tree, setTree] = useState<StorageTreeNode[] | null>(null);
  const [expandedFolderPaths, setExpandedFolderPaths] = useState<Set<string>>(
    () => new Set(),
  );
  const [indexRevision, setIndexRevision] = useState(0);
  const [folderQueue, setFolderQueue] = useState<string[]>([]);
  const [activeFolderPath, setActiveFolderPath] = useState<string | null>(null);
  const buildingRefreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasBuildingRef = useRef(false);
  const loadingRef = useRef(false);
  const onScanTreeRef = useRef(onScanTree);
  const canScanRef = useRef(canScan);
  const folderQueueRef = useRef<string[]>([]);
  const activeFolderPathRef = useRef<string | null>(null);
  const pumpFolderQueueRef = useRef<() => void>(() => {});

  useEffect(() => {
    onScanTreeRef.current = onScanTree;
    canScanRef.current = canScan;
  }, [onScanTree, canScan]);

  useEffect(() => {
    folderQueueRef.current = folderQueue;
  }, [folderQueue]);

  useEffect(() => {
    activeFolderPathRef.current = activeFolderPath;
  }, [activeFolderPath]);

  const loadTree = useCallback(async () => {
    const scan = onScanTreeRef.current;
    if (!scan || !canScanRef.current || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const nextTree = await scan();
      setTree(nextTree);
      setExpandedFolderPaths(new Set());
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message || '폴더 트리를 불러오지 못했습니다.');
      setTree(null);
      setExpandedFolderPaths(new Set());
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  const pumpFolderQueue = useCallback(() => {
    if (!advancedSearchEngine.isEnabled()) return;
    if (advancedSearchEngine.getStatus().building) return;
    if (activeFolderPathRef.current) return;
    const nextPath = folderQueueRef.current[0];
    if (!nextPath) return;

    const rest = folderQueueRef.current.slice(1);
    folderQueueRef.current = rest;
    setFolderQueue(rest);
    activeFolderPathRef.current = nextPath;
    setActiveFolderPath(nextPath);

    void advancedSearchEngine
      .rebuild({
        folderPath: nextPath,
        ignoreExcludedFolders: true,
      })
      .finally(() => {
        // Early-return / finished: unlock so the next queued folder can start.
        if (advancedSearchEngine.getStatus().building) return;
        if (activeFolderPathRef.current !== nextPath) return;
        activeFolderPathRef.current = null;
        setActiveFolderPath(null);
        queueMicrotask(() => pumpFolderQueueRef.current());
      });
  }, []);

  useEffect(() => {
    pumpFolderQueueRef.current = pumpFolderQueue;
  }, [pumpFolderQueue]);

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      const status = advancedSearchEngine.getStatus();
      if (status.building) {
        // Auto-load folder tree when a rebuild starts.
        if (!wasBuildingRef.current) {
          wasBuildingRef.current = true;
          void loadTree();
        }
        // Throttled live refresh while indexing so folder bars track increments.
        if (buildingRefreshTimer.current) return;
        buildingRefreshTimer.current = setTimeout(() => {
          buildingRefreshTimer.current = null;
          setIndexRevision((n) => n + 1);
        }, 500);
        return;
      }

      const wasBuilding = wasBuildingRef.current;
      wasBuildingRef.current = false;
      if (buildingRefreshTimer.current) {
        clearTimeout(buildingRefreshTimer.current);
        buildingRefreshTimer.current = null;
      }
      setIndexRevision((n) => n + 1);

      if (wasBuilding && activeFolderPathRef.current) {
        activeFolderPathRef.current = null;
        setActiveFolderPath(null);
        queueMicrotask(() => pumpFolderQueueRef.current());
      }
    });
  }, [loadTree]);

  // If Settings opens while a rebuild is already running, load coverage once.
  useEffect(() => {
    if (!advancedSearchEngine.getStatus().building) return;
    if (wasBuildingRef.current) return;
    wasBuildingRef.current = true;
    void loadTree();
  }, [loadTree]);

  useEffect(() => {
    return () => {
      if (buildingRefreshTimer.current) {
        clearTimeout(buildingRefreshTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setTree(null);
    setError(null);
    setExpandedFolderPaths(new Set());
    setFolderQueue([]);
    setActiveFolderPath(null);
    folderQueueRef.current = [];
    activeFolderPathRef.current = null;
    wasBuildingRef.current = false;
  }, [storageMode]);

  const indexStatus = advancedSearchEngine.getStatus();
  const analysis = useMemo(() => {
    if (!tree) return null;
    void indexRevision;
    return analyzeIndexCoverage(
      tree,
      advancedSearchEngine.getIndex().docs,
      {
        includeOtherFiles: indexStatus.includeOtherFiles,
        excludedFolders: indexStatus.excludedFolders,
      },
    );
  }, [
    tree,
    indexRevision,
    indexStatus.includeOtherFiles,
    indexStatus.excludedFolders,
  ]);

  const folderRows = visibleFolderRows(
    analysis?.folders ?? [],
    expandedFolderPaths,
  );

  const folderNameByPath = useMemo(() => {
    const map = new Map<string, string>();
    for (const row of analysis?.folders ?? []) {
      map.set(normalizeFolderIndexPath(row.path), row.name);
    }
    return map;
  }, [analysis?.folders]);

  const toggleFolder = (path: string) => {
    setExpandedFolderPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const handleScan = () => {
    void loadTree();
  };

  const handleEnqueueFolder = useCallback(
    (folderPath: string) => {
      const nextQueue = enqueueFolderIndexPath(
        folderQueueRef.current,
        folderPath,
        activeFolderPathRef.current,
      );
      folderQueueRef.current = nextQueue;
      setFolderQueue(nextQueue);
      pumpFolderQueue();
    },
    [pumpFolderQueue],
  );

  const handleRemoveFromQueue = useCallback((folderPath: string) => {
    const nextQueue = removeFolderIndexPath(folderQueueRef.current, folderPath);
    folderQueueRef.current = nextQueue;
    setFolderQueue(nextQueue);
  }, []);

  const summary = analysis?.summary;
  const summaryPercent = summary
    ? formatIndexCoveragePercent(summary.percent, summary.indexableCount)
    : '—';

  const queueVisible =
    Boolean(activeFolderPath) || folderQueue.length > 0;

  return (
    <div
      className={
        embedded
          ? 'space-y-4 border-t border-gray-200 pt-4 dark:border-odp-borderSoft'
          : 'scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface'
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={
              embedded
                ? 'text-xs font-bold text-gray-700 dark:text-odp-fgStrong'
                : 'text-sm font-bold text-gray-700 dark:text-odp-fgStrong'
            }
          >
            {embedded ? '폴더별 커버리지' : '역색인'}
          </h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
            현재 선택: <span className="font-semibold">{storageLabel(storageMode)}</span>
            . 폴더별로 색인 대상 파일 중 역색인된 비율을 표시합니다.
            {indexStatus.includeOtherFiles
              ? ' (Markdown + 기타 텍스트 파일)'
              : ' (Markdown만)'}
            {indexStatus.building
              ? ' 색인 시작 시 폴더 트리를 자동으로 불러오고, 진행도가 갱신됩니다.'
              : ''}
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
          역색인이 꺼져 있습니다. 위에서 역색인을 켠 뒤 색인을 생성하세요.
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

      {queueVisible ? (
        <div
          className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-100"
          aria-live="polite"
          aria-label="폴더 역색인 대기열"
        >
          <div className="font-semibold">
            폴더 역색인 대기열
            {activeFolderPath ? ' · 진행 중 1' : ''}
            {folderQueue.length > 0 ? ` · 대기 ${folderQueue.length}` : ''}
          </div>
          <ul className="mt-1.5 space-y-1">
            {activeFolderPath ? (
              <li className="flex items-center gap-2">
                <Loader2 size={12} className="shrink-0 animate-spin text-sky-600 dark:text-sky-300" />
                <span className="min-w-0 flex-1 truncate font-mono">
                  {folderNameByPath.get(normalizeFolderIndexPath(activeFolderPath)) ??
                    activeFolderPath}
                </span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  색인 중
                </span>
              </li>
            ) : null}
            {folderQueue.map((path, i) => (
              <li key={`q-${path}`} className="flex items-center gap-2">
                <span className="w-4 shrink-0 text-right tabular-nums text-sky-700/80 dark:text-sky-300/80">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate font-mono">
                  {folderNameByPath.get(normalizeFolderIndexPath(path)) ?? path}
                </span>
                <button
                  type="button"
                  className="inline-flex shrink-0 items-center gap-0.5 rounded border border-sky-300/80 bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold text-sky-900 transition hover:bg-white dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-100 dark:hover:bg-sky-900/80"
                  onClick={() => handleRemoveFromQueue(path)}
                  aria-label={`${path} 대기열에서 제거`}
                >
                  <X size={10} />
                  제거
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="max-h-96 overflow-auto rounded-md border border-gray-800 bg-[#1a1b26] p-2 font-mono text-[11px] text-gray-100 dark:border-gray-700">
        {folderRows.length === 0 ? (
          <p className="px-2 py-6 text-center text-gray-500">
            {loading
              ? '폴더 트리를 불러오는 중…'
              : tree
                ? '표시할 폴더가 없습니다.'
                : indexStatus.building
                  ? '색인 시작에 맞춰 폴더 트리를 불러오는 중…'
                  : '「폴더 트리 불러오기」를 누르거나 색인을 시작하면 역색인 현황을 확인할 수 있습니다.'}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {folderRows.map((row, idx) => (
              <CoverageFolderRowItem
                key={row.path}
                row={row}
                index={idx}
                expanded={expandedFolderPaths.has(row.path)}
                tone={folderIndexRowTone(
                  row.path,
                  activeFolderPath,
                  folderQueue,
                )}
                indexEnabled={indexStatus.enabled}
                onToggle={toggleFolder}
                onEnqueueFolder={handleEnqueueFolder}
                onRemoveFromQueue={handleRemoveFromQueue}
              />
            ))}
          </ul>
        )}
      </div>

      <p className="text-[10px] text-gray-500 dark:text-odp-muted">
        폴더를 클릭해 하위 폴더를 펼칩니다. 우클릭(또는 길게 누르기)으로 폴더를
        역색인 대기열에 넣습니다(제외 폴더 설정을 무시하고 병합 색인). 여러 폴더를
        연속으로 추가하면 순차 실행됩니다. 진행 중 행은 하늘색, 대기 행은 호박색으로
        표시됩니다. 채팅 day 파일은 해당 날짜 메시지가 하나라도 색인되면 완료로
        집계합니다.
      </p>
    </div>
  );
}
