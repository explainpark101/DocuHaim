import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { Scissors, Trash2 } from 'lucide-react';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import {
  headingTargetFromElement,
  insertPgbrBeforeHeadingByText,
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
      headingIndex: number;
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
  containerEl: HTMLElement | null;
  containerRef?: RefObject<HTMLElement | null>;
  paperContentRef: RefObject<HTMLElement | null>;
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
};

const menuPanelClass =
  'fixed z-100050 min-w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const menuItemClass =
  'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-surface';

const menuDangerItemClass =
  'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 outline-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40';

const ICON_XS = 'h-3.5 w-3.5 shrink-0';

function paperPreviewBand(paper: HTMLElement, targetTop: number): PreviewBand {
  const rect = paper.getBoundingClientRect();
  return {
    left: rect.left,
    top: targetTop,
    width: Math.max(1, rect.width),
  };
}

function applyPgbrAction(
  target: MenuTarget,
  getMarkdown: () => string,
  setMarkdown: (next: string) => void,
): boolean {
  const md = getMarkdown();
  const next =
    target.kind === 'heading'
      ? insertPgbrBeforeHeadingByText(
          md,
          target.headingText,
          target.occurrence,
          target.headingIndex,
        )
      : removePgbrByOccurrenceInBody(md, target.occurrence);
  if (!next.updated || next.markdown === md) return false;
  setMarkdown(next.markdown);
  return true;
}

/**
 * Export-PDF page-break context menu (heading insert + existing marker delete only).
 * Plain fixed portal + pointerup on the action (avoids capture-phase dismiss races).
 * Heading insert uses `pdf-ex-heading-N` (1-based mdHeadingId) → markdown-it token map.
 */
export function PrintPgbrContextMenu({
  containerEl,
  containerRef,
  paperContentRef,
  getMarkdown,
  setMarkdown,
}: Props) {
  const mobileContextMenu = useMobileContextMenuMode();
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<MenuTarget | null>(null);
  const [hoverPreview, setHoverPreview] = useState(false);
  const pendingRef = useRef<MenuTarget | null>(null);
  const getMarkdownRef = useRef(getMarkdown);
  const setMarkdownRef = useRef(setMarkdown);
  getMarkdownRef.current = getMarkdown;
  setMarkdownRef.current = setMarkdown;

  const openAt = useCallback((next: MenuTarget) => {
    pendingRef.current = next;
    setTarget(next);
    setHoverPreview(false);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setHoverPreview(false);
    setTarget(null);
    pendingRef.current = null;
  }, []);

  const runAction = useCallback((snapshot: MenuTarget | null) => {
    if (!snapshot) return;
    applyPgbrAction(snapshot, getMarkdownRef.current, setMarkdownRef.current);
    pendingRef.current = null;
    setOpen(false);
    setHoverPreview(false);
    setTarget(null);
  }, []);

  useEffect(() => {
    const root = containerEl ?? containerRef?.current ?? null;
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
      const contentRoot: HTMLElement | null = (() => {
        if (paper && eventEl && paper.contains(eventEl)) return paper;
        const pagesHost = eventEl?.closest?.('[data-export-pdf-pages]');
        if (pagesHost instanceof HTMLElement) return pagesHost;
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

      if (
        (event.target as Element | null)?.closest?.(
          'img[data-wiki-path], img[data-md-src]',
        )
      ) {
        return;
      }

      if ((event.target as Element | null)?.closest?.('table')) {
        return;
      }

      const heading = (event.target as Element | null)?.closest?.(
        'h1, h2, h3, h4, h5, h6',
      );
      if (heading instanceof HTMLElement && contentRoot.contains(heading)) {
        event.preventDefault();
        event.stopPropagation();
        const { text, occurrence, headingIndex } = headingTargetFromElement(
          contentRoot,
          heading,
        );
        const rect = heading.getBoundingClientRect();
        openAt({
          kind: 'heading',
          x: event.clientX,
          y: event.clientY,
          headingText: text || heading.textContent?.trim() || '',
          occurrence,
          headingIndex,
          preview: paperPreviewBand(bandRoot, rect.top),
          label: text || '제목',
        });
      }
    };

    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [containerEl, containerRef, openAt, paperContentRef]);

  // Bubble-phase dismiss so the action button receives pointerup first.
  useEffect(() => {
    if (!open || mobileContextMenu) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const el = event.target instanceof Element ? event.target : null;
      if (el?.closest?.('[data-print-pgbr-menu="1"]')) return;
      closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    // bubble (not capture): action button handlers run first
    window.addEventListener('pointerdown', onPointerDown, false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, false);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, mobileContextMenu, open]);

  const showInsertPreview = Boolean(
    target && target.kind !== 'delete' && hoverPreview && 'preview' in target,
  );

  const onActionPointerUp = (event: ReactPointerEvent) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const snapshot = pendingRef.current ?? target;
    runAction(snapshot);
  };

  const actionButton = target?.kind === 'delete' ? (
    <button
      type="button"
      data-print-pgbr-action="1"
      className={mobileContextMenu ? MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS : menuDangerItemClass}
      onPointerUp={onActionPointerUp}
    >
      <Trash2 className={ICON_XS} aria-hidden />
      페이지 나누기 삭제
    </button>
  ) : (
    <button
      type="button"
      data-print-pgbr-action="1"
      className={mobileContextMenu ? MOBILE_CONTEXT_MENU_ITEM_CLASS : menuItemClass}
      onPointerEnter={() => setHoverPreview(true)}
      onPointerLeave={() => setHoverPreview(false)}
      onPointerUp={onActionPointerUp}
    >
      <Scissors className={ICON_XS} aria-hidden />
      페이지 나누기 삽입
    </button>
  );

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

  const desktopMenu =
    open && target && !mobileContextMenu
      ? createPortal(
          <div
            data-print-pgbr-menu="1"
            className={menuPanelClass}
            style={{
              left: Math.min(target.x, window.innerWidth - 220),
              top: Math.min(target.y, window.innerHeight - 80),
            }}
            role="menu"
          >
            {actionButton}
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
            if (!next) closeMenu();
            else setOpen(true);
          }}
          title={target?.label || '페이지 나누기'}
          subtitle="인쇄 미리보기"
        >
          <div
            data-print-pgbr-menu="1"
            onPointerEnter={() => {
              if (target?.kind !== 'delete') setHoverPreview(true);
            }}
            onPointerLeave={() => setHoverPreview(false)}
          >
            {actionButton}
          </div>
        </MobileContextMenuModal>
      ) : (
        desktopMenu
      )}
    </>
  );
}
