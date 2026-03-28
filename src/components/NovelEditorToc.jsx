import { useCallback, useEffect, useState } from 'react';
import { useEditor } from 'novel';

function extractHeadings(editor) {
  if (!editor || editor.isDestroyed) return [];
  const items = [];
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const text = (node.textContent || '').trim();
      items.push({
        level: node.attrs.level,
        text: text || '(빈 제목)',
        pos,
      });
    }
  });
  return items;
}

/** 우측 목차 패널 너비 — 본문 `NOVEL_TOC_MD_PADDING_CLASS` 와 동일 값 */
export const NOVEL_TOC_WIDTH_CLASS = 'w-[14rem]';
export const NOVEL_TOC_MD_PADDING_CLASS = 'md:pr-[14rem]';

/**
 * 문서 내 제목을 우측에 표시. 부모는 `position: relative` 여야 한다.
 * @param {{ theme?: string; open?: boolean }} props
 */
export default function NovelEditorToc({ theme = 'light', open = true }) {
  const { editor } = useEditor();
  const [items, setItems] = useState([]);

  const refresh = useCallback(() => {
    if (!editor || editor.isDestroyed) {
      setItems([]);
      return;
    }
    setItems(extractHeadings(editor));
  }, [editor]);

  useEffect(() => {
    if (!editor || editor.isDestroyed) return undefined;
    refresh();
    const ed = editor;
    ed.on('update', refresh);
    ed.on('selectionUpdate', refresh);
    return () => {
      ed.off('update', refresh);
      ed.off('selectionUpdate', refresh);
    };
  }, [editor, refresh]);

  if (!editor || editor.isDestroyed) return null;

  const isDark = theme === 'dark';

  return (
    <div
      className={`novel-editor-toc-shell absolute inset-y-0 right-0 z-[6] hidden max-h-full overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none md:block ${
        open ? `${NOVEL_TOC_WIDTH_CLASS} pointer-events-auto` : 'w-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <aside
        className={`novel-editor-toc novel-editor-toc-panel ${NOVEL_TOC_WIDTH_CLASS} flex h-full flex-col border-l py-2.5 pl-2.5 pr-1.5 text-base leading-snug ${
          isDark
            ? 'novel-editor-toc--dark border-odp-borderSoft bg-odp-bg/95 text-odp-muted'
            : 'border-gray-200 bg-white/95 text-gray-600'
        }`}
        aria-label="목차"
      >
      <div
        className={`mb-2 shrink-0 px-0.5 text-sm font-semibold uppercase tracking-wide ${
          isDark ? 'text-odp-fg' : 'text-gray-800'
        }`}
      >
        목차
      </div>
      <ul className="novel-editor-toc-list m-0 max-h-full min-h-0 flex-1 list-none space-y-1 overflow-y-auto p-0 pr-0.5">
        {items.length === 0 ? (
          <li className="px-0.5 text-sm opacity-70">제목 없음</li>
        ) : (
          items.map((item, i) => (
            <li
              key={`${item.pos}-${i}`}
              className="min-w-0"
              style={{ paddingLeft: `${Math.min(item.level - 1, 5) * 0.45}rem` }}
            >
              <button
                type="button"
                className={`w-full max-w-full truncate rounded px-1 py-0.5 text-left text-base transition hover:underline focus:outline-none focus-visible:ring-1 ${
                  isDark
                    ? 'text-odp-fg ring-odp-borderStrong hover:text-white'
                    : 'text-gray-700 ring-gray-300 hover:text-gray-900'
                }`}
                title={item.text}
                onClick={() => {
                  if (!editor || editor.isDestroyed) return;
                  editor.chain().focus().setTextSelection(item.pos + 1).scrollIntoView().run();
                }}
              >
                {item.text}
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
    </div>
  );
}
