import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';
import { countHaimDisplayLines } from '@/utils/haimWysiwygLineNumberSettings';
import {
  HAIM_CODE_WRAP_CHANGED_EVENT,
  loadHaimCodeWrapEnabled,
} from '@/utils/haimCodeWrapSettings';
import {
  haimCodeHostSoftWraps,
  measureHaimHardLineMargins,
} from '@/utils/measureHaimHardLineHeights';

type HaimLineNumberGutterProps = {
  text: string;
  className?: string;
  /**
   * Root that contains the wrapped text (`pre` / content host).
   * Prefer TipTap contentDOM / `[data-node-view-content]` when present.
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

function shouldSyncWrapHeights(el: HTMLElement): boolean {
  if (haimCodeHostSoftWraps(el)) return true;
  return loadHaimCodeWrapEnabled();
}

/**
 * Non-interactive line-number column. Visibility is gated by
 * `html[data-haim-*-line-numbers]` CSS (see preview-tokens.css).
 *
 * When code soft-wraps, pretext pre-computes wrap rows per hard line and
 * applies margin-bottom under each digit so numbers stay synced with code.
 */
export default function HaimLineNumberGutter({
  text,
  className,
  contentRootRef,
}: HaimLineNumberGutterProps) {
  const count = countHaimDisplayLines(text);
  const [margins, setMargins] = useState<number[] | null>(null);

  useLayoutEffect(() => {
    const root = contentRootRef?.current ?? null;
    const el = resolveMeasureTarget(root);
    if (!el) {
      setMargins(null);
      return undefined;
    }

    let raf = 0;
    let ro: ResizeObserver | null = null;

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const target = resolveMeasureTarget(contentRootRef?.current ?? null);
        if (!target || !shouldSyncWrapHeights(target)) {
          setMargins(null);
          return;
        }
        const next = measureHaimHardLineMargins(target, text, count);
        setMargins(next.some((m) => m > 0) ? next : null);
      });
    };

    sync();
    ro = new ResizeObserver(sync);
    ro.observe(el);
    if (root && root !== el) ro.observe(root);
    const pre = el.closest('pre');
    if (pre && pre !== el && pre !== root) ro.observe(pre);

    const mo = new MutationObserver(sync);
    mo.observe(el, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    // TipTap may mount contentDOM one frame later.
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
  }, [text, count, contentRootRef]);

  return (
    <div
      className={['haim-line-numbers', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => {
        const mb = margins?.[i] ?? 0;
        const style: CSSProperties | undefined =
          mb > 0 ? { marginBottom: mb } : undefined;
        return (
          <span key={i} className="haim-line-numbers__n" style={style}>
            {i + 1}
          </span>
        );
      })}
    </div>
  );
}
