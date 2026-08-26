import { useEffect, useMemo, useRef } from 'react';
import type { editor as MonacoEditor } from 'monaco-editor';
import Editor from '@monaco-editor/react';

type MonacoTextEditorProps = {
  value?: string;
  language?: string;
  theme?: string;
  readOnly?: boolean;
  onChange?: (value: string | undefined) => void;
  onSave?: () => void;
  className?: string;
};

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
  className = '',
}: MonacoTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
  const options = useMemo(
    () => ({
      readOnly,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 13,
      lineNumbers: 'on' as const,
      wordWrap: 'on' as const,
      automaticLayout: true,
    }),
    [readOnly],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof onSave !== 'function' || readOnly) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        editorRef.current?.trigger('keyboard', 'editor.action.insertLineBefore', null);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    };
    el.addEventListener('keydown', handleKeyDown, true);
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
        options={options}
        {...(onChange ? { onChange } : {})}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        loading={null}
      />
    </div>
  );
}
