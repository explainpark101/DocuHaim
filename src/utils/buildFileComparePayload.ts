import { decodeBytesForCompare, type DecodedCompareText } from '@/utils/decodeBytesForCompare';
import type { TreeNameConflictCompare } from '@/utils/vault/treeNameConflict';

export type ReadVaultBytesFn = (path: string) => Promise<Uint8Array | null>;

/**
 * Build compare payload for two vault file paths (or preloaded bytes).
 */
export async function buildFileComparePayload(options: {
  existingBytes: Uint8Array | null;
  incomingBytes: Uint8Array | null;
  existingLabel?: string;
  incomingLabel?: string;
}): Promise<TreeNameConflictCompare> {
  const existing = decodeBytesForCompare(options.existingBytes || new Uint8Array());
  const incoming = decodeBytesForCompare(options.incomingBytes || new Uint8Array());
  const binary = existing.binary || incoming.binary;
  const truncated = existing.truncated || incoming.truncated;
  const labels: Pick<TreeNameConflictCompare, 'existingLabel' | 'incomingLabel'> = {};
  if (options.existingLabel) labels.existingLabel = options.existingLabel;
  if (options.incomingLabel) labels.incomingLabel = options.incomingLabel;
  if (binary || truncated) {
    return {
      binary: true,
      truncated,
      existingText: null,
      incomingText: null,
      ...labels,
    };
  }
  return {
    binary: false,
    truncated: false,
    existingText: existing.text ?? '',
    incomingText: incoming.text ?? '',
    ...labels,
  };
}

export function summarizeDecoded(d: DecodedCompareText): {
  text: string | null;
  binary: boolean;
  truncated: boolean;
} {
  return { text: d.text, binary: d.binary, truncated: d.truncated };
}
