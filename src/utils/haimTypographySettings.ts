/**
 * Haim Editor Typography input-rule preferences (typing convenience).
 * Global: localStorage. Per-document: optional overrides in `<!-- document-settings -->`.
 */

export const HAIM_TYPOGRAPHY_CHANGED_EVENT = 's3haim-haim-typography';

const LOCAL_STORAGE_KEY = 's3haim_haim_typography';

/** Stable rule ids (UI + storage). Quote pairs share one id. */
export const HAIM_TYPOGRAPHY_RULE_IDS = [
  'emDash',
  'ellipsis',
  'doubleQuotes',
  'singleQuotes',
  'leftArrow',
  'rightArrow',
  'copyright',
  'trademark',
  'servicemark',
  'registeredTrademark',
  'oneHalf',
  'oneQuarter',
  'threeQuarters',
  'plusMinus',
  'notEqual',
  'multiplication',
  'laquo',
  'raquo',
  'superscriptTwo',
  'superscriptThree',
] as const;

export type HaimTypographyRuleId = (typeof HAIM_TYPOGRAPHY_RULE_IDS)[number];

export type HaimTypographyRules = Record<HaimTypographyRuleId, boolean>;

/** Per-document: only keys present override global. */
export type HaimTypographyOverrides = Partial<HaimTypographyRules>;

export type HaimTypographyRuleDef = {
  id: HaimTypographyRuleId;
  label: string;
  hint: string;
};

/** Labels for settings / document modal (KO). */
export const HAIM_TYPOGRAPHY_RULE_DEFS: readonly HaimTypographyRuleDef[] = [
  { id: 'emDash', label: 'Em dash', hint: '-- → —' },
  { id: 'ellipsis', label: '말줄임표', hint: '... → …' },
  { id: 'doubleQuotes', label: '큰따옴표', hint: '" → “ ”' },
  { id: 'singleQuotes', label: '작은따옴표', hint: "' → ‘ ’" },
  { id: 'leftArrow', label: '왼쪽 화살표', hint: '<- → ←' },
  { id: 'rightArrow', label: '오른쪽 화살표', hint: '-> → →' },
  { id: 'copyright', label: 'Copyright', hint: '(c) → ©' },
  { id: 'trademark', label: 'Trademark', hint: '(tm) → ™' },
  { id: 'servicemark', label: 'Servicemark', hint: '(sm) → ℠' },
  { id: 'registeredTrademark', label: 'Registered', hint: '(r) → ®' },
  { id: 'oneHalf', label: '½', hint: '1/2 → ½' },
  { id: 'oneQuarter', label: '¼', hint: '1/4 → ¼' },
  { id: 'threeQuarters', label: '¾', hint: '3/4 → ¾' },
  { id: 'plusMinus', label: '±', hint: '+/- → ±' },
  { id: 'notEqual', label: '≠', hint: '!= → ≠' },
  { id: 'multiplication', label: '×', hint: '2 * 3 → 2 × 3' },
  { id: 'laquo', label: '«', hint: '<< → «' },
  { id: 'raquo', label: '»', hint: '>> → »' },
  { id: 'superscriptTwo', label: '²', hint: '^2 → ²' },
  { id: 'superscriptThree', label: '³', hint: '^3 → ³' },
];

/** Match prior hard-coded Typography: quotes off, everything else on. */
export const HAIM_TYPOGRAPHY_DEFAULTS: HaimTypographyRules = {
  emDash: true,
  ellipsis: true,
  doubleQuotes: false,
  singleQuotes: false,
  leftArrow: true,
  rightArrow: true,
  copyright: true,
  trademark: true,
  servicemark: true,
  registeredTrademark: true,
  oneHalf: true,
  oneQuarter: true,
  threeQuarters: true,
  plusMinus: true,
  notEqual: true,
  multiplication: true,
  laquo: true,
  raquo: true,
  superscriptTwo: true,
  superscriptThree: true,
};

