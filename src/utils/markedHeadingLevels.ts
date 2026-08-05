import { marked } from 'marked';
import { MAX_APP_HEADING_LEVEL, MAX_EXPORT_HEADING_LEVEL } from '@/utils/markdownHeadings';

const DEEP_HEADING_RE = new RegExp(`^(#{1,${MAX_APP_HEADING_LEVEL}})(?=\\s|$)(.*?)(?:\\n+|$)`);

let configured = false;

export function configureMarkedHeadingLevels(): void {
  if (configured) return;
  configured = true;

  marked.use({
    tokenizer: {
      heading(this, src) {
        const cap = DEEP_HEADING_RE.exec(src);
        if (!cap?.[1]) return undefined;
        let text = (cap[2] ?? '').trim();
        if (/#$/.test(text)) {
          const trimmed = text.replace(/#+$/, '');
          if (!trimmed || / $/.test(trimmed)) text = trimmed.trim();
        }
        return {
          type: 'heading',
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text),
        };
      },
    },
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        if (depth <= MAX_EXPORT_HEADING_LEVEL) {
          return `<h${depth}>${text}</h${depth}>\n`;
        }
        return `<h6 data-heading-level="${depth}" class="md-heading md-heading-${depth}">${text}</h6>\n`;
      },
    },
  });
}

configureMarkedHeadingLevels();
