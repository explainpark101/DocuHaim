import { useEffect, useLayoutEffect, useRef, useState, type ComponentProps } from 'react';
import { motion as Motion } from 'motion/react';
import { useResizablePanelHeight } from '@/hooks/useResizablePanelHeight';

const STORAGE_KEY = 's3haim_chat_composer_dock_height';
const DEFAULT_H = 280;
const MIN_H = 140;
/** Floor while auto-fitting: edit banner + group row + min editor + padding. */
const MIN_FIT_H = 160;

const HEIGHT_TRANSITION: any = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

/** Prefer the chat column height; fall back to visual viewport. */
export function chatComposerAreaMaxHeight() {
  if (typeof window === 'undefined') return 640;
  const column = document.querySelector('[data-chat-rails-root]');
  const columnH = column?.clientHeight || 0;
  const vvH = window.visualViewport?.height ?? window.innerHeight;
  const base = columnH > MIN_H ? columnH : vvH;
  return Math.max(MIN_H, Math.floor(base * 0.7));
}

/**
 * Resizable bottom composer dock. Height is always the persisted max;
 * children fill the dock with no outer overflow scroll.
 *
 * When `autoFit` is true (e.g. message edit), the dock grows if content would
 * overflow the current height (so the send/input row stays visible), up to 70%
 * of the message column. It does not shrink below the pre-edit height while
 * editing. Leaving autoFit restores the pre-edit dock height.
 */
export default function ChatComposerDock({
  children,
  className = '',
  autoFit = false,

  /** Remeasure when this changes (e.g. editTarget.id). */
  fitKey = ''
}: any) {
  const [maxHeight, setMaxHeight] = useState(chatComposerAreaMaxHeight);
  const heightBeforeFitRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [fitHeight, setFitHeight] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => setMaxHeight(chatComposerAreaMaxHeight());
    sync();
    const vv = window.visualViewport;
    vv?.addEventListener('resize', sync);
    window.addEventListener('resize', sync);
    return () => {
      vv?.removeEventListener('resize', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const { height, setHeight, isResizing, handleProps } = useResizablePanelHeight({
    storageKey: STORAGE_KEY,
    defaultHeight: DEFAULT_H,
    minHeight: MIN_H,
    maxHeight,
    edge: 'bottom',
  });

  // Snapshot before first autoFit measure; restore when leaving edit.
  useLayoutEffect(() => {
    if (autoFit) {
      if (heightBeforeFitRef.current == null) {
        heightBeforeFitRef.current = height;
      }
      return undefined;
    }
    const saved = heightBeforeFitRef.current;
    if (saved == null) return undefined;
    heightBeforeFitRef.current = null;
    setFitHeight(null);
    const restored = Math.min(maxHeight, Math.max(MIN_H, saved));
    setHeight(restored);
    return undefined;
  }, [autoFit, height, maxHeight, setHeight]);

  // Grow-only fit: expand when edit content needs more room than the pre-edit dock.
  useLayoutEffect(() => {
    if (!autoFit) return undefined;
    const el = contentRef.current;
    if (!el) return undefined;

    const measure = () => {
      const natural = Math.ceil(
        Math.max(el.scrollHeight, el.getBoundingClientRect().height),
      );
      const floor = Math.max(
        MIN_FIT_H,
        heightBeforeFitRef.current ?? height,
      );
      const next = Math.min(maxHeight, Math.max(floor, natural));
      setFitHeight((prev) => (prev === next ? prev : next));
    };

    measure();
    const raf1 = window.requestAnimationFrame(measure);
    const t1 = window.setTimeout(measure, 50);
    const t2 = window.setTimeout(measure, 280);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        window.cancelAnimationFrame(raf1);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
      };
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.cancelAnimationFrame(raf1);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [autoFit, maxHeight, height, fitKey]);

  const targetHeight =
    autoFit && fitHeight != null ? fitHeight : height;

  return (
    <Motion.div
      className={`relative w-full shrink-0 overflow-hidden border-t-2 border-gray-300 bg-slate-100 shadow-[0_-6px_16px_rgba(15,23,42,0.12)] dark:border-odp-borderStrong dark:bg-odp-bg dark:shadow-[0_-6px_16px_rgba(0,0,0,0.45)] ${className}`}
      initial={false}
      animate={{ height: targetHeight }}
      transition={isResizing ? { duration: 0 } : HEIGHT_TRANSITION}
      style={{ maxHeight }}
    >
      {!autoFit ? (
        <div
          {...(handleProps as ComponentProps<'div'>)}
          aria-label="채팅 입력창 높이 조절"
          title="채팅 입력창 높이 조절"
          className={[
            'absolute inset-x-0 top-0 z-20 flex h-3 cursor-row-resize touch-none items-start justify-center select-none',
            'pointer-fine:h-2.5',
          ].join(' ')}
        >
          <span
            className={[
              'mt-1 h-1 w-10 rounded-full transition-colors',
              isResizing
                ? 'bg-blue-400/90 dark:bg-blue-400/70'
                : 'bg-slate-400/55 dark:bg-slate-500/55 hover:bg-blue-400/70 dark:hover:bg-blue-400/55',
            ].join(' ')}
            aria-hidden
          />
        </div>
      ) : null}
      <div
        ref={contentRef}
        className={
          autoFit
            ? 'flex flex-col overflow-hidden pt-1.5 pb-1.5 md:pb-2'
            : 'flex h-full min-h-0 flex-col overflow-hidden pt-1.5 pb-1.5 md:pb-2'
        }
      >
        <div className={autoFit ? 'flex shrink-0 flex-col' : 'flex h-full min-h-0 flex-col'}>
          {children}
        </div>
      </div>
    </Motion.div>
  );
}
