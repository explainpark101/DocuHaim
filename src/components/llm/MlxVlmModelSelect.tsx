import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Loader2, Play, RefreshCw, Square } from 'lucide-react';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';
import MlxVlmLoadFailureHint from '@/components/llm/MlxVlmLoadFailureHint';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
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
  isMlxVlmServerManagedByApp,
  loadMlxVlmModelById,
  refreshInstalledMlxVlmModels,
  stopMlxVlmServer,
} from '@/utils/mlxVlmShell';
import {
  LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT,
  localLlmModelDisplayName,
  resolveLocalLlmModelId,
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
  const [unloadBusy, setUnloadBusy] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [loadedModelId, setLoadedModelId] = useState('');
  const [managedByApp, setManagedByApp] = useState(false);
  const [unloadConfirmOpen, setUnloadConfirmOpen] = useState(false);
  const loadRequestRef = useRef(0);

  const canonicalValue = useMemo(
    () => resolveLocalLlmModelId('mlx-vlm', value, options),
    [options, value],
  );

  const handleModelChange = useCallback(
    (next: string) => {
      onChange?.(resolveLocalLlmModelId('mlx-vlm', next, options));
    },
    [onChange, options],
  );

  useEffect(() => {
    if (!onChange || !canonicalValue || canonicalValue === value.trim()) return;
    onChange(canonicalValue);
  }, [canonicalValue, onChange, value]);

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
      setManagedByApp(isMlxVlmServerManagedByApp());
      const baseOptions = buildModelOptions(models, [
        settings.selectedModelId,
        ...status.models,
      ]);
      const resolvedValue = resolveLocalLlmModelId('mlx-vlm', value, baseOptions);
      setOptions(
        buildModelOptions(models, [
          settings.selectedModelId,
          resolvedValue,
          ...status.models,
        ]),
      );
      if (!models.length && !settings.selectedModelId.trim() && !resolvedValue.trim()) {
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

  const runUnloadModel = useCallback(async () => {
    if (!isTauriMacOS()) return;
    setUnloadBusy(true);
    setLoadError('');
    try {
      await stopMlxVlmServer();
      setLoadedModelId('');
      setManagedByApp(false);
      await refreshModels();
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'MLX-VLM 모델을 언로드하지 못했습니다.');
    } finally {
      setUnloadBusy(false);
    }
  }, [refreshModels]);

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
        setManagedByApp(false);
        return;
      }
      const id = String(modelId).trim();
      setLoadedModelId(id);
      setManagedByApp(isMlxVlmServerManagedByApp());
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
    const id = canonicalValue.trim();
    if (!id) return;
    if (!options.some((option) => option.id === id)) return;
    void loadModelIfAuto(id);
  }, [autoLoadModelOnSelect, listLoading, modelLoading, loadModelIfAuto, options, canonicalValue]);

  const handlePick = useCallback(
    (nextId: string) => {
      const resolved = resolveLocalLlmModelId('mlx-vlm', nextId, options);
      loadModelIfAuto(resolved);
    },
    [loadModelIfAuto, options],
  );

  const handleInputBlur = useCallback(() => {
    loadModelIfAuto(canonicalValue);
  }, [canonicalValue, loadModelIfAuto]);

  const handleUnloadConfirm = useCallback(() => {
    setUnloadConfirmOpen(false);
    void runUnloadModel();
  }, [runUnloadModel]);

  if (!isTauriMacOS()) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-odp-muted">
        MLX-VLM은 Tauri macOS 빌드에서만 사용할 수 있습니다.
      </p>
    );
  }

  const busy = listLoading || modelLoading || unloadBusy;
  const trimmedValue = canonicalValue.trim();
  const runtimeLoadedId = loadedModelId.trim();
  const selectionMatchesRuntime = Boolean(
    trimmedValue && runtimeLoadedId && trimmedValue === runtimeLoadedId,
  );
  const hasRuntimeMismatch = Boolean(
    runtimeLoadedId && trimmedValue && runtimeLoadedId !== trimmedValue,
  );
  const showsLoadedStatus = Boolean(runtimeLoadedId && (selectionMatchesRuntime || hasRuntimeMismatch));
  const canUnload = Boolean(runtimeLoadedId && managedByApp);
  const loadedReady = selectionMatchesRuntime && canUnload;

  const handleActionClick = () => {
    if (loadedReady) {
      setUnloadConfirmOpen(true);
      return;
    }
    void runLoadModel(trimmedValue);
  };

  const actionButtonDisabled = unloadBusy || (!loadedReady && !trimmedValue);
  const actionAriaLabel = loadedReady ? 'Unload MLX model' : 'Load MLX model';

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <ModelIdInputDropdown
          value={canonicalValue}
          options={options}
          loading={listLoading}
          maxItems={200}
          aliasScope="mlx-vlm"
          onChange={handleModelChange}
          onPick={handlePick}
          onInputBlur={handleInputBlur}
          placeholder="MLX model id"
          className="min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={handleActionClick}
          disabled={actionButtonDisabled}
          aria-label={actionAriaLabel}
          className={[
            'group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            loadedReady
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted'
              : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60',
          ].join(' ')}
        >
          {unloadBusy ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden />
              언로드 중…
            </>
          ) : modelLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden />
              로드 중…
            </>
          ) : loadedReady ? (
            <>
              <span className="inline-flex items-center gap-1 group-hover:hidden">
                <Check size={14} aria-hidden />
                로드됨
              </span>
              <span className="hidden items-center gap-1 group-hover:inline-flex">
                <Square size={14} aria-hidden />
                언로드
              </span>
            </>
          ) : (
            <>
              <Play size={14} aria-hidden />
              로드
            </>
          )}
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
            로드됨 · {localLlmModelDisplayName('mlx-vlm', runtimeLoadedId)}
          </p>
          {hasRuntimeMismatch ? (
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              선택한 모델과 다릅니다. 로드 버튼으로 전환하세요.
            </p>
          ) : null}
        </div>
      ) : runtimeLoadedId && !managedByApp ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          외부 MLX-VLM 워커가 실행 중입니다. 앱에서 시작한 모델만 언로드할 수 있습니다.
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          모델을 선택한 뒤 로드 버튼을 눌러 메모리에 올리세요.
        </p>
      )}

      <ConfirmModal
        isOpen={unloadConfirmOpen}
        title="MLX-VLM 모델 언로드"
        message="로컬 MLX-VLM 워커에서 모델을 메모리에서 내릴까요?"
        confirmLabel="언로드"
        cancelLabel="취소"
        variant="danger"
        onConfirm={handleUnloadConfirm}
        onCancel={() => setUnloadConfirmOpen(false)}
      />
    </div>
  );
}
