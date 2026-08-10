import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { DropdownMenu } from 'radix-ui';
import { Scissors, Trash2 } from 'lucide-react';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { getVisualLineAtPoint } from '@/utils/printVisualLinePgbr';
import {
  headingTextOccurrenceInRoot,
  insertPgbrBeforeHeadingByText,
  insertPgbrBeforeHrInBody,
  insertPgbrBeforeVisualLineInBody,
  removePgbrByOccurrenceInBody,
} from '@/utils/printPgbrInsert';

type PreviewBand = {
  left: number;
  top: number;
  width: number;
};

type MenuTarget =
  | {
      kind: 'heading';
      x: number;
      y: number;
      headingText: string;
      occurrence: number;
      preview: PreviewBand;
      label: string;
    }
  | {
      kind: 'line';
      x: number;
      y: number;
      lineText: string;
      occurrence: number;
      preview: PreviewBand;
      label: string;
    }
  | {
      kind: 'hr';
      x: number;
      y: number;
      hrIndex: number;
      preview: PreviewBand;
      label: string;
    }
  | {
      kind: 'delete';
      x: number;
      y: number;
      occurrence: number;
      label: string;
    };

type Props = {
  /** Scroll/stage root that receives contextmenu (may be outside paper). */
  containerRef: RefObject<HTMLElement | null>;
  /** Paper body that contains MdPreview headings / lines. */
  paperContentRef: RefObject<HTMLElement | null>;
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
};

const menuContentClass =
  'z-100050 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const menuItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface';

const menuDangerItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40';

const ICON_XS = 'h-3.5 w-3.5 shrink-0';

function paperPreviewBand(paper: HTMLElement, targetTop: number): PreviewBand {
  const rect = paper.getBoundingClientRect();
  return {
    left: rect.left,
    top: targetTop,
    width: Math.max(1, rect.width),
  };
}

/**
 * Export-PDF page-break context menu: insert / delete `<pgbr/>`.
 * Hovering the insert item shows a page-split preview band above the target.
 */
