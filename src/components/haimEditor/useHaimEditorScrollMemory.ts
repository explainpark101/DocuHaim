import { useEffect, type MutableRefObject } from 'react';
import type { Editor } from '@tiptap/core';
import type { EditorView as CmEditorView } from '@codemirror/view';
import {
  editorScrollMemoryKeyFromFile,
  flushEditorScrollMemory,
  recallEditorScroll,
  rememberEditorScroll,
  type EditorScrollSnapshot,
} from '@/utils/editorScrollMemory';
import {
  haimScrollApplyStuck,
  haimScrollReadToSnapshot,
  haimScrollRestorePlan,
} from '@/components/haimEditor/haimEditorScrollMemory';

type Args = {
  editor: Editor | null;
  currentFile: { type?: string; id?: string } | null | undefined;
  enabled: boolean;
  showWysiwyg: boolean;
  showSource: boolean;
  wysiwygScrollRef: MutableRefObject<HTMLDivElement | null>;
  cmViewRef: MutableRefObject<CmEditorView | null>;
  rootRef: MutableRefObject<HTMLDivElement | null>;
  suppressScrollSyncUntilRef: MutableRefObject<number>;
};

const RESTORE_ATTEMPTS = 200;
const RESTORE_GAP_MS = 50;
/** Note bodies can arrive after mount; keep correcting until then. */
const RESTORE_GUARD_MS = RESTORE_ATTEMPTS * RESTORE_GAP_MS;

function maxScroll(el: HTMLElement): number {
  return Math.max(0, el.scrollHeight - el.clientHeight);
}

function axisStuck(el: HTMLElement, top: number): boolean {
  return haimScrollApplyStuck(el.scrollTop, top, maxScroll(el));
}

/**
 * Remember Haim WYSIWYG + source scroll per file and put it back after a
 * tab remount or a cold start. Mount transactions scroll the caret (doc
 * start) into view; re-apply until layout can hold the saved offset.
 */
