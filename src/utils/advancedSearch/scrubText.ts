/**
 * Strip URLs, base64 blobs, and link targets before indexing.
 * Keeps wiki image basenames when the target is not base64.
 */

const DATA_IMAGE_RE = /data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=\s]+/gi;
const LONG_BASE64_RE = /(?:^|[\s"'`])(?:[A-Za-z0-9+/]{80,}={0,2})/g;
const MD_IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const MD_LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g;
const URL_RE = /https?:\/\/[^\s<>)"'\]]+/gi;
const WWW_RE = /\bwww\.[^\s<>)"'\]]+/gi;
const WIKI_IMAGE_RE = /!\[\[([^\]]+)\]\]/g;
const CHAT_FILE_RE = /\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]/g;
const CHAT_NOTE_RE = /\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g;

function basename(pathLike: string): string {
  const cleaned = String(pathLike || '')
    .trim()
    .split('|')[0]
    ?.trim() || '';
  const parts = cleaned.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1] || cleaned;
}

function isBase64ish(value: string): boolean {
  const v = String(value || '').trim();
  if (!v) return false;
  if (/^data:image\//i.test(v)) return true;
  if (/^base64[,:]/i.test(v)) return true;
  // Long pure base64 without path separators
  if (!/[./\\]/.test(v) && /^[A-Za-z0-9+/]+=*$/.test(v) && v.length >= 64) {
    return true;
  }
  return false;
}

export type ScrubResult = {
  text: string;
  /** Extra tokens to force-index (e.g. image filenames). */
  extraTerms: string[];
};

/**
 * Clean markdown/chat body for inverted-index tokenization.
 */
export function scrubTextForIndex(raw: string): ScrubResult {
  let text = String(raw || '');
  const extraTerms: string[] = [];

  text = text.replace(WIKI_IMAGE_RE, (_full, inner: string) => {
    const pathPart = String(inner || '').split('|')[0]?.trim() || '';
    if (pathPart && !isBase64ish(pathPart)) {
      const name = basename(pathPart);
      if (name) extraTerms.push(name);
      // Keep filename in text stream too (helps phrase-ish matching)
      return ` ${name} `;
    }
    return ' ';
  });

  text = text.replace(CHAT_FILE_RE, (_full, path: string, name?: string) => {
    const label = String(name || '').trim() || basename(path);
    if (label) extraTerms.push(label);
    return ` ${label} `;
  });

  text = text.replace(CHAT_NOTE_RE, (_full, path: string, name?: string) => {
    const label = String(name || '').trim() || basename(path);
    if (label) extraTerms.push(label);
    return ` ${label} `;
  });

  text = text.replace(MD_IMAGE_RE, (_full, alt: string, url: string) => {
    const a = String(alt || '').trim();
    if (url && !isBase64ish(url) && !/^https?:\/\//i.test(url) && !/^www\./i.test(url)) {
      const name = basename(url);
      if (name) extraTerms.push(name);
      return ` ${a} ${name} `;
    }
    return a ? ` ${a} ` : ' ';
  });

  text = text.replace(MD_LINK_RE, (_full, label: string) => {
    const l = String(label || '').trim();
    return l ? ` ${l} ` : ' ';
  });

  text = text.replace(DATA_IMAGE_RE, ' ');
  text = text.replace(LONG_BASE64_RE, ' ');
  text = text.replace(URL_RE, ' ');
  text = text.replace(WWW_RE, ' ');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return { text, extraTerms };
}

/** Basename of a vault path for filename indexing. */
export function pathBasename(path: string): string {
  return basename(path);
}
