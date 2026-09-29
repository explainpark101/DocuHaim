import { useEffect, useRef, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Tooltip } from 'radix-ui';
import { motion } from 'motion/react';
import {
  getHaimLinkOpenHintText,
  HAIM_LINK_OPEN_CHANGED_EVENT,
  loadHaimLinkRequireModClick,
} from '@/utils/haimLinkOpenSettings';

type AnchorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Props = {
  editor: Editor | null;
  /** When false, hint is never shown (e.g. preview-only surface). */
  enabled?: boolean;
};

/**
 * Hover hint over WYSIWYG links when open requires Ctrl/Cmd+click.
 * Virtual-anchor Radix Tooltip + motion enter/exit.
 */
export default function HaimLinkHoverHint({
  editor,
  enabled = true,
}: Props) {
  const [requireModClick, setRequireModClick] = useState(() =>
    loadHaimLinkRequireModClick(),
  );
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const sync = () => {
      const next = loadHaimLinkRequireModClick();
      setRequireModClick(next);
      if (!next) {
        setOpen(false);
        setAnchor(null);
      }
    };
    window.addEventListener(HAIM_LINK_OPEN_CHANGED_EVENT, sync);
    return () => window.removeEventListener(HAIM_LINK_OPEN_CHANGED_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!editor || !enabled || !requireModClick) {
      setOpen(false);
      setAnchor(null);
      return;
    }

    const root = editor.view.dom;

    const showFor = (el: HTMLAnchorElement) => {
      const r = el.getBoundingClientRect();
      if (r.width < 1 && r.height < 1) return;
      setAnchor({
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height,
      });
      setOpen(true);
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || !root.contains(link)) return;
      showFor(link);
    };

    const onPointerOut = (event: PointerEvent) => {
      const related = event.relatedTarget as Node | null;
      const fromLink = (event.target as HTMLElement | null)?.closest?.(
        'a[href]',
      );
      if (!fromLink || !root.contains(fromLink)) return;
      if (related && fromLink.contains(related)) return;
      setOpen(false);
    };

    const onScroll = () => {
      if (!openRef.current) return;
      setOpen(false);
      setAnchor(null);
    };

    const scrollOpts: AddEventListenerOptions = {
      capture: true,
      passive: true,
    };

    root.addEventListener('pointerover', onPointerOver);
    root.addEventListener('pointerout', onPointerOut);
    root.addEventListener('scroll', onScroll, scrollOpts);
    window.addEventListener('scroll', onScroll, scrollOpts);

    return () => {
      root.removeEventListener('pointerover', onPointerOver);
      root.removeEventListener('pointerout', onPointerOut);
      root.removeEventListener('scroll', onScroll, scrollOpts);
      window.removeEventListener('scroll', onScroll, scrollOpts);
    };
  }, [editor, enabled, requireModClick]);

  if (!enabled || !requireModClick) return null;

  const hint = getHaimLinkOpenHintText();

  return (
    <Tooltip.Provider delayDuration={120} skipDelayDuration={0}>
      <Tooltip.Root open={open} onOpenChange={setOpen} delayDuration={120}>
        <Tooltip.Trigger asChild>
          <span
            aria-hidden
            className="pointer-events-none fixed z-100001"
            style={
              anchor
                ? {
                    left: anchor.left,
                    top: anchor.top,
                    width: Math.max(anchor.width, 1),
                    height: Math.max(anchor.height, 1),
                  }
                : { left: 0, top: 0, width: 1, height: 1, opacity: 0 }
            }
          />
        </Tooltip.Trigger>
        <Tooltip.Portal forceMount>
          <Tooltip.Content
            asChild
            side="top"
            sideOffset={8}
            forceMount
          >
            <motion.div
              initial={false}
              animate={
                open
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 6, scale: 0.96 }
              }
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              style={{
                pointerEvents: open ? 'auto' : 'none',
                visibility: open ? 'visible' : 'hidden',
              }}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
            >
              {hint}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
