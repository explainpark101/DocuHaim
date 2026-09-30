import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Editor } from '@tiptap/react';
import { AnimatePresence, motion, type MotionStyle } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import Button from '@/components/Button';
import { parseDocuhaimHref } from '@/utils/docuhaimLink';
import {
  getHaimLinkOpenHintText,
  HAIM_LINK_OPEN_CHANGED_EVENT,
} from '@/utils/haimLinkOpenSettings';
import { openHaimLinkHref } from '@/utils/openHaimLinkHref';

type AnchorRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type LinkTip = {
  href: string;
  label: string;
  anchor: AnchorRect;
};

type Props = {
  editor: Editor | null;
  /** When false, hint is never shown (e.g. preview-only surface). */
  enabled?: boolean;
};

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 240;

const PANEL_TRANSITION = {
  duration: 0.16,
  ease: [0.22, 1, 0.36, 1] as const,
};

function readHref(link: HTMLAnchorElement): string {
  return String(link.getAttribute('href') || '').trim();
}

function formatLinkLabel(href: string): string {
  const docPath = parseDocuhaimHref(href);
  if (docPath) return docPath;
  try {
    return new URL(href).href;
  } catch {
    return href;
  }
}

function readAnchor(link: HTMLAnchorElement): AnchorRect {
  const r = link.getBoundingClientRect();
  return {
    left: r.left,
    top: r.top,
    width: Math.max(r.width, 1),
    height: Math.max(r.height, 1),
  };
}

function panelStyle(anchor: AnchorRect): MotionStyle {
  const gap = 8;
  const estimatedHeight = 72;
  const maxWidth = Math.min(320, window.innerWidth - 16);
  const centerX = anchor.left + anchor.width / 2;
  let left = centerX - maxWidth / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - maxWidth - 8));

  let top = anchor.top - gap - estimatedHeight;
  const placeBelow = top < 8;
  if (placeBelow) {
    top = anchor.top + anchor.height + gap;
  }

  return {
    left,
    top,
    width: maxWidth,
  };
}

/**
 * Hover card over WYSIWYG links: move pointer onto the card and press 「열기」.
 * Custom floating panel (not Radix Tooltip) so the card stays hoverable with a button.
 */
export default function HaimLinkHoverHint({
  editor,
  enabled = true,
}: Props) {
  const [tip, setTip] = useState<LinkTip | null>(null);
  const [hint, setHint] = useState(() => getHaimLinkOpenHintText());
  const tipRef = useRef<LinkTip | null>(null);
  tipRef.current = tip;

  useEffect(() => {
    const syncHint = () => setHint(getHaimLinkOpenHintText());
    window.addEventListener(HAIM_LINK_OPEN_CHANGED_EVENT, syncHint);
    return () => window.removeEventListener(HAIM_LINK_OPEN_CHANGED_EVENT, syncHint);
  }, []);

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linkElRef = useRef<HTMLAnchorElement | null>(null);

  const clearOpenTimer = () => {
    if (openTimerRef.current != null) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const hide = () => {
    clearOpenTimer();
    clearCloseTimer();
    linkElRef.current = null;
    setTip(null);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      hide();
    }, CLOSE_DELAY_MS);
  };

  const showFor = (link: HTMLAnchorElement) => {
    const href = readHref(link);
    if (!href) return;
    clearCloseTimer();
    clearOpenTimer();

    const apply = () => {
      linkElRef.current = link;
      const next: LinkTip = {
        href,
        label: formatLinkLabel(href),
        anchor: readAnchor(link),
      };
      setTip(next);
    };

    if (tipRef.current) {
      apply();
      return;
    }

    openTimerRef.current = setTimeout(apply, OPEN_DELAY_MS);
  };

  useEffect(() => {
    if (!editor || !enabled) {
      hide();
      return;
    }

    const root = editor.view.dom;

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
      ) as HTMLAnchorElement | null;
      if (!fromLink || !root.contains(fromLink)) return;
      if (related && fromLink.contains(related)) return;
      // Leaving toward the floating card — keep open via close delay.
      scheduleClose();
    };

    const onScroll = () => {
      if (!tipRef.current) return;
      hide();
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
      clearOpenTimer();
      clearCloseTimer();
      linkElRef.current = null;
      setTip(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount listeners for editor/enabled only
  }, [editor, enabled]);

  useEffect(() => {
    if (!tip || !linkElRef.current) return;

    const syncRect = () => {
      const link = linkElRef.current;
      if (!link) return;
      setTip((prev) =>
        prev
          ? {
              ...prev,
              anchor: readAnchor(link),
              href: readHref(link) || prev.href,
              label: formatLinkLabel(readHref(link) || prev.href),
            }
          : prev,
      );
    };

    window.addEventListener('resize', syncRect);
    return () => window.removeEventListener('resize', syncRect);
  }, [tip]);

  if (!enabled || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {tip ? (
        <motion.div
          key="haim-link-hover-card"
          role="dialog"
          aria-label="링크 열기"
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.96 }}
          transition={PANEL_TRANSITION}
          className="fixed z-100001 flex max-w-[min(92vw,320px)] flex-col gap-1.5 rounded-md border border-gray-200 bg-white p-2 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface"
          style={panelStyle(tip.anchor)}
          onPointerEnter={() => {
            clearCloseTimer();
          }}
          onPointerLeave={() => {
            scheduleClose();
          }}
        >
          <p className="truncate px-0.5 text-[11px] leading-snug text-gray-600 dark:text-odp-muted">
            {tip.label}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="px-2.5! py-1! text-xs"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                event.stopPropagation();
                const target =
                  linkElRef.current?.getAttribute('target') || '_blank';
                openHaimLinkHref(tip.href, { target });
                hide();
              }}
            >
              <ExternalLink size={14} aria-hidden />
              열기
            </Button>
            <span className="text-[10px] text-gray-500 dark:text-odp-muted">
              {hint}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
