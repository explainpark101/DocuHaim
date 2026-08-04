import { SELF_GROUP } from '@/utils/chatWithMyself';
import { groupColor, isSelfGroupName } from '@/utils/chatWithMyself/groupAvatar';

const sizeClass = {
  sm: 'h-5 w-5 text-[10px]',
  md: 'h-7 w-7 text-xs',
  lg: 'h-8 w-8 text-xs',
};

/**
 * Circular group avatar (hash color + first char, or yellow "나" for self).
 */
export default function ChatGroupAvatar({ name, size = 'md', className = '' }) {
  const label = name || SELF_GROUP;
  const self = isSelfGroupName(label);
  const dim = sizeClass[size] || sizeClass.md;

  if (self) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-yellow-400 font-bold text-gray-900 ${dim} ${className}`}
        aria-hidden
      >
        나
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${dim} ${className}`}
      style={{ background: groupColor(label) }}
      aria-hidden
    >
      {label.slice(0, 1)}
    </span>
  );
}
