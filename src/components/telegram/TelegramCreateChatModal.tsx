import { useState } from 'react';
import { Hash, Users } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconX } from '@/components/icons';
import type { TelegramCreateKind } from '@/utils/telegram/chats';

type TelegramCreateChatModalProps = {
  onClose: () => void;
  onCreate: (kind: TelegramCreateKind, title: string) => void;
};

export default function TelegramCreateChatModal({
  onClose,
  onCreate,
}: TelegramCreateChatModalProps) {
  const [kind, setKind] = useState<TelegramCreateKind>('group');
  const [title, setTitle] = useState('');

  return (
    <Modal isOpen onClose={onClose} contentClassName="max-w-md max-h-[90vh]">
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          onCreate(kind, title);
        }}
      >
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            그룹 또는 채널 만들기
          </h2>
        </header>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <div className="flex gap-2">
            <Button type="button" variant={kind === 'group' ? 'primary' : 'secondary'} onClick={() => setKind('group')}>
              <Users size={14} />
              그룹
            </Button>
            <Button type="button" variant={kind === 'channel' ? 'primary' : 'secondary'} onClick={() => setKind('channel')}>
              <Hash size={14} />
              채널
            </Button>
          </div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            이름
            <input
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            닫기
          </Button>
          <Button type="submit" variant="primary">
            {kind === 'group' ? <Users size={14} /> : <Hash size={14} />}
            만들기
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
