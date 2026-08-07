import { useMemo, type ReactNode } from 'react';
import { ContextMenu, Select } from 'radix-ui';
import {
  AdaptiveMenuItem,
  AdaptiveMenuSeparator,
  AdaptiveMenuSurfaceProvider,
} from '@/components/contextMenu/AdaptiveContextMenu';
import {
  AlignCenter,
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignLeft,
  AlignRight,
  AlignStartHorizontal,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpToLine,
  Check,
  ChevronDown,
  Crop,
  Group,
  Lock,
  LockOpen,
  Ratio,
  RotateCcw,
  Trash2,
  Ungroup,
} from 'lucide-react';
import ChatImageBackgroundPicker, {
  CHAT_COLOR_PICKER_ATTR,
} from '@/components/chatWithMyself/ChatImageBackgroundPicker';
import {
  chatMenuContentClass,
  chatMenuDangerItemClass,
  chatMenuItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import FontFamilyInput from '@/components/FontFamilyInput';
import NumberStepControls from '@/components/NumberStepControls';
import SliderWithScrubInput from '@/components/SliderWithScrubInput';
import {
  buildFontFamilyOptions,
  COVER_FONT_WEIGHT_OPTIONS,
  coverFontWeightToSelectValue,
  selectValueToCoverFontWeight,
} from '@/utils/fontOptions';
import {
  alignCoverElements,
  bringSelectionToFront,
  canAlignCoverSelection,
  filterUnlockedElementIds,
  gapPxToFramePct,
  groupSelectedElements,
  isCoverShapeElement,
  isElementEffectivelyLocked,
  isGroupId,
  isLayerDirectlyLocked,
  collectDescendantElementIds,
  nudgeSelectionZ,
  selectionToLayerIds,
  sendSelectionToBack,
  setLayerLocked,
  ungroupElements,
} from '@/utils/noteCover';
import type {
  CoverAlign,
  CoverBorderStyle,
  CoverElement,
  CoverImageElement,
  CoverShapeElement,
  CoverTextAlign,
  CoverTextElement,
  CoverTextVAlign,
  NoteCover,
} from '@/utils/noteCover/types';
import type { CoverObjectAlign } from '@/utils/noteCover/align';

const wideMenuContentClass =
  `${chatMenuContentClass} z-100010 w-[min(92vw,300px)] max-h-[min(80vh,640px)] overflow-y-auto p-1.5`;

const selectContentClass =
  'z-100050 max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const selectItemClass =
  'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg';

const selectTriggerClass =
  'inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg';

const iconBtnClass =
  'inline-flex h-8 flex-1 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg dark:hover:bg-odp-focusBg';

const iconBtnActiveClass =
  'border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-200';

const sectionLabelClass = 'mb-1 px-0.5 text-[10px] font-medium text-gray-400';

function patchElement(cover: NoteCover, id: string, patch: Partial<CoverElement>): NoteCover {
  return {
    ...cover,
    elements: cover.elements.map((el) => {
      if (el.id !== id) return el;
      return { ...el, ...patch } as CoverElement;
    }),
  };
}

function MenuSep() {
  return <AdaptiveMenuSeparator />;
}

function MenuLabel({ children }: { children: ReactNode }) {
  return <div className={sectionLabelClass}>{children}</div>;
}

function TextAlignRow({
  value,
  onChange,
  disabled,
}: {
  value: CoverAlign | CoverTextAlign;
  onChange: (v: CoverAlign) => void;
  disabled?: boolean;
}) {
  const items: { id: CoverAlign; icon: typeof AlignLeft; label: string }[] = [
    { id: 'left', icon: AlignLeft, label: '왼쪽' },
    { id: 'center', icon: AlignCenter, label: '가운데' },
    { id: 'right', icon: AlignRight, label: '오른쪽' },
  ];
  return (
    <div className="flex gap-1">
      {items.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          type="button"
          title={label}
          disabled={disabled}
          className={`${iconBtnClass} ${value === id ? iconBtnActiveClass : ''}`}
          onClick={() => onChange(id)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

function ShapePlacementGrid({
  textAlign,
  textVAlign,
  onTextAlignChange,
  onTextVAlignChange,
  disabled,
}: {
  textAlign: CoverTextAlign;
  textVAlign: CoverTextVAlign;
  onTextAlignChange: (v: CoverTextAlign) => void;
  onTextVAlignChange: (v: CoverTextVAlign) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {(
        [
          ['left', AlignStartVertical, () => onTextAlignChange('left')],
          ['center', AlignCenterVertical, () => onTextAlignChange('center')],
          ['right', AlignEndVertical, () => onTextAlignChange('right')],
          ['top', AlignStartHorizontal, () => onTextVAlignChange('top')],
          ['middle', AlignCenterHorizontal, () => onTextVAlignChange('middle')],
          ['bottom', AlignEndHorizontal, () => onTextVAlignChange('bottom')],
        ] as const
      ).map(([key, Icon, onClick]) => {
        const active =
          key === 'left' || key === 'center' || key === 'right'
            ? textAlign === key
            : textVAlign === key;
        return (
          <button
            key={key}
            type="button"
            disabled={disabled}
            className={`${iconBtnClass} ${active ? iconBtnActiveClass : ''}`}
            onClick={onClick}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}

function ObjectAlignGrid({
  disabled,
  onAlign,
}: {
  disabled: boolean;
  onAlign: (mode: CoverObjectAlign) => void;
}) {
  const items: { mode: CoverObjectAlign; tip: string; Icon: typeof AlignLeft }[] = [
    { mode: 'left', tip: '왼쪽 정렬', Icon: AlignStartVertical },
    { mode: 'centerX', tip: '가로 가운데', Icon: AlignCenterVertical },
    { mode: 'right', tip: '오른쪽 정렬', Icon: AlignEndVertical },
    { mode: 'distributeX', tip: '가로 간격 분배', Icon: AlignHorizontalDistributeCenter },
    { mode: 'top', tip: '위쪽 정렬', Icon: AlignStartHorizontal },
    { mode: 'centerY', tip: '세로 가운데', Icon: AlignCenterHorizontal },
    { mode: 'bottom', tip: '아래쪽 정렬', Icon: AlignEndHorizontal },
    { mode: 'distributeY', tip: '세로 간격 분배', Icon: AlignVerticalDistributeCenter },
  ];
  return (
    <div className="grid grid-cols-4 gap-1">
      {items.map(({ mode, tip, Icon }) => (
        <button
          key={mode}
          type="button"
          title={tip}
          disabled={disabled}
          className={iconBtnClass}
          onClick={() => onAlign(mode)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}

function FontWeightSelect({
  value,
  onChange,
  disabled = false,
  ariaLabel,
}: {
  value: number | 'bold' | 'normal' | undefined;
  onChange: (next: ReturnType<typeof selectValueToCoverFontWeight>) => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <Select.Root
      value={coverFontWeightToSelectValue(value)}
      onValueChange={(v) => onChange(selectValueToCoverFontWeight(v))}
      disabled={disabled}
    >
      <Select.Trigger aria-label={ariaLabel} className={selectTriggerClass}>
        <Select.Value />
        <Select.Icon className="text-gray-500">
          <ChevronDown size={14} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={selectContentClass} position="popper" sideOffset={4}>
          <Select.Viewport className="p-1">
            {COVER_FONT_WEIGHT_OPTIONS.map((opt) => (
              <Select.Item key={opt.value} value={opt.value} className={selectItemClass}>
                <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                  <Check size={12} />
                </Select.ItemIndicator>
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

function TextStylePanel({
  cover,
  el,
  onChange,
  disabled,
}: {
  cover: NoteCover;
  el: CoverTextElement;
  onChange: (next: NoteCover) => void;
  disabled: boolean;
}) {
  const fontFamilyOptions = useMemo(() => buildFontFamilyOptions(), []);
  return (
    <div
      className="flex flex-col gap-2 px-1 py-1"
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <MenuLabel>텍스트</MenuLabel>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-400">글자 크기</span>
        <NumberStepControls
          min={6}
          max={400}
          step={1}
          suffix="px"
          value={el.fontSize}
          resetValue={36}
          aria-label="글자 크기"
          decreaseLabel="글자 크기 줄이기"
          increaseLabel="글자 크기 키우기"
          onChange={(fontSize) => {
            if (disabled) return;
            onChange(patchElement(cover, el.id, { fontSize }));
          }}
        />
      </div>
      <label className="block space-y-1">
        <span className="text-[10px] text-gray-400">폰트</span>
        <FontFamilyInput
          id={`cover-ctx-text-font-${el.id}`}
          value={el.fontFamily || ''}
          options={fontFamilyOptions}
          placeholder="예: Paperozi, sans-serif"
          inputClassName="!px-2 !py-1 !text-xs"
          onChange={(v) => {
            if (disabled) return;
            const trimmed = v.trim();
            onChange({
              ...cover,
              elements: cover.elements.map((item) => {
                if (item.id !== el.id || item.type !== 'text') return item;
                const next = { ...item };
                if (trimmed) next.fontFamily = trimmed;
                else delete next.fontFamily;
                return next;
              }),
            });
          }}
        />
      </label>
      <div className="space-y-1">
        <span className="text-[10px] text-gray-400">굵기</span>
        <FontWeightSelect
          value={el.fontWeight}
          ariaLabel="폰트 굵기"
          disabled={disabled}
          onChange={(fontWeight) =>
            onChange(patchElement(cover, el.id, { fontWeight }))
          }
        />
      </div>
      <div>
        <div className="mb-1 text-[10px] text-gray-400">텍스트 정렬</div>
        <TextAlignRow
          value={el.textAlign}
          disabled={disabled}
          onChange={(textAlign) =>
            onChange(patchElement(cover, el.id, { textAlign }))
          }
        />
      </div>
      <ChatImageBackgroundPicker
        value={el.color}
        allowNone={false}
        label="글자색"
        compact
        onChange={(color) => {
          if (disabled) return;
          onChange(patchElement(cover, el.id, { color: color || '#111111' }));
        }}
      />
    </div>
  );
}

function ShapeStylePanel({
  cover,
  el,
  onChange,
  disabled,
}: {
  cover: NoteCover;
  el: CoverShapeElement;
  onChange: (next: NoteCover) => void;
  disabled: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-2 px-1 py-1"
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <MenuLabel>도형</MenuLabel>
      <ChatImageBackgroundPicker
        value={el.fill}
        allowNone
        label="채우기"
        compact
        onChange={(fill) => {
          if (disabled) return;
          onChange(patchElement(cover, el.id, { fill: fill || 'transparent' }));
        }}
      />
      <ChatImageBackgroundPicker
        value={el.borderColor}
        allowNone
        label="테두리 색"
        compact
        onChange={(borderColor) => {
          if (disabled) return;
          onChange(
            patchElement(cover, el.id, {
              borderColor: borderColor || 'transparent',
            }),
          );
        }}
      />
      <label className="block space-y-1">
        <span className="text-[10px] text-gray-400">테두리 두께</span>
        <SliderWithScrubInput
          unit="css"
          suffix="px"
          min={0}
          max={40}
          step={1}
          value={el.borderWidth}
          aria-label="테두리 두께"
          onChange={(borderWidth) => {
            if (disabled) return;
            onChange(patchElement(cover, el.id, { borderWidth }));
          }}
        />
      </label>
      <div className="space-y-1">
        <span className="text-[10px] text-gray-400">테두리 스타일</span>
        <Select.Root
          value={el.borderStyle}
          disabled={disabled}
          onValueChange={(value) => {
            if (value !== 'solid' && value !== 'dashed' && value !== 'dotted') return;
            onChange(
              patchElement(cover, el.id, {
                borderStyle: value as CoverBorderStyle,
              }),
            );
          }}
        >
          <Select.Trigger aria-label="테두리 스타일" className={selectTriggerClass}>
            <Select.Value />
            <Select.Icon className="text-gray-500">
              <ChevronDown size={14} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={selectContentClass} position="popper" sideOffset={4}>
              <Select.Viewport className="p-1">
                {(
                  [
                    { value: 'solid', label: '실선' },
                    { value: 'dashed', label: '파선' },
                    { value: 'dotted', label: '점선' },
                  ] as const
                ).map((opt) => (
                  <Select.Item key={opt.value} value={opt.value} className={selectItemClass}>
                    <Select.ItemIndicator className="absolute left-1.5 inline-flex items-center">
                      <Check size={12} />
                    </Select.ItemIndicator>
                    <Select.ItemText>{opt.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      {el.type === 'roundRect' ? (
        <label className="block space-y-1">
          <span className="text-[10px] text-gray-400">모서리 둥글기</span>
          <SliderWithScrubInput
            unit="percent"
            suffix="%"
            min={0}
            max={50}
            step={1}
            value={el.cornerRadiusPct ?? 4}
            aria-label="모서리 둥글기"
            onChange={(cornerRadiusPct) => {
              if (disabled) return;
              onChange(patchElement(cover, el.id, { cornerRadiusPct }));
            }}
          />
        </label>
      ) : null}
      <label className="block space-y-1">
        <span className="text-[10px] text-gray-400">도형 안 텍스트</span>
        <textarea
          className="min-h-14 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
          value={el.text ?? ''}
          placeholder="선택 사항"
          disabled={disabled}
          onChange={(e) =>
            onChange(patchElement(cover, el.id, { text: e.target.value }))
          }
        />
      </label>
      <label className="block space-y-1">
        <span className="text-[10px] text-gray-400">안쪽 여백</span>
        <SliderWithScrubInput
          unit="percent"
          suffix="%"
          min={0}
          max={40}
          step={1}
          value={el.paddingPct ?? 0}
          aria-label="도형 안쪽 여백"
          onChange={(paddingPct) => {
            if (disabled) return;
            onChange(patchElement(cover, el.id, { paddingPct }));
          }}
        />
      </label>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-gray-400">글자 크기</span>
        <NumberStepControls
          min={6}
          max={400}
          step={1}
          suffix="px"
          value={el.fontSize ?? 24}
          resetValue={24}
          aria-label="도형 글자 크기"
          decreaseLabel="글자 크기 줄이기"
          increaseLabel="글자 크기 키우기"
          onChange={(fontSize) => {
            if (disabled) return;
            onChange(patchElement(cover, el.id, { fontSize }));
          }}
        />
      </div>
      <div className="space-y-1">
        <span className="text-[10px] text-gray-400">굵기</span>
        <FontWeightSelect
          value={el.fontWeight ?? 'normal'}
          ariaLabel="도형 글자 굵기"
          disabled={disabled}
          onChange={(fontWeight) =>
            onChange(patchElement(cover, el.id, { fontWeight }))
          }
        />
      </div>
      <div>
        <div className="mb-1 text-[10px] text-gray-400">텍스트 위치</div>
        <ShapePlacementGrid
          textAlign={el.textAlign ?? 'center'}
          textVAlign={el.textVAlign ?? 'middle'}
          disabled={disabled}
          onTextAlignChange={(textAlign) =>
            onChange(patchElement(cover, el.id, { textAlign }))
          }
          onTextVAlignChange={(textVAlign) =>
            onChange(patchElement(cover, el.id, { textVAlign }))
          }
        />
      </div>
      <ChatImageBackgroundPicker
        value={el.color ?? '#111111'}
        allowNone={false}
        label="글자색"
        compact
        onChange={(color) => {
          if (disabled) return;
          onChange(patchElement(cover, el.id, { color: color || '#111111' }));
        }}
      />
    </div>
  );
}

function toggleSelectionLock(cover: NoteCover, ids: ReadonlyArray<string>): NoteCover {
  const units = selectionToLayerIds(cover, ids);
  const list = units.length ? units : [...ids];
  if (!list.length) return cover;
  const shouldLock = list.some((id) => !isLayerDirectlyLocked(cover, id));
  let next = cover;
  for (const id of list) {
    next = setLayerLocked(next, id, shouldLock);
  }
  return next;
}

function selectionHasDirectLock(cover: NoteCover, ids: ReadonlyArray<string>): boolean {
  const units = selectionToLayerIds(cover, ids);
  const list = units.length ? units : [...ids];
  return list.length > 0 && list.every((id) => isLayerDirectlyLocked(cover, id));
}

export type CoverCanvasContextMenuContentProps = {
  cover: NoteCover;
  /** Element that received the context-menu event. */
  targetId: string;
  selectedIds: string[];
  onChange: (next: NoteCover) => void;
  onSelectIds: (ids: string[]) => void;
  onRequestDelete: (ids: string[]) => void;
  onImageCrop?: (el: CoverImageElement) => void;
  onRestoreImageAspect?: (id: string) => void;
  onToggleImageLockAspect?: (id: string) => void;
};

/**
 * Canvas context menu body for cover elements.
 * Kind depends on selection (group / multi / text / shape / image).
 */
export function CoverCanvasContextMenuBody({
  cover,
  targetId,
  selectedIds,
  onChange,
  onSelectIds,
  onRequestDelete,
  onImageCrop,
  onRestoreImageAspect,
  onToggleImageLockAspect,
}: CoverCanvasContextMenuContentProps) {
  const effectiveIds = selectedIds.includes(targetId) ? selectedIds : [targetId];
  const layerIds = selectionToLayerIds(cover, effectiveIds);
  const soleGroupId =
    layerIds.length === 1 && isGroupId(cover, layerIds[0]!)
      ? layerIds[0]!
      : null;
  const isMulti = effectiveIds.length > 1 && !soleGroupId;
  const isGroup = Boolean(soleGroupId);
  const single =
    effectiveIds.length === 1
      ? (cover.elements.find((el) => el.id === effectiveIds[0]) ?? null)
      : null;

  const lockedForEdit =
    effectiveIds.length > 0
    && effectiveIds.every((id) => {
      const el = cover.elements.find((e) => e.id === id);
      return el ? isElementEffectivelyLocked(cover, el) : true;
    });
  const lockLabelOn = selectionHasDirectLock(cover, effectiveIds);

  const alignCapability = canAlignCoverSelection(cover, effectiveIds);
  const canObjectAlign = alignCapability.enabled;

  const applyAlign = (mode: CoverObjectAlign) => {
    const alignIds = filterUnlockedElementIds(cover, effectiveIds);
    if (!alignIds.length) return;
    const frame = document.querySelector<HTMLElement>('[data-cover-frame="1"]');
    const rect = frame?.getBoundingClientRect();
    const axisPx =
      mode === 'distributeX' ? (rect?.width ?? 0) : (rect?.height ?? 0);
    const gapFramePct = gapPxToFramePct(cover.layout.gapPx, axisPx);
    if (soleGroupId) {
      onChange(
        alignCoverElements(cover, alignIds, mode, gapFramePct, {
          insideGroupId: soleGroupId,
        }),
      );
      return;
    }
    onChange(alignCoverElements(cover, alignIds, mode, gapFramePct));
  };

  const canGroup = (() => {
    if (effectiveIds.length < 1) return false;
    if (soleGroupId) return false;
    return true;
  })();

  return (
    <>
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        onSelect={() => {
          if (!selectedIds.includes(targetId)) onSelectIds(effectiveIds);
          onChange(toggleSelectionLock(cover, effectiveIds));
        }}
      >
        {lockLabelOn ? (
          <LockOpen size={16} className="shrink-0" />
        ) : (
          <Lock size={16} className="shrink-0" />
        )}
        {lockLabelOn ? '잠금 해제' : '잠금'}
      </AdaptiveMenuItem>

      {isGroup ? (
        <>
          <AdaptiveMenuItem
            className={chatMenuItemClass}
            onSelect={() => {
              if (!soleGroupId) return;
              onChange(ungroupElements(cover, soleGroupId));
            }}
          >
            <Ungroup size={16} className="shrink-0" />
            그룹 해제
          </AdaptiveMenuItem>
          <MenuSep />
          <div className="px-1 py-1" onPointerDown={(e) => e.stopPropagation()}>
            <MenuLabel>정렬</MenuLabel>
            <ObjectAlignGrid disabled={!canObjectAlign} onAlign={applyAlign} />
          </div>
        </>
      ) : null}

      {isMulti ? (
        <>
          <AdaptiveMenuItem
            className={chatMenuItemClass}
            disabled={!canGroup}
            onSelect={() => {
              const result = groupSelectedElements(cover, effectiveIds);
              if (!result) return;
              onChange(result.cover);
              onSelectIds(collectDescendantElementIds(result.cover, result.groupId));
            }}
          >
            <Group size={16} className="shrink-0" />
            그룹화
          </AdaptiveMenuItem>
          <MenuSep />
          <div className="px-1 py-1" onPointerDown={(e) => e.stopPropagation()}>
            <MenuLabel>개체 정렬</MenuLabel>
            <ObjectAlignGrid disabled={!canObjectAlign} onAlign={applyAlign} />
          </div>
        </>
      ) : null}

      {single?.type === 'text' ? (
        <>
          <MenuSep />
          <TextStylePanel
            cover={cover}
            el={single}
            onChange={onChange}
            disabled={lockedForEdit}
          />
        </>
      ) : null}

      {single && isCoverShapeElement(single) ? (
        <>
          <MenuSep />
          <ShapeStylePanel
            cover={cover}
            el={single}
            onChange={onChange}
            disabled={lockedForEdit}
          />
        </>
      ) : null}

      {single?.type === 'image' ? (
        <>
          <MenuSep />
          <AdaptiveMenuItem
            className={chatMenuItemClass}
            disabled={lockedForEdit}
            onSelect={() => onImageCrop?.(single)}
          >
            <Crop size={16} className="shrink-0" />
            자르기
          </AdaptiveMenuItem>
          <AdaptiveMenuItem
            className={chatMenuItemClass}
            disabled={lockedForEdit || !single.naturalAspect}
            onSelect={() => onRestoreImageAspect?.(single.id)}
          >
            <RotateCcw size={16} className="shrink-0" />
            원본 비율로 되돌리기
          </AdaptiveMenuItem>
          <AdaptiveMenuItem
            className={chatMenuItemClass}
            disabled={lockedForEdit}
            onSelect={() => onToggleImageLockAspect?.(single.id)}
          >
            <Ratio size={16} className="shrink-0" />
            {single.lockAspect ? '무조건 비율 유지 해제' : '무조건 비율 유지'}
          </AdaptiveMenuItem>
        </>
      ) : null}

      <MenuSep />
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        disabled={lockedForEdit}
        onSelect={() => onChange(nudgeSelectionZ(cover, effectiveIds, 1))}
      >
        <ArrowUp size={16} className="shrink-0" />
        앞으로
      </AdaptiveMenuItem>
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        disabled={lockedForEdit}
        onSelect={() => onChange(nudgeSelectionZ(cover, effectiveIds, -1))}
      >
        <ArrowDown size={16} className="shrink-0" />
        뒤로
      </AdaptiveMenuItem>
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        disabled={lockedForEdit}
        onSelect={() => onChange(bringSelectionToFront(cover, effectiveIds))}
      >
        <ArrowUpToLine size={16} className="shrink-0" />
        맨 앞으로
      </AdaptiveMenuItem>
      <AdaptiveMenuItem
        className={chatMenuItemClass}
        disabled={lockedForEdit}
        onSelect={() => onChange(sendSelectionToBack(cover, effectiveIds))}
      >
        <ArrowDownToLine size={16} className="shrink-0" />
        맨 뒤로
      </AdaptiveMenuItem>
      <MenuSep />
      <AdaptiveMenuItem
        className={chatMenuDangerItemClass}
        danger
        onSelect={() => {
          if (!selectedIds.includes(targetId)) onSelectIds(effectiveIds);
          onRequestDelete(effectiveIds);
        }}
      >
        <Trash2 size={16} className="shrink-0" />
        삭제
      </AdaptiveMenuItem>
    </>
  );
}

export default function CoverCanvasContextMenuContent(
  props: CoverCanvasContextMenuContentProps,
) {
  return (
    <ContextMenu.Content
      className={wideMenuContentClass}
      onCloseAutoFocus={(e) => e.preventDefault()}
      onPointerDownOutside={(e) => {
        const t = e.target;
        if (t instanceof Element && t.closest(`[${CHAT_COLOR_PICKER_ATTR}]`)) {
          e.preventDefault();
        }
      }}
      onInteractOutside={(e) => {
        const t = e.target;
        if (t instanceof Element && t.closest(`[${CHAT_COLOR_PICKER_ATTR}]`)) {
          e.preventDefault();
        }
      }}
    >
      <AdaptiveMenuSurfaceProvider surface="desktop">
        <CoverCanvasContextMenuBody {...props} />
      </AdaptiveMenuSurfaceProvider>
    </ContextMenu.Content>
  );
}
