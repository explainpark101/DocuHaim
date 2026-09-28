import { Extension, InputRule } from '@tiptap/core';
import type { HaimTypographyRules } from '@/utils/haimTypographySettings';
import { HAIM_TYPOGRAPHY_DEFAULTS } from '@/utils/haimTypographySettings';

type GatedRule = {
  find: RegExp;
  replace: string;
  ruleId: keyof HaimTypographyRules;
};

/**
 * TipTap textInputRule body with a live enable gate (editor.storage).
 * @see @tiptap/core textInputRule
 */
function gatedTextInputRule(
  find: RegExp,
  replace: string,
  isEnabled: () => boolean,
): InputRule {
  return new InputRule({
    find,
    handler: ({ state, range, match }) => {
      if (!isEnabled()) return null;

      let insert = replace;
      let start = range.from;
      const end = range.to;

      if (match[1]) {
        const offset = match[0].lastIndexOf(match[1]);
        insert += match[0].slice(offset + match[1].length);
        start += offset;
        const cutOff = start - end;
        if (cutOff > 0) {
          insert = match[0].slice(offset - cutOff, offset) + insert;
          start = end;
        }
      }

      state.tr.insertText(insert, start, end);
      return undefined;
    },
  });
}

/** Same find/replace set as @tiptap/extension-typography (LTR quotes). */
const GATED_RULES: readonly GatedRule[] = [
  { find: /--$/, replace: '—', ruleId: 'emDash' },
  { find: /\.\.\.$/, replace: '…', ruleId: 'ellipsis' },
  {
    find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
    replace: '“',
    ruleId: 'doubleQuotes',
  },
  { find: /"$/, replace: '”', ruleId: 'doubleQuotes' },
  {
    find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
    replace: '‘',
    ruleId: 'singleQuotes',
  },
  { find: /'$/, replace: '’', ruleId: 'singleQuotes' },
  { find: /<-$/, replace: '←', ruleId: 'leftArrow' },
  { find: /->$/, replace: '→', ruleId: 'rightArrow' },
  { find: /\(c\)$/, replace: '©', ruleId: 'copyright' },
  { find: /\(tm\)$/, replace: '™', ruleId: 'trademark' },
  { find: /\(sm\)$/, replace: '℠', ruleId: 'servicemark' },
  { find: /\(r\)$/, replace: '®', ruleId: 'registeredTrademark' },
  { find: /(?:^|\s)(1\/2)\s$/, replace: '½', ruleId: 'oneHalf' },
  { find: /(?:^|\s)(1\/4)\s$/, replace: '¼', ruleId: 'oneQuarter' },
  { find: /(?:^|\s)(3\/4)\s$/, replace: '¾', ruleId: 'threeQuarters' },
  { find: /\+\/-$/, replace: '±', ruleId: 'plusMinus' },
  { find: /!=$/, replace: '≠', ruleId: 'notEqual' },
  { find: /\d+\s?([*x])\s?\d+$/, replace: '×', ruleId: 'multiplication' },
  { find: /<<$/, replace: '«', ruleId: 'laquo' },
  { find: />>$/, replace: '»', ruleId: 'raquo' },
  { find: /\^2$/, replace: '²', ruleId: 'superscriptTwo' },
  { find: /\^3$/, replace: '³', ruleId: 'superscriptThree' },
];

export type HaimTypographyOptions = {
  initialRules: HaimTypographyRules;
};

export type HaimTypographyStorage = {
  rules: HaimTypographyRules;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    haimTypography: {
      setHaimTypographyRules: (rules: HaimTypographyRules) => ReturnType;
    };
  }
}

/**
 * Typography input rules with live on/off via editor.storage (no remount).
 */
export const HaimTypography = Extension.create<
  HaimTypographyOptions,
  HaimTypographyStorage
>({
  name: 'haimTypography',

  addOptions() {
    return {
      initialRules: { ...HAIM_TYPOGRAPHY_DEFAULTS },
    };
  },

  addStorage() {
    return {
      rules: { ...this.options.initialRules },
    };
  },

  addCommands() {
    return {
      setHaimTypographyRules:
        (rules: HaimTypographyRules) =>
        () => {
          this.storage.rules = { ...rules };
          return true;
        },
    };
  },

  addInputRules() {
    return GATED_RULES.map(({ find, replace, ruleId }) =>
      gatedTextInputRule(find, replace, () => Boolean(this.storage.rules[ruleId])),
    );
  },
});

export default HaimTypography;
