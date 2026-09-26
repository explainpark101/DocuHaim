/**
 * Ratio-based scroll sync between Haim source (CM) and WYSIWYG panes.
 */

import { useEffect, useRef } from 'react';
import type { EditorView } from '@codemirror/view';

type Options = {
  enabled: boolean;
  /** TipTap / WYSIWYG scroll container (overflow:auto). */
  wysiwygScrollRef: React.RefObject<HTMLElement | null>;
  /** CodeMirror EditorView ref (uses .cm-scroller). */
  cmViewRef: React.MutableRefObject<EditorView | null>;
  /**
   * Bump when the CM EditorView is created or destroyed so listeners
   * re-bind to the live scrollDOM (SourcePane remounts without toggling enabled).
   */
  cmRevision?: number;
};

function maxScroll(el: HTMLElement): number {
  return Math.max(0, el.scrollHeight - el.clientHeight);
}

function readRatio(el: HTMLElement): number {
  const max = maxScroll(el);
  if (max <= 0) return 0;
  return el.scrollTop / max;
}

function writeRatio(el: HTMLElement, ratio: number): void {
  const max = maxScroll(el);
  const next = Math.round(Math.min(1, Math.max(0, ratio)) * max);
  if (Math.abs(el.scrollTop - next) > 1) {
    el.scrollTop = next;
  }
}

function cmScroller(view: EditorView | null): HTMLElement | null {
  if (!view) return null;
  return view.scrollDOM ?? null;
}

export function useHaimDoubleScrollSync({
  enabled,
  wysiwygScrollRef,
  cmViewRef,
  cmRevision = 0,
}: Options): void {
  const lockRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;

    let disposed = false;
    let detach: (() => void) | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attachedWysiwyg: HTMLElement | null = null;
    let attachedCm: HTMLElement | null = null;

    const clearRetry = () => {
      if (retryTimer != null) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
    };

    const attach = () => {
      if (disposed) return;
      const wysiwyg = wysiwygScrollRef.current;
      const cm = cmScroller(cmViewRef.current);
      if (!wysiwyg || !cm) {
        clearRetry();
        retryTimer = setTimeout(attach, 80);
        return;
      }

      // Already bound to the live nodes (e.g. duplicate attach call).
      if (wysiwyg === attachedWysiwyg && cm === attachedCm) return;

      detach?.();
      detach = null;

      const syncFrom = (source: HTMLElement, target: HTMLElement) => {
        if (lockRef.current) return;
        lockRef.current = true;
        try {
          writeRatio(target, readRatio(source));
        } finally {
          // Release after layout so the mirrored scroll event is ignored.
          requestAnimationFrame(() => {
            lockRef.current = false;
          });
        }
      };

      const onWysiwyg = () => syncFrom(wysiwyg, cm);
      const onCm = () => syncFrom(cm, wysiwyg);

      wysiwyg.addEventListener('scroll', onWysiwyg, { passive: true });
      cm.addEventListener('scroll', onCm, { passive: true });

      attachedWysiwyg = wysiwyg;
      attachedCm = cm;

      detach = () => {
        wysiwyg.removeEventListener('scroll', onWysiwyg);
        cm.removeEventListener('scroll', onCm);
        attachedWysiwyg = null;
        attachedCm = null;
      };

      // Align once on bind (CM remount / entering double often starts mismatched).
      lockRef.current = true;
      try {
        writeRatio(wysiwyg, readRatio(cm));
      } finally {
        requestAnimationFrame(() => {
          lockRef.current = false;
        });
      }
    };

    attach();

    return () => {
      disposed = true;
      clearRetry();
      detach?.();
      lockRef.current = false;
    };
  }, [enabled, wysiwygScrollRef, cmViewRef, cmRevision]);
}
