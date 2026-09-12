import { useEffect, useRef, useState, type ChangeEvent, type RefObject } from 'react';
import {
  Hash,
  Image as ImageIcon,
  Plus,
  Trash2,
  Type,
  Check,
  Undo2,
  ChevronDown,
  PanelRight,
} from 'lucide-react';
import { Popover, Select, Switch } from 'radix-ui';
import FontFamilyInput from '@/components/FontFamilyInput';
import Modal from '@/components/modals/Modal';
import {
  PrintChromeIconTooltip,
  PrintChromeTooltipProvider,
} from '@/components/print/PrintChromeTooltips';
import {
  DEFAULT_PRINT_CHROME_DOC,
  PRINT_CHROME_FONT_SIZE_MAX,
  PRINT_CHROME_FONT_SIZE_MIN,
  PRINT_CHROME_IMAGE_SIZE_MAX,
  PRINT_CHROME_IMAGE_SIZE_MIN,
  PRINT_CHROME_POSITION_LABELS,
  createDefaultImageTemplate,
  createDefaultPageNumberTemplate,
  createDefaultTextTemplate,
  normalizePrintChromeDoc,
  type PrintChromeDoc,
  type PrintChromeNumbering,
  type PrintChromePosition,
  type PrintChromeTemplate,
} from '@/utils/printChrome';
import { uploadPrintEditorImage } from '@/utils/print/printEditorImageUpload';
import {
  PRINT_PAGE_MARGIN_PRESETS,
  getPrintPageMarginsMm,
  matchPrintPageMarginPresetId,
  type PrintPageLayout,
  type PrintPageMarginsMm,
} from '@/utils/printPageLayout';

const switchRootClass = (checked: boolean) =>
  `relative h-5 w-9 shrink-0 cursor-pointer rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-400 ${
    checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-odp-borderStrong'
  }`;

const switchThumbClass =
  'block size-4 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[18px]';

const fieldClass =
  'w-full rounded border border-gray-300 bg-white px-2.5 py-1.5 text-sm text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg';

const selectTriggerClass =
  'inline-flex h-8 min-w-[7rem] items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

/** 3x3 page anchors; middle-center unused (no template position). */
const POSITION_GRID: Array<PrintChromePosition | null> = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  null,
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

type CurrentFile = { type?: string | null; id?: string | null } | null | undefined;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chrome: PrintChromeDoc | null;
  onApply: (chrome: PrintChromeDoc | null) => void;
  currentFile?: CurrentFile;
  /** modal (default) or dock panel body */
  presentation?: 'modal' | 'dock';
  /** Landscape: move to right dock. Shown only when presentation is modal. */
  onDock?: (() => void) | undefined;
  printLayout?: PrintPageLayout | undefined;
  onPrintLayoutChange?: ((partial: Partial<PrintPageLayout>) => void) | undefined;
};

function templateLabel(t: PrintChromeTemplate): string {
  if (t.type === 'page-number') return `쪽번호 · ${t.format}`;
  if (t.type === 'text') return t.text.trim() ? `텍스트 · ${t.text.slice(0, 24)}` : '텍스트';
  return t.path.trim() ? `이미지 · ${t.path.split('/').pop()}` : '이미지';
}

