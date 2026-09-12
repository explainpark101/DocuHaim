import { ConfirmModal } from '@/components/modals/ConfirmModal';
import type { PrintChromePlacementDraft } from '@/components/print/PrintChromeLayer';
import { formatPrintChromePlacementDelta } from '@/utils/printChrome/placementMetrics';

type Props = {
  open: boolean;
  draft: PrintChromePlacementDraft | null;
  onApplyAll: () => void;
  onApplyThisPage: () => void;
  onCancel: () => void;
};

/**
 * After the bottom-bar confirm: apply to all pages or only this page.
 */
export default function PrintChromePlacementConfirmModal({
  open,
  draft,
  onApplyAll,
  onApplyThisPage,
  onCancel,
}: Props) {
  const isCover = draft?.pageKey === 'cover';
  const pageSize =
    draft?.pageWidthPx != null && draft.pageHeightPx != null
      ? { widthPx: draft.pageWidthPx, heightPx: draft.pageHeightPx }
      : null;
  const delta =
    draft != null
      ? formatPrintChromePlacementDelta(draft.origin, draft.placement, pageSize)
      : null;

  return (
    <ConfirmModal
      isOpen={open && Boolean(draft)}
      title="쪽번호 위치 적용"
      message={
        [
          delta ? `${delta.label}\n(${delta.absoluteLabel})` : null,
          isCover
            ? '옮긴 쪽번호 위치를 어디에 적용할까요?\n표지 전용으로 두거나, 모든 페이지 기본 위치로 저장할 수 있습니다.'
            : '옮긴 쪽번호 위치를 어디에 적용할까요?\n모든 페이지에 같게 두거나, 이 페이지만 다르게 둘 수 있습니다.',
        ]
          .filter(Boolean)
          .join('\n\n')
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
