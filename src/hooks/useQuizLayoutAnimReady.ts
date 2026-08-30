import { useEffect, useState } from 'react';

/**
 * Defer motion `layout` until after the first paint.
 * Without this, many simultaneous layout projections on mount can use
 * position:fixed layers that intercept pointer events outside the quiz pane.
 */
export function useQuizLayoutAnimReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let frame2 = 0;
    const frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(() => setReady(true));
    });
    return () => {
      window.cancelAnimationFrame(frame1);
      if (frame2) window.cancelAnimationFrame(frame2);
    };
  }, []);

  return ready;
}
