import { useState } from 'react';
import { Play, Square } from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

type LlamaCppRuntimeControlsProps = {
  busy: boolean;
  cliAvailable: boolean;
  canStart: boolean;
  runtimeLoaded: boolean;
  serverRunning: boolean;
  loadedModels: string[];
  onStart: () => void | Promise<void>;
  onStop: () => void | Promise<void>;
};

export default function LlamaCppRuntimeControls({
  busy,
  cliAvailable,
  canStart,
  runtimeLoaded,
  serverRunning,
  loadedModels,
  onStart,
  onStop,
}: LlamaCppRuntimeControlsProps) {
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
          Start server
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={busy || !serverRunning}
          onClick={() => setStopConfirmOpen(true)}
        >
          <Square size={14} />
          Stop server
        </Button>
      </div>
      {runtimeLoaded && loadedModels[0] ? (
        <p className="mt-2 text-[11px] text-gray-600 dark:text-odp-muted">
          Loaded: <code className="text-[10px]">{loadedModels[0]}</code>
        </p>
      ) : serverRunning ? (
        <p className="mt-2 text-[11px] text-amber-700 dark:text-amber-300">
          Server process running; waiting for health check…
        </p>
      ) : null}

      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Stop llama.cpp server"
        message="Stop the local llama-server started from this app?"
        confirmLabel="Stop"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={() => void onStop()}
        onCancel={() => setStopConfirmOpen(false)}
      />
    </>
  );
}
