import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { countHaimDisplayLines } from '@/utils/haimWysiwygLineNumberSettings';
import { HAIM_CODE_WRAP_CHANGED_EVENT } from '@/utils/haimCodeWrapSettings';
import {
  measureHaimHardLineHeights,
  probeHaimLineHeightPx,
  resolveHaimGutterLineCount,
} from '@/utils/measureHaimHardLineHeights';

type HaimLineNumberGutterProps = {
  text: string;
  className?: string;
  /**
   * Root that contains the wrapped text (`pre` / TipTap content host).
   * Works for lowlight CodeBlock and plain / raw-md pre alike.
   */
  contentRootRef?: RefObject<HTMLElement | null>;
};

function resolveMeasureTarget(root: HTMLElement | null): HTMLElement | null {
  if (!root) return null;
  return (
    root.querySelector<HTMLElement>('[data-node-view-content-react]') ??
    root.querySelector<HTMLElement>('[data-node-view-content]') ??
    root.querySelector<HTMLElement>('code') ??
    root
  );
}

function heightsEqual(a: number[] | null, b: number[] | null): boolean {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (Math.abs((a[i] ?? 0) - (b[i] ?? 0)) > 0.5) return false;
  }
  return true;
}

/**
 * Line-number column locked to painted hard-line bands
 * (lowlight TipTap code + plain/raw pre).
 */
export default function HaimLineNumberGutter({
  text,
  className,
  contentRootRef,
}: HaimLineNumberGutterProps) {
  const textCount = countHaimDisplayLines(text);
  const [count, setCount] = useState(textCount);
  const [heights, setHeights] = useState<number[] | null>(null);
  const [lineHeightPx, setLineHeightPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = contentRootRef?.current ?? null;
    const el = resolveMeasureTarget(root);
    if (!el) {
      setCount(textCount);
      setHeights(null);
      setLineHeightPx(null);
      return undefined;
    }

    let raf = 0;
    let ro: ResizeObserver | null = null;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const target = resolveMeasureTarget(contentRootRef?.current ?? null);
        if (!target) {
          setCount(textCount);
          setHeights(null);
          setLineHeightPx(null);
          return;
        }
        const nextCount = resolveHaimGutterLineCount(target, text);
        const lh = probeHaimLineHeightPx(target);
        const nextHeights = measureHaimHardLineHeights(target, text, nextCount);
        const nextHeightsOrNull =
          nextHeights.length === nextCount && nextHeights.every((h) => h > 0)
            ? nextHeights
            : null;
        setCount((prev) => (prev === nextCount ? prev : nextCount));
        setLineHeightPx((prev) => (prev === lh ? prev : lh));
        setHeights((prev) =>
          heightsEqual(prev, nextHeightsOrNull) ? prev : nextHeightsOrNull,
        );
      });
    };

    sync();
    ro = new ResizeObserver(sync);
    ro.observe(el);
    if (root && root !== el) ro.observe(root);
    const pre = el.closest('pre');
    if (pre && pre !== el && pre !== root) ro.observe(pre);

    // Skip attributes — class tweaks from lowlight would thrash remasure.
    const mo = new MutationObserver(sync);
    mo.observe(el, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    const boot = window.setTimeout(sync, 0);

    window.addEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, sync);
    window.addEventListener('resize', sync);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(boot);
      ro?.disconnect();
      mo.disconnect();
      window.removeEventListener(HAIM_CODE_WRAP_CHANGED_EVENT, sync);
      window.removeEventListener('resize', sync);
    };
  }, [text, textCount, contentRootRef]);

  const gutterStyle: CSSProperties | undefined =
    lineHeightPx != null && lineHeightPx > 0
      ? { lineHeight: `${lineHeightPx}px` }
      : undefined;

  return (
    <div
      className={['haim-line-numbers', className].filter(Boolean).join(' ')}
      style={gutterStyle}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => {
        const h = heights?.[i];
        const style: CSSProperties | undefined =
          h != null && h > 0
            ? {
                height: h,
                minHeight: h,
                maxHeight: h,
                lineHeight:
                  lineHeightPx != null && lineHeightPx > 0
                    ? `${Math.min(lineHeightPx, h)}px`
                    : undefined,
              }
            : undefined;
        return (
          <span key={i} className="haim-line-numbers__n" style={style}>
            {i + 1}
          </span>
        );
      })}
    </div>
  );
}
