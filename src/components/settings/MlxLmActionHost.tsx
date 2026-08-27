import { useCallback, useEffect, useState } from 'react';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  buildMlxLmDownloadConfirmMessage,
  resolveMlxLmDownloadMode,
  type MlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import { loadMlxLmSettings } from '@/utils/mlxLmSettingsStore';
import {
  downloadMlxLmModel,
  getLastMlxLmDownloadRepoId,
  startMlxLmServer,
  stopMlxLmServer,
} from '@/utils/mlxLmShell';
import { registerMlxLmActions } from '@/utils/advancedSearch/mlxLmActions';

type PendingDownload = {
  repoId: string;
  mode: MlxLmDownloadMode;
};

/** Registers MLX-LM Advanced Search actions app-wide (Tauri macOS). */
export default function MlxLmActionHost() {
  const [stopConfirmOpen, setStopConfirmOpen] = useState(false);
  const [downloadPending, setDownloadPending] = useState<PendingDownload | null>(null);
  const [busy, setBusy] = useState(false);

  const handleStart = useCallback(async () => {
    setBusy(true);
    try {
      await startMlxLmServer(loadMlxLmSettings());
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start MLX-LM server.');
    } finally {
      setBusy(false);
    }
  }, []);

  const handleStop = useCallback(async () => {
    setStopConfirmOpen(false);
    setBusy(true);
    try {
      await stopMlxLmServer();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop MLX-LM server.');
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
      await downloadMlxLmModel(repoId, { mode });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Download failed.');
    } finally {
      setBusy(false);
    }
  }, [downloadPending]);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;
    return registerMlxLmActions({
      'mlx-lm-server-start': () => {
        if (busy) return;
        void handleStart();
      },
      'mlx-lm-server-stop': () => {
        if (busy) return;
        setStopConfirmOpen(true);
      },
      'mlx-lm-download-last': () => {
        if (busy) return;
        const repoId = getLastMlxLmDownloadRepoId() || loadMlxLmSettings().selectedModelId;
        if (!repoId.trim()) {
          alert('Open Settings > MLX-LM to choose a model or paste a Hugging Face URL first.');
          return;
        }
        setDownloadPending({
          repoId,
          mode: resolveMlxLmDownloadMode(repoId),
        });
      },
    });
  }, [busy, handleStart]);

  if (!isTauriMacOS()) return null;

  const downloadCopy = downloadPending
    ? buildMlxLmDownloadConfirmMessage(downloadPending.repoId, downloadPending.mode)
    : null;

  return (
    <>
      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Stop MLX-LM server"
        message="Stop the local MLX-LM server started from this app?"
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
