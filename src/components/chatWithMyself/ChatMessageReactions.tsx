import { useState } from 'react';
import { Plus, SmilePlus } from 'lucide-react';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';
import { reactionKey } from '@/utils/chatWithMyself/reactions';
import ChatReactionGlyph from '@/components/chatWithMyself/ChatReactionGlyph';
import ChatReactionPicker from '@/components/chatWithMyself/ChatReactionPicker';

type ChatMessageReactionsProps = {
  reactions?: ChatReaction[] | null;
  onToggle: (reaction: ChatReaction) => void;
  /** Use dialog picker on coarse pointers. */
  coarse?: boolean;
  className?: string;
  disabled?: boolean;
  /** Controlled picker open state (optional). */
  pickerOpen?: boolean;
  onPickerOpenChange?: (open: boolean) => void;
};

const chipClass =
  'inline-flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-full border border-gray-300/80 bg-white/90 px-1.5 text-xs text-gray-700 shadow-sm transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-white/15 dark:bg-[#1a2333] dark:text-odp-fg dark:hover:border-sky-500/60 dark:hover:bg-sky-950/50';

const addChipClass =
  'inline-flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-gray-300/90 bg-white/70 text-gray-500 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-white/20 dark:bg-[#1a2333]/70 dark:text-gray-400 dark:hover:border-sky-500/60 dark:hover:text-sky-300';

const rowInnerClass = 'mt-1 flex max-w-full flex-wrap items-center gap-1';

/**
 * Discord-style reaction chips under a message bubble.
 */
export default function ChatMessageReactions({
  reactions,
  onToggle,
  coarse = false,
  className = '',
  disabled = false,
  pickerOpen: pickerOpenProp,
  onPickerOpenChange,
}: ChatMessageReactionsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const controlled = typeof pickerOpenProp === 'boolean';
  const pickerOpen = controlled ? Boolean(pickerOpenProp) : uncontrolledOpen;
  const setPickerOpen = (open: boolean) => {
    setUncontrolledOpen(open);
    onPickerOpenChange?.(open);
  };
  const list = Array.isArray(reactions) ? reactions : [];

  if (disabled && list.length === 0) return null;

  // Empty add-row: collapse height until hover/open so clustered messages
  // do not keep a blank reaction gap (animate open/close to avoid jumps).
  const emptyHoverOnly = list.length === 0 && !coarse;

  const addButton = (
    <button
      type="button"
      className={addChipClass}
      title="반응 추가"
      aria-label="반응 추가"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {list.length === 0 ? <SmilePlus size={14} /> : <Plus size={14} />}
    </button>
  );

  const chips = (
    <>
      {list.map((reaction) => (
        <button
          key={reactionKey(reaction)}
          type="button"
          className={chipClass}
          title={reaction.value}
          aria-label={`반응 제거: ${reaction.value}`}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onToggle(reaction);
          }}
        >
          <ChatReactionGlyph reaction={reaction} size={14} />
        </button>
      ))}
      {!disabled ? (
        <ChatReactionPicker
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          mode={coarse ? 'dialog' : 'popover'}
          side="top"
          align="start"
          onSelect={onToggle}
        >
          {addButton}
        </ChatReactionPicker>
      ) : null}
    </>
  );

  if (!emptyHoverOnly) {
    return (
      <div
        className={`${rowInnerClass} ${className}`.trim()}
        data-open={pickerOpen ? 'true' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {chips}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-rows-[0fr] opacity-0 pointer-events-none transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:pointer-events-auto focus-within:grid-rows-[1fr] focus-within:opacity-100 focus-within:pointer-events-auto data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto ${className}`.trim()}
      data-open={pickerOpen ? 'true' : undefined}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={rowInnerClass}>{chips}</div>
      </div>
    </div>
  );
}
