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

const TIP_ATTR = 'data-md-tip';
const DELAY_MS = 280;
const SKIP_DELAY_MS = 120;

const TOOLTIP_TRANSITION = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1] as const,
};

const TOOLTIP_CONTENT_CLASS =
  'z-100050 max-w-[min(92vw,280px)] origin-(--radix-tooltip-content-transform-origin) rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

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

function harvestNativeTitles(root: ParentNode) {
  root.querySelectorAll('.md-editor-toolbar [title]').forEach((node) => {
    const el = node as HTMLElement;
    const title = el.getAttribute('title');
    if (!title) return;
    el.setAttribute(TIP_ATTR, title);
    el.removeAttribute('title');
  });
}

function resolveTipText(item: HTMLElement): string {
  const withData = item.hasAttribute(TIP_ATTR)
    ? item
    : item.querySelector(`[${TIP_ATTR}]`);
  const fromData = withData?.getAttribute(TIP_ATTR)?.trim();
  if (fromData) return fromData;

  const titled = item.hasAttribute('title')
    ? item
    : item.querySelector('[title]');
  const fromTitle = titled?.getAttribute('title')?.trim();
  if (fromTitle) return fromTitle;

  const labeled = item.hasAttribute('aria-label')
    ? item
    : item.querySelector('[aria-label]');
  return labeled?.getAttribute('aria-label')?.trim() ?? '';
}

function readAnchorRect(el: HTMLElement): AnchorRect {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

type Props = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Replaces native `title` tooltips on md-editor-rt toolbar items with
 * animated Radix Tooltips (built-in + custom defToolbars).
 */
export default function MdEditorToolbarTooltips({ containerRef }: Props) {
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
    const root = containerRef.current;
    if (!root) return;

    harvestNativeTitles(root);

    const observer = new MutationObserver((mutations) => {
      let needsHarvest = false;
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          needsHarvest = true;
        }
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'title' &&
          mutation.target instanceof HTMLElement
        ) {
          const el = mutation.target;
          if (!el.closest('.md-editor-toolbar')) continue;
          const title = el.getAttribute('title');
          if (!title) continue;
          el.setAttribute(TIP_ATTR, title);
          el.removeAttribute('title');
          if (activeRef.current) {
            const item = el.closest('.md-editor-toolbar-item');
            if (item === activeRef.current.el) {
              const next = { el: activeRef.current.el, text: title };
              activeRef.current = next;
              setActive(next);
            }
          }
        }
      }
      if (needsHarvest) harvestNativeTitles(root);
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['title'],
    });

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest('.md-editor-toolbar-item');
      if (!(item instanceof HTMLElement) || !root.contains(item)) return;
      const text = resolveTipText(item);
      if (!text) {
        clearActive();
        return;
      }
      if (activeRef.current?.el === item && activeRef.current.text === text) return;
      showTip(item, text);
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest('.md-editor-toolbar-item');
      if (!(item instanceof HTMLElement) || !root.contains(item)) return;
      const related = event.relatedTarget;
      if (related instanceof Node && item.contains(related)) return;
      if (activeRef.current?.el === item || openTimerRef.current != null) {
        clearActive();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest('.md-editor-toolbar-item');
      if (!(item instanceof HTMLElement) || !root.contains(item)) return;
      const text = resolveTipText(item);
      if (!text) return;
      showTip(item, text);
    };

    const onFocusOut = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const item = target.closest('.md-editor-toolbar-item');
      if (!(item instanceof HTMLElement) || !root.contains(item)) return;
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
      observer.disconnect();
      clearOpenTimer();
      root.removeEventListener('pointerover', onPointerOver);
      root.removeEventListener('pointerout', onPointerOut);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      root.removeEventListener('pointerdown', onPointerDown);
    };
  }, [clearActive, clearOpenTimer, containerRef, showTip]);

  useLayoutEffect(() => {
    if (!active?.el) {
      setAnchor(null);
      return;
    }

    const sync = () => {
      if (!active.el.isConnected) {
        clearActive();
        return;
      }
      setAnchor(readAnchorRect(active.el));
    };

    sync();

    const root = containerRef.current;
    const toolbar = root?.querySelector('.md-editor-toolbar-wrapper');
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, true);
    toolbar?.addEventListener('scroll', sync, { passive: true });

    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync, true);
      toolbar?.removeEventListener('scroll', sync);
    };
  }, [active, clearActive, containerRef]);

  const open = Boolean(active && anchor && active.text);

  return (
    <Tooltip.Provider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
      <Tooltip.Root
        open={open}
        onOpenChange={(next) => {
          if (!next) clearActive();
        }}
      >
        <Tooltip.Trigger asChild>
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
