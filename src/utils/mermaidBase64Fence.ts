const MERMAID_IMAGE_DATA_RE = /^Mermaid!\[\]\((data:image\/[^)]+)\)\s*$/i;
const MD_IMAGE_DATA_RE = /^!\[\]\((data:image\/[^)]+)\)\s*$/i;
const BASE64_PAYLOAD_RE = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{48,}/i;

export function isMermaidLangToken(lang: string): boolean {
  return /^mermaid$/i.test(lang.trim());
}

/** True when a fence holds a Mermaid markdown image export or mermaid source with a large base64 payload. */
export function isMermaidBase64Fence(lang: string, content: string): boolean {
  const trimmed = content.trim();
  if (MERMAID_IMAGE_DATA_RE.test(trimmed)) return true;
  if (isMermaidLangToken(lang) && MD_IMAGE_DATA_RE.test(trimmed)) return true;
  if (isMermaidLangToken(lang) && BASE64_PAYLOAD_RE.test(trimmed)) return true;
  return /^Mermaid!\[\]\(/i.test(trimmed) && BASE64_PAYLOAD_RE.test(trimmed);
}

/** Extract `data:image/...;base64,...` from `Mermaid![](...)` or bare `![](...)` fence bodies. */
export function extractMermaidBase64ImageSrc(content: string): string | null {
  const trimmed = content.trim();
  const prefixed = MERMAID_IMAGE_DATA_RE.exec(trimmed);
  if (prefixed?.[1]) return prefixed[1];
  const bare = MD_IMAGE_DATA_RE.exec(trimmed);
  if (bare?.[1]) return bare[1];
  return null;
}

function extractMime(dataUri: string): string {
  const m = /^data:image\/([a-z0-9.+-]+)/i.exec(dataUri);
  return m?.[1] ?? 'image';
}

function formatPayloadSize(payloadLength: number): string {
  const bytes = Math.round((payloadLength * 3) / 4);
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  if (bytes >= 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${bytes}B`;
}

/** Short label for collapsed fence headers in preview. */
export function summarizeMermaidEmbedSource(content: string): string {
  const trimmed = content.trim();
  const imageSrc = extractMermaidBase64ImageSrc(trimmed);
  if (imageSrc) {
    const payload = imageSrc.match(/;base64,([A-Za-z0-9+/=]+)/i)?.[1] ?? '';
    return `![](…${extractMime(imageSrc)} ${formatPayloadSize(payload.length)}…)`;
  }
  if (BASE64_PAYLOAD_RE.test(trimmed)) return '…base64 payload…';
  const lineCount = trimmed.split('\n').length;
  if (lineCount > 1) return `${lineCount} lines`;
  return trimmed.length > 48 ? `${trimmed.slice(0, 40)}…` : trimmed;
}

/** Fold range inside a fenced code token: hide body, keep opening/closing fence lines. */
export function mermaidBase64FenceInnerRange(
  docText: string,
  nodeFrom: number,
  nodeTo: number,
): { from: number; to: number } | null {
  const slice = docText.slice(nodeFrom, nodeTo);
  const match = /^```([^\n]*)\n([\s\S]*)\n?```$/.exec(slice);
  if (!match) return null;
  const lang = match[1] ?? '';
  const body = match[2] ?? '';
  if (!isMermaidBase64Fence(lang, body)) return null;

  let lineStart = nodeFrom;
  while (lineStart < nodeTo && docText[lineStart] !== '\n') lineStart += 1;
  if (lineStart >= nodeTo) return null;
  lineStart += 1;

  let lineEnd = nodeTo;
  while (lineEnd > nodeFrom && docText[lineEnd - 1] !== '\n') lineEnd -= 1;
  if (lineEnd <= lineStart) return null;

  return { from: lineStart, to: lineEnd };
}
