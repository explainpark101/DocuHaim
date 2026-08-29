import { useCallback, useEffect, useState } from 'react';
import { FolderOpen, Search, Trash2 } from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import LlamaCppCollapsibleSection from '@/components/settings/LlamaCppCollapsibleSection';
import LocalLlmModelAliasField from '@/components/settings/LocalLlmModelAliasField';
import MlxVlmDownloadButtonContent from '@/components/settings/MlxVlmDownloadButtonContent';
import { getLocalLlmModelAlias, LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT } from '@/utils/llm/localLlmModelAliases';
import {
  buildLlamaCppDeleteConfirmMessage,
  buildLlamaCppDownloadConfirmMessage,
  formatHfGgufDiskSizeLabel,
  isValidHuggingFaceRepoId,
  parseHuggingFaceModelUrl,
  searchHuggingFaceGgufModels,
  type HfGgufSearchHit,
} from '@/utils/llamaCppHuggingFace';
import { formatByteSize } from '@/utils/llm/mlxVlmModelSizing';
import {
  addInstalledLlamaCppModel,
  isLlamaCppRepoInstalled,
  type LlamaCppInstalledModel,
  type LlamaCppSettings,
} from '@/utils/llamaCppSettingsStore';
import {
  clearLlamaCppDownloadLog,
  subscribeLlamaCppDownloadLog,
  getLlamaCppDownloadLogLines,
} from '@/utils/llm/llamaCppDownloadLog';
import {
  abortLlamaCppDownload,
  downloadLlamaCppModel,
  isLlamaCppDownloadAbortedError,
  measureInstalledLlamaCppModelsBytes,
  rememberLlamaCppDownloadTarget,
  removeInstalledLlamaCppModel,
  setSelectedLlamaCppModelId,
} from '@/utils/llamaCppShell';
import { LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT } from '@/utils/llm/llamaCppLoadErrorHelp';
import type { MlxVlmDownloadProgressSnapshot } from '@/utils/llm/mlxVlmDownloadProgress';
import MlxVlmVirtualLogPanel from '@/components/settings/MlxVlmVirtualLogPanel';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type LlamaCppModelBrowserProps = {
  settings: LlamaCppSettings;
  onSettingsChange: (next: LlamaCppSettings) => void;
  downloadReady: boolean;
  disabled?: boolean;
};

