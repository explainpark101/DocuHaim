import { useEffect, useRef, useState } from 'react';
import { MessageSquare, TextCursorInput } from 'lucide-react';
import { ToggleGroup, Tooltip } from 'radix-ui';
import type { LlmAssistUiMode } from '@/utils/llm/llmAssistUiMode';

type LlmAssistUiModeToggleProps = {
  value: LlmAssistUiMode;
  onChange: (next: LlmAssistUiMode) => void;
  className?: string;
  /** Force icon-only; otherwise auto-compacts when the header is tight. */
  compact?: boolean;
};

const ITEM_CLASS =
  'relative inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium outline-none transition-colors ' +
  'text-violet-700/80 hover:text-violet-950 focus-visible:ring-2 focus-visible:ring-violet-400 ' +
  'data-[state=on]:bg-white data-[state=on]:text-violet-950 data-[state=on]:shadow-sm ' +
  'dark:text-violet-200/85 dark:hover:text-violet-50 dark:focus-visible:ring-violet-500 ' +
  'dark:data-[state=on]:bg-violet-900/80 dark:data-[state=on]:text-violet-50';

const ITEM_COMPACT_CLASS =
  'relative inline-flex size-7 items-center justify-center rounded-full outline-none transition-colors ' +
  'text-violet-700/80 hover:text-violet-950 focus-visible:ring-2 focus-visible:ring-violet-400 ' +
  'data-[state=on]:bg-white data-[state=on]:text-violet-950 data-[state=on]:shadow-sm ' +
  'dark:text-violet-200/85 dark:hover:text-violet-50 dark:focus-visible:ring-violet-500 ' +
  'dark:data-[state=on]:bg-violet-900/80 dark:data-[state=on]:text-violet-50';

const TOOLTIP_CLASS =
  'z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50';

const COMPACT_WIDTH_PX = 168;

/**
 * Pill radio toggle between edit (transform) and chat UI modes.
 * Shrinks to icon-only when horizontal space is tight.
 */
export default function LlmAssistUiModeToggle({
  value,
  onChange,
  className = '',
  compact: compactProp,
}: LlmAssistUiModeToggleProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [autoCompact, setAutoCompact] = useState(false);
  const compact = compactProp ?? autoCompact;

  useEffect(() => {
    if (compactProp != null) return undefined;
    const el = rootRef.current?.parentElement;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const update = (width: number) => {
      setAutoCompact(width > 0 && width < COMPACT_WIDTH_PX + 220);
    };
    update(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width =
        entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
      update(width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [compactProp]);

  return (
    <div ref={rootRef} className="inline-flex shrink-0">
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
        {compact ? (
          <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleGroup.Item value="edit" className={ITEM_COMPACT_CLASS} aria-label="편집">
                  <TextCursorInput size={13} aria-hidden />
                </ToggleGroup.Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CLASS}>
                  편집
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <ToggleGroup.Item value="chat" className={ITEM_COMPACT_CLASS} aria-label="채팅">
                  <MessageSquare size={13} aria-hidden />
                </ToggleGroup.Item>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CLASS}>
                  채팅
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        ) : (
          <>
            <ToggleGroup.Item value="edit" className={ITEM_CLASS} aria-label="편집">
              <TextCursorInput size={12} aria-hidden />
              편집
            </ToggleGroup.Item>
            <ToggleGroup.Item value="chat" className={ITEM_CLASS} aria-label="채팅">
              <MessageSquare size={12} aria-hidden />
              채팅
            </ToggleGroup.Item>
          </>
        )}
      </ToggleGroup.Root>
    </div>
  );
}
