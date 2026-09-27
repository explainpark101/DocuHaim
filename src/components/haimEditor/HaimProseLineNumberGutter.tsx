import {
  useLayoutEffect,
  useState,
  type RefObject,
} from 'react';
import type { Editor } from '@tiptap/react';
import {
  collectHaimProseLineStarts,
  type HaimProseLineStart,
} from '@/components/haimEditor/collectHaimProseLineStarts';
import { HAIM_PROSE_WIDTH_CHANGED_EVENT } from '@/utils/haimProseWidthSettings';
import {
  HAIM_PROSE_LINE_NUMBERS_CHANGED_EVENT,
  loadHaimProseLineNumbersEnabled,
} from '@/utils/haimWysiwygLineNumberSettings';

type Props = {
  editor: Editor | null;
  scrollRef: RefObject<HTMLDivElement | null>;
  /** When false, never render (e.g. preview-only / source-only). */
  active?: boolean;
};

/** Left edge of the prose column relative to the scroll content box. */
function measureProseColumnLeft(
  scrollEl: HTMLElement,
  pm: HTMLElement,
): number {
  return (
    pm.getBoundingClientRect().left -
    scrollEl.getBoundingClientRect().left +
    scrollEl.scrollLeft
  );
}

/**
 * Document line-number gutter for live Haim WYSIWYG (not code/raw block gutters).
 * Anchors to the left edge of the (possibly clamped) .tiptap column.
 */
export default function HaimProseLineNumberGutter({
  editor,
  scrollRef,
  active = true,
}: Props) {
  const [enabled, setEnabled] = useState(loadHaimProseLineNumbersEnabled);
  const [lines, setLines] = useState<HaimProseLineStart[]>([]);
  const [columnLeft, setColumnLeft] = useState(0);

  useLayoutEffect(() => {
    const syncPref = () => setEnabled(loadHaimProseLineNumbersEnabled());
    window.addEventListener(HAIM_PROSE_LINE_NUMBERS_CHANGED_EVENT, syncPref);
    return () =>
      window.removeEventListener(HAIM_PROSE_LINE_NUMBERS_CHANGED_EVENT, syncPref);
  }, []);

  useLayoutEffect(() => {
    if (!active || !enabled || !editor || editor.isDestroyed) {
      setLines([]);
      setColumnLeft(0);
      return undefined;
    }

    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollEl = scrollRef.current;
        if (!scrollEl || editor.isDestroyed) {
          setLines([]);
          setColumnLeft(0);
          return;
        }
        const pm = editor.view.dom as HTMLElement;
        setColumnLeft(measureProseColumnLeft(scrollEl, pm));
        setLines(collectHaimProseLineStarts(editor, scrollEl));
      });
    };

    sync();
    editor.on('update', sync);
    editor.on('selectionUpdate', sync);

    const scrollEl = scrollRef.current;
    const ro = new ResizeObserver(sync);
    if (scrollEl) ro.observe(scrollEl);
    const pm = editor.view.dom;
    if (pm) ro.observe(pm);
    const content = pm?.closest('.haim-editor-content');
    if (content && content !== scrollEl) ro.observe(content);

    window.addEventListener('resize', sync);
    window.addEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, sync);
    return () => {
      cancelAnimationFrame(raf);
      editor.off('update', sync);
      editor.off('selectionUpdate', sync);
      ro.disconnect();
      window.removeEventListener('resize', sync);
      window.removeEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, sync);
    };
  }, [active, enabled, editor, scrollRef]);

  if (!active || !enabled || lines.length === 0) return null;

  return (
    <div
      className="haim-prose-line-numbers"
      style={{ left: columnLeft }}
      aria-hidden
    >
      {lines.map((line) => (
        <span
          key={`${line.n}-${Math.round(line.top * 10)}`}
          className="haim-prose-line-numbers__n"
          style={{ top: line.top }}
        >
          {line.n}
        </span>
      ))}
    </div>
  );
}
