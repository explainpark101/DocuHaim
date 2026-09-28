import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion as Motion } from 'motion/react';
import { useResizablePanelHeight } from '@/hooks/useResizablePanelHeight';
import {
  CHAT_COMPOSER_DOCK_MIN_FIT_H,
  CHAT_COMPOSER_DOCK_MIN_H,
  resolveChatComposerDockFitHeight,
  resolveChatComposerDockTargetHeight,
} from '@/components/chatWithMyself/chatComposerDockHeight';

export {
  COMPOSER_TOOLBAR_CHROME_H,
  resolveChatComposerDockFitHeight,
  resolveChatComposerDockTargetHeight,
} from '@/components/chatWithMyself/chatComposerDockHeight';

const STORAGE_KEY = 's3haim_chat_composer_dock_height';
const DEFAULT_H = 280;
const MIN_H = CHAT_COMPOSER_DOCK_MIN_H;
const MIN_FIT_H = CHAT_COMPOSER_DOCK_MIN_FIT_H;

const HEIGHT_TRANSITION = {
  type: 'spring' as const,
  /** Snappy grow/shrink — most of the motion finishes within this window. */
  visualDuration: 0.14,
  bounce: 0,
};

/** Prefer the chat column height; fall back to visual viewport. */
export function chatComposerAreaMaxHeight(): number {
  if (typeof window === 'undefined') return 640;
  const column = document.querySelector('[data-chat-rails-root]');
  const columnH =
    column instanceof HTMLElement ? column.clientHeight : 0;
  const vvH = window.visualViewport?.height ?? window.innerHeight;
  const base = columnH > MIN_H ? columnH : vvH;
  return Math.max(MIN_H, Math.floor(base * 0.7));
}

export type ChatComposerDockProps = {
  children?: ReactNode;
  className?: string;
  /**
   * When true (reply / edit), grow the dock so preview chrome and editor
   * content stay visible — restores pre-fit height when leaving unless the
   * user resized during the session.
   */
  autoFit?: boolean;
  /** Remeasure when this changes (e.g. edit/reply target id). */
  fitKey?: string;
  /**
   * Height of the reply/edit preview block (incl. margins). Dock grows by at
   * least this much over the pre-fit height so the input area does not shrink.
   */
  fitPreviewHeight?: number;
  /**
   * Full natural content height (composer + card chrome). Used as a second
   * floor so edit pretext height can expand the dock further.
   */
  fitContentHeight?: number | null;
  /**
   * Extra height while the editor toolbar is visible. Applied on top of the
   * persisted dock height (and included in autoFit grow) so the input area
   * does not shrink below ~1 line.
   */
  toolbarChromeHeight?: number;
  /**
   * Extra height while helper text is visible (normal compose only). AutoFit
   * folds helper into `fitContentHeight` instead.
   */
  helperChromeHeight?: number;
};

/**
 * Resizable bottom composer dock. Height is always the persisted max;
 * children fill the dock with no outer overflow scroll.
 *
 * When the editor toolbar is visible, `toolbarChromeHeight` grows the dock on
 * top of the persisted height so the input keeps at least ~1 line.
 *
 * When `autoFit` is true (reply / message edit), the dock tracks natural
 * content height (`fitContentHeight`) so shorter pretext or hiding helper
 * text can shrink it, capped at 70% of the message column. Height changes
 * animate with a short Motion spring. Manual resize via the handle always
 * wins. Leaving autoFit restores the pre-fit dock height when the user did
 * not resize during the session.
 */
