import { MessageSquare, TextCursorInput } from 'lucide-react';
import { ToggleGroup } from 'radix-ui';
import type { LlmAssistUiMode } from '@/utils/llm/llmAssistUiMode';

type LlmAssistUiModeToggleProps = {
  value: LlmAssistUiMode;
  onChange: (next: LlmAssistUiMode) => void;
  className?: string;
};

const ITEM_CLASS =
  'relative inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium outline-none transition-colors ' +
  'text-violet-700/80 hover:text-violet-950 focus-visible:ring-2 focus-visible:ring-violet-400 ' +
  'data-[state=on]:bg-white data-[state=on]:text-violet-950 data-[state=on]:shadow-sm ' +
  'dark:text-violet-200/85 dark:hover:text-violet-50 dark:focus-visible:ring-violet-500 ' +
  'dark:data-[state=on]:bg-violet-900/80 dark:data-[state=on]:text-violet-50';

/**
 * Pill radio toggle between edit (transform) and chat UI modes.
 */
export default function LlmAssistUiModeToggle({
  value,
  onChange,
  className = '',
}: LlmAssistUiModeToggleProps) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next === 'edit' || next === 'chat') onChange(next);
      }}
      aria-label="AI 도우미 모드"
      className={`inline-flex shrink-0 items-center rounded-full bg-violet-200/70 p-0.5 dark:bg-violet-950/70 ${className}`}
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <ToggleGroup.Item value="edit" className={ITEM_CLASS} aria-label="편집">
        <TextCursorInput size={12} aria-hidden />
        편집
      </ToggleGroup.Item>
      <ToggleGroup.Item value="chat" className={ITEM_CLASS} aria-label="채팅">
        <MessageSquare size={12} aria-hidden />
        채팅
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
