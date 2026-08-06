import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContextMenu } from 'radix-ui';
import { motion as Motion } from 'motion/react';
import {
  ArrowDownToLine,
  ArrowUpToLine,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  FolderPlus,
  Group,
  Lock,
  LockOpen,
  Trash2,
  Ungroup,
} from 'lucide-react';
import {
  bringLayersToFront,
  bringSelectionToFront,
  collectDescendantElementIds,
  coverElementLabel,
  createEmptyGroup,
  deleteLayers,
  ensureLayerTree,
  expandIdsToGroups,
  flattenLayerTree,
  getGroup,
  groupSelectedElements,
  isGroupId,
  isLayerDirectlyLocked,
  moveLayerRelative,
  moveLayerToRoot,
  moveLayerZ,
  renameElement,
  renameGroup,
  sendLayersToBack,
  sendSelectionToBack,
  toggleLayerLocked,
  ungroupElements,
} from '@/utils/noteCover';
import type { NoteCover } from '@/utils/noteCover/types';

const ROOT_DROP_ID = '__cover-layer-root__';

const layerRowBase =
  'flex w-full items-center gap-1 rounded px-1.5 py-1 text-left text-[11px] hover:bg-gray-100 dark:hover:bg-odp-focusBg';
const layerRowActive =
  'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200';

const menuContentClass =
  'z-[10060] min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-[11px] text-gray-800 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';
const menuItemClass =
  'flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg';

type Placement = 'before' | 'after' | 'inside';

export type CoverLayerPanelProps = {
  cover: NoteCover;
  selectedIds: string[];
  onSelectIds: (ids: string[]) => void;
  onChange: (next: NoteCover) => void;
  collapsedGroups: Record<string, boolean>;
  onCollapsedGroupsChange: (next: Record<string, boolean>) => void;
};

const collisionDetection: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args);
  if (pointerHits.length > 0) return pointerHits;
  return closestCenter(args);
};

function resolvePlacement(
  overId: string,
  overIsGroup: boolean,
  overRect: { top: number; height: number } | null,
  pointerY: number | null,
): Placement {
  if (overId === ROOT_DROP_ID) return 'after';
  if (!overRect || pointerY == null) {
    return overIsGroup ? 'inside' : 'before';
  }
  const ratio = (pointerY - overRect.top) / Math.max(1, overRect.height);
  if (overIsGroup) {
    if (ratio < 0.28) return 'before';
    if (ratio > 0.72) return 'after';
    return 'inside';
  }
  return ratio < 0.5 ? 'before' : 'after';
}

