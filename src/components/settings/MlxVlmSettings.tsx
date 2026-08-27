import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';
import { isTauriMacOS } from '@/utils/tauriPlatform';
import {
  loadMlxVlmSettings,
  MLX_VLM_SETTINGS_CHANGED_EVENT,
  saveMlxVlmSettings,
  type MlxVlmSettings,
} from '@/utils/mlxVlmSettingsStore';
import {
  getMlxVlmServerStatus,
  isMlxVlmRuntimeManagedByApp,
  probeMlxVlmToolkit,
  startMlxVlmServer,
  stopMlxVlmServer,
  type MlxVlmServerStatus,
  type MlxVlmToolkitStatus,
} from '@/utils/mlxVlmShell';
import { requestMlxVlmProviderSync } from '@/utils/llm/mlxVlmProviderAutoSync';
import { SETTINGS_SECTION_OPEN_EVENT } from '@/utils/settingsPageCatalog';
import MlxVlmCollapsibleSection from '@/components/settings/MlxVlmCollapsibleSection';
import MlxVlmConnectionFields from '@/components/settings/MlxVlmConnectionFields';
import MlxVlmModelBrowser from '@/components/settings/MlxVlmModelBrowser';
import MlxVlmRuntimeControls from '@/components/settings/MlxVlmRuntimeControls';
import MlxVlmServerLogPanel from '@/components/settings/MlxVlmServerLogPanel';
import MlxVlmSettingsOverview, {
  MlxVlmSettingsPanelTitle,
} from '@/components/settings/MlxVlmSettingsOverview';

