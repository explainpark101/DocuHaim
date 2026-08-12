/**
 * Numeric source footnotes: body `[^N]` → in-preview link; bottom `[^N]: …` → Sources.
 * Per-doc enable: `<!-- footnotes {"v":1,"enabled":true} -->` after note-cover.
 * Global display: sup | sub | rawText.
 *
 * Important: markdown-it's built-in CommonMark `reference` block rule treats
 * `[^1]: url` as a link-reference definition and turns body `[^1]` into
 * `<a href="url">^1</a>`. Disable it entirely (temporary) via
 * `disableCommonMarkLinkReferences`.
 */
import { loadFootnoteDisplayMode } from '@/utils/previewFootnotesSettings';
import {
  DEFAULT_NOTE_FOOTNOTES_META,
  parseNoteFootnotesMeta,
} from '@/utils/noteFootnotesMeta';

const SOURCE_LINE_RE = /^\[\^(\d+)\]\s*:?\s?(.*)$/;
const DIGIT_CODE_0 = 0x30;
const DIGIT_CODE_9 = 0x39;

type SourceFootnotePack = {
  byLabel: Record<string, string>;
  order: string[];
  refCounts?: Record<string, number>;
};

type SourceFootnoteEnv = {
  srcLines?: string[];
  sourceFootnotes?: SourceFootnotePack;
  sourceFootnotesEnabled?: boolean;
  references?: Record<string, { href?: string; title?: string }>;
};

type MarkdownItLike = {
  disable: (list: string | string[], ignoreInvalid?: boolean) => string[];
  block: {
    ruler: Record<string, unknown>;
  };
  inline: {
    ruler: {
      before: (
        ruleName: string,
        ruleId: string,
        rule: (state: InlineState, silent: boolean) => boolean,
      ) => void;
    };
  };
  core: {
    ruler: {
      before: (ruleName: string, ruleId: string, rule: (state: CoreState) => void) => void;
      after: (ruleName: string, ruleId: string, rule: (state: CoreState) => void) => void;
      push: (ruleId: string, rule: (state: CoreState) => void) => void;
    };
  };
  renderer: {
    rules: Record<
      string,
      | ((
          tokens: Token[],
          idx: number,
          options?: unknown,
          env?: SourceFootnoteEnv,
        ) => string)
      | undefined
    >;
  };
  renderInline: (src: string, env: unknown) => string;
};

type InlineState = {
  src: string;
  pos: number;
  posMax: number;
  env: SourceFootnoteEnv;
  push: (type: string, tag: string, nesting: number) => Token;
};

type CoreState = {
  src: string;
  env: SourceFootnoteEnv;
  tokens: Token[];
  inlineMode?: boolean;
};

type Token = {
  type: string;
  tag: string;
  nesting: number;
  content: string;
  children?: Token[] | null;
  meta?: { label?: string; subId?: number };
};

function isDigitCode(code: number): boolean {
  return code >= DIGIT_CODE_0 && code <= DIGIT_CODE_9;
}

/** Drop all CommonMark link-reference entries (temporary safety net). */
function scrubAllLinkReferences(env: SourceFootnoteEnv): void {
  if (env.references) {
    delete env.references;
  }
}

/**
 * TEMP: fully disable CommonMark `[label]: url` reference definitions.
 * Call early (markdownItConfig) and again after other plugins if needed.
 */
export function disableCommonMarkLinkReferences(md: MarkdownItLike): void {
  md.disable('reference', true);
}

function parseSourcesFromLines(lines: string[]): {
  byLabel: Record<string, string>;
  order: string[];
} {
  const order: string[] = [];
  const byLabel: Record<string, string> = {};
  let currentLabel: string | null = null;
  let currentParts: string[] = [];

  const flush = () => {
    if (currentLabel === null) return;
    byLabel[currentLabel] = currentParts.join('\n').trim();
    currentLabel = null;
    currentParts = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentLabel !== null && currentParts.length) currentParts.push('');
      continue;
    }
    const match = SOURCE_LINE_RE.exec(trimmed);
    if (match) {
      flush();
      currentLabel = match[1] ?? '';
      currentParts = [match[2] ?? ''];
      if (currentLabel && !order.includes(currentLabel)) order.push(currentLabel);
      continue;
    }
    if (currentLabel !== null) currentParts.push(trimmed);
  }
  flush();
  return { byLabel, order };
}

