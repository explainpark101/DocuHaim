import { useLayoutEffect, useRef, useState } from 'react';

export function usePrintPageInnerHeightPx(layoutKey: string) {
  const metricRef = useRef<HTMLDivElement>(null);
  const [pageInnerHeightPx, setPageInnerHeightPx] = useState(0);

  useLayoutEffect(() => {
    const el = metricRef.current;
    if (!el) return undefined;

    const update = () => {
      const next = el.getBoundingClientRect().height;
      setPageInnerHeightPx((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [layoutKey]);

  return { metricRef, pageInnerHeightPx };
}
