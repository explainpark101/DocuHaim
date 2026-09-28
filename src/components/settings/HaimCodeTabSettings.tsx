import { useEffect, useState } from 'react';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';
import { HAIM_CODE_BLOCK_HIGHLIGHT_LANGUAGES } from '@/components/haimEditor/haimCodeBlockLanguages';
import {
  HAIM_CODE_TAB_CHANGED_EVENT,
  HAIM_CODE_TAB_MAX,
  HAIM_CODE_TAB_MIN,
  HAIM_CODE_TAB_PYTHON_FAMILY,
  loadHaimCodeTabSettings,
  resolveHaimCodeTabWidth,
  saveHaimCodeTabDefaultWidth,
  saveHaimCodeTabLanguageWidth,
  saveHaimCodeTabPythonFamilyWidth,
  type HaimCodeTabSettings,
} from '@/utils/haimCodeTabSettings';

/** Languages shown in the per-language override list (sorted). */
const PER_LANGUAGE_IDS: string[] = Array.from(
  new Set([
    ...HAIM_CODE_BLOCK_HIGHLIGHT_LANGUAGES,
    ...HAIM_CODE_TAB_PYTHON_FAMILY,
    'mermaid',
    'js',
    'jsx',
    'ts',
    'tsx',
    'mojo',
  ]),
).sort((a, b) => a.localeCompare(b));

function TabWidthInput({
  id,
  label,
  hint,
  value,
  placeholder,
  onCommit,
  allowEmpty = false,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number | '';
  placeholder?: string;
  onCommit: (next: number | null) => void;
  allowEmpty?: boolean;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(value === '' ? '' : String(value));
  }, [value]);

  return (
    <label className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
      <span className="min-w-0">
        <span className="block text-xs font-medium text-gray-700 dark:text-odp-fg">
          {label}
        </span>
        {hint ? (
          <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            {hint}
          </span>
        ) : null}
      </span>
      <input
        id={id}
        type="number"
        min={HAIM_CODE_TAB_MIN}
        max={HAIM_CODE_TAB_MAX}
        inputMode="numeric"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          const trimmed = draft.trim();
          if (allowEmpty && trimmed === '') {
            onCommit(null);
            return;
          }
          const n = Number(trimmed);
          if (!Number.isFinite(n)) {
            setDraft(value === '' ? '' : String(value));
            return;
          }
          onCommit(n);
        }}
        className="h-8 w-16 shrink-0 rounded-md border border-gray-300 bg-white px-2 text-right text-xs text-gray-800 outline-none focus:border-blue-500 dark:border-odp-borderStrong dark:bg-odp-bg dark:text-odp-fg"
        aria-label={label}
      />
    </label>
  );
}

/**
 * Global Haim code-block Tab width (default / python-family / per-language).
 */
export default function HaimCodeTabSettings() {
  const [settings, setSettings] = useState<HaimCodeTabSettings>(() =>
    loadHaimCodeTabSettings(),
  );

  useEffect(() => {
    const sync = () => setSettings(loadHaimCodeTabSettings());
    window.addEventListener(HAIM_CODE_TAB_CHANGED_EVENT, sync);
    return () => window.removeEventListener(HAIM_CODE_TAB_CHANGED_EVENT, sync);
  }, []);

  return (
    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-odp-borderStrong">
      <p className="mb-2 text-xs font-medium text-gray-700 dark:text-odp-fg">
        Haim 코드 블록 Tab 너비
      </p>
      <p className="mb-3 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
        Tab / Shift+Tab으로 들여쓰기를 조절합니다(스페이스). 기본값은 대부분 언어 2칸,
        Python 계통({HAIM_CODE_TAB_PYTHON_FAMILY.join(', ')}) 4칸입니다.
      </p>
      <div className="space-y-3">
        <TabWidthInput
          id="haim-code-tab-default"
          label="기본 Tab 너비"
          hint="Python 계통·언어별 설정이 없을 때 사용"
          value={settings.defaultWidth}
          onCommit={(n) => {
            if (n == null) return;
            saveHaimCodeTabDefaultWidth(n);
            setSettings(loadHaimCodeTabSettings());
          }}
        />
        <TabWidthInput
          id="haim-code-tab-python"
          label="Python 계통 Tab 너비"
          hint={HAIM_CODE_TAB_PYTHON_FAMILY.join(', ')}
          value={settings.pythonFamilyWidth}
          onCommit={(n) => {
            if (n == null) return;
            saveHaimCodeTabPythonFamilyWidth(n);
            setSettings(loadHaimCodeTabSettings());
          }}
        />

        <SettingsCollapsibleContainer
          id="settings-haim-code-tab-by-lang"
          contentKey="settings-haim-code-tab-by-lang"
          defaultOpen={false}
          className="rounded-md border border-gray-200 dark:border-odp-borderStrong"
        >
          <SettingsCollapsibleHeading
            className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-xs font-medium text-gray-700 dark:text-odp-fg"
            titleClassName="text-xs font-medium text-gray-700 dark:text-odp-fg"
            subtitle="비우면 기본/계통 값을 따릅니다"
          >
            언어별 Tab 너비
          </SettingsCollapsibleHeading>
          <SettingsCollapsibleContent>
            <ul className="max-h-64 space-y-2 overflow-y-auto border-t border-gray-200 px-2.5 py-2 dark:border-odp-borderStrong">
              {PER_LANGUAGE_IDS.map((lang) => {
                const override = settings.byLanguage[lang];
                const effective = resolveHaimCodeTabWidth(lang, settings);
                return (
                  <li key={lang}>
                    <TabWidthInput
                      id={`haim-code-tab-lang-${lang}`}
                      label={lang}
                      hint={
                        override == null
                          ? `현재 ${effective} (상속)`
                          : `현재 ${override} (개별)`
                      }
                      value={override ?? ''}
                      placeholder={String(effective)}
                      allowEmpty
                      onCommit={(n) => {
                        saveHaimCodeTabLanguageWidth(lang, n);
                        setSettings(loadHaimCodeTabSettings());
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </SettingsCollapsibleContent>
        </SettingsCollapsibleContainer>
      </div>
    </div>
  );
}
