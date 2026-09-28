import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { EmojiMartEmoji } from '@emoji-mart/react';
import { Popover, Tooltip } from 'radix-ui';
import { Smile, X } from 'lucide-react';
import { useDocumentTheme } from '@/hooks/useDocumentTheme';
import { ensureChatDefaultFrequentEmojis } from '@/utils/chatWithMyself/emojiFrequent';

ensureChatDefaultFrequentEmojis();

type KanbanColumnIconPickerProps = {
  icon: string | null;
  onChange: (icon: string | null) => void;
};

/**
 * Column header emoji control (emoji-mart). Shows the chosen glyph before the
 * title, or a smile placeholder when empty.
 */
export default function KanbanColumnIconPicker({
  icon,
  onChange,
}: KanbanColumnIconPickerProps) {
  const [open, setOpen] = useState(false);
  const theme = useDocumentTheme();
  const emojiTheme = theme === 'dark' ? 'dark' : 'light';
  const label = icon ? '열 아이콘 변경' : '열 아이콘 추가';

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Popover.Trigger asChild>
              <button
                type="button"
                aria-label={label}
                data-kanban-no-pan=""
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-base leading-none text-gray-500 hover:bg-gray-200/80 dark:hover:bg-odp-focusBg"
              >
                {icon ? (
                  <span aria-hidden className="select-none">
                    {icon}
                  </span>
                ) : (
                  <Smile size={14} aria-hidden />
                )}
              </button>
            </Popover.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
            >
              {label}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={6}
            className="z-100010 w-[min(92vw,352px)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {open ? (
              <div className="emoji-mart-host w-full overflow-hidden [&_em-emoji-picker]:!w-full [&_em-emoji-picker]:!max-w-none [&_em-emoji-picker]:!border-0 [&_em-emoji-picker]:!shadow-none">
                <Picker
                  data={data}
                  theme={emojiTheme}
                  locale="ko"
                  previewPosition="none"
                  skinTonePosition="search"
                  searchPosition="sticky"
                  navPosition="bottom"
                  dynamicWidth
                  emojiSize={22}
                  emojiButtonSize={34}
                  maxFrequentRows={2}
                  autoFocus={false}
                  onEmojiSelect={(emoji: EmojiMartEmoji) => {
                    const native = String(emoji?.native || '').trim();
                    if (!native) return;
                    onChange(native);
                    setOpen(false);
                  }}
                />
              </div>
            ) : null}
            {icon ? (
              <div className="border-t border-gray-100 p-2 dark:border-odp-borderSoft">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg"
                  onClick={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  <X size={12} aria-hidden />
                  아이콘 지우기
                </button>
              </div>
            ) : null}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Tooltip.Provider>
  );
}
