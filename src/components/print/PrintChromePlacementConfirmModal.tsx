import { ConfirmModal } from '@/components/modals/ConfirmModal';
import type { PrintChromePlacementDraft } from '@/components/print/PrintChromeLayer';

type Props = {
  draft: PrintChromePlacementDraft | null;
  onApplyAll: () => void;
  onApplyThisPage: () => void;
  onCancel: () => void;
};

/**
 * After dragging a page-number chrome item: apply to all pages or only this page.
 */
export default function PrintChromePlacementConfirmModal({
  draft,
  onApplyAll,
  onApplyThisPage,
  onCancel,
}: Props) {
  const isCover = draft?.pageKey === 'cover';
  return (
    <ConfirmModal
      isOpen={Boolean(draft)}
      title="쪽번호 위치 적용"
      message={
        isCover
          ? '옮긴 쪽번호 위치를 어디에 적용할까요?\n표지 전용으로 두거나, 모든 페이지 기본 위치로 저장할 수 있습니다.'
          : '옮긴 쪽번호 위치를 어디에 적용할까요?\n모든 페이지에 같게 두거나, 이 페이지만 다르게 둘 수 있습니다.'
      }
      confirmLabel="모든 페이지"
      discardLabel={isCover ? '표지만' : '이 페이지만'}
      cancelLabel="취소"
      onConfirm={onApplyAll}
      onDiscard={onApplyThisPage}
      onCancel={onCancel}
      resizable={false}
    />
  );
}