function isRuleId(value: string): value is HaimTypographyRuleId {
  return (HAIM_TYPOGRAPHY_RULE_IDS as readonly string[]).includes(value);
}

/** Normalize a partial/unknown object into a full rules map (fills defaults). */
export function normalizeHaimTypographyRules(
  value: unknown,
  fallback: HaimTypographyRules = HAIM_TYPOGRAPHY_DEFAULTS,
): HaimTypographyRules {
  const obj = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const out = { ...fallback };
  for (const id of HAIM_TYPOGRAPHY_RULE_IDS) {
    if (typeof obj[id] === 'boolean') out[id] = obj[id];
  }
  return out;
}

/**
 * Document override bag: only explicit booleans; empty → undefined (all inherit).
 */
export function normalizeHaimTypographyOverrides(
  value: unknown,
): HaimTypographyOverrides | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const obj = value as Record<string, unknown>;
  const out: HaimTypographyOverrides = {};
  let any = false;
  for (const [key, raw] of Object.entries(obj)) {
    if (!isRuleId(key) || typeof raw !== 'boolean') continue;
    out[key] = raw;
    any = true;
  }
  return any ? out : undefined;
}

/** Merge global + optional document overrides. */
export function resolveHaimTypographyRules(
  globalRules: HaimTypographyRules,
  docOverrides?: HaimTypographyOverrides | null,
): HaimTypographyRules {
  if (!docOverrides) return { ...globalRules };
  return { ...globalRules, ...docOverrides };
}

export function loadHaimTypographyGlobal(): HaimTypographyRules {
  if (typeof window === 'undefined') return { ...HAIM_TYPOGRAPHY_DEFAULTS };
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { ...HAIM_TYPOGRAPHY_DEFAULTS };
    return normalizeHaimTypographyRules(JSON.parse(raw));
  } catch {
    return { ...HAIM_TYPOGRAPHY_DEFAULTS };
  }
}

export function saveHaimTypographyGlobal(rules: HaimTypographyRules): void {
  if (typeof window === 'undefined') return;
  const normalized = normalizeHaimTypographyRules(rules);
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(HAIM_TYPOGRAPHY_CHANGED_EVENT, {
        detail: { rules: normalized },
      }),
    );
  } catch {
    // ignore
  }
}

export function saveHaimTypographyGlobalRule(
  id: HaimTypographyRuleId,
  enabled: boolean,
): void {
  const next = { ...loadHaimTypographyGlobal(), [id]: Boolean(enabled) };
  saveHaimTypographyGlobal(next);
}

/** TipTap Typography.configure() options from resolved rules. */
export function toTipTapTypographyOptions(
  rules: HaimTypographyRules,
): Record<string, false | string> {
  return {
    emDash: rules.emDash ? '—' : false,
    ellipsis: rules.ellipsis ? '…' : false,
    openDoubleQuote: rules.doubleQuotes ? '“' : false,
    closeDoubleQuote: rules.doubleQuotes ? '”' : false,
    openSingleQuote: rules.singleQuotes ? '‘' : false,
    closeSingleQuote: rules.singleQuotes ? '’' : false,
    leftArrow: rules.leftArrow ? '←' : false,
    rightArrow: rules.rightArrow ? '→' : false,
    copyright: rules.copyright ? '©' : false,
    trademark: rules.trademark ? '™' : false,
    servicemark: rules.servicemark ? '℠' : false,
    registeredTrademark: rules.registeredTrademark ? '®' : false,
    oneHalf: rules.oneHalf ? '½' : false,
    oneQuarter: rules.oneQuarter ? '¼' : false,
    threeQuarters: rules.threeQuarters ? '¾' : false,
    plusMinus: rules.plusMinus ? '±' : false,
    notEqual: rules.notEqual ? '≠' : false,
    multiplication: rules.multiplication ? '×' : false,
    laquo: rules.laquo ? '«' : false,
    raquo: rules.raquo ? '»' : false,
    superscriptTwo: rules.superscriptTwo ? '²' : false,
    superscriptThree: rules.superscriptThree ? '³' : false,
  };
}