export default function MlxVlmSettings() {
  const location = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(true);
  const [modelsOpen, setModelsOpen] = useState(true);
  const [runtimeOpen, setRuntimeOpen] = useState(true);
  const [serverLogOpen, setServerLogOpen] = useState(true);
  const [settings, setSettings] = useState(() => loadMlxVlmSettings());
  const [toolkit, setToolkit] = useState<MlxVlmToolkitStatus | null>(null);
  const [cliProbe, setCliProbe] = useState<{ available: boolean; detail?: string } | null>(null);
  const [runtimeStatus, setRuntimeStatus] = useState<MlxVlmServerStatus>({
    loaded: false,
    workerRunning: false,
    models: [],
    running: false,
  });
  const [busy, setBusy] = useState(false);

  const refreshStatus = useCallback(async () => {
    const [nextToolkit, status] = await Promise.all([
      probeMlxVlmToolkit(),
      getMlxVlmServerStatus(settings),
    ]);
    setToolkit(nextToolkit);
    setCliProbe({
      available: nextToolkit.available,
      ...(nextToolkit.detail ? { detail: nextToolkit.detail } : {}),
    });
    setRuntimeStatus(status);
  }, [settings]);

  const handleStart = useCallback(async () => {
    setBusy(true);
    setServerLogOpen(true);
    try {
      await startMlxVlmServer(settings);
      requestMlxVlmProviderSync();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load MLX-VLM model.');
    } finally {
      await refreshStatus();
      setBusy(false);
    }
  }, [refreshStatus, settings]);

  const handleStop = useCallback(async () => {
    setBusy(true);
    try {
      await stopMlxVlmServer();
      await refreshStatus();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop MLX-VLM runtime.');
    } finally {
      setBusy(false);
    }
  }, [refreshStatus]);

  useEffect(() => {
    if (!isTauriMacOS()) return undefined;
    void refreshStatus();
    const timer = window.setInterval(() => {
      void getMlxVlmServerStatus(settings).then(setRuntimeStatus);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [refreshStatus, settings]);

  useEffect(() => {
    if (runtimeStatus.workerRunning) setServerLogOpen(true);
  }, [runtimeStatus.workerRunning]);

  useEffect(() => {
    const onSettingsChanged = () => setSettings(loadMlxVlmSettings());
    window.addEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onSettingsChanged);
    return () => window.removeEventListener(MLX_VLM_SETTINGS_CHANGED_EVENT, onSettingsChanged);
  }, []);

  useEffect(() => {
    const hash = String(location.hash || '').replace(/^#/, '');
    if (hash === 'settings-mlx-vlm') {
      setPanelOpen(true);
      setModelsOpen(true);
    }
  }, [location.hash]);

  useEffect(() => {
    const onSectionOpen = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId?: string }>).detail?.sectionId;
      if (sectionId !== 'settings-mlx-vlm') return;
      setPanelOpen(true);
      setModelsOpen(true);
    };
    window.addEventListener(SETTINGS_SECTION_OPEN_EVENT, onSectionOpen);
    return () => window.removeEventListener(SETTINGS_SECTION_OPEN_EVENT, onSectionOpen);
  }, []);

  if (!isTauriMacOS()) return null;

  const cliAvailable = toolkit?.available === true;
  const hfCliAvailable = toolkit?.hfHubRunnable === true;
  const downloadReady = cliAvailable && hfCliAvailable;
  const loadedModel = runtimeStatus.models[0] || settings.selectedModelId;

  const persistSettings = (next: MlxVlmSettings) => {
    saveMlxVlmSettings(next);
    setSettings(next);
  };

  return (
    <div
      id="settings-mlx-vlm"
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
        <MlxVlmSettingsPanelTitle />
      </button>

      {panelOpen ? (
        <div className="space-y-3 border-t border-emerald-200/80 px-4 pb-4 pt-3 dark:border-emerald-900/40">
          <MlxVlmSettingsOverview
            toolkit={toolkit}
            cliAvailable={cliAvailable}
            {...(cliProbe?.detail ? { cliDetail: cliProbe.detail } : {})}
            runtimeLoaded={runtimeStatus.loaded}
            loadedModel={loadedModel}
            workerRunning={runtimeStatus.workerRunning}
            onRefresh={refreshStatus}
          />

          <MlxVlmCollapsibleSection
            title="연결 설정"
            subtitle={
              settings.hfToken.trim()
                ? 'HF token set'
                : settings.adapterPath.trim()
                  ? 'adapter configured'
                  : 'optional token / adapter'
            }
            open={connectionOpen}
            onOpenChange={setConnectionOpen}
          >
            <MlxVlmConnectionFields
              settings={settings}
              disabled={busy || runtimeStatus.loaded}
              onChange={persistSettings}
            />
          </MlxVlmCollapsibleSection>

          <MlxVlmCollapsibleSection
            title="모델"
            subtitle="설치 · 검색 · 다운로드"
            open={modelsOpen}
            onOpenChange={setModelsOpen}
          >
            <MlxVlmModelBrowser
              settings={settings}
              onSettingsChange={setSettings}
              cliAvailable={downloadReady}
              serverRunning={runtimeStatus.loaded}
              serverLoadedModels={runtimeStatus.models}
              disabled={busy}
            />
          </MlxVlmCollapsibleSection>

          <MlxVlmCollapsibleSection
            title="런타임"
            subtitle={
              runtimeStatus.loaded
                ? `loaded · ${loadedModel}`
                : runtimeStatus.workerRunning
                  ? 'worker running · model not loaded'
                  : 'not loaded'
            }
            open={runtimeOpen}
            onOpenChange={setRuntimeOpen}
          >
            <MlxVlmRuntimeControls
              busy={busy}
              cliAvailable={cliAvailable}
              canStart={Boolean(settings.selectedModelId.trim())}
              runtimeLoaded={runtimeStatus.loaded}
              workerRunning={runtimeStatus.workerRunning}
              loadedModels={runtimeStatus.models}
              onStart={handleStart}
              onStop={handleStop}
            />
            <MlxVlmServerLogPanel
              serverRunning={runtimeStatus.workerRunning}
              managedByApp={isMlxVlmRuntimeManagedByApp()}
              open={serverLogOpen}
              onOpenChange={setServerLogOpen}
            />
          </MlxVlmCollapsibleSection>
        </div>
      ) : null}
    </div>
  );
}
