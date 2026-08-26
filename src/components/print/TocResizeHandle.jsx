/**
 * Thin vertical drag handle for TOC / side panels.
 * Place on the inner edge of the panel (left edge of a right panel, right edge of a left panel).
 * Kept inside the panel bounds so overflow:hidden ancestors do not clip it.
 *
 * @param {'left'|'right'} [edge='left'] Which edge of the panel the handle sits on.
 * @param {boolean} [visibleOnHover=false] When true, handle color shows only on hover for fine pointers;
 *   coarse/touch pointers keep a subtle always-visible cue (and while resizing).
 */
export default function TocResizeHandle({
  handleProps = {},
  isResizing = false,
  className = '',
  label = 'Resize table of contents',
  edge = 'left',
  visibleOnHover = false,
  style,
}) {
  const edgeClass = edge === 'right' ? 'right-0' : 'left-0';
  const toneClass = visibleOnHover
    ? isResizing
      ? 'bg-blue-400/80 dark:bg-blue-400/65'
      : [
          // Touch / coarse pointers: keep a visible cue (no hover).
          'bg-slate-300/55 dark:bg-slate-500/55',
          // Fine pointer + hover: transparent until hover.
          '[@media(hover:hover)_and_(pointer:fine)]:bg-transparent',
          '[@media(hover:hover)_and_(pointer:fine)]:dark:bg-transparent',
          'hover:bg-blue-400/70 dark:hover:bg-blue-400/55',
        ].join(' ')
    : [
        'bg-slate-300/55 hover:bg-blue-400/70 dark:bg-slate-500/55 dark:hover:bg-blue-400/55',
        isResizing ? 'bg-blue-400/80 dark:bg-blue-400/65' : '',
      ]
        .filter(Boolean)
        .join(' ');

  return (
    <div
      {...handleProps}
      aria-label={label}
      title={label}
      style={{ touchAction: 'none', ...handleProps.style, ...style }}
      className={[
        // Wider hit target for tablets; visual stays a thin strip via background.
        // Above sticky sidebar headers (z-9999) / sticky tree folders (~1000).
        'toc-resize-handle absolute top-0 bottom-0 z-[10000] w-3 cursor-col-resize touch-none select-none',
        '[@media(pointer:fine)]:w-1.5',
        edgeClass,
        toneClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
