/** Strip LLM-added choice labels; UI renders option numbers separately. */
const COMBINED_NUM_ALPHA_PREFIX_RE = /^\d+\.\s*[a-zA-Z]\.\s*/;
const NUMERIC_OPTION_PREFIX_RE = /^(?:\(\s*\d+\s*\)|\d+\)|\d+\.)\s*/;
const ALPHA_OPTION_PREFIX_RE = /^[a-zA-Z](?:\)|\.)\s*/;
const CIRCLED_NUM_PREFIX_RE = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫]\s*/u;
const HANGUL_OPTION_PREFIX_RE = /^[가나다라마바사아자차카타파하](?:\)|\.)\s*/u;

/**
 * Remove numbering / lettering prefixes from generated multiple-choice option text.
 * Handles duplicates such as `1. a. ...` where the UI already shows 1–N badges.
 */
export function normalizeGeneratedChoiceOption(text: string): string {
  let value = String(text || '').trim();
  if (!value) return value;

  for (let pass = 0; pass < 4; pass += 1) {
    const prev = value;
    value = value
      .replace(COMBINED_NUM_ALPHA_PREFIX_RE, '')
      .replace(NUMERIC_OPTION_PREFIX_RE, '')
      .replace(ALPHA_OPTION_PREFIX_RE, '')
      .replace(CIRCLED_NUM_PREFIX_RE, '')
      .replace(HANGUL_OPTION_PREFIX_RE, '')
      .trim();
    if (value === prev) break;
  }
  return value;
}
