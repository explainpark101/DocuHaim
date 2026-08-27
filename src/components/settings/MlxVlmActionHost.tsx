import { useCallback, useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxVlmDownloadConfirmMessage,
  resolveMlxVlmDownloadMode,
  type MlxVlmDownloadMode,
} from '@/utils/mlxVlmHuggingFace';
import { loadMlxVlmSettings } from '@/utils/mlxVlmSettingsStore';
import {
  downloadMlxVlmModel,
  getLastMlxVlmDownloadRepoId,
  startMlxVlmServer,
  stopMlxVlmServer,
} from '@/utils/mlxVlmShell';
import { requestMlxVlmProviderSync } from '@/utils/llm/mlxVlmProviderAutoSync';
import {
  buildMlxVlmLoadFailureAlertMessage,
  requestMlxVlmRedownloadFocus,
  resolveMlxVlmLoadFailure,
} from '@/utils/llm/mlxVlmLoadErrorHelp';
import { registerMlxVlmActions } from '@/utils/advancedSearch/mlxVlmActions';

type PendingDownload = {
  repoId: string;
  mode: MlxVlmDownloadMode;
};

/** Registers MLX-VLM Advanced Search actions app-wide (Tauri macOS). */
export default function MlxVlmActionHost() {
  const [stopConfirmOpen, setStopConfirmOpen] = useState(false);
  const [downloadPending, setDownloadPending] = useState<PendingDownload | null>(null);
  const [busy, setBusy] = useState(false);

  const handleStart = useCallback(async () => {
    setBusy(true);
    try {
      const settings = loadMlxVlmSettings();
      await startMlxVlmServer(settings);
      requestMlxVlmProviderSync();
    } catch (err) {
      const settings = loadMlxVlmSettings();
      const failure = resolveMlxVlmLoadFailure(err);
      if (failure.suggestRedownload) {
        requestMlxVlmRedownloadFocus(settings.selectedModelId);
      }
      alert(buildMlxVlmLoadFailureAlertMessage(err, settings.selectedModelId));
    } finally {
      setBusy(false);
    }
  }, []);

  const handleStop = useCallback(async () => {
    setStopConfirmOpen(false);
    setBusy(true);
    try {
      await stopMlxVlmServer();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop MLX-VLM server.');
    } finally {
      setBusy(false);
    }
  }, []);

  const confirmDownload = useCallback(async () => {
    if (!downloadPending) return;
    const { repoId, mode } = downloadPending;
    setDownloadPending(null);
    setBusy(true);
    try {
      await downloadMlxVlmModel(repoId, { mode });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      setBusy(false);
    }
  }, [downloadPending]);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;
    return registerMlxVlmActions({
      'mlx-vlm-server-start': () => {
        if (busy) return;
        void handleStart();
      },
      'mlx-vlm-server-stop': () => {
        if (busy) return;
        setStopConfirmOpen(true);
      },
      'mlx-vlm-download-last': () => {
        if (busy) return;
        const repoId = getLastMlxVlmDownloadRepoId() || loadMlxVlmSettings().selectedModelId;
        if (!repoId.trim()) {
          alert('Open Settings > MLX-VLM to choose a model or paste a Hugging Face URL first.');
          return;
        }
        setDownloadPending({
          repoId,
          mode: resolveMlxVlmDownloadMode(repoId),
        });
      },
    });
  }, [busy, handleStart]);

  if (!isTauriMacOS()) return null;

  const downloadCopy = downloadPending
    ? buildMlxVlmDownloadConfirmMessage(downloadPending.repoId, downloadPending.mode)
    : null;

  return (
    <>
      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Stop MLX-VLM server"
        message="Stop the local MLX-VLM server started from this app?"
        confirmLabel="Stop"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => void handleStop()}
        onCancel={() => setStopConfirmOpen(false)}
      />
      <ConfirmModal
        isOpen={Boolean(downloadPending)}
        title={downloadCopy?.title || 'Download model'}
        message={downloadCopy?.message || ''}
        confirmLabel={downloadPending?.mode === 'convert' ? 'Convert' : 'Download'}
        cancelLabel="Cancel"
        onConfirm={() => void confirmDownload()}
        onCancel={() => setDownloadPending(null)}
      />
    </>
  );
}
