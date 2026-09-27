import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from '@tiptap/react';
import { Check, ChevronDown, ChevronUp, Code2, Copy, Eye } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import HaimLineNumberGutter from '@/components/haimEditor/HaimLineNumberGutter';
import { renderMermaidSourceToSvg } from '@/utils/lazyMermaid';

function isMermaidLanguage(language: unknown): boolean {
  return String(language || '')
    .trim()
    .toLowerCase() === 'mermaid';
}

function resolveHaimMermaidTheme(dom: HTMLElement | null): 'dark' | 'default' {
  if (!dom) return 'default';
  const root = dom.closest('.haim-editor');
  if (root?.classList.contains('haim-editor--dark')) return 'dark';
  if (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
  ) {
    return 'dark';
  }
  return 'default';
}

const tooltipContentClass =
  'z-100001 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg';

function IconActionButton({
  label,
  onClick,
  active = false,
  expanded,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  expanded?: boolean;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          className={`haim-code-block__action${active ? ' is-copy-success' : ''}`}
          aria-label={label}
          {...(expanded !== undefined ? { 'aria-expanded': expanded } : {})}
          onClick={onClick}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content side="bottom" sideOffset={6} className={tooltipContentClass}>
          {label}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function CodeBlockToolbar({
  language,
  collapsed,
  copied,
  onCopy,
  onToggleCollapse,
  extra,
}: {
  language: string;
  collapsed: boolean;
  copied: boolean;
  onCopy: () => void;
  onToggleCollapse: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="haim-code-block__header">
      <span className="haim-code-block__lang">{language || 'code'}</span>
      <div className="haim-code-block__actions">
        {extra}
        <IconActionButton
          label={copied ? '복사됨' : '복사'}
          active={copied}
          onClick={onCopy}
        >
          {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
        </IconActionButton>
        <IconActionButton
          label={collapsed ? '펼치기' : '접기'}
          expanded={!collapsed}
          onClick={onToggleCollapse}
        >
          {collapsed ? (
            <ChevronDown size={14} aria-hidden />
          ) : (
            <ChevronUp size={14} aria-hidden />
          )}
        </IconActionButton>
      </div>
    </div>
  );
}

/**
 * TipTap code-block node view: mermaid → chart; other languages → lowlight DOM.
 * Header always exposes copy + fold/unfold.
 */
export default function HaimCodeBlockView({
  node,
  editor,
  selected,
}: NodeViewProps) {
  const language = String(node.attrs.language || '');
  const isMermaid = isMermaidLanguage(language);
  const source = node.textContent || '';
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const editable = editor.isEditable;

  useEffect(() => {
    if (!isMermaid || editing || collapsed) return undefined;
    let cancelled = false;
    const theme = resolveHaimMermaidTheme(editor.view?.dom ?? null);
    void renderMermaidSourceToSvg(source, theme).then((next) => {
      if (cancelled) return;
      if (next) {
        setSvg(next);
        setError(false);
      } else {
        setSvg(null);
        setError(Boolean(source.trim()));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isMermaid, editing, collapsed, source, editor]);

  const onCopy = useCallback(() => {
    const text = source;
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    };
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text).then(done).catch(() => {
        // fallback
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          ta.remove();
          done();
        } catch {
          // ignore
        }
      });
      return;
    }
    done();
  }, [source]);

  const hiddenContent = (
    <pre className="haim-mermaid-block__source-hidden" aria-hidden>
      <NodeViewContent as={'code' as 'div'} />
    </pre>
  );

  if (isMermaid && !editing && svg && !collapsed) {
    return (
      <NodeViewWrapper
        as="div"
        className={`haim-code-block haim-mermaid-block${selected ? ' is-selected' : ''}`}
        data-language="mermaid"
      >
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          <CodeBlockToolbar
            language="mermaid"
            collapsed={collapsed}
            copied={copied}
            onCopy={onCopy}
            onToggleCollapse={() => setCollapsed((v) => !v)}
            extra={
              editable ? (
                <IconActionButton label="소스 편집" onClick={() => setEditing(true)}>
                  <Code2 size={14} aria-hidden />
                </IconActionButton>
              ) : null
            }
          />
        </Tooltip.Provider>
        <div
          className="haim-mermaid-block__chart"
          dangerouslySetInnerHTML={{ __html: svg }}
          onDoubleClick={() => {
            if (editable) setEditing(true);
          }}
        />
        {hiddenContent}
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper
      as="div"
      className={`haim-code-block${isMermaid ? ' haim-code-block--mermaid-edit' : ''}${
        selected ? ' is-selected' : ''
      }${collapsed ? ' is-collapsed' : ''}`}
      data-language={language || undefined}
    >
      <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
        <CodeBlockToolbar
          language={language || (isMermaid ? 'mermaid' : 'code')}
          collapsed={collapsed}
          copied={copied}
          onCopy={onCopy}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          extra={
            isMermaid && editable && !collapsed ? (
              <IconActionButton
                label={editing || error ? '차트 보기' : '소스 편집'}
                onClick={() => setEditing((v) => !v)}
              >
                {editing || error ? (
                  <Eye size={14} aria-hidden />
                ) : (
                  <Code2 size={14} aria-hidden />
                )}
              </IconActionButton>
            ) : null
          }
        />
      </Tooltip.Provider>
      {collapsed ? (
        hiddenContent
      ) : (
        <>
          {isMermaid && error ? (
            <div className="haim-mermaid-block__error">Mermaid 렌더 실패</div>
          ) : null}
          <div className="haim-code-block__body">
            <HaimLineNumberGutter
              text={source}
              className="haim-code-block__line-numbers"
            />
            <pre className={language ? `language-${language}` : undefined}>
              <NodeViewContent
                as={'code' as 'div'}
                {...(language ? { className: `language-${language}` } : {})}
              />
            </pre>
          </div>
        </>
      )}
    </NodeViewWrapper>
  );
}
