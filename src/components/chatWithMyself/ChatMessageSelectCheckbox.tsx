import { Check } from 'lucide-react';

const BOX_CLASS =
  'flex h-4 w-4 shrink-0 items-center justify-center rounded border border-sky-500/80 bg-white dark:border-sky-400/70 dark:bg-odp-bgSoft';

const BOX_CHECKED_CLASS =
  'border-sky-600 bg-sky-600 dark:border-sky-400 dark:bg-sky-500';

export type ChatMessageSelectCheckboxProps = {
  checked: boolean;
  /** Visible when hovered / selected / selection mode. */
  visible: boolean;
  onToggle: () => void;
};

/**
 * Fine-pointer selection control on the left of a chat bubble.
 * Hit area is intentionally larger than the visible box.
 *
 * Single outer button owns the toggle — no nested checkbox control, so
 * click cannot fire selection twice.
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
      aria-pressed={checked}
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
      <span
        className={`${BOX_CLASS} ${checked ? BOX_CHECKED_CLASS : ''}`}
        aria-hidden
      >
        {checked ? (
          <Check size={10} strokeWidth={3} className="text-white" />
        ) : null}
      </span>
    </button>
  );
}
