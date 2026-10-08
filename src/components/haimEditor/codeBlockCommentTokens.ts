/**
 * Language → comment markers for code-block / fenced-code Ctrl+/ toggle.
 * Prefer line comments when the language has them; otherwise block.
 */

export type CodeBlockBlockComment = {
  open: string;
  close: string;
};

export type CodeBlockCommentTokens = {
  line?: string;
  block?: CodeBlockBlockComment;
};

/** Normalize fence aliases (js → javascript, …). */
const LANGUAGE_ALIASES: Readonly<Record<string, string>> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  sh: 'bash',
  zsh: 'bash',
  ksh: 'bash',
  yml: 'yaml',
  md: 'markdown',
  htm: 'xml',
  html: 'xml',
  svg: 'xml',
  cs: 'csharp',
  'c++': 'cpp',
  'c#': 'csharp',
  rb: 'ruby',
  rs: 'rust',
  kt: 'kotlin',
  ps1: 'powershell',
  pwsh: 'powershell',
};

const LINE_SLASH = '//';
const LINE_HASH = '#';
const LINE_DASH = '--';
const LINE_SEMI = ';';
const LINE_PERCENT = '%%';
const LINE_APOS = "'";

const BLOCK_C = { open: '/*', close: '*/' } as const;
const BLOCK_HTML = { open: '<!--', close: '-->' } as const;

/** Canonical language id → tokens. */
const BY_LANGUAGE: Readonly<Record<string, CodeBlockCommentTokens>> = {
  // C-family / JS
  javascript: { line: LINE_SLASH, block: BLOCK_C },
  typescript: { line: LINE_SLASH, block: BLOCK_C },
  java: { line: LINE_SLASH, block: BLOCK_C },
  c: { line: LINE_SLASH, block: BLOCK_C },
  cpp: { line: LINE_SLASH, block: BLOCK_C },
  csharp: { line: LINE_SLASH, block: BLOCK_C },
  go: { line: LINE_SLASH, block: BLOCK_C },
  rust: { line: LINE_SLASH, block: BLOCK_C },
  kotlin: { line: LINE_SLASH, block: BLOCK_C },
  swift: { line: LINE_SLASH, block: BLOCK_C },
  php: { line: LINE_SLASH, block: BLOCK_C },
  'php-template': { line: LINE_SLASH, block: BLOCK_C },
  objectivec: { line: LINE_SLASH, block: BLOCK_C },
  arduino: { line: LINE_SLASH, block: BLOCK_C },
  less: { line: LINE_SLASH, block: BLOCK_C },
  scss: { line: LINE_SLASH, block: BLOCK_C },
  json: { line: LINE_SLASH, block: BLOCK_C },
  wasm: { line: LINE_SLASH, block: BLOCK_C },

  // Hash-style
  python: { line: LINE_HASH },
  'python-repl': { line: LINE_HASH },
  ruby: { line: LINE_HASH },
  bash: { line: LINE_HASH },
  shell: { line: LINE_HASH },
  yaml: { line: LINE_HASH },
  makefile: { line: LINE_HASH },
  r: { line: LINE_HASH },
  perl: { line: LINE_HASH },
  graphql: { line: LINE_HASH },
  powershell: { line: LINE_HASH },

  // Other line styles
  sql: { line: LINE_DASH },
  lua: { line: LINE_DASH },
  ini: { line: LINE_SEMI },
  vbnet: { line: LINE_APOS },
  mermaid: { line: LINE_PERCENT },

  // Block-only
  css: { block: BLOCK_C },
  xml: { block: BLOCK_HTML },
  markdown: { block: BLOCK_HTML },
};

/** When fence language is empty / unknown. */
const DEFAULT_TOKENS: CodeBlockCommentTokens = {
  line: LINE_SLASH,
  block: BLOCK_C,
};

export function normalizeCodeBlockLanguageId(
  language: string | null | undefined,
): string {
  const lang = String(language ?? '')
    .trim()
    .toLowerCase();
  if (!lang) return '';
  return LANGUAGE_ALIASES[lang] ?? lang;
}

/**
 * Resolve comment tokens for a fence / code-block language attribute.
 * Empty or unknown languages fall back to C-style line (`//`) comments.
 */
export function resolveCodeBlockCommentTokens(
  language: string | null | undefined,
): CodeBlockCommentTokens {
  const canonical = normalizeCodeBlockLanguageId(language);
  if (!canonical) return { ...DEFAULT_TOKENS };
  const found = BY_LANGUAGE[canonical];
  if (found) return { ...found };
  return { ...DEFAULT_TOKENS };
}
