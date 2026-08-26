import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { listGeminiModels } from '@/utils/llm/geminiClient';
import { withLlmProfileApiKey } from '@/utils/llm/llmApiKeySession';
import {
  FALLBACK_GEMINI_MODELS,
  loadLastUsedGeminiModel,
  saveLastUsedGeminiModel,
} from '@/utils/llm/geminiModelSettings';
import { isFreeTierBlockedModel } from '@/utils/llm/geminiError';

// Module-level cache so repeated mount/unmount (e.g. AI panel show/hide) doesn't spam model listing.
let cachedGeminiModels: any = null;
let cachedGeminiModelsKey: any = null;
let geminiModelsInFlight: any = null; // { key: string, promise: Promise<ModelOption[]> }

function formatModelLabel(model: any) {
  if (isFreeTierBlockedModel(model.id)) {
    return `${model.displayName} (무료 플랜 미지원)`;
  }
  return model.displayName;
}

function mergeModelOptions(models: any, selectedId: any) {
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
  className = ''
}: any) {
  const getGeminiApiKeyRef = useRef(getGeminiApiKey);
  getGeminiApiKeyRef.current = getGeminiApiKey;

  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const [models, setModels] = useState(() => mergeModelOptions(FALLBACK_GEMINI_MODELS, value));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshModels = useCallback(async ({ force = false } = {}) => {
    const getter = getGeminiApiKeyRef.current;
    if (typeof getter !== 'function') {
      setError('API 키가 설정되지 않았습니다.');
      return;
    }
    const key = (await Promise.resolve(getter()))?.trim();
    if (!key) {
      setError('API 키가 설정되지 않았습니다.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (!force && cachedGeminiModels && cachedGeminiModelsKey === key) {
        setModels(mergeModelOptions(cachedGeminiModels, valueRef.current));
        return;
      }

      if (geminiModelsInFlight && geminiModelsInFlight.key === key) {
        const list = await geminiModelsInFlight.promise;
        setModels(mergeModelOptions(list, valueRef.current));
        return;
      }

      const promise = withLlmProfileApiKey(profileId, getter, (apiKey) => listGeminiModels(apiKey));
      geminiModelsInFlight = { key, promise };
      const list = await promise;
      cachedGeminiModels = list;
      cachedGeminiModelsKey = key;
      setModels(mergeModelOptions(list, valueRef.current));
    } catch (err) {
      // @ts-expect-error TS(2571) FIXME: Object is of type 'unknown'.
      setError(err?.message || '모델 목록을 불러오지 못했습니다.');
      setModels(mergeModelOptions(FALLBACK_GEMINI_MODELS, valueRef.current));
    } finally {
      setLoading(false);
      if (geminiModelsInFlight && geminiModelsInFlight.key === key) geminiModelsInFlight = null;
    }
  }, [profileId]);

  useEffect(() => {
    setModels((prev) => mergeModelOptions(prev, value));
  }, [value]);

  useEffect(() => {
    if (!autoLoad) return;
    refreshModels();
  }, [autoLoad, refreshModels]);

  const handleChange = (nextId: any) => {
    saveLastUsedGeminiModel(nextId);
    onChange?.(nextId);
  };

  const selectValue = models.some((m) => m.id === value)
    ? value
    : (models[0]?.id ?? '');

  return (
    <div className={className}>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      <div className="flex items-center gap-2">
        // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        <select
          value={selectValue}
          onChange={(e: any) => handleChange(e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {formatModelLabel(m)}
            // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339): Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            // @ts-expect-error TS(2339) FIXME: Property 'option' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
            </option>
          ))}
        // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </select>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        <button
          type="button"
          onClick={() => void refreshModels({ force: true })}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          title="AI Studio 모델 목록 새로고침"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          새로고침
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
      </div>
      {error && (
        <p className="mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300">{error}</p>
      )}
      {isFreeTierBlockedModel(value) && (
        <p className="mt-1.5 text-[11px] text-amber-700 dark:text-amber-300">
          이 모델은 무료 플랜에서 할당량이 0일 수 있습니다. Gemini 2.0 Flash 사용을 권장합니다.
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'p' does not exist on type 'JSX.Intrinsic... Remove this comment to see the full error message
        </p>
      )}
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

export function useGeminiModelState() {
  const [model, setModel] = useState(() => loadLastUsedGeminiModel());
  const setModelAndSave = useCallback((next: any) => {
    saveLastUsedGeminiModel(next);
    setModel(loadLastUsedGeminiModel());
  }, []);

  const syncFromStorage = useCallback(() => {
    setModel(loadLastUsedGeminiModel());
  }, []);

  return [model, setModelAndSave, syncFromStorage];
}
