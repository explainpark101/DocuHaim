import { Cpu } from 'lucide-react';
import MlxLmInstallHelp from '@/components/settings/MlxLmInstallHelp';
import type { MlxLmToolkitStatus } from '@/utils/mlxLmShell';
import { resolveMlxLmExternalBaseUrlHint, resolveMlxLmOpenAiBaseUrl } from '@/utils/mlxLmSettingsStore';

type MlxLmSettingsOverviewProps = {
  toolkit: MlxLmToolkitStatus | null;
  cliAvailable: boolean;
  cliDetail?: string;
  serverRunning: boolean;
  serverPort: number;
  allowExternalAccess?: boolean;
  onRefresh: () => void | Promise<void>;
};

export default function MlxLmSettingsOverview({
  toolkit,
  cliAvailable,
  cliDetail,
  serverRunning,
  serverPort,
  allowExternalAccess = false,
  onRefresh,
}: MlxLmSettingsOverviewProps) {
  const hfReady = toolkit?.hfHubRunnable === true;
  const localBaseUrl = resolveMlxLmOpenAiBaseUrl({
    port: serverPort,
    allowExternalAccess,
    host: '127.0.0.1',
  });
  const externalBaseUrlHint = allowExternalAccess
    ? resolveMlxLmExternalBaseUrlHint({ port: serverPort, allowExternalAccess })
    : null;

  return (
    <>
      <div className="mb-1 flex items-start justify-between gap-3">
        <p className="text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
          Apple Silicon에서{' '}
          <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">uv tool run --from mlx-lm</code>
          으로 로컬 MLX 모델을 실행합니다. Hugging Face 모델은{' '}
          <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">uv tool run --from huggingface-hub hf</code>
          로 다운로드합니다.
        </p>
        <MlxLmInstallHelp toolkit={toolkit} onRefresh={onRefresh} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            toolkit?.uvAvailable
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          uv: {toolkit?.uvAvailable ? 'ready' : 'missing'}
        </span>
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            cliAvailable
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          mlx-lm: {cliAvailable ? 'ready' : 'missing'}
        </span>
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            hfReady
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          hf: {hfReady ? 'ready' : 'missing'}
        </span>
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            serverRunning
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          Server: {serverRunning ? `running :${serverPort}` : 'stopped'}
        </span>
      </div>

      {!cliAvailable && cliDetail ? (
        <p className="text-[11px] text-amber-700 dark:text-amber-300">
          {cliDetail} · 우측 <span className="font-medium">?</span> 도움말에서 uv / 도구 설치를
          실행하세요.
        </p>
      ) : cliAvailable && cliDetail ? (
        <p className="text-[10px] text-gray-500 dark:text-odp-muted">{cliDetail}</p>
      ) : null}

      {serverRunning ? (
        <div className="space-y-1 text-[11px] text-gray-600 dark:text-odp-muted">
          <p>
            이 앱 / 같은 Mac:{' '}
            <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">{localBaseUrl}</code>
          </p>
          {externalBaseUrlHint ? (
            <p>
              다른 기기 (LAN):{' '}
              <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">{externalBaseUrlHint}</code>
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function MlxLmSettingsPanelTitle() {
  return (
    <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
      <Cpu size={16} />
      MLX-LM (Tauri macOS)
    </span>
  );
}
