import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/shared/modals/Modal';
import FontFamilyInput from '@/components/editor/FontFamilyInput';
import { buildFontFamilyOptions } from '@/utils/fontOptions';
import {
  DEFAULT_DOCUMENT_SETTINGS_META,
  DEFAULT_SOURCE_LIST_TITLE,
} from '@/utils/documentSettingsMeta';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';

export default function DocumentSettingsModal({
  isOpen,
  onClose,
  settings,
  onApply
}: any) {
  const [local, setLocal] = useState(() => settings ?? DEFAULT_DOCUMENT_SETTINGS_META);
  const [fontOptionsTick, setFontOptionsTick] = useState(0);

  useEffect(() => {
    if (isOpen) setLocal(settings ?? DEFAULT_DOCUMENT_SETTINGS_META);
  }, [isOpen, settings]);

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

  const updateSourceList = (patch: any) => {
    setLocal((prev: any) => ({
      ...prev,
      sourceList: { ...prev.sourceList, ...patch }
    }));
  };

  const updateFont = (key: any, value: any) => {
    setLocal((prev: any) => ({
      ...prev,
      fonts: { ...prev.fonts, [key]: value }
    }));
  };

  const handleResetFonts = () => {
    setLocal((prev: any) => ({
      ...prev,
      fonts: { ...DEFAULT_DOCUMENT_SETTINGS_META.fonts },
      webfontCss: ''
    }));
  };

  const handleApply = () => {
    onApply?.({
      ...local,
      v: 1,
      sourceList: {
        show: local.sourceList?.show !== false,
        title: local.sourceList?.title?.trim() || DEFAULT_SOURCE_LIST_TITLE,
      },
      fonts: { ...DEFAULT_DOCUMENT_SETTINGS_META.fonts, ...local.fonts },
      webfontCss: local.webfontCss ?? '',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleApply}
      ignoreEnterInFields
      contentClassName="w-[min(92vw,720px)] max-h-[90vh]"
    >
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="flex max-h-[90vh] flex-col gap-5 overflow-y-auto p-6">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            문서 설정
          // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h2' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </h2>
          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            이 설정은 현재 마크다운 문서에만 저장됩니다.
          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
          </p>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>

        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        <section className="grid gap-3">
          // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            각주 Source List
          // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
          </h3>
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-odp-fgStrong">
            // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            <input
              type="checkbox"
              checked={local.sourceList?.show !== false}
              onChange={(e: any) => updateSourceList({ show: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            문서 아래쪽에 source list 표시
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          <label className="block">
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
              표시 이름
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
            </span>
            // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'input' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
            <input
              type="text"
              value={local.sourceList?.title ?? DEFAULT_SOURCE_LIST_TITLE}
              onChange={(e: any) => updateSourceList({ title: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fgStrong"
              placeholder={DEFAULT_SOURCE_LIST_TITLE}
            />
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
          </label>
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        </section>

        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        <section className="grid gap-3">
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="flex items-center justify-between gap-3">
            // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            <h3 className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
              문서 폰트
            // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'h3' does not exist on type 'JSX.Intrinsi... Remove this comment to see the full error message
            </h3>
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            <button
              type="button"
              onClick={handleResetFonts}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-odp-muted dark:hover:text-odp-fg"
            >
              폰트 초기화
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </button>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ['body', '본문', '예: Noto Sans KR, serif'],
              ['heading', '제목', '예: Noto Serif KR, Georgia'],
              ['bold', '굵은 글씨', '예: Noto Sans KR, sans-serif'],
              ['code', '코드', '예: JetBrains Mono, monospace'],
            ].map(([key, label, placeholder]) => (
              <label key={key} className="block">
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
                  {label}
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
                </span>
                <FontFamilyInput
                  id={`document-font-${key}`}
                  // @ts-expect-error TS(2538) FIXME: Type 'undefined' cannot be used as an index type.
                  value={local.fonts?.[key] ?? ''}
                  onChange={(v: any) => updateFont(key, v)}
                  options={fontOptions}
                  placeholder={placeholder}
                />
              // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
              </label>
            ))}
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'section' does not exist on type 'JSX.Int... Remove this comment to see the full error message
        </section>

        // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        <label className="block">
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
            이 문서 전용 Webfont CSS
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          </span>
          // @ts-expect-error TS(2339): Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'textarea' does not exist on type 'JSX.In... Remove this comment to see the full error message
          <textarea
            value={local.webfontCss ?? ''}
            onChange={(e: any) => setLocal((prev: any) => ({
              ...prev,
              webfontCss: e.target.value
            }))}
            rows={7}
            className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fgStrong"
            placeholder="@import url('https://...');&#10;@font-face { font-family: 'My Font'; src: url('...'); }"
            spellCheck={false}
          />
        // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'label' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
        </label>

        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex justify-end gap-2 pt-1">
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg"
          >
            취소
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          <button
            type="button"
            onClick={handleApply}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            적용
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
          </button>
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
    </Modal>
  );
}
