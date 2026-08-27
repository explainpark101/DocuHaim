import { useCallback, useEffect, useState } from 'react';
import { Download, FolderOpen, Search, Trash2 } from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import LlamaCppCollapsibleSection from '@/components/settings/LlamaCppCollapsibleSection';
import {
  buildLlamaCppDeleteConfirmMessage,
  buildLlamaCppDownloadConfirmMessage,
  isValidHuggingFaceRepoId,
  parseHuggingFaceModelUrl,
  searchHuggingFaceGgufModels,
  type HfGgufSearchHit,
} from '@/utils/llamaCppHuggingFace';
import {
  addInstalledLlamaCppModel,
  type LlamaCppInstalledModel,
  type LlamaCppSettings,
} from '@/utils/llamaCppSettingsStore';
import {
  clearLlamaCppDownloadLog,
  subscribeLlamaCppDownloadLog,
  getLlamaCppDownloadLogLines,
} from '@/utils/llm/llamaCppDownloadLog';
import {
  downloadLlamaCppModel,
  isLlamaCppDownloadAbortedError,
  rememberLlamaCppDownloadTarget,
  removeInstalledLlamaCppModel,
  setSelectedLlamaCppModelId,
} from '@/utils/llamaCppShell';
import { LLAMA_CPP_REDOWNLOAD_FOCUS_EVENT } from '@/utils/llm/llamaCppLoadErrorHelp';
import MlxVlmVirtualLogPanel from '@/components/settings/MlxVlmVirtualLogPanel';

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
  const [pendingDownloadRepoId, setPendingDownloadRepoId] = useState('');
  const [pendingDelete, setPendingDelete] = useState<LlamaCppInstalledModel | null>(null);
  const [localPathInput, setLocalPathInput] = useState('');
  const [installedOpen, setInstalledOpen] = useState(true);
  const [localOpen, setLocalOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [downloadLogOpen, setDownloadLogOpen] = useState(false);
  const [downloadLogLines, setDownloadLogLines] = useState(() => getLlamaCppDownloadLogLines());

  useEffect(() => subscribeLlamaCppDownloadLog(() => setDownloadLogLines(getLlamaCppDownloadLogLines())), []);

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
    setSearchBusy(true);
    setSearchError('');
    try {
      const hits = await searchHuggingFaceGgufModels(searchQuery, { limit: 20 });
      setSearchResults(hits);
      if (!hits.length) setSearchError('검색 결과가 없습니다.');
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed.');
      setSearchResults([]);
    } finally {
      setSearchBusy(false);
    }
  }, [searchQuery]);

  const requestDownload = useCallback((repoId: string) => {
    const id = String(repoId || '').trim();
    if (!id) return;
    rememberLlamaCppDownloadTarget(id);
    setPendingDownloadRepoId(id);
  }, []);

  const confirmDownload = useCallback(async () => {
    const repoId = pendingDownloadRepoId;
    if (!repoId) return;
    setPendingDownloadRepoId('');
    setDownloadBusy(true);
    setDownloadLogOpen(true);
    try {
      const installed = await downloadLlamaCppModel(repoId);
      const next = setSelectedLlamaCppModelId(
        { ...settings, installedModels: [installed, ...settings.installedModels.filter((m) => m.id !== installed.id)] },
        installed.id,
      );
      onSettingsChange(next);
    } catch (err) {
      if (!isLlamaCppDownloadAbortedError(err)) {
        alert(err instanceof Error ? err.message : 'Download failed.');
      }
    } finally {
      setDownloadBusy(false);
    }
  }, [onSettingsChange, pendingDownloadRepoId, settings]);

  const handlePasteAdd = useCallback(() => {
    const repoId = parseHuggingFaceModelUrl(pasteInput);
    if (!repoId) {
      alert('Hugging Face repo URL 또는 org/model 형식을 입력하세요.');
      return;
    }
    requestDownload(repoId);
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

  const downloadCopy = pendingDownloadRepoId
    ? buildLlamaCppDownloadConfirmMessage(pendingDownloadRepoId)
    : null;
  const deleteCopy = pendingDelete ? buildLlamaCppDeleteConfirmMessage(pendingDelete.id) : null;

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
            <p className="text-[11px] text-gray-500 dark:text-odp-muted">아직 설치된 GGUF 모델이 없습니다.</p>
          ) : (
            settings.installedModels.map((model) => {
              const selected = settings.selectedModelId === model.id;
              return (
                <div
                  key={model.id}
                  className={[
                    'flex flex-wrap items-center justify-between gap-2 rounded border px-2 py-1.5 text-[11px]',
                    selected
                      ? 'border-sky-400 bg-sky-50/80 dark:border-sky-700 dark:bg-sky-950/30'
                      : 'border-gray-200 dark:border-odp-borderStrong',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    disabled={disabled}
                    className="min-w-0 flex-1 text-left"
                    onClick={() =>
                      onSettingsChange(
                        setSelectedLlamaCppModelId(settings, selected ? '' : model.id),
                      )
                    }
                  >
                    <span className="block truncate font-medium">{model.id}</span>
                    {model.localPath ? (
                      <span className="block truncate text-[10px] text-gray-500 dark:text-odp-muted">
                        {model.localPath}
                      </span>
                    ) : null}
                  </button>
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
          <Button type="button" variant="tertiary" size="sm" disabled={disabled} onClick={() => void handleBrowseGguf()}>
            <FolderOpen size={14} />
            Browse
          </Button>
          <Button type="button" variant="secondary" size="sm" disabled={disabled} onClick={handleLocalPathAdd}>
            <FolderOpen size={14} />
            추가
          </Button>
        </div>
      </LlamaCppCollapsibleSection>

      <LlamaCppCollapsibleSection title="Hugging Face 검색" open={searchOpen} onOpenChange={setSearchOpen}>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            value={searchQuery}
            disabled={disabled || searchBusy}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="llama 3 gguf"
            className="min-w-0 flex-1 rounded border px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <Button type="button" variant="secondary" size="sm" disabled={disabled || searchBusy} onClick={() => void handleSearch()}>
            <Search size={14} />
            검색
          </Button>
        </div>
        {searchError ? <p className="text-[11px] text-amber-700 dark:text-amber-300">{searchError}</p> : null}
        <ul className="mt-2 space-y-1">
          {searchResults.map((hit) => (
            <li key={hit.id} className="flex flex-wrap items-center justify-between gap-2 rounded border px-2 py-1 text-[11px] dark:border-odp-borderStrong">
              <span className="min-w-0 truncate">{hit.id}</span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={disabled || !downloadReady || downloadBusy}
                onClick={() => requestDownload(hit.id)}
              >
                <Download size={14} />
                Download
              </Button>
            </li>
          ))}
        </ul>
      </LlamaCppCollapsibleSection>

      <LlamaCppCollapsibleSection title="URL / repo id 붙여넣기" open={pasteOpen} onOpenChange={setPasteOpen}>
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
            disabled={disabled || !downloadReady || downloadBusy || !isValidHuggingFaceRepoId(parseHuggingFaceModelUrl(pasteInput) || '')}
            onClick={handlePasteAdd}
          >
            <Download size={14} />
            Download
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
        isOpen={Boolean(pendingDownloadRepoId)}
        title={downloadCopy?.title || 'Download model'}
        message={downloadCopy?.message || ''}
        confirmLabel="Download"
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setPendingDownloadRepoId('')}
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
