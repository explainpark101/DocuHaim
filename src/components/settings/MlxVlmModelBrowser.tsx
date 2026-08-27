import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import MlxVlmCollapsibleSection from '@/components/settings/MlxVlmCollapsibleSection';
import MlxVlmDownloadLogPanel from '@/components/settings/MlxVlmDownloadLogPanel';
import MlxVlmInstalledModelsSection from '@/components/settings/MlxVlmInstalledModelsSection';
import MlxVlmModelPasteSection from '@/components/settings/MlxVlmModelPasteSection';
import MlxVlmModelSearchSection from '@/components/settings/MlxVlmModelSearchSection';
import {
  buildMlxVlmDownloadAbortConfirmMessage,
  buildMlxVlmDownloadConfirmMessage,
  buildMlxVlmRedownloadConfirmMessage,
  buildMlxVlmDeleteConfirmMessage,
  fetchHuggingFaceModelInfo,
  parseHuggingFaceModelUrl,
  resolveHuggingFaceModelDiskBytes,
  resolveMlxVlmDownloadMode,
  searchAndEnrichHuggingFaceMlxModels,
  type HfModelSearchHit,
  type MlxVlmDownloadMode,
} from '@/utils/mlxVlmHuggingFace';
import {
  buildMlxVlmDownloadProgressFromBytes,
  type MlxVlmDownloadProgressSnapshot,
} from '@/utils/mlxVlmDownloadProgress';
import { formatMemoryBudgetLabel, getMlxAvailableMemoryBudgetBytes } from '@/utils/llm/mlxVlmSystemMemory';
import {
  MLX_VLM_SETTINGS_CHANGED_EVENT,
  loadMlxVlmSettings,
  saveMlxVlmSettings,
  setSelectedMlxVlmModelId,
  isMlxVlmRepoInstalled,
  type MlxVlmInstalledModel,
  type MlxVlmSettings,
} from '@/utils/mlxVlmSettingsStore';
import {
  buildMlxVlmRedownloadPasteInput,
  MLX_VLM_REDOWNLOAD_FOCUS_EVENT,
  type MlxVlmRedownloadFocusDetail,
} from '@/utils/llm/mlxVlmLoadErrorHelp';
import {
  abortMlxVlmDownload,
  deleteMlxVlmModel,
  downloadMlxVlmModel,
  isMlxVlmDownloadAbortedError,
  isMlxVlmModelInUse,
  refreshInstalledMlxVlmModels,
  rememberMlxVlmDownloadTarget,
  measureInstalledMlxVlmModelsCacheBytes,
} from '@/utils/llm/mlxVlmShell';

type PendingAbort = {
  repoId: string;
  mode: MlxVlmDownloadMode;
};

type PendingDownload = {
  repoId: string;
  mode: MlxVlmDownloadMode;
  hit?: HfModelSearchHit | null;
  redownload?: boolean;
};

type MlxVlmModelBrowserProps = {
  settings: MlxVlmSettings;
  onSettingsChange: (next: MlxVlmSettings) => void;
  cliAvailable: boolean;
  serverRunning?: boolean;
  serverLoadedModels?: string[];
  disabled?: boolean;
};

