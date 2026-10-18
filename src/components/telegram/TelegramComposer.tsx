import { useEffect, useRef } from 'react';
import { Paperclip, SendHorizontal, X } from 'lucide-react';
import Button from '@/components/Button';
import { registerTelegramActions } from '@/utils/advancedSearch/telegramActions';
import type { TelegramReplyDraft } from '@/utils/telegram/types';

type TelegramComposerProps = {
  replyTo: TelegramReplyDraft | null;
  disabled: boolean;
  onClearReply: () => void;
  onSend: (text: string, file: File | null) => void;
};

export default function TelegramComposer({
  replyTo,
  disabled,
  onClearReply,
  onSend,
}: TelegramComposerProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return registerTelegramActions({
      'telegram-focus-composer': () => {
        inputRef.current?.focus();
      },
    });
  }, []);

  return (
    <form
      className="shrink-0 border-t border-gray-200 px-3 py-2 dark:border-odp-borderSoft"
      onSubmit={(event) => {
        event.preventDefault();
        const text = inputRef.current?.value || '';
        const file = fileRef.current?.files?.[0] ?? null;
        onSend(text, file);
        if (inputRef.current) inputRef.current.value = '';
        if (fileRef.current) fileRef.current.value = '';
      }}
    >
      {replyTo ? (
        <div className="mb-2 flex items-center justify-between gap-2 rounded bg-sky-50 px-2 py-1 text-xs text-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
          <span className="min-w-0 truncate">답장: {replyTo.snippet}</span>
          <button type="button" className="inline-flex items-center gap-1" aria-label="답장 취소" onClick={onClearReply}>
            <X size={14} />
            취소
          </button>
        </div>
      ) : null}
      <div className="flex items-end gap-2">
        <input ref={fileRef} type="file" className="hidden" />
        <Button
          type="button"
          variant="tertiary"
          aria-label="파일 첨부"
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
        >
          <Paperclip size={16} />
          첨부
        </Button>
        <textarea
          ref={inputRef}
          rows={2}
          disabled={disabled}
          placeholder="메시지"
          className="min-h-10 min-w-0 flex-1 resize-none rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <Button type="submit" variant="primary" aria-label="보내기" disabled={disabled}>
          <SendHorizontal size={16} />
          보내기
        </Button>
      </div>
    </form>
  );
}
