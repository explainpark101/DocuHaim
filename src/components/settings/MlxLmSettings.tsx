import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  loadMlxLmSettings,
  saveMlxLmSettings,
  type MlxLmSettings,
} from '@/utils/mlxLmSettingsStore';
import {
  getMlxLmServerStatus,
  probeMlxLmCli,
  startMlxLmServer,
  stopMlxLmServer,
} from '@/utils/mlxLmShell';
import MlxLmCollapsibleSection from '@/components/settings/MlxLmCollapsibleSection';
import MlxLmConnectionFields from '@/components/settings/MlxLmConnectionFields';
import MlxLmModelBrowser from '@/components/settings/MlxLmModelBrowser';
import MlxLmServerControls from '@/components/settings/MlxLmServerControls';
import MlxLmSettingsOverview, {
  MlxLmSettingsPanelTitle,
} from '@/components/settings/MlxLmSettingsOverview';

export default function MlxLmSettings() {
  const location = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(true);
  const [modelsOpen, setModelsOpen] = useState(true);
  const [serverOpen, setServerOpen] = useState(true);
  const [settings, setSettings] = useState(() => loadMlxLmSettings());
  const [cliProbe, setCliProbe] = useState<{ available: boolean; detail?: string } | null>(null);
  const [serverStatus, setServerStatus] = useState<{ running: boolean; models: string[] }>({
    running: false,
    models: [],
  });
  const [busy, setBusy] = useState(false);

  const refreshStatus = useCallback(async () => {
    const [probe, status] = await Promise.all([
      probeMlxLmCli(),
      getMlxLmServerStatus(settings),
    ]);
    setCliProbe(probe);
    setServerStatus(status);
  }, [settings]);

  const handleStart = useCallback(async () => {
    setBusy(true);
    try {
      await startMlxLmServer(settings);
      await refreshStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to start MLX-LM server.');
    } finally {
      setBusy(false);
    }
  }, [refreshStatus, settings]);

  const handleStop = useCallback(async () => {
    setBusy(true);
    try {
      await stopMlxLmServer();
      await refreshStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop MLX-LM server.');
    } finally {
      setBusy(false);
    }
  }, [refreshStatus]);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;
    void refreshStatus();
    const timer = window.setInterval(() => {
      void getMlxLmServerStatus(settings).then(setServerStatus);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [refreshStatus, settings]);

  useEffect(() => {
    const hash = String(location.hash || '').replace(/^#/, '');
    if (hash === 'settings-mlx-lm') {
      setPanelOpen(true);
      setModelsOpen(true);
    }
  }, [location.hash]);

  if (!isTauriMacOS()) return null;

  const cliAvailable = cliProbe?.available === true;

  const persistSettings = (next: MlxLmSettings) => {
    saveMlxLmSettings(next);
    setSettings(next);
  };

  return (
    <div
      id="settings-mlx-lm"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/25"
    >
      <button
        type="button"
        onClick={() => setPanelOpen((v) => !v)}
        aria-expanded={panelOpen}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-emerald-100/50 dark:hover:bg-emerald-950/30"
      >
        {panelOpen ? (
          <ChevronDown size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        ) : (
          <ChevronRight size={16} className="shrink-0 text-gray-500 dark:text-odp-muted" />
        )}
        <MlxLmSettingsPanelTitle />
      </button>

      {panelOpen ? (
        <div className="space-y-3 border-t border-emerald-200/80 px-4 pb-4 pt-3 dark:border-emerald-900/40">
          <MlxLmSettingsOverview
            cliAvailable={cliAvailable}
            {...(cliProbe?.detail ? { cliDetail: cliProbe.detail } : {})}
            serverRunning={serverStatus.running}
            serverPort={settings.port}
          />

          <MlxLmCollapsibleSection
            title="연결 설정"
            subtitle={`${settings.host}:${settings.port}`}
            open={connectionOpen}
            onOpenChange={setConnectionOpen}
          >
            <MlxLmConnectionFields
              settings={settings}
              disabled={busy}
              onChange={persistSettings}
            />
          </MlxLmCollapsibleSection>

          <MlxLmCollapsibleSection
            title="모델"
            subtitle="설치 · 검색 · 다운로드"
            open={modelsOpen}
            onOpenChange={setModelsOpen}
          >
            <MlxLmModelBrowser
              settings={settings}
              onSettingsChange={setSettings}
              cliAvailable={cliAvailable}
              disabled={busy}
            />
          </MlxLmCollapsibleSection>

          <MlxLmCollapsibleSection
            title="서버"
            subtitle={serverStatus.running ? `실행 중 :${settings.port}` : '중지됨'}
            open={serverOpen}
            onOpenChange={setServerOpen}
          >
            <MlxLmServerControls
              busy={busy}
              cliAvailable={cliAvailable}
              canStart={Boolean(settings.selectedModelId.trim())}
              serverRunning={serverStatus.running}
              loadedModels={serverStatus.models}
              onStart={handleStart}
              onStop={handleStop}
            />
          </MlxLmCollapsibleSection>
        </div>
      ) : null}
    </div>
  );
}
