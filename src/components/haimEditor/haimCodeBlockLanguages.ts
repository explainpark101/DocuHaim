/**
 * Language options for Haim WYSIWYG code-block picker.
 * IDs match lowlight `common` (highlight) plus app-specific `mermaid`.
 */

/** Radix Select sentinel for empty fence language (``` with no info string). */
export const HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE = '__plain__';

/**
 * Sorted highlight languages from lowlight/common (excluding plaintext —
 * that maps to the plain sentinel).
 */
export const HAIM_CODE_BLOCK_HIGHLIGHT_LANGUAGES = [
  'arduino',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'go',
  'graphql',
  'ini',
  'java',
  'javascript',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'python',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
] as const;

export type HaimCodeBlockLanguageOption = {
  value: string;
  label: string;
};

/** TipTap attr value for Select → null clears the fence language. */
export function languageAttrFromSelectValue(value: string): string | null {
  const trimmed = String(value ?? '').trim();
  if (!trimmed || trimmed === HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE) return null;
  return trimmed;
}

/** Current node language → Select value. */
export function selectValueFromLanguageAttr(
  language: string | null | undefined,
): string {
  const trimmed = String(language ?? '').trim();
  return trimmed || HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE;
}

/**
 * Options for the language picker. Always includes plain + mermaid + highlight
 * langs; if `current` is unknown (e.g. ```js), append it so the current value
 * stays visible in the list.
 */
export function buildHaimCodeBlockLanguageOptions(
  current?: string | null,
): HaimCodeBlockLanguageOption[] {
  const seen = new Set<string>();
  const options: HaimCodeBlockLanguageOption[] = [];

  const add = (value: string, label: string) => {
    if (seen.has(value)) return;
    seen.add(value);
    options.push({ value, label });
  };

  add(HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE, 'plain');
  add('mermaid', 'mermaid');
  for (const id of HAIM_CODE_BLOCK_HIGHLIGHT_LANGUAGES) {
    add(id, id);
  }

  const cur = String(current ?? '').trim();
  if (cur) add(cur, cur);

  return options;
}

/** Case-insensitive filter by label or value. Empty query → all options. */
export function filterHaimCodeBlockLanguageOptions(
  options: readonly HaimCodeBlockLanguageOption[],
  query: string,
): HaimCodeBlockLanguageOption[] {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return [...options];
  return options.filter((opt) => {
    const value = opt.value.toLowerCase();
    const label = opt.label.toLowerCase();
    return value.includes(q) || label.includes(q);
  });
}

/** Display label for the compact trigger / list selection. */
export function haimCodeBlockLanguageDisplayLabel(
  language: string | null | undefined,
): string {
  const trimmed = String(language ?? '').trim();
  if (!trimmed || trimmed === HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE) return 'plain';
  return trimmed;
}
