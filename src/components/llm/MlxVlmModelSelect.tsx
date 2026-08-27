import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Play, RefreshCw } from 'lucide-react';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';
import MlxVlmLoadFailureHint from '@/components/llm/MlxVlmLoadFailureHint';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  MLX_VLM_SETTINGS_CHANGED_EVENT,
  loadMlxVlmSettings,
} from '@/utils/mlxVlmSettingsStore';
import { requestMlxVlmProviderSync } from '@/utils/llm/mlxVlmProviderAutoSync';
import {
  MLX_VLM_RUNTIME_CHANGED_EVENT,
  type MlxVlmRuntimeChangedDetail,
} from '@/utils/llm/mlxVlmLoadNotifications';
import { resolveMlxVlmLoadFailure } from '@/utils/llm/mlxVlmLoadErrorHelp';
import {
  getMlxVlmServerStatus,
  loadMlxVlmModelById,
  refreshInstalledMlxVlmModels,
} from '@/utils/mlxVlmShell';
import {
  LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT,
  withLocalLlmModelAliases,
} from '@/utils/llm/localLlmModelAliases';

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
  return withLocalLlmModelAliases(
    'mlx-vlm',
    [...ids]
      .sort((a, b) => a.localeCompare(b))
      .map((id) => ({ id, displayName: id })),
  );
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

  const runLoadModel = useCallback(
    async (modelId: string) => {
      if (!isTauriMacOS()) return;
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
        setLoadError(resolveMlxVlmLoadFailure(err).message);
      } finally {
        if (loadRequestRef.current === requestId) {
          setModelLoading(false);
        }
      }
    },
    [refreshModels],
  );

  const loadModelIfAuto = useCallback(
    (modelId: string) => {
      if (!autoLoadModelOnSelect) return;
      void runLoadModel(modelId);
    },
    [autoLoadModelOnSelect, runLoadModel],
  );

  useEffect(() => {
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels]);

  useEffect(() => {
    const onChanged = () => void refreshModels();
    window.addEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
    window.addEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
      window.removeEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    };
  }, [refreshModels]);

  useEffect(() => {
    const onRuntimeChanged = (event: Event) => {
      const modelId = (event as CustomEvent<MlxVlmRuntimeChangedDetail>).detail?.modelId;
      if (modelId == null) {
        setLoadedModelId('');
        return;
      }
      const id = String(modelId).trim();
      setLoadedModelId(id);
      if (!value.trim() && id) {
        onChange?.(id);
      }
    };
    window.addEventListener(MLX_VLM_RUNTIME_CHANGED_EVENT, onRuntimeChanged);
    return () => window.removeEventListener(MLX_VLM_RUNTIME_CHANGED_EVENT, onRuntimeChanged);
  }, [onChange, value]);

  useEffect(() => {
    if (!loadedModelId || value.trim()) return;
    onChange?.(loadedModelId);
  }, [loadedModelId, onChange, value]);

  useEffect(() => {
    if (!autoLoadModelOnSelect || listLoading || modelLoading) return;
    const id = value.trim();
    if (!id) return;
    if (!options.some((option) => option.id === id)) return;
    void loadModelIfAuto(id);
  }, [autoLoadModelOnSelect, listLoading, modelLoading, loadModelIfAuto, options, value]);

  const handlePick = useCallback(
    (nextId: string) => {
      onChange?.(nextId);
      loadModelIfAuto(nextId);
    },
    [loadModelIfAuto, onChange],
  );

  const handleInputBlur = useCallback(() => {
    loadModelIfAuto(value);
  }, [loadModelIfAuto, value]);

  const handleLoadClick = useCallback(() => {
    void runLoadModel(value);
  }, [runLoadModel, value]);

  if (!isTauriMacOS()) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-odp-muted">
        MLX-VLM은 Tauri macOS 빌드에서만 사용할 수 있습니다.
      </p>
    );
  }

  const busy = listLoading || modelLoading;
  const trimmedValue = value.trim();
  const runtimeLoadedId = loadedModelId.trim();
  const selectionMatchesRuntime = Boolean(
    trimmedValue && runtimeLoadedId && trimmedValue === runtimeLoadedId,
  );
  const hasRuntimeMismatch = Boolean(
    runtimeLoadedId && trimmedValue && runtimeLoadedId !== trimmedValue,
  );
  const showsLoadedStatus = Boolean(runtimeLoadedId && (selectionMatchesRuntime || hasRuntimeMismatch));

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
          disabled={busy || !trimmedValue || selectionMatchesRuntime}
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
        <MlxVlmLoadFailureHint
          className="mt-1"
          error={loadError}
          modelId={trimmedValue}
        />
      ) : null}
      {modelLoading ? (
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          모델 로드 중…
        </p>
      ) : showsLoadedStatus ? (
        <div className="mt-1 space-y-0.5">
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
            로드됨 · {runtimeLoadedId}
          </p>
          {hasRuntimeMismatch ? (
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              선택한 모델과 다릅니다. 로드 버튼으로 전환하세요.
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          모델을 선택한 뒤 로드 버튼을 눌러 메모리에 올리세요.
        </p>
      )}
    </div>
  );
}
