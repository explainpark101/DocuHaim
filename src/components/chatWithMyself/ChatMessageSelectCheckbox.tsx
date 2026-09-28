import { Check } from 'lucide-react';
import { Checkbox } from 'radix-ui';

const BOX_CLASS =
  'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-sky-500/80 bg-white outline-none focus-visible:ring-2 focus-visible:ring-sky-400 data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600 dark:border-sky-400/70 dark:bg-odp-bgSoft dark:data-[state=checked]:border-sky-400 dark:data-[state=checked]:bg-sky-500';

export type ChatMessageSelectCheckboxProps = {
  checked: boolean;
  /** Visible when hovered / selected / selection mode. */
  visible: boolean;
  onToggle: () => void;
};

/**
 * Fine-pointer selection control on the left of a chat bubble.
 * Hit area is intentionally larger than the visible box.
 */
export default function ChatMessageSelectCheckbox({
  checked,
  visible,
  onToggle,
}: ChatMessageSelectCheckboxProps) {
  return (
    <button
      type="button"
      data-chat-msg-select-hit=""
      className={[
        'absolute inset-y-0 left-0 z-20 flex w-10 items-center justify-center',
        'transition-opacity duration-150',
        visible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        // Keep hittable while invisible so hover-reveal clicks work immediately.
        'pointer-events-auto',
      ].join(' ')}
      aria-label="메시지 선택"
      aria-checked={checked}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Checkbox.Root
        className={BOX_CLASS}
        checked={checked}
        tabIndex={-1}
        onCheckedChange={() => onToggle()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        aria-hidden
      >
        <Checkbox.Indicator className="text-white">
          <Check size={10} strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </button>
  );
}