function useFocusedWheelStep(
  inputRef: RefObject<HTMLInputElement | null>,
  onStepRef: RefObject<(direction: 1 | -1) => void>,
) {
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return undefined;
    const onWheel = (event: WheelEvent) => {
      if (document.activeElement !== el) return;
      event.preventDefault();
      event.stopPropagation();
      onStepRef.current?.(event.deltaY < 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [inputRef, onStepRef]);
}

function ScrollStepNumberInput({
  value,
  min,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
  ariaLabel: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onStepRef = useRef<(direction: 1 | -1) => void>(() => {});
  onStepRef.current = (direction) => {
    const next = Math.min(max, Math.max(min, Math.round(value) + direction));
    if (next !== value) onChange(next);
  };
  useFocusedWheelStep(inputRef, onStepRef);

  return (
    <input
      ref={inputRef}
      type="number"
      min={min}
      max={max}
      step={1}
      aria-label={ariaLabel}
      className={fieldClass}
      value={value}
      onChange={(e) => {
        const n = Number(e.target.value);
        if (!Number.isFinite(n)) return;
        onChange(Math.min(max, Math.max(min, Math.round(n))));
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          onStepRef.current(1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          onStepRef.current(-1);
        }
      }}
    />
  );
}

function PrintPageMarginsEditor({
  printLayout,
  onPrintLayoutChange,
}: {
  printLayout: PrintPageLayout;
  onPrintLayoutChange: (partial: Partial<PrintPageLayout>) => void;
}) {
  const margins = getPrintPageMarginsMm(printLayout);
  const presetId = matchPrintPageMarginPresetId(margins);

  const setSide = (side: keyof PrintPageMarginsMm, raw: string) => {
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    onPrintLayoutChange({
      marginsMm: { ...margins, [side]: n },
    });
  };

  return (
    <div className="rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong">
      <div className="mb-2 flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">페이지 여백 (mm)</p>
        <Select.Root
          value={presetId}
          onValueChange={(value) => {
            const preset = PRINT_PAGE_MARGIN_PRESETS.find((p) => p.id === value);
            if (!preset) return;
            onPrintLayoutChange({ marginsMm: { ...preset.margins } });
          }}
        >
          <Select.Trigger className={`${selectTriggerClass} w-full`} aria-label="여백 프리셋">
            <Select.Value>
              {presetId === 'custom'
                ? '사용자 지정'
                : (PRINT_PAGE_MARGIN_PRESETS.find((p) => p.id === presetId)?.label ?? '프리셋')}
            </Select.Value>
            <ChevronDown size={14} className="text-gray-500" />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="z-100010 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              position="popper"
              sideOffset={4}
            >
              <Select.Viewport className="p-1">
                {PRINT_PAGE_MARGIN_PRESETS.map((preset) => (
                  <Select.Item
                    key={preset.id}
                    value={preset.id}
                    className="cursor-pointer rounded-sm px-3 py-1.5 text-sm outline-none data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg"
                  >
                    <Select.ItemText>{preset.label}</Select.ItemText>
                  </Select.Item>
                ))}
                <Select.Item
                  value="custom"
                  disabled
                  className="cursor-default rounded-sm px-3 py-1.5 text-sm text-gray-400 outline-none"
                >
                  <Select.ItemText>사용자 지정</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="flex flex-col gap-2">
        {(
          [
            ['top', '상'],
            ['right', '우'],
            ['bottom', '하'],
            ['left', '좌'],
          ] as const
        ).map(([side, label]) => (
          <label
            key={side}
            className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted"
          >
            {label}
            <input
              type="number"
              min={0}
              max={80}
              step={0.5}
              className={fieldClass}
              value={margins[side]}
              onChange={(e) => setSide(side, e.target.value)}
              aria-label={`여백 ${label}`}
            />
          </label>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-gray-500 dark:text-odp-muted">
        paged.js · 브라우저 `@page` 여백. 0이면 시트에 맞춤(인쇄 대화상자 여백 None 권장).
      </p>
    </div>
  );
}

function PositionGridPicker({
  value,
  onChange,
}: {
  value: PrintChromePosition;
  onChange: (next: PrintChromePosition) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={selectTriggerClass}
          aria-label="크롬 위치"
          aria-expanded={open}
        >
          <span>{PRINT_CHROME_POSITION_LABELS[value]}</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="start"
          className="z-100010 rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        >
          <div
            className="grid grid-cols-3 gap-1"
            role="listbox"
            aria-label="페이지 위치"
          >
            {POSITION_GRID.map((pos, index) => {
              if (!pos) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="size-9 rounded border border-dashed border-gray-200 dark:border-odp-borderSoft"
                    aria-hidden
                  />
                );
              }
              const selected = value === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  aria-label={PRINT_CHROME_POSITION_LABELS[pos]}
                  className={`flex size-9 items-center justify-center rounded border text-[10px] font-medium transition ${
                    selected
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/50 dark:text-blue-100'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg'
                  }`}
                  onClick={() => {
                    onChange(pos);
                    setOpen(false);
                  }}
                >
                  <span className="block size-2 rounded-full bg-current opacity-80" />
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-center text-[10px] text-gray-500 dark:text-odp-muted">
            {PRINT_CHROME_POSITION_LABELS[value]}
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default function PrintChromeModal({
  isOpen,
  onClose,
  chrome,
  onApply,
  currentFile,
  presentation = 'modal',
  onDock,
  printLayout,
  onPrintLayoutChange,
}: Props) {
  const [draft, setDraft] = useState<PrintChromeDoc>(() =>
    normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isDock = presentation === 'dock';

  useEffect(() => {
    if (!isOpen) return;
    const next = normalizePrintChromeDoc(chrome ?? DEFAULT_PRINT_CHROME_DOC);
    setDraft(next);
    setSelectedId(next.templates[0]?.id ?? null);
  }, [chrome, isOpen]);

  const selected = draft.templates.find((t) => t.id === selectedId) ?? null;

  const updateDoc = (partial: Partial<PrintChromeDoc>) => {
    setDraft((prev) => normalizePrintChromeDoc({ ...prev, ...partial }));
  };

  const updateTemplate = (id: string, patch: Partial<PrintChromeTemplate>) => {
    setDraft((prev) =>
      normalizePrintChromeDoc({
        ...prev,
        templates: prev.templates.map((t) =>
          t.id === id ? ({ ...t, ...patch } as PrintChromeTemplate) : t,
        ),
      }),
    );
  };

  const addTemplate = (kind: PrintChromeTemplate['type']) => {
    const next =
      kind === 'page-number'
        ? createDefaultPageNumberTemplate()
        : kind === 'text'
          ? createDefaultTextTemplate()
          : createDefaultImageTemplate();
    setDraft((prev) =>
      normalizePrintChromeDoc({
        ...prev,
        templates: [...prev.templates, next],
      }),
    );
    setSelectedId(next.id);
  };

  const removeTemplate = (id: string) => {
    setDraft((prev) => {
      const templates = prev.templates.filter((t) => t.id !== id);
      return normalizePrintChromeDoc({ ...prev, templates });
    });
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !selected || selected.type !== 'image') return;
    setUploading(true);
    try {
      const path = await uploadPrintEditorImage(file, currentFile);
      updateTemplate(selected.id, { path } as Partial<PrintChromeTemplate>);
    } catch (err) {
      console.warn('[print-chrome] image upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleApply = () => {
    const normalized = normalizePrintChromeDoc(draft);
    if (
      normalized.templates.length === 0 &&
      !normalized.showOnCover &&
      normalized.numbering === 'body'
    ) {
      onApply(null);
    } else {
      onApply(normalized);
    }
    onClose();
  };

  const body = (
    <PrintChromeTooltipProvider>
      <div className="flex flex-col gap-4">
        {!isDock ? (
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
                페이지 크롬
              </h2>
              <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
                쪽번호·고정 텍스트·이미지를 각 페이지에 표시합니다. 적용 후 저장하면 노트에
                기록됩니다.
              </p>
            </div>
            {typeof onDock === 'function' ? (
              <PrintChromeIconTooltip label="우측에 고정">
                <button
                  type="button"
                  onClick={onDock}
                  className="shrink-0 rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
                  aria-label="우측에 고정"
                >
                  <PanelRight size={16} />
                </button>
              </PrintChromeIconTooltip>
            ) : null}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-odp-muted">
            쪽번호·고정 텍스트·이미지. 적용 후 저장하면 노트에 기록됩니다.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 dark:border-odp-borderStrong dark:bg-odp-surface">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-odp-fg">
            <span>표지에 표시</span>
            <Switch.Root
              className={switchRootClass(draft.showOnCover)}
              checked={draft.showOnCover}
              onCheckedChange={(showOnCover) => updateDoc({ showOnCover })}
              aria-label="표지에 크롬 표시"
            >
              <Switch.Thumb className={switchThumbClass} />
            </Switch.Root>
          </label>
          <label className="flex min-w-0 items-center gap-2 text-sm text-gray-700 dark:text-odp-fg">
            <span className="shrink-0">쪽번호 기산</span>
            <Select.Root
              value={draft.numbering}
              onValueChange={(value) =>
                updateDoc({ numbering: value as PrintChromeNumbering })
              }
            >
              <Select.Trigger className={selectTriggerClass} aria-label="쪽번호 기산">
                <Select.Value>
                  {draft.numbering === 'document' ? '표지 포함 (문서 전체)' : '본문부터 (1…)'}
                </Select.Value>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="z-100010 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  position="popper"
                  sideOffset={4}
                >
                  <Select.Viewport className="p-1">
                    <Select.Item
                      value="body"
                      className="cursor-pointer rounded-sm px-3 py-1.5 text-sm outline-none data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg"
                    >
                      <Select.ItemText>본문부터 (1…)</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="document"
                      className="cursor-pointer rounded-sm px-3 py-1.5 text-sm outline-none data-highlighted:bg-gray-100 dark:data-highlighted:bg-odp-focusBg"
                    >
                      <Select.ItemText>표지 포함 (문서 전체)</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </label>
        </div>

        <div
          className={`grid min-h-70 gap-3 ${
            isDock ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-[220px_1fr]'
          }`}
        >
          <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-2 dark:border-odp-borderStrong">
            <div className="flex flex-wrap gap-1">
              <PrintChromeIconTooltip label="쪽번호 템플릿 추가">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
                  onClick={() => addTemplate('page-number')}
                  aria-label="쪽번호 템플릿 추가"
                >
                  <Hash size={12} />
                  쪽번호
                </button>
              </PrintChromeIconTooltip>
              <PrintChromeIconTooltip label="텍스트 템플릿 추가">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
                  onClick={() => addTemplate('text')}
                  aria-label="텍스트 템플릿 추가"
                >
                  <Type size={12} />
                  텍스트
                </button>
              </PrintChromeIconTooltip>
              <PrintChromeIconTooltip label="이미지 템플릿 추가">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
                  onClick={() => addTemplate('image')}
                  aria-label="이미지 템플릿 추가"
                >
                  <ImageIcon size={12} />
                  이미지
                </button>
              </PrintChromeIconTooltip>
            </div>
            <ul className="min-h-0 flex-1 space-y-1 overflow-auto">
              {draft.templates.length === 0 ? (
                <li className="px-1 py-6 text-center text-xs text-gray-400">
                  <Plus size={14} className="mx-auto mb-1 opacity-60" />
                  템플릿을 추가하세요
                </li>
              ) : (
                draft.templates.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs ${
                        selectedId === t.id
                          ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg'
                      }`}
                    >
                      {t.type === 'page-number' ? (
                        <Hash size={12} className="shrink-0" />
                      ) : t.type === 'text' ? (
                        <Type size={12} className="shrink-0" />
                      ) : (
                        <ImageIcon size={12} className="shrink-0" />
                      )}
                      <span className="min-w-0 flex-1 truncate">{templateLabel(t)}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-md border border-gray-200 p-3 dark:border-odp-borderStrong">
            {!selected ? (
              <p className="py-10 text-center text-sm text-gray-400">템플릿을 선택하세요</p>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <span>사용</span>
                    <Switch.Root
                      className={switchRootClass(selected.enabled)}
                      checked={selected.enabled}
                      onCheckedChange={(enabled) =>
                        updateTemplate(selected.id, { enabled })
                      }
                      aria-label="템플릿 사용"
                    >
                      <Switch.Thumb className={switchThumbClass} />
                    </Switch.Root>
                  </label>
                  <PrintChromeIconTooltip label="템플릿 삭제">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={() => removeTemplate(selected.id)}
                      aria-label="템플릿 삭제"
                    >
                      <Trash2 size={12} />
                      삭제
                    </button>
                  </PrintChromeIconTooltip>
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                  <span>위치</span>
                  <PositionGridPicker
                    value={selected.position}
                    onChange={(position) =>
                      updateTemplate(selected.id, { position })
                    }
                  />
                </div>

                {selected.type === 'page-number' || selected.type === 'text' ? (
                  <>
                    <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                      글꼴
                      <FontFamilyInput
                        value={selected.fontFamily}
                        onChange={(fontFamily) =>
                          updateTemplate(selected.id, { fontFamily })
                        }
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                      크기 (px)
                      <ScrollStepNumberInput
                        value={selected.fontSizePx}
                        min={PRINT_CHROME_FONT_SIZE_MIN}
                        max={PRINT_CHROME_FONT_SIZE_MAX}
                        ariaLabel="글자 크기"
                        onChange={(fontSizePx) =>
                          updateTemplate(selected.id, { fontSizePx })
                        }
                      />
                    </label>
                  </>
                ) : null}

                {selected.type === 'page-number' ? (
                  <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                    형식 (`{'{page}'}` / `{'{total}'}`)
                    <input
                      className={fieldClass}
                      value={selected.format}
                      onChange={(e) =>
                        updateTemplate(selected.id, { format: e.target.value })
                      }
                    />
                  </label>
                ) : null}

                {selected.type === 'text' ? (
                  <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                    텍스트
                    <textarea
                      className={`${fieldClass} min-h-18`}
                      value={selected.text}
                      onChange={(e) =>
                        updateTemplate(selected.id, { text: e.target.value })
                      }
                    />
                  </label>
                ) : null}

                {selected.type === 'image' ? (
                  <>
                    <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                      경로
                      <input
                        className={fieldClass}
                        value={selected.path}
                        onChange={(e) =>
                          updateTemplate(selected.id, { path: e.target.value })
                        }
                        placeholder="vault 상대 경로"
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <PrintChromeIconTooltip label="이미지 파일 업로드">
                        <button
                          type="button"
                          disabled={uploading}
                          className="inline-flex items-center gap-1 rounded border border-gray-300 px-2.5 py-1.5 text-xs disabled:opacity-50 dark:border-odp-borderStrong"
                          onClick={() => fileInputRef.current?.click()}
                          aria-label="이미지 업로드"
                        >
                          <ImageIcon size={12} />
                          {uploading ? '업로드 중…' : '이미지 업로드'}
                        </button>
                      </PrintChromeIconTooltip>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => void handleUpload(e)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                        너비 (px)
                        <ScrollStepNumberInput
                          value={selected.widthPx}
                          min={PRINT_CHROME_IMAGE_SIZE_MIN}
                          max={PRINT_CHROME_IMAGE_SIZE_MAX}
                          ariaLabel="이미지 너비"
                          onChange={(widthPx) =>
                            updateTemplate(selected.id, { widthPx })
                          }
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-odp-muted">
                        높이 (px)
                        <ScrollStepNumberInput
                          value={selected.heightPx}
                          min={PRINT_CHROME_IMAGE_SIZE_MIN}
                          max={PRINT_CHROME_IMAGE_SIZE_MAX}
                          ariaLabel="이미지 높이"
                          onChange={(heightPx) =>
                            updateTemplate(selected.id, { heightPx })
                          }
                        />
                      </label>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {printLayout && typeof onPrintLayoutChange === 'function' ? (
          <PrintPageMarginsEditor
            printLayout={printLayout}
            onPrintLayoutChange={onPrintLayoutChange}
          />
        ) : null}

        <div className="flex justify-end gap-2 border-t border-gray-200 pt-3 dark:border-odp-borderStrong">
          <PrintChromeIconTooltip label="변경 취소">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
              onClick={onClose}
              aria-label="취소"
            >
              <Undo2 size={14} />
              취소
            </button>
          </PrintChromeIconTooltip>
          <PrintChromeIconTooltip label="크롬 설정 적용">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              onClick={handleApply}
              aria-label="적용"
            >
              <Check size={14} />
              적용
            </button>
          </PrintChromeIconTooltip>
        </div>
      </div>
    </PrintChromeTooltipProvider>
  );

  if (isDock) {
    if (!isOpen) return null;
    return (
      <div className="flex flex-col gap-3 p-3 pb-4">
        {body}
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleApply}
      ignoreEnterInFields
      contentClassName="max-w-3xl"
    >
      {/* Extra padding clears corner resize handles */}
      <div className="flex flex-col gap-4 p-5 pb-8 pt-6 sm:p-6 sm:pb-9">{body}</div>
    </Modal>
  );
}