function LayerContextMenu({
  children,
  cover,
  targetId,
  kind,
  selectedIds,
  onChange,
  onSelectIds,
}: {
  children: ReactNode;
  cover: NoteCover;
  targetId: string;
  kind: 'group' | 'element';
  selectedIds: string[];
  onChange: (next: NoteCover) => void;
  onSelectIds: (ids: string[]) => void;
}) {
  const tree = ensureLayerTree(cover);
  const memberIds =
    kind === 'group' ? collectDescendantElementIds(tree, targetId) : [targetId];
  const selectionForTarget =
    kind === 'group'
      ? memberIds.length
        ? memberIds
        : []
      : selectedIds.includes(targetId)
        ? selectedIds
        : [targetId];

  const sharedGroup =
    kind === 'group'
      ? targetId
      : tree.elements.find((el) => el.id === targetId)?.groupId ?? null;

  const canGroup = kind === 'element' && selectionForTarget.length >= 1;
  const canUngroup = Boolean(sharedGroup);
  const directlyLocked = isLayerDirectlyLocked(cover, targetId);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className={menuContentClass}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <ContextMenu.Item
            className={menuItemClass}
            onSelect={() => onChange(toggleLayerLocked(cover, targetId))}
          >
            {directlyLocked ? <LockOpen size={14} /> : <Lock size={14} />}
            {directlyLocked ? '잠금 해제' : '잠금'}
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" />
          <ContextMenu.Item
            className={menuItemClass}
            disabled={!canGroup}
            onSelect={() => {
              const result = groupSelectedElements(cover, selectionForTarget);
              if (!result) return;
              onChange(result.cover);
              onSelectIds(
                collectDescendantElementIds(result.cover, result.groupId),
              );
            }}
          >
            <Group size={14} />
            그룹
          </ContextMenu.Item>
          <ContextMenu.Item
            className={menuItemClass}
            disabled={!canUngroup}
            onSelect={() => {
              if (!sharedGroup) return;
              onChange(ungroupElements(cover, sharedGroup));
            }}
          >
            <Ungroup size={14} />
            그룹 해제
          </ContextMenu.Item>
          <ContextMenu.Item
            className={menuItemClass}
            onSelect={() => {
              const created = createEmptyGroup(cover);
              onChange(created.cover);
            }}
          >
            <FolderPlus size={14} />
            새 그룹
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" />
          <ContextMenu.Item
            className={menuItemClass}
            disabled={kind === 'group' ? false : selectionForTarget.length === 0}
            onSelect={() => {
              if (kind === 'group') {
                onChange(bringLayersToFront(cover, [targetId]));
                return;
              }
              onChange(bringSelectionToFront(cover, selectionForTarget));
            }}
          >
            <ArrowUpToLine size={14} />
            맨 앞으로
          </ContextMenu.Item>
          <ContextMenu.Item
            className={menuItemClass}
            onSelect={() => {
              if (kind === 'group') {
                onChange(sendLayersToBack(cover, [targetId]));
                return;
              }
              onChange(sendSelectionToBack(cover, selectionForTarget));
            }}
          >
            <ArrowDownToLine size={14} />
            맨 뒤로
          </ContextMenu.Item>
          <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" />
          <ContextMenu.Item
            className={`${menuItemClass} text-red-600 dark:text-red-400`}
            onSelect={() => {
              if (kind === 'group') {
                onChange(deleteLayers(cover, [targetId]));
              } else {
                onChange(deleteElementsForIds(cover, selectionForTarget));
              }
              onSelectIds([]);
            }}
          >
            <Trash2 size={14} />
            삭제
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}

function deleteElementsForIds(cover: NoteCover, ids: string[]): NoteCover {
  return deleteLayers(cover, ids);
}

type SortableRowProps = {
  id: string;
  kind: 'group' | 'element';
  depth: number;
  cover: NoteCover;
  selectedIds: string[];
  selectedSet: Set<string>;
  collapsed: boolean;
  dropHint: Placement | null;
  onToggleCollapse: () => void;
  onSelectElement: (id: string, e: MouseEvent) => void;
  onSelectGroup: (groupId: string, e: MouseEvent) => void;
  onChange: (next: NoteCover) => void;
  onSelectIds: (ids: string[]) => void;
};

