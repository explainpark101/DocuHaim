import {
  assessMlxModelFeasibility,
  estimateMlxRamBytes,
  feasibilityLabel,
  formatByteSize,
  sumHfSiblingBytes,
  type MlxVlmFeasibility,
} from '@/utils/llm/mlxVlmModelSizing';
import { getMlxAvailableMemoryBudgetBytes } from '@/utils/llm/mlxVlmSystemMemory';

export type { MlxVlmFeasibility };

export type HfModelSearchHit = {
  id: string;
  author: string;
  downloads?: number;
  tags?: string[];
  pipeline_tag?: string;
  diskBytes?: number;
  estimatedRamBytes?: number;
  feasibility?: MlxVlmFeasibility;
};

const HF_MODELS_API = 'https://huggingface.co/api/models';
const HF_REPO_ID_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

export function isValidHuggingFaceRepoId(value: string): boolean {
  return HF_REPO_ID_RE.test(String(value || '').trim());
}

export function isMlxCommunityRepoId(repoId: string): boolean {
  return String(repoId || '').trim().toLowerCase().startsWith('mlx-community/');
}

/** HF hub cache entries auto-discovered for MLX-VLM (excludes llama.cpp GGUF repos). */
export function isMlxVlmCacheAutoDiscoverRepo(repoId: string): boolean {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return false;
  if (/gguf/i.test(id)) return false;
  return isMlxCommunityRepoId(id);
}

export function isLikelyPreconvertedMlxRepo(hit: Pick<HfModelSearchHit, 'id' | 'tags'>): boolean {
  if (isMlxCommunityRepoId(hit.id)) return true;
  const tags = (hit.tags || []).map((t) => t.toLowerCase());
  return tags.includes('mlx') || tags.includes('mlx-vlm');
}

