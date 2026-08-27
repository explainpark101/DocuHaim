import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import MlxLmCollapsibleSection from '@/components/settings/MlxLmCollapsibleSection';
import MlxLmDownloadProgress from '@/components/settings/MlxLmDownloadProgress';
import MlxLmInstalledModelsSection from '@/components/settings/MlxLmInstalledModelsSection';
import MlxLmModelPasteSection from '@/components/settings/MlxLmModelPasteSection';
import MlxLmModelSearchSection from '@/components/settings/MlxLmModelSearchSection';
import {
  buildMlxLmDownloadConfirmMessage,
  fetchHuggingFaceModelInfo,
  parseHuggingFaceModelUrl,
  resolveMlxLmDownloadMode,
  searchAndEnrichHuggingFaceMlxModels,
  type HfModelSearchHit,
  type MlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import { formatMemoryBudgetLabel, getMlxAvailableMemoryBudgetBytes } from '@/utils/llm/mlxLmSystemMemory';
import {
  MLX_LM_SETTINGS_CHANGED_EVENT,
  loadMlxLmSettings,
  saveMlxLmSettings,
  setSelectedMlxLmModelId,
  type MlxLmInstalledModel,
  type MlxLmSettings,
} from '@/utils/mlxLmSettingsStore';
import { downloadMlxLmModel, listInstalledMlxLmModels, rememberMlxLmDownloadTarget } from '@/utils/mlxLmShell';

type PendingDownload = {
  repoId: string;
  mode: MlxLmDownloadMode;
  hit?: HfModelSearchHit | null;
};

type MlxLmModelBrowserProps = {
  settings: MlxLmSettings;
  onSettingsChange: (next: MlxLmSettings) => void;
  cliAvailable: boolean;
  disabled?: boolean;
};

export default function MlxLmModelBrowser({
  settings,
  onSettingsChange,
  cliAvailable,
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
  const [downloadLog, setDownloadLog] = useState('');
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);
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
    setPendingDownload({ repoId, mode, hit: hit ?? null });
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
    setDownloadLog('');
    try {
      const next = await downloadMlxLmModel(repoId, {
        mode,
        ...(hit ? { hit } : {}),
        onOutput: (line) => {
          setDownloadLog((prev) => `${prev}${line}`.slice(-4000));
        },
      });
      onSettingsChange(next);
      setPasteInput('');
      await refreshInstalled();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      setDownloadBusy(false);
    }
  };

  const confirmCopy = pendingDownload
    ? buildMlxLmDownloadConfirmMessage(
        pendingDownload.repoId,
        pendingDownload.mode,
        pendingDownload.hit,
      )
    : null;

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
          scanBusy={scanBusy}
          onRefresh={() => void refreshInstalled()}
          onSelect={(value) => {
            const next = setSelectedMlxLmModelId(settings, value);
            saveMlxLmSettings(next);
            onSettingsChange(next);
          }}
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
          onDownload={handlePasteDownload}
        />
      </MlxLmCollapsibleSection>

      {downloadBusy ? <MlxLmDownloadProgress log={downloadLog} /> : null}

      <ConfirmModal
        isOpen={Boolean(pendingDownload)}
        title={confirmCopy?.title || 'Download model'}
        message={confirmCopy?.message || ''}
        confirmLabel={pendingDownload?.mode === 'convert' ? 'Convert' : 'Download'}
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setPendingDownload(null)}
      />
    </div>
  );
}
