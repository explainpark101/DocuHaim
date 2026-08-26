import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { Table2, Trash2 } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import MobileContextMenuModal from '@/components/shared/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/shared/contextMenu/mobileContextMenuStyles';
import { useMobileContextMenuMode } from '@/hooks/useMobileContextMenuMode';
import { PRESSABLE_CARD_MENU_MS } from '@/components/chatWithMyself/usePressableCardMenu';
import {
  deleteHaimTableBlock,
  resolveHaimTableBlockFromPreview,
  type HaimTableBlock,
} from '@/utils/haimTable';
import { vibrateLongPressAction } from '@/utils/shared/hapticFeedback';

type MenuTarget = {
  table: HTMLTableElement;
  previewRoot: Element;
  x: number;
  y: number;
};

type Props = {
  containerRef: RefObject<HTMLElement | null>;
  getMarkdown: () => string;
  setMarkdown: (next: string) => void;
  /** Open table editor for the preview table. Returns false if unresolved. */
  onEditTable: (table: HTMLTableElement, previewRoot: Element) => boolean;
  onEditFailed?: (() => void) | undefined;
};

const menuContentClass =
  'z-100050 min-w-[168px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const menuItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-800 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-gray-100 dark:text-odp-fg dark:data-[highlighted]:bg-odp-surface';

const menuDangerItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[highlighted]:bg-red-50 dark:text-red-400 dark:data-[highlighted]:bg-red-950/40';

const ICON_XS = 'h-3.5 w-3.5 shrink-0';

/**
 * Preview-pane context menu for markdown tables: edit / delete.
 * Tables are HTML from md-it, so we anchor a DropdownMenu at the pointer.
 */
export function PreviewTableContextMenu({
  containerRef,
  getMarkdown,
  setMarkdown,
  onEditTable,
  onEditFailed,
}: Props) {
  const mobileContextMenu = useMobileContextMenuMode();
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<MenuTarget | null>(null);
  const [pendingDelete, setPendingDelete] = useState<HaimTableBlock | null>(null);
  const targetRef = useRef<MenuTarget | null>(null);
  targetRef.current = target;

  const openAt = useCallback((next: MenuTarget) => {
    setTarget(next);
    setOpen(true);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const previewRootOf = () => root.querySelector('.md-editor-preview');

    const onContextMenu = (event: MouseEvent) => {
      if (
        (event.target as Element | null)?.closest?.(
          '[data-haim-table-resize-handle], [data-haim-table-resize-overlay]',
        )
      ) {
        return;
      }
      const previewRoot = previewRootOf();
      const table = (event.target as Element | null)?.closest?.('table');
      if (!(table instanceof HTMLTableElement) || !previewRoot?.contains(table)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      openAt({
        table,
        previewRoot,
        x: event.clientX,
        y: event.clientY,
      });
    };

    let menuTimer: ReturnType<typeof setTimeout> | null = null;
    let start: { x: number; y: number } | null = null;
    let opened = false;
    let pressTable: HTMLTableElement | null = null;

    const clearPress = () => {
      if (menuTimer) clearTimeout(menuTimer);
      menuTimer = null;
      start = null;
      pressTable = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      const previewRoot = previewRootOf();
      if (!previewRoot) return;
      const table = (event.target as Element | null)?.closest?.('table');
      if (!(table instanceof HTMLTableElement) || !previewRoot.contains(table)) return;
      clearPress();
      opened = false;
      pressTable = table;
      start = { x: event.clientX, y: event.clientY };
      menuTimer = setTimeout(() => {
        opened = true;
        vibrateLongPressAction();
        const pr = previewRootOf();
        if (pressTable && pr) {
          openAt({
            table: pressTable,
            previewRoot: pr,
            x: start?.x ?? event.clientX,
            y: start?.y ?? event.clientY,
          });
        }
      }, PRESSABLE_CARD_MENU_MS);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!start) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (dx * dx + dy * dy > 100) clearPress();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (opened) {
        event.preventDefault();
        event.stopPropagation();
      }
      clearPress();
      opened = false;
    };

    const onContextMenuTouch = (event: MouseEvent) => {
      const previewRoot = previewRootOf();
      const table = (event.target as Element | null)?.closest?.('table');
      if (
        table
        && previewRoot?.contains(table)
        && window.matchMedia('(pointer: coarse)').matches
      ) {
        event.preventDefault();
      }
    };

    root.addEventListener('contextmenu', onContextMenu, true);
    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);
    root.addEventListener('contextmenu', onContextMenuTouch, true);
    return () => {
      clearPress();
      root.removeEventListener('contextmenu', onContextMenu, true);
      root.removeEventListener('pointerdown', onPointerDown);
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('pointercancel', onPointerUp);
      root.removeEventListener('contextmenu', onContextMenuTouch, true);
    };
  }, [containerRef, openAt]);

  const handleEdit = () => {
    const t = targetRef.current;
    if (!t) return;
    const ok = onEditTable(t.table, t.previewRoot);
    if (!ok) onEditFailed?.();
  };

  const requestDelete = () => {
    const t = targetRef.current;
    if (!t) return;
    const block = resolveHaimTableBlockFromPreview(
      getMarkdown(),
      t.table,
      t.previewRoot,
    );
    if (!block) {
      onEditFailed?.();
      return;
    }
    setPendingDelete(block);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const next = deleteHaimTableBlock(getMarkdown(), pendingDelete);
    setMarkdown(next);
    setPendingDelete(null);
  };

  const anchor = target ?? { x: 0, y: 0 };

  const closeMenu = () => {
    setOpen(false);
    setTarget(null);
  };

  const menuItems = (
    <>
      <button
        type="button"
        className={mobileContextMenu ? MOBILE_CONTEXT_MENU_ITEM_CLASS : menuItemClass}
        onClick={() => {
          handleEdit();
          closeMenu();
        }}
      >
        <Table2 className={ICON_XS} aria-hidden />
        표 편집기
      </button>
      <button
        type="button"
        className={mobileContextMenu ? MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS : menuDangerItemClass}
        onClick={() => {
          requestDelete();
          closeMenu();
        }}
      >
        <Trash2 className={ICON_XS} aria-hidden />
        표 삭제
      </button>
    </>
  );

  return (
    <>
      {mobileContextMenu ? (
        <MobileContextMenuModal
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setTarget(null);
          }}
          title="미리보기 표"
          subtitle="마크다운 테이블"
        >
          {menuItems}
        </MobileContextMenuModal>
      ) : (
        <DropdownMenu.Root
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setTarget(null);
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
              <DropdownMenu.Item className={menuItemClass} onSelect={handleEdit}>
                <Table2 className={ICON_XS} aria-hidden />
                표 편집기
              </DropdownMenu.Item>
              <DropdownMenu.Item className={menuDangerItemClass} onSelect={requestDelete}>
                <Trash2 className={ICON_XS} aria-hidden />
                표 삭제
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}

      <ConfirmModal
        isOpen={pendingDelete !== null}
        variant="danger"
        title="표 삭제"
        message="이 표를 마크다운에서 삭제할까요?"
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
