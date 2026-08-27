import type { LlamaCppSettings } from '@/utils/llamaCppSettingsStore';

type LlamaCppConnectionFieldsProps = {
  settings: LlamaCppSettings;
  disabled?: boolean;
  onChange: (next: LlamaCppSettings) => void;
};

export default function LlamaCppConnectionFields({
  settings,
  disabled = false,
  onChange,
}: LlamaCppConnectionFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            Host
          </label>
          <input
            type="text"
            value={settings.serverHost}
            disabled={disabled}
            onChange={(e) => onChange({ ...settings, serverHost: e.target.value })}
            placeholder="127.0.0.1"
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
            value={settings.serverPort}
            disabled={disabled}
            onChange={(e) =>
              onChange({ ...settings, serverPort: Number.parseInt(e.target.value, 10) || 8080 })
            }
            className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          llama-server binary path (optional)
        </label>
        <input
          type="text"
          value={settings.binaryPath}
          disabled={disabled}
          onChange={(e) => onChange({ ...settings, binaryPath: e.target.value })}
          placeholder="/opt/homebrew/bin/llama-server"
          className="w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Leave empty to auto-detect from PATH / Homebrew / ~/.local/bin.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            Context size (0 = model default)
          </label>
          <input
            type="number"
            min={0}
            value={settings.ctxSize}
            disabled={disabled}
            onChange={(e) =>
              onChange({ ...settings, ctxSize: Number.parseInt(e.target.value, 10) || 0 })
            }
            className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            GPU layers (-1 = auto)
          </label>
          <input
            type="number"
            value={settings.nGpuLayers}
            disabled={disabled}
            onChange={(e) =>
              onChange({ ...settings, nGpuLayers: Number.parseInt(e.target.value, 10) || -1 })
            }
            className="w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
          API key (optional)
        </label>
        <input
          type="password"
          value={settings.apiKey}
          disabled={disabled}
          onChange={(e) => onChange({ ...settings, apiKey: e.target.value })}
          placeholder="sk-…"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded border px-3 py-2 font-mono text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
          Passed to <code className="text-[10px]">--api-key</code> when starting llama-server.
        </p>
      </div>

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
      </div>
    </div>
  );
}