function isBlankLine(line: string): boolean {
  return !line.trim();
}

function isSourceHeaderLine(line: string): boolean {
  return SOURCE_LINE_RE.test(line.trim());
}

/**
 * Split trailing bottom source lines from markdown body.
 *
 * Each trailing entry is `[^N]: …` plus immediately following non-blank
 * continuation lines (title / URL). Blank lines may separate entries.
 * Walks entry-by-entry from the end; stops when the next non-blank group
 * above has no source header (that group is body).
 */
export function splitBottomSourceFootnotes(src: string): {
  body: string;
  byLabel: Record<string, string>;
  order: string[];
} {
  const raw = String(src ?? '');
  const lines = raw.split(/\r?\n/);
  let end = lines.length;
  while (end > 0 && isBlankLine(lines[end - 1] ?? '')) end -= 1;
  if (end === 0) {
    return { body: raw, byLabel: {}, order: [] };
  }

  let i = end - 1;
  let cutBefore = end;
  let foundAny = false;

  while (i >= 0) {
    while (i >= 0 && isBlankLine(lines[i] ?? '')) i -= 1;
    if (i < 0) break;

    // One entry from the bottom: optional continuations, then a header.
    // Continuations cannot include blank lines (blanks only separate entries).
    let j = i;
    while (j >= 0 && !isBlankLine(lines[j] ?? '') && !isSourceHeaderLine(lines[j] ?? '')) {
      j -= 1;
    }

    if (j < 0 || !isSourceHeaderLine(lines[j] ?? '')) {
      break;
    }

    foundAny = true;
    cutBefore = j;
    i = j - 1;
  }

  if (!foundAny) {
    return { body: raw, byLabel: {}, order: [] };
  }

  const slice = lines.slice(cutBefore, end);
  const { byLabel, order } = parseSourcesFromLines(slice);
  if (!order.length) {
    return { body: raw, byLabel: {}, order: [] };
  }

  const bodyLines = lines.slice(0, cutBefore);
  while (bodyLines.length && isBlankLine(bodyLines[bodyLines.length - 1] ?? '')) {
    bodyLines.pop();
  }

  return { body: bodyLines.join('\n'), byLabel, order };
}

function rawMarkdownFromState(state: CoreState): string {
  if (Array.isArray(state.env.srcLines) && state.env.srcLines.length) {
    return state.env.srcLines.join('\n');
  }
  return state.src;
}

function wrapRefLabel(label: string, mode: 'sup' | 'sub' | 'rawText'): string {
  const text = `[^${label}]`;
  if (mode === 'sub') return `<sub class="footnote-ref bg-transparent">${text}</sub>`;
  if (mode === 'rawText') {
    return `<span class="footnote-ref footnote-ref--raw bg-transparent">${text}</span>`;
  }
  return `<sup class="footnote-ref bg-transparent">${text}</sup>`;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r?\n/g, ' ');
}

/** First non-empty source line (title). Used for preview tooltips. */
export function footnoteSourceTitle(content: string): string {
  const first = String(content || '')
    .split(/\n/)
    .map((line) => line.trim())
    .find(Boolean);
  return first ?? '';
}

function renderSourcesHtml(md: MarkdownItLike, env: SourceFootnoteEnv): string {
  const pack = env.sourceFootnotes;
  if (!pack?.order.length) return '';

  const items = pack.order
    .map((label) => {
      const content = pack.byLabel[label] ?? '';
      const inner = content
        .trim()
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => md.renderInline(line, {}))
        .join('<br>\n');
      return (
        `<li id="source-${label}" class="footnote-item"` +
        ` data-md-footnote-id="source-${label}" data-md-footnote-label="${label}">` +
        `<span class="footnote-marker">[^${label}]</span>` +
        `<p>${inner}` +
        ` <a href="#" class="footnote-backref" data-md-footnote-to="fnref-${label}">\u21a9\uFE0E</a></p></li>`
      );
    })
    .join('\n');

  return (
    '<hr class="footnotes-sep">\n' +
    '<section class="footnotes">\n' +
    '<p class="footnotes-title" role="heading" aria-level="2">Sources</p>\n' +
    '<ol class="footnotes-list">\n' +
    items +
    '\n</ol>\n</section>\n'
  );
}

