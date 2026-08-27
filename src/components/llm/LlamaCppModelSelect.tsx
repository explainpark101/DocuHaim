import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Loader2, Play, RefreshCw, Square } from 'lucide-react';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';
import LlamaCppLoadFailureHint from '@/components/llm/LlamaCppLoadFailureHint';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  LLAMA_CPP_SETTINGS_CHANGED_EVENT,
  loadLlamaCppSettings,
  resolveLlamaCppModelPath,
  saveLlamaCppSettings,
  setSelectedLlamaCppModelId,
  type LlamaCppInstalledModel,
} from '@/utils/llm/llamaCppSettingsStore';
import { requestLlamaCppProviderSync } from '@/utils/llm/llamaCppProviderAutoSync';
import {
  LLAMA_CPP_RUNTIME_CHANGED_EVENT,
  type LlamaCppRuntimeChangedDetail,
} from '@/utils/llm/llamaCppLoadNotifications';
import { resolveLlamaCppLoadFailure } from '@/utils/llm/llamaCppLoadErrorHelp';
import {
  getLlamaCppServerStatus,
  isLlamaCppServerManagedByApp,
  probeLlamaCppCli,
  startLlamaCppServer,
  stopLlamaCppServer,
} from '@/utils/llm/llamaCppShell';
import {
  LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT,
  localLlmModelDisplayName,
  withLocalLlmModelAliases,
} from '@/utils/llm/localLlmModelAliases';

type LlamaCppModelSelectProps = {
  value: string;
  onChange?: (nextId: string) => void;
  /** Refresh installed model list on mount. */
  autoLoad?: boolean;
  className?: string;
};

function buildModelOptions(
  models: readonly LlamaCppInstalledModel[],
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
    'llama-cpp',
    [...ids]
      .sort((a, b) => a.localeCompare(b))
      .map((id) => ({ id, displayName: id })),
  );
}

function resolveLoadedModelId(
  modelPath: string,
  settings = loadLlamaCppSettings(),
): string {
  const path = String(modelPath || '').trim();
  if (!path) return '';

  const byPath = settings.installedModels.find((model) => model.localPath === path);
  if (byPath) return byPath.repoId || byPath.id;

  const byId = settings.installedModels.find(
    (model) => model.id === path || model.repoId === path,
  );
  if (byId) return byId.repoId || byId.id;

  return path;
}

