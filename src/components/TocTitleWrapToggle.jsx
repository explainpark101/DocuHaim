/**
 * Compact switch for TOC title wrap mode (ellipsis vs word-break).
 */
export default function TocTitleWrapToggle({
  checked = false,
  onChange,
  isDark = false,
  className = '',
}) {
  return (
    <label
      className={`inline-flex items-center gap-1.5 shrink-0 cursor-pointer select-none ${className}`}
      title={checked ? '제목 줄바꿈 켜짐' : '제목 말줄임(...)'}
    >
      <span
        className={`text-[10px] font-medium leading-none ${
          isDark ? 'text-odp-muted' : 'text-gray-500'
        }`}
      >
        목차제목 줄바꿈
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label="목차 제목 줄바꿈"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange?.(!checked);
        }}
        className={[
          'relative h-4 w-7 rounded-full transition-colors touch-manipulation',
          checked
            ? 'bg-blue-600 dark:bg-blue-500'
            : isDark
              ? 'bg-odp-borderStrong'
              : 'bg-gray-300',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-3' : 'translate-x-0',
          ].join(' ')}
          aria-hidden
        />
      </button>
    </label>
  );
}
