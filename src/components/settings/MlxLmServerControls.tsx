import { useState } from 'react';
import { Play, Square } from 'lucide-react';
import Button from '@/components/Button';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

type MlxLmServerControlsProps = {
  busy: boolean;
  cliAvailable: boolean;
  canStart: boolean;
  serverRunning: boolean;
  loadedModels: string[];
  onStart: () => void | Promise<void>;
  onStop: () => void | Promise<void>;
};

export default function MlxLmServerControls({
  busy,
  cliAvailable,
  canStart,
  serverRunning,
  loadedModels,
  onStart,
  onStop,
}: MlxLmServerControlsProps) {
  const [stopConfirmOpen, setStopConfirmOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="primary"
          size="sm"
          disabled={busy || !cliAvailable || !canStart}
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

      {serverRunning && loadedModels.length > 0 ? (
        <p className="text-[11px] text-gray-500 dark:text-odp-muted">
          Loaded: {loadedModels.join(', ')}
        </p>
      ) : null}

      <ConfirmModal
        isOpen={stopConfirmOpen}
        title="Stop MLX-LM server"
        message="Stop the local MLX-LM server started from this app?"
        confirmLabel="Stop"
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
