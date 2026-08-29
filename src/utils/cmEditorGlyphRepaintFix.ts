import { EditorView, ViewPlugin, type ViewUpdate } from '@codemirror/view';

/**
 * Chromium/Electron: rapid syntax-highlight DOM churn (markdown `#` heading markers)
 * can leave earlier glyphs unpainted (look transparent) until the caret invalidates
 * the line. Schedule a harmless layout read after edits so text layers reconcile.
 */
export function cmEditorGlyphRepaintFix() {
  return ViewPlugin.fromClass(
    class {
      private raf = 0;

      update(update: ViewUpdate) {
        if (!update.docChanged) return;
        if (update.view.composing || update.view.compositionStarted) return;
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(() => {
          this.raf = 0;
          nudgeContentRepaint(update.view);
        });
      }

      destroy() {
        if (this.raf) cancelAnimationFrame(this.raf);
      }
    },
  );
}

function nudgeContentRepaint(view: EditorView) {
  const content = view.contentDOM;
  if (!content) return;
  // Layout read forces Chrome to repaint text after nested span swaps.
  void content.offsetHeight;
}
