export type MlxLmDownloadProgressSnapshot = {
  currentBytes: number;
  totalBytes: number;
  percent: number;
  label: string;
};

const SIZE_PAIR_RE =
  /(\d+(?:\.\d+)?)\s*([KMGTP](?:i?B)?|B)\s*\/\s*(\d+(?:\.\d+)?)\s*([KMGTP](?:i?B)?|B)/i;
const PERCENT_RE = /(\d+(?:\.\d+)?)\s*%/;

function sizeTokenToBytes(value: number, unit: string): number {
  const u = unit.toLowerCase();
  if (u === 'b' || u === '') return value;
  if (u === 'kib') return value * 1024;
  if (u === 'mib') return value * 1024 ** 2;
  if (u === 'gib') return value * 1024 ** 3;
  if (u === 'tib') return value * 1024 ** 4;
  if (u === 'kb') return value * 1000;
  if (u === 'mb') return value * 1000 ** 2;
  if (u === 'gb') return value * 1000 ** 3;
  if (u === 'tb') return value * 1000 ** 4;
  if (u === 'k') return value * 1000;
  if (u === 'm') return value * 1000 ** 2;
  if (u === 'g') return value * 1000 ** 3;
  if (u === 't') return value * 1000 ** 4;
  return value;
}

export function formatMlxLmByteSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes >= 1000 ** 3) return `${(bytes / 1000 ** 3).toFixed(1)} GB`;
  if (bytes >= 1000 ** 2) return `${(bytes / 1000 ** 2).toFixed(1)} MB`;
  if (bytes >= 1000) return `${(bytes / 1000).toFixed(1)} KB`;
  return `${Math.round(bytes)} B`;
}

export function formatMlxLmDownloadProgressLabel(
  snapshot: Pick<MlxLmDownloadProgressSnapshot, 'currentBytes' | 'totalBytes' | 'percent'>,
): string {
  const current = formatMlxLmByteSize(snapshot.currentBytes);
  const total = formatMlxLmByteSize(snapshot.totalBytes);
  const pct = Math.min(100, Math.max(0, Math.round(snapshot.percent)));
  return `${current} / ${total} (${pct}%)`;
}

export function normalizeMlxLmDownloadOutputChunk(chunk: string): string {
  const text = String(chunk || '').replace(/\r/g, '\n');
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return lines[lines.length - 1] ?? '';
}

export function parseMlxLmDownloadProgressLine(
  chunk: string,
  previous?: MlxLmDownloadProgressSnapshot | null,
): MlxLmDownloadProgressSnapshot | null {
  const line = normalizeMlxLmDownloadOutputChunk(chunk);
  if (!line) return previous ?? null;

  const sizeMatch = line.match(SIZE_PAIR_RE);
  if (sizeMatch) {
    const currentBytes = sizeTokenToBytes(Number.parseFloat(sizeMatch[1] ?? '0'), sizeMatch[2] ?? 'B');
    const totalBytes = sizeTokenToBytes(Number.parseFloat(sizeMatch[3] ?? '0'), sizeMatch[4] ?? 'B');
    if (totalBytes > 0) {
      const percentMatch = line.match(PERCENT_RE);
      const percent =
        percentMatch != null
          ? Number.parseFloat(percentMatch[1] ?? '0')
          : Math.min(100, (currentBytes / totalBytes) * 100);
      const snapshot = {
        currentBytes,
        totalBytes,
        percent,
        label: '',
      };
      snapshot.label = formatMlxLmDownloadProgressLabel(snapshot);
      return snapshot;
    }
  }

  const percentOnly = line.match(PERCENT_RE);
  if (percentOnly && previous && previous.totalBytes > 0) {
    const percent = Number.parseFloat(percentOnly[1] ?? '0');
    const currentBytes = Math.min(previous.totalBytes, (previous.totalBytes * percent) / 100);
    const snapshot = {
      currentBytes,
      totalBytes: previous.totalBytes,
      percent,
      label: '',
    };
    snapshot.label = formatMlxLmDownloadProgressLabel(snapshot);
    return snapshot;
  }

  return previous ?? null;
}

export function mergeMlxLmDownloadProgressChunk(
  chunk: string,
  previous?: MlxLmDownloadProgressSnapshot | null,
): MlxLmDownloadProgressSnapshot | null {
  return parseMlxLmDownloadProgressLine(chunk, previous);
}
