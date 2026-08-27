import type { MlxLmSettings } from '@/utils/mlxLmSettingsStore';

type MlxLmConnectionFieldsProps = {
  settings: MlxLmSettings;
  disabled?: boolean;
  onChange: (next: MlxLmSettings) => void;
};

export default function MlxLmConnectionFields({
  settings,
  disabled = false,
  onChange,
}: MlxLmConnectionFieldsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          Host
        </label>
        <input
          type="text"
          value={settings.host}
          disabled={disabled}
          onChange={(e) => onChange({ ...settings, host: e.target.value })}
          className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          Port
        </label>
        <input
          type="number"
          min={1}
          max={65535}
          value={settings.port}
          disabled={disabled}
          onChange={(e) => {
            const port = Number.parseInt(e.target.value, 10);
            if (!Number.isFinite(port)) return;
            onChange({ ...settings, port });
          }}
          className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
      </div>
    </div>
  );
}