export default function LlamaCppModelSelect({
  value,
  onChange,
  autoLoad = true,
  className = '',
}: LlamaCppModelSelectProps) {
  const [options, setOptions] = useState<ModelIdOption[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [unloadBusy, setUnloadBusy] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [loadedModelPath, setLoadedModelPath] = useState('');
  const [serverRunning, setServerRunning] = useState(false);
  const [managedByApp, setManagedByApp] = useState(false);
  const [unloadConfirmOpen, setUnloadConfirmOpen] = useState(false);
  const loadRequestRef = useRef(0);

  const refreshModels = useCallback(async () => {
    if (!isTauriDesktopPlatform()) return;
    setListLoading(true);
    setError('');
    try {
      const settings = loadLlamaCppSettings();
      const status = await getLlamaCppServerStatus(settings);
      const runtimePath = status.models[0] || '';
      setLoadedModelPath(runtimePath);
      setServerRunning(status.serverRunning || status.loaded);
      setManagedByApp(isLlamaCppServerManagedByApp());
      setOptions(
        buildModelOptions(settings.installedModels, [
          settings.selectedModelId,
          value,
          resolveLoadedModelId(runtimePath, settings),
        ]),
      );
      if (!settings.installedModels.length && !settings.selectedModelId.trim() && !value.trim()) {
        setError('설치된 llama.cpp 모델이 없습니다. 설정 > llama.cpp에서 모델을 추가하세요.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'llama.cpp 모델 목록을 불러오지 못했습니다.');
    } finally {
      setListLoading(false);
    }
  }, [value]);

  const runLoadModel = useCallback(
    async (modelId: string) => {
      if (!isTauriDesktopPlatform()) return;
      const id = String(modelId || '').trim();
      if (!id) return;

      const settings = loadLlamaCppSettings();
      const nextSettings = setSelectedLlamaCppModelId(settings, id);
      saveLlamaCppSettings(nextSettings);
      const modelPath = resolveLlamaCppModelPath(nextSettings);
      if (!modelPath) {
        setLoadError('선택한 모델의 GGUF 경로를 찾을 수 없습니다.');
        return;
      }

      const status = await getLlamaCppServerStatus(nextSettings);
      if (status.loaded && status.models[0] === modelPath) {
        setLoadedModelPath(modelPath);
        setServerRunning(true);
        setLoadError('');
        onChange?.(id);
        return;
      }

      const requestId = loadRequestRef.current + 1;
      loadRequestRef.current = requestId;
      setModelLoading(true);
      setLoadError('');
      try {
        const cli = await probeLlamaCppCli(nextSettings);
        if (!cli.available) {
          throw new Error(cli.detail || 'llama-server를 실행할 수 없습니다. 설정에서 바이너리 경로를 확인하세요.');
        }
        await startLlamaCppServer(nextSettings);
        if (loadRequestRef.current !== requestId) return;
        const after = await getLlamaCppServerStatus(nextSettings);
        setLoadedModelPath(after.models[0] || modelPath);
        setServerRunning(after.serverRunning || after.loaded);
        setManagedByApp(isLlamaCppServerManagedByApp());
        onChange?.(id);
        requestLlamaCppProviderSync();
        await refreshModels();
      } catch (err) {
        if (loadRequestRef.current !== requestId) return;
        setLoadError(resolveLlamaCppLoadFailure(err).message);
      } finally {
        if (loadRequestRef.current === requestId) {
          setModelLoading(false);
        }
      }
    },
    [onChange, refreshModels],
  );

  const runUnloadModel = useCallback(async () => {
    if (!isTauriDesktopPlatform()) return;
    setUnloadBusy(true);
    setLoadError('');
    try {
      await stopLlamaCppServer();
      setLoadedModelPath('');
      setServerRunning(false);
      setManagedByApp(false);
      await refreshModels();
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'llama.cpp 서버를 중지하지 못했습니다.');
    } finally {
      setUnloadBusy(false);
    }
  }, [refreshModels]);

  useEffect(() => {
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels]);

  useEffect(() => {
    const onChanged = () => void refreshModels();
    window.addEventListener(LLAMA_CPP_SETTINGS_CHANGED_EVENT, onChanged);
    window.addEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    return () => {
      window.removeEventListener(LLAMA_CPP_SETTINGS_CHANGED_EVENT, onChanged);
      window.removeEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    };
  }, [refreshModels]);

  useEffect(() => {
    const onRuntimeChanged = (event: Event) => {
      const detail = (event as CustomEvent<LlamaCppRuntimeChangedDetail>).detail;
      const modelPath = detail?.modelPath;
      if (modelPath == null) {
        setLoadedModelPath('');
        setServerRunning(false);
        setManagedByApp(false);
        return;
      }
      const path = String(modelPath).trim();
      setLoadedModelPath(path);
      setServerRunning(Boolean(path));
      setManagedByApp(isLlamaCppServerManagedByApp());
      const loadedId = resolveLoadedModelId(path);
      if (!value.trim() && loadedId) {
        onChange?.(loadedId);
      }
    };
    window.addEventListener(LLAMA_CPP_RUNTIME_CHANGED_EVENT, onRuntimeChanged);
    return () => window.removeEventListener(LLAMA_CPP_RUNTIME_CHANGED_EVENT, onRuntimeChanged);
  }, [onChange, value]);

  useEffect(() => {
    const loadedId = resolveLoadedModelId(loadedModelPath);
    if (!loadedId || value.trim()) return;
    onChange?.(loadedId);
  }, [loadedModelPath, onChange, value]);

  const handleUnloadConfirm = useCallback(() => {
    setUnloadConfirmOpen(false);
    void runUnloadModel();
  }, [runUnloadModel]);

  if (!isTauriDesktopPlatform()) {
    return (
      <p className="text-[11px] text-gray-500 dark:text-odp-muted">
        llama.cpp 로컬 서버는 Tauri 데스크톱 빌드에서만 사용할 수 있습니다.
      </p>
    );
  }

  const busy = listLoading || modelLoading || unloadBusy;
  const trimmedValue = value.trim();
  const settings = loadLlamaCppSettings();
  const selectedPath = trimmedValue
    ? resolveLlamaCppModelPath(setSelectedLlamaCppModelId(settings, trimmedValue))
    : '';
  const runtimeLoadedPath = loadedModelPath.trim();
  const selectionMatchesRuntime = Boolean(
    selectedPath && runtimeLoadedPath && selectedPath === runtimeLoadedPath && serverRunning,
  );
  const hasRuntimeMismatch = Boolean(
    runtimeLoadedPath && selectedPath && runtimeLoadedPath !== selectedPath && serverRunning,
  );
  const showsLoadedStatus = Boolean(
    runtimeLoadedPath && serverRunning && (selectionMatchesRuntime || hasRuntimeMismatch),
  );
  const canUnload = serverRunning && managedByApp;
  const actionBusy = modelLoading || unloadBusy;
  const loadedReady = selectionMatchesRuntime && canUnload;

  const handleActionClick = () => {
    if (loadedReady) {
      setUnloadConfirmOpen(true);
      return;
    }
    void runLoadModel(value);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <ModelIdInputDropdown
          value={value}
          options={options}
          loading={listLoading}
          maxItems={200}
          {...(onChange ? { onChange } : {})}
          placeholder="llama.cpp model id"
          className="min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={handleActionClick}
          disabled={actionBusy || (!loadedReady && !trimmedValue)}
          aria-label={loadedReady ? 'Unload llama.cpp model' : 'Load llama.cpp model'}
          className={[
            'group inline-flex shrink-0 items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            loadedReady
              ? 'border-sky-300 bg-sky-50 text-sky-800 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:border-odp-borderStrong dark:hover:bg-odp-bgSoft dark:hover:text-odp-muted'
              : 'border-sky-300 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:bg-sky-950/60',
          ].join(' ')}
        >
          {actionBusy ? (
            <>
              <Loader2 size={14} className="animate-spin" aria-hidden />
              {unloadBusy ? '언로드 중…' : '로드 중…'}
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
          aria-label="Refresh llama.cpp models"
          className="inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
        >
          {listLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
        </button>
      </div>
      {error ? <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">{error}</p> : null}
      {loadError ? (
        <LlamaCppLoadFailureHint className="mt-1" error={loadError} modelId={trimmedValue} />
      ) : null}
      {modelLoading ? (
        <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-odp-muted">
          <Loader2 size={12} className="animate-spin" aria-hidden />
          서버 시작 및 모델 로드 중…
        </p>
      ) : showsLoadedStatus ? (
        <div className="mt-1 space-y-0.5">
          <p className="text-[11px] text-sky-700 dark:text-sky-300">
            로드됨 ·{' '}
            {localLlmModelDisplayName(
              'llama-cpp',
              resolveLoadedModelId(runtimeLoadedPath) || runtimeLoadedPath,
            )}
          </p>
          {hasRuntimeMismatch ? (
            <p className="text-[11px] text-amber-700 dark:text-amber-300">
              선택한 모델과 다릅니다. 로드 버튼으로 전환하세요.
            </p>
          ) : null}
        </div>
      ) : serverRunning && !managedByApp ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          외부 llama.cpp 서버가 실행 중입니다. 앱에서 시작한 서버만 언로드할 수 있습니다.
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          모델을 선택한 뒤 로드 버튼으로 서버를 시작하세요.
        </p>
      )}

      <ConfirmModal
        isOpen={unloadConfirmOpen}
        title="llama.cpp 모델 언로드"
        message="앱에서 시작한 llama.cpp 서버를 중지하고 모델을 메모리에서 내릴까요?"
        confirmLabel="언로드"
        cancelLabel="취소"
        variant="danger"
        onConfirm={handleUnloadConfirm}
        onCancel={() => setUnloadConfirmOpen(false)}
      />
    </div>
  );
}
