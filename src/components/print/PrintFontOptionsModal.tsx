import { useState, useEffect, useMemo, type ChangeEvent } from 'react';
import Modal from '@/components/modals/Modal';
import FontFamilyInput from '@/components/FontFamilyInput';
import { buildFontFamilyOptions } from '@/utils/fontOptions';
import {
  DEFAULT_PRINT_FONTS,
  normalizePrintBaseFontSizePx,
  normalizePrintLineHeight,
  type PrintFonts,
} from '@/utils/print/printFonts';
import { savePrintFontsToStorage } from '@/utils/printSettingsStore';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';

export { DEFAULT_PRINT_FONTS };

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  fonts?: PrintFonts | null;
  onFontsChange?: (fonts: PrintFonts) => void;
};

function mergeFonts(fonts?: PrintFonts | null): PrintFonts {
  return { ...DEFAULT_PRINT_FONTS, ...(fonts ?? {}) };
}

const fieldClass =
  'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg';

export default function PrintFontOptionsModal({
  isOpen,
  onClose,
  fonts,
  onFontsChange,
}: Props) {
  const [localFonts, setLocalFonts] = useState<PrintFonts>(() => mergeFonts(fonts));
  const [saving, setSaving] = useState(false);
  const [fontOptionsTick, setFontOptionsTick] = useState(0);

  useEffect(() => {
    if (isOpen && fonts) {
      setLocalFonts(mergeFonts(fonts));
    }
  }, [isOpen, fonts]);

  useEffect(() => {
    const onWebfonts = () => setFontOptionsTick((n) => n + 1);
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
    return () => window.removeEventListener(WEBFONTS_CHANGED_EVENT, onWebfonts);
  }, []);

  const fontOptions = useMemo(
    () => buildFontFamilyOptions(),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick refreshes webfont families
    [fontOptionsTick],
  );

  const update = <K extends keyof PrintFonts>(key: K, value: PrintFonts[K]) => {
    const next = { ...localFonts, [key]: value };
    setLocalFonts(next);
    onFontsChange?.(next);
  };

  const updateLineHeight = (
    key: 'bodyLineHeight' | 'headingLineHeight',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const fallback =
      key === 'bodyLineHeight'
        ? DEFAULT_PRINT_FONTS.bodyLineHeight
        : DEFAULT_PRINT_FONTS.headingLineHeight;
    update(key, normalizePrintLineHeight(event.target.value, fallback));
  };

  const updateBaseFontSize = (event: ChangeEvent<HTMLInputElement>) => {
    update(
      'baseFontSizePx',
      normalizePrintBaseFontSizePx(event.target.value, DEFAULT_PRINT_FONTS.baseFontSizePx),
    );
  };

  const handleApply = async () => {
    setSaving(true);
    try {
      const normalized: PrintFonts = {
        ...localFonts,
        bodyLineHeight: normalizePrintLineHeight(
          localFonts.bodyLineHeight,
          DEFAULT_PRINT_FONTS.bodyLineHeight,
        ),
        headingLineHeight: normalizePrintLineHeight(
          localFonts.headingLineHeight,
          DEFAULT_PRINT_FONTS.headingLineHeight,
        ),
        baseFontSizePx: normalizePrintBaseFontSizePx(
          localFonts.baseFontSizePx,
          DEFAULT_PRINT_FONTS.baseFontSizePx,
        ),
      };
      await savePrintFontsToStorage(normalized);
      setLocalFonts(normalized);
      onFontsChange?.(normalized);
      onClose?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      alert(`저장에 실패했습니다: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const next = { ...DEFAULT_PRINT_FONTS };
    setLocalFonts(next);
    onFontsChange?.(next);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={saving ? undefined : handleApply}
      ignoreEnterInFields
      contentClassName="max-w-md max-h-[min(90vh,40rem)] w-[min(92vw,28rem)]"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-gray-100 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            프린트 폰트 설정
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            PDF로 내보낼 때 적용될 폰트·크기·줄간격을 설정합니다. 폰트를 비워두면 기본 폰트가
            사용됩니다. 기본 글자 크기를 바꾸면 제목(em)을 포함한 본문 전체가 함께 스케일됩니다.
            웹폰트는 설정 → 웹폰트(CSS)에서 추가할 수 있습니다.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                기본 글자 크기 (px)
              </span>
              <input
                id="print-font-base-size"
                type="number"
                min={10}
                max={28}
                step={1}
                value={localFonts.baseFontSizePx}
                onChange={updateBaseFontSize}
                className={fieldClass}
              />
              <span className="mt-1 block text-xs text-gray-500 dark:text-odp-muted">
                10–28px. 제목·본문·코드 상대 크기(em)가 이 기준에 맞춰집니다. 기본{' '}
                {DEFAULT_PRINT_FONTS.baseFontSizePx}
              </span>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                본문
              </span>
              <FontFamilyInput
                id="print-font-body"
                value={localFonts.body}
                onChange={(v) => update('body', v)}
                options={fontOptions}
                placeholder="예: Noto Sans KR, serif"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                본문 줄간격
              </span>
              <input
                id="print-line-height-body"
                type="number"
                min={1}
                max={3}
                step={0.05}
                value={localFonts.bodyLineHeight}
                onChange={(event) => updateLineHeight('bodyLineHeight', event)}
                className={fieldClass}
              />
              <span className="mt-1 block text-xs text-gray-500 dark:text-odp-muted">
                배수 (1.0–3.0). 기본 {DEFAULT_PRINT_FONTS.bodyLineHeight}
              </span>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                제목 (h1~h10)
              </span>
              <FontFamilyInput
                id="print-font-heading"
                value={localFonts.heading}
                onChange={(v) => update('heading', v)}
                options={fontOptions}
                placeholder="예: Noto Serif KR, Georgia"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                제목 줄간격
              </span>
              <input
                id="print-line-height-heading"
                type="number"
                min={1}
                max={3}
                step={0.05}
                value={localFonts.headingLineHeight}
                onChange={(event) => updateLineHeight('headingLineHeight', event)}
                className={fieldClass}
              />
              <span className="mt-1 block text-xs text-gray-500 dark:text-odp-muted">
                배수 (1.0–3.0). 기본 {DEFAULT_PRINT_FONTS.headingLineHeight}
              </span>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                굵은 글씨 (b, strong)
              </span>
              <FontFamilyInput
                id="print-font-bold"
                value={localFonts.bold}
                onChange={(v) => update('bold', v)}
                options={fontOptions}
                placeholder="예: Noto Sans KR, sans-serif"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                코드 블록 (code, pre)
              </span>
              <FontFamilyInput
                id="print-font-code"
                value={localFonts.code}
                onChange={(v) => update('code', v)}
                options={fontOptions}
                placeholder="예: Consolas, monospace"
              />
            </label>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-gray-100 px-6 py-3 dark:border-odp-borderSoft">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-odp-muted dark:hover:text-odp-fg"
          >
            기본값으로 초기화
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => {
                void handleApply();
              }}
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? '저장 중…' : '적용'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
