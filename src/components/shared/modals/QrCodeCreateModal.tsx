import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  Check,
  ChevronDown,
  Loader2,
  Plus,
  QrCode,
  ScanLine,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import { Select, Tabs } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import QrCodeDecodeTab from '@/components/shared/modals/QrCodeDecodeTab';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';
import {
  CSS_HEX_CHECKER_STYLE,
  cssHexToInputValue,
  normalizeCssHexColor,
} from '@/utils/cssColor';
import {
  generateQrCodeSvg,
  QR_DEFAULT_DARK,
  QR_DEFAULT_ERROR_CORRECTION,
  QR_DEFAULT_LIGHT,
  QR_DEFAULT_MARGIN,
  QR_DEFAULT_WIDTH,
  qrCodeSvgToFile,
  type QrErrorCorrectionLevel,
} from '@/utils/qrCodeSvg';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  /** Upload SVG as wiki image and insert into the note. */
  onConfirm: (file: File) => void | Promise<void>;
  /** Insert decoded QR payload text into the note (read tab). */
  onInsertDecodedText?: ((text: string) => void | Promise<void>) | undefined;
  disabled?: boolean | undefined;
  /** Prefill the content field when the modal opens (e.g. editor selection). */
  initialText?: string | undefined;
};

type QrModalTab = 'create' | 'read';

const PREVIEW_DEBOUNCE_MS = 220;

const TAB_TRIGGER_CLASS =
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white';


const ERROR_CORRECTION_OPTIONS: ReadonlyArray<{
  value: QrErrorCorrectionLevel;
  label: string;
  description: string;
}> = [
  { value: 'L', label: 'L (~7%)', description: '용량 최대 / 손상 복원 최소' },
  { value: 'M', label: 'M (~15%)', description: '일반 용도' },
  { value: 'Q', label: 'Q (~25%)', description: '인쇄·손상 대비' },
  { value: 'H', label: 'H (~30%)', description: '최대 복원 (기본)' },
];

const SELECT_TRIGGER_CLASS =
  'inline-flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

const SELECT_CONTENT_CLASS =
  'z-100010 max-h-60 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const SELECT_ITEM_CLASS =
  'relative flex cursor-pointer select-none flex-col gap-0.5 rounded-sm py-1.5 pl-7 pr-3 text-sm text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg';

const NUMBER_INPUT_CLASS =
  'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft';

type QrColorFieldProps = {
  label: string;
  value: string;
  disabled?: boolean | undefined;
  onChange: (next: string) => void;
};

function QrColorField({ label, value, disabled = false, onChange }: QrColorFieldProps) {
  const hex = cssHexToInputValue(normalizeCssHexColor(value) || value);

  const setColor = (raw: string) => {
    const color = normalizeCssHexColor(raw.startsWith('#') ? raw : `#${raw}`);
    if (color) onChange(color);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className="shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
          {label}
        </span>
        <span
          className="inline-block h-5 w-5 overflow-hidden rounded border border-black/10"
          style={CSS_HEX_CHECKER_STYLE}
          aria-hidden
        >
          <span className="block h-full w-full" style={{ backgroundColor: hex }} />
        </span>
      </div>
      <div className="rounded-md border border-gray-200 p-2 dark:border-odp-borderStrong">
        <div className="[&_.react-colorful]:h-28 [&_.react-colorful]:w-full">
          <HexAlphaColorPicker color={hex} onChange={setColor} />
        </div>
        <HexColorInput
          alpha
          prefixed
          color={hex}
          disabled={disabled}
          onChange={setColor}
          className="mt-2 w-full rounded border border-gray-300 bg-white px-2 py-1.5 font-mono text-xs disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
      </div>
    </div>
  );
}

/**
 * Create SVG QR wiki images, or decode text from an attached QR image.
 */