export default function MlxVlmModelBrowser({
  settings,
  onSettingsChange,
  cliAvailable,
  serverRunning = false,
  serverLoadedModels = [],
  disabled = false,
}: MlxVlmModelBrowserProps) {
  const [installed, setInstalled] = useState<MlxVlmInstalledModel[]>(settings.installedModels);
  const [scanBusy, setScanBusy] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HfModelSearchHit[]>([]);
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const [pasteError, setPasteError] = useState('');
  const [downloadBusy, setDownloadBusy] = useState(false);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [activeDownload, setActiveDownload] = useState<{
    repoId: string;
    mode: MlxVlmDownloadMode;
    progress: MlxVlmDownloadProgressSnapshot | null;
  } | null>(null);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
  const [pendingAbort, setPendingAbort] = useState<PendingAbort | null>(null);
  const [abortingRepoId, setAbortingRepoId] = useState('');
  const abortingRepoIdRef = useRef('');
  const [pendingDelete, setPendingDelete] = useState<MlxVlmInstalledModel | null>(null);
  const [memoryBudgetLabel, setMemoryBudgetLabel] = useState('RAM 정보 불러오는 중…');
  const [pastePreview, setPastePreview] = useState<HfModelSearchHit | null>(null);
  const [pastePreviewBusy, setPastePreviewBusy] = useState(false);
  const [installedOpen, setInstalledOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [downloadLogOpen, setDownloadLogOpen] = useState(true);
  const [modelCacheBytes, setModelCacheBytes] = useState<Record<string, number>>({});

  const refreshInstalled = useCallback(async () => {
    setScanBusy(true);
    try {
      const { settings: next, models } = await refreshInstalledMlxVlmModels();
      onSettingsChange(next);
      setInstalled(models);
      const cacheBytes = await measureInstalledMlxVlmModelsCacheBytes(models);
      setModelCacheBytes(cacheBytes);
    } finally {
      setScanBusy(false);
    }
  }, [onSettingsChange]);

  useEffect(() => {
    const onRedownloadFocus = (event: Event) => {
      const modelId = (event as CustomEvent<MlxVlmRedownloadFocusDetail>).detail?.modelId?.trim();
      setInstalledOpen(true);
      setSearchOpen(false);
      setPasteOpen(true);
      setDownloadLogOpen(true);
      if (!modelId) return;
      setPasteInput(buildMlxVlmRedownloadPasteInput(modelId));
      setPasteError('');
    };
    window.addEventListener(MLX_VLM_REDOWNLOAD_FOCUS_EVENT, onRedownloadFocus);
    return () => window.removeEventListener(MLX_VLM_REDOWNLOAD_FOCUS_EVENT, onRedownloadFocus);
  }, []);

  useEffect(() => {
    void getMlxAvailableMemoryBudgetBytes().then((bytes) => {
      setMemoryBudgetLabel(formatMemoryBudgetLabel(bytes));
    });
  }, []);

  useEffect(() => {
    const onChanged = () => {
      const next = loadMlxVlmSettings();
      onSettingsChange(next);
      void refreshInstalled();
    };
    window.addEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onChanged);
  }, [onSettingsChange, refreshInstalled]);

  useEffect(() => {
    void refreshInstalled();
  }, [refreshInstalled]);

  const searchAbortRef = useRef<AbortController | null>(null);
  const pasteAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setSearchError('');
      return undefined;
    }

    const timer = window.setTimeout(() => {
      searchAbortRef.current?.abort();
      const controller = new AbortController();
      searchAbortRef.current = controller;
      setSearchBusy(true);
      setSearchError('');
      void searchAndEnrichHuggingFaceMlxModels(q, { signal: controller.signal })
        .then((hits) => {
          if (controller.signal.aborted) return;
          setSearchResults(hits);
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          setSearchError(err instanceof Error ? err.message : 'Search failed.');
          setSearchResults([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setSearchBusy(false);
        });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const repoId = parseHuggingFaceModelUrl(pasteInput);
    if (!repoId) {
      setPastePreview(null);
      setPastePreviewBusy(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      pasteAbortRef.current?.abort();
      const controller = new AbortController();
      pasteAbortRef.current = controller;
      setPastePreviewBusy(true);
      void fetchHuggingFaceModelInfo(repoId, controller.signal)
        .then((hit) => {
          if (controller.signal.aborted) return;
          setPastePreview(hit);
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setPastePreview(null);
        })
        .finally(() => {
          if (!controller.signal.aborted) setPastePreviewBusy(false);
        });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [pasteInput]);

  const selectedId = settings.selectedModelId;

  const installedOptions = useMemo(() => {
    const seen = new Set<string>();
    const out: MlxVlmInstalledModel[] = [];
    for (const model of installed) {
      if (seen.has(model.id)) continue;
      seen.add(model.id);
      out.push(model);
    }
    if (selectedId && !seen.has(selectedId)) {
      out.unshift({
        id: selectedId,
        ...(selectedId.includes('/') ? { repoId: selectedId } : {}),
        source: 'huggingface',
        installedAt: Date.now(),
      });
    }
    return out;
  }, [installed, selectedId]);

  const requestDownload = (repoId: string, hit?: HfModelSearchHit | null) => {
    rememberMlxVlmDownloadTarget(repoId);
    const mode = resolveMlxVlmDownloadMode(repoId, hit ?? null);
    const redownload = isMlxVlmRepoInstalled(repoId, installedOptions);
    setPendingDownload({ repoId, mode, hit: hit ?? null, redownload });
  };

  const requestAbort = (repoId: string, mode: MlxVlmDownloadMode) => {
    setPendingAbort({ repoId, mode });
  };

  const handleSearchDownload = (hit: HfModelSearchHit) => {
    if (abortingRepoId) return;
    if (downloadBusy && activeDownload?.repoId === hit.id) {
      requestAbort(hit.id, activeDownload.mode);
      return;
    }
    requestDownload(hit.id, hit);
  };

  const handlePasteDownload = () => {
    if (abortingRepoId) return;
    setPasteError('');
    const repoId = parseHuggingFaceModelUrl(pasteInput);
    if (!repoId) {
      setPasteError('Hugging Face model URL or org/model id is invalid.');
      return;
    }
    if (downloadBusy && activeDownload?.repoId === repoId) {
      requestAbort(repoId, activeDownload.mode);
      return;
    }
    requestDownload(repoId, pastePreview);
  };

  const confirmDownload = async () => {
    if (!pendingDownload) return;
    const { repoId, mode, hit } = pendingDownload;
    setPendingDownload(null);
    setDownloadBusy(true);
    setDownloadLogOpen(true);
    let seedTotal = hit?.diskBytes ?? 0;
    if (seedTotal <= 0) {
      seedTotal = await resolveHuggingFaceModelDiskBytes(repoId, { ...(hit ? { hit } : {}) });
    }
    const seedProgress =
      seedTotal > 0
        ? buildMlxVlmDownloadProgressFromBytes(0, seedTotal)
        : null;
    setActiveDownload({
      repoId,
      mode,
      progress: seedProgress,
    });
    try {
      const next = await downloadMlxVlmModel(repoId, {
        mode,
        ...(hit ? { hit } : {}),
        ...(seedTotal > 0 ? { expectedTotalBytes: seedTotal } : {}),
        onProgress: (progress) => {
          if (abortingRepoIdRef.current === repoId) return;
          setActiveDownload((prev) => {
            if (!prev || prev.repoId !== repoId) return prev;
            return {
              ...prev,
              progress,
            };
          });
        },
      });
      onSettingsChange(next);
      setPasteInput('');
      await refreshInstalled();
    } catch (err) {
      if (isMlxVlmDownloadAbortedError(err)) {
        await refreshInstalled();
        return;
      }
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      abortingRepoIdRef.current = '';
      setAbortingRepoId('');
      setDownloadBusy(false);
      setActiveDownload(null);
    }
  };

  const confirmAbort = async () => {
    if (!pendingAbort) return;
    const { repoId } = pendingAbort;
    setPendingAbort(null);
    abortingRepoIdRef.current = repoId;
    setAbortingRepoId(repoId);
    try {
      await abortMlxVlmDownload(repoId);
    } catch (err) {
      abortingRepoIdRef.current = '';
      setAbortingRepoId('');
      alert(err instanceof Error ? err.message : 'Failed to abort download.');
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const model = pendingDelete;
    setPendingDelete(null);
    setDeleteBusy(true);
    try {
      const next = await deleteMlxVlmModel(model.repoId || model.id, {
        serverStatus: {
          running: serverRunning,
          loaded: serverRunning,
          models: serverLoadedModels,
        },
      });
      onSettingsChange(next);
      await refreshInstalled();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed.');
    } finally {
      setDeleteBusy(false);
    }
  };

  const serverStatus = useMemo(
    () => ({
      running: serverRunning,
      loaded: serverRunning,
      models: serverLoadedModels,
    }),
    [serverRunning, serverLoadedModels],
  );

  const isModelInUse = useCallback(
    (modelId: string) => isMlxVlmModelInUse(modelId, settings, serverStatus),
    [settings, serverStatus],
  );

  const isModelDownloaded = useCallback(
    (repoId: string) => isMlxVlmRepoInstalled(repoId, installedOptions),
    [installedOptions],
  );

  const confirmCopy = pendingDownload
    ? pendingDownload.redownload
      ? buildMlxVlmRedownloadConfirmMessage(
          pendingDownload.repoId,
          pendingDownload.mode,
          pendingDownload.hit,
        )
      : buildMlxVlmDownloadConfirmMessage(
          pendingDownload.repoId,
          pendingDownload.mode,
          pendingDownload.hit,
        )
    : null;

  const deleteCopy = pendingDelete ? buildMlxVlmDeleteConfirmMessage(pendingDelete.id) : null;
  const abortCopy = pendingAbort
    ? buildMlxVlmDownloadAbortConfirmMessage(pendingAbort.repoId, pendingAbort.mode)
    : null;
  const pasteRepoId = parseHuggingFaceModelUrl(pasteInput) ?? '';
  const isPasteDownloading = Boolean(
    downloadBusy && activeDownload?.repoId && pasteRepoId && activeDownload.repoId === pasteRepoId,
  );
  const isPasteAborting = Boolean(abortingRepoId && pasteRepoId && abortingRepoId === pasteRepoId);

  return (
    <div className="space-y-2">
      <MlxVlmCollapsibleSection
        title="설치된 모델"
        subtitle={`${installedOptions.length}개 · 서버에 로드할 모델 선택`}
        open={installedOpen}
        onOpenChange={setInstalledOpen}
      >
        <MlxVlmInstalledModelsSection
          models={installedOptions}
          selectedId={selectedId}
          cacheBytesByModelId={modelCacheBytes}
          disabled={disabled}
          deleteBusy={deleteBusy}
          scanBusy={scanBusy}
          isModelInUse={isModelInUse}
          onRefresh={() => void refreshInstalled()}
          onSelect={(value) => {
            const next = setSelectedMlxVlmModelId(settings, value);
            saveMlxVlmSettings(next);
            onSettingsChange(next);
          }}
          onRequestDelete={setPendingDelete}
        />
      </MlxVlmCollapsibleSection>

      <MlxVlmCollapsibleSection
        title="Hugging Face 검색 (MLX)"
        subtitle="모델 용량 · 예상 RAM · 실행 가능성"
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <MlxVlmModelSearchSection
          query={searchQuery}
          onQueryChange={setSearchQuery}
          memoryBudgetLabel={memoryBudgetLabel}
          results={searchResults}
          searchBusy={searchBusy}
          searchError={searchError}
          disabled={disabled}
          cliAvailable={cliAvailable}
          downloadBusy={downloadBusy}
          downloadingRepoId={activeDownload?.repoId ?? ''}
          abortingRepoId={abortingRepoId}
          downloadProgressLabel={activeDownload?.progress?.label ?? ''}
          isModelDownloaded={isModelDownloaded}
          onDownload={handleSearchDownload}
        />
      </MlxVlmCollapsibleSection>

      <MlxVlmCollapsibleSection
        title="URL / repo id 붙여넣기"
        subtitle="Hugging Face 링크 또는 org/model"
        open={pasteOpen}
        onOpenChange={setPasteOpen}
      >
        <MlxVlmModelPasteSection
          value={pasteInput}
          onChange={(value) => {
            setPasteInput(value);
            setPasteError('');
          }}
          error={pasteError}
          preview={pastePreview}
          previewBusy={pastePreviewBusy}
          disabled={disabled}
          cliAvailable={cliAvailable}
          downloadBusy={downloadBusy}
          isActiveDownload={isPasteDownloading}
          isAborting={isPasteAborting}
          downloadProgressLabel={
            isPasteDownloading ? (activeDownload?.progress?.label ?? '') : ''
          }
          isDownloaded={isModelDownloaded(pasteRepoId)}
          onDownload={handlePasteDownload}
        />
      </MlxVlmCollapsibleSection>

      {downloadBusy && activeDownload ? (
        <MlxVlmDownloadLogPanel
          repoId={activeDownload.repoId}
          progress={activeDownload.progress}
          aborting={abortingRepoId === activeDownload.repoId}
          open={downloadLogOpen}
          onOpenChange={setDownloadLogOpen}
        />
      ) : null}

      <ConfirmModal
        isOpen={Boolean(pendingDownload)}
        title={confirmCopy?.title || 'Download model'}
        message={confirmCopy?.message || ''}
        confirmLabel={
          pendingDownload?.redownload
            ? pendingDownload.mode === 'convert'
              ? 'Re-convert'
              : 'Redownload'
            : pendingDownload?.mode === 'convert'
              ? 'Convert'
              : 'Download'
        }
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setPendingDownload(null)}
      />

      <ConfirmModal
        isOpen={Boolean(pendingAbort)}
        title={abortCopy?.title || 'Abort download'}
        message={abortCopy?.message || ''}
        confirmLabel="Abort"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => void confirmAbort()}
        onCancel={() => setPendingAbort(null)}
      />

      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title={deleteCopy?.title || 'Delete model'}
        message={deleteCopy?.message || ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
