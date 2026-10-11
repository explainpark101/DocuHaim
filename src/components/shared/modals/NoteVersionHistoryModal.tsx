import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import Button from '@/components/Button';
import {
  IconBack,
  IconCheck,
  IconEye,
  IconHistory,
  IconTrash,
} from '@/components/icons';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import Modal from '@/components/modals/Modal';
import VersionRestoreDiffModal from '@/components/shared/modals/VersionRestoreDiffModal';
import {
  normalizeVaultPath,
  type VersionEntry,
} from '@/utils/versionHistory';
import { subscribeNoteVersionHistoryAfterSave } from '@/utils/versionHistory/openRequest';
import {
  noteVersionHistoryUiStore,
  useNoteVersionHistoryUi,
} from '@/utils/versionHistory/noteVersionHistoryUiStore';
import { formatStorageBytes } from '@/utils/storageUsageAnalysis';

function formatWhen(iso: string | undefined): string {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function sourceBadge(source: VersionEntry['source']): string {
  if (source === 's3-native') return 'S3';
  if (source === 'legacy-app') return '앱(레거시)';
  return '앱';
}

export type NoteVersionHistoryModalProps = {
  isOpen: boolean;
  filePath: string;
  currentText: string;
  theme?: 'light' | 'dark';
  onClose: () => void;
  onLoadVersions: () => Promise<VersionEntry[]>;
  onReadVersion: (entry: VersionEntry) => Promise<string>;
  onDeleteVersions: (entries: VersionEntry[]) => Promise<void>;
  onRestore: (entry: VersionEntry, versionText: string) => Promise<void>;
};

type ConfirmKind = { entries: VersionEntry[] } | null;

type VersionEntryRowProps = {
  entry: VersionEntry;
  busy: boolean;
  onPreview: (entry: VersionEntry) => void;
  onRestore: (entry: VersionEntry) => void;
};

const VersionEntryRow = memo(function VersionEntryRow({
  entry,
  busy,
  onPreview,
  onRestore,
}: VersionEntryRowProps) {
  const selected = useNoteVersionHistoryUi((s) =>
    s.selectedIds.includes(entry.id),
  );
  const locked = Boolean(entry.protectCurrent);
  const whenLabel = locked
    ? formatWhen(entry.at) || '지금'
    : formatWhen(entry.at) || entry.id;

  const onCardActivate = () => {
    if (locked || busy) return;
    noteVersionHistoryUiStore.toggleSelected(entry.id);
  };

  const stop = (e: ReactMouseEvent) => {
    e.stopPropagation();
  };

  return (
    <li
      className={
        locked
          ? 'rounded-xl border-2 border-sky-400 bg-sky-50 p-3 shadow-sm ring-2 ring-sky-200/70 dark:border-sky-500 dark:bg-sky-950/45 dark:ring-sky-800/60'
          : [
              'rounded-xl border p-3 transition-[border-color,background-color,box-shadow] cursor-pointer select-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50',
              selected
                ? 'border-violet-400 bg-violet-50/70 shadow-sm dark:border-violet-500/60 dark:bg-violet-950/35'
                : 'border-gray-200 bg-white/80 hover:border-violet-200 hover:bg-violet-50/30 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:hover:border-violet-500/30',
            ].join(' ')
      }
      aria-current={locked ? 'true' : undefined}
      aria-selected={locked ? undefined : selected}
      data-selected={selected ? 'true' : undefined}
      onClick={locked ? undefined : onCardActivate}
      onKeyDown={
        locked
          ? undefined
          : (e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onCardActivate();
              }
            }
      }
      role={locked ? undefined : 'option'}
      tabIndex={locked || busy ? undefined : 0}
    >
      <div className="flex items-start gap-3">
        {locked ? (
          <span
            className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-sky-500 shadow-sm dark:bg-sky-400"
            title="현재 버전"
            aria-hidden
          />
        ) : (
          <span
            className={[
              'mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded border pointer-events-none',
              selected
                ? 'border-violet-600 bg-violet-600 text-white dark:border-violet-400 dark:bg-violet-500'
                : 'border-gray-300 bg-white dark:border-odp-borderSoft dark:bg-odp-bg',
            ].join(' ')}
            aria-hidden
          >
            {selected ? (
              <IconCheck size={12} className="text-white" />
            ) : null}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
            <span
              className={
                locked
                  ? 'font-semibold text-sky-900 dark:text-sky-100'
                  : 'font-medium text-gray-800 dark:text-odp-fgStrong'
              }
            >
              {whenLabel}
            </span>
            {locked ? (
              <span className="rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white dark:bg-sky-500">
                현재 버전
              </span>
            ) : (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-odp-bg">
                {sourceBadge(entry.source)}
              </span>
            )}
            {!locked && Number.isFinite(entry.size) ? (
              <span>{formatStorageBytes(entry.size)}</span>
            ) : null}
          </div>
          {locked ? (
            <p className="mt-2 text-[11px] leading-snug text-sky-800/80 dark:text-sky-200/80">
              지금 열려 있는 내용입니다. 이전 버전만 미리보기·복원·삭제할 수
              있습니다.
            </p>
          ) : (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <Button
                                type="button"
                                variant="tertiary"
                                size="sm"
                                className="border border-violet-300 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-500/50 dark:bg-violet-950/50 dark:text-violet-200 dark:hover:bg-violet-900/50"
                                disabled={busy}
                                onClick={(e: ReactMouseEvent) => {
                                  stop(e);
                                  onPreview(entry);
                                }}
                              >
                                <IconEye size={14} />
                                미리보기
                              </Button>
                              <Button
                                type="button"
                                variant="tertiary"
                                size="sm"
                                className="border border-emerald-400 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-500/50 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                                disabled={busy}
                                onClick={(e: ReactMouseEvent) => {
                                  stop(e);
                                  onRestore(entry);
                                }}
                              >
                                <IconCheck size={14} />
                                복원
                              </Button>
                            </div>
          )}
        </div>
      </div>
    </li>
  );
});

/**
 * Note version history: multi-select delete, purge all, restore via diff gate.
 * List/selection live in noteVersionHistoryUiStore so parent re-renders do not wipe checks.
 */
export default function NoteVersionHistoryModal({
  isOpen,
  filePath,
  currentText,
  theme = 'light',
  onClose,
  onLoadVersions,
  onReadVersion,
  onDeleteVersions,
  onRestore,
}: NoteVersionHistoryModalProps) {
  const entries = useNoteVersionHistoryUi((s) => s.entries);
  const selectedIds = useNoteVersionHistoryUi((s) => s.selectedIds);
  const loading = useNoteVersionHistoryUi((s) => s.loading);
  const busy = useNoteVersionHistoryUi((s) => s.busy);
  const error = useNoteVersionHistoryUi((s) => s.error);

  const [preview, setPreview] = useState<{
    entry: VersionEntry;
    text: string;
  } | null>(null);
  const [restoreTarget, setRestoreTarget] = useState<{
    entry: VersionEntry;
    text: string;
  } | null>(null);
  const [confirm, setConfirm] = useState<ConfirmKind>(null);
  /** Bumped on live save so synthetic current row can refresh without remount. */
  const [saveRefreshTick, setSaveRefreshTick] = useState(0);
  /** Freeze synthetic current-row size so typing while open does not reshuffle list. */
  const currentSnapshotRef = useRef(currentText);

  const loadVersionsRef = useRef(onLoadVersions);
  loadVersionsRef.current = onLoadVersions;

  const fileName =
    filePath.split('/').filter(Boolean).pop() || filePath || 'note.md';

  const currentTextRef = useRef(currentText);
  currentTextRef.current = currentText;

  const loadList = useCallback(async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) noteVersionHistoryUiStore.setLoading(true);
    if (!opts?.silent) noteVersionHistoryUiStore.setError('');
    try {
      const list = await loadVersionsRef.current();
      noteVersionHistoryUiStore.setEntries(Array.isArray(list) ? list : []);
    } catch (e: unknown) {
      noteVersionHistoryUiStore.setError(
        e instanceof Error ? e.message : '버전 목록을 불러오지 못했습니다.',
      );
      if (!opts?.silent) noteVersionHistoryUiStore.setEntries([]);
    } finally {
      if (!opts?.silent) noteVersionHistoryUiStore.setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      noteVersionHistoryUiStore.endSession();
      setPreview(null);
      setRestoreTarget(null);
      setConfirm(null);
      return;
    }
    currentSnapshotRef.current = currentTextRef.current;
    noteVersionHistoryUiStore.beginSession(filePath);
    void loadList();
  }, [isOpen, filePath, loadList]);

  // Soft-refresh list when this note is saved while the modal is open.
  useEffect(() => {
    if (!isOpen) return undefined;
    const target = normalizeVaultPath(filePath);
    return subscribeNoteVersionHistoryAfterSave((savedPath) => {
      if (normalizeVaultPath(savedPath) !== target) return;
      currentSnapshotRef.current = currentTextRef.current;
      setSaveRefreshTick((n) => n + 1);
      void loadList({ silent: true });
    });
  }, [isOpen, filePath, loadList]);

  const deletableEntries = useMemo(
    () => entries.filter((e) => !e.protectCurrent && !e.isDeleteMarker),
    [entries],
  );

  const displayEntries = useMemo(() => {
    if (entries.some((e) => e.protectCurrent)) return entries;
    const snap = currentSnapshotRef.current || '';
    const currentRow: VersionEntry = {
      id: '__current__',
      source: 'app',
      at: '',
      size: new TextEncoder().encode(snap).length,
      protectCurrent: true,
      isLatest: true,
    };
    return [currentRow, ...entries];
  }, [entries, saveRefreshTick]);

  const selectedEntries = useMemo(
    () => deletableEntries.filter((e) => selectedIds.includes(e.id)),
    [deletableEntries, selectedIds],
  );

  const runDeleteSelected = async () => {
    if (!selectedEntries.length || busy) return;
    noteVersionHistoryUiStore.setBusy(true);
    noteVersionHistoryUiStore.setError('');
    try {
      await onDeleteVersions(selectedEntries);
      noteVersionHistoryUiStore.clearSelected();
      await loadList();
    } catch (e: unknown) {
      noteVersionHistoryUiStore.setError(
        e instanceof Error ? e.message : '삭제에 실패했습니다.',
      );
    } finally {
      noteVersionHistoryUiStore.setBusy(false);
    }
  };

  const allDeletableSelected =
    deletableEntries.length > 0 &&
    selectedEntries.length === deletableEntries.length;

  const openPreview = useCallback(
    async (entry: VersionEntry) => {
      noteVersionHistoryUiStore.setBusy(true);
      noteVersionHistoryUiStore.setError('');
      try {
        const text = await onReadVersion(entry);
        setPreview({ entry, text });
      } catch (e: unknown) {
        noteVersionHistoryUiStore.setError(
          e instanceof Error ? e.message : '미리보기에 실패했습니다.',
        );
      } finally {
        noteVersionHistoryUiStore.setBusy(false);
      }
    },
    [onReadVersion],
  );

  const openRestore = useCallback(
    async (entry: VersionEntry) => {
      noteVersionHistoryUiStore.setBusy(true);
      noteVersionHistoryUiStore.setError('');
      try {
        const text = await onReadVersion(entry);
        setRestoreTarget({ entry, text });
      } catch (e: unknown) {
        noteVersionHistoryUiStore.setError(
          e instanceof Error ? e.message : '버전을 읽지 못했습니다.',
        );
      } finally {
        noteVersionHistoryUiStore.setBusy(false);
      }
    },
    [onReadVersion],
  );

  const confirmRestore = async (target = restoreTarget) => {
    if (!target || busy) return;
    noteVersionHistoryUiStore.setBusy(true);
    noteVersionHistoryUiStore.setError('');
    try {
      await onRestore(target.entry, target.text);
      setPreview(null);
      setRestoreTarget(null);
      onClose();
    } catch (e: unknown) {
      noteVersionHistoryUiStore.setError(
        e instanceof Error ? e.message : '복원에 실패했습니다.',
      );
    } finally {
      noteVersionHistoryUiStore.setBusy(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={busy ? undefined : onClose}
        contentClassName="max-w-lg h-[80vh] max-h-[80vh] w-[min(96vw,32rem)]"
        ignoreEnterInFields
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <header className="shrink-0 border-b border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
            <h3 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-odp-fgStrong">
              <IconHistory size={16} />
              버전 기록
            </h3>
            <p className="mt-1 truncate text-sm text-gray-600 dark:text-odp-muted">
              {filePath}
            </p>
          </header>

          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-2 dark:border-odp-borderSoft">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={busy || deletableEntries.length === 0}
              onClick={() => {
                if (allDeletableSelected) {
                  noteVersionHistoryUiStore.clearSelected();
                } else {
                  noteVersionHistoryUiStore.selectAllDeletable();
                }
              }}
            >
              <IconCheck size={14} />
              {allDeletableSelected ? '전부 선택 해제' : '전부 선택'}
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              disabled={busy || selectedEntries.length === 0}
              onClick={() => setConfirm({ entries: selectedEntries })}
            >
              <IconTrash size={14} />
              선택 삭제
              {selectedEntries.length > 0 ? ` (${selectedEntries.length})` : ''}
            </Button>
            <span className="ml-auto text-[11px] text-gray-400">
              {loading
                ? '불러오는 중…'
                : `이전 ${deletableEntries.length}개`}
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
            {error ? (
              <p className="mb-2 text-center text-xs text-red-500">{error}</p>
            ) : null}
            {!loading && deletableEntries.length === 0 ? (
              <p className="mb-3 text-center text-[11px] text-gray-400">
                저장된 이전 버전이 없습니다. 아래는 현재 열린 내용입니다.
              </p>
            ) : null}
            {!loading && displayEntries.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">
                저장된 이전 버전이 없습니다.
              </p>
            ) : (
              <ul className="space-y-2" role="listbox" aria-multiselectable>
                {displayEntries.map((entry) => (
                  <VersionEntryRow
                    key={entry.id}
                    entry={entry}
                    busy={busy}
                    onPreview={openPreview}
                    onRestore={openRestore}
                  />
                ))}
              </ul>
            )}
          </div>

          <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-odp-borderSoft">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={busy}
            >
              <IconBack size={14} />
              닫기
            </Button>
          </footer>
        </div>
      </Modal>

      <VersionRestoreDiffModal
        isOpen={Boolean(preview)}
        mode="preview"
        title="버전 미리보기"
        fileLabel={fileName}
        currentText={currentText}
        versionText={preview?.text ?? ''}
        versionLabel={
          preview?.entry.at
            ? `선택한 버전 (${formatWhen(preview.entry.at)} · ${sourceBadge(preview.entry.source)})`
            : '선택한 버전'
        }
        theme={theme}
        confirming={busy}
        onCancel={() => setPreview(null)}
        {...(preview && !preview.entry.protectCurrent
          ? { onConfirm: () => void confirmRestore(preview) }
          : {})}
      />

      <VersionRestoreDiffModal
        isOpen={Boolean(restoreTarget)}
        mode="restore"
        fileLabel={fileName}
        currentText={currentText}
        versionText={restoreTarget?.text ?? ''}
        versionLabel={
          restoreTarget?.entry.at
            ? `선택한 버전 (${formatWhen(restoreTarget.entry.at)})`
            : '선택한 버전'
        }
        theme={theme}
        confirming={busy}
        onCancel={() => setRestoreTarget(null)}
        onConfirm={() => void confirmRestore()}
      />

      <ConfirmModal
        isOpen={Boolean(confirm)}
        variant="danger"
        title="선택한 버전 삭제"
        message={`선택한 ${confirm?.entries.length ?? 0}개 버전을 삭제합니다.`}
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={() => {
          setConfirm(null);
          void runDeleteSelected();
        }}
        onCancel={() => setConfirm(null)}
      />
    </>
  );
}
