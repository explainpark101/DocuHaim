import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import MlxLmCollapsibleSection from '@/components/settings/MlxLmCollapsibleSection';
import MlxLmDownloadProgress from '@/components/settings/MlxLmDownloadProgress';
import MlxLmInstalledModelsSection from '@/components/settings/MlxLmInstalledModelsSection';
import MlxLmModelPasteSection from '@/components/settings/MlxLmModelPasteSection';
import MlxLmModelSearchSection from '@/components/settings/MlxLmModelSearchSection';
import {
  buildMlxLmDownloadConfirmMessage,
  buildMlxLmRedownloadConfirmMessage,
  buildMlxLmDeleteConfirmMessage,
  fetchHuggingFaceModelInfo,
  parseHuggingFaceModelUrl,
  resolveMlxLmDownloadMode,
  searchAndEnrichHuggingFaceMlxModels,
  type HfModelSearchHit,
  type MlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import {
  formatMlxLmDownloadProgressLabel,
  mergeMlxLmDownloadProgressChunk,
  normalizeMlxLmDownloadOutputChunk,
  type MlxLmDownloadProgressSnapshot,
} from '@/utils/mlxLmDownloadProgress';
import { formatMemoryBudgetLabel, getMlxAvailableMemoryBudgetBytes } from '@/utils/llm/mlxLmSystemMemory';
import {
  MLX_LM_SETTINGS_CHANGED_EVENT,
  loadMlxLmSettings,
  saveMlxLmSettings,
  setSelectedMlxLmModelId,
  isMlxLmRepoInstalled,
  type MlxLmInstalledModel,
  type MlxLmSettings,
} from '@/utils/mlxLmSettingsStore';
import { downloadMlxLmModel, deleteMlxLmModel, isMlxLmModelInUse, listInstalledMlxLmModels, rememberMlxLmDownloadTarget } from '@/utils/mlxLmShell';

type PendingDownload = {
  repoId: string;
  mode: MlxLmDownloadMode;
  hit?: HfModelSearchHit | null;
  redownload?: boolean;
};

type MlxLmModelBrowserProps = {
  settings: MlxLmSettings;
  onSettingsChange: (next: MlxLmSettings) => void;
  cliAvailable: boolean;
  serverRunning?: boolean;
  serverLoadedModels?: string[];
  disabled?: boolean;
};

export default function MlxLmModelBrowser({
  settings,
  onSettingsChange,
  cliAvailable,
  serverRunning = false,
  serverLoadedModels = [],
  disabled = false,
}: MlxLmModelBrowserProps) {
  const [installed, setInstalled] = useState<MlxLmInstalledModel[]>(settings.installedModels);
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
    progress: MlxLmDownloadProgressSnapshot | null;
    message: string;
  } | null>(null);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MlxLmInstalledModel | null>(null);
  const [memoryBudgetLabel, setMemoryBudgetLabel] = useState('RAM 정보 불러오는 중…');
  const [pastePreview, setPastePreview] = useState<HfModelSearchHit | null>(null);
  const [pastePreviewBusy, setPastePreviewBusy] = useState(false);
  const [installedOpen, setInstalledOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);

  const refreshInstalled = useCallback(async () => {
    setScanBusy(true);
    try {
      const list = await listInstalledMlxLmModels(settings);
      setInstalled(list);
    } finally {
      setScanBusy(false);
    }
  }, [settings]);

  useEffect(() => {
    void getMlxAvailableMemoryBudgetBytes().then((bytes) => {
      setMemoryBudgetLabel(formatMemoryBudgetLabel(bytes));
    });
  }, []);

  useEffect(() => {
    const onChanged = () => {
      const next = loadMlxLmSettings();
      onSettingsChange(next);
      void refreshInstalled();
    };
    window.addEventListener(MLX_LM_SETTINGS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(MLX_LM_SETTINGS_CHANGED_EVENT, onChanged);
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
    const out: MlxLmInstalledModel[] = [];
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
    rememberMlxLmDownloadTarget(repoId);
    const mode = resolveMlxLmDownloadMode(repoId, hit ?? null);
    const redownload = isMlxLmRepoInstalled(repoId, installedOptions);
    setPendingDownload({ repoId, mode, hit: hit ?? null, redownload });
  };

  const handlePasteDownload = () => {
    setPasteError('');
    const repoId = parseHuggingFaceModelUrl(pasteInput);
    if (!repoId) {
      setPasteError('Hugging Face model URL or org/model id is invalid.');
      return;
    }
    requestDownload(repoId, pastePreview);
  };

  const confirmDownload = async () => {
    if (!pendingDownload) return;
    const { repoId, mode, hit } = pendingDownload;
    setPendingDownload(null);
    setDownloadBusy(true);
    const seedTotal = hit?.diskBytes;
    const seedProgress =
      seedTotal && seedTotal > 0
        ? {
            currentBytes: 0,
            totalBytes: seedTotal,
            percent: 0,
            label: formatMlxLmDownloadProgressLabel({
              currentBytes: 0,
              totalBytes: seedTotal,
              percent: 0,
            }),
          }
        : null;
    setActiveDownload({
      repoId,
      progress: seedProgress,
      message: mode === 'convert' ? 'Converting model…' : 'Starting download…',
    });
    try {
      const next = await downloadMlxLmModel(repoId, {
        mode,
        ...(hit ? { hit } : {}),
        onOutput: (line) => {
          const normalized = normalizeMlxLmDownloadOutputChunk(line);
          setActiveDownload((prev) => {
            if (!prev || prev.repoId !== repoId) return prev;
            const progress = mergeMlxLmDownloadProgressChunk(line, prev.progress);
            return {
              repoId,
              progress,
              message: normalized || prev.message,
            };
          });
        },
      });
      onSettingsChange(next);
      setPasteInput('');
      await refreshInstalled();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      setDownloadBusy(false);
      setActiveDownload(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const model = pendingDelete;
    setPendingDelete(null);
    setDeleteBusy(true);
    try {
      const next = await deleteMlxLmModel(model.id, {
        settings,
        serverStatus: { running: serverRunning, models: serverLoadedModels },
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
    () => ({ running: serverRunning, models: serverLoadedModels }),
    [serverRunning, serverLoadedModels],
  );

  const isModelInUse = useCallback(
    (modelId: string) => isMlxLmModelInUse(modelId, settings, serverStatus),
    [settings, serverStatus],
  );

  const isModelDownloaded = useCallback(
    (repoId: string) => isMlxLmRepoInstalled(repoId, installedOptions),
    [installedOptions],
  );

  const confirmCopy = pendingDownload
    ? pendingDownload.redownload
      ? buildMlxLmRedownloadConfirmMessage(
          pendingDownload.repoId,
          pendingDownload.mode,
          pendingDownload.hit,
        )
      : buildMlxLmDownloadConfirmMessage(
          pendingDownload.repoId,
          pendingDownload.mode,
          pendingDownload.hit,
        )
    : null;

  const deleteCopy = pendingDelete ? buildMlxLmDeleteConfirmMessage(pendingDelete.id) : null;

  return (
    <div className="space-y-2">
      <MlxLmCollapsibleSection
        title="설치된 모델"
        subtitle={`${installedOptions.length}개 · 서버에 로드할 모델 선택`}
        open={installedOpen}
        onOpenChange={setInstalledOpen}
      >
        <MlxLmInstalledModelsSection
          models={installedOptions}
          selectedId={selectedId}
          disabled={disabled}
          deleteBusy={deleteBusy}
          scanBusy={scanBusy}
          isModelInUse={isModelInUse}
          onRefresh={() => void refreshInstalled()}
          onSelect={(value) => {
            const next = setSelectedMlxLmModelId(settings, value);
            saveMlxLmSettings(next);
            onSettingsChange(next);
          }}
          onRequestDelete={setPendingDelete}
        />
      </MlxLmCollapsibleSection>

      <MlxLmCollapsibleSection
        title="Hugging Face 검색 (MLX)"
        subtitle="모델 용량 · 예상 RAM · 실행 가능성"
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <MlxLmModelSearchSection
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
          downloadProgressLabel={activeDownload?.progress?.label ?? ''}
          isModelDownloaded={isModelDownloaded}
          onDownload={(hit) => requestDownload(hit.id, hit)}
        />
      </MlxLmCollapsibleSection>

      <MlxLmCollapsibleSection
        title="URL / repo id 붙여넣기"
        subtitle="Hugging Face 링크 또는 org/model"
        open={pasteOpen}
        onOpenChange={setPasteOpen}
      >
        <MlxLmModelPasteSection
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
          downloadProgressLabel={activeDownload?.progress?.label ?? ''}
          isDownloaded={isModelDownloaded(parseHuggingFaceModelUrl(pasteInput) ?? '')}
          onDownload={handlePasteDownload}
        />
      </MlxLmCollapsibleSection>

      {downloadBusy && activeDownload ? (
        <MlxLmDownloadProgress
          repoId={activeDownload.repoId}
          progress={activeDownload.progress}
          message={activeDownload.message}
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
