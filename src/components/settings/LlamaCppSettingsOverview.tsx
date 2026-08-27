import { Server } from 'lucide-react';
import LlamaCppInstallHelp, {
  isLlamaCppInstallHelpAvailable,
} from '@/components/settings/LlamaCppInstallHelp';
import type { LlamaCppToolkitStatus } from '@/utils/llamaCppShell';

type LlamaCppSettingsOverviewProps = {
  toolkit: LlamaCppToolkitStatus | null;
  cliAvailable: boolean;
  cliDetail?: string;
  runtimeLoaded: boolean;
  loadedModel: string;
  serverRunning?: boolean;
  baseUrl?: string | null;
  onRefresh: () => void | Promise<void>;
};

export default function LlamaCppSettingsOverview({
  toolkit,
  cliAvailable,
  cliDetail,
  runtimeLoaded,
  loadedModel,
  serverRunning = false,
  baseUrl,
  onRefresh,
}: LlamaCppSettingsOverviewProps) {
  const showInstallHelp = isLlamaCppInstallHelpAvailable();

  return (
    <>
      <div className="mb-1 flex items-start justify-between gap-3">
        <p className="text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
          Tauri desktop에서 <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">llama-server</code>
          를 spawn하고 OpenAI 호환 <code className="rounded bg-white/80 px-1 dark:bg-odp-bgSoft">/v1/chat/completions</code>
          API로 LLM Assist에 연결합니다.
        </p>
        {showInstallHelp ? <LlamaCppInstallHelp toolkit={toolkit} onRefresh={onRefresh} /> : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            cliAvailable
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200'
              : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          llama-server: {cliAvailable ? 'ready' : 'missing'}
        </span>
        <span
          className={[
            'rounded-full px-2 py-0.5 font-medium',
            runtimeLoaded
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
              : serverRunning
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                : 'bg-gray-200 text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted',
          ].join(' ')}
        >
          Runtime:{' '}
          {runtimeLoaded
            ? `running · ${loadedModel}`
            : serverRunning
              ? 'starting'
              : 'stopped'}
        </span>
        {baseUrl ? (
          <span className="rounded-full bg-gray-200 px-2 py-0.5 font-medium text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted">
            {baseUrl}
          </span>
        ) : null}
      </div>

      {!cliAvailable && cliDetail ? (
        <p className="text-[11px] text-amber-700 dark:text-amber-300">
          {cliDetail}
          {showInstallHelp ? (
            <>
              {' '}
              · 우측 <span className="font-medium">?</span> 도움말을 확인하세요.
            </>
          ) : null}
        </p>
      ) : cliAvailable && cliDetail ? (
        <p className="text-[10px] text-gray-500 dark:text-odp-muted">{cliDetail}</p>
      ) : null}
    </>
  );
}

export function LlamaCppSettingsPanelTitle() {
  return (
    <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
      <Server size={16} />
      llama.cpp (Tauri desktop)
    </span>
  );
}
