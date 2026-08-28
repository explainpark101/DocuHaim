import { useCallback, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { GripHorizontal, Trash2, X } from 'lucide-react';
import Button from '@/components/Button';
import { IconAlert, IconCheck, IconLoader, IconUpload } from '@/components/icons';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import {
  useFileUploadQueue,
  type FileUploadQueueBatch,
  type FileUploadQueueItem,
  type FileUploadQueueItemStatus,
} from '@/contexts/FileUploadQueueContext';
import {
  hasStoredFileUploadQueuePanelPosition,
  loadFileUploadQueuePanelPosition,
  resolveAnchoredFileUploadQueuePanelPosition,
  saveFileUploadQueuePanelPosition,
} from '@/utils/fileUploadQueuePanelPosition';

const DRAG_THRESHOLD_PX = 5;

type PendingVaultDelete = {
  itemId: string;
  name: string;
  fullPath: string;
};

function normalizeQueuePath(path: string): string {
  return String(path || '').replace(/\\/g, '/');
}

function fileUploadQueueItemFullPath(
  batch: FileUploadQueueBatch,
  item: FileUploadQueueItem,
): string {
  const vaultKey = normalizeQueuePath(item.vaultKey || '');
  if (vaultKey) return vaultKey;

  const dest = normalizeQueuePath(batch.destPath || '');
  const rel = normalizeQueuePath(item.relativePath || item.name || '');
  if (!dest) return rel;
  if (rel.startsWith(dest)) return rel;
  const destWithSlash = dest.endsWith('/') ? dest : `${dest}/`;
  return rel.startsWith('/') ? `${dest.replace(/\/$/, '')}${rel}` : `${destWithSlash}${rel}`;
}

function statusLabel(status: FileUploadQueueItemStatus): string {
  switch (status) {
    case 'queued':
      return '대기';
    case 'uploading':
      return '업로드 중';
    case 'done':
      return '완료';
    case 'skipped':
      return '취소';
    case 'cancelled':
      return '취소됨';
    case 'error':
      return '실패';
    default:
      return status;
  }
}

type QueueRowProps = {
  batch: FileUploadQueueBatch;
  item: FileUploadQueueItem;
  onCancel: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onRequestDeleteVault: (itemId: string) => void;
};

function QueueRow({ batch, item, onCancel, onRemove, onRequestDeleteVault }: QueueRowProps) {
  const isActive = item.status === 'queued' || item.status === 'uploading';
  const isError = item.status === 'error';
  const isDone = item.status === 'done';
  const isFinished = ['done', 'error', 'skipped', 'cancelled'].includes(item.status);
  const fullPath = fileUploadQueueItemFullPath(batch, item);
  const showFullPath = Boolean(fullPath) && fullPath !== item.name;

  return (
    <li className="flex items-start gap-2 rounded-md border border-gray-200/80 bg-white/80 px-2.5 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/80">
      <span className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted">
        {isActive ? (
          <IconLoader size={14} className="animate-spin text-blue-500" />
        ) : isError ? (
          <IconAlert size={14} className="text-red-500" />
        ) : isDone ? (
          <IconCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
        ) : (
          <IconUpload size={14} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
          {item.name}
        </p>
        {showFullPath ? (
          <p
            className="truncate text-[11px] leading-snug text-gray-500 dark:text-odp-muted"
            title={fullPath}
          >
            {fullPath}
          </p>
        ) : null}
        <p
          className={`text-[11px] leading-snug ${
            isError
              ? 'text-red-600 dark:text-red-300'
              : 'text-gray-500 dark:text-odp-muted'
          }`}
        >
          {isError && item.error ? item.error : statusLabel(item.status)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        {isActive ? (
          <button
            type="button"
            onClick={() => onCancel(item.id)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-red-300"
            aria-label="업로드 취소"
          >
            <X size={14} />
          </button>
        ) : null}
        {isDone && item.vaultKey ? (
          <button
            type="button"
            onClick={() => onRequestDeleteVault(item.id)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-red-300"
            aria-label="볼트에서 파일 삭제"
          >
            <Trash2 size={14} />
          </button>
        ) : null}
        {isFinished ? (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
            aria-label="목록에서 제거"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
    </li>
  );
}

type BatchSectionProps = {
  batch: FileUploadQueueBatch;
  onCancel: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onRequestDeleteVault: (itemId: string) => void;
};

function BatchSection({ batch, onCancel, onRemove, onRequestDeleteVault }: BatchSectionProps) {
  const done = batch.items.filter((item) => item.status === 'done').length;
  const errorCount = batch.items.filter((item) => item.status === 'error').length;
  const skippedCount = batch.items.filter(
    (item) => item.status === 'skipped' || item.status === 'cancelled',
  ).length;
  const isActive =
    batch.isActive ||
    batch.items.some((item) => item.status === 'queued' || item.status === 'uploading');

  if (batch.items.length === 0) return null;

  return (
    <section className="space-y-2">
      <div className="sticky top-0 z-10 rounded-md bg-gray-50/95 px-2 py-1.5 text-[11px] text-gray-600 backdrop-blur-sm dark:bg-odp-bgSofter/95 dark:text-odp-muted">
        <p className="truncate font-medium text-gray-700 dark:text-odp-fgStrong">
          {batch.label}
          {isActive ? (
            <span className="ml-1 font-normal text-blue-600 dark:text-blue-300">· 진행 중</span>
          ) : null}
        </p>
        <p className="truncate">
          {done}/{batch.items.length} 완료
          {errorCount > 0 ? ` · 실패 ${errorCount}` : ''}
          {skippedCount > 0 ? ` · 취소 ${skippedCount}` : ''}
        </p>
      </div>
      <ul className="space-y-2">
        {batch.items.map((item) => (
          <QueueRow
            key={item.id}
            batch={batch}
            item={item}
            onCancel={onCancel}
            onRemove={onRemove}
            onRequestDeleteVault={onRequestDeleteVault}
          />
        ))}
      </ul>
    </section>
  );
}

export default function FileUploadQueueFloatingPanel() {
  const {
    batches,
    panelOpen,
    summary,
    setPanelOpen,
    clearBatch,
    cancelItem,
    removeItem,
    deleteUploadedFile,
  } = useFileUploadQueue();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(() => loadFileUploadQueuePanelPosition());
  const [pendingVaultDelete, setPendingVaultDelete] = useState<PendingVaultDelete | null>(null);
  const [deletingVaultFile, setDeletingVaultFile] = useState(false);
  const anchoredRef = useRef(hasStoredFileUploadQueuePanelPosition());
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startLeftVw: 0,
    startTopVh: 0,
  });

  useLayoutEffect(() => {
    if (!panelOpen || anchoredRef.current) return;
    const anchor = document.querySelector('[data-file-upload-queue-trigger]');
    if (!(anchor instanceof HTMLElement)) return;
    const rect = anchor.getBoundingClientRect();
    const panelHeight = panelRef.current?.offsetHeight ?? 320;
    setPosition(resolveAnchoredFileUploadQueuePanelPosition(rect, panelHeight));
  }, [panelOpen, batches.length]);

  const startPositionDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;

      dragRef.current = {
        active: true,
        startX,
        startY,
        startLeftVw: position.leftVw,
        startTopVh: position.topVh,
      };

      const onMove = (ev: globalThis.PointerEvent) => {
        if (!dragRef.current.active) return;
        if (Math.hypot(ev.clientX - startX, ev.clientY - startY) <= DRAG_THRESHOLD_PX) return;
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;
        const dxVw = ((ev.clientX - dragRef.current.startX) / vw) * 100;
        const dyVh = ((ev.clientY - dragRef.current.startY) / vh) * 100;
        setPosition({
          leftVw: Math.min(92, Math.max(0, dragRef.current.startLeftVw + dxVw)),
          topVh: Math.min(90, Math.max(0, dragRef.current.startTopVh + dyVh)),
        });
      };

      const onUp = () => {
        if (!dragRef.current.active) return;
        dragRef.current.active = false;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        anchoredRef.current = true;
        setPosition((prev) => {
          saveFileUploadQueuePanelPosition(prev);
          return prev;
        });
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [position.leftVw, position.topVh],
  );

  const handleClose = () => {
    setPanelOpen(false);
    if (!summary.isActive) clearBatch();
  };

  const requestDeleteVault = useCallback(
    (itemId: string) => {
      for (const batch of batches) {
        const item = batch.items.find((entry) => entry.id === itemId);
        if (!item) continue;
        setPendingVaultDelete({
          itemId,
          name: item.name,
          fullPath: fileUploadQueueItemFullPath(batch, item),
        });
        return;
      }
    },
    [batches],
  );

  const confirmDeleteVault = useCallback(async () => {
    if (!pendingVaultDelete) return;
    setDeletingVaultFile(true);
    try {
      await deleteUploadedFile(pendingVaultDelete.itemId);
      setPendingVaultDelete(null);
    } finally {
      setDeletingVaultFile(false);
    }
  }, [deleteUploadedFile, pendingVaultDelete]);

  if (!panelOpen) return null;

  const isEmpty = batches.length === 0;

  return (
    <>
      <div
        ref={panelRef}
        className="fixed z-10050 w-[min(92vw,420px)] rounded-lg border border-blue-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-blue-900/50 dark:bg-odp-bgSoft/95"
        style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
        role="dialog"
        aria-modal="false"
        aria-label="업로드 대기열"
      >
      <div
        className="flex cursor-grab items-center justify-between gap-2 border-b border-blue-200/70 bg-blue-50/90 px-3 py-2 active:cursor-grabbing dark:border-blue-900/40 dark:bg-blue-950/40"
        onPointerDown={startPositionDrag}
      >
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-blue-900 dark:text-blue-100">
          <GripHorizontal size={16} className="shrink-0 opacity-60" aria-hidden />
          <IconUpload size={16} className="shrink-0" aria-hidden />
          <span className="truncate">업로드 대기열</span>
        </div>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={handleClose}
          className="rounded p-1 text-blue-800 hover:bg-blue-100 dark:text-blue-100 dark:hover:bg-blue-900/50"
          aria-label="닫기"
        >
          <X size={15} />
        </button>
      </div>

      <div className="border-b border-gray-200/80 px-3 py-2 text-[11px] text-gray-600 dark:border-odp-borderSoft dark:text-odp-muted">
        <p className="truncate">
          {isEmpty
            ? '진행 중인 업로드가 없습니다'
            : `전체 ${summary.done}/${summary.total} 완료${summary.errorCount > 0 ? ` · 실패 ${summary.errorCount}` : ''}${summary.skippedCount > 0 ? ` · 취소 ${summary.skippedCount}` : ''}${batches.length > 1 ? ` · ${batches.length}회 업로드` : ''}`}
        </p>
      </div>

      <div className="max-h-[min(60vh,480px)] space-y-4 overflow-y-auto p-3">
        {isEmpty ? (
          <p className="py-8 text-center text-xs text-gray-500 dark:text-odp-muted">
            사이드바 폴더에 파일을 드롭하거나
            <br />
            「파일 업로드」로 추가하세요.
          </p>
        ) : (
          batches.map((batch) => (
            <BatchSection
              key={batch.id}
              batch={batch}
              onCancel={cancelItem}
              onRemove={removeItem}
              onRequestDeleteVault={requestDeleteVault}
            />
          ))
        )}
      </div>

      <div className="flex justify-end border-t border-gray-200/80 px-3 py-2 dark:border-odp-borderSoft">
        <Button type="button" variant="secondary" size="sm" onClick={handleClose}>
          <IconCheck size={14} />
          닫기
        </Button>
      </div>
    </div>

      <ConfirmModal
        isOpen={pendingVaultDelete != null}
        title="업로드 파일 삭제"
        message={
          pendingVaultDelete
            ? `「${pendingVaultDelete.name}」을(를) 볼트에서 삭제할까요?`
            : undefined
        }
        variant="danger"
        confirmLabel="삭제"
        cancelLabel="취소"
        confirmDisabled={deletingVaultFile}
        onConfirm={() => void confirmDeleteVault()}
        onCancel={() => {
          if (deletingVaultFile) return;
          setPendingVaultDelete(null);
        }}
      >
        {pendingVaultDelete?.fullPath ? (
          <p
            className="break-all font-mono text-[11px] leading-snug text-gray-500 dark:text-odp-muted"
            title={pendingVaultDelete.fullPath}
          >
            {pendingVaultDelete.fullPath}
          </p>
        ) : null}
      </ConfirmModal>
    </>
  );
}
