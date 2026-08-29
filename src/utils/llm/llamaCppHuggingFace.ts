import {
  cacheDirEntryToRepoId,
  isValidHuggingFaceRepoId,
  parseHuggingFaceModelUrl,
  repoIdToCacheDirEntryName,
  resolveHfModelDiskBytes,
} from '@/utils/llm/mlxVlmHuggingFace';
import { formatByteSize, sumHfGgufRepoFileEntryBytes, sumHfSiblingBytes } from '@/utils/llm/mlxVlmModelSizing';

export {
  cacheDirEntryToRepoId,
  isValidHuggingFaceRepoId,
  parseHuggingFaceModelUrl,
  repoIdToCacheDirEntryName,
};

export type HfGgufSearchHit = {
  id: string;
  author: string;
  downloads?: number;
  tags?: string[];
  /** Sum of *.gguf sibling sizes when known. */
  diskBytes?: number;
};

const HF_MODELS_API = 'https://huggingface.co/api/models';

export function isLikelyGgufRepo(hit: Pick<HfGgufSearchHit, 'id' | 'tags'>): boolean {
  const tags = (hit.tags || []).map((t) => t.toLowerCase());
  return tags.includes('gguf') || hit.id.toLowerCase().includes('gguf');
}

/** Sum LFS/file sizes for siblings whose name ends with .gguf. */
export function sumHfGgufSiblingBytes(siblings: unknown): number | undefined {
  const ggufBytes = sumHfGgufRepoFileEntryBytes(siblings);
  if (ggufBytes != null) return ggufBytes;
  return sumHfSiblingBytes(siblings);
}

export async function enrichHfGgufSearchHit(
  hit: HfGgufSearchHit,
  options?: { signal?: AbortSignal },
): Promise<HfGgufSearchHit> {
  if (hit.diskBytes != null && hit.diskBytes > 0) return hit;
  const diskBytes = await resolveHfModelDiskBytes(hit.id, {
    ...(options?.signal ? { signal: options.signal } : {}),
    ggufOnly: true,
  });
  return {
    ...hit,
    ...(diskBytes != null ? { diskBytes } : {}),
  };
}

export async function enrichHfGgufSearchHits(
  hits: HfGgufSearchHit[],
  options?: { signal?: AbortSignal },
): Promise<HfGgufSearchHit[]> {
  if (!hits.length) return hits;
  return Promise.all(
    hits.map((hit) => enrichHfGgufSearchHit(hit, options)),
  );
}

export async function searchHuggingFaceGgufModels(
  query: string,
  options?: { limit?: number; signal?: AbortSignal },
): Promise<HfGgufSearchHit[]> {
  const q = String(query || '').trim();
  if (!q) return [];

  const limit = Math.min(Math.max(options?.limit ?? 20, 1), 50);
  const params = new URLSearchParams({
    search: `${q} gguf`,
    limit: String(limit),
    full: 'false',
  });

  const res = await fetch(`${HF_MODELS_API}?${params.toString()}`, {
    ...(options?.signal ? { signal: options.signal } : {}),
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Hugging Face search failed (${res.status})`);
  }

  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];

  const hits: HfGgufSearchHit[] = [];
  for (const item of data) {
    if (!item || typeof item !== 'object') continue;
    const rec = item as Record<string, unknown>;
    const id = typeof rec.id === 'string' ? rec.id.trim() : '';
    if (!isValidHuggingFaceRepoId(id)) continue;
    const author = typeof rec.author === 'string' ? rec.author : id.split('/')[0] || '';
    const downloads = typeof rec.downloads === 'number' ? rec.downloads : undefined;
    const tags = Array.isArray(rec.tags)
      ? rec.tags.filter((t): t is string => typeof t === 'string')
      : undefined;
    hits.push({
      id,
      author,
      ...(downloads !== undefined ? { downloads } : {}),
      ...(tags?.length ? { tags } : {}),
    });
  }

  const filtered = hits
    .filter((hit) => isLikelyGgufRepo(hit) || hit.id.toLowerCase().includes('gguf'))
    .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));

  return enrichHfGgufSearchHits(filtered, options);
}

export function formatHfGgufDiskSizeLabel(diskBytes: number | undefined): string | null {
  if (diskBytes == null || !Number.isFinite(diskBytes) || diskBytes <= 0) return null;
  return formatByteSize(diskBytes);
}

export function buildLlamaCppDownloadConfirmMessage(
  repoId: string,
  options?: { diskBytes?: number },
): {
  title: string;
  message: string;
} {
  const id = String(repoId || '').trim();
  const sizeLabel = formatHfGgufDiskSizeLabel(options?.diskBytes);
  return {
    title: 'llama.cpp 모델 다운로드',
    message: [
      `Hugging Face에서 "${id}" GGUF 모델을 다운로드할까요?`,
      ...(sizeLabel ? [`예상 용량: ${sizeLabel}`] : []),
      '',
      '*.gguf 파일만 받습니다. 다운로드 후 Settings에서 Start server로 실행하세요.',
    ].join('\n'),
  };
}

export function buildLlamaCppDeleteConfirmMessage(modelId: string): {
  title: string;
  message: string;
} {
  const id = String(modelId || '').trim();
  return {
    title: 'llama.cpp 모델 삭제',
    message: [
      `설치 목록에서 "${id}" 모델을 제거할까요?`,
      '',
      'Hugging Face 캐시의 models--… 폴더도 삭제됩니다.',
    ].join('\n'),
  };
}
