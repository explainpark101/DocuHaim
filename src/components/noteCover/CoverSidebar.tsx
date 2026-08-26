import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentType,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { Checkbox, Switch, Tooltip, Select } from 'radix-ui';
import {
  AlignCenter,
  AlignCenterVertical,
  AlignEndHorizontal,
  AlignEndVertical,
  AlignHorizontalDistributeCenter,
  AlignCenterHorizontal,
  AlignLeft,
  AlignRight,
  AlignStartVertical,
  AlignVerticalDistributeCenter,
  ArrowDownToLine,
  ArrowUpToLine,
  Check,
  ChevronDown,
  FolderPlus,
  Group,
  Image,
  ImagePlus,
  Keyboard,
  LayoutList,
  MousePointer2,
  Redo2,
  Settings2,
  Trash2,
  Type,
  Undo2,
  Ungroup,
  AlignStartHorizontal,
  Circle,
  PanelLeftOpen,
  PanelLeftClose,
  Square,
  Squircle,
} from 'lucide-react';
import ChatImageBackgroundPicker from '@/components/chatWithMyself/ChatImageBackgroundPicker';
import FontFamilyInput from '@/components/editor/FontFamilyInput';
import Kbd, { KbdChord, getAltKeyLabel, getModKeyLabel } from '@/components/Kbd';
import { ConfirmModal } from '@/components/shared/modals/ConfirmModal';
import NumberStepControls from '@/components/NumberStepControls';
import SliderWithScrubInput from '@/components/SliderWithScrubInput';
import {
  COVER_CENTER_SNAP_TOLERANCE_DEFAULT,
  COVER_OBJECT_SNAP_TOLERANCE_DEFAULT,
} from '@/utils/noteCover/snapSettings';
import TocResizeHandleJs from '@/components/print/TocResizeHandle';
import CoverLayerPanel from '@/components/noteCover/CoverLayerPanel';
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
  collectDescendantElementIds,
  coverElementLabel,
  createEmptyGroup,
  deleteElements,
  deleteLayers,
  filterUnlockedElementIds,
  layerIdsIncludeLocked,
  groupSelectedElements,
  isCoverShapeElement,
  isGroupId,
  restackElementsByGap,
  gapPxToFramePct,
  selectionToLayerIds,
  sendSelectionToBack,
  ungroupElements,
  withCoverLayout,
  type CoverObjectAlign,
  type CoverPlaceMode,
} from '@/utils/noteCover';
import type {
  CoverAlign,
  CoverBorderStyle,
  CoverElement,
  CoverShapeType,
  CoverTextAlign,
  CoverTextVAlign,
  CoverTextElement,
  NoteCover,
} from '@/utils/noteCover/types';
import { uploadPrintEditorImage } from '@/utils/print/printEditorImageUpload';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';

const TocResizeHandle = TocResizeHandleJs as unknown as ComponentType<{
  edge?: 'left' | 'right';
  handleProps?: Record<string, unknown>;
  isResizing?: boolean;
  visibleOnHover?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}>;

export const COVER_SIDEBAR_WIDTH_KEY = 's3haim_cover_sidebar_width';
export const COVER_SIDEBAR_DEFAULT_WIDTH = 300;
export const COVER_LAYERS_SIDEBAR_WIDTH_KEY = 's3haim_cover_layers_sidebar_width';
export const COVER_LAYERS_SIDEBAR_DEFAULT_WIDTH = 280;
export const COVER_LAYERS_DETACHED_KEY = 's3haim_cover_layers_detached';

type PrintFile = {
  type?: string | null;
  id?: string | null;
};

type CoverSidebarProps = {
  cover: NoteCover;
  selectedIds: string[];
  onSelectIds: (ids: string[]) => void;
  onChange: (next: NoteCover) => void;
  currentFile?: PrintFile | null;
  topPx?: number;
  width: number;
  isResizing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resizeHandleProps?: Record<string, any>;
  layersDetached: boolean;
  onLayersDetachedChange: (detached: boolean) => void;
  layersWidth: number;
  layersIsResizing?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layersResizeHandleProps?: Record<string, any>;
  centerSnapEnabled?: boolean;
  onCenterSnapEnabledChange?: (enabled: boolean) => void;
  /** Pixel distance for page-center snap. */
  centerSnapTolerance?: number;
  onCenterSnapToleranceChange?: (value: number) => void;
  objectSnapEnabled?: boolean;
  onObjectSnapEnabledChange?: (enabled: boolean) => void;
  /** Pixel distance for object edge/center snap. */
  objectSnapTolerance?: number;
  onObjectSnapToleranceChange?: (value: number) => void;
  textContainerOutlineEnabled?: boolean;
  onTextContainerOutlineEnabledChange?: (enabled: boolean) => void;
  placePreviewEnabled?: boolean;
  onPlacePreviewEnabledChange?: (enabled: boolean) => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  placeMode?: CoverPlaceMode;
  onPlaceModeChange?: (mode: CoverPlaceMode) => void;
  className?: string;
};

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');
const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

const labelClass = 'text-[11px] font-medium text-gray-500 dark:text-odp-fgMuted';
const btnClass =
  'inline-flex items-center justify-center gap-1 rounded-md border border-gray-300 px-2 py-1.5 text-[11px] text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg';
const iconBtnClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg';
const btnActiveClass =
  'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-200';
const tooltipContentClass =
  'z-[10050] max-w-[220px] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

type SectionId = 'settings' | 'shortcuts' | 'layers' | 'background' | 'selection';

const DEFAULT_SECTION_OPEN: Record<SectionId, boolean> = {
  settings: false,
  shortcuts: false,
  layers: true,
  background: true,
  selection: true,
};

function CoverShortcutItem({
  keys,
  children,
}: {
  keys: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1.5 rounded-md border border-gray-200/80 bg-gray-50/90 px-2.5 py-2 dark:border-odp-borderStrong/60 dark:bg-odp-focusBg/45">
      <div className="flex max-w-full flex-wrap items-center gap-x-1 gap-y-1.5">{keys}</div>
      <p className="text-[11px] font-medium leading-snug text-ink dark:text-odp-fgStrong">
        {children}
      </p>
    </li>
  );
}

function CoverShortcutOr() {
  return (
    <span className="shrink-0 px-0.5 text-xs text-gray-400 dark:text-odp-muted" aria-hidden>
      /
    </span>
  );
}