export default function LlamaCppModelBrowser({
  settings,
  onSettingsChange,
  downloadReady,
  disabled = false,
}: LlamaCppModelBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HfGgufSearchHit[]>([]);
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const [downloadBusy, setDownloadBusy] = useState(false);
  const [downloadingRepoId, setDownloadingRepoId] = useState('');
  const [abortingRepoId, setAbortingRepoId] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<MlxVlmDownloadProgressSnapshot | null>(
    null,
  );
  const [pendingDownload, setPendingDownload] = useState<HfGgufSearchHit | { id: string } | null>(
    null,
  );
  const [pendingAbortRepoId, setPendingAbortRepoId] = useState('');
  const [pendingDelete, setPendingDelete] = useState<LlamaCppInstalledModel | null>(null);
  const [localPathInput, setLocalPathInput] = useState('');
  const [installedOpen, setInstalledOpen] = useState(true);
  const [localOpen, setLocalOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [downloadLogOpen, setDownloadLogOpen] = useState(false);
  const [downloadLogLines, setDownloadLogLines] = useState(() => getLlamaCppDownloadLogLines());
  const [aliasTick, setAliasTick] = useState(0);
  const [modelBytesById, setModelBytesById] = useState<Record<string, number>>({});
  const [modelBytesLoading, setModelBytesLoading] = useState(false);

  const refreshInstalledModelBytes = useCallback(async () => {
    const models = settings.installedModels;
    if (!models.length || !isTauriDesktopPlatform()) {
      setModelBytesById({});
      setModelBytesLoading(false);
      return;
    }
    setModelBytesLoading(true);
    try {
      const bytes = await measureInstalledLlamaCppModelsBytes(models);
      setModelBytesById(bytes);
    } catch {
      setModelBytesById({});
    } finally {
      setModelBytesLoading(false);
    }
  }, [settings.installedModels]);

  useEffect(() => {
    void refreshInstalledModelBytes();
  }, [refreshInstalledModelBytes]);

  useEffect(
    () => subscribeLlamaCppDownloadLog(() => setDownloadLogLines(getLlamaCppDownloadLogLines())),
    [],
  );

  useEffect(() => {
    const onChanged = () => setAliasTick((n) => n + 1);
    window.addEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(LOCAL_LLM_MODEL_ALIASES_CHANGED_EVENT, onChanged);
  }, []);

  useEffect(() => {
    const onFocus = (event: Event) => {
      const detail = (event as CustomEvent<{ modelId?: string }>).detail;
      const modelId = String(detail?.modelId || settings.selectedModelId || '').trim();
      if (modelId) setPasteInput(modelId);
    };
    window.addEventListener(LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT, onFocus);
    return () => window.removeEventListener(LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT, onFocus);
  }, [settings.selectedModelId]);

  const handleSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setSearchError('');
      return;
    }
    setSearchBusy(true);
    setSearchError('');
    try {
      const hits = await searchHuggingFaceGgufModels(q, { limit: 20 });
      setSearchResults(hits);
      if (!hits.length) setSearchError('검색 결과가 없습니다.');
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed.');
      setSearchResults([]);
    } finally {
      setSearchBusy(false);
    }
  }, [searchQuery]);

  const requestDownload = useCallback(
    (hit: HfGgufSearchHit | { id: string; diskBytes?: number }) => {
      const id = String(hit.id || '').trim();
      if (!id) return;
      if (downloadBusy && downloadingRepoId === id) {
        setPendingAbortRepoId(id);
        return;
      }
      if (downloadBusy) return;
      rememberLlamaCppDownloadTarget(id);
      setPendingDownload(hit);
    },
    [downloadBusy, downloadingRepoId],
  );

  const confirmDownload = useCallback(async () => {
    const pending = pendingDownload;
    if (!pending) return;
    const repoId = pending.id;
    setPendingDownload(null);
    setDownloadBusy(true);
    setDownloadingRepoId(repoId);
    setDownloadProgress(null);
    setDownloadLogOpen(true);
    try {
      const installed = await downloadLlamaCppModel(repoId, {
        onProgress: (snapshot) => setDownloadProgress(snapshot),
      });
      const next = setSelectedLlamaCppModelId(
        {
          ...settings,
          installedModels: [
            installed,
            ...settings.installedModels.filter((m) => m.id !== installed.id),
          ],
        },
        installed.id,
      );
      onSettingsChange(next);
    } catch (err) {
      if (!isLlamaCppDownloadAbortedError(err)) {
        alert(err instanceof Error ? err.message : 'Download failed.');
      }
    } finally {
      setDownloadBusy(false);
      setDownloadingRepoId('');
      setAbortingRepoId('');
      setDownloadProgress(null);
    }
  }, [onSettingsChange, pendingDownload, settings]);

  const confirmAbort = useCallback(async () => {
    const repoId = pendingAbortRepoId;
    setPendingAbortRepoId('');
    if (!repoId) return;
    setAbortingRepoId(repoId);
    try {
      await abortLlamaCppDownload(repoId);
    } catch (err) {
      setAbortingRepoId('');
      alert(err instanceof Error ? err.message : 'Failed to abort download.');
    }
  }, [pendingAbortRepoId]);

  const handlePasteAdd = useCallback(() => {
    const repoId = parseHuggingFaceModelUrl(pasteInput);
    if (!repoId) {
      alert('Hugging Face repo URL 또는 org/model 형식을 입력하세요.');
      return;
    }
    requestDownload({ id: repoId });
  }, [pasteInput, requestDownload]);

  const handleLocalPathAdd = useCallback(() => {
    const path = localPathInput.trim();
    if (!path) return;
    const id = path.split(/[/\\]/).pop() || path;
    const next = addInstalledLlamaCppModel(settings, {
      id,
      localPath: path,
      source: 'local',
    });
    onSettingsChange(setSelectedLlamaCppModelId(next, id));
    setLocalPathInput('');
  }, [localPathInput, onSettingsChange, settings]);

  const handleBrowseGguf = useCallback(async () => {
    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const selected = await open({
        multiple: false,
        filters: [{ name: 'GGUF', extensions: ['gguf'] }],
      });
      if (typeof selected === 'string' && selected.trim()) {
        setLocalPathInput(selected);
      }
    } catch {
      // ignore
    }
  }, []);

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    const next = removeInstalledLlamaCppModel(settings, pendingDelete.id);
    onSettingsChange(next);
    setPendingDelete(null);
  }, [onSettingsChange, pendingDelete, settings]);

  const downloadCopy = pendingDownload
    ? buildLlamaCppDownloadConfirmMessage(pendingDownload.id, {
        ...('diskBytes' in pendingDownload && pendingDownload.diskBytes != null
          ? { diskBytes: pendingDownload.diskBytes }
          : {}),
      })
    : null;
  const deleteCopy = pendingDelete ? buildLlamaCppDeleteConfirmMessage(pendingDelete.id) : null;
  const pasteRepoId = parseHuggingFaceModelUrl(pasteInput) || '';
  const isPasteDownloading = Boolean(
    downloadBusy && downloadingRepoId && pasteRepoId && downloadingRepoId === pasteRepoId,
  );
  const isPasteAborting = Boolean(abortingRepoId && pasteRepoId && abortingRepoId === pasteRepoId);
  const progressLabel = downloadProgress?.label || '';

  return (
    <div className="space-y-3">
      <LlamaCppCollapsibleSection
        title="설치된 모델"
        subtitle={`${settings.installedModels.length}개 · ${settings.selectedModelId.trim() ? '선택됨' : '모델 미선택'}`}
        open={installedOpen}
        onOpenChange={setInstalledOpen}
      >
        <div className="space-y-2">
          {settings.selectedModelId.trim() ? (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                disabled={disabled}
                onClick={() => onSettingsChange(setSelectedLlamaCppModelId(settings, ''))}
              >
                선택 해제
              </Button>
            </div>
          ) : null}
          {settings.installedModels.length === 0 ? (
            <p className="text-[11px] text-gray-500 dark:text-odp-muted">
              아직 설치된 GGUF 모델이 없습니다.
            </p>
          ) : (
            settings.installedModels.map((model) => {
              void aliasTick;
              const selected = settings.selectedModelId === model.id;
              const alias = getLocalLlmModelAlias('llama-cpp', model.id);
              const diskBytes =
                modelBytesById[model.id] ?? modelBytesById[model.repoId || ''] ?? 0;
              const sizeLabel =
                diskBytes > 0
                  ? formatByteSize(diskBytes)
                  : modelBytesLoading
                    ? null
                    : '—';
              return (
                <div
                  key={model.id}
                  className={[
                    'flex flex-wrap items-start justify-between gap-2 rounded border px-2 py-1.5 text-[11px]',
                    selected
                      ? 'border-sky-400 bg-sky-50/80 dark:border-sky-700 dark:bg-sky-950/30'
                      : 'border-gray-200 dark:border-odp-borderStrong',
                  ].join(' ')}
                >
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      disabled={disabled}
                      className="w-full min-w-0 text-left"
                      onClick={() =>
                        onSettingsChange(
                          setSelectedLlamaCppModelId(settings, selected ? '' : model.id),
                        )
                      }
                    >
                      <span className="block truncate font-medium">{alias || model.id}</span>
                      {alias ? (
                        <span className="block truncate text-[10px] text-gray-500 dark:text-odp-muted">
                          {model.id}
                        </span>
                      ) : null}
                      {model.localPath ? (
                        <span className="block truncate text-[10px] text-gray-500 dark:text-odp-muted">
                          {model.localPath}
                        </span>
                      ) : null}
                    </button>
                    <span className="mt-0.5 block text-[10px] text-gray-500 dark:text-odp-muted">
                      {sizeLabel ? `용량 ${sizeLabel}` : '용량 확인 중…'}
                    </span>
                    <LocalLlmModelAliasField
                      scope="llama-cpp"
                      modelId={model.id}
                      disabled={disabled}
                    />
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="tertiary"
                      size="sm"
                      disabled={disabled || downloadBusy}
                      aria-label="삭제"
                      onClick={() => setPendingDelete(model)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </LlamaCppCollapsibleSection>

      <LlamaCppCollapsibleSection title="로컬 GGUF 경로" open={localOpen} onOpenChange={setLocalOpen}>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={localPathInput}
            disabled={disabled}
            onChange={(e) => setLocalPathInput(e.target.value)}
            placeholder="/path/to/model.gguf"
            className="min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            disabled={disabled}
            onClick={() => void handleBrowseGguf()}
          >
            <FolderOpen size={14} />
            Browse
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled}
            onClick={handleLocalPathAdd}
          >
            <FolderOpen size={14} />
            추가
          </Button>
        </div>
      </LlamaCppCollapsibleSection>

      <LlamaCppCollapsibleSection
        title="Hugging Face 검색"
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            value={searchQuery}
            disabled={disabled || searchBusy}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              e.preventDefault();
              if (!disabled && !searchBusy) void handleSearch();
            }}
            placeholder="llama 3 gguf"
            className="min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || searchBusy || !searchQuery.trim()}
            onClick={() => void handleSearch()}
          >
            <Search size={14} />
            검색
          </Button>
        </div>
        {searchBusy ? (
          <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">Searching…</p>
        ) : null}
        {searchError ? (
          <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">{searchError}</p>
        ) : null}
        <ul className="mt-2 space-y-1">
          {searchResults.map((hit) => {
            const isAborting = abortingRepoId === hit.id;
            const isDownloading = downloadBusy && downloadingRepoId === hit.id;
            const isDownloaded =
              !isDownloading &&
              !isAborting &&
              isLlamaCppRepoInstalled(hit.id, settings.installedModels);
            const sizeLabel = formatHfGgufDiskSizeLabel(hit.diskBytes);
            const buttonMode = isAborting
              ? 'aborting'
              : isDownloading
                ? 'downloading'
                : isDownloaded
                  ? 'downloaded'
                  : 'download';
            return (
              <li
                key={hit.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded border px-2 py-1.5 text-[11px] dark:border-odp-borderStrong"
              >
                <div className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{hit.id}</span>
                  <span className="block text-[10px] text-gray-500 dark:text-odp-muted">
                    {sizeLabel
                      ? `용량 ${sizeLabel}`
                      : hit.downloads != null
                        ? `${hit.downloads.toLocaleString()} downloads`
                        : '용량 정보 없음'}
                    {sizeLabel && hit.downloads != null
                      ? ` · ${hit.downloads.toLocaleString()} downloads`
                      : ''}
                  </span>
                </div>
                <Button
                  type="button"
                  variant={isDownloaded ? 'tertiary' : 'secondary'}
                  size="sm"
                  className={
                    isDownloading
                      ? 'min-w-[9.5rem] font-mono tabular-nums transition-none'
                      : isDownloaded
                        ? 'text-emerald-700 transition-none dark:text-emerald-300'
                        : 'transition-none'
                  }
                  disabled={
                    disabled ||
                    !downloadReady ||
                    isAborting ||
                    (downloadBusy && !isDownloading)
                  }
                  onClick={() => requestDownload(hit)}
                >
                  <MlxVlmDownloadButtonContent
                    mode={buttonMode}
                    progressLabel={isDownloading && !isAborting ? progressLabel : ''}
                  />
                </Button>
              </li>
            );
          })}
        </ul>
      </LlamaCppCollapsibleSection>

      <LlamaCppCollapsibleSection
        title="URL / repo id 붙여넣기"
        open={pasteOpen}
        onOpenChange={setPasteOpen}
      >
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={pasteInput}
            disabled={disabled}
            onChange={(e) => setPasteInput(e.target.value)}
            placeholder="https://huggingface.co/org/model"
            className="min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={
              isPasteDownloading
                ? 'min-w-[9.5rem] font-mono tabular-nums transition-none'
                : 'transition-none'
            }
            disabled={
              disabled ||
              !downloadReady ||
              isPasteAborting ||
              (!isPasteDownloading &&
                (downloadBusy || !isValidHuggingFaceRepoId(pasteRepoId)))
            }
            onClick={handlePasteAdd}
          >
            <MlxVlmDownloadButtonContent
              mode={
                isPasteAborting
                  ? 'aborting'
                  : isPasteDownloading
                    ? 'downloading'
                    : isLlamaCppRepoInstalled(pasteRepoId, settings.installedModels)
                      ? 'downloaded'
                      : 'download'
              }
              progressLabel={isPasteDownloading && !isPasteAborting ? progressLabel : ''}
              paste
            />
          </Button>
        </div>
      </LlamaCppCollapsibleSection>

      <MlxVlmVirtualLogPanel
        title="다운로드 로그"
        lines={downloadLogLines}
        emptyHint="GGUF 다운로드 시 huggingface-cli / uv 출력이 표시됩니다."
        open={downloadLogOpen}
        onOpenChange={setDownloadLogOpen}
        onClear={clearLlamaCppDownloadLog}
      />

      <ConfirmModal
        isOpen={Boolean(pendingDownload)}
        title={downloadCopy?.title || 'Download model'}
        message={downloadCopy?.message || ''}
        confirmLabel="Download"
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setPendingDownload(null)}
      />
      <ConfirmModal
        isOpen={Boolean(pendingAbortRepoId)}
        title="Abort download?"
        message={`Stop the in-progress download for "${pendingAbortRepoId}"?`}
        confirmLabel="Abort"
        cancelLabel="Continue"
        variant="danger"
        onConfirm={() => void confirmAbort()}
        onCancel={() => setPendingAbortRepoId('')}
      />
      <ConfirmModal
        isOpen={Boolean(pendingDelete)}
        title={deleteCopy?.title || 'Delete model'}
        message={deleteCopy?.message || ''}
        variant="danger"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
