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
import { bindScrollEnd } from '@/components/haimEditor/haimDoubleScrollSyncCore';
import { yieldToMain } from '@/components/haimEditor/yieldToMain';

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

function proseLinesEqual(
  a: HaimProseLineStart[],
  b: HaimProseLineStart[],
): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    const left = a[i];
    const right = b[i];
    if (!left || !right) return false;
    if (left.n !== right.n || Math.abs(left.top - right.top) > 0.5) return false;
  }
  return true;
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
  const [scrollTop, setScrollTop] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

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
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const PROSE_GUTTER_DEBOUNCE_MS = 120;
    const GUTTER_BUDGET_MS = 50;
    let generation = 0;

    const applyMeasured = (nextLeft: number, nextLines: HaimProseLineStart[]) => {
      setColumnLeft((prev) => (Math.abs(prev - nextLeft) < 0.5 ? prev : nextLeft));
      setLines((prev) => (proseLinesEqual(prev, nextLines) ? prev : nextLines));
      const scrollEl = scrollRef.current;
      if (scrollEl) setViewHeight(scrollEl.clientHeight);
    };

    const syncNow = () => {
      cancelAnimationFrame(raf);
      const ticket = ++generation;
      raf = requestAnimationFrame(() => {
        void (async () => {
          const scrollEl = scrollRef.current;
          if (!scrollEl || editor.isDestroyed) {
            if (ticket === generation) {
              setLines([]);
              setColumnLeft(0);
            }
            return;
          }
          const pm = editor.view.dom as HTMLElement;
          const nextLeft = measureProseColumnLeft(scrollEl, pm);
          const measured = collectHaimProseLineStarts(
            editor,
            scrollEl,
            GUTTER_BUDGET_MS,
          );
          if (ticket !== generation) return;
          applyMeasured(nextLeft, measured.lines);
          if (!measured.hitBudget) return;
          await yieldToMain();
          if (ticket !== generation || editor.isDestroyed) return;
          const rest = collectHaimProseLineStarts(editor, scrollEl);
          if (ticket !== generation) return;
          applyMeasured(nextLeft, rest.lines);
        })();
      });
    };

    const sync = () => {
      // While typing, defer expensive coordsAtPos walks (same idea as source-line).
      if (editor.isFocused) {
        if (debounceTimer != null) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          debounceTimer = null;
          syncNow();
        }, PROSE_GUTTER_DEBOUNCE_MS);
        return;
      }
      if (debounceTimer != null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
      syncNow();
    };

    const onEditorUpdate = ({
      transaction,
    }: {
      transaction: { docChanged: boolean };
    }) => {
      // Caret-only updates do not move line anchors — skip remasure.
      if (!transaction.docChanged) return;
      sync();
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const el = scrollRef.current;
        if (!el) return;
        setScrollTop(el.scrollTop);
      });
    };

    syncNow();
    editor.on('update', onEditorUpdate);
    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', onScroll, { passive: true });
    const unbindScrollEnd = scrollEl
      ? bindScrollEnd(scrollEl, syncNow)
      : () => {};
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
      cancelAnimationFrame(scrollRaf);
      if (debounceTimer != null) clearTimeout(debounceTimer);
      editor.off('update', onEditorUpdate);
      scrollEl?.removeEventListener('scroll', onScroll);
      unbindScrollEnd();
      ro.disconnect();
      window.removeEventListener('resize', sync);
      window.removeEventListener(HAIM_PROSE_WIDTH_CHANGED_EVENT, sync);
    };
  }, [active, enabled, editor, scrollRef]);

  if (!active || !enabled || lines.length === 0) return null;

  const overscan = viewHeight || 800;
  const visibleLines = lines.filter(
    (line) => line.top >= scrollTop - overscan && line.top <= scrollTop + overscan * 2,
  );

  return (
    <div
      className="haim-prose-line-numbers"
      style={{ left: columnLeft }}
      aria-hidden
    >
      {visibleLines.map((line) => (
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
