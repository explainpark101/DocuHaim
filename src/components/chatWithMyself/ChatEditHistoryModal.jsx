import { useMemo } from 'react';
import { Dialog } from 'radix-ui';
import ChatLinkedText from '@/components/chatWithMyself/ChatLinkedText';
import {
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  detectTimeZone,
  formatMessageTime,
  SELF_GROUP,
} from '@/utils/chatWithMyself';

function formatHistoryWhen(iso, timeZone) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(iso));
  } catch {
    return formatMessageTime(iso, timeZone) || iso;
  }
}

/**
 * Modal listing previous versions of an edited chat message (newest first).
 */
export default function ChatEditHistoryModal({
  open,
  message,
  onOpenChange,
  timeZone,
  getPresignedUrl,
}) {
  const tz = timeZone || detectTimeZone();
  const entries = useMemo(() => {
    const list = Array.isArray(message?.editHistory) ? message.editHistory : [];
    return [...list].reverse();
  }, [message?.editHistory]);

  return (
    <Dialog.Root
      open={Boolean(open && message)}
      onOpenChange={(next) => onOpenChange?.(next)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[201] flex max-h-[min(80vh,640px)] w-[min(92vw,480px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          aria-describedby={undefined}
        >
          <div className="shrink-0 border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
              수정 기록
            </Dialog.Title>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
              {entries.length > 0
                ? `이전 버전 ${entries.length}개 (최신순)`
                : '저장된 이전 버전이 없습니다'}
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
            {message?.editedAt ? (
              <div className="mb-3 rounded-xl border border-sky-200/80 bg-sky-50/80 p-3 dark:border-sky-800/50 dark:bg-sky-950/40">
                <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-sky-700 dark:text-sky-300">현재</span>
                  <span>{formatHistoryWhen(message.editedAt, tz)}</span>
                  <span className="text-gray-400">·</span>
                  <span>{message.group || SELF_GROUP}</span>
                </div>
                <ChatLinkedText
                  text={message.body || ''}
                  className="whitespace-pre-wrap wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong"
                  getPresignedUrl={getPresignedUrl}
                />
              </div>
            ) : null}

            {entries.length === 0 ? (
              <p className="py-6 text-center text-xs text-gray-400 dark:text-odp-muted">
                이 메시지에 쌓인 수정 기록이 없습니다.
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {entries.map((entry, i) => (
                  <li
                    key={`${entry.at}-${i}`}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-odp-borderSoft dark:bg-odp-surface"
                  >
                    <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                      <span className="font-semibold text-gray-700 dark:text-odp-fg">
                        이전 #{entries.length - i}
                      </span>
                      <span>{formatHistoryWhen(entry.at, tz)}</span>
                      <span className="text-gray-400">·</span>
                      <span>{entry.group || SELF_GROUP}</span>
                    </div>
                    <ChatLinkedText
                      text={entry.body || ''}
                      className="whitespace-pre-wrap wrap-break-word text-sm text-gray-800 dark:text-odp-fgStrong"
                      getPresignedUrl={getPresignedUrl}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex shrink-0 justify-end border-t border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-odp-surface dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
              >
                닫기
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
