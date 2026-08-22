import MarkdownIt from 'markdown-it';
import type { StateBlock } from 'markdown-it';

export type MarkdownItReferenceRule = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean,
) => boolean;

type RulerRuleEntry = {
  name: string;
  fn: MarkdownItReferenceRule;
  enabled: boolean;
};

type BlockRulerWithRegistry = {
  __rules__?: RulerRuleEntry[];
};

let cachedReferenceRule: MarkdownItReferenceRule | null = null;

/**
 * CommonMark `reference` block rule from a stock markdown-it 15 instance.
 *
 * Uses ruler registry names — not `getRules()` fn `.name`, which minifiers rename in prod.
 */
export function getMarkdownItReferenceRule(): MarkdownItReferenceRule {
  if (!cachedReferenceRule) {
    const probe = new MarkdownIt();
    probe.enable('reference', true);
    const entry = (probe.block.ruler as BlockRulerWithRegistry).__rules__?.find(
      (rule) => rule.name === 'reference' && rule.enabled,
    );
    if (!entry?.fn) {
      throw new Error('markdown-it reference block rule not found');
    }
    cachedReferenceRule = entry.fn;
  }
  return cachedReferenceRule;
}