function CoverShortcutsList() {
  const mod = getModKeyLabel();
  const alt = getAltKeyLabel();
  return (
    <ul className="flex flex-col gap-5" aria-label="표지 편집 단축키">
      <CoverShortcutItem keys={<Kbd>드래그</Kbd>}>빈 곳을 드래그해 영역 선택</CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[mod, 'G']} />}>선택한 요소 그룹</CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[mod, 'Shift', 'G']} />}>
        그룹 해제
      </CoverShortcutItem>
      <CoverShortcutItem
        keys={
          <>
            <KbdChord keys={[alt, '드래그']} />
            <CoverShortcutOr />
            <KbdChord keys={[mod, '드래그']} />
          </>
        }
      >
        복제하며 이동
      </CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={['Shift', '클릭']} />}>
        다중 선택 (Mod+클릭과 동일)
      </CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={['Shift', '드래그']} />}>
        축 고정 이동 · 크기 조절 시 중심 기준
      </CoverShortcutItem>
      <CoverShortcutItem
        keys={
          <>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </>
        }
      >
        이동 (기본 10px)
      </CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[alt, '화살표']} />}>미세 이동</CoverShortcutItem>
      <CoverShortcutItem
        keys={
          <>
            <KbdChord keys={['Shift', '화살표']} />
            <CoverShortcutOr />
            <KbdChord keys={[mod, '화살표']} />
          </>
        }
      >
        크게 이동
      </CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[alt, 'L']} />}>텍스트 왼쪽 정렬</CoverShortcutItem>
      <CoverShortcutItem
        keys={
          <>
            <KbdChord keys={[alt, 'M']} />
            <CoverShortcutOr />
            <KbdChord keys={[alt, 'E']} />
          </>
        }
      >
        텍스트 가운데 정렬
      </CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[alt, 'R']} />}>텍스트 오른쪽 정렬</CoverShortcutItem>
      <CoverShortcutItem keys={<KbdChord keys={[mod, 'Z']} />}>실행 취소</CoverShortcutItem>
      <CoverShortcutItem
        keys={
          <>
            <KbdChord keys={[mod, 'Shift', 'Z']} />
            <CoverShortcutOr />
            <KbdChord keys={[mod, 'Y']} />
          </>
        }
      >
        다시 실행
      </CoverShortcutItem>
    </ul>
  );
}

