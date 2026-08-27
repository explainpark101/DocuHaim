import { Switch } from 'radix-ui';
import type { MlxLmSettings } from '@/utils/mlxLmSettingsStore';
import { MLX_LM_LOCAL_CLIENT_HOST } from '@/utils/mlxLmSettingsStore';

type MlxLmConnectionFieldsProps = {
  settings: MlxLmSettings;
  disabled?: boolean;
  onChange: (next: MlxLmSettings) => void;
};

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');
const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

export default function MlxLmConnectionFields({
  settings,
  disabled = false,
  onChange,
}: MlxLmConnectionFieldsProps) {
  const externalAccess = settings.allowExternalAccess === true;

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3 rounded-md border border-emerald-200/80 bg-white/70 px-3 py-2.5 dark:border-emerald-900/40 dark:bg-odp-bgSoft/40">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">외부 접속 허용</div>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            켜면 서버가 <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">0.0.0.0</code>
            에 바인드되어 같은 Mac의 다른 앱이나 LAN의 다른 기기에서 OpenAI 호환 API로 접속할 수
            있습니다. 이 앱은 계속 <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">127.0.0.1</code>
            로 연결합니다.
          </p>
        </div>
        <Switch.Root
          className={switchRootClass(externalAccess)}
          checked={externalAccess}
          disabled={disabled}
          onCheckedChange={(checked) =>
            onChange({
              ...settings,
              allowExternalAccess: checked,
              host: MLX_LM_LOCAL_CLIENT_HOST,
            })
          }
          aria-label="MLX-LM 외부 접속 허용"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            Host
          </label>
          <input
            type="text"
            value={settings.host}
            disabled={disabled || externalAccess}
            onChange={(e) => onChange({ ...settings, host: e.target.value })}
            className="w-full rounded border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          {externalAccess ? (
            <p className="mt-1 text-[11px] text-gray-500 dark:text-odp-muted">
              외부 접속 허용 시 서버는 0.0.0.0에 바인드됩니다.
            </p>
          ) : null}
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
    </div>
  );
}
