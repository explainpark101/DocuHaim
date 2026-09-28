/**
 * Haim code-block Tab width preferences (spaces per indent).
 * Resolve order: per-language override → python-family width → default width.
 */

export const HAIM_CODE_TAB_CHANGED_EVENT = 's3haim-haim-code-tab';

const STORAGE_KEY = 's3haim_haim_code_tab';

export const HAIM_CODE_TAB_MIN = 1;
export const HAIM_CODE_TAB_MAX = 8;

/** Languages that use the python-family default width. */
export const HAIM_CODE_TAB_PYTHON_FAMILY = [
  'python',
  'python-repl',
  'mojo',
] as const;

/** Default for non-python languages (and unknown / plain). */
export const HAIM_CODE_TAB_DEFAULT_WIDTH = 2;

/** Default for python / python-repl / mojo. */
export const HAIM_CODE_TAB_PYTHON_FAMILY_WIDTH = 4;

export type HaimCodeTabSettings = {
  /** Fallback tab width when no family/override matches. */
  defaultWidth: number;
  /** Tab width for python-family languages. */
  pythonFamilyWidth: number;
  /** Explicit per-language overrides (fence language id → spaces). */
  byLanguage: Record<string, number>;
};

export const HAIM_CODE_TAB_DEFAULT_SETTINGS: HaimCodeTabSettings = {
  defaultWidth: HAIM_CODE_TAB_DEFAULT_WIDTH,
  pythonFamilyWidth: HAIM_CODE_TAB_PYTHON_FAMILY_WIDTH,
  byLanguage: {},
};

const PYTHON_FAMILY_SET = new Set<string>(
  HAIM_CODE_TAB_PYTHON_FAMILY.map((id) => id.toLowerCase()),
);

/** Normalize fence aliases used in markdown (js ↔ javascript, …). */
const LANGUAGE_ALIASES: Readonly<Record<string, string>> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
};

export function clampHaimCodeTabWidth(value: number): number {
  if (!Number.isFinite(value)) return HAIM_CODE_TAB_DEFAULT_WIDTH;
  return Math.min(
    HAIM_CODE_TAB_MAX,
    Math.max(HAIM_CODE_TAB_MIN, Math.round(value)),
  );
}

export function normalizeHaimCodeTabSettings(
  value: unknown,
): HaimCodeTabSettings {
  const obj = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const byLanguage: Record<string, number> = {};
  if (obj.byLanguage && typeof obj.byLanguage === 'object') {
    for (const [key, raw] of Object.entries(
      obj.byLanguage as Record<string, unknown>,
    )) {
      const lang = String(key || '')
        .trim()
        .toLowerCase();
      if (!lang || typeof raw !== 'number') continue;
      byLanguage[lang] = clampHaimCodeTabWidth(raw);
    }
  }
  return {
    defaultWidth: clampHaimCodeTabWidth(
      typeof obj.defaultWidth === 'number'
        ? obj.defaultWidth
        : HAIM_CODE_TAB_DEFAULT_WIDTH,
    ),
    pythonFamilyWidth: clampHaimCodeTabWidth(
      typeof obj.pythonFamilyWidth === 'number'
        ? obj.pythonFamilyWidth
        : HAIM_CODE_TAB_PYTHON_FAMILY_WIDTH,
    ),
    byLanguage,
  };
}

function lookupOverride(
  byLanguage: Record<string, number>,
  lang: string,
): number | undefined {
  if (!lang) return undefined;
  if (byLanguage[lang] != null) return byLanguage[lang];
  const canonical = LANGUAGE_ALIASES[lang];
  if (canonical && byLanguage[canonical] != null) return byLanguage[canonical];
  // Reverse: stored as js while fence is javascript
  for (const [alias, canon] of Object.entries(LANGUAGE_ALIASES)) {
    if (canon === lang && byLanguage[alias] != null) return byLanguage[alias];
  }
  return undefined;
}

/**
 * Resolve indent width (spaces) for a code-block language attribute.
 */
export function resolveHaimCodeTabWidth(
  language: string | null | undefined,
  settings: HaimCodeTabSettings = loadHaimCodeTabSettings(),
): number {
  const lang = String(language ?? '')
    .trim()
    .toLowerCase();
  const override = lookupOverride(settings.byLanguage, lang);
  if (override != null) return override;

  const canonical = LANGUAGE_ALIASES[lang] ?? lang;
  if (PYTHON_FAMILY_SET.has(lang) || PYTHON_FAMILY_SET.has(canonical)) {
    return settings.pythonFamilyWidth;
  }
  return settings.defaultWidth;
}

export function isHaimCodeTabPythonFamily(
  language: string | null | undefined,
): boolean {
  const lang = String(language ?? '')
    .trim()
    .toLowerCase();
  const canonical = LANGUAGE_ALIASES[lang] ?? lang;
  return PYTHON_FAMILY_SET.has(lang) || PYTHON_FAMILY_SET.has(canonical);
}

export function loadHaimCodeTabSettings(): HaimCodeTabSettings {
  if (typeof window === 'undefined') {
    return { ...HAIM_CODE_TAB_DEFAULT_SETTINGS, byLanguage: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...HAIM_CODE_TAB_DEFAULT_SETTINGS, byLanguage: {} };
    return normalizeHaimCodeTabSettings(JSON.parse(raw));
  } catch {
    return { ...HAIM_CODE_TAB_DEFAULT_SETTINGS, byLanguage: {} };
  }
}

export function saveHaimCodeTabSettings(settings: HaimCodeTabSettings): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeHaimCodeTabSettings(settings);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(HAIM_CODE_TAB_CHANGED_EVENT, {
        detail: { settings: normalized },
      }),
    );
  } catch {
    // ignore
  }
}

export function saveHaimCodeTabDefaultWidth(width: number): void {
  const prev = loadHaimCodeTabSettings();
  saveHaimCodeTabSettings({
    ...prev,
    defaultWidth: clampHaimCodeTabWidth(width),
  });
}

export function saveHaimCodeTabPythonFamilyWidth(width: number): void {
  const prev = loadHaimCodeTabSettings();
  saveHaimCodeTabSettings({
    ...prev,
    pythonFamilyWidth: clampHaimCodeTabWidth(width),
  });
}

export function saveHaimCodeTabLanguageWidth(
  language: string,
  width: number | null,
): void {
  const lang = String(language || '')
    .trim()
    .toLowerCase();
  if (!lang) return;
  const prev = loadHaimCodeTabSettings();
  const byLanguage = { ...prev.byLanguage };
  if (width == null) {
    delete byLanguage[lang];
  } else {
    byLanguage[lang] = clampHaimCodeTabWidth(width);
  }
  saveHaimCodeTabSettings({ ...prev, byLanguage });
}
