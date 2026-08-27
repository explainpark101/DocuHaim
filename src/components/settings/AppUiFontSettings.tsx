import { useCallback, useEffect, useMemo, useState } from 'react';
import { Type } from 'lucide-react';
import FontFamilyInput from '@/components/FontFamilyInput';
import { IconRefresh } from '@/components/icons';
import { buildAppUiFontFamilyOptions } from '@/utils/fontOptions';
import {
  invalidateSystemFontFamiliesCache,
  loadSystemFontFamilies,
} from '@/utils/systemFontFamilies';
import {
  loadUiFontFamily,
  saveUiFontFamily,
  UI_FONT_CHANGED_EVENT,
} from '@/utils/uiFontSettings';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

const DEFAULT_UI_FONT_HINT = 'Paperozi / A2z (기본)';

export default function AppUiFontSettings() {
  const [fontFamily, setFontFamily] = useState(() => loadUiFontFamily());
  const [systemFonts, setSystemFonts] = useState<string[]>([]);
  const [systemFontsLoading, setSystemFontsLoading] = useState(isTauriDesktopPlatform());
  const [optionsTick, setOptionsTick] = useState(0);

  const refreshSystemFonts = useCallback(async () => {
    if (!isTauriDesktopPlatform()) return;
    setSystemFontsLoading(true);
    try {
      invalidateSystemFontFamiliesCache();
      const families = await loadSystemFontFamilies();
      setSystemFonts(families);
    } finally {
      setSystemFontsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSystemFonts();
  }, [refreshSystemFonts]);

  useEffect(() => {
    const onUiFontChanged = () => setFontFamily(loadUiFontFamily());
    const onWebfontsChanged = () => setOptionsTick((n) => n + 1);
    window.addEventListener(UI_FONT_CHANGED_EVENT, onUiFontChanged);
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onWebfontsChanged);
    return () => {
      window.removeEventListener(UI_FONT_CHANGED_EVENT, onUiFontChanged);
      window.removeEventListener(WEBFONTS_CHANGED_EVENT, onWebfontsChanged);
    };
  }, []);

  const fontOptions = useMemo(
    () => buildAppUiFontFamilyOptions(systemFonts),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionsTick refreshes vault webfont names
    [systemFonts, optionsTick],
  );

  const handleChange = (value: string) => {
    setFontFamily(value);
    saveUiFontFamily(value);
  };

  const handleReset = () => {
    setFontFamily('');
    saveUiFontFamily('');
  };

  return (
    <div className="mb-4 border-b border-gray-200 pb-4 dark:border-odp-borderSoft">
      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        <Type className="h-4 w-4 shrink-0 text-gray-500 dark:text-odp-muted" aria-hidden />
        <h4 className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">앱 글꼴</h4>
      </div>
      <p className="mb-3 text-[11px] leading-relaxed text-gray-500 dark:text-odp-muted">
        사이드바·설정·에디터 등 앱 전체 UI에 적용됩니다. 웹폰트는 설정 → 웹폰트에서 추가할 수
        있습니다.
        {isTauriDesktopPlatform() ? (
          <>
            {' '}
            데스크톱 앱에서는 기기에 설치된 글꼴도 선택할 수 있습니다.
          </>
        ) : null}
      </p>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-gray-700 dark:text-odp-fgStrong">
          글꼴
        </span>
        <FontFamilyInput
          id="settings-ui-font-family"
          value={fontFamily}
          onChange={handleChange}
          options={fontOptions}
          placeholder={DEFAULT_UI_FONT_HINT}
        />
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg"
        >
          <IconRefresh size={14} aria-hidden />
          기본값으로 복원
        </button>
        {isTauriDesktopPlatform() ? (
          <button
            type="button"
            onClick={() => void refreshSystemFonts()}
            disabled={systemFontsLoading}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg dark:hover:bg-odp-focusBg"
          >
            <IconRefresh size={14} aria-hidden />
            {systemFontsLoading ? '시스템 글꼴 불러오는 중…' : '시스템 글꼴 새로고침'}
          </button>
        ) : null}
      </div>
      {!fontFamily ? (
        <p className="mt-2 text-[11px] text-gray-500 dark:text-odp-muted">
          현재: {DEFAULT_UI_FONT_HINT}
        </p>
      ) : null}
    </div>
  );
}
