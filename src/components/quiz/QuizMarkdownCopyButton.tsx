import { ClipboardCopy } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { copyText } from '@/utils/shared/copyText';

const TOOLTIP_CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

type QuizMarkdownCopyButtonProps = {
  text: string | null | undefined;
  label: string;
  disabled?: boolean;
  className?: string;
};

export default function QuizMarkdownCopyButton({
  text,
  label,
  disabled = false,
  className = '',
}: QuizMarkdownCopyButtonProps) {
  const value = String(text || '').trim();
  const canCopy = value.length > 0;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          disabled={disabled || !canCopy}
          aria-label={`${label} Markdown 복사`}
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-muted dark:hover:bg-odp-bgSoft ${className}`.trim()}
          onClick={() => {
            void copyText(value, { message: `${label} 복사됨` });
          }}
        >
          <ClipboardCopy size={14} aria-hidden />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CONTENT_CLASS}>
          {label} Markdown 복사
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
