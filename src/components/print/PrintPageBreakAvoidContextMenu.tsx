import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { SquareStack, SplitSquareVertical } from 'lucide-react';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import { MOBILE_CONTEXT_MENU_ITEM_CLASS } from '@/components/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { findHaimTableBlocks } from '@/utils/haimTable/parse';
import { resolveHaimTableBlockFromPreview } from '@/utils/haimTable/previewResolve';
import {
  collectCodeFenceTargets,
  hasPageBreakAvoidOnElement,
  isPageBreakAvoidEnabledBefore,
  resolveCodeFenceFromPreview,
  togglePageBreakAvoidForCodeFence,
  togglePageBreakAvoidForTable,
} from '@/utils/pageBreakAvoid';
import { vibrateLongPressAction } from '@/utils/hapticFeedback';

type MenuTarget = {
  kind: 'table' | 'code';
  x: number;
  y: number;
  targetStart: number;
  enabled: boolean;
  label: string;
};

type Props = {
  containerEl: HTMLElement | null;
  containerRef?: RefObject<HTMLElement | null>;
  /** Staging or pages host used to resolve preview tables/code → markdown. */
  previewRootRef: RefObject<HTMLElement | null>;
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
};

const menuPanelClass =
  'fixed z-100050 min-w-[220px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const menuItemClass =
  'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-800 outline-none hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-surface';

const ICON_XS = 'h-3.5 w-3.5 shrink-0';

export default function PrintPageBreakAvoidContextMenu({
  containerEl,
  containerRef,
  previewRootRef,
  getMarkdown,
  setMarkdown,
}: Props) {
  const mobileContextMenu = useMobileContextMenuMode();
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<MenuTarget | null>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setTarget(null);
  }, []);

  const openAt = useCallback((next: MenuTarget) => {
    vibrateLongPressAction();
    setTarget(next);
    setOpen(true);
  }, []);

  useEffect(() => {
    const root = containerEl ?? containerRef?.current ?? null;
    if (!root) return undefined;

    const onContextMenu = (event: MouseEvent) => {
      if (event.ctrlKey) return;
      const eventEl =
        event.target instanceof Element
          ? event.target
          : (event.target as Node | null)?.parentElement;
      if (!eventEl) return;

      const codeEl = eventEl.closest?.('.md-editor-code') as HTMLElement | null;
      const tableEl = eventEl.closest?.('table') as HTMLTableElement | null;
      if (!codeEl && !tableEl) return;
      if (codeEl?.closest?.('.md-editor-mermaid')) return;

      const previewRoot =
        previewRootRef.current
        ?? eventEl.closest?.('[data-export-pdf-pages]')
        ?? eventEl.closest?.('.md-editor-preview')
        ?? null;
      if (!(previewRoot instanceof Element)) return;

      const md = getMarkdown();
      if (tableEl && (previewRoot.contains(tableEl) || tableEl.closest('[data-export-pdf-pages]'))) {
        const stamped = tableEl.getAttribute('data-print-table-index');
        const blocks = findHaimTableBlocks(md);
        const block =
          stamped != null && blocks[Number(stamped)]
            ? blocks[Number(stamped)]!
            : resolveHaimTableBlockFromPreview(md, tableEl, previewRoot);
        if (!block) return;
        event.preventDefault();
        event.stopPropagation();
        const enabled =
          hasPageBreakAvoidOnElement(tableEl)
          || isPageBreakAvoidEnabledBefore(md, block.tableStart);
        openAt({
          kind: 'table',
          x: event.clientX,
          y: event.clientY,
          targetStart: block.tableStart,
          enabled,
          label: '표',
        });
        return;
      }

      if (codeEl && (previewRoot.contains(codeEl) || codeEl.closest('[data-export-pdf-pages]'))) {
        const stamped = codeEl.getAttribute('data-print-code-index');
        const fences = collectCodeFenceTargets(md);
        const fence =
          stamped != null && fences[Number(stamped)]
            ? fences[Number(stamped)]!
            : resolveCodeFenceFromPreview(md, codeEl, previewRoot);
        if (!fence) return;
        event.preventDefault();
        event.stopPropagation();
        const enabled =
          hasPageBreakAvoidOnElement(codeEl)
          || isPageBreakAvoidEnabledBefore(md, fence.index);
        openAt({
          kind: 'code',
          x: event.clientX,
          y: event.clientY,
          targetStart: fence.index,
          enabled,
          label: '코드 블록',
        });
      }
    };

    root.addEventListener('contextmenu', onContextMenu);
    return () => root.removeEventListener('contextmenu', onContextMenu);
  }, [containerEl, containerRef, getMarkdown, openAt, previewRootRef]);

  useEffect(() => {
    if (!open || mobileContextMenu) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const el = event.target instanceof Element ? event.target : null;
      if (el?.closest?.('[data-print-pba-menu="1"]')) return;
      closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('pointerdown', onPointerDown, false);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, false);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, mobileContextMenu, open]);

  const applyToggle = useCallback(() => {
    if (!target) return;
    const md = getMarkdown();
    const nextEnabled = !target.enabled;
    const next =
      target.kind === 'table'
        ? togglePageBreakAvoidForTable(md, target.targetStart, nextEnabled)
        : togglePageBreakAvoidForCodeFence(md, target.targetStart, nextEnabled);
    if (next !== md) setMarkdown(next);
    closeMenu();
  }, [closeMenu, getMarkdown, setMarkdown, target]);

  if (!open || !target) return null;

  const actionLabel = target.enabled
    ? '페이지 나눔 허용 (잘림)'
    : '페이지 나눔 방지';
  const ActionIcon = target.enabled ? SplitSquareVertical : SquareStack;
  const title = target.label;
  const subtitle = target.enabled
    ? '현재: 페이지 나눔 방지 켜짐'
    : '현재: 기본 (페이지에서 잘릴 수 있음)';

  const actionButton = (
    <button
      type="button"
      className={mobileContextMenu ? MOBILE_CONTEXT_MENU_ITEM_CLASS : menuItemClass}
      data-print-pba-action="1"
      onClick={applyToggle}
      onPointerUp={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        applyToggle();
      }}
    >
      <ActionIcon className={ICON_XS} aria-hidden />
      {actionLabel}
    </button>
  );

  if (mobileContextMenu) {
    return (
      <MobileContextMenuModal
        open={open}
        onOpenChange={(next) => {
          if (!next) closeMenu();
        }}
        title={title}
        subtitle={subtitle}
      >
        {actionButton}
      </MobileContextMenuModal>
    );
  }

  return createPortal(
    <div
      data-print-pba-menu="1"
      className={menuPanelClass}
      style={{
        left: Math.min(target.x, window.innerWidth - 240),
        top: Math.min(target.y, window.innerHeight - 80),
      }}
      role="menu"
    >
      {actionButton}
    </div>,
    document.body,
  );
}
