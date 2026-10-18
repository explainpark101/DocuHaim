import { Forward } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconX } from '@/components/icons';
import type { TelegramDialogItem } from '@/utils/telegram/types';

type TelegramForwardModalProps = {
  dialogs: TelegramDialogItem[];
  onClose: () => void;
  onPick: (dialogId: string) => void;
};

export default function TelegramForwardModal({
  dialogs,
  onClose,
  onPick,
}: TelegramForwardModalProps) {
  return (
    <Modal isOpen onClose={onClose} contentClassName="max-w-md max-h-[90vh]">
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">전달</h2>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
          {dialogs.map((dialog) => (
            <button
              key={dialog.id}
              type="button"
              className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-odp-focusBg"
              onClick={() => onPick(dialog.id)}
            >
              <Forward size={14} />
              <span className="truncate">{dialog.title}</span>
            </button>
          ))}
        </div>
        <footer className="flex shrink-0 justify-end border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            닫기
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
