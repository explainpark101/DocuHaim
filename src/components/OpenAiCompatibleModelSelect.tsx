import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { listOpenAiCompatibleModels } from '@/utils/openaiCompatibleClient';
import {
  loadLastUsedOpenAiCompatibleModel,
  saveLastUsedOpenAiCompatibleModel,
} from '@/utils/openaiCompatibleSettings';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';

type OpenAiCompatibleModelSelectProps = {
  getBaseUrl: () => string | Promise<string>;
  getApiKey: () => string | Promise<string>;
  value: string;
  onChange?: (nextId: string) => void;
  autoLoad?: boolean;
  /** Remount/reload when provider or endpoint context changes. */
  reloadKey?: string;
  className?: string;
};

export default function OpenAiCompatibleModelSelect({
  getBaseUrl,
  getApiKey,
  value,
  onChange,
  autoLoad = false,
  reloadKey = '',
  className = '',
}: OpenAiCompatibleModelSelectProps) {
  const getBaseUrlRef = useRef(getBaseUrl);
  const getApiKeyRef = useRef(getApiKey);
  getBaseUrlRef.current = getBaseUrl;
  getApiKeyRef.current = getApiKey;
  const [fetched, setFetched] = useState<ModelIdOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshModels = useCallback(async () => {
    const baseUrl = (await Promise.resolve(getBaseUrlRef.current()))?.trim();
    if (!baseUrl) {
      setError('Endpoint URL을 먼저 입력하세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const apiKey = (await Promise.resolve(getApiKeyRef.current()))?.trim() ?? '';
      const list = await listOpenAiCompatibleModels(baseUrl, apiKey);
      setFetched(list);
      if (!list.length) {
        setError('모델 목록이 비어 있습니다. 모델 ID를 직접 입력하세요.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '모델 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFetched([]);
    setError('');
  }, [reloadKey]);

  useEffect(() => {
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels, reloadKey]);

  const handleChange = (nextId: string) => {
    saveLastUsedOpenAiCompatibleModel(nextId);
    onChange?.(nextId);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <ModelIdInputDropdown
          value={value}
          onChange={handleChange}
          options={fetched}
          loading={loading}
          placeholder="모델 ID 직접 입력 (예: gpt-4o-mini)"
        />
        <button
          type="button"
          onClick={() => void refreshModels()}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] hover:bg-gray-50 disabled:opacity-60 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          aria-label="모델 목록 새로고침"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          새로고침
        </button>
      </div>
      <p className="mt-1.5 text-[11px] text-gray-500 dark:text-odp-muted">
        새로고침으로 서버 모델을 가져오거나, 모델 ID를 직접 입력하세요.
      </p>
      {error ? (
        <p className="mt-1.5 whitespace-pre-line text-[11px] text-amber-700 dark:text-amber-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function useOpenAiCompatibleModelState(): [
  string,
  (next: string) => void,
  () => void,
] {
  const [model, setModel] = useState(() => loadLastUsedOpenAiCompatibleModel());
  const setModelAndSave = useCallback((next: string) => {
    saveLastUsedOpenAiCompatibleModel(next);
    setModel(loadLastUsedOpenAiCompatibleModel());
  }, []);

  const syncFromStorage = useCallback(() => {
    setModel(loadLastUsedOpenAiCompatibleModel());
  }, []);

  return [model, setModelAndSave, syncFromStorage];
}
