import { useCallback, useEffect, useRef, useState } from 'react';
import { isTreeCopyModifierHeld } from '@/utils/treeCopy';

/**
 * Tracks Ctrl/Alt during a tree drag so drop can copy instead of move.
 * Live updates while the modifier is pressed or released mid-drag.
 */
export function useTreeCopyDragModifier(isDragging: boolean) {
  const isCopyDragRef = useRef(false);
  const [isCopyDrag, setIsCopyDrag] = useState(false);

  const setCopyDrag = useCallback((next: boolean) => {
    isCopyDragRef.current = next;
    setIsCopyDrag(next);
  }, []);

  const syncFromEvent = useCallback(
    (event?: { ctrlKey?: boolean; altKey?: boolean } | null) => {
      setCopyDrag(isTreeCopyModifierHeld(event));
    },
    [setCopyDrag],
  );

  useEffect(() => {
    if (!isDragging) {
      setCopyDrag(false);
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      setCopyDrag(event.ctrlKey || event.altKey);
    };
    const onPointer = (event: PointerEvent) => {
      setCopyDrag(event.ctrlKey || event.altKey);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('keyup', onKey);
    window.addEventListener('pointermove', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('keyup', onKey);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [isDragging, setCopyDrag]);

  return { isCopyDrag, isCopyDragRef, syncFromEvent };
}
