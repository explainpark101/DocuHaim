import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_EXAONE_MODEL,
  EXAONE_API_BASE_URL,
  EXAONE_TABULAR_CLASSIFICATION_MODEL,
  EXAONE_TABULAR_REGRESSION_MODEL,
  KNOWN_EXAONE_MODELS,
  isExaoneTabularModelId,
  listExaoneModels,
} from '@/utils/llm/exaoneSettings';

vi.mock('@/utils/llm/openaiCompatibleClient', () => ({
  listOpenAiCompatibleModels: vi.fn(),
}));

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
});

describe('EXAONE tabular model ids', () => {
  it('recognizes tabular pseudo-models in the known catalog', () => {
    expect(isExaoneTabularModelId(EXAONE_TABULAR_CLASSIFICATION_MODEL)).toBe(true);
    expect(isExaoneTabularModelId(EXAONE_TABULAR_REGRESSION_MODEL)).toBe(true);
    expect(isExaoneTabularModelId(DEFAULT_EXAONE_MODEL)).toBe(false);
    expect(
      KNOWN_EXAONE_MODELS.some((m) => m.id === EXAONE_TABULAR_CLASSIFICATION_MODEL),
    ).toBe(true);
  });
});

describe('listExaoneModels', () => {
  it('rejects empty API key', async () => {
    await expect(listExaoneModels('')).rejects.toThrow(/API 키/);
  });

  it('returns remote models and merges known catalog', async () => {
    const { listOpenAiCompatibleModels } = await import('@/utils/llm/openaiCompatibleClient');
    vi.mocked(listOpenAiCompatibleModels).mockResolvedValue([
      { id: 'other-model', displayName: 'Other' },
    ]);

    const list = await listExaoneModels('test-key');

    expect(listOpenAiCompatibleModels).toHaveBeenCalledWith(EXAONE_API_BASE_URL, 'test-key');
    expect(list.some((m) => m.id === DEFAULT_EXAONE_MODEL)).toBe(true);
    expect(list.some((m) => m.id === 'other-model')).toBe(true);
  });

  it('falls back to known models when list endpoint fails without auth error', async () => {
    const { listOpenAiCompatibleModels } = await import('@/utils/llm/openaiCompatibleClient');
    vi.mocked(listOpenAiCompatibleModels).mockRejectedValue(new Error('Endpoint 또는 모델을 찾을 수 없습니다 (404).'));

    await expect(listExaoneModels('test-key')).resolves.toEqual(KNOWN_EXAONE_MODELS);
  });

  it('rethrows auth failures', async () => {
    const { listOpenAiCompatibleModels } = await import('@/utils/llm/openaiCompatibleClient');
    vi.mocked(listOpenAiCompatibleModels).mockRejectedValue(
      new Error('API 키 권한이 없거나 이 모델에 접근할 수 없습니다.\n\nUnauthorized'),
    );

    await expect(listExaoneModels('bad-key')).rejects.toThrow(/API 키/);
  });
});
