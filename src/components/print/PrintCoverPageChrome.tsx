import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** When true, mark this surface as logical page 1 (cover end = page end). */
  showPageMarker?: boolean;
  className?: string;
};

/**
 * Wraps the note-cover surface so scroll preview can treat cover end as page 1
 * and show the same page-break chrome as the body overlay.
 */
export default function PrintCoverPageChrome({
  children,
  showPageMarker = false,
  className = '',
}: Props) {
  return (
    <div
      className={`relative ${className}`}
      data-print-cover-page={showPageMarker ? '1' : undefined}
    >
      {children}
      {showPageMarker ? (
        <div
          className="pointer-events-none absolute inset-0 z-10 print:hidden"
          aria-hidden
        >
          <span className="absolute top-1 right-0 translate-x-[calc(100%+0.35rem)] rounded bg-red-50 px-1 text-[10px] font-medium leading-4 text-red-600 shadow-sm dark:bg-red-950/80 dark:text-red-300">
            1p
          </span>
          <div className="absolute inset-x-0 bottom-0 border-b-2 border-dashed border-red-400/80" />
        </div>
      ) : null}
    </div>
  );
}