/** Parse HF model page URL or raw org/model id into a repo id. */
export function parseHuggingFaceModelUrl(input: string): string | null {
  const trimmed = String(input || '').trim();
  if (!trimmed) return null;
  if (isValidHuggingFaceRepoId(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (!/huggingface\.co$/i.test(url.hostname)) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] === 'models' && parts.length >= 3) {
      const repoId = `${parts[1]}/${parts[2]}`;
      return isValidHuggingFaceRepoId(repoId) ? repoId : null;
    }
    if (parts.length >= 2) {
      const repoId = `${parts[0]}/${parts[1]}`;
      return isValidHuggingFaceRepoId(repoId) ? repoId : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function cacheDirEntryToRepoId(dirName: string): string | null {
  const name = String(dirName || '').trim();
  if (!name.startsWith('models--')) return null;
  const body = name.slice('models--'.length);
  const idx = body.indexOf('--');
  if (idx <= 0 || idx >= body.length - 2) return null;
  const org = body.slice(0, idx);
  const model = body.slice(idx + 2);
  const repoId = `${org}/${model}`;
  return isValidHuggingFaceRepoId(repoId) ? repoId : null;
}

export function repoIdToCacheDirEntryName(repoId: string): string | null {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return null;
  const slash = id.indexOf('/');
  const org = id.slice(0, slash);
  const model = id.slice(slash + 1);
  return `models--${org}--${model}`;
}

export function huggingFaceCacheEntryMatchesRepo(entryName: string, repoId: string): boolean {
  const id = String(repoId || '').trim();
  if (!id) return false;
  const name = String(entryName || '').trim();
  if (!name) return false;
  const normalized = name.replace(/\.lock(\.json)?$/i, '');
  if (cacheDirEntryToRepoId(normalized) === id) return true;
  const canonical = repoIdToCacheDirEntryName(id);
  return Boolean(canonical && (normalized === canonical || name === canonical || name.startsWith(`${canonical}.`)));
}

export function buildMlxVlmDeleteConfirmMessage(modelId: string): { title: string; message: string } {
  const id = String(modelId || '').trim();
  return {
    title: 'MLX-VLM 모델 삭제',
    message: [
      `Hugging Face 캐시에서 "${id}" 모델을 삭제할까요?`,
      '',
      '디스크의 ~/.cache/huggingface/hub/models--… 폴더가 제거됩니다.',
      '다시 사용하려면 재다운로드가 필요합니다.',
    ].join('\n'),
  };
}

export async function searchHuggingFaceMlxModels(
  query: string,
  options?: { limit?: number; signal?: AbortSignal },
): Promise<HfModelSearchHit[]> {
  const q = String(query || '').trim();
  if (!q) return [];

  const limit = Math.min(Math.max(options?.limit ?? 20, 1), 50);
  const params = new URLSearchParams({
    search: q,
    filter: 'mlx',
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

  const hits: HfModelSearchHit[] = [];
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
    const pipeline_tag = typeof rec.pipeline_tag === 'string' ? rec.pipeline_tag : undefined;
    hits.push({
      id,
      author,
      ...(downloads !== undefined ? { downloads } : {}),
      ...(tags?.length ? { tags } : {}),
      ...(pipeline_tag ? { pipeline_tag } : {}),
    });
  }

  return hits.sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0));
}

function applyModelResourceEstimates(
  hit: HfModelSearchHit,
  diskBytes: number | undefined,
  availableRamBytes: number | null,
): HfModelSearchHit {
  const estimatedRamBytes = estimateMlxRamBytes(hit.id, diskBytes);
  const feasibility = assessMlxModelFeasibility(
    estimatedRamBytes,
    availableRamBytes ?? undefined,
  );
  return {
    ...hit,
    ...(diskBytes != null ? { diskBytes } : {}),
    ...(estimatedRamBytes != null ? { estimatedRamBytes } : {}),
    feasibility,
  };
}

async function fetchHfModelRecord(
  repoId: string,
  signal?: AbortSignal,
): Promise<Record<string, unknown> | null> {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return null;
  const res = await fetch(`${HF_MODELS_API}/${encodeURIComponent(id)}`, {
    ...(signal ? { signal } : {}),
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) return null;
  return (await res.json()) as Record<string, unknown>;
}

function hitFromRecord(rec: Record<string, unknown>, id: string): HfModelSearchHit {
  const author = typeof rec.author === 'string' ? rec.author : id.split('/')[0] || '';
  const downloads = typeof rec.downloads === 'number' ? rec.downloads : undefined;
  const tags = Array.isArray(rec.tags)
    ? rec.tags.filter((t): t is string => typeof t === 'string')
    : undefined;
  const pipeline_tag = typeof rec.pipeline_tag === 'string' ? rec.pipeline_tag : undefined;
  return {
    id,
    author,
    ...(downloads !== undefined ? { downloads } : {}),
    ...(tags?.length ? { tags } : {}),
    ...(pipeline_tag ? { pipeline_tag } : {}),
  };
}

export async function enrichHfModelHit(
  hit: HfModelSearchHit,
  options?: { signal?: AbortSignal; availableRamBytes?: number | null },
): Promise<HfModelSearchHit> {
  const availableRamBytes =
    options?.availableRamBytes !== undefined
      ? options.availableRamBytes
      : await getMlxAvailableMemoryBudgetBytes();

  if (hit.diskBytes != null) {
    return applyModelResourceEstimates(hit, hit.diskBytes, availableRamBytes);
  }

  const rec = await fetchHfModelRecord(hit.id, options?.signal);
  const diskBytes = rec ? sumHfSiblingBytes(rec.siblings) : undefined;
  return applyModelResourceEstimates(hit, diskBytes, availableRamBytes);
}

export async function enrichHfModelHits(
  hits: HfModelSearchHit[],
  options?: { signal?: AbortSignal },
): Promise<HfModelSearchHit[]> {
  if (!hits.length) return hits;
  const availableRamBytes = await getMlxAvailableMemoryBudgetBytes();
  const enriched = await Promise.all(
    hits.map((hit) =>
      enrichHfModelHit(hit, {
        ...(options?.signal ? { signal: options.signal } : {}),
        availableRamBytes,
      }),
    ),
  );
  return enriched;
}

export async function searchAndEnrichHuggingFaceMlxModels(
  query: string,
  options?: { limit?: number; signal?: AbortSignal },
): Promise<HfModelSearchHit[]> {
  const hits = await searchHuggingFaceMlxModels(query, options);
  if (!hits.length) return hits;
  return enrichHfModelHits(hits, options);
}

export async function fetchHuggingFaceModelInfo(
  repoId: string,
  signal?: AbortSignal,
): Promise<HfModelSearchHit | null> {
  const id = String(repoId || '').trim();
  if (!isValidHuggingFaceRepoId(id)) return null;
  const rec = await fetchHfModelRecord(id, signal);
  if (!rec) return null;
  const hit = hitFromRecord(rec, id);
  return enrichHfModelHit(hit, { ...(signal ? { signal } : {}) });
}

export async function resolveHuggingFaceModelDiskBytes(
  repoId: string,
  options?: { hit?: Pick<HfModelSearchHit, 'diskBytes'> | null; signal?: AbortSignal },
): Promise<number> {
  const fromHit = options?.hit?.diskBytes ?? 0;
  if (fromHit > 0) return fromHit;
  const info = await fetchHuggingFaceModelInfo(repoId, options?.signal);
  return info?.diskBytes ?? 0;
}

export type MlxVlmDownloadMode = 'download' | 'convert';

export function resolveMlxVlmDownloadMode(
  repoId: string,
  hit?: Pick<HfModelSearchHit, 'id' | 'tags'> | null,
): MlxVlmDownloadMode {
  if (isMlxCommunityRepoId(repoId)) return 'download';
  if (hit && isLikelyPreconvertedMlxRepo(hit)) return 'download';
  return 'convert';
}

export function buildMlxVlmDownloadConfirmMessage(
  repoId: string,
  mode: MlxVlmDownloadMode,
  hit?: Pick<HfModelSearchHit, 'diskBytes' | 'estimatedRamBytes' | 'feasibility'> | null,
): { title: string; message: string } {
  const resourceLines: string[] = [];
  if (hit?.diskBytes != null) {
    resourceLines.push(`다운로드 용량: ${formatByteSize(hit.diskBytes)}`);
  }
  if (hit?.estimatedRamBytes != null) {
    resourceLines.push(`예상 RAM: ${formatByteSize(hit.estimatedRamBytes)}`);
  }
  if (hit?.feasibility && hit.feasibility !== 'unknown') {
    resourceLines.push(`실행 가능성: ${feasibilityLabel(hit.feasibility)}`);
  }
  const resourceBlock = resourceLines.length ? ['', ...resourceLines] : [];

  if (mode === 'download') {
    return {
      title: 'MLX 모델 다운로드',
      message: [
        `"${repoId}" 모델을 Hugging Face에서 다운로드합니다.`,
        '',
        '네트워크 사용량과 디스크 공간이 필요합니다.',
        '다운로드는 완료까지 시간이 걸릴 수 있습니다.',
        ...resourceBlock,
      ].join('\n'),
    };
  }
  return {
    title: 'MLX 모델 변환',
    message: [
      `"${repoId}" 모델을 MLX 4-bit로 변환합니다.`,
      '',
      '변환은 CPU/GPU를 많이 사용하며 수십 분 이상 걸릴 수 있습니다.',
      '디스크 공간과 네트워크 사용량이 발생합니다.',
      ...resourceBlock,
    ].join('\n'),
  };
}

export function buildMlxVlmRedownloadConfirmMessage(
  repoId: string,
  mode: MlxVlmDownloadMode,
  hit?: Pick<HfModelSearchHit, 'diskBytes' | 'estimatedRamBytes' | 'feasibility'> | null,
): { title: string; message: string } {
  const base = buildMlxVlmDownloadConfirmMessage(repoId, mode, hit);
  if (mode === 'download') {
    return {
      title: 'MLX 모델 다시 다운로드',
      message: [
        `"${repoId}" 모델은 이미 다운로드되어 있습니다.`,
        '다시 다운로드하면 Hugging Face에서 파일을 다시 받아 로컬 캐시를 덮어쓸 수 있습니다.',
        '',
        base.message,
      ].join('\n'),
    };
  }
  return {
    title: 'MLX 모델 다시 변환',
    message: [
      `"${repoId}" 모델은 이미 변환·설치되어 있습니다.`,
      '다시 변환하면 기존 캐시를 덮어쓸 수 있으며 시간이 오래 걸릴 수 있습니다.',
      '',
      base.message,
    ].join('\n'),
  };
}

export function buildMlxVlmDownloadAbortConfirmMessage(
  repoId: string,
  mode: MlxVlmDownloadMode,
): { title: string; message: string } {
  const id = String(repoId || '').trim();
  if (mode === 'convert') {
    return {
      title: 'MLX 모델 변환 중단',
      message: [
        `"${id}" 모델 변환을 중단할까요?`,
        '',
        '진행 중이던 Hugging Face 캐시 파일이 삭제됩니다.',
        '다시 사용하려면 변환을 처음부터 다시 시작해야 합니다.',
      ].join('\n'),
    };
  }
  return {
    title: 'MLX 모델 다운로드 중단',
    message: [
      `"${id}" 모델 다운로드를 중단할까요?`,
      '',
      '진행 중이던 Hugging Face 캐시 파일이 삭제됩니다.',
      '다시 사용하려면 다운로드를 처음부터 다시 시작해야 합니다.',
    ].join('\n'),
  };
}
