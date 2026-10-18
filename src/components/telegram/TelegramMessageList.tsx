import { useRef, useState } from 'react';
import {
  AdaptiveContextMenu,
  AdaptiveMenuItem,
  AdaptiveMenuSeparator,
} from '@/components/contextMenu/AdaptiveContextMenu';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';
import type { TelegramMessageItem } from '@/utils/telegram/types';

const LONG_PRESS_MS = 500;

type TelegramMessageListProps = {
  messages: TelegramMessageItem[];
  loading: boolean;
  hasMore: boolean;
  isMobileLayout: boolean;
  onLoadOlder: () => void;
  onReply: (message: TelegramMessageItem) => void;
  onForward: (message: TelegramMessageItem) => void;
  onShare: (message: TelegramMessageItem) => void;
  onSaveToVault: (message: TelegramMessageItem) => void;
  onDownload: (message: TelegramMessageItem) => void;
};

function MessageRow({
  message,
  isMobileLayout,
  onReply,
  onForward,
  onShare,
  onSaveToVault,
  onDownload,
}: {
  message: TelegramMessageItem;
  isMobileLayout: boolean;
  onReply: (message: TelegramMessageItem) => void;
  onForward: (message: TelegramMessageItem) => void;
  onShare: (message: TelegramMessageItem) => void;
  onSaveToVault: (message: TelegramMessageItem) => void;
  onDownload: (message: TelegramMessageItem) => void;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originRef = useRef<{ x: number; y: number } | null>(null);
  const mobile = useMobileContextMenuMode(isMobileLayout);
  const [open, setOpen] = useState(false);
  const preview = (message.text || message.mediaName || '메시지').slice(0, 80);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <AdaptiveContextMenu
      title={preview}
      subtitle="Telegram 메시지"
      isMobileLayout={isMobileLayout}
      {...(mobile ? { open, onOpenChange: setOpen } : {})}
      contentClassName="z-100010 min-w-48 rounded-md border border-gray-200 bg-white p-1 text-sm shadow dark:border-odp-borderStrong dark:bg-odp-surface"
      trigger={
        <div
          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
            message.out
              ? 'ml-auto bg-sky-600 text-white'
              : 'bg-gray-100 text-gray-900 dark:bg-odp-bgSoft dark:text-odp-fg'
          }`}
          onPointerDown={(event) => {
            if (!mobile || event.pointerType === 'mouse') return;
            originRef.current = { x: event.clientX, y: event.clientY };
            clearTimer();
            timerRef.current = setTimeout(() => {
              vibrateLongPressAction();
              setOpen(true);
            }, LONG_PRESS_MS);
          }}
          onPointerUp={clearTimer}
          onPointerCancel={clearTimer}
          onPointerMove={(event) => {
            const origin = originRef.current;
            if (!origin) return;
            const dx = event.clientX - origin.x;
            const dy = event.clientY - origin.y;
            if (dx * dx + dy * dy > 64) clearTimer();
          }}
          onContextMenu={(event) => {
            if (mobile) event.preventDefault();
          }}
        >
          {message.senderLabel ? (
            <div className="mb-0.5 text-[11px] opacity-80">{message.senderLabel}</div>
          ) : null}
          {message.replyToId ? (
            <div className="mb-1 text-[11px] opacity-80">답장 #{message.replyToId}</div>
          ) : null}
          {message.text ? <p className="whitespace-pre-wrap break-words">{message.text}</p> : null}
          {message.hasMedia ? (
            <p className="mt-1 text-xs opacity-90">{message.mediaName || '파일'}</p>
          ) : null}
        </div>
      }
    >
      <AdaptiveMenuItem onSelect={() => onReply(message)}>답장</AdaptiveMenuItem>
      <AdaptiveMenuItem onSelect={() => onForward(message)}>다른 채팅으로 전달</AdaptiveMenuItem>
      <AdaptiveMenuSeparator />
      <AdaptiveMenuItem onSelect={() => onShare(message)}>나와의 채팅으로 공유</AdaptiveMenuItem>
      {message.hasMedia ? (
        <>
          <AdaptiveMenuItem onSelect={() => onSaveToVault(message)}>Vault Tree에 저장</AdaptiveMenuItem>
          <AdaptiveMenuItem onSelect={() => onDownload(message)}>기기에 다운로드</AdaptiveMenuItem>
        </>
      ) : null}
    </AdaptiveContextMenu>
  );
}

export default function TelegramMessageList({
  messages,
  loading,
  hasMore,
  isMobileLayout,
  onLoadOlder,
  onReply,
  onForward,
  onShare,
  onSaveToVault,
  onDownload,
}: TelegramMessageListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-3 py-3">
      {hasMore ? (
        <button
          type="button"
          className="self-center text-xs text-sky-700 dark:text-sky-300"
          onClick={onLoadOlder}
          disabled={loading}
        >
          {loading ? '불러오는 중…' : '이전 메시지'}
        </button>
      ) : null}
      {messages.length === 0 && !loading ? (
        <p className="py-8 text-center text-sm text-gray-500 dark:text-odp-muted">메시지가 없습니다.</p>
      ) : null}
      {messages.map((message) => (
        <MessageRow
          key={message.id}
          message={message}
          isMobileLayout={isMobileLayout}
          onReply={onReply}
          onForward={onForward}
          onShare={onShare}
          onSaveToVault={onSaveToVault}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
