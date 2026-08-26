import { useEffect, useMemo, useRef } from 'react';
import Editor from '@monaco-editor/react';

/**
 * Non-markdown text viewer/editor using Monaco.
 * Used for JSON, plain text (raw), and "view as text" for unsupported types.
 */
export default function MonacoTextEditor({
  value = '',
  language = 'plaintext',
  theme = 'light',
  readOnly = false,
  onChange,
  onSave,
  className = ''
}: any) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
  const options = useMemo(
    () => ({
      readOnly,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
    }),
    [readOnly],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof onSave !== 'function' || readOnly) return;
    const handleKeyDown = (e: any) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        // @ts-expect-error TS(2339): Property 'trigger' does not exist on type 'never'.
        editorRef.current?.trigger('keyboard', 'editor.action.insertLineBefore', null);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    };
    // @ts-expect-error TS(2339): Property 'addEventListener' does not exist on type... Remove this comment to see the full error message
    el.addEventListener('keydown', handleKeyDown, true);
    // @ts-expect-error TS(2339): Property 'removeEventListener' does not exist on t... Remove this comment to see the full error message
    return () => el.removeEventListener('keydown', handleKeyDown, true);
  }, [onSave, readOnly]);

  return (
    <div ref={containerRef} className={`flex-1 min-h-0 flex flex-col ${className}`.trim()}>
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        theme={monacoTheme}
        options={options as any}
        onChange={onChange}
        onMount={(editor: any) => {
          editorRef.current = editor;
        }}
        loading={null}
      />
    </div>
  );
}
