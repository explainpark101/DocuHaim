import {
  useLayoutEffect,
  useState,
  type RefObject,
} from 'react';
import { countHaimDisplayLines } from '@/utils/haimWysiwygLineNumberSettings';
import {
  HAIM_CODE_WRAP_CHANGED_EVENT,
  loadHaimCodeWrapEnabled,
} from '@/utils/haimCodeWrapSettings';
import { measureHaimHardLineHeights } from '@/utils/measureHaimHardLineHeights';

type HaimLineNumberGutterProps = {
  text: string;
  className?: string;
  /**
   * Root that contains the wrapped text (`pre` / content host).
   * Prefer `[data-node-view-content]` / `code` child when present.
   */
  contentRootRef?: RefObject<HTMLElement | null>;
};

function resolveMeasureTarget(root: HTMLElement | null): HTMLElement | null {
  if (!root) return null;
  return (
    root.querySelector<HTMLElement>('[data-node-view-content]') ??
    root.querySelector<HTMLElement>('code') ??
    root
  );
}

function shouldSyncWrapHeights(el: HTMLElement): boolean {
  if (loadHaimCodeWrapEnabled()) return true;
  // Export PDF / read-only preview always soft-wraps regardless of pref.
  return Boolean(el.closest('.haim-editor[data-haim-preview-only]'));
}

/**
 * Non-interactive line-number column. Visibility is gated by
 * `html[data-haim-*-line-numbers]` CSS (see preview-tokens.css).
 * When code wrap is on, each number's height matches its hard line
 * (including soft-wrap continuation rows).
 */
export default function HaimLineNumberGutter({
  text,
  className,
  contentRootRef,
}: HaimLineNumberGutterProps) {
  const count = countHaimDisplayLines(text);
  const [heights, setHeights] = useState<number[] | null>(null);

  useLayoutEffect(() => {
    const root = contentRootRef?.current ?? null;
    const el = resolveMeasureTarget(root);
    if (!el) {
      setHeights(null);
      return undefined;
    }

    let raf = 0;
    let ro: ResizeObserver | null = null;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const target = resolveMeasureTarget(contentRootRef?.current ?? null);
        if (!target || !shouldSyncWrapHeights(target)) {
          setHeights(null);
          return;
        }
        const next = measureHaimHardLineHeights(target, text, count);
        setHeights(next.some((h) => h > 0) ? next : null);
      });
    };

    sync();
    ro = new ResizeObserver(sync);
    ro.observe(el);
    if (root && root !== el) ro.observe(root);
    window.addEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, sync);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, sync);
    };
  }, [text, count, contentRootRef]);

  return (
    <div
      className={['haim-line-numbers', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="haim-line-numbers__n"
          style={
            heights?.[i] != null && heights[i]! > 0
              ? { height: heights[i] }
              : undefined
          }
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
}
