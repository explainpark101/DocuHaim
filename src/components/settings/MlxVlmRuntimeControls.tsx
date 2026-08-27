import { useState } from 'react';
import { Play, Square } from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

type MlxVlmRuntimeControlsProps = {
  busy: boolean;
  cliAvailable: boolean;
  canStart: boolean;
  runtimeLoaded: boolean;
  workerRunning: boolean;
  loadedModels: string[];
  onStart: () => void | Promise<void>;
  onStop: () => void | Promise<void>;
};

export default function MlxVlmRuntimeControls({
  busy,
  cliAvailable,
  canStart,
  runtimeLoaded,
  workerRunning,
  loadedModels,
  onStart,
  onStop,
}: MlxVlmRuntimeControlsProps) {
  const [stopConfirmOpen, setStopConfirmOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={busy || !cliAvailable || !canStart || runtimeLoaded}
          onClick={() => void onStart()}
        >
          <Play size={14} />
          Load model
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={busy || !workerRunning}
          onClick={() => setStopConfirmOpen(true)}
        >
          <Square size={14} />
          Unload
        </Button>
      </div>

      {runtimeLoaded && loadedModels.length > 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          Loaded in worker: {loadedModels.join(', ')}
        </p>
      ) : workerRunning ? (
        <p className="text-[11px] text-amber-700 dark:text-amber-300">
          Worker is running but no model is loaded. Check the server log below or use Unload to stop
          the worker.
        </p>
      ) : (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          Loads the selected model once into a local worker using mlx_vlm.generate. AI Assist calls
          the worker directly (no HTTP server).
        </p>
      )}

      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Unload MLX-VLM model"
        message="Unload the model from the local MLX-VLM worker?"
        confirmLabel="Unload"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => {
          setStopConfirmOpen(false);
          void onStop();
        }}
        onCancel={() => setStopConfirmOpen(false)}
      />
    </>
  );
}
