import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { IconBack, IconTrash } from '@/components/icons';
import Modal from '@/components/modals/Modal';

const CLOSE_ANIMATION_MS = 200;

/**
 * Normalize deleteTarget shapes:
 * - { node, type }
 * - { targets: [{ node, type }, ...] }
 * @param {unknown} target
 * @returns {Array<{ node: { path?: string, name?: string, type?: string }, type: string }>}
 */
export function normalizeDeleteTargets(target) {
  if (!target) return [];
  if (Array.isArray(target.targets) && target.targets.length) {
    return target.targets.filter((t) => t?.node && t?.type);
  }
  if (target.node && target.type) return [target];
  return [];
}

export function DeleteConfirmModal({
  target,
  associatedRecordings = [],
  onCancel,
  onConfirm,
  isProcessing = false,
}) {
  const [displayTarget, setDisplayTarget] = useState(null);
  const [deleteWithRecordings, setDeleteWithRecordings] = useState(true);

  useEffect(() => {
    if (target) {
      setDisplayTarget(target);
      setDeleteWithRecordings(true);
    } else if (displayTarget) {
      const t = setTimeout(() => setDisplayTarget(null), CLOSE_ANIMATION_MS);
      return () => clearTimeout(t);
    }
  }, [target, displayTarget]);

  if (!target && !displayTarget) return null;

  const data = target || displayTarget;
  const targets = normalizeDeleteTargets(data);
  if (!targets.length) return null;

  const isMulti = targets.length > 1;
  const primary = targets[0];
  const isInTrash = targets.every((t) => t.node.path?.startsWith('.trash/'));
  const isTrashRoot = !isMulti && primary.node.path === '.trash/';
  const hasFolder = targets.some((t) => t.node.type === 'folder');
  const hasRecordings = associatedRecordings.length > 0;

  const handleConfirm = () => {
    onConfirm(hasRecordings ? { deleteWithRecordings } : {});
  };

  const nameListPreview = () => {
    const names = targets.map((t) => t.node.name).filter(Boolean);
    if (names.length <= 3) return names.join(', ');
    return `${names.slice(0, 3).join(', ')} 외 ${names.length - 3}개`;
  };

  return (
    <Modal
      isOpen={!!target}
      onClose={isProcessing ? undefined : onCancel}
      onConfirm={isProcessing || !target ? undefined : handleConfirm}
      ignoreEnterInFields
    >      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2 flex items-center gap-2">
          <IconTrash />{' '}
          {isTrashRoot
            ? '쓰레기통 비우기'
            : isInTrash
              ? '영구 삭제 확인'
              : isMulti
                ? '일괄 삭제 확인'
                : '삭제 확인'}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {isTrashRoot ? (
            <>
              <span className="font-semibold text-red-600">쓰레기통</span>의 항목을 모두
              비우시겠습니까?
              <br />
              실제 파일은 삭제되지 않으며, 안전 확인용 동작입니다.
            </>
          ) : isMulti ? (
            <>
              선택한{' '}
              <span className="font-semibold text-red-600">{targets.length}개</span> 항목
              ({nameListPreview()})을{' '}
              {isInTrash ? '영구적으로 삭제합니다.' : '쓰레기통으로 이동합니다.'}
              <br />
              {hasFolder &&
                (isInTrash
                  ? '폴더 내의 모든 파일이 함께 삭제됩니다. '
                  : '폴더 내의 모든 파일이 함께 이동됩니다. ')}
              {isInTrash
                ? '이 작업은 되돌릴 수 없습니다.'
                : '쓰레기통에서 다시 삭제하면 영구적으로 삭제됩니다.'}
            </>
          ) : (
            <>
              <span className="font-semibold text-red-600">{primary.node.name}</span>{' '}
              {isInTrash ? '항목을 영구적으로 삭제합니다.' : '항목을 쓰레기통으로 이동합니다.'}
              <br />
              {primary.node.type === 'folder' &&
                (isInTrash
                  ? '해당 폴더 내의 모든 파일이 함께 삭제됩니다. '
                  : '해당 폴더 내의 모든 파일이 함께 이동됩니다. ')}
              {isInTrash
                ? '이 작업은 되돌릴 수 없습니다.'
                : '쓰레기통에서 다시 삭제하면 영구적으로 삭제됩니다.'}
            </>
          )}
        </p>
        {hasRecordings && !isTrashRoot && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={deleteWithRecordings}
                onChange={(e) => setDeleteWithRecordings(e.target.checked)}
                className="mt-1 rounded border-amber-300"
              />
              <span className="text-sm text-amber-800 dark:text-amber-200">
                선택한 파일과 연관된 녹음 {associatedRecordings.length}개도 함께{' '}
                {isInTrash ? '영구 삭제' : '쓰레기통으로 이동'}합니다.
              </span>
            </label>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={isProcessing ? undefined : onCancel}
            disabled={isProcessing}
          >
            <IconBack size={16} />
            취소
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={isProcessing ? undefined : handleConfirm}
            disabled={isProcessing || !target}
            className={isProcessing ? 'cursor-wait' : ''}
          >
            {isProcessing ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <IconTrash size={16} />
            )}
            {isTrashRoot
              ? isProcessing
                ? '비우는 중...'
                : '비우기'
              : isProcessing
                ? '삭제 중...'
                : isMulti
                  ? `${targets.length}개 삭제`
                  : '삭제'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