function SortableLayerRow({
  id,
  kind,
  depth,
  cover,
  selectedIds,
  selectedSet,
  collapsed,
  dropHint,
  onToggleCollapse,
  onSelectElement,
  onSelectGroup,
  onChange,
  onSelectIds,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { kind } });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    paddingLeft: `${6 + depth * 12}px`,
  };

  const tree = ensureLayerTree(cover);
  const group = kind === 'group' ? getGroup(tree, id) : null;
  const element =
    kind === 'element' ? tree.elements.find((el) => el.id === id) : null;
  const memberIds =
    kind === 'group' ? collectDescendantElementIds(tree, id) : [];
  const groupSelected =
    kind === 'group' &&
    memberIds.length > 0 &&
    memberIds.every((mid) => selectedSet.has(mid));
  const groupPartial =
    kind === 'group' &&
    !groupSelected &&
    memberIds.some((mid) => selectedSet.has(mid));
  const elementActive = kind === 'element' && selectedSet.has(id);
  const directlyLocked = isLayerDirectlyLocked(cover, id);

  const rowClass = `${layerRowBase} relative ${
    kind === 'group'
      ? groupSelected
        ? layerRowActive
        : groupPartial
          ? 'bg-blue-50/50 dark:bg-blue-950/20'
          : ''
      : elementActive
        ? layerRowActive
        : ''
  } ${directlyLocked ? 'ring-1 ring-inset ring-yellow-400/80' : ''}`;

  const lockToggle = (
    <span
      role="button"
      tabIndex={-1}
      className={`shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong ${
        directlyLocked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'
      }`}
      title={directlyLocked ? '잠금 해제' : '잠금'}
      aria-label={directlyLocked ? '잠금 해제' : '잠금'}
      onClick={(e) => {
        e.stopPropagation();
        onChange(toggleLayerLocked(cover, id));
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {directlyLocked ? <Lock size={12} /> : <LockOpen size={12} />}
    </span>
  );

  const indicator =
    dropHint === 'before' ? (
      <div className="pointer-events-none absolute inset-x-1 -top-0.5 z-10 h-0.5 rounded bg-blue-500" />
    ) : dropHint === 'after' ? (
      <div className="pointer-events-none absolute inset-x-1 -bottom-0.5 z-10 h-0.5 rounded bg-blue-500" />
    ) : dropHint === 'inside' ? (
      <div className="pointer-events-none absolute inset-0 z-10 rounded ring-2 ring-inset ring-blue-400/70" />
    ) : null;

  const body =
    kind === 'group' && group ? (
      <div
        ref={setNodeRef}
        style={style}
        className={rowClass}
        {...attributes}
        {...listeners}
      >
        {indicator}
        <button
          type="button"
          className="shrink-0 rounded p-0.5 hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={collapsed ? '그룹 펼치기' : '그룹 접기'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
        </button>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1"
          onClick={(e) => onSelectGroup(id, e)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <FolderOpen size={12} className="shrink-0 opacity-70" />
          <span
            className="truncate font-medium"
            onDoubleClick={(e) => {
              e.stopPropagation();
              const next = window.prompt('그룹 이름', group.name);
              if (next == null) return;
              onChange(renameGroup(cover, id, next));
            }}
          >
            {group.name}
          </span>
          <span className="shrink-0 text-[9px] text-gray-400">
            {memberIds.length}
          </span>
        </button>
        {lockToggle}
      </div>
    ) : element ? (
      <button
        ref={setNodeRef}
        type="button"
        style={style}
        className={rowClass}
        aria-selected={elementActive}
        onClick={(e) => onSelectElement(id, e)}
        onDoubleClick={(e) => {
          e.stopPropagation();
          const next = window.prompt('레이어 이름', coverElementLabel(element));
          if (next == null) return;
          onChange(renameElement(cover, id, next));
        }}
        {...attributes}
        {...listeners}
        role="option"
      >
        {indicator}
        <span className="w-3 shrink-0 text-center text-[10px] opacity-60">
          {element.type === 'text' ? 'T' : element.type === 'image' ? 'I' : 'S'}
        </span>
        <span className="min-w-0 flex-1 truncate">{coverElementLabel(element)}</span>
        {lockToggle}
        {selectedIds.length === 1 && selectedIds[0] === id ? (
          <span className="flex shrink-0 gap-0.5">
            <span
              role="button"
              tabIndex={-1}
              className="rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
              onClick={(e) => {
                e.stopPropagation();
                onChange(moveLayerZ(cover, id, 1));
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              ↑
            </span>
            <span
              role="button"
              tabIndex={-1}
              className="rounded px-1 text-[9px] hover:bg-gray-200 dark:hover:bg-odp-borderStrong"
              onClick={(e) => {
                e.stopPropagation();
                onChange(moveLayerZ(cover, id, -1));
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              ↓
            </span>
          </span>
        ) : null}
      </button>
    ) : null;

  if (!body) return null;

  return (
    <LayerContextMenu
      cover={cover}
      targetId={id}
      kind={kind}
      selectedIds={selectedIds}
      onChange={onChange}
      onSelectIds={onSelectIds}
    >
      <Motion.div layout transition={{ duration: 0.18, ease: 'easeOut' }}>
        {body}
      </Motion.div>
    </LayerContextMenu>
  );
}

function RootDropPad({ active }: { active: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: ROOT_DROP_ID });
  return (
    <div
      ref={setNodeRef}
      className={`mt-1 min-h-8 rounded border border-dashed px-2 py-2 text-center text-[9px] transition-colors ${
        isOver || active
          ? 'border-blue-400 bg-blue-50/60 text-blue-600 dark:bg-blue-950/30'
          : 'border-gray-200 text-gray-400 dark:border-odp-borderStrong'
      }`}
      aria-label="루트로 이동"
    >
      루트로 빼내기
    </div>
  );
}

export default function CoverLayerPanel({
  cover,
  selectedIds,
  onSelectIds,
  onChange,
  collapsedGroups,
  onCollapsedGroupsChange,
}: CoverLayerPanelProps) {
  const tree = useMemo(() => ensureLayerTree(cover), [cover]);
  const flat = useMemo(
    () => flattenLayerTree(tree, collapsedGroups),
    [tree, collapsedGroups],
  );
  const sortableIds = useMemo(() => flat.map((f) => f.id), [flat]);
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectionAnchorIdRef = useRef<string | null>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Placement>('before');
  const pointerYRef = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const elementIdsForLayerItem = (itemId: string, altKey: boolean): string[] => {
    if (isGroupId(tree, itemId)) {
      return collectDescendantElementIds(cover, itemId);
    }
    return altKey ? [itemId] : expandIdsToGroups(cover, [itemId]);
  };

  const selectRangeBetween = (fromLayerId: string, toLayerId: string, altKey: boolean) => {
    const a = flat.findIndex((f) => f.id === fromLayerId);
    const b = flat.findIndex((f) => f.id === toLayerId);
    if (a < 0 || b < 0) {
      onSelectIds(elementIdsForLayerItem(toLayerId, altKey));
      return;
    }
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const ids: string[] = [];
    for (let i = lo; i <= hi; i += 1) {
      const item = flat[i];
      if (!item) continue;
      ids.push(...elementIdsForLayerItem(item.id, altKey));
    }
    onSelectIds([...new Set(ids)]);
  };

  const selectElement = (id: string, event: MouseEvent) => {
    event.preventDefault();
    if (event.shiftKey && selectionAnchorIdRef.current) {
      selectRangeBetween(selectionAnchorIdRef.current, id, event.altKey);
      return;
    }
    const targetIds = elementIdsForLayerItem(id, event.altKey);
    if (event.metaKey || event.ctrlKey) {
      const allSelected = targetIds.every((tid) => selectedSet.has(tid));
      if (allSelected) {
        const remove = new Set(targetIds);
        onSelectIds(selectedIds.filter((x) => !remove.has(x)));
      } else {
        onSelectIds([...new Set([...selectedIds, ...targetIds])]);
      }
      return;
    }
    selectionAnchorIdRef.current = id;
    onSelectIds(targetIds);
  };

  const selectGroup = (groupId: string, event: MouseEvent) => {
    event.preventDefault();
    if (event.shiftKey && selectionAnchorIdRef.current) {
      selectRangeBetween(selectionAnchorIdRef.current, groupId, event.altKey);
      return;
    }
    const memberIds = collectDescendantElementIds(cover, groupId);
    if (event.metaKey || event.ctrlKey) {
      const next = new Set(selectedIds);
      const allSelected =
        memberIds.length > 0 && memberIds.every((mid) => next.has(mid));
      if (allSelected) memberIds.forEach((mid) => next.delete(mid));
      else memberIds.forEach((mid) => next.add(mid));
      onSelectIds([...next]);
      return;
    }
    selectionAnchorIdRef.current = groupId;
    onSelectIds(memberIds);
  };

  const updateDropHint = (event: DragMoveEvent | DragEndEvent) => {
    const over = event.over;
    if (!over) {
      setOverId(null);
      return;
    }
    const oid = String(over.id);
    setOverId(oid);
    const overIsGroup = oid !== ROOT_DROP_ID && isGroupId(tree, oid);
    const rect = over.rect;
    setPlacement(
      resolvePlacement(
        oid,
        overIsGroup,
        rect ? { top: rect.top, height: rect.height } : null,
        pointerYRef.current,
      ),
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const translated = event.active.rect.current.translated;
    if (translated) {
      pointerYRef.current = translated.top + translated.height / 2;
    }
    updateDropHint(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const active = String(event.active.id);
    const over = event.over ? String(event.over.id) : null;
    let nextPlacement = placement;
    setActiveId(null);
    setOverId(null);
    pointerYRef.current = null;

    if (!over || active === over) return;

    if (over === ROOT_DROP_ID) {
      onChange(moveLayerToRoot(cover, active, 'end'));
      return;
    }

    const overIsGroup = isGroupId(tree, over);
    const rect = event.over?.rect;
    if (rect) {
      const y =
        event.active.rect.current.translated != null
          ? event.active.rect.current.translated.top +
            event.active.rect.current.translated.height / 2
          : null;
      nextPlacement = resolvePlacement(
        over,
        overIsGroup,
        { top: rect.top, height: rect.height },
        y,
      );
    }

    onChange(moveLayerRelative(cover, active, over, nextPlacement));
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
    pointerYRef.current = null;
  };

  const activeItem = activeId
    ? (flat.find((f) => f.id === activeId) ?? null)
    : null;
  const activeLabel = (() => {
    if (!activeItem) return '';
    if (activeItem.kind === 'group') {
      return getGroup(tree, activeItem.id)?.name ?? '그룹';
    }
    const el = tree.elements.find((e) => e.id === activeItem.id);
    return el ? coverElementLabel(el) : '';
  })();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        className="max-h-72 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 bg-white p-1 dark:border-odp-borderStrong dark:bg-odp-bg"
        role="listbox"
        aria-label="표지 레이어"
        aria-multiselectable
      >
        {flat.length === 0 ? (
          <p className="px-2 py-3 text-center text-[10px] text-gray-400">
            레이어 없음
          </p>
        ) : (
          <SortableContext
            items={sortableIds}
            strategy={verticalListSortingStrategy}
          >
            {flat.map((item) => (
              <SortableLayerRow
                key={item.id}
                id={item.id}
                kind={item.kind}
                depth={item.depth}
                cover={tree}
                selectedIds={selectedIds}
                selectedSet={selectedSet}
                collapsed={Boolean(collapsedGroups[item.id])}
                dropHint={
                  activeId && overId === item.id && activeId !== item.id
                    ? placement
                    : null
                }
                onToggleCollapse={() =>
                  onCollapsedGroupsChange({
                    ...collapsedGroups,
                    [item.id]: !collapsedGroups[item.id],
                  })
                }
                onSelectElement={selectElement}
                onSelectGroup={selectGroup}
                onChange={onChange}
                onSelectIds={onSelectIds}
              />
            ))}
          </SortableContext>
        )}
        <RootDropPad active={Boolean(activeId && overId === ROOT_DROP_ID)} />
      </div>

      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <Motion.div
            initial={{ scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)' }}
            animate={{
              scale: 1.03,
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
            }}
            className={`${layerRowBase} ${layerRowActive} cursor-grabbing border border-blue-200 bg-white dark:border-blue-800 dark:bg-odp-surface`}
          >
            <span className="truncate px-1">{activeLabel}</span>
          </Motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
