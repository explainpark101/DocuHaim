import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { listOpenAiCompatibleModels } from '@/utils/openaiCompatibleClient';
import {
  loadLastUsedOpenAiCompatibleModel,
  saveLastUsedOpenAiCompatibleModel,
} from '@/utils/openaiCompatibleSettings';

type ModelOption = { id: string; displayName: string };

type OpenAiCompatibleModelSelectProps = {
  getBaseUrl: () => string | Promise<string>;
  getApiKey: () => string | Promise<string>;
  value: string;
  onChange?: (nextId: string) => void;
  autoLoad?: boolean;
  className?: string;
};

export default function OpenAiCompatibleModelSelect({
  getBaseUrl,
  getApiKey,
  value,
  onChange,
  autoLoad = false,
  className = '',
}: OpenAiCompatibleModelSelectProps) {
  const listId = useId();
  const getBaseUrlRef = useRef(getBaseUrl);
  const getApiKeyRef = useRef(getApiKey);
  getBaseUrlRef.current = getBaseUrl;
  getApiKeyRef.current = getApiKey;
  const [fetched, setFetched] = useState<ModelOption[]>([]);
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
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels]);

  const handleChange = (nextId: string) => {
    saveLastUsedOpenAiCompatibleModel(nextId);
    onChange?.(nextId);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          disabled={loading}
          placeholder="모델 ID 직접 입력 (예: gpt-4o-mini)"
          list={listId}
          aria-label="모델 ID"
          className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
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
      <datalist id={listId}>
        {fetched.map((m) => (
          <option key={m.id} value={m.id}>
            {m.displayName}
          </option>
        ))}
      </datalist>
      {fetched.length > 0 ? (
        <div
          role="listbox"
          aria-label="서버에서 가져온 모델"
          className="mt-1.5 max-h-36 overflow-auto rounded border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        >
          {fetched.map((m) => {
            const selected = m.id === value;
            return (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => handleChange(m.id)}
                className={[
                  'block w-full truncate px-2 py-1.5 text-left text-[12px]',
                  selected
                    ? 'bg-blue-50 font-medium text-blue-800 dark:bg-blue-950/40 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg',
                ].join(' ')}
              >
                {m.displayName}
              </button>
            );
          })}
        </div>
      ) : null}
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
