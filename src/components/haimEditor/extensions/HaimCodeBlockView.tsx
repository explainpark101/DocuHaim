import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  NodeViewContent,
  NodeViewWrapper,
  type NodeViewProps,
} from '@tiptap/react';
import { Check, ChevronDown, ChevronUp, Code2, Copy, Eye, Search } from 'lucide-react';
import { Popover, Tooltip } from 'radix-ui';
import HaimLineNumberGutter from '@/components/haimEditor/HaimLineNumberGutter';
import {
  HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE,
  buildHaimCodeBlockLanguageOptions,
  filterHaimCodeBlockLanguageOptions,
  haimCodeBlockLanguageDisplayLabel,
  languageAttrFromSelectValue,
  selectValueFromLanguageAttr,
} from '@/components/haimEditor/haimCodeBlockLanguages';
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

const langPopoverContentClass =
  'z-100010 flex w-[min(92vw,16rem)] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const langOptionClass =
  'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted=true]:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg dark:data-[highlighted=true]:bg-odp-focusBg';

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

/**
 * Compact language trigger + searchable Popover (filter + optional custom fence id).
 */
function CodeBlockLanguageSelect({
  language,
  onChange,
}: {
  language: string;
  onChange: (next: string | null) => void;
}) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);

  const options = buildHaimCodeBlockLanguageOptions(language);
  const value = selectValueFromLanguageAttr(language);
  const displayLabel = haimCodeBlockLanguageDisplayLabel(language);
  const filtered = filterHaimCodeBlockLanguageOptions(options, query);

  const trimmedQuery = query.trim();
  const queryAsValue =
    trimmedQuery.toLowerCase() === 'plain'
      ? HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE
      : trimmedQuery;
  const showCustom =
    Boolean(trimmedQuery) &&
    !filtered.some(
      (opt) =>
        opt.value.toLowerCase() === queryAsValue.toLowerCase() ||
        opt.label.toLowerCase() === trimmedQuery.toLowerCase(),
    );

  const rows = showCustom
    ? [
        { value: queryAsValue, label: trimmedQuery, custom: true as const },
        ...filtered.map((o) => ({ ...o, custom: false as const })),
      ]
    : filtered.map((o) => ({ ...o, custom: false as const }));

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setHighlight(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  const commit = useCallback(
    (nextValue: string) => {
      onChange(languageAttrFromSelectValue(nextValue));
      setOpen(false);
    },
    [onChange],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!rows.length) return;
      setHighlight((i) => (i + 1) % rows.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!rows.length) return;
      setHighlight((i) => (i - 1 + rows.length) % rows.length);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const row = rows[highlight] ?? rows[0];
      if (row) commit(row.value);
      else if (trimmedQuery) commit(queryAsValue);
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="haim-code-block__lang-trigger"
              aria-label="코드 언어"
              aria-haspopup="listbox"
              aria-expanded={open}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <span className="haim-code-block__lang-label">{displayLabel}</span>
              <span className="haim-code-block__lang-chevron">
                <ChevronDown size={12} aria-hidden />
              </span>
            </button>
          </Popover.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={6} className={tooltipContentClass}>
            언어 검색
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Popover.Portal>
        <Popover.Content
          className={langPopoverContentClass}
          side="bottom"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5 border-b border-gray-200 px-2 py-1.5 dark:border-odp-borderStrong">
            <Search size={12} className="shrink-0 text-gray-400" aria-hidden />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="언어 검색…"
              aria-label="코드 언어 검색"
              aria-controls={listId}
              aria-autocomplete="list"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            aria-label="코드 언어"
            className="max-h-56 overflow-y-auto p-1"
          >
            {rows.length === 0 ? (
              <li className="cursor-default px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted">
                일치하는 언어가 없습니다.
              </li>
            ) : (
              rows.map((row, index) => {
                const selected = row.value === value;
                const highlighted = index === highlight;
                return (
                  <li key={`${row.custom ? 'custom:' : ''}${row.value}`} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      data-highlighted={highlighted ? 'true' : 'false'}
                      className={langOptionClass}
                      onMouseEnter={() => setHighlight(index)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => commit(row.value)}
                    >
                      {selected ? (
                        <span className="absolute left-1.5 inline-flex items-center">
                          <Check size={12} aria-hidden />
                        </span>
                      ) : null}
                      {row.custom ? (
                        <span>
                          사용: <span className="font-mono">{row.label}</span>
                        </span>
                      ) : (
                        row.label
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function CodeBlockToolbar({
  language,
  collapsed,
  copied,
  editable,
  onCopy,
  onToggleCollapse,
  onLanguageChange,
  extra,
}: {
  language: string;
  collapsed: boolean;
  copied: boolean;
  editable: boolean;
  onCopy: () => void;
  onToggleCollapse: () => void;
  onLanguageChange?: (next: string | null) => void;
  extra?: ReactNode;
}) {
  return (
    <div className="haim-code-block__header">
      {editable && onLanguageChange ? (
        <CodeBlockLanguageSelect language={language} onChange={onLanguageChange} />
      ) : (
        <span className="haim-code-block__lang">{language || 'plain'}</span>
      )}
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
 * Header exposes language picker (when editable), copy, and fold/unfold.
 */
export default function HaimCodeBlockView({
  node,
  editor,
  selected,
  updateAttributes,
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
  const codePreRef = useRef<HTMLPreElement | null>(null);

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

  const onLanguageChange = useCallback(
    (next: string | null) => {
      updateAttributes({ language: next });
      if (!isMermaidLanguage(next)) {
        setEditing(false);
        setSvg(null);
        setError(false);
      }
    },
    [updateAttributes],
  );

  const hiddenContent = (
    <pre className="haim-mermaid-block__source-hidden" aria-hidden>
      <NodeViewContent as={'code' as 'div'} />
    </pre>
  );

  const toolbar = (
    <CodeBlockToolbar
      language={language}
      collapsed={collapsed}
      copied={copied}
      editable={editable}
      onCopy={onCopy}
      onToggleCollapse={() => setCollapsed((v) => !v)}
      onLanguageChange={editable ? onLanguageChange : undefined}
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
  );

  if (isMermaid && !editing && svg && !collapsed) {
    return (
      <NodeViewWrapper
        as="div"
        className={`haim-code-block haim-mermaid-block${selected ? ' is-selected' : ''}`}
        data-language="mermaid"
      >
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          {toolbar}
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
        {toolbar}
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
              contentRootRef={codePreRef}
            />
            <pre
              ref={codePreRef}
              className={language ? `language-${language}` : undefined}
            >
              {/*
                white-space is driven by html[data-haim-code-wrap] CSS
                (TipTap NodeViewContent defaults to inline pre-wrap).
              */}
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
