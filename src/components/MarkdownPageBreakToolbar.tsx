import { useCallback } from 'react';
import { BetweenVerticalEnd } from 'lucide-react';

/** md-editor-rt defToolbars: inserts `<pgbr/>` */
export default function MarkdownPageBreakToolbar({
  editorRef
}: any) {
  const onClick = useCallback(() => {
    const api = editorRef.current?.value ?? editorRef.current;
    if (!api) return;
    const insertion = '\n\n<pgbr/>\n\n';
    // md-editor-rt v6: ref exposes insert() / getEditorView(), not getView()
    if (typeof api.insert === 'function') {
      api.insert(() => ({
        targetValue: insertion,
        select: false,
        deviationStart: 0,
        deviationEnd: 0,
      }));
      api.focus?.();
      return;
    }
    const view = api.getEditorView?.();
    if (!view) return;
    view.dispatch(view.state.replaceSelection(insertion));
    view.focus?.();
  }, [editorRef]);

  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      onClick={onClick}
      title="Insert print page break (<pgbr/>)"
      aria-label="Insert print page break"
    >
      <BetweenVerticalEnd className="md-editor-icon" size={16} />
    </button>
  );
}
