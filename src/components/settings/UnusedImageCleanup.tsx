import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, Copy, Trash2 } from 'lucide-react';
import { RadioGroup, Switch } from 'radix-ui';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/vault/storageSettings';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';
import { loadOrphanImageAutoDeleteEnabled } from '@/utils/orphanImageCleanupSettings';
import {
  collectImageFiles,
  collectMarkdownPaths,
  extractWikiImagePaths,
  findDuplicateImageGroups,
  findUnusedImages,
  formatStorageBytes,
  mapPool,
  type DuplicateImageGroup,
  type ImageFileEntry,
  type UnusedImageDeleteMode,
  type UnusedImageScope,
} from '@/utils/unusedImageCleanup';
import type { StorageTreeNode } from '@/utils/storageUsageAnalysis';

type Props = {
  storageMode?: string;
  canScan?: boolean;
  onScanTree?: () => Promise<StorageTreeNode[]>;
  onReadText?: (path: string) => Promise<string>;
  onReadBytes?: (path: string) => Promise<Uint8Array>;
  onDeletePaths?: (
    paths: string[],
    mode: UnusedImageDeleteMode,
  ) => Promise<void>;
};

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

function storageLabel(mode: string | undefined): string {
  if (mode === STORAGE_MODE_LOCAL) return 'Local Haim';
  if (mode === STORAGE_MODE_WEBDAV) return 'WebDAV Haim';
  if (mode === STORAGE_MODE_S3) return 'S3 Haim';
  return '저장소';
}

