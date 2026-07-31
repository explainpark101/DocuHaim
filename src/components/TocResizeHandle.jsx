/**
 * Thin vertical drag handle for TOC / side panels.
 * Place on the inner edge of a right-side panel (left edge of the panel).
 * Kept inside the panel bounds so overflow:hidden ancestors do not clip it.
 */
export default function TocResizeHandle({
  handleProps = {},
  isResizing = false,
  className = '',
  label = 'Resize table of contents',
  style,
}) {
  return (
    <div
      {...handleProps}
      aria-label={label}
      title={label}
      style={style}
      className={[
        'toc-resize-handle absolute top-0 bottom-0 left-0 z-20 w-1.5 cursor-col-resize touch-none',
        'bg-slate-300/55 hover:bg-blue-400/70 dark:bg-slate-500/55 dark:hover:bg-blue-400/55',
        isResizing ? 'bg-blue-400/80 dark:bg-blue-400/65' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
