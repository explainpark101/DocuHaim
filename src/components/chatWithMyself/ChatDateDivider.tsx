/**
 * Date separator: horizontal rule with a centered date bubble on top.
 * Inline (non-sticky) for virtualized lists; sticky only when not under a
 * transformed / overflow-x ancestor.
 */
export default function ChatDateDivider({
  id,
  label,
  className = '',

  /** Background behind the sticky strip (matches chat/search canvas). */
  surfaceClassName = 'bg-[#b9cfe0] dark:bg-[#0b1220]',

  /** Pill sitting on the hr. */
  bubbleClassName = 'bg-[#a8bfd4] text-gray-700 dark:bg-[#152033] dark:text-gray-300',

  /** Sticky offset from the top of the scrollport (e.g. under a sticky search bar). */
  stickyTop = 0,

  /** When false, render as a normal in-flow divider (virtualized lists). */
  sticky = true
}: any) {
  const top =
    typeof stickyTop === 'number' ? `${stickyTop}px` : stickyTop || '0px';
  const positionClass = sticky
    ? 'sticky top-0 z-20'
    : 'relative z-10';
  return (
    <div
      id={id}
      style={sticky ? { top } : undefined}
      className={`${positionClass} w-full flex items-center px-3 py-2 ${surfaceClassName} ${className}`}
    >
      <div className="relative flex w-full items-center justify-center">
        <hr
          aria-hidden
          className="absolute inset-x-0 top-1/2 m-0 w-full border-0 border-t border-gray-600/25 dark:border-white/15"
        />
        <span
          className={`relative z-[1] select-none rounded-full px-3 py-0.5 text-[11px] tracking-wide shadow-sm ${bubbleClassName}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
