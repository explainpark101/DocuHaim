import { useEffect, useState } from 'react';
import { Dialog } from 'radix-ui';
import { X } from 'lucide-react';
import ChatMessageBody from '@/components/chatWithMyself/ChatMessageBody';
import ChatOgCard from '@/components/chatWithMyself/ChatOgCard';
import {
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  extractUrls,
  formatMessageTime,
  detectTimeZone,
  SELF_GROUP,
  isSelfGroup,
} from '@/utils/chatWithMyself';

type ChatMessageSelectCopyModalProps = {
  open?: boolean;
  message?: {
    id?: string;
    body?: string;
    group?: string;
    at?: string;
    markdown?: unknown;
  } | null;
  onOpenChange?: (open: boolean) => void;
  ogStorage?: object | null;
  timeZone?: string;
  groupLabel?: string;
  getPresignedUrl?: (path: string) => Promise<string | null>;
  noteExists?: (path: string) => boolean;
  onOpenNote?: (path: string, message?: unknown) => void;
};

/**
 * Modal that shows a message bubble with native OS text selection / context menu.
 * (List bubbles intercept selection via Radix ContextMenu + select-none.)
 */
export default function ChatMessageSelectCopyModal({
  open = false,
  message = null,
  onOpenChange,
  ogStorage = null,
  timeZone,
  groupLabel,
  getPresignedUrl,
  noteExists,
  onOpenNote,
}: ChatMessageSelectCopyModalProps) {
  const isOpen = Boolean(open && message);
  const [urls, setUrls] = useState<string[]>([]);
  const tz = timeZone || detectTimeZone();
  const self = isSelfGroup(message?.group);
  const displayName = groupLabel || message?.group || SELF_GROUP;
  const time = message?.at ? formatMessageTime(message.at, tz) : '';

  useEffect(() => {
    if (!isOpen || !message) {
      setUrls([]);
      return;
    }
    setUrls(extractUrls(message.body || ''));
  }, [isOpen, message]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(next) => onOpenChange?.(next)}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[201] flex max-h-[min(84vh,720px)] w-[min(94vw,440px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex shrink-0 items-start justify-between gap-2 border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <div className="min-w-0">
              <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                내용 선택 복사
              </Dialog.Title>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-odp-muted">
                드래그로 선택 · 오른쪽 클릭은 OS 메뉴
              </p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <div
              className={`flex w-full ${self ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[min(100%,22rem)] min-w-0 overflow-hidden px-3 py-2 text-sm shadow-sm select-text [-webkit-touch-callout:default] ${
                  self
                    ? 'rounded-[1rem_1rem_0.375rem_1rem] bg-sky-100 text-gray-900 border border-sky-200/80 dark:bg-[#1a2740] dark:text-odp-fgStrong dark:border-sky-800/50'
                    : 'rounded-[1rem_1rem_1rem_0.375rem] bg-white text-gray-900 border border-gray-200 dark:bg-[#243044] dark:text-odp-fgStrong dark:border-white/10'
                }`}
              >
                {!self ? (
                  <div className="mb-1 truncate text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                    {displayName}
                  </div>
                ) : null}
                <ChatMessageBody
                  message={message}
                  text={message?.body || ''}
                  className="min-w-0 max-w-full wrap-anywhere select-text"
                  getPresignedUrl={getPresignedUrl}
                  noteExists={noteExists}
                  onOpenViewPath={
                    onOpenNote && message
                      ? (path) => onOpenNote(path, message)
                      : undefined
                  }
                />
                {urls.map((u) =>
                  ogStorage ? (
                    <ChatOgCard
                      key={u}
                      url={u}
                      ogStorage={ogStorage}
                      allowEmbed={false}
                    />
                  ) : (
                    <ChatOgCard key={u} url={u} allowEmbed={false} />
                  ),
                )}
                {time ? (
                  <div className="mt-1 text-right text-[10px] text-gray-400">
                    {time}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
