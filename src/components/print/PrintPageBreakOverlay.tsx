type Props = {
  pageStarts: number[];
  contentHeight: number;
};

export default function PrintPageBreakOverlay({
  pageStarts,
  contentHeight,
}: Props) {
  if (pageStarts.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 print:hidden"
      aria-hidden
      style={{ height: Math.max(contentHeight, pageStarts[pageStarts.length - 1] ?? 0) }}
    >
      {pageStarts.map((start, index) => {
        const pageNumber = index + 1;
        return (
          <div
            key={`print-page-${pageNumber}-${Math.round(start)}`}
            className="absolute right-0 left-0"
            style={{ top: start }}
          >
            {index > 0 ? (
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
