import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_WEBFONT_SETTINGS,
  extractFontFamilyNamesFromCss,
  loadWebfontsFromStorage,
  saveWebfontsToStorage,
  type WebfontSettings,
} from '@/utils/webfontSettingsStore';

const EXAMPLE_CSS = `/* Example — paste @font-face or @import CSS here
@font-face {
  font-family: 'MyFont';
  src: url('https://example.com/myfont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
*/`;

export default function WebfontSettings() {
  const [css, setCss] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setError(null);
    try {
      const next = await loadWebfontsFromStorage();
      setCss(next.css);
      setLoaded(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const families = extractFontFamilyNamesFromCss(css);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload: WebfontSettings = {
        ...DEFAULT_WEBFONT_SETTINGS,
        css,
      };
      await saveWebfontsToStorage(payload);
      setSavedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      id="settings-webfonts"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-1 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">웹폰트 (CSS)</h3>
      <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
        `@font-face` / `@import` CSS를 저장하면 앱 전역(표지·인쇄·에디터 제안 목록 등)에서
        사용할 수 있습니다. Haim vault의{' '}
        <code className="rounded bg-gray-200/80 px-1 dark:bg-odp-bgSoft">.settings/webfonts.json</code>
        에 동기화됩니다. 한글 웹폰트는{' '}
        <a
          href="https://noonnu.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          noonnu.cc
        </a>
        에서 찾을 수 있습니다.
      </p>

      {!loaded ? (
        <p className="text-xs text-gray-500 dark:text-odp-muted">불러오는 중…</p>
      ) : (
        <>
          <label className="mb-2 block">
            <span className="mb-1 block text-xs font-medium text-gray-700 dark:text-odp-fgStrong">
              CSS
            </span>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              rows={12}
              spellCheck={false}
              placeholder={EXAMPLE_CSS}
              className="w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            />
          </label>

          <div className="mb-3 rounded border border-gray-200 bg-white/70 px-3 py-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
            <div className="mb-1 text-[11px] font-semibold text-gray-600 dark:text-odp-fgMuted">
              감지된 font-family
            </div>
            {families.length === 0 ? (
              <p className="text-[11px] text-gray-400 dark:text-odp-muted">
                `@font-face` 안의 font-family가 여기 표시됩니다.
              </p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {families.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
                    style={{ fontFamily: name }}
                    title={name}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error ? (
            <p className="mb-2 text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          {savedAt ? (
            <p className="mb-2 text-[11px] text-green-700 dark:text-green-400">
              저장됨
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex items-center rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? '저장 중…' : '저장'}
            </button>
            <button
              type="button"
              onClick={() => void reload()}
              disabled={saving}
              className="inline-flex items-center rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-60 dark:border-odp-borderStrong dark:text-odp-fg dark:hover:bg-odp-focusBg"
            >
              다시 불러오기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
