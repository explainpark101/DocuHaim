type Props = {
  pageStarts: number[];
  contentHeight: number;
  /**
   * 1-based logical page number for the first body page start.
   * Use 2 when a note cover occupies page 1 so body breaks continue from there.
   */
  firstPageNumber?: number;
};

export default function PrintPageBreakOverlay({
  pageStarts,
  contentHeight,
  firstPageNumber = 1,
}: Props) {
  if (pageStarts.length === 0) return null;
  const pageOffset = Math.max(0, firstPageNumber - 1);
  /** Body top is a page boundary when a cover already consumed page 1. */
  const showBreakAtBodyStart = pageOffset > 0;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 print:hidden"
      aria-hidden
      style={{ height: Math.max(contentHeight, pageStarts[pageStarts.length - 1] ?? 0) }}
    >
      {pageStarts.map((start, index) => {
        const pageNumber = index + 1 + pageOffset;
        const showBreakLine = index > 0 || (index === 0 && showBreakAtBodyStart);
        return (
          <div
            key={`print-page-${pageNumber}-${Math.round(start)}`}
            className="absolute right-0 left-0"
            style={{ top: start }}
          >
            {showBreakLine ? (
              <div className="absolute inset-x-0 top-0 border-t-2 border-dashed border-red-400/80" />
            ) : null}
            <span className="absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300">
              {pageNumber}p
            </span>
          </div>
        );
      })}
    </div>
  );
}
