import { useCallback, useEffect, useState } from 'react';
import { useEditor } from 'novel';
import TocResizeHandle from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

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

const NOVEL_TOC_WIDTH_KEY = 's3haim_novel_toc_width';
const NOVEL_TOC_DEFAULT_WIDTH = 224; // 14rem

/** Default body padding class when TOC open (overridden by inline style when width changes). */
export const NOVEL_TOC_MD_PADDING_CLASS = 'md:pr-(--novel-toc-width)';

/**
 * 문서 내 제목을 우측에 표시. 부모는 `position: relative` 여야 한다.
 * 모바일: `open`일 때 우측 고정 드로어 + 백드롭 (`onRequestClose`).
 * @param {{ theme?: string; open?: boolean; onRequestClose?: () => void; mobileOverlayTopPx?: number | null; onWidthChange?: (width: number) => void }} props
 */
export default function NovelEditorToc({
  theme = 'light',
  open = true,
  onRequestClose,
  mobileOverlayTopPx = null,
  onWidthChange,
}) {
  const { editor } = useEditor();
  const [items, setItems] = useState([]);
  const {
    width: tocWidth,
    isResizing: tocResizing,
    handleProps: tocResizeHandleProps,
  } = useResizablePanelWidth({
    storageKey: NOVEL_TOC_WIDTH_KEY,
    defaultWidth: NOVEL_TOC_DEFAULT_WIDTH,
    minWidth: 160,
    collapseBelowWidth: 80,
    maxWidth: 480,
    edge: 'right',
    onCollapseBelowMin: onRequestClose,
  });

  useEffect(() => {
    onWidthChange?.(tocWidth);
  }, [onWidthChange, tocWidth]);

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

  const isNarrow = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

  const handleHeadingClick = (pos) => {
    if (!editor || editor.isDestroyed) return;
    editor.chain().focus().setTextSelection(pos + 1).scrollIntoView().run();
    if (isNarrow()) onRequestClose?.();
  };

  const mobileTopPx =
    typeof mobileOverlayTopPx === 'number' && Number.isFinite(mobileOverlayTopPx)
      ? mobileOverlayTopPx
      : null;
  const mobileBackdropStyle =
    mobileTopPx !== null ? { top: mobileTopPx, left: 0, right: 0, bottom: 0 } : undefined;
  const mobileShellStyle =
    mobileTopPx !== null
      ? { top: mobileTopPx, bottom: 0, width: open ? tocWidth : undefined }
      : open
        ? { width: tocWidth }
        : undefined;

  return (
    <>
      {open && typeof onRequestClose === 'function' && (
        <button
          type="button"
          className={`fixed z-10080 bg-black/35 md:hidden ${
            mobileTopPx !== null ? 'left-0 right-0 bottom-0' : 'inset-0'
          }`}
          style={mobileBackdropStyle}
          aria-label="목차 닫기"
          onClick={onRequestClose}
        />
      )}
      <div
        className={`novel-editor-toc-shell relative max-h-full overflow-hidden ${
          open
            ? `max-md:fixed max-md:right-0 max-md:z-10090 max-md:flex max-md:flex-col max-md:shadow-2xl ${
                mobileTopPx !== null ? 'max-md:bottom-0' : 'max-md:inset-y-0'
              } pointer-events-auto md:absolute md:inset-y-0 md:right-0 md:z-6 md:block`
            : 'max-md:hidden md:absolute md:inset-y-0 md:right-0 md:z-6 md:block md:w-0 md:pointer-events-none'
        }`}
        style={mobileShellStyle}
        aria-hidden={!open}
      >
        <aside
          className={`novel-editor-toc novel-editor-toc-panel relative flex h-full w-full flex-col border-l py-2.5 pl-2.5 pr-1.5 text-base leading-snug ${
            isDark
              ? 'novel-editor-toc--dark border-odp-borderSoft bg-odp-bg/95 text-odp-muted'
              : 'border-gray-200 bg-white/95 text-gray-600'
          }`}
          aria-label="목차"
        >
          {open && (
            <TocResizeHandle
              handleProps={tocResizeHandleProps}
              isResizing={tocResizing}
              visibleOnHover
              label="목차 너비 조절"
              className="hidden md:block"
            />
          )}
          <div
            className={`mb-2 shrink-0 px-0.5 pl-1 text-sm font-semibold uppercase tracking-wide ${
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
                    onClick={() => handleHeadingClick(item.pos)}
                  >
                    {item.text}
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>
    </>
  );
}