export default function ChatComposerDock({
  children,
  className = '',
  autoFit = false,
  fitKey = '',
  fitPreviewHeight = 0,
  fitContentHeight = null,
  toolbarChromeHeight = 0,
  helperChromeHeight = 0,
}: ChatComposerDockProps) {
  const [maxHeight, setMaxHeight] = useState(chatComposerAreaMaxHeight);
  const heightBeforeFitRef = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [fitHeight, setFitHeight] = useState<number | null>(null);
  /** Once the user drags the handle during autoFit, stop overriding with measures. */
  const userResizedDuringFitRef = useRef(false);
  const toolbarBump = Math.max(0, Math.ceil(toolbarChromeHeight || 0));
  const helperBump = Math.max(0, Math.ceil(helperChromeHeight || 0));

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

  // Snapshot before first autoFit measure; restore when leaving reply/edit
  // (unless the user resized — then keep the new height).
  useLayoutEffect(() => {
    if (autoFit) {
      if (heightBeforeFitRef.current == null) {
        heightBeforeFitRef.current = height;
        userResizedDuringFitRef.current = false;
        // Start from current dock height (incl. toolbar/helper chrome) so we
        // do not flash shorter before the first content measure settles.
        setFitHeight(Math.min(maxHeight, height + toolbarBump + helperBump));
      }
      return undefined;
    }
    const saved = heightBeforeFitRef.current;
    if (saved == null) return undefined;
    heightBeforeFitRef.current = null;
    setFitHeight(null);
    if (!userResizedDuringFitRef.current) {
      const restored = Math.min(maxHeight, Math.max(MIN_H, saved));
      setHeight(restored);
    } else {
      const chrome = toolbarBump + helperBump;
      if (chrome > 0) {
        // Fit measure folded chrome into height; strip it so the !autoFit
        // display path (height + bumps) does not double-count.
        setHeight((prev) =>
          Math.min(maxHeight, Math.max(MIN_H, prev - chrome)),
        );
      }
    }
    userResizedDuringFitRef.current = false;
    return undefined;
  }, [autoFit, height, maxHeight, setHeight, toolbarBump, helperBump]);

  // While autoFit + user is dragging: treat height as the fit target.
  useLayoutEffect(() => {
    if (!autoFit || !isResizing) return;
    userResizedDuringFitRef.current = true;
    setFitHeight(height);
  }, [autoFit, isResizing, height]);

  // Content-driven fit: grow and shrink with pretext / helper chrome.
  // Do not floor to live observed height — fillParent children report the
  // current dock size and would make shrink impossible.
  useLayoutEffect(() => {
    if (!autoFit) return undefined;
    if (userResizedDuringFitRef.current) return undefined;

    const measure = () => {
      if (userResizedDuringFitRef.current) return;
      const base = heightBeforeFitRef.current ?? height;
      const next = resolveChatComposerDockFitHeight({
        maxHeight,
        minFitHeight: MIN_FIT_H,
        baseHeight: base,
        fitPreviewHeight,
        fitContentHeight,
        toolbarChromeHeight: toolbarBump,
      });
      setFitHeight((prev) => (prev === next ? prev : next));
    };

    measure();
    const raf1 = window.requestAnimationFrame(measure);
    const t1 = window.setTimeout(measure, 50);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        window.cancelAnimationFrame(raf1);
        window.clearTimeout(t1);
      };
    }
    const el = contentRef.current;
    const ro = el ? new ResizeObserver(measure) : null;
    if (el && ro) ro.observe(el);
    return () => {
      ro?.disconnect();
      window.cancelAnimationFrame(raf1);
      window.clearTimeout(t1);
    };
  }, [
    autoFit,
    maxHeight,
    fitKey,
    fitPreviewHeight,
    fitContentHeight,
    height,
    toolbarBump,
  ]);

  // Keep persisted height in sync when autoFit settles (so handle aria + next open match).
  useLayoutEffect(() => {
    if (!autoFit || fitHeight == null || isResizing) return;
    if (userResizedDuringFitRef.current) return;
    if (height !== fitHeight) setHeight(fitHeight);
  }, [autoFit, fitHeight, height, isResizing, setHeight]);

  const targetHeight = resolveChatComposerDockTargetHeight({
    height,
    maxHeight,
    minHeight: MIN_H,
    autoFit,
    fitHeight,
    isResizing,
    toolbarChromeHeight: toolbarBump,
    helperChromeHeight: helperBump,
  });

  return (
    <Motion.div
      className={`relative w-full shrink-0 overflow-hidden border-t-2 border-gray-300 bg-slate-100 shadow-[0_-6px_16px_rgba(15,23,42,0.12)] dark:border-odp-borderStrong dark:bg-odp-bg dark:shadow-[0_-6px_16px_rgba(0,0,0,0.45)] ${className}`}
      initial={false}
      animate={{ height: targetHeight }}
      transition={isResizing ? { duration: 0 } : HEIGHT_TRANSITION}
      style={{ maxHeight }}
    >
      <div
        {...(handleProps as HTMLAttributes<HTMLDivElement>)}
        aria-label="채팅 입력창 높이 조절"
        title="채팅 입력창 높이 조절"
        className={[
          'absolute inset-x-0 top-0 z-30 flex h-3 cursor-row-resize touch-none items-start justify-center select-none',
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
      <div
        ref={contentRef}
        className="relative z-0 flex h-full min-h-0 flex-col overflow-hidden pt-1.5 pb-1.5 md:pb-2"
      >
        <div className="flex h-full min-h-0 flex-col">{children}</div>
      </div>
    </Motion.div>
  );
}
