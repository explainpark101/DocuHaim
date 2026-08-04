import { useState, useEffect } from 'react';
import Modal from '@/components/modals/Modal';
import FontFamilyInput from '@/components/FontFamilyInput';
import { savePrintFontsToStorage, DEFAULT_PRINT_FONTS } from '@/utils/printSettingsStore';

const FONT_OPTIONS = [
  'Georgia',
  'Times New Roman',
  'Palatino Linotype',
  'Garamond',
  'Noto Sans KR',
  'Noto Serif KR',
  'Nanum Gothic',
  'Nanum Myeongjo',
  'Malgun Gothic',
  'Apple SD Gothic Neo',
  'system-ui',
  'sans-serif',
  'serif',
  'monospace',
  'Consolas',
  'Monaco',
  'Menlo',
  'Courier New',
  'Source Code Pro',
  'Fira Code',
];

export { DEFAULT_PRINT_FONTS };

export default function PrintFontOptionsModal({ isOpen, onClose, fonts, onFontsChange }) {
  const [localFonts, setLocalFonts] = useState(() => fonts || { ...DEFAULT_PRINT_FONTS });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && fonts) {
      setLocalFonts(fonts);
    }
  }, [isOpen, fonts]);

  const update = (key, value) => {
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
      alert('저장에 실패했습니다: ' + (e?.message || e));
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalFonts({ ...DEFAULT_PRINT_FONTS });
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
          프린트 폰트 설정
        </h2>
        <p className="text-xs text-gray-500 dark:text-odp-muted">
          PDF로 내보낼 때 적용될 폰트를 설정합니다. 비워두면 기본 폰트가 사용됩니다.
        </p>

        <div className="grid gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              본문
            </span>
            <FontFamilyInput
              id="print-font-body"
              value={localFonts.body}
              onChange={(v) => update('body', v)}
              options={FONT_OPTIONS}
              placeholder="예: Noto Sans KR, serif"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              제목 (h1~h6)
            </span>
            <FontFamilyInput
              id="print-font-heading"
              value={localFonts.heading}
              onChange={(v) => update('heading', v)}
              options={FONT_OPTIONS}
              placeholder="예: Noto Serif KR, Georgia"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              굵은 글씨 (b, strong)
            </span>
            <FontFamilyInput
              id="print-font-bold"
              value={localFonts.bold}
              onChange={(v) => update('bold', v)}
              options={FONT_OPTIONS}
              placeholder="예: Noto Sans KR, sans-serif"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 dark:text-odp-fgStrong mb-1">
              코드 블록 (code, pre)
            </span>
            <FontFamilyInput
              id="print-font-code"
              value={localFonts.code}
              onChange={(v) => update('code', v)}
              options={FONT_OPTIONS}
              placeholder="예: Consolas, monospace"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
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
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-100 dark:bg-odp-bgSoft hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '저장 중…' : '적용'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