function TipButton({
  tip,
  children,
  className = '',
  disabled,
  onClick,
  pressed,
  type = 'button',
}: {
  tip: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  pressed?: boolean;
  type?: 'button';
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type={type}
          className={className}
          disabled={disabled}
          onClick={onClick}
          aria-label={tip}
          aria-pressed={pressed}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
          {tip}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function CollapsibleSection({
  title,
  open,
  onToggle,
  children,
  headerRight,
  icon: Icon,
  titleClassName,
  iconClassName,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  headerRight?: ReactNode;
  icon?: ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;
  titleClassName?: string;
  iconClassName?: string;
}) {
  return (
    <section className="border-b border-gray-200 dark:border-odp-borderSoft">
      <div className="flex items-center gap-1 px-2 py-1.5">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-1.5 rounded px-1 py-1 text-left hover:bg-gray-100 dark:hover:bg-odp-focusBg"
              onClick={onToggle}
              aria-expanded={open}
              aria-label={open ? `${title} 접기` : `${title} 펼치기`}
            >
              {Icon ? (
                <Icon
                  size={14}
                  className={
                    iconClassName ?? 'shrink-0 text-gray-700 dark:text-odp-fgStrong'
                  }
                  aria-hidden
                />
              ) : null}
              <span
                className={
                  titleClassName ??
                  'truncate text-[11px] font-semibold tracking-wide text-gray-800 dark:text-odp-fgStrong'
                }
              >
                {title}
              </span>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
              {open ? `${title} 접기` : `${title} 펼치기`}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        {headerRight}
        <TipButton
          tip={open ? `${title} 접기` : `${title} 펼치기`}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-gray-700 hover:bg-gray-100 dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          onClick={onToggle}
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ease-out ${
              open ? 'rotate-0' : '-rotate-90'
            }`}
            aria-hidden
          />
        </TipButton>
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-2 px-3 pb-3" aria-hidden={!open}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function patchElement(cover: NoteCover, id: string, patch: Partial<CoverElement>): NoteCover {
  return {
    ...cover,
    elements: cover.elements.map((el) => {
      if (el.id !== id) return el;
      return { ...el, ...patch } as CoverElement;
    }),
  };
}

function AlignButtons({
  value,
  onChange,
}: {
  value: CoverAlign | CoverTextAlign;
  onChange: (v: CoverAlign) => void;
}) {
  const items: { id: CoverAlign; icon: typeof AlignLeft; label: string }[] = [
    { id: 'left', icon: AlignLeft, label: '왼쪽 정렬 (Alt+L)' },
    { id: 'center', icon: AlignCenter, label: '가운데 정렬 (Alt+M / Alt+E)' },
    { id: 'right', icon: AlignRight, label: '오른쪽 정렬 (Alt+R)' },
  ];
  return (
    <div className="flex gap-1">
      {items.map(({ id, icon: Icon, label }) => (
        <TipButton
          key={id}
          tip={label}
          className={`${btnClass} flex-1 ${value === id ? btnActiveClass : ''}`}
          pressed={value === id}
          onClick={() => onChange(id)}
        >
          <Icon size={14} />
        </TipButton>
      ))}
    </div>
  );
}

/** Same icons as object-align (no distribute): H + V placement for in-shape text. */
function ShapeTextPlacementButtons({
  textAlign,
  textVAlign,
  onTextAlignChange,
  onTextVAlignChange,
}: {
  textAlign: CoverTextAlign;
  textVAlign: CoverTextVAlign;
  onTextAlignChange: (v: CoverTextAlign) => void;
  onTextVAlignChange: (v: CoverTextVAlign) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-1">
      <TipButton
        tip="왼쪽 (Alt+L)"
        className={`${iconBtnClass} ${textAlign === 'left' ? btnActiveClass : ''}`}
        pressed={textAlign === 'left'}
        onClick={() => onTextAlignChange('left')}
      >
        <AlignStartVertical size={15} />
      </TipButton>
      <TipButton
        tip="가로 가운데 (Alt+M / Alt+E)"
        className={`${iconBtnClass} ${textAlign === 'center' ? btnActiveClass : ''}`}
        pressed={textAlign === 'center'}
        onClick={() => onTextAlignChange('center')}
      >
        <AlignCenterVertical size={15} />
      </TipButton>
      <TipButton
        tip="오른쪽 (Alt+R)"
        className={`${iconBtnClass} ${textAlign === 'right' ? btnActiveClass : ''}`}
        pressed={textAlign === 'right'}
        onClick={() => onTextAlignChange('right')}
      >
        <AlignEndVertical size={15} />
      </TipButton>
      <TipButton
        tip="위쪽"
        className={`${iconBtnClass} ${textVAlign === 'top' ? btnActiveClass : ''}`}
        pressed={textVAlign === 'top'}
        onClick={() => onTextVAlignChange('top')}
      >
        <AlignStartHorizontal size={15} />
      </TipButton>
      <TipButton
        tip="세로 가운데"
        className={`${iconBtnClass} ${textVAlign === 'middle' ? btnActiveClass : ''}`}
        pressed={textVAlign === 'middle'}
        onClick={() => onTextVAlignChange('middle')}
      >
        <AlignCenterHorizontal size={15} />
      </TipButton>
      <TipButton
        tip="아래쪽"
        className={`${iconBtnClass} ${textVAlign === 'bottom' ? btnActiveClass : ''}`}
        pressed={textVAlign === 'bottom'}
        onClick={() => onTextVAlignChange('bottom')}
      >
        <AlignEndHorizontal size={15} />
      </TipButton>
    </div>
  );
}

export function loadCoverLayersDetached(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(COVER_LAYERS_DETACHED_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveCoverLayersDetached(detached: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COVER_LAYERS_DETACHED_KEY, detached ? '1' : '0');
  } catch {
    /* ignore */
  }
}

export default function CoverSidebar({
  cover,
  selectedIds,
  onSelectIds,
  onChange,
  currentFile = null,
  topPx = 0,
  width,
  isResizing = false,
  resizeHandleProps = {},
  layersDetached,
  onLayersDetachedChange,
  layersWidth,
  layersIsResizing = false,
  layersResizeHandleProps = {},
  centerSnapEnabled = true,
  onCenterSnapEnabledChange,
  centerSnapTolerance = COVER_CENTER_SNAP_TOLERANCE_DEFAULT,
  onCenterSnapToleranceChange,
  objectSnapEnabled = false,
  onObjectSnapEnabledChange,
  objectSnapTolerance = COVER_OBJECT_SNAP_TOLERANCE_DEFAULT,
  onObjectSnapToleranceChange,
  textContainerOutlineEnabled = false,
  onTextContainerOutlineEnabledChange,
  placePreviewEnabled = true,
  onPlacePreviewEnabledChange,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  placeMode = null,
  onPlaceModeChange,
  className = '',
}: CoverSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [sectionOpen, setSectionOpen] = useState(DEFAULT_SECTION_OPEN);
  const [fontOptionsTick, setFontOptionsTick] = useState(0);
  /** Remembered consent to align inside a sole selected group (until deselected / mixed). */
  const [groupAlignConsentId, setGroupAlignConsentId] = useState<string | null>(null);
  const [pendingAlignMode, setPendingAlignMode] = useState<CoverObjectAlign | null>(null);
  /** 0 = closed; 1 = first confirm; 2 = second confirm (locked only). */
  const [deleteConfirmStep, setDeleteConfirmStep] = useState<0 | 1 | 2>(0);
  const [deleteConfirmDouble, setDeleteConfirmDouble] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    ids: string[];
    mode: 'elements' | 'layers';
  } | null>(null);
  const deleteConfirmAwaitingSecondRef = useRef(false);
  const deleteConfirmSecondTimerRef = useRef<number | null>(null);

  const clearDeleteConfirmSecondTimer = () => {
    if (deleteConfirmSecondTimerRef.current != null) {
      window.clearTimeout(deleteConfirmSecondTimerRef.current);
      deleteConfirmSecondTimerRef.current = null;
    }
  };

  const resetDeleteConfirm = () => {
    clearDeleteConfirmSecondTimer();
    deleteConfirmAwaitingSecondRef.current = false;
    setDeleteConfirmStep(0);
    setDeleteConfirmDouble(false);
    setPendingDelete(null);
  };

  const advanceLockedDeleteConfirm = () => {
    deleteConfirmAwaitingSecondRef.current = true;
    setDeleteConfirmStep(0);
    clearDeleteConfirmSecondTimer();
    deleteConfirmSecondTimerRef.current = window.setTimeout(() => {
      deleteConfirmSecondTimerRef.current = null;
      deleteConfirmAwaitingSecondRef.current = false;
      setDeleteConfirmStep(2);
    }, 220);
  };

  useEffect(() => () => clearDeleteConfirmSecondTimer(), []);

  useEffect(() => {
    const onWebfonts = () => setFontOptionsTick((n) => n + 1);
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
    return () => window.removeEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
  }, []);

  const fontFamilyOptions = useMemo(
    () => buildFontFamilyOptions(),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick refreshes webfont families
    [fontOptionsTick],
  );

  const selected =
    selectedIds.length === 1
      ? cover.elements.find((el) => el.id === selectedIds[0]) ?? null
      : null;

  const sharedGroupId = useMemo(() => {
    if (selectedIds.length < 1) return null;
    if (selectedIds.length === 1) {
      const one = cover.elements.find((el) => el.id === selectedIds[0]);
      return one?.groupId ?? null;
    }
    const groups = selectedIds.map(
      (id) => cover.elements.find((el) => el.id === id)?.groupId ?? null,
    );
    const first = groups[0];
    if (!first || !groups.every((g) => g === first)) return null;
    return first;
  }, [cover.elements, selectedIds]);

  const canGroup = useMemo(() => {
    if (selectedIds.length < 1) return false;
    const layerIds = selectionToLayerIds(cover, selectedIds);
    // Sole fully-selected group: grouping would only wrap it — disable.
    if (layerIds.length === 1 && isGroupId(cover, layerIds[0]!)) return false;
    return true;
  }, [cover, selectedIds]);
  const canUngroup = Boolean(sharedGroupId);

  const alignCapability = useMemo(
    () => canAlignCoverSelection(cover, selectedIds),
    [cover, selectedIds],
  );
  const canObjectAlign = alignCapability.enabled;
  const soleAlignGroupId = alignCapability.soleGroupId;

  useEffect(() => {
    if (groupAlignConsentId != null && soleAlignGroupId !== groupAlignConsentId) {
      setGroupAlignConsentId(null);
    }
  }, [soleAlignGroupId, groupAlignConsentId]);

  useEffect(() => {
    if (pendingAlignMode == null) return;
    if (!soleAlignGroupId) setPendingAlignMode(null);
  }, [soleAlignGroupId, pendingAlignMode]);

  const toggleSection = (id: SectionId) => {
    setSectionOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePlaceText = () => {
    onPlaceModeChange?.(placeMode?.kind === 'text' ? null : { kind: 'text' });
  };

  const togglePlaceShape = (shapeType: CoverShapeType) => {
    if (placeMode?.kind === 'shape' && placeMode.shapeType === shapeType) {
      onPlaceModeChange?.(null);
      return;
    }
    onPlaceModeChange?.({ kind: 'shape', shapeType });
  };

  const armPlaceImage = (file: File | null | undefined) => {
    if (!file) return;
    onPlaceModeChange?.({ kind: 'image', files: [file] });
  };

  const addImageFromFile = async (
    file: File | null | undefined,
    replaceSelected = false,
  ) => {
    if (!file) return;
    try {
      const path = await uploadPrintEditorImage(file, currentFile);
      if (replaceSelected && selected?.type === 'image') {
        onChange(patchElement(cover, selected.id, { path }));
        return;
      }
    } catch (err) {
      console.error(err);
      window.alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    }
  };

  const setBgImage = async (file: File | null | undefined) => {
    if (!file) return;
    try {
      const path = await uploadPrintEditorImage(file, currentFile);
      onChange({ ...cover, bg: { ...cover.bg, imagePath: path } });
    } catch (err) {
      console.error(err);
      window.alert(err instanceof Error ? err.message : '배경 이미지 업로드에 실패했습니다.');
    }
  };

  const handleGroup = () => {
    const result = groupSelectedElements(cover, selectedIds);
    if (!result) return;
    onChange(result.cover);
    onSelectIds(collectDescendantElementIds(result.cover, result.groupId));
  };

  const handleNewGroup = () => {
    const created = createEmptyGroup(cover);
    onChange(created.cover);
  };

  const handleUngroup = () => {
    if (!sharedGroupId) return;
    onChange(ungroupElements(cover, sharedGroupId));
  };

  const commitPendingDelete = (ids: string[], mode: 'elements' | 'layers') => {
    if (mode === 'layers') {
      onChange(deleteLayers(cover, ids));
    } else {
      onChange(deleteElements(cover, ids));
    }
    onSelectIds([]);
  };

  const requestDeleteLayers = (ids: string[], mode: 'elements' | 'layers' = 'layers') => {
    if (!ids.length) return;
    const locked = layerIdsIncludeLocked(cover, ids);
    if (!locked) {
      commitPendingDelete(ids, mode);
      return;
    }
    setPendingDelete({ ids, mode });
    setDeleteConfirmDouble(true);
    setDeleteConfirmStep(1);
  };

  const handleDelete = () => {
    if (!selectedIds.length) return;
    requestDeleteLayers(selectedIds, 'elements');
  };

  const restack = () => {
    const frame = document.querySelector<HTMLElement>('[data-cover-frame="1"]');
    const frameHeightPx = frame?.getBoundingClientRect().height ?? 0;
    const elements = restackElementsByGap(
      cover.elements,
      cover.layout.gapPx,
      frameHeightPx,
      null,
    );
    onChange({ ...cover, elements });
  };

  const applyObjectAlign = (mode: CoverObjectAlign) => {
    if (!canObjectAlign) return;
    const alignIds = filterUnlockedElementIds(cover, selectedIds);
    if (!alignIds.length) return;
    const frame = document.querySelector<HTMLElement>('[data-cover-frame="1"]');
    const rect = frame?.getBoundingClientRect();
    const axisPx =
      mode === 'distributeX'
        ? (rect?.width ?? 0)
        : (rect?.height ?? 0);
    const gapFramePct = gapPxToFramePct(cover.layout.gapPx, axisPx);
    if (soleAlignGroupId) {
      if (groupAlignConsentId === soleAlignGroupId) {
        onChange(
          alignCoverElements(cover, alignIds, mode, gapFramePct, {
            insideGroupId: soleAlignGroupId,
          }),
        );
        return;
      }
      setPendingAlignMode(mode);
      return;
    }
    onChange(alignCoverElements(cover, alignIds, mode, gapFramePct));
  };

  const confirmGroupInternalAlign = () => {
    if (!soleAlignGroupId || !pendingAlignMode) {
      setPendingAlignMode(null);
      return;
    }
    const mode = pendingAlignMode;
    const alignIds = filterUnlockedElementIds(cover, selectedIds);
    if (!alignIds.length) {
      setPendingAlignMode(null);
      return;
    }
    const frame = document.querySelector<HTMLElement>('[data-cover-frame="1"]');
    const rect = frame?.getBoundingClientRect();
    const axisPx =
      mode === 'distributeX'
        ? (rect?.width ?? 0)
        : (rect?.height ?? 0);
    const gapFramePct = gapPxToFramePct(cover.layout.gapPx, axisPx);
    setGroupAlignConsentId(soleAlignGroupId);
    setPendingAlignMode(null);
    onChange(
      alignCoverElements(cover, alignIds, mode, gapFramePct, {
        insideGroupId: soleAlignGroupId,
      }),
    );
  };

  const layersList = (
    <CoverLayerPanel
      cover={cover}
      selectedIds={selectedIds}
      onSelectIds={onSelectIds}
      onChange={onChange}
      collapsedGroups={collapsedGroups}
      onCollapsedGroupsChange={setCollapsedGroups}
      onRequestDeleteLayers={(ids) => requestDeleteLayers(ids, 'layers')}
    />
  );

  const layerAddButtons = (
    <div className="space-y-1.5">
      <div className="grid grid-cols-2 gap-1.5">
        <TipButton
          tip={placeMode?.kind === 'text' ? '클릭 삽입 취소 (Esc)' : '텍스트 상자 추가 (T) — 캔버스를 클릭해 배치'}
          className={`${btnClass} ${placeMode?.kind === 'text' ? `${btnActiveClass} shadow-inner` : ''}`}
          pressed={placeMode?.kind === 'text'}
          onClick={togglePlaceText}
        >
          <Type size={14} />
          텍스트
        </TipButton>
        <TipButton
          tip={
            placeMode?.kind === 'image'
              ? '클릭 삽입 취소 (Esc)'
              : '이미지 추가 — 파일 선택 후 캔버스를 클릭해 배치'
          }
          className={`${btnClass} ${placeMode?.kind === 'image' ? `${btnActiveClass} shadow-inner` : ''}`}
          pressed={placeMode?.kind === 'image'}
          onClick={() => {
            if (placeMode?.kind === 'image') {
              onPlaceModeChange?.(null);
              return;
            }
            if (fileInputRef.current) {
              fileInputRef.current.dataset.coverImageMode = 'place';
              fileInputRef.current.click();
            }
          }}
        >
          <ImagePlus size={14} />
          이미지
        </TipButton>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {(
          [
            { type: 'rect' as const, tip: '사각형', shortcut: 'M', Icon: Square },
            { type: 'ellipse' as const, tip: '타원', shortcut: 'O', Icon: Circle },
            { type: 'roundRect' as const, tip: '둥근 사각형', shortcut: null, Icon: Squircle },
          ] as const
        ).map(({ type, tip, shortcut, Icon }) => {
          const active =
            placeMode?.kind === 'shape' && placeMode.shapeType === type;
          const tipText = active
            ? '클릭 삽입 취소 (Esc)'
            : shortcut
              ? `${tip} 추가 (${shortcut}) — 캔버스를 클릭해 배치`
              : `${tip} 추가 — 캔버스를 클릭해 배치`;
          return (
            <TipButton
              key={type}
              tip={tipText}
              className={`${btnClass} ${active ? `${btnActiveClass} shadow-inner` : ''}`}
              pressed={active}
              onClick={() => togglePlaceShape(type)}
            >
              <Icon size={14} />
              <span className="truncate">{tip}</span>
            </TipButton>
          );
        })}
      </div>
    </div>
  );

  const layerActionButtons = (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60">
      <div className="mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
        레이어 액션
      </div>
      <div className="flex flex-wrap gap-1">
        <TipButton
          tip="새 그룹"
          className={iconBtnClass}
          onClick={handleNewGroup}
        >
          <FolderPlus size={15} />
        </TipButton>
        <TipButton
          tip="그룹 (Mod+G)"
          className={iconBtnClass}
          disabled={!canGroup}
          onClick={handleGroup}
        >
          <Group size={15} />
        </TipButton>
        <TipButton
          tip="그룹 해제 (Mod+Shift+G)"
          className={iconBtnClass}
          disabled={!canUngroup}
          onClick={handleUngroup}
        >
          <Ungroup size={15} />
        </TipButton>
        <TipButton
          tip="맨 앞으로"
          className={iconBtnClass}
          disabled={!selectedIds.length}
          onClick={() => onChange(bringSelectionToFront(cover, selectedIds))}
        >
          <ArrowUpToLine size={15} />
        </TipButton>
        <TipButton
          tip="맨 뒤로"
          className={iconBtnClass}
          disabled={!selectedIds.length}
          onClick={() => onChange(sendSelectionToBack(cover, selectedIds))}
        >
          <ArrowDownToLine size={15} />
        </TipButton>
        <TipButton
          tip="세로 정리 (gap 적용)"
          className={iconBtnClass}
          disabled={cover.elements.length === 0}
          onClick={restack}
        >
          <LayoutList size={15} />
        </TipButton>
        <TipButton
          tip="선택 삭제"
          className={iconBtnClass}
          disabled={!selectedIds.length}
          onClick={handleDelete}
        >
          <Trash2 size={15} />
        </TipButton>
      </div>
    </div>
  );

  const objectAlignButtons = (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-1.5 dark:border-odp-borderStrong dark:bg-odp-bg/60">
      <div className="mb-1 px-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-400">
        개체 정렬
      </div>
      <div className="mb-1.5 grid grid-cols-4 gap-1">
        <TipButton
          tip="왼쪽 정렬"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('left')}
        >
          <AlignStartVertical size={15} />
        </TipButton>
        <TipButton
          tip="가로 가운데"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('centerX')}
        >
          <AlignCenterVertical size={15} />
        </TipButton>
        <TipButton
          tip="오른쪽 정렬"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('right')}
        >
          <AlignEndVertical size={15} />
        </TipButton>
        <TipButton
          tip="가로 간격 분배"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('distributeX')}
        >
          <AlignHorizontalDistributeCenter size={15} />
        </TipButton>
        <TipButton
          tip="위쪽 정렬"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('top')}
        >
          <AlignStartHorizontal size={15} />
        </TipButton>
        <TipButton
          tip="세로 가운데"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('centerY')}
        >
          <AlignCenterHorizontal size={15} />
        </TipButton>
        <TipButton
          tip="아래쪽 정렬"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('bottom')}
        >
          <AlignEndHorizontal size={15} />
        </TipButton>
        <TipButton
          tip="세로 간격 분배"
          className={iconBtnClass}
          disabled={!canObjectAlign}
          onClick={() => applyObjectAlign('distributeY')}
        >
          <AlignVerticalDistributeCenter size={15} />
        </TipButton>
      </div>
      <label className="block space-y-1 px-0.5">
        <span className="text-[10px] text-gray-400">Gap</span>
        <SliderWithScrubInput
          unit="css"
          suffix="px"
          min={0}
          max={200}
          step={1}
          value={cover.layout.gapPx}
          aria-label="개체 정렬 Gap"
          onChange={(gapPx) => onChange(withCoverLayout(cover, { gapPx }))}
        />
        <span className="block text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
          세로 정리 시 개체 사이 간격, 가로·세로 간격 분배에서 개체가 2개일 때 사이의 간격으로 쓰입니다.
        </span>
      </label>
    </div>
  );

  const layersBody = (
    <div className="space-y-2">
      {layerAddButtons}
      {layersList}
      {layerActionButtons}
      {objectAlignButtons}
    </div>
  );

  const imageFileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      className="hidden"
      data-cover-image-mode="add"
      onChange={(e) => {
        const mode = e.currentTarget.dataset.coverImageMode || 'add';
        const file = e.target.files?.[0];
        e.currentTarget.dataset.coverImageMode = 'add';
        e.target.value = '';
        if (mode === 'place') {
          armPlaceImage(file);
          return;
        }
        void addImageFromFile(file, mode === 'replace');
      }}
    />
  );

  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <>
        <aside
          className={`fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 ${className}`}
          style={{ top: topPx, left: 0, width }}
          aria-label="표지 설정"
        >
          <div className="relative flex min-h-0 w-full flex-col overflow-y-auto pb-16">
            {imageFileInput}
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95">
              <div className="flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong">
                표지
              </div>
              <TipButton
                tip="실행 취소 (Mod+Z)"
                className={iconBtnClass}
                disabled={!canUndo}
                onClick={() => onUndo?.()}
              >
                <Undo2 size={15} />
              </TipButton>
              <TipButton
                tip="다시 실행 (Mod+Shift+Z / Mod+Y)"
                className={iconBtnClass}
                disabled={!canRedo}
                onClick={() => onRedo?.()}
              >
                <Redo2 size={15} />
              </TipButton>
            </div>

            <CollapsibleSection
              title="설정"
              icon={Settings2}
              open={sectionOpen.settings}
              onToggle={() => toggleSection('settings')}
            >
              <div className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-2.5 dark:border-odp-borderStrong dark:bg-odp-bg/50">
                <div className="flex items-center justify-between gap-2">
                  <span className={labelClass}>표지 사용</span>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Switch.Root
                        className={switchRootClass(cover.enabled)}
                        checked={cover.enabled}
                        onCheckedChange={(checked) => onChange({ ...cover, enabled: checked })}
                        aria-label="표지 사용"
                      >
                        <Switch.Thumb className={switchThumbClass} />
                      </Switch.Root>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                        표지 사용
                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={labelClass}>가운데 스냅</span>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Switch.Root
                          className={switchRootClass(centerSnapEnabled)}
                          checked={centerSnapEnabled}
                          onCheckedChange={(checked) => onCenterSnapEnabledChange?.(checked)}
                          aria-label="가로·세로 가운데 스냅"
                        >
                          <Switch.Thumb className={switchThumbClass} />
                        </Switch.Root>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                          가로·세로 가운데 스냅
                          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>
                  <label className="block space-y-1">
                    <span className="text-[10px] text-gray-400">허용 오차</span>
                    <SliderWithScrubInput
                      unit="css"
                      suffix="px"
                      min={0.1}
                      max={100}
                      step={0.1}
                      value={centerSnapTolerance}
                      disabled={!onCenterSnapToleranceChange}
                      aria-label="가운데 스냅 허용 오차"
                      onChange={(v) => onCenterSnapToleranceChange?.(v)}
                    />
                  </label>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={labelClass}>개체 스냅</span>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Switch.Root
                          className={switchRootClass(objectSnapEnabled)}
                          checked={objectSnapEnabled}
                          onCheckedChange={(checked) => onObjectSnapEnabledChange?.(checked)}
                          aria-label="개체 테두리·가운데선 스냅"
                        >
                          <Switch.Thumb className={switchThumbClass} />
                        </Switch.Root>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                          다른 개체의 테두리·가운데선에 맞춤 (Shift+Tab 토글 · 그룹은 통째로, 그룹 안에서는 sibling과도)
                          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>
                  <label className="block space-y-1">
                    <span className="text-[10px] text-gray-400">허용 오차</span>
                    <SliderWithScrubInput
                      unit="css"
                      suffix="px"
                      min={0.1}
                      max={100}
                      step={0.1}
                      value={objectSnapTolerance}
                      disabled={!onObjectSnapToleranceChange}
                      aria-label="개체 스냅 허용 오차"
                      onChange={(v) => onObjectSnapToleranceChange?.(v)}
                    />
                  </label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className={labelClass}>텍스트 상자 표시</span>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Switch.Root
                        className={switchRootClass(textContainerOutlineEnabled)}
                        checked={textContainerOutlineEnabled}
                        onCheckedChange={(checked) =>
                          onTextContainerOutlineEnabledChange?.(checked)
                        }
                        aria-label="모든 텍스트 상자 테두리 표시"
                      >
                        <Switch.Thumb className={switchThumbClass} />
                      </Switch.Root>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                        선택과 무관하게 모든 텍스트 상자를 옅은 붉은 실선으로 표시
                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className={labelClass}>삽입 미리보기</span>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Switch.Root
                        className={switchRootClass(placePreviewEnabled)}
                        checked={placePreviewEnabled}
                        onCheckedChange={(checked) => onPlacePreviewEnabledChange?.(checked)}
                        aria-label="클릭 삽입 미리보기"
                      >
                        <Switch.Thumb className={switchThumbClass} />
                      </Switch.Root>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                        텍스트·이미지·도형 클릭 삽입 시 커서 위치에 반투명 미리보기 표시
                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </div>
            </CollapsibleSection>

            {!layersDetached && (
              <CollapsibleSection
                title="레이어"
                icon={LayoutList}
                open={sectionOpen.layers}
                onToggle={() => toggleSection('layers')}
                headerRight={
                  <TipButton
                    tip="레이어를 별도 사이드바로 분리"
                    className={iconBtnClass}
                    onClick={() => onLayersDetachedChange(true)}
                  >
                    <PanelLeftOpen size={15} />
                  </TipButton>
                }
              >
                {layersBody}
              </CollapsibleSection>
            ) }

            <CollapsibleSection
              title="배경"
              icon={Image}
              open={sectionOpen.background}
              onToggle={() => toggleSection('background')}
            >
              <ChatImageBackgroundPicker
                value={cover.bg.color}
                onChange={(color) =>
                  onChange({
                    ...cover,
                    bg: { ...cover.bg, color: color || '#ffffff' },
                  })
                }
                allowNone={false}
                label="색"
                compact
              />
              <div className="mt-2 flex gap-1.5">
                <TipButton
                  tip="배경 이미지 업로드"
                  className={`${btnClass} flex-1`}
                  onClick={() => bgFileInputRef.current?.click()}
                >
                  배경 이미지
                </TipButton>
                <TipButton
                  tip="배경 이미지 제거"
                  className={btnClass}
                  disabled={!cover.bg.imagePath}
                  onClick={() => onChange({ ...cover, bg: { ...cover.bg, imagePath: '' } })}
                >
                  제거
                </TipButton>
              </div>
              {cover.bg.imagePath ? (
                <p className="truncate text-[10px] text-gray-400" title={cover.bg.imagePath}>
                  {cover.bg.imagePath}
                </p>
              ) : null}
              <input
                ref={bgFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  void setBgImage(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </CollapsibleSection>

            {selected?.type === 'text' ? (
              <CollapsibleSection
                title="선택 · 텍스트"
                icon={Type}
                open={sectionOpen.selection}
                onToggle={() => toggleSection('selection')}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400">글자 크기</span>
                  <NumberStepControls
                    min={6}
                    max={400}
                    step={1}
                    suffix="px"
                    value={(selected as CoverTextElement).fontSize}
                    resetValue={36}
                    aria-label="글자 크기"
                    decreaseLabel="글자 크기 줄이기"
                    increaseLabel="글자 크기 키우기"
                    onChange={(fontSize) =>
                      onChange(patchElement(cover, selected.id, { fontSize }))
                    }
                  />
                </div>
                <label className="block space-y-1">
                  <span className="text-[10px] text-gray-400">폰트 (font-family)</span>
                  <FontFamilyInput
                    id="cover-text-font-family"
                    value={(selected as CoverTextElement).fontFamily || ''}
                    onChange={(v) => {
                      const trimmed = v.trim();
                      onChange({
                        ...cover,
                        elements: cover.elements.map((el) => {
                          if (el.id !== selected.id || el.type !== 'text') return el;
                          const next = { ...el };
                          if (trimmed) next.fontFamily = trimmed;
                          else delete next.fontFamily;
                          return next;
                        }),
                      });
                    }}
                    options={fontFamilyOptions}
                    placeholder="예: Paperozi, sans-serif"
                    inputClassName="!px-2 !py-1 !text-xs"
                  />
                  <p className="text-[10px] leading-snug text-gray-400 dark:text-odp-fgMuted">
                    웹폰트는 설정 → 웹폰트(CSS)에서 추가합니다.
                  </p>
                </label>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400">굵기 (font-weight)</span>
                  <Select.Root
                    value={coverFontWeightToSelectValue(
                      (selected as CoverTextElement).fontWeight,
                    )}
                    onValueChange={(value) =>
                      onChange(
                        patchElement(cover, selected.id, {
                          fontWeight: selectValueToCoverFontWeight(value),
                        }),
                      )
                    }
                  >
                    <Select.Trigger
                      aria-label="폰트 굵기"
                      className="inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
                    >
                      <Select.Value />
                      <Select.Icon className="text-gray-500">
                        <ChevronDown size={14} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                        position="popper"
                        sideOffset={4}
                      >
                        <Select.Viewport className="p-1">
                          {COVER_FONT_WEIGHT_OPTIONS.map((opt) => (
                            <Select.Item
                              key={opt.value}
                              value={opt.value}
                              className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                            >
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
                <div>
                  <div className="mb-1 text-[10px] text-gray-400">텍스트 정렬</div>
                  <AlignButtons
                    value={(selected as CoverTextElement).textAlign}
                    onChange={(textAlign) =>
                      onChange(patchElement(cover, selected.id, { textAlign }))
                    }
                  />
                </div>
                <ChatImageBackgroundPicker
                  value={(selected as CoverTextElement).color}
                  onChange={(color) =>
                    onChange(
                      patchElement(cover, selected.id, {
                        color: color || '#111111',
                      }),
                    )
                  }
                  allowNone={false}
                  label="글자색"
                  compact
                />
              </CollapsibleSection>
            ) : null}

            {selected?.type === 'image' ? (
              <CollapsibleSection
                title="선택 · 이미지"
                icon={ImagePlus}
                open={sectionOpen.selection}
                onToggle={() => toggleSection('selection')}
              >
                <p className="truncate text-[10px] text-gray-400" title={selected.path}>
                  {selected.path}
                </p>
                <div className="flex items-center justify-between gap-2 py-1">
                  <div>
                    <div className="text-[11px] text-gray-600 dark:text-odp-fg">무조건 비율 유지</div>
                    <p className="text-[10px] text-gray-400">
                      켜면 리사이즈 시 찌그러지지 않습니다.
                    </p>
                  </div>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Switch.Root
                        className={switchRootClass(Boolean(selected.lockAspect))}
                        checked={Boolean(selected.lockAspect)}
                        onCheckedChange={(checked) => {
                          onChange({
                            ...cover,
                            elements: cover.elements.map((el) => {
                              if (el.id !== selected.id || el.type !== 'image') return el;
                              const next = { ...el };
                              if (checked) next.lockAspect = true;
                              else delete next.lockAspect;
                              return next;
                            }),
                          });
                        }}
                        aria-label="무조건 비율 유지"
                      >
                        <Switch.Thumb className={switchThumbClass} />
                      </Switch.Root>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className={tooltipContentClass} side="top" sideOffset={6}>
                        무조건 비율 유지
                        <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
                <TipButton
                  tip="원본 비율로 되돌리기"
                  className={`${btnClass} w-full`}
                  disabled={!selected.naturalAspect}
                  onClick={() => {
                    if (!selected.naturalAspect) return;
                    const aspect = selected.naturalAspect;
                    const cx = selected.x + selected.w / 2;
                    const cy = selected.y + selected.h / 2;
                    const fw = 210;
                    const fh = 297;
                    const h = (selected.w * fw) / (fh * aspect);
                    let x = cx - selected.w / 2;
                    let y = cy - h / 2;
                    x = Math.min(Math.max(0, x), 100 - selected.w);
                    y = Math.min(Math.max(0, y), 100 - h);
                    onChange(
                      patchElement(cover, selected.id, {
                        x,
                        y,
                        h: Math.min(100, Math.max(4, h)),
                      }),
                    );
                  }}
                >
                  원본 비율로 되돌리기
                </TipButton>
                <TipButton
                  tip="이미지 교체"
                  className={`${btnClass} w-full`}
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.dataset.coverImageMode = 'replace';
                      fileInputRef.current.click();
                    }
                  }}
                >
                  이미지 교체
                </TipButton>
              </CollapsibleSection>
            ) : null}

            {selected && isCoverShapeElement(selected) ? (
              <CollapsibleSection
                title="선택 · 도형"
                icon={Square}
                open={sectionOpen.selection}
                onToggle={() => toggleSection('selection')}
              >
                <ChatImageBackgroundPicker
                  value={selected.fill}
                  onChange={(fill) =>
                    onChange(
                      patchElement(cover, selected.id, {
                        fill: fill || 'transparent',
                      }),
                    )
                  }
                  allowNone
                  label="채우기"
                  compact
                />
                <ChatImageBackgroundPicker
                  value={selected.borderColor}
                  onChange={(borderColor) =>
                    onChange(
                      patchElement(cover, selected.id, {
                        borderColor: borderColor || 'transparent',
                      }),
                    )
                  }
                  allowNone
                  label="테두리 색"
                  compact
                />
                <label className="block space-y-1">
                  <span className="text-[10px] text-gray-400">테두리 두께</span>
                  <SliderWithScrubInput
                    unit="css"
                    suffix="px"
                    min={0}
                    max={40}
                    step={1}
                    value={selected.borderWidth}
                    aria-label="테두리 두께"
                    onChange={(borderWidth) =>
                      onChange(patchElement(cover, selected.id, { borderWidth }))
                    }
                  />
                </label>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400">테두리 스타일</span>
                  <Select.Root
                    value={selected.borderStyle}
                    onValueChange={(value) => {
                      if (value !== 'solid' && value !== 'dashed' && value !== 'dotted') {
                        return;
                      }
                      onChange(
                        patchElement(cover, selected.id, {
                          borderStyle: value as CoverBorderStyle,
                        }),
                      );
                    }}
                  >
                    <Select.Trigger
                      aria-label="테두리 스타일"
                      className="inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
                    >
                      <Select.Value />
                      <Select.Icon className="text-gray-500">
                        <ChevronDown size={14} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                        position="popper"
                        sideOffset={4}
                      >
                        <Select.Viewport className="p-1">
                          {(
                            [
                              { value: 'solid', label: '실선' },
                              { value: 'dashed', label: '파선' },
                              { value: 'dotted', label: '점선' },
                            ] as const
                          ).map((opt) => (
                            <Select.Item
                              key={opt.value}
                              value={opt.value}
                              className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                            >
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
                {selected.type === 'roundRect' ? (
                  <label className="block space-y-1">
                    <span className="text-[10px] text-gray-400">모서리 둥글기</span>
                    <SliderWithScrubInput
                      unit="percent"
                      suffix="%"
                      min={0}
                      max={50}
                      step={1}
                      value={selected.cornerRadiusPct ?? 4}
                      aria-label="모서리 둥글기"
                      onChange={(cornerRadiusPct) =>
                        onChange(patchElement(cover, selected.id, { cornerRadiusPct }))
                      }
                    />
                  </label>
                ) : null}
                <label className="block space-y-1">
                  <span className="text-[10px] text-gray-400">도형 안 텍스트</span>
                  <textarea
                    className="min-h-16 w-full resize-y rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
                    value={selected.text ?? ''}
                    placeholder="선택 사항"
                    onChange={(e) =>
                      onChange(patchElement(cover, selected.id, { text: e.target.value }))
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
                    value={selected.paddingPct ?? 0}
                    aria-label="도형 안쪽 여백"
                    onChange={(paddingPct) =>
                      onChange(patchElement(cover, selected.id, { paddingPct }))
                    }
                  />
                </label>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400">글자 크기</span>
                  <NumberStepControls
                    min={6}
                    max={400}
                    step={1}
                    suffix="px"
                    value={selected.fontSize ?? 24}
                    resetValue={24}
                    aria-label="도형 글자 크기"
                    decreaseLabel="글자 크기 줄이기"
                    increaseLabel="글자 크기 키우기"
                    onChange={(fontSize) =>
                      onChange(patchElement(cover, selected.id, { fontSize }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400">굵기 (font-weight)</span>
                  <Select.Root
                    value={coverFontWeightToSelectValue(selected.fontWeight ?? 'normal')}
                    onValueChange={(value) =>
                      onChange(
                        patchElement(cover, selected.id, {
                          fontWeight: selectValueToCoverFontWeight(value),
                        }),
                      )
                    }
                  >
                    <Select.Trigger
                      aria-label="도형 글자 굵기"
                      className="inline-flex h-8 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2 text-xs text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
                    >
                      <Select.Value />
                      <Select.Icon className="text-gray-500">
                        <ChevronDown size={14} />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content
                        className="z-[10050] max-h-72 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                        position="popper"
                        sideOffset={4}
                      >
                        <Select.Viewport className="p-1">
                          {COVER_FONT_WEIGHT_OPTIONS.map((opt) => (
                            <Select.Item
                              key={opt.value}
                              value={opt.value}
                              className="relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-7 pr-3 text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
                            >
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
                <div>
                  <div className="mb-1 text-[10px] text-gray-400">텍스트 위치</div>
                  <ShapeTextPlacementButtons
                    textAlign={selected.textAlign ?? 'center'}
                    textVAlign={selected.textVAlign ?? 'middle'}
                    onTextAlignChange={(textAlign) =>
                      onChange(patchElement(cover, selected.id, { textAlign }))
                    }
                    onTextVAlignChange={(textVAlign) =>
                      onChange(patchElement(cover, selected.id, { textVAlign }))
                    }
                  />
                </div>
                <ChatImageBackgroundPicker
                  value={selected.color ?? '#0c4a6e'}
                  onChange={(color) =>
                    onChange(
                      patchElement(cover, selected.id, {
                        color: color || '#0c4a6e',
                      }),
                    )
                  }
                  allowNone={false}
                  label="글자색"
                  compact
                />
              </CollapsibleSection>
            ) : null}

            {selectedIds.length > 1 ? (
              <CollapsibleSection
                title={`선택 · ${selectedIds.length}개`}
                icon={MousePointer2}
                open={sectionOpen.selection}
                onToggle={() => toggleSection('selection')}
              >
                <p className="text-[10px] text-gray-400">
                  드래그하면 함께 이동합니다. Mod+G로 그룹할 수 있습니다. 체크를 해제하면 선택에서
                  빠집니다.
                </p>
                <ul className="mt-2 max-h-52 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 p-1 dark:border-odp-borderStrong">
                  {selectedIds.map((id) => {
                    const el = cover.elements.find((item) => item.id === id);
                    if (!el) return null;
                    const label = coverElementLabel(el);
                    return (
                      <li key={id}>
                        <label className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 hover:bg-gray-50 dark:hover:bg-odp-focusBg">
                          <Checkbox.Root
                            className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border border-gray-400 bg-white outline-none focus-visible:ring-2 focus-visible:ring-blue-400 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500"
                            checked
                            onCheckedChange={(checked) => {
                              if (checked === true) return;
                              onSelectIds(selectedIds.filter((x) => x !== id));
                            }}
                            aria-label={`${label} 선택 해제`}
                          >
                            <Checkbox.Indicator className="text-white">
                              <Check size={10} strokeWidth={3} />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          {el.type === 'text' ? (
                            <Type size={12} className="shrink-0 text-gray-400" aria-hidden />
                          ) : isCoverShapeElement(el) ? (
                            <Square size={12} className="shrink-0 text-gray-400" aria-hidden />
                          ) : (
                            <ImagePlus size={12} className="shrink-0 text-gray-400" aria-hidden />
                          )}
                          <span className="min-w-0 flex-1 truncate text-[11px] text-gray-700 dark:text-odp-fg">
                            {label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </CollapsibleSection>
            ) : null}

            <CollapsibleSection
              title="단축키"
              icon={Keyboard}
              open={sectionOpen.shortcuts}
              onToggle={() => toggleSection('shortcuts')}
              titleClassName="truncate text-[11px] font-semibold tracking-wide text-ink dark:text-odp-fgStrong"
              iconClassName="shrink-0 text-ink dark:text-odp-fgStrong"
            >
              <CoverShortcutsList />
            </CollapsibleSection>
          </div>

          <TocResizeHandle
            edge="right"
            handleProps={resizeHandleProps}
            isResizing={isResizing}
            visibleOnHover
            label="표지 사이드바 너비 조절"
          />
        </aside>

        {layersDetached ? (
          <aside
            className="fixed bottom-0 z-30 flex border-r border-gray-200 bg-white/95 backdrop-blur-sm print:hidden dark:border-odp-borderSoft dark:bg-odp-bgSoft/95"
            style={{ top: topPx, left: width, width: layersWidth }}
            aria-label="표지 레이어"
          >
            <div className="relative flex min-h-0 w-full flex-col overflow-y-auto pb-16">
              <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 bg-white/95 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/95">
                <div className="flex gap-1.5 items-center flex-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-odp-fgStrong">
                  <LayoutList
                    size={14}
                    className="shrink-0 text-gray-700 dark:text-odp-fgStrong"
                    aria-hidden
                  />
                  레이어
                </div>
                <TipButton
                  tip="메인 사이드바로 합치기"
                  className={iconBtnClass}
                  onClick={() => onLayersDetachedChange(false)}
                >
                  <PanelLeftClose size={15} />
                </TipButton>
              </div>
              <div className="space-y-2 px-3 py-3">{layersBody}</div>
            </div>
            <TocResizeHandle
              edge="right"
              handleProps={layersResizeHandleProps}
              isResizing={layersIsResizing}
              visibleOnHover
              label="레이어 사이드바 너비 조절"
            />
          </aside>
        ) : null}

        <ConfirmModal
          isOpen={pendingAlignMode != null}
          title="그룹 내부 정렬"
          message="선택한 그룹 안의 개체를 정렬할까요?"
          confirmLabel="정렬"
          cancelLabel="취소"
          onConfirm={confirmGroupInternalAlign}
          onCancel={() => setPendingAlignMode(null)}
        />
        <ConfirmModal
          key={`cover-sidebar-delete-${deleteConfirmStep}`}
          isOpen={deleteConfirmStep > 0}
          title={deleteConfirmStep === 2 ? '잠긴 개체 삭제' : '개체 삭제'}
          message={
            deleteConfirmStep === 2
              ? '잠긴 개체가 포함되어 있습니다. 정말 삭제할까요?'
              : '선택한 개체를 삭제할까요?'
          }
          confirmLabel="삭제"
          cancelLabel="취소"
          variant="danger"
          onConfirm={() => {
            if (deleteConfirmDouble && deleteConfirmStep === 1) {
              advanceLockedDeleteConfirm();
              return;
            }
            const pending = pendingDelete;
            resetDeleteConfirm();
            if (!pending?.ids.length) return;
            commitPendingDelete(pending.ids, pending.mode);
          }}
          onCancel={resetDeleteConfirm}
        />
      </>
    </Tooltip.Provider>
  );
}
