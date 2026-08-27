import type { MlxVlmSettings } from '@/utils/mlxVlmSettingsStore';

type MlxVlmConnectionFieldsProps = {
  settings: MlxVlmSettings;
  disabled?: boolean;
  onChange: (next: MlxVlmSettings) => void;
};

export default function MlxVlmConnectionFields({
  settings,
  disabled = false,
  onChange,
}: MlxVlmConnectionFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          HF download workers (parallel threads)
        </label>
        <input
          type="number"
          min={1}
          max={32}
          value={settings.hfDownloadMaxWorkers}
          disabled={disabled}
          onChange={(e) =>
            onChange({
              ...settings,
              hfDownloadMaxWorkers: Number.parseInt(e.target.value, 10) || 16,
            })
          }
          className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Passed to <code className="text-[10px]">hf download --max-workers</code>. Default 16 (HF
          CLI default is 8). Range 1–32.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          Hugging Face token (optional)
        </label>
        <input
          type="password"
          value={settings.hfToken}
          disabled={disabled}
          onChange={(e) => onChange({ ...settings, hfToken: e.target.value })}
          placeholder="hf_…"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Passed as <code className="text-[10px]">HF_TOKEN</code> to{' '}
          <code className="text-[10px]">hf download</code>. Improves rate limits; leave empty for
          anonymous downloads.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          Adapter path (optional)
        </label>
        <input
          type="text"
          value={settings.adapterPath}
          disabled={disabled}
          onChange={(e) => onChange({ ...settings, adapterPath: e.target.value })}
          placeholder="/path/to/lora-adapter"
          className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Low-rank adapter weights passed to mlx_vlm.generate when loading the model.
        </p>
      </div>
    </div>
  );
}
