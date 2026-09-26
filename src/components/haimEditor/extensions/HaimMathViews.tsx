import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import katex from 'katex';
import { Code2, Eye } from 'lucide-react';
import { Tooltip } from 'radix-ui';

function IconActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg dark:hover:bg-odp-bgSoft"
          aria-label={label}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
          }}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
        >
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function useKatexHtml(latex: string, displayMode: boolean): {
  html: string | null;
  error: boolean;
} {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const src = String(latex || '').trim();
    if (!src) {
      setHtml(null);
      setError(false);
      return;
    }
    try {
      const next = katex.renderToString(src, {
        throwOnError: false,
        displayMode,
        output: 'html',
      });
      setHtml(next);
      setError(false);
    } catch {
      setHtml(null);
      setError(true);
    }
  }, [latex, displayMode]);

  return { html, error };
}

/**
 * Block math NodeView: KaTeX render; double-click → LaTeX source edit (mermaid pattern).
 */
export function HaimBlockMathView({
  node,
  updateAttributes,
  editor,
  selected,
}: NodeViewProps) {
  const latex = String(node.attrs.latex || '');
  const editable = editor.isEditable;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(latex);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { html, error } = useKatexHtml(latex, true);

  useEffect(() => {
    setDraft(latex);
  }, [latex]);

  useEffect(() => {
    if (editing) textareaRef.current?.focus();
  }, [editing]);

  const commit = () => {
    const next = draft.trim();
    updateAttributes({ latex: next || latex });
    setEditing(false);
  };

  const cancel = () => {
    setDraft(latex);
    setEditing(false);
  };

  if (editing && editable) {
    return (
      <NodeViewWrapper
        as="div"
        className={`haim-math-block haim-math-block--editing${selected ? ' is-selected' : ''}`}
        data-type="block-math"
        contentEditable={false}
      >
        <textarea
          ref={textareaRef}
          className="haim-math-block__textarea"
          value={draft}
          rows={Math.min(8, Math.max(2, draft.split('\n').length + 1))}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              cancel();
            }
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              commit();
            }
            e.stopPropagation();
          }}
          spellCheck={false}
        />
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          <div className="haim-math-block__toolbar">
            <IconActionButton label="미리보기" onClick={commit}>
              <Eye size={14} aria-hidden />
            </IconActionButton>
          </div>
        </Tooltip.Provider>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="div"
      className={`haim-math-block${selected ? ' is-selected' : ''}${error ? ' haim-math-block--error' : ''}`}
      data-type="block-math"
      data-latex={latex}
      contentEditable={false}
      onDoubleClick={() => {
        if (editable) setEditing(true);
      }}
    >
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        {editable ? (
          <div className="haim-math-block__toolbar">
            <IconActionButton label="소스 편집" onClick={() => setEditing(true)}>
              <Code2 size={14} aria-hidden />
            </IconActionButton>
          </div>
        ) : null}
      </Tooltip.Provider>
      {html ? (
        <div
          className="haim-math-block__render"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="haim-math-block__fallback">{latex || '…'}</div>
      )}
    </NodeViewWrapper>
  );
}

/**
 * Inline math NodeView: KaTeX; double-click → single-line LaTeX edit.
 */
export function HaimInlineMathView({
  node,
  updateAttributes,
  editor,
  selected,
}: NodeViewProps) {
  const latex = String(node.attrs.latex || '');
  const editable = editor.isEditable;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(latex);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { html, error } = useKatexHtml(latex, false);

  useEffect(() => {
    setDraft(latex);
  }, [latex]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    const next = draft.trim();
    updateAttributes({ latex: next || latex });
    setEditing(false);
  };

  const cancel = () => {
    setDraft(latex);
    setEditing(false);
  };

  if (editing && editable) {
    return (
      <NodeViewWrapper
        as="span"
        className={`haim-math-inline haim-math-inline--editing${selected ? ' is-selected' : ''}`}
        data-type="inline-math"
        contentEditable={false}
      >
        <input
          ref={inputRef}
          type="text"
          className="haim-math-inline__input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              cancel();
            }
            e.stopPropagation();
          }}
          spellCheck={false}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="span"
      className={`haim-math-inline${selected ? ' is-selected' : ''}${error ? ' haim-math-inline--error' : ''}`}
      data-type="inline-math"
      data-latex={latex}
      contentEditable={false}
      onDoubleClick={(e: ReactMouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (editable) setEditing(true);
      }}
    >
      {html ? (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span className="haim-math-inline__fallback">{latex || '?'}</span>
      )}
    </NodeViewWrapper>
  );
}
