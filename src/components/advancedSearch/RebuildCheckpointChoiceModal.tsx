import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import type { RebuildCheckpointInfo } from '@/utils/advancedSearch/engine';

type Props = {
  isOpen: boolean;
  info: RebuildCheckpointInfo | null;
  onResume: () => void;
  onStartFresh: () => void;
  onCancel: () => void;
};

/**
 * Ask whether to resume an interrupted Advanced Search rebuild or start over.
 */
export default function RebuildCheckpointChoiceModal({
  isOpen,
  info,
  onResume,
  onStartFresh,
  onCancel,
}: Props) {
  const fileCount = info?.processedFileCount ?? 0;
  const chatCount = info?.processedChatCount ?? 0;
  const total = fileCount + chatCount;
  const updated =
    info?.updatedAt && info.updatedAt > 0
      ? new Date(info.updatedAt).toLocaleString()
      : null;

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="중지된 색인 체크포인트"
      message={
        total > 0
          ? `이전에 중지·중단된 색인이 있습니다.\n처리됨: 파일 ${fileCount} · 채팅 day ${chatCount}${
              updated ? `\n저장 시각: ${updated}` : ''
            }\n\n이어서 진행할까요, 아니면 처음부터 다시 만들까요?`
          : '이전에 중지·중단된 색인 체크포인트가 있습니다.\n이어서 진행할까요, 아니면 처음부터 다시 만들까요?'
      }
      confirmLabel="이어서 색인"
      discardLabel="처음부터"
      cancelLabel="취소"
      onConfirm={onResume}
      onDiscard={onStartFresh}
      onCancel={onCancel}
    />
  );
}
