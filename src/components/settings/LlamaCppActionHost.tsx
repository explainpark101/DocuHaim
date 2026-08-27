import { useCallback, useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import { buildLlamaCppDownloadConfirmMessage } from '@/utils/llamaCppHuggingFace';
import { loadLlamaCppSettings } from '@/utils/llamaCppSettingsStore';
import {
  downloadLlamaCppModel,
  getLastLlamaCppDownloadRepoId,
  startLlamaCppServer,
  stopLlamaCppServer,
} from '@/utils/llamaCppShell';
import { requestLlamaCppProviderSync } from '@/utils/llm/llamaCppProviderAutoSync';
import {
  buildLlamaCppLoadFailureAlertMessage,
  requestLlamaCppRedownloadFocus,
  resolveLlamaCppLoadFailure,
} from '@/utils/llm/llamaCppLoadErrorHelp';
import { registerLlamaCppActions } from '@/utils/advancedSearch/llamaCppActions';

/** Registers llama.cpp Advanced Search actions app-wide (Tauri desktop). */
export default function LlamaCppActionHost() {
  const [stopConfirmOpen, setStopConfirmOpen] = useState(false);
  const [downloadPendingRepoId, setDownloadPendingRepoId] = useState('');
  const [busy, setBusy] = useState(false);

  const handleStart = useCallback(async () => {
    setBusy(true);
    try {
      await startLlamaCppServer(loadLlamaCppSettings());
      requestLlamaCppProviderSync();
    } catch (err) {
      const settings = loadLlamaCppSettings();
      const failure = resolveLlamaCppLoadFailure(err);
      if (failure.suggestRedownload) {
        requestLlamaCppRedownloadFocus(settings.selectedModelId);
      }
      alert(buildLlamaCppLoadFailureAlertMessage(err, settings.selectedModelId));
    } finally {
      setBusy(false);
    }
  }, []);

  const handleStop = useCallback(async () => {
    setStopConfirmOpen(false);
    setBusy(true);
    try {
      await stopLlamaCppServer();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop llama.cpp server.');
    } finally {
      setBusy(false);
    }
  }, []);

  const confirmDownload = useCallback(async () => {
    const repoId = downloadPendingRepoId;
    if (!repoId) return;
    setDownloadPendingRepoId('');
    setBusy(true);
    try {
      await downloadLlamaCppModel(repoId);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      setBusy(false);
    }
  }, [downloadPendingRepoId]);

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return undefined;
    return registerLlamaCppActions({
      'llama-cpp-server-start': () => {
        if (busy) return;
        void handleStart();
      },
      'llama-cpp-server-stop': () => {
        if (busy) return;
        setStopConfirmOpen(true);
      },
      'llama-cpp-download-last': () => {
        if (busy) return;
        const repoId = getLastLlamaCppDownloadRepoId() || loadLlamaCppSettings().selectedModelId;
        if (!repoId.trim()) {
          alert('Open Settings > llama.cpp to choose a model or paste a Hugging Face URL first.');
          return;
        }
        setDownloadPendingRepoId(repoId);
      },
    });
  }, [busy, handleStart]);

  if (!isTauriDesktopPlatform()) return null;

  const downloadCopy = downloadPendingRepoId
    ? buildLlamaCppDownloadConfirmMessage(downloadPendingRepoId)
    : null;

  return (
    <>
      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Stop llama.cpp server"
        message="Stop the local llama-server started from this app?"
        confirmLabel="Stop"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => void handleStop()}
        onCancel={() => setStopConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={Boolean(downloadPendingRepoId)}
        title={downloadCopy?.title || 'Download model'}
        message={downloadCopy?.message || ''}
        confirmLabel="Download"
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setDownloadPendingRepoId('')}
      />
    </>
  );
}
