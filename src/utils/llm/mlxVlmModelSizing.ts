export type MlxVlmFeasibility = 'ok' | 'tight' | 'unlikely' | 'unknown';

const BYTES_PER_GB = 1024 ** 3;

export type HfRepoFileEntry = {
  path?: string;
  rfilename?: string;
  size?: number;
  lfs?: { size?: number; pointerSize?: number };
};

export function formatByteSize(bytes: number | undefined): string {
  if (bytes == null || !Number.isFinite(bytes) || bytes <= 0) return '—';
  if (bytes >= BYTES_PER_GB) return `${(bytes / BYTES_PER_GB).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(0)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${Math.round(bytes)} B`;
}

export function getHfRepoFileEntryName(entry: HfRepoFileEntry): string {
  return String(entry.path || entry.rfilename || '').trim();
}

/** Prefer LFS payload size when present (HF tree + legacy sibling records). */
export function getHfRepoFileEntryBytes(entry: HfRepoFileEntry): number | undefined {
  const lfsSize = entry.lfs?.size;
  if (typeof lfsSize === 'number' && Number.isFinite(lfsSize) && lfsSize > 0) {
    return lfsSize;
  }
  const size = entry.size;
  if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
    return size;
  }
  return undefined;
}

/** Sum HF repo file sizes from siblings or /tree entries. */
export function sumHfRepoFileEntryBytes(entries: unknown): number | undefined {
  if (!Array.isArray(entries)) return undefined;
  let total = 0;
  let seen = false;
  for (const item of entries) {
    if (!item || typeof item !== 'object') continue;
    const bytes = getHfRepoFileEntryBytes(item as HfRepoFileEntry);
    if (bytes == null) continue;
    total += bytes;
    seen = true;
  }
  return seen ? total : undefined;
}

/** Sum *.gguf sizes when present; otherwise fall back to all entries. */
export function sumHfGgufRepoFileEntryBytes(entries: unknown): number | undefined {
  if (!Array.isArray(entries)) return undefined;
  const ggufOnly = entries.filter((item) => {
    if (!item || typeof item !== 'object') return false;
    return getHfRepoFileEntryName(item as HfRepoFileEntry).toLowerCase().endsWith('.gguf');
  });
  if (ggufOnly.length) return sumHfRepoFileEntryBytes(ggufOnly);
  return sumHfRepoFileEntryBytes(entries);
}

/** Sum HF sibling sizes (download footprint on disk). Prefer LFS payload size when present. */
export function sumHfSiblingBytes(siblings: unknown): number | undefined {
  return sumHfRepoFileEntryBytes(siblings);
}

function parseParamBillions(modelId: string): number | undefined {
  const id = modelId.toLowerCase();
  const match =
    id.match(/(?:^|[^0-9])(\d+(?:\.\d+)?)b(?:[^a-z]|$)/) ||
    id.match(/(\d+(?:\.\d+)?)b-instruct/) ||
    id.match(/-(\d+(?:\.\d+)?)b-/);
  if (!match?.[1]) return undefined;
  const value = Number.parseFloat(match[1]);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function parseQuantBits(modelId: string): number | undefined {
  const id = modelId.toLowerCase();
  if (id.includes('4bit') || id.includes('4-bit') || id.includes('-4b-')) return 4;
  if (id.includes('6bit') || id.includes('6-bit')) return 6;
  if (id.includes('8bit') || id.includes('8-bit')) return 8;
  if (id.includes('bf16') || id.includes('bfloat16')) return 16;
  if (id.includes('fp16') || id.includes('f16')) return 16;
  if (id.includes('fp32') || id.includes('f32')) return 32;
  return undefined;
}

/**
 * Rough unified-memory requirement for MLX inference (weights + modest KV / runtime).
 * Prefer diskBytes when known; otherwise infer from model id tokens (7B, 4bit, …).
 */
export function estimateMlxRamBytes(modelId: string, diskBytes?: number): number | undefined {
  if (diskBytes != null && diskBytes > 0) {
    // Loaded weights ~= disk; add ~25% headroom for KV cache + runtime on Apple Silicon.
    return Math.ceil(diskBytes * 1.25);
  }

  const paramsB = parseParamBillions(modelId);
  if (paramsB == null) return undefined;

  const bits = parseQuantBits(modelId) ?? 4;
  const bytesPerParam = bits / 8;
  const weightBytes = paramsB * 1e9 * bytesPerParam;
  const overhead = bits <= 4 ? 1.5 * BYTES_PER_GB : bits <= 8 ? 2 * BYTES_PER_GB : 3 * BYTES_PER_GB;
  return Math.ceil(weightBytes + overhead);
}

export function assessMlxModelFeasibility(
  estimatedRamBytes: number | undefined,
  availableRamBytes: number | undefined,
): MlxVlmFeasibility {
  if (estimatedRamBytes == null || estimatedRamBytes <= 0) return 'unknown';
  if (availableRamBytes == null || availableRamBytes <= 0) return 'unknown';

  if (estimatedRamBytes <= availableRamBytes * 0.7) return 'ok';
  if (estimatedRamBytes <= availableRamBytes * 0.92) return 'tight';
  return 'unlikely';
}

export function feasibilityLabel(feasibility: MlxVlmFeasibility): string {
  switch (feasibility) {
    case 'ok':
      return '실행 가능';
    case 'tight':
      return '메모리 빠듯';
    case 'unlikely':
      return 'RAM 부족 가능';
    default:
      return 'RAM 미확인';
  }
}

export function feasibilityClassName(feasibility: MlxVlmFeasibility): string {
  switch (feasibility) {
    case 'ok':
      return 'text-emerald-700 dark:text-emerald-300';
    case 'tight':
      return 'text-amber-700 dark:text-amber-300';
    case 'unlikely':
      return 'text-red-700 dark:text-red-400';
    default:
      return 'text-gray-500 dark:text-odp-muted';
  }
}

export function buildModelResourceSummary(input: {
  diskBytes?: number;
  estimatedRamBytes?: number;
  feasibility?: MlxVlmFeasibility;
}): string {
  const parts: string[] = [];
  if (input.diskBytes != null) parts.push(`용량 ${formatByteSize(input.diskBytes)}`);
  if (input.estimatedRamBytes != null) {
    parts.push(`예상 RAM ${formatByteSize(input.estimatedRamBytes)}`);
  }
  if (input.feasibility) parts.push(feasibilityLabel(input.feasibility));
  return parts.join(' · ');
}
