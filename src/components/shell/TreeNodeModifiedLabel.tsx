import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  formatTreeNodeModifiedDate,
  toTreeModifiedDate,
  TREE_MODIFIED_DATE_LEVELS,
  type TreeModifiedDateLevel,
} from '@/utils/formatTreeNodeModifiedDate';

type TreeNodeModifiedLabelProps = {
  lastModified: unknown;
  className?: string;
};

const LABEL_TEXT_CLASS = 'text-[10px] leading-tight tabular-nums';

function pickFittedLevel(
  containerWidth: number,
  measureRoot: HTMLElement,
): TreeModifiedDateLevel {
  if (containerWidth <= 0) return 'compact';

  for (const level of TREE_MODIFIED_DATE_LEVELS) {
    const probe = measureRoot.querySelector<HTMLElement>(`[data-level="${level}"]`);
    if (probe && probe.offsetWidth <= containerWidth) {
      return level;
    }
  }
  return 'compact';
}

export default function TreeNodeModifiedLabel({
  lastModified,
  className = '',
}: TreeNodeModifiedLabelProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [level, setLevel] = useState<TreeModifiedDateLevel>('full');

  const date = useMemo(() => toTreeModifiedDate(lastModified), [lastModified]);
  const displayText = useMemo(
    () => (date ? formatTreeNodeModifiedDate(date, level) : ''),
    [date, level],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measureRoot = measureRef.current;
    if (!container || !measureRoot || !date) return;

    const update = () => {
      setLevel(pickFittedLevel(container.clientWidth, measureRoot));
    };

    update();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => {
      ro.disconnect();
    };
  }, [date]);

  if (!date) return null;

  return (
    <span ref={containerRef} className={`relative block min-w-0 max-w-full ${className}`.trim()}>
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span className={`block truncate ${LABEL_TEXT_CLASS}`}>{displayText}</span>
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <span
        ref={measureRef}
        aria-hidden
        className={`pointer-events-none invisible absolute left-0 top-0 -z-10 ${LABEL_TEXT_CLASS}`}
      >
        {TREE_MODIFIED_DATE_LEVELS.map((probeLevel) => (
          <span key={probeLevel} data-level={probeLevel} className="block w-max whitespace-nowrap">
            {formatTreeNodeModifiedDate(date, probeLevel)}
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          </span>
        ))}
      // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      </span>
    // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
    </span>
  );
}
