import { useState, useEffect, useMemo } from 'react';
import Modal from '@/components/shared/modals/Modal';
import FontFamilyInput from '@/components/editor/FontFamilyInput';
import { buildFontFamilyOptions } from '@/utils/fontOptions';
import { savePrintFontsToStorage, DEFAULT_PRINT_FONTS } from '@/utils/print/printSettingsStore';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';

export { DEFAULT_PRINT_FONTS };

export default function PrintFontOptionsModal({
  isOpen,
  onClose,
  fonts,
  onFontsChange
}: any) {
  const [localFonts, setLocalFonts] = useState(() => fonts || { ...DEFAULT_PRINT_FONTS });
  const [saving, setSaving] = useState(false);
  const [fontOptionsTick, setFontOptionsTick] = useState(0);

  useEffect(() => {
    if (isOpen && fonts) {
      setLocalFonts(fonts);
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

  const update = (key: any, value: any) => {
    const next = { ...localFonts, [key]: value };
    setLocalFonts(next);
    onFontsChange?.(next);
  };

  const handleApply = async () => {
    setSaving(true);
    try {
      await savePrintFontsToStorage(localFonts);
      onFontsChange?.(localFonts);
      onClose?.();
    } catch (e) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      alert('저장에 실패했습니다: ' + (e?.message || e));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalFonts({ ...DEFAULT_PRINT_FONTS });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={saving ? undefined : handleApply} ignoreEnterInFields>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="p-6 flex flex-col gap-4">
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          프린트 폰트 설정
        // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
        </h2>
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          PDF로 내보낼 때 적용될 폰트를 설정합니다. 비워두면 기본 폰트가 사용됩니다.
          웹폰트는 설정 → 웹폰트(CSS)에서 추가할 수 있습니다.
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        </p>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="grid gap-4">
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="block">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              본문
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            <FontFamilyInput
              id="print-font-body"
              value={localFonts.body}
              onChange={(v: any) => update('body', v)}
              options={fontOptions}
              placeholder="예: Noto Sans KR, serif"
            />
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="block">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              제목 (h1~h10)
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            <FontFamilyInput
              id="print-font-heading"
              value={localFonts.heading}
              onChange={(v: any) => update('heading', v)}
              options={fontOptions}
              placeholder="예: Noto Serif KR, Georgia"
            />
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="block">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              굵은 글씨 (b, strong)
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            <FontFamilyInput
              id="print-font-bold"
              value={localFonts.bold}
              onChange={(v: any) => update('bold', v)}
              options={fontOptions}
              placeholder="예: Noto Sans KR, sans-serif"
            />
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="block">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              코드 블록 (code, pre)
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            <FontFamilyInput
              id="print-font-code"
              value={localFonts.code}
              onChange={(v: any) => update('code', v)}
              options={fontOptions}
              placeholder="예: Consolas, monospace"
            />
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex items-center justify-between gap-2 pt-2">
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-odp-muted dark:hover:text-odp-fg"
          >
            기본값으로 초기화
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex gap-2">
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              취소
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              onClick={handleApply}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중…' : '적용'}
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    </Modal>
  );
}