function sourceRefInline(state: InlineState, silent: boolean): boolean {
  const max = state.posMax;
  const start = state.pos;

  if (start + 4 > max) return false;
  if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false;
  if (state.src.charCodeAt(start + 1) !== 0x5e /* ^ */) return false;

  let pos = start + 2;
  if (!isDigitCode(state.src.charCodeAt(pos))) return false;
  while (pos < max && isDigitCode(state.src.charCodeAt(pos))) pos += 1;
  if (pos >= max || state.src.charCodeAt(pos) !== 0x5d /* ] */) return false;

  const label = state.src.slice(start + 2, pos);
  const sources = state.env.sourceFootnotes?.byLabel;
  const enabled = state.env.sourceFootnotesEnabled !== false;
  const hasSource = Boolean(sources && sources[label] !== undefined);

  // Always claim `[^N]` before the built-in link rule so CommonMark reference
  // links cannot turn it into <a href="…">^N</a>.
  if (!enabled || !hasSource) {
    if (!silent) {
      const text = state.push('text', '', 0);
      text.content = `[^${label}]`;
    }
    state.pos = pos + 1;
    return true;
  }

  if (!silent) {
    const pack = state.env.sourceFootnotes ?? { byLabel: sources!, order: [] };
    state.env.sourceFootnotes = pack;
    if (!pack.refCounts) pack.refCounts = {};
    const subId = pack.refCounts[label] ?? 0;
    pack.refCounts[label] = subId + 1;

    const token = state.push('source_footnote_ref', '', 0);
    token.meta = { label, subId };
  }

  state.pos = pos + 1;
  return true;
}

/**
 * Register bottom-source footnotes for md-editor-rt preview / export PDF.
 */
export function footnoteMarkdownItPlugin(md: MarkdownItLike): void {
  disableCommonMarkLinkReferences(md);

  md.core.ruler.before('block', 'source_footnote_prepare', (state) => {
    if (state.inlineMode) return;

    const raw = rawMarkdownFromState(state);
    const { meta, body: withoutMeta } = parseNoteFootnotesMeta(raw);
    const enabled = (meta ?? DEFAULT_NOTE_FOOTNOTES_META).enabled !== false;
    state.env.sourceFootnotesEnabled = enabled;

    if (!enabled) {
      state.env.sourceFootnotes = { byLabel: {}, order: [] };
      if (withoutMeta !== raw) state.src = withoutMeta;
      return;
    }

    const parsed = splitBottomSourceFootnotes(withoutMeta);
    state.env.sourceFootnotes = {
      byLabel: parsed.byLabel,
      order: parsed.order,
    };
    state.src = parsed.body;
  });

  // After blocks: wipe link-reference map so inline `link` cannot emit ref anchors
  md.core.ruler.after('block', 'source_footnote_scrub_refs', (state) => {
    if (state.inlineMode) return;
    scrubAllLinkReferences(state.env);
  });

  md.inline.ruler.before('link', 'source_footnote_ref', sourceRefInline);

  md.renderer.rules.source_footnote_ref = (tokens, idx, _options, env) => {
    const label = tokens[idx]?.meta?.label ?? '';
    const subId = tokens[idx]?.meta?.subId ?? 0;
    const refId = subId > 0 ? `fnref-${label}-${subId}` : `fnref-${label}`;
    const mode = loadFootnoteDisplayMode();
    const wrapped = wrapRefLabel(label, mode);
    const title = footnoteSourceTitle(env?.sourceFootnotes?.byLabel?.[label] ?? '');
    const titleAttr = title
      ? ` data-md-footnote-title="${escapeAttr(title)}"`
      : '';
    const aria = escapeAttr(title ? `각주 [^${label}]: ${title}` : `각주 [^${label}]`);
    // href="#" avoids HashRouter / path navigation; scroll via data-md-footnote-to.
    return (
      `<a href="#" class="footnote-ref-link bg-transparent" id="${refId}"` +
      ` data-md-footnote-to="source-${label}" data-md-footnote-id="${refId}"` +
      `${titleAttr} aria-label="${aria}">` +
      wrapped +
      `</a>`
    );
  };

  md.core.ruler.push('source_footnote_tail', (state) => {
    if (state.inlineMode) return;
    if (state.env.sourceFootnotesEnabled === false) return;
    const html = renderSourcesHtml(md, state.env);
    if (!html) return;
    const token = {
      type: 'html_block',
      tag: '',
      nesting: 0,
      content: html,
    } as Token;
    state.tokens.push(token);
  });
}
