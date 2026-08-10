/**
 * Decode vault bytes for side-by-side / git-diff compare.
 * Binary or oversized payloads skip text compare.
 */

export const TREE_COMPARE_MAX_BYTES = 512 * 1024;

export type DecodedCompareText = {
  text: string | null;
  binary: boolean;
  truncated: boolean;
};

export function looksBinaryBytes(bytes: Uint8Array, sample = 8192): boolean {
  const n = Math.min(bytes.length, sample);
  for (let i = 0; i < n; i += 1) {
    if (bytes[i] === 0) return true;
  }
  return false;
}

export function decodeBytesForCompare(bytes: Uint8Array | null | undefined): DecodedCompareText {
  if (!bytes || bytes.byteLength === 0) {
    return { text: '', binary: false, truncated: false };
  }
  if (bytes.byteLength > TREE_COMPARE_MAX_BYTES) {
    return { text: null, binary: true, truncated: true };
  }
  if (looksBinaryBytes(bytes)) {
    return { text: null, binary: true, truncated: false };
  }
  try {
    const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    return { text, binary: false, truncated: false };
  } catch {
    return { text: null, binary: true, truncated: false };
  }
}
