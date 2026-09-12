import { ConfirmModal } from '@/components/modals/ConfirmModal';

type Props = {
  open: boolean;
  onConfirmDiscard: () => void;
  onKeepEditing: () => void;
};

/**
 * Confirm discarding an unsaved page-number placement move.
 */
export default function PrintChromePlacementDiscardModal({
  open,
  onConfirmDiscard,
  onKeepEditing,
}: Props) {
  return (
    <ConfirmModal
      isOpen={open}
      title="변경사항 취소"
      message="저장하지 않은 쪽번호 위치 변경을 취소할까요?"
      confirmLabel="변경 취소"
      cancelLabel="계속 수정"
      variant="danger"
      onConfirm={onConfirmDiscard}
      onCancel={onKeepEditing}
      resizable={false}
    />
  );
}