export default function QrCodeCreateModal({
  isOpen,
  onClose,
  onConfirm,
  onInsertDecodedText,
  disabled = false,
  initialText = '',
}: Props) {
  const [tab, setTab] = useState<QrModalTab>('create');
  const [text, setText] = useState('');
  const [svg, setSvg] = useState('');
  const [previewError, setPreviewError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [previewing, setPreviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QrErrorCorrectionLevel>(
    QR_DEFAULT_ERROR_CORRECTION,
  );
  const [width, setWidth] = useState(QR_DEFAULT_WIDTH);
  const [margin, setMargin] = useState(QR_DEFAULT_MARGIN);
  const [darkColor, setDarkColor] = useState(QR_DEFAULT_DARK);
  const [lightColor, setLightColor] = useState(QR_DEFAULT_LIGHT);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const genSeqRef = useRef(0);

  const qrOptions = useMemo(
    () => ({
      errorCorrectionLevel,
      width,
      margin,
      color: { dark: darkColor, light: lightColor },
    }),
    [darkColor, errorCorrectionLevel, lightColor, margin, width],
  );

  useEffect(() => {
    if (!isOpen) return;
    setTab('create');
    setText(String(initialText ?? ''));
    setSvg('');
    setPreviewError('');
    setSubmitError('');
    setPreviewing(false);
    setSubmitting(false);
    setAdvancedOpen(false);
    setErrorCorrectionLevel(QR_DEFAULT_ERROR_CORRECTION);
    setWidth(QR_DEFAULT_WIDTH);
    setMargin(QR_DEFAULT_MARGIN);
    setDarkColor(QR_DEFAULT_DARK);
    setLightColor(QR_DEFAULT_LIGHT);
    const t = window.setTimeout(() => textareaRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [initialText, isOpen]);

  useEffect(() => {
    if (!isOpen || tab !== 'create') return undefined;
    const trimmed = text.trim();
    if (!trimmed) {
      setSvg('');
      setPreviewError('');
      setPreviewing(false);
      return undefined;
    }

    const seq = ++genSeqRef.current;
    setPreviewing(true);
    setPreviewError('');
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const next = await generateQrCodeSvg(trimmed, qrOptions);
          if (genSeqRef.current !== seq) return;
          setSvg(next);
          setPreviewError('');
        } catch (err) {
          if (genSeqRef.current !== seq) return;
          setSvg('');
          setPreviewError(
            err instanceof Error ? err.message : 'QR 코드를 만들 수 없습니다.',
          );
        } finally {
          if (genSeqRef.current === seq) setPreviewing(false);
        }
      })();
    }, PREVIEW_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen, qrOptions, tab, text]);

  useEffect(() => {
    if (!svg) {
      setPreviewUrl('');
      return undefined;
    }
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [svg]);

  const handleConfirm = async () => {
    if (disabled || submitting) return;
    const trimmed = text.trim();
    if (!trimmed) {
      setSubmitError('QR로 만들 텍스트를 입력하세요.');
      return;
    }
    if (!svg) {
      setSubmitError(previewError || '미리보기가 준비될 때까지 기다려 주세요.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      const file = qrCodeSvgToFile(svg, trimmed);
      await onConfirm(file);
      onClose();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : '노트에 QR 이미지를 넣는 데 실패했습니다.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onFieldKeyDown = (event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    event.stopPropagation();
    void handleConfirm();
  };

  const busy = submitting || disabled;
  const canInsert = Boolean(svg) && !previewing && !busy;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ignoreEnterInFields
      contentClassName="max-w-lg max-h-[90vh]"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-2">
          <QrCode size={20} className="text-gray-700 dark:text-odp-fgStrong" aria-hidden />
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            QRCode
          </h2>
        </div>

        <Tabs.Root
          value={tab}
          onValueChange={(next) => {
            setTab(next === 'read' ? 'read' : 'create');
          }}
        >
          <Tabs.List className="flex gap-1 rounded-md border border-gray-200 p-0.5 dark:border-odp-borderSoft">
            <Tabs.Trigger value="create" className={TAB_TRIGGER_CLASS}>
              <Plus size={13} aria-hidden className="opacity-80" />
              만들기
            </Tabs.Trigger>
            <Tabs.Trigger value="read" className={TAB_TRIGGER_CLASS}>
              <ScanLine size={13} aria-hidden className="opacity-80" />
              읽기
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="create" className="mt-4 flex flex-col gap-4 outline-none">
            <p className="text-xs leading-5 text-gray-500 dark:text-odp-muted">
              텍스트·URL을 고화질 SVG QR로 만든 뒤 노트에{' '}
              <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">![[path]]</code>{' '}
              wiki image로 삽입합니다. Ctrl+Enter 또는 ⌘+Enter로 삽입합니다.
            </p>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                내용
              </span>
              <textarea
                ref={textareaRef}
                value={text}
                rows={4}
                disabled={busy}
                onChange={(event) => {
                  setText(event.target.value);
                  if (submitError) setSubmitError('');
                }}
                onKeyDown={onFieldKeyDown}
                placeholder="https://example.com 또는 임의의 텍스트"
                className="w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              />
            </label>

            <SettingsCollapsibleContainer
              contentKey="qr-code-create-advanced"
              open={advancedOpen}
              onOpenChange={setAdvancedOpen}
              className={`rounded-md border border-gray-200 dark:border-odp-borderSoft ${
                advancedOpen ? '' : 'bg-slate-300/90 dark:bg-slate-950/40'
              }`}
            >
              <SettingsCollapsibleHeading
                unstyled
                className={`flex w-full items-center gap-2 px-3 py-2 text-left ${
                  advancedOpen ? 'rounded-t' : 'rounded'
                }`}
              >
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-odp-fgStrong">
                  <SlidersHorizontal size={14} className="opacity-70" aria-hidden />
                  상세설정
                </span>
              </SettingsCollapsibleHeading>
              <SettingsCollapsibleContent>
                <div className="space-y-3 border-t border-gray-200 px-3 pb-3 pt-3 dark:border-odp-borderSoft">
                  <p className="text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
                    오류 보정·여백·크기·색상은 미리보기에 바로 반영됩니다.
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                    <label
                      htmlFor="qr-error-correction"
                      className="shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-odp-fgStrong"
                    >
                      오류 보정 레벨
                    </label>
                    <div className="min-w-0 flex-1 sm:max-w-56">
                      <Select.Root
                        value={errorCorrectionLevel}
                        onValueChange={(next) => {
                          if (
                            next === 'L' ||
                            next === 'M' ||
                            next === 'Q' ||
                            next === 'H'
                          ) {
                            setErrorCorrectionLevel(next);
                          }
                        }}
                        disabled={busy}
                      >
                        <Select.Trigger
                          id="qr-error-correction"
                          aria-label="오류 보정 레벨"
                          className={SELECT_TRIGGER_CLASS}
                        >
                          <Select.Value />
                          <Select.Icon className="text-gray-500">
                            <ChevronDown size={14} />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content
                            className={SELECT_CONTENT_CLASS}
                            position="popper"
                            sideOffset={4}
                          >
                            <Select.Viewport className="p-1">
                              {ERROR_CORRECTION_OPTIONS.map((opt) => (
                                <Select.Item
                                  key={opt.value}
                                  value={opt.value}
                                  className={SELECT_ITEM_CLASS}
                                >
                                  <Select.ItemIndicator className="absolute left-1.5 top-2 inline-flex items-center">
                                    <Check size={12} />
                                  </Select.ItemIndicator>
                                  <Select.ItemText>{opt.label}</Select.ItemText>
                                  <span className="text-[10px] text-gray-500 dark:text-odp-muted">
                                    {opt.description}
                                  </span>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                        크기 (px)
                      </span>
                      <input
                        type="number"
                        min={64}
                        max={2048}
                        step={1}
                        value={width}
                        disabled={busy}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          setWidth(
                            Number.isFinite(next)
                              ? Math.min(2048, Math.max(64, Math.round(next)))
                              : QR_DEFAULT_WIDTH,
                          );
                        }}
                        onKeyDown={onFieldKeyDown}
                        className={NUMBER_INPUT_CLASS}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                        여백 (모듈)
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={16}
                        step={1}
                        value={margin}
                        disabled={busy}
                        onChange={(event) => {
                          const next = Number(event.target.value);
                          setMargin(
                            Number.isFinite(next)
                              ? Math.min(16, Math.max(0, Math.round(next)))
                              : QR_DEFAULT_MARGIN,
                          );
                        }}
                        onKeyDown={onFieldKeyDown}
                        className={NUMBER_INPUT_CLASS}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <QrColorField
                      label="전경색"
                      value={darkColor}
                      disabled={busy}
                      onChange={setDarkColor}
                    />
                    <QrColorField
                      label="배경색"
                      value={lightColor}
                      disabled={busy}
                      onChange={setLightColor}
                    />
                  </div>
                </div>
              </SettingsCollapsibleContent>
            </SettingsCollapsibleContainer>

            <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 bg-white p-4 dark:border-odp-borderStrong dark:bg-odp-bgSoft">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="QR 미리보기"
                  className="h-48 w-48 object-contain"
                  style={CSS_HEX_CHECKER_STYLE}
                />
              ) : (
                <div className="flex h-48 w-48 items-center justify-center text-xs text-gray-400 dark:text-odp-muted">
                  {previewing ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Loader2 size={14} className="animate-spin" aria-hidden />
                      생성 중…
                    </span>
                  ) : (
                    '미리보기'
                  )}
                </div>
              )}
              {previewError ? (
                <p className="text-xs text-red-600 dark:text-red-300">{previewError}</p>
              ) : null}
            </div>

            {submitError ? (
              <p className="text-xs text-red-600 dark:text-red-300">{submitError}</p>
            ) : null}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
              >
                <X size={16} />
                취소
              </button>
              <button
                type="button"
                onClick={() => {
                  void handleConfirm();
                }}
                disabled={!canInsert}
                className="inline-flex items-center gap-1.5 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                ) : (
                  <Check size={16} />
                )}
                노트에 삽입
              </button>
            </div>
          </Tabs.Content>

          <Tabs.Content value="read" className="mt-4 outline-none">
            <QrCodeDecodeTab
              disabled={disabled}
              onClose={onClose}
              {...(onInsertDecodedText
                ? { onInsertText: onInsertDecodedText }
                : {})}
            />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Modal>
  );
}