export function useHaimEditorScrollMemory({
  editor,
  currentFile,
  enabled,
  showWysiwyg,
  showSource,
  wysiwygScrollRef,
  cmViewRef,
  rootRef,
  suppressScrollSyncUntilRef,
}: Args): void {
  useEffect(() => {
    if (!enabled) return undefined;
    const key = editorScrollMemoryKeyFromFile(currentFile);
    if (!key) return undefined;

    let saveTimer = 0;
    let restoreGen = 0;
    let userMoved = false;
    let allowPersist = false;
    let lastKnown: EditorScrollSnapshot | null = recallEditorScroll(key);
    const saved = lastKnown;
    const guardUntil = saved ? performance.now() + RESTORE_GUARD_MS : 0;

    const read = (): EditorScrollSnapshot | null => {
      const wysiwyg = wysiwygScrollRef.current;
      const source = cmViewRef.current?.scrollDOM ?? null;
      return haimScrollReadToSnapshot({
        showWysiwyg,
        showSource,
        wysiwygTop: showWysiwyg && wysiwyg ? wysiwyg.scrollTop : null,
        wysiwygLeft: showWysiwyg && wysiwyg ? wysiwyg.scrollLeft : null,
        sourceTop: showSource && source ? source.scrollTop : null,
        sourceLeft: showSource && source ? source.scrollLeft : null,
      });
    };

    const apply = (snap: EditorScrollSnapshot): boolean => {
      const plan = haimScrollRestorePlan(snap, { showWysiwyg, showSource });
      let pending = false;
      let armed = false;
      const arm = () => {
        if (armed) return;
        armed = true;
        // Before scrollTop changes so dual-pane sync ignores the restore.
        suppressScrollSyncUntilRef.current = Math.max(
          suppressScrollSyncUntilRef.current,
          Date.now() + 150,
        );
      };
      const write = (el: HTMLElement | null, axis: { top: number; left: number } | null) => {
        if (!axis) return;
        if (!el) {
          pending = true;
          return;
        }
        if (axis.top > 1 && maxScroll(el) + 1 < axis.top) {
          pending = true;
          return;
        }
        if (Math.abs(el.scrollTop - axis.top) >= 0.5) {
          arm();
          el.scrollTop = axis.top;
        }
        if (Math.abs(el.scrollLeft - axis.left) >= 0.5) {
          arm();
          el.scrollLeft = axis.left;
        }
        if (!axisStuck(el, axis.top)) pending = true;
      };
      write(plan.wysiwyg ? wysiwygScrollRef.current : null, plan.wysiwyg);
      write(plan.source ? (cmViewRef.current?.scrollDOM ?? null) : null, plan.source);
      return !pending;
    };

    const persistLastKnown = () => {
      if (!allowPersist && !userMoved) {
        if (lastKnown) rememberEditorScroll(key, lastKnown);
        return;
      }
      const snap = read();
      if (snap) {
        const domAtTop = snap.editorTop <= 1 && snap.previewTop <= 1;
        const knownFar =
          lastKnown != null && (lastKnown.editorTop > 24 || lastKnown.previewTop > 24);
        if (!(domAtTop && knownFar)) lastKnown = snap;
      }
      if (lastKnown) rememberEditorScroll(key, lastKnown);
    };

    const schedulePersist = () => {
      if (saveTimer) window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveTimer = 0;
        persistLastKnown();
      }, 80);
    };

    const onScroll = () => {
      if (!allowPersist && !userMoved) return;
      const snap = read();
      if (snap) lastKnown = snap;
      schedulePersist();
    };

    const markUserMoved = () => {
      userMoved = true;
      allowPersist = true;
    };

    let settled = false;
    const markSettled = () => {
      if (!saved) return;
      settled = true;
      allowPersist = true;
      lastKnown = saved;
      rememberEditorScroll(key, saved);
    };

    if (saved && (saved.editorTop > 1 || saved.previewTop > 1 || saved.editorLeft > 1)) {
      const gen = ++restoreGen;
      const attempt = (triesLeft: number) => {
        if (restoreGen !== gen || userMoved || settled) return;
        if (apply(saved)) {
          markSettled();
          return;
        }
        if (triesLeft <= 0) {
          allowPersist = true;
          return;
        }
        window.setTimeout(() => attempt(triesLeft - 1), RESTORE_GAP_MS);
      };
      attempt(RESTORE_ATTEMPTS);
    } else {
      allowPersist = true;
      settled = true;
    }

    const onTransaction = () => {
      if (userMoved || settled || !saved) return;
      if (performance.now() > guardUntil) return;
      if (apply(saved)) markSettled();
    };
    editor?.on('transaction', onTransaction);

    const root = rootRef.current;
    root?.addEventListener('scroll', onScroll, true);
    root?.addEventListener('wheel', markUserMoved, { capture: true, passive: true });
    root?.addEventListener('pointerdown', markUserMoved, true);
    root?.addEventListener('keydown', markUserMoved, true);

    const onPageHide = () => {
      persistLastKnown();
      flushEditorScrollMemory();
    };
    window.addEventListener('pagehide', onPageHide);

    return () => {
      restoreGen += 1;
      if (saveTimer) window.clearTimeout(saveTimer);
      editor?.off('transaction', onTransaction);
      root?.removeEventListener('scroll', onScroll, true);
      root?.removeEventListener('wheel', markUserMoved, true);
      root?.removeEventListener('pointerdown', markUserMoved, true);
      root?.removeEventListener('keydown', markUserMoved, true);
      window.removeEventListener('pagehide', onPageHide);
      persistLastKnown();
      flushEditorScrollMemory();
    };
  }, [
    editor,
    currentFile?.id,
    currentFile?.type,
    enabled,
    showWysiwyg,
    showSource,
    wysiwygScrollRef,
    cmViewRef,
    rootRef,
    suppressScrollSyncUntilRef,
  ]);
}
