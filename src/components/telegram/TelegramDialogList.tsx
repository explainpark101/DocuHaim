import { Hash, Users } from 'lucide-react';
import type { TelegramDialogItem } from '@/utils/telegram/types';

type TelegramDialogListProps = {
  dialogs: TelegramDialogItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function TelegramDialogList({
  dialogs,
  activeId,
  onSelect,
}: TelegramDialogListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {dialogs.length === 0 ? (
        <p className="px-3 py-6 text-sm text-gray-500 dark:text-odp-muted">대화가 없습니다.</p>
      ) : (
        dialogs.map((dialog) => {
          const active = dialog.id === activeId;
          return (
            <button
              key={dialog.id}
              type="button"
              onClick={() => onSelect(dialog.id)}
              className={`flex w-full items-start gap-2 px-3 py-2.5 text-left ${
                active
                  ? 'bg-sky-50 dark:bg-sky-950/40'
                  : 'hover:bg-gray-100 dark:hover:bg-odp-focusBg'
              }`}
            >
              <span className="mt-0.5 text-sky-700 dark:text-sky-300">
                {dialog.isChannel ? <Hash size={14} /> : dialog.isGroup ? <Users size={14} /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-gray-900 dark:text-odp-fgStrong">
                    {dialog.title}
                  </span>
                  {dialog.unread > 0 ? (
                    <span className="rounded-full bg-sky-600 px-1.5 text-[10px] text-white">
                      {dialog.unread}
                    </span>
                  ) : null}
                </span>
                <span className="block truncate text-xs text-gray-500 dark:text-odp-muted">
                  {dialog.preview || ' '}
                </span>
              </span>
            </button>
          );
        })
      )}
    </div>
  );
}
