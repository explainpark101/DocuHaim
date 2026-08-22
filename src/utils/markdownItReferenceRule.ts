import MarkdownIt from 'markdown-it';
import type { StateBlock } from 'markdown-it';

export type MarkdownItReferenceRule = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean,
) => boolean;

let cachedReferenceRule: MarkdownItReferenceRule | null = null;

/** CommonMark reference block rule from a stock markdown-it 15 instance. */
export function getMarkdownItReferenceRule(): MarkdownItReferenceRule {
  if (!cachedReferenceRule) {
    const probe = new MarkdownIt();
    const rules = probe.block.ruler.getRules('');
    const rule = rules.find((entry) => entry.name === 'reference');
    if (!rule) {
      throw new Error('markdown-it reference block rule not found');
    }
    cachedReferenceRule = rule as MarkdownItReferenceRule;
  }
  return cachedReferenceRule;
}