export default function UnusedImageCleanup({
  storageMode,
  canScan = false,
  onScanTree,
  onReadText,
  onReadBytes,
  onDeletePaths,
}: Props) {
  const [autoDelete, setAutoDelete] = useState(() => loadOrphanImageAutoDeleteEnabled());
  const [scope, setScope] = useState<UnusedImageScope>('notes');
  const [deleteMode, setDeleteMode] = useState<UnusedImageDeleteMode>('trash');

  const [scanningUnused, setScanningUnused] = useState(false);
  const [scanningDupes, setScanningDupes] = useState(false);
  const [mdProgress, setMdProgress] = useState<{ done: number; total: number } | null>(null);
  const [hashProgress, setHashProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState('');

  const [unused, setUnused] = useState<ImageFileEntry[]>([]);
  const [selectedUnused, setSelectedUnused] = useState<Set<string>>(() => new Set());
  const [dupeGroups, setDupeGroups] = useState<DuplicateImageGroup[]>([]);
  const [selectedDupes, setSelectedDupes] = useState<Set<string>>(() => new Set());
  const [keepByHash, setKeepByHash] = useState<Record<string, string>>({});

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPaths, setConfirmPaths] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return subscribeSettingsToggles((id, enabled) => {
      if (id === 'settings-orphan-image-auto') setAutoDelete(enabled);
    });
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const busy = scanningUnused || scanningDupes || deleting;

  const runUnusedScan = async () => {
    if (!canScan || !onScanTree || !onReadText || busy) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setScanningUnused(true);
    setError('');
    setMdProgress(null);
    try {
      const tree = await onScanTree();
      if (ac.signal.aborted) return;
      const images = collectImageFiles(tree, scope);
      const mdPaths = collectMarkdownPaths(tree);
      const allRefs = new Set<string>();
      await mapPool(
        mdPaths,
        6,
        async (path) => {
          try {
            const text = await onReadText(path);
            for (const p of extractWikiImagePaths(text)) allRefs.add(p);
          } catch {
            // skip unreadable md
          }
        },
        {
          signal: ac.signal,
          onProgress: (done, total) => setMdProgress({ done, total }),
        },
      );
      if (ac.signal.aborted) return;
      const found = findUnusedImages({ images, referencedPaths: allRefs });
      setUnused(found);
      setSelectedUnused(new Set(found.map((f) => f.path)));
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setScanningUnused(false);
      setMdProgress(null);
    }
  };

  const runDupeScan = async () => {
    if (!canScan || !onScanTree || !onReadBytes || busy) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setScanningDupes(true);
    setError('');
    setHashProgress(null);
    try {
      const tree = await onScanTree();
      if (ac.signal.aborted) return;
      const images = collectImageFiles(tree, scope);
      const groups = await findDuplicateImageGroups(images, onReadBytes, {
        signal: ac.signal,
        onProgress: (done, total) => setHashProgress({ done, total }),
      });
      if (ac.signal.aborted) return;
      setDupeGroups(groups);
      const keep: Record<string, string> = {};
      const selected = new Set<string>();
      for (const g of groups) {
        keep[g.hash] = g.keepPath;
        for (const f of g.files) {
          if (f.path !== g.keepPath) selected.add(f.path);
        }
      }
      setKeepByHash(keep);
      setSelectedDupes(selected);
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setScanningDupes(false);
      setHashProgress(null);
    }
  };

  const toggleUnused = (path: string) => {
    setSelectedUnused((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const toggleDupe = (path: string, hash: string) => {
    const keep = keepByHash[hash];
    if (path === keep) return;
    setSelectedDupes((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const setKeep = (hash: string, path: string) => {
    setKeepByHash((prev) => ({ ...prev, [hash]: path }));
    setSelectedDupes((prev) => {
      const next = new Set(prev);
      const group = dupeGroups.find((g) => g.hash === hash);
      if (!group) return next;
      for (const f of group.files) {
        if (f.path === path) next.delete(f.path);
        else next.add(f.path);
      }
      return next;
    });
  };

  const openConfirm = (paths: string[]) => {
    if (!paths.length || !onDeletePaths) return;
    setConfirmPaths(paths);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!onDeletePaths || !confirmPaths.length) return;
    setDeleting(true);
    setError('');
    try {
      await onDeletePaths(confirmPaths, deleteMode);
      const removed = new Set(confirmPaths);
      setUnused((prev) => prev.filter((f) => !removed.has(f.path)));
      setSelectedUnused((prev) => {
        const next = new Set(prev);
        for (const p of removed) next.delete(p);
        return next;
      });
      setDupeGroups((prev) =>
        prev
          .map((g) => ({
            ...g,
            files: g.files.filter((f) => !removed.has(f.path)),
          }))
          .filter((g) => g.files.length >= 2),
      );
      setSelectedDupes((prev) => {
        const next = new Set(prev);
        for (const p of removed) next.delete(p);
        return next;
      });
      setConfirmOpen(false);
      setConfirmPaths([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setDeleting(false);
    }
  };

  const unusedSelectedCount = selectedUnused.size;
  const dupeSelectedCount = selectedDupes.size;
  const hard = deleteMode === 'hard';

  return (
    <div
      id="settings-unused-images"
      tabIndex={-1}
      className="scroll-mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
          미사용 / 중복 이미지
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
          {storageLabel(storageMode)}의 wiki 이미지(
          <code className="rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft">![[…]]</code>
          ) 참조를 기준으로 orphan·중복을 찾습니다.
        </p>
      </div>

      <div className="flex items-start justify-between gap-3 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">
            노트 삭제 시 이미지 자동 정리
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            켜면 노트/폴더 삭제 시 companion{' '}
            <code className="rounded bg-gray-100 px-0.5 dark:bg-odp-bgSoft">.images/…</code> 도
            함께 휴지통으로 보냅니다. 끄면 이 화면에서 스캔해 삭제합니다.
          </p>
        </div>
        <Switch.Root
          className={switchRootClass(autoDelete)}
          checked={autoDelete}
          onCheckedChange={(checked) =>
            setSettingsToggle('settings-orphan-image-auto', checked)
          }
          aria-label="노트 삭제 시 이미지 자동 정리"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-gray-600 dark:text-odp-muted">대상</div>
          <RadioGroup.Root
            className="flex flex-col gap-1.5"
            value={scope}
            onValueChange={(v) => setScope(v as UnusedImageScope)}
            aria-label="스캔 대상"
          >
            {(
              [
                { value: 'notes', label: '노트만 (.images/)' },
                { value: 'notes+chat', label: '노트 + 채팅' },
              ] as const
            ).map((opt) => {
              const selected = scope === opt.value;
              return (
                <RadioGroup.Item
                  key={opt.value}
                  value={opt.value}
                  className={[
                    'rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all',
                    'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    selected
                      ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30'
                      : 'border-gray-300 opacity-70 dark:border-odp-borderStrong',
                  ].join(' ')}
                >
                  {opt.label}
                </RadioGroup.Item>
              );
            })}
          </RadioGroup.Root>
        </div>
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-gray-600 dark:text-odp-muted">삭제 방식</div>
          <RadioGroup.Root
            className="flex flex-col gap-1.5"
            value={deleteMode}
            onValueChange={(v) => setDeleteMode(v as UnusedImageDeleteMode)}
            aria-label="삭제 방식"
          >
            {(
              [
                { value: 'trash', label: '휴지통으로 이동' },
                { value: 'hard', label: '영구 삭제' },
              ] as const
            ).map((opt) => {
              const selected = deleteMode === opt.value;
              return (
                <RadioGroup.Item
                  key={opt.value}
                  value={opt.value}
                  className={[
                    'rounded-md border-2 px-2.5 py-2 text-left text-xs outline-none transition-all',
                    'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                    selected
                      ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30'
                      : 'border-gray-300 opacity-70 dark:border-odp-borderStrong',
                  ].join(' ')}
                >
                  {opt.label}
                </RadioGroup.Item>
              );
            })}
          </RadioGroup.Root>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={!canScan || busy}
          onClick={() => void runUnusedScan()}
        >
          {scanningUnused ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          미사용 스캔
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={!canScan || busy}
          onClick={() => void runDupeScan()}
        >
          {scanningDupes ? <Loader2 size={14} className="animate-spin" /> : <Copy size={14} />}
          중복 스캔
        </Button>
      </div>

      {(mdProgress || hashProgress) && (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          {mdProgress
            ? `Markdown ${mdProgress.done}/${mdProgress.total}`
            : null}
          {mdProgress && hashProgress ? ' · ' : null}
          {hashProgress ? `해시 ${hashProgress.done}/${hashProgress.total}` : null}
        </p>
      )}

      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {!canScan ? (
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          저장소가 연결되면 스캔할 수 있습니다.
        </p>
      ) : null}

      {unused.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-gray-700 dark:text-odp-fg">
              미사용 ({unused.length})
            </h4>
            <Button
              type="button"
              variant="danger"
              disabled={unusedSelectedCount === 0 || busy}
              onClick={() => openConfirm([...selectedUnused])}
            >
              <Trash2 size={14} />
              선택 삭제 ({unusedSelectedCount})
            </Button>
          </div>
          <ul className="max-h-56 space-y-1 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter">
            {unused.map((f) => (
              <li key={f.path}>
                <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={selectedUnused.has(f.path)}
                    onChange={() => toggleUnused(f.path)}
                  />
                  <span className="min-w-0 flex-1 break-all">{f.path}</span>
                  <span className="shrink-0 tabular-nums text-gray-500 dark:text-odp-muted">
                    {formatStorageBytes(f.size)}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {dupeGroups.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-gray-700 dark:text-odp-fg">
              중복 ({dupeGroups.length} 그룹)
            </h4>
            <Button
              type="button"
              variant="danger"
              disabled={dupeSelectedCount === 0 || busy}
              onClick={() => openConfirm([...selectedDupes])}
            >
              <Trash2 size={14} />
              선택 삭제 ({dupeSelectedCount})
            </Button>
          </div>
          {dupeGroups.map((g) => (
            <div
              key={g.hash}
              className="space-y-1 rounded-md border border-gray-200 bg-white p-2 dark:border-odp-borderSoft dark:bg-odp-bgSofter"
            >
              <div className="text-[10px] text-gray-500 dark:text-odp-muted">
                {formatStorageBytes(g.size)} · {g.hash.slice(0, 12)}…
              </div>
              <ul className="space-y-1">
                {g.files.map((f) => {
                  const isKeep = keepByHash[g.hash] === f.path;
                  return (
                    <li key={f.path}>
                      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-odp-fg">
                        <input
                          type="checkbox"
                          className="mt-0.5"
                          checked={selectedDupes.has(f.path)}
                          disabled={isKeep}
                          onChange={() => toggleDupe(f.path, g.hash)}
                        />
                        <span className="min-w-0 flex-1 break-all">
                          {f.path}
                          {isKeep ? (
                            <span className="ml-1 text-[10px] text-blue-600 dark:text-blue-400">
                              (유지)
                            </span>
                          ) : null}
                        </span>
                        {!isKeep ? (
                          <button
                            type="button"
                            className="shrink-0 text-[10px] text-blue-600 underline dark:text-blue-400"
                            onClick={() => setKeep(g.hash, f.path)}
                          >
                            이 파일 유지
                          </button>
                        ) : null}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      <ConfirmModal
        isOpen={confirmOpen}
        title={hard ? '이미지를 영구 삭제할까요?' : '이미지를 휴지통으로 보낼까요?'}
        message={
          hard
            ? `${confirmPaths.length}개 파일을 복구할 수 없이 삭제합니다.`
            : `${confirmPaths.length}개 파일을 .trash/ 로 이동합니다.`
        }
        variant="danger"
        confirmLabel={hard ? '영구 삭제' : '휴지통으로 이동'}
        cancelLabel="취소"
        confirmDisabled={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setConfirmPaths([]);
        }}
      />
    </div>
  );
}
