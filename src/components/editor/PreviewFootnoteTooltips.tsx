import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Tooltip } from 'radix-ui';

const TITLE_ATTR = 'data-md-footnote-title';
const DELAY_MS = 250;
const SKIP_DELAY_MS = 120;

const TOOLTIP_TRANSITION = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1] as const,
};

const TOOLTIP_CONTENT_CLASS =
  'z-100050 max-w-[min(92vw,320px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

type ActiveTip = {
  el: HTMLElement;
  text: string;
};

type AnchorRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function findFootnoteRef(target: EventTarget | null, root: ParentNode): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const link = target.closest('.footnote-ref-link');
  if (!(link instanceof HTMLElement) || !root.contains(link)) return null;
  return link;
}

function readTitle(el: HTMLElement): string {
  return el.getAttribute(TITLE_ATTR)?.trim() || '';
}

function readAnchorRect(el: HTMLElement): AnchorRect {
  const rect = el.getBoundingClientRect();
  const fontPx = Number.parseFloat(window.getComputedStyle(el).fontSize) || 16;
  const isSup = Boolean(el.querySelector('sup.footnote-ref'));
  // Superscript glyphs sit above the <a> line box; extend the Radix anchor up
  // so the tooltip is not placed on top of the text (which causes flicker).
  const extraTop = isSup ? fontPx * 0.9 : 0;
  return {
    top: rect.top - extraTop,
    left: rect.left,
    width: Math.max(rect.width, 1),
    height: Math.max(rect.height + extraTop, 1),
  };
}

type Props = {
  containerRef: RefObject<HTMLElement | null>;
  /** When the preview host is attached via callback ref, pass the live node. */
  rootEl?: HTMLElement | null;
};

/**
 * Radix Tooltip for preview footnote refs (`[^N]`), showing the source title.
 */
export default function PreviewFootnoteTooltips({ containerRef, rootEl = null }: Props) {
  const [active, setActive] = useState<ActiveTip | null>(null);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCloseAtRef = useRef(0);
  const activeRef = useRef<ActiveTip | null>(null);

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current != null) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const clearActive = useCallback(() => {
    clearOpenTimer();
    if (activeRef.current) lastCloseAtRef.current = Date.now();
    activeRef.current = null;
    setActive(null);
    setAnchor(null);
  }, [clearOpenTimer]);

  const showTip = useCallback(
    (item: HTMLElement, text: string) => {
      const next: ActiveTip = { el: item, text };
      const apply = () => {
        activeRef.current = next;
        setActive(next);
        setAnchor(readAnchorRect(item));
      };

      clearOpenTimer();

      if (activeRef.current) {
        apply();
        return;
      }

      const sinceClose = Date.now() - lastCloseAtRef.current;
      const delay = sinceClose < SKIP_DELAY_MS ? 0 : DELAY_MS;
      if (delay === 0) {
        apply();
        return;
      }

      openTimerRef.current = setTimeout(() => {
        openTimerRef.current = null;
        apply();
      }, delay);
    },
    [clearOpenTimer],
  );

  useEffect(() => {
    const root = rootEl ?? containerRef.current;
    if (!root) return undefined;

    const onPointerOver = (event: PointerEvent) => {
      const item = findFootnoteRef(event.target, root);
      if (!item) return;
      const text = readTitle(item);
      if (!text) {
        clearActive();
        return;
      }
      if (activeRef.current?.el === item && activeRef.current.text === text) return;
      showTip(item, text);
    };

    const onPointerOut = (event: PointerEvent) => {
      const item = findFootnoteRef(event.target, root);
      if (!item) return;
      const related = event.relatedTarget;
      if (related instanceof Node && item.contains(related)) return;
      if (activeRef.current?.el === item || openTimerRef.current != null) {
        clearActive();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const item = findFootnoteRef(event.target, root);
      if (!item) return;
      const text = readTitle(item);
      if (!text) return;
      showTip(item, text);
    };

    const onFocusOut = (event: FocusEvent) => {
      const item = findFootnoteRef(event.target, root);
      if (!item) return;
      const related = event.relatedTarget;
      if (related instanceof Node && item.contains(related)) return;
      if (activeRef.current?.el === item) clearActive();
    };

    const onPointerDown = () => {
      clearActive();
    };

    root.addEventListener('pointerover', onPointerOver);
    root.addEventListener('pointerout', onPointerOut);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    root.addEventListener('pointerdown', onPointerDown);

    return () => {
      clearOpenTimer();
      root.removeEventListener('pointerover', onPointerOver);
      root.removeEventListener('pointerout', onPointerOut);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      root.removeEventListener('pointerdown', onPointerDown);
    };
  }, [clearActive, clearOpenTimer, containerRef, rootEl, showTip]);

  useLayoutEffect(() => {
    if (!active?.el) {
      setAnchor(null);
      return undefined;
    }

    const sync = () => {
      if (!active.el.isConnected) {
        clearActive();
        return;
      }
      setAnchor(readAnchorRect(active.el));
    };

    sync();

    const root = rootEl ?? containerRef.current;
    const preview = root?.querySelector('.md-editor-preview');
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, true);
    preview?.addEventListener('scroll', sync, { passive: true });

    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync, true);
      preview?.removeEventListener('scroll', sync);
    };
  }, [active, clearActive, containerRef, rootEl]);

  const open = Boolean(active && anchor && active.text);

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
      <Tooltip.Root
        open={open}
        onOpenChange={(next: any) => {
          if (!next) clearActive();
        }}
      >
        <Tooltip.Trigger asChild>
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span
            aria-hidden
            className="pointer-events-none fixed z-100049"
            style={
              anchor
                ? {
                    top: anchor.top,
                    left: anchor.left,
                    width: Math.max(anchor.width, 1),
                    height: Math.max(anchor.height, 1),
                  }
                : { top: 0, left: 0, width: 1, height: 1, opacity: 0 }
            }
          />
        </Tooltip.Trigger>
        <AnimatePresence>
          {open ? (
            <Tooltip.Portal forceMount>
              <Tooltip.Content asChild side="top" sideOffset={6}>
                <Motion.div
                  className={TOOLTIP_CONTENT_CLASS}
                  initial={{ opacity: 0, y: 6, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 3, scale: 0.97 }}
                  transition={TOOLTIP_TRANSITION}
                >
                  {active?.text}
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          ) : null}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
