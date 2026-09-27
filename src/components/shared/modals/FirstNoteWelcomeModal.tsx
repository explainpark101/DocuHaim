import Modal from '@/components/shared/modals/Modal';
import Button from '@/components/Button';
import { IconFilePlus, IconX } from '@/components/icons';

type FirstNoteWelcomeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateNote: () => void;
};

/**
 * First-visit onboarding for IDB Haim (non-resizable).
 */
export default function FirstNoteWelcomeModal({
  isOpen,
  onClose,
  onCreateNote,
}: FirstNoteWelcomeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      resizable={false}
      contentClassName="max-w-md max-h-[90vh]"
    >
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-bold text-gray-800 dark:text-odp-fgStrong">
            IDB Haim으로 시작하기
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="inline-flex shrink-0 items-center justify-center rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-bgSoft"
          >
            <IconX size={16} />
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-odp-muted leading-relaxed">
          브라우저 IndexedDB에 노트를 바로 저장합니다. 첫 노트를 만들어 작성을 시작해 보세요.
          나중에 설정에서 로컬 폴더로 동기화하거나 S3/WebDAV로 바꿀 수 있습니다.
        </p>
        <div className="flex flex-wrap justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            나중에
          </Button>
          <Button type="button" variant="primary" onClick={onCreateNote}>
            <IconFilePlus size={14} />
            새 노트 만들기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
