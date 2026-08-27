import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { ModelIdInputDropdown, type ModelIdOption } from '@/components/ModelIdInputDropdown';
import {
  MLX_LM_SETTINGS_CHANGED_EVENT,
  loadMlxLmSettings,
} from '@/utils/mlxLmSettingsStore';
import { getMlxLmServerStatus, listInstalledMlxLmModels } from '@/utils/mlxLmShell';

type MlxLmModelSelectProps = {
  value: string;
  onChange?: (nextId: string) => void;
  autoLoad?: boolean;
  className?: string;
};

export default function MlxLmModelSelect({
  value,
  onChange,
  autoLoad = true,
  className = '',
}: MlxLmModelSelectProps) {
  const [options, setOptions] = useState<ModelIdOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverRunning, setServerRunning] = useState(false);

  const refreshModels = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const settings = loadMlxLmSettings();
      const [installed, status] = await Promise.all([
        listInstalledMlxLmModels(settings),
        getMlxLmServerStatus(settings),
      ]);
      setServerRunning(status.running);
      const ids = new Set<string>();
      for (const model of installed) ids.add(model.id);
      if (settings.selectedModelId) ids.add(settings.selectedModelId);
      for (const id of status.models) ids.add(id);
      const list = [...ids].map((id) => ({ id, displayName: id }));
      setOptions(list);
      if (!list.length) {
        setError('No MLX models installed. Add one in Settings > MLX-LM.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load MLX models.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoLoad) return;
    void refreshModels();
  }, [autoLoad, refreshModels]);

  useEffect(() => {
    const onChanged = () => void refreshModels();
    window.addEventListener(MLX_LM_SETTINGS_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(MLX_LM_SETTINGS_CHANGED_EVENT, onChanged);
  }, [refreshModels]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <ModelIdInputDropdown
          value={value}
          options={options}
          onChange={(next) => onChange?.(next)}
          placeholder="MLX model id"
          aria-label="MLX-LM model"
          className="min-w-0 flex-1"
        />
        <button
          type="button"
          onClick={() => void refreshModels()}
          disabled={loading}
          aria-label="Refresh MLX models"
          className="inline-flex shrink-0 items-center justify-center rounded border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
        </button>
      </div>
      {error ? <p className="mt-1 text-[11px] text-amber-700 dark:text-amber-300">{error}</p> : null}
      {!serverRunning ? (
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Start the MLX-LM server in Settings before running the assistant.
        </p>
      ) : null}
    </div>
  );
}
