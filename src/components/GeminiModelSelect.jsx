import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { listGeminiModels } from '@/utils/geminiClient';
import { withLlmProfileApiKey } from '@/utils/llmApiKeySession';
import {
  FALLBACK_GEMINI_MODELS,
  loadLastUsedGeminiModel,
  saveLastUsedGeminiModel,
} from '@/utils/geminiModelSettings';
import { isFreeTierBlockedModel } from '@/utils/geminiError';

function formatModelLabel(model) {
  if (isFreeTierBlockedModel(model.id)) {
    return `${model.displayName} (무료 플랜 미지원)`;
  }
  return model.displayName;
}

function mergeModelOptions(models, selectedId) {
  const map = new Map();
  for (const item of models) map.set(item.id, item);
  if (selectedId && !map.has(selectedId)) {
    map.set(selectedId, { id: selectedId, displayName: selectedId });
  }
  return [...map.values()].sort((a, b) => a.displayName.localeCompare(b.displayName, 'ko'));
}

export default function GeminiModelSelect({
  getGeminiApiKey,
  profileId = 'gemini',
  value,
  onChange,
  autoLoad = false,
  className = '',
}) {
  const [models, setModels] = useState(() => mergeModelOptions(FALLBACK_GEMINI_MODELS, value));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshModels = useCallback(async () => {
    if (typeof getGeminiApiKey !== 'function') {
      setError('API 키가 설정되지 않았습니다.');
      return;
    }
    const key = (await Promise.resolve(getGeminiApiKey()))?.trim();
    if (!key) {
      setError('API 키가 설정되지 않았습니다.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const list = await withLlmProfileApiKey(profileId, getGeminiApiKey, (apiKey) =>
        listGeminiModels(apiKey),
      );
      setModels(mergeModelOptions(list, value));
    } catch (err) {
      setError(err?.message || '모델 목록을 불러오지 못했습니다.');
      setModels(mergeModelOptions(FALLBACK_GEMINI_MODELS, value));
    } finally {
      setLoading(false);
    }
  }, [getGeminiApiKey, profileId, value]);

  useEffect(() => {
    setModels((prev) => mergeModelOptions(prev, value));
  }, [value]);

  useEffect(() => {
    if (!autoLoad) return;
    refreshModels();
  }, [autoLoad, refreshModels]);

  const handleChange = (nextId) => {
    saveLastUsedGeminiModel(nextId);
    onChange?.(nextId);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <select
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={loading}
          className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {formatModelLabel(m)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={refreshModels}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          title="AI Studio 모델 목록 새로고침"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          새로고침
        </button>
      </div>
      {error && (
        <p className="mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300">{error}</p>
      )}
      {isFreeTierBlockedModel(value) && (
        <p className="mt-1.5 text-[11px] text-amber-700 dark:text-amber-300">
          이 모델은 무료 플랜에서 할당량이 0일 수 있습니다. Gemini 2.0 Flash 사용을 권장합니다.
        </p>
      )}
    </div>
  );
}

export function useGeminiModelState() {
  const [model, setModel] = useState(() => loadLastUsedGeminiModel());
  const setModelAndSave = useCallback((next) => {
    saveLastUsedGeminiModel(next);
    setModel(loadLastUsedGeminiModel());
  }, []);

  const syncFromStorage = useCallback(() => {
    setModel(loadLastUsedGeminiModel());
  }, []);

  return [model, setModelAndSave, syncFromStorage];
}