export function PrintPgbrContextMenu({
  containerRef,
  paperContentRef,
  getMarkdown,
  setMarkdown,
}: Props) {
  const mobileContextMenu = useMobileContextMenuMode();
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<MenuTarget | null>(null);
  const [hoverPreview, setHoverPreview] = useState(false);
  const targetRef = useRef<MenuTarget | null>(null);
  targetRef.current = target;

  const openAt = useCallback((next: MenuTarget) => {
    setTarget(next);
    setHoverPreview(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const isCoverContextMenu = (event: MouseEvent) => {
      const COVER_SEL = '.export-pdf-cover, [data-cover-slide], [data-cover-el], [data-cover-shape]';
      if ((event.target as Element | null)?.closest?.(COVER_SEL)) return true;
      const top = document.elementFromPoint(event.clientX, event.clientY);
      if (top?.closest?.(COVER_SEL)) return true;
      for (const cover of root.querySelectorAll(COVER_SEL)) {
        const rect = cover.getBoundingClientRect();
        if (
          event.clientX >= rect.left
          && event.clientX <= rect.right
          && event.clientY >= rect.top
          && event.clientY <= rect.bottom
        ) {
          return true;
        }
      }
      return false;
    };

    const onContextMenu = (event: MouseEvent) => {
      if (isCoverContextMenu(event)) return;
      if (event.ctrlKey) return;

      const paper = paperContentRef.current;
      const eventEl =
        event.target instanceof Element
          ? event.target
          : (event.target as Node | null)?.parentElement;
      // Live scroll uses paperContentRef; flip/2-up stage uses cloned preview DOM.
      const contentRoot: HTMLElement | null = (() => {
        if (paper && eventEl && paper.contains(eventEl)) return paper;
        const preview =
          eventEl?.closest?.('.md-editor-preview')
          ?? eventEl?.closest?.('[data-export-pdf-preview]');
        return preview instanceof HTMLElement ? preview : paper;
      })();
      if (!contentRoot) return;

      const bandRoot = paper && paper.clientWidth > 0 ? paper : contentRoot;

      const pgbr = (event.target as Element | null)?.closest?.(
        '.md-pgbr[data-md-pgbr="1"], .md-pgbr',
      );
      if (pgbr && contentRoot.contains(pgbr)) {
        event.preventDefault();
        event.stopPropagation();
        const pgbrs = [
          ...contentRoot.querySelectorAll('.md-pgbr[data-md-pgbr="1"], .md-pgbr'),
        ];
        const occurrence = pgbrs.findIndex((el) => el === pgbr);
        if (occurrence < 0) return;
        openAt({
          kind: 'delete',
          x: event.clientX,
          y: event.clientY,
          occurrence,
          label: '페이지 나누기',
        });
        return;
      }

      // Images keep their own modal flow (handled elsewhere).
      if (
        (event.target as Element | null)?.closest?.(
          'img[data-wiki-path], img[data-md-src]',
        )
      ) {
        return;
      }

      // Tables keep PreviewTableContextMenu.
      if ((event.target as Element | null)?.closest?.('table')) {
        return;
      }

      const heading = (event.target as Element | null)?.closest?.(
        'h1, h2, h3, h4, h5, h6',
      );
      if (heading instanceof HTMLElement && contentRoot.contains(heading)) {
        event.preventDefault();
        event.stopPropagation();
        const { text, occurrence } = headingTextOccurrenceInRoot(contentRoot, heading);
        if (!text) return;
        const rect = heading.getBoundingClientRect();
        openAt({
          kind: 'heading',
          x: event.clientX,
          y: event.clientY,
          headingText: text,
          occurrence,
          preview: paperPreviewBand(bandRoot, rect.top),
          label: text,
        });
        return;
      }

      const hr = (event.target as Element | null)?.closest?.('hr');
      if (hr instanceof HTMLElement && contentRoot.contains(hr)) {
        event.preventDefault();
        event.stopPropagation();
        const hrs = [...contentRoot.querySelectorAll('hr')];
        const hrIndex = hrs.findIndex((el) => el === hr);
        if (hrIndex < 0) return;
        const rect = hr.getBoundingClientRect();
        openAt({
          kind: 'hr',
          x: event.clientX,
          y: event.clientY,
          hrIndex,
          preview: paperPreviewBand(bandRoot, rect.top),
          label: '구분선',
        });
        return;
      }

      if (!(event.target instanceof Node) || !contentRoot.contains(event.target)) {
        return;
      }
      const visualLine = getVisualLineAtPoint(
        contentRoot,
        event.clientX,
        event.clientY,
      );
      if (!visualLine?.lineText) return;
      event.preventDefault();
      event.stopPropagation();
      openAt({
        kind: 'line',
        x: event.clientX,
        y: event.clientY,
        lineText: visualLine.lineText,
        occurrence: visualLine.occurrence,
        preview: paperPreviewBand(bandRoot, visualLine.top),
        label: visualLine.lineText,
      });
    };

    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [containerRef, openAt, paperContentRef]);

  const closeMenu = () => {
    setOpen(false);
    setTarget(null);
    setHoverPreview(false);
  };

  const handleInsert = () => {
    const t = targetRef.current;
    if (!t || t.kind === 'delete') return;
    const md = getMarkdown();
    let next: { markdown: string; updated: boolean };
    if (t.kind === 'heading') {
      next = insertPgbrBeforeHeadingByText(md, t.headingText, t.occurrence);
    } else if (t.kind === 'hr') {
      next = insertPgbrBeforeHrInBody(md, t.hrIndex);
    } else {
      next = insertPgbrBeforeVisualLineInBody(md, t.lineText, t.occurrence);
    }
    if (next.updated) setMarkdown(next.markdown);
    closeMenu();
  };

  const handleDelete = () => {
    const t = targetRef.current;
    if (!t || t.kind !== 'delete') return;
    const next = removePgbrByOccurrenceInBody(getMarkdown(), t.occurrence);
    if (next.updated) setMarkdown(next.markdown);
    closeMenu();
  };

  const showInsertPreview = target?.kind !== 'delete' && hoverPreview && target?.preview;
  const anchor = target ?? { x: 0, y: 0 };

  const insertItemDesktop = (
    <DropdownMenu.Item
      className={menuItemClass}
      onPointerEnter={() => setHoverPreview(true)}
      onPointerLeave={() => setHoverPreview(false)}
      onSelect={() => handleInsert()}
    >
      <Scissors className={ICON_XS} aria-hidden />
      페이지 나누기 삽입
    </DropdownMenu.Item>
  );

  const deleteItemDesktop = (
    <DropdownMenu.Item
      className={menuDangerItemClass}
      onSelect={() => handleDelete()}
    >
      <Trash2 className={ICON_XS} aria-hidden />
      페이지 나누기 삭제
    </DropdownMenu.Item>
  );

  const insertItemMobile = (
    <button
      type="button"
      className={MOBILE_CONTEXT_MENU_ITEM_CLASS}
      onPointerEnter={() => setHoverPreview(true)}
      onPointerLeave={() => setHoverPreview(false)}
      onClick={() => handleInsert()}
    >
      <Scissors className={ICON_XS} aria-hidden />
      페이지 나누기 삽입
    </button>
  );

  const deleteItemMobile = (
    <button
      type="button"
      className={MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS}
      onClick={() => handleDelete()}
    >
      <Trash2 className={ICON_XS} aria-hidden />
      페이지 나누기 삭제
    </button>
  );

  const menuItems = target?.kind === 'delete'
    ? (mobileContextMenu ? deleteItemMobile : deleteItemDesktop)
    : (mobileContextMenu ? insertItemMobile : insertItemDesktop);

  const previewPortal =
    showInsertPreview && target && 'preview' in target
      ? createPortal(
          <div
            className="pointer-events-none fixed z-100040 print:hidden"
            style={{
              left: target.preview.left,
              top: Math.max(0, target.preview.top - 1),
              width: target.preview.width,
            }}
            aria-hidden
          >
            <div
              className="border-t-2 border-dashed border-red-500 bg-red-500/10"
              style={{ height: 12 }}
            />
            <div className="mt-0.5 inline-block rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm">
              페이지 분할 미리보기
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {previewPortal}
      {mobileContextMenu ? (
        <MobileContextMenuModal
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) {
              setTarget(null);
              setHoverPreview(false);
            }
          }}
          title={target?.label || '페이지 나누기'}
          subtitle="인쇄 미리보기"
        >
          <div
            onPointerEnter={() => {
              if (target?.kind !== 'delete') setHoverPreview(true);
            }}
            onPointerLeave={() => setHoverPreview(false)}
          >
            {menuItems}
          </div>
        </MobileContextMenuModal>
      ) : (
        <DropdownMenu.Root
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) {
              setTarget(null);
              setHoverPreview(false);
            }
          }}
          modal
        >
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              className="pointer-events-none fixed h-px w-px opacity-0"
              style={{ left: anchor.x, top: anchor.y }}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={menuContentClass}
              side="bottom"
              align="start"
              sideOffset={2}
              collisionPadding={12}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              {menuItems}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </>
  );
}
