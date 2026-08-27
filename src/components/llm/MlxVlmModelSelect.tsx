import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Play, RefreshCw } from 'lucide-react';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  MLX_VLM_SETTINGS_CHANGED_EVENT,
  loadMlxVlmSettings,
} from '@/utils/mlxVlmSettingsStore';
import { requestMlxVlmProviderSync } from '@/utils/llm/mlxVlmProviderAutoSync';
import {
  getMlxVlmServerStatus,
  loadMlxVlmModelById,
  refreshInstalledMlxVlmModels,
} from '@/utils/mlxVlmShell';

type MlxVlmModelSelectProps = {
  value: string;
  onChange?: (nextId: string) => void;
  /** Refresh installed model list on mount. */
  autoLoad?: boolean;
  /** When true, selecting a model starts loading immediately (default: manual load button). */
  autoLoadModelOnSelect?: boolean;
  className?: string;
};

function buildModelOptions(
  models: readonly { id: string; repoId?: string }[],
  extras: readonly string[],
): ModelIdOption[] {
  const ids = new Set<string>();
  for (const model of models) {
    const id = String(model.repoId || model.id || '').trim();
    if (id) ids.add(id);
  }
  for (const id of extras) {
    const trimmed = String(id || '').trim();
    if (trimmed) ids.add(trimmed);
  }
  return [...ids]
    .sort((a, b) => a.localeCompare(b))
    .map((id) => ({ id, displayName: id }));
}

export default function MlxVlmModelSelect({
  value,
  onChange,
  autoLoad = true,
  autoLoadModelOnSelect = false,
  className = '',
}: MlxVlmModelSelectProps) {
  const [options, setOptions] = useState<ModelIdOption[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [loadedModelId, setLoadedModelId] = useState('');
  const loadRequestRef = useRef(0);

  const refreshModels = useCallback(async () => {
    if (!isTauriMacOS()) return;
    setListLoading(true);
    setError('');
    try {
      const settings = loadMlxVlmSettings();
      const [{ models }, status] = await Promise.all([
        refreshInstalledMlxVlmModels(),
        getMlxVlmServerStatus(settings),
      ]);
      setLoadedModelId(status.models[0] || '');
      setOptions(
        buildModelOptions(models, [
          settings.selectedModelId,
          value,
          ...status.models,
        ]),
      );
      if (!models.length && !settings.selectedModelId.trim() && !value.trim()) {
        setError('설치된 MLX 모델이 없습니다. 설정 > MLX-VLM에서 모델을 추가하세요.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'MLX 모델 목록을 불러오지 못했습니다.');
    } finally {
      setListLoading(false);
    }
  }, [value]);

  const loadModel = useCallback(
    async (modelId: string) => {
      if (!autoLoadModelOnSelect || !isTauriMacOS()) return;
      const id = String(modelId || '').trim();
      if (!id) return;

      const status = await getMlxVlmServerStatus();
      if (status.running && status.models[0] === id) {
        setLoadedModelId(id);
        setLoadError('');
        return;
      }

      const requestId = loadRequestRef.current + 1;
      loadRequestRef.current = requestId;
      setModelLoading(true);
      setLoadError('');
      try {
        const result = await loadMlxVlmModelById(id);
        if (loadRequestRef.current !== requestId) return;
        setLoadedModelId(result.model);
        requestMlxVlmProviderSync();
        await refreshModels();
      } catch (err) {
        if (loadRequestRef.current !== requestId) return;
        setLoadError(err instanceof Error ? err.message : 'MLX-VLM 모델 로드에 실패했습니다.');
      } finally {
        if (loadRequestRef.current === requestId) {
          setModelLoading(false);
        }
      }
    },
    [autoLoadModelOnSelect, refreshModels],
  );

  useEffect(() => {
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels]);

  useEffect(() => {
    const onChanged = () => void refreshModels();
    window.addEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
  }, [refreshModels]);

  useEffect(() => {
    if (!autoLoadModelOnSelect || listLoading || modelLoading) return;
    const id = value.trim();
    if (!id) return;
    if (!options.some((option) => option.id === id)) return;
    void loadModel(id);
  }, [autoLoadModelOnSelect, listLoading, modelLoading, loadModel, options, value]);

  const handlePick = useCallback(
    (nextId: string) => {
      onChange?.(nextId);
      if (autoLoadModelOnSelect) {
        void loadModel(nextId);
      }
    },
    [autoLoadModelOnSelect, loadModel, onChange],
  );

  const handleInputBlur = useCallback(() => {
    if (autoLoadModelOnSelect) {
      void loadModel(value);
    }
  }, [autoLoadModelOnSelect, loadModel, value]);

  const handleLoadClick = useCallback(() => {
    void loadModel(value);
  }, [loadModel, value]);

  if (!isTauriMacOS()) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-odp-muted">
        MLX-VLM은 Tauri macOS 빌드에서만 사용할 수 있습니다.
      </p>
    );
  }

  const busy = listLoading || modelLoading;
  const trimmedValue = value.trim();
  const isLoaded = Boolean(trimmedValue && loadedModelId === trimmedValue);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <ModelIdInputDropdown
          value={value}
          options={options}
          loading={listLoading}
          maxItems={200}
          {...(onChange ? { onChange } : {})}
          onPick={handlePick}
          onInputBlur={handleInputBlur}
          placeholder="MLX model id"
          className="min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={handleLoadClick}
          disabled={busy || !trimmedValue || isLoaded}
          aria-label="Load MLX model"
          className="inline-flex shrink-0 items-center gap-1 rounded border border-emerald-300 bg-emerald-50 px-2 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60"
        >
          {modelLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          로드
        </button>
        <button
          type="button"
          onClick={() => void refreshModels()}
          disabled={busy}
          aria-label="Refresh MLX models"
          className="inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
        >
          {listLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
        </button>
      </div>
      {error ? <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">{error}</p> : null}
      {loadError ? (
        <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{loadError}</p>
      ) : null}
      {modelLoading ? (
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          모델 로드 중…
        </p>
      ) : isLoaded ? (
        <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-300">
          로드됨 · {loadedModelId}
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          모델을 선택한 뒤 로드 버튼을 눌러 메모리에 올리세요.
        </p>
      )}
    </div>
  );
}
