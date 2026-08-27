import { Cpu } from 'lucide-react';
import MlxLmInstallHelp from '@/components/settings/MlxLmInstallHelp';

type MlxLmSettingsOverviewProps = {
  cliAvailable: boolean;
  cliDetail?: string;
  serverRunning: boolean;
  serverPort: number;
};

export default function MlxLmSettingsOverview({
  cliAvailable,
  cliDetail,
  serverRunning,
  serverPort,
}: MlxLmSettingsOverviewProps) {
  return (
    <>
      <div className="mb-1 flex items-start justify-between gap-3">
        <p className="text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
          Apple Silicon에서{' '}
          <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">mlx_lm.server</code>로
          로컬 MLX 모델을 실행합니다. Hugging Face에서 모델을 설치한 뒤 서버를 수동으로 시작하고,
          AI 도우미에서 MLX-LM 제공자 프로필을 선택하세요.
        </p>
        <MlxLmInstallHelp />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            cliAvailable
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          CLI: {cliAvailable ? 'ready' : 'missing'}
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
          {cliDetail} · 우측 <span className="font-medium">?</span> 도움말에서 uv / pip 설치
          방법을 확인하세요.
        </p>
      ) : cliAvailable && cliDetail?.includes('/') ? (
        <p className="text-[10px] text-gray-500 dark:text-odp-muted">Server CLI: {cliDetail}</p>
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
