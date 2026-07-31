/**
 * Thin vertical drag handle for TOC / side panels.
 * Place on the inner edge of a right-side panel (left edge of the panel).
 */
export default function TocResizeHandle({
  handleProps = {},
  isResizing = false,
  className = '',
  label = 'Resize table of contents',
}) {
  return (
    <div
      {...handleProps}
      aria-label={label}
      title={label}
      className={[
        'toc-resize-handle absolute top-0 bottom-0 left-0 z-20 w-1.5 -translate-x-1/2 cursor-col-resize touch-none',
        'bg-transparent hover:bg-blue-400/35 dark:hover:bg-blue-400/35',
        isResizing ? 'bg-blue-400/45 dark:bg-blue-400/45' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
