import { useEditorState, type Editor } from '@tiptap/react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { ListTree, X } from 'lucide-react';
import type { ComponentType, RefObject } from 'react';
import TocResizeHandleJs from '@/components/TocResizeHandle';
import { extractHaimTocItems } from '@/components/haimEditor/extractHaimTocItems';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';
import { scrollWithinContainer } from '@/utils/settingsPageScroll';
import type { EditorView as CmEditorView } from '@codemirror/view';
import {
  HAIM_TOC_LAYOUT_DOCK,
  HAIM_TOC_LAYOUT_OVERLAY,
  type HaimTocLayout,
} from '@/utils/haimTocLayoutSettings';

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
}>;

const HAIM_TOC_WIDTH_KEY = 's3haim_haim_editor_toc_width';
const HAIM_TOC_DEFAULT_WIDTH = 280;
const TOC_SCROLL_OFFSET_PX = 2;

const SLIDE_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

const PANEL_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.85,
} as const;

const PANEL_TWEEN = {
  type: 'tween',
  duration: 0.22,
  ease: SLIDE_EASE,
} as const;

type Props = {
  editor: Editor;
  open: boolean;
  onClose: () => void;
  /** When false, TipTap pane is hidden — scroll CodeMirror instead. */
  showWysiwyg: boolean;
  wysiwygScrollRef: RefObject<HTMLElement | null>;
  cmViewRef: RefObject<CmEditorView | null>;
  layout?: HaimTocLayout | undefined;
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function smoothScrollBehavior(): ScrollBehavior {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return 'auto';
  }
  return 'smooth';
}

/** Smooth-scroll CM scroller to an ATX heading line (no instant scrollIntoView). */
function scrollSourceToHeading(
  cm: CmEditorView,
  level: number,
  text: string,
): boolean {
  const doc = cm.state.doc;
  const prefix = '#'.repeat(Math.min(10, Math.max(1, level)));
  const re = new RegExp(
    `^${escapeRegExp(prefix)}\\s+${escapeRegExp(text)}\\s*$`,
  );
  for (let i = 1; i <= doc.lines; i += 1) {
    const line = doc.line(i);
    if (!re.test(line.text)) continue;

    cm.dispatch({ selection: { anchor: line.from } });

    const scroller = cm.scrollDOM;
    const behavior = smoothScrollBehavior();
    const coords = cm.coordsAtPos(line.from);
    if (coords) {
      const scrollerRect = scroller.getBoundingClientRect();
      const top =
        scroller.scrollTop + (coords.top - scrollerRect.top) - TOC_SCROLL_OFFSET_PX;
      scroller.scrollTo({ top: Math.max(0, top), behavior });
    } else {
      const block = cm.lineBlockAt(line.from);
      scroller.scrollTo({
        top: Math.max(0, block.top - TOC_SCROLL_OFFSET_PX),
        behavior,
      });
    }
    return true;
  }
  return false;
}

/**
 * Heading catalog for Haim Editor.
 * Default: overlay (absolute, no layout width). Optional dock pushes content.
 */
export default function HaimTocPanel({
  editor,
  open,
  onClose,
  showWysiwyg,
  wysiwygScrollRef,
  cmViewRef,
  layout = HAIM_TOC_LAYOUT_OVERLAY,
}: Props) {
  const items = useEditorState({
    editor,
    selector: ({ editor: ed }) => extractHaimTocItems(ed),
  });

  const {
    width,
    handleProps,
    isResizing,
  } = useResizablePanelWidth({
    storageKey: HAIM_TOC_WIDTH_KEY,
    defaultWidth: HAIM_TOC_DEFAULT_WIDTH,
    minWidth: 180,
    maxWidth: 480,
    edge: 'right',
  });

  const isDock = layout === HAIM_TOC_LAYOUT_DOCK;
  const transition = isResizing
    ? { duration: 0 }
    : isDock
      ? PANEL_SPRING
      : PANEL_TWEEN;

  const navigate = (pos: number, level: number, text: string) => {
    if (showWysiwyg) {
      try {
        // Focus + caret without TipTap's instant scrollIntoView (fights smooth).
        editor.chain().focus().setTextSelection(pos + 1).run();
        const dom = editor.view.nodeDOM(pos);
        const heading =
          dom instanceof HTMLElement
            ? dom
            : dom instanceof Node && dom.parentElement
              ? dom.parentElement
              : null;
        if (!heading) return;
        const scroller = wysiwygScrollRef.current;
        const behavior = smoothScrollBehavior();
        if (scroller) {
          scrollWithinContainer(scroller, heading, { behavior });
        } else {
          heading.scrollIntoView({ block: 'start', behavior });
        }
      } catch {
        // ignore invalid pos after concurrent edits
      }
      return;
    }
    const cm = cmViewRef.current;
    if (cm) {
      scrollSourceToHeading(cm, level, text);
    }
  };

  const shellClass = isDock
    ? 'relative flex h-full shrink-0 flex-col overflow-hidden border-l border-slate-300 bg-white/95 dark:border-odp-borderStrong dark:bg-odp-surface/95'
    : [
        'haim-toc-overlay absolute inset-y-0 right-0 z-20 flex flex-col overflow-hidden',
        'rounded-bl-md border border-slate-200/80 border-t-0 shadow-lg',
        'dark:border-odp-borderStrong/80 dark:shadow-black/40',
      ].join(' ');

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <Motion.aside
          key={`haim-toc-${layout}`}
          role="complementary"
          aria-label="목차"
          data-haim-toc-layout={layout}
          className={shellClass}
          style={
            isDock
              ? { overflow: 'hidden', willChange: 'width, opacity' }
              : { width, willChange: 'transform, opacity' }
          }
          initial={
            isDock
              ? { width: 0, opacity: 0.85 }
              : { x: '100%', opacity: 0.88 }
          }
          animate={
            isDock
              ? { width, opacity: 1 }
              : { x: 0, opacity: 1 }
          }
          exit={
            isDock
              ? { width: 0, opacity: 0.85 }
              : { x: '100%', opacity: 0.88 }
          }
          transition={transition}
        >
          <div className="relative flex h-full min-h-0 w-full flex-col" style={isDock ? { width } : undefined}>
            <TocResizeHandle
              edge="left"
              handleProps={handleProps}
              isResizing={isResizing}
              visibleOnHover
              label="목차 패널 너비 조절"
            />
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-2.5 py-2 dark:border-odp-borderSoft">
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-gray-700 dark:text-odp-fgStrong">
                <ListTree
                  size={14}
                  className="shrink-0 text-gray-500 dark:text-odp-muted"
                  aria-hidden
                />
                목차
              </div>
              <button
                type="button"
                aria-label="목차 패널 닫기"
                onClick={onClose}
                className="inline-flex h-6 w-6 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-bgSoft"
              >
                <X size={14} />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-1.5 py-2">
              {items.length === 0 ? (
                <p className="px-2 py-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  제목이 없습니다
                </p>
              ) : (
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => navigate(item.pos, item.level, item.text)}
                        className="w-full rounded-md px-2 py-1.5 text-left text-[12px] leading-snug text-gray-700 transition hover:bg-slate-100 hover:text-gray-900 dark:text-odp-fg dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
                        style={{
                          paddingLeft: `${0.5 + Math.max(0, item.level - 1) * 0.65}rem`,
                        }}
                        title={item.text}
                      >
                        <span className="line-clamp-2 break-words">{item.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </div>
        </Motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
