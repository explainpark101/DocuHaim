import { useEffect, type RefObject } from 'react';
import { useDndContext } from '@dnd-kit/core';

type TreeDndLayoutSyncProps = {
  scrollContainerRef: RefObject<HTMLElement | null>;
};

/**
 * While dragging in the sidebar tree, remeasure droppables when the scroll
 * container scrolls or its content height changes (folder expand/collapse).
 */
export default function TreeDndLayoutSync({ scrollContainerRef }: TreeDndLayoutSyncProps) {
  const { active, measureDroppableContainers } = useDndContext();

  useEffect(() => {
    if (!active) return undefined;

    const el = scrollContainerRef.current;
    if (!el) return undefined;

    let rafId: number | null = null;
    const scheduleRemeasure = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        measureDroppableContainers([]);
      });
    };

    const resizeObserver = new ResizeObserver(scheduleRemeasure);
    resizeObserver.observe(el);

    el.addEventListener('scroll', scheduleRemeasure, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      el.removeEventListener('scroll', scheduleRemeasure);
    };
  }, [active, measureDroppableContainers, scrollContainerRef]);

  return null;
}
