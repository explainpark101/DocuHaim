import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  loadLlamaCppSettings,
  LLAMA_CPP_SETTINGS_CHANGED_EVENT,
  saveLlamaCppSettings,
  resolveLlamaCppModelPath,
  type LlamaCppSettings,
} from '@/utils/llamaCppSettingsStore';
import {
  getLlamaCppServerStatus,
  isLlamaCppRuntimeManagedByApp,
  probeLlamaCppToolkit,
  startLlamaCppServer,
  stopLlamaCppServer,
  type LlamaCppServerStatus,
  type LlamaCppToolkitStatus,
} from '@/utils/llamaCppShell';
import { requestLlamaCppProviderSync } from '@/utils/llm/llamaCppProviderAutoSync';
import {
  buildLlamaCppLoadFailureAlertMessage,
  requestLlamaCppRedownloadFocus,
  resolveLlamaCppLoadFailure,
} from '@/utils/llm/llamaCppLoadErrorHelp';
import { SETTINGS_SECTION_OPEN_EVENT } from '@/utils/settingsPageCatalog';
import LlamaCppCollapsibleSection from '@/components/settings/LlamaCppCollapsibleSection';
import LlamaCppConnectionFields from '@/components/settings/LlamaCppConnectionFields';
import LlamaCppModelBrowser from '@/components/settings/LlamaCppModelBrowser';
import LlamaCppRuntimeControls from '@/components/settings/LlamaCppRuntimeControls';
import LlamaCppServerLogPanel from '@/components/settings/LlamaCppServerLogPanel';
import LlamaCppSettingsOverview, {
  LlamaCppSettingsPanelTitle,
} from '@/components/settings/LlamaCppSettingsOverview';

export default function LlamaCppSettings() {
  const location = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(true);
  const [modelsOpen, setModelsOpen] = useState(true);
  const [runtimeOpen, setRuntimeOpen] = useState(true);
  const [serverLogOpen, setServerLogOpen] = useState(true);
  const [settings, setSettings] = useState(() => loadLlamaCppSettings());
  const [toolkit, setToolkit] = useState<LlamaCppToolkitStatus | null>(null);
  const [cliProbe, setCliProbe] = useState<{ available: boolean; detail?: string } | null>(null);
  const [runtimeStatus, setRuntimeStatus] = useState<LlamaCppServerStatus>({
    loaded: false,
    serverRunning: false,
    models: [],
    running: false,
    baseUrl: null,
  });
  const [busy, setBusy] = useState(false);

  const refreshStatus = useCallback(async () => {
    const [nextToolkit, status] = await Promise.all([
      probeLlamaCppToolkit(settings),
      getLlamaCppServerStatus(settings),
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
      await startLlamaCppServer(settings);
      requestLlamaCppProviderSync();
    } catch (err) {
      const failure = resolveLlamaCppLoadFailure(err);
      if (failure.suggestRedownload) {
        requestLlamaCppRedownloadFocus(settings.selectedModelId);
        setPanelOpen(true);
        setModelsOpen(true);
      }
      alert(buildLlamaCppLoadFailureAlertMessage(err, settings.selectedModelId));
    } finally {
      setBusy(false);
      await refreshStatus();
    }
  }, [refreshStatus, settings]);

  const handleStop = useCallback(async () => {
    setBusy(true);
    try {
      await stopLlamaCppServer();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to stop llama.cpp server.');
    } finally {
      setBusy(false);
      await refreshStatus();
    }
  }, [refreshStatus]);

  useEffect(() => {
    void refreshStatus();
    const timer = window.setInterval(() => {
      void refreshStatus();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [refreshStatus]);

  useEffect(() => {
    const onSettingsChanged = () => setSettings(loadLlamaCppSettings());
    window.addEventListener(LLAMA_CPP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
    return () => window.removeEventListener(LLAMA_CPP_SETTINGS_CHANGED_EVENT, onSettingsChanged);
  }, []);

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (hash === 'settings-llama-cpp') {
      setPanelOpen(true);
    }
  }, [location.hash]);

  useEffect(() => {
    const onSectionOpen = (event: Event) => {
      const sectionId = (event as CustomEvent<{ sectionId?: string }>).detail?.sectionId;
      if (sectionId === 'settings-llama-cpp') setPanelOpen(true);
    };
    window.addEventListener(SETTINGS_SECTION_OPEN_EVENT, onSectionOpen);
    return () => window.removeEventListener(SETTINGS_SECTION_OPEN_EVENT, onSectionOpen);
  }, []);

  if (!isTauriDesktopPlatform()) return null;

  const cliAvailable = toolkit?.available === true;
  const downloadReady = toolkit?.hfDownloadAvailable === true;
  const loadedModel =
    runtimeStatus.models[0] ||
    resolveLlamaCppModelPath(settings) ||
    '모델 미선택';

  const persistSettings = (next: LlamaCppSettings) => {
    saveLlamaCppSettings(next);
    setSettings(next);
  };

  return (
    <SettingsCollapsibleContainer
      id="settings-llama-cpp"
      contentKey="settings-llama-cpp-panel"
      open={panelOpen}
      onOpenChange={setPanelOpen}
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-sky-200 bg-sky-50/70 dark:border-sky-900/50 dark:bg-sky-950/25"
    >
      <SettingsCollapsibleHeading
        unstyled
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition hover:bg-sky-100/50 dark:hover:bg-sky-950/30"
      >
        <LlamaCppSettingsPanelTitle />
      </SettingsCollapsibleHeading>

      <SettingsCollapsibleContent>
        <div className="space-y-3 border-t border-sky-200/80 px-4 pb-4 pt-3 dark:border-sky-900/40">
          <LlamaCppSettingsOverview
            toolkit={toolkit}
            cliAvailable={cliAvailable}
            {...(cliProbe?.detail ? { cliDetail: cliProbe.detail } : {})}
            runtimeLoaded={runtimeStatus.loaded}
            loadedModel={loadedModel}
            serverRunning={runtimeStatus.serverRunning}
            baseUrl={runtimeStatus.baseUrl}
            onRefresh={refreshStatus}
          />

          <LlamaCppCollapsibleSection
            title="연결"
            subtitle="host · port · binary · API key"
            open={connectionOpen}
            onOpenChange={setConnectionOpen}
          >
            <LlamaCppConnectionFields
              settings={settings}
              disabled={busy || runtimeStatus.loaded}
              onChange={persistSettings}
            />
          </LlamaCppCollapsibleSection>

          <LlamaCppCollapsibleSection
            title="모델"
            subtitle="GGUF · 검색 · 다운로드"
            open={modelsOpen}
            onOpenChange={setModelsOpen}
          >
            <LlamaCppModelBrowser
              settings={settings}
              onSettingsChange={persistSettings}
              downloadReady={downloadReady}
              disabled={busy}
            />
          </LlamaCppCollapsibleSection>

          <LlamaCppCollapsibleSection
            title="런타임"
            subtitle={
              runtimeStatus.loaded
                ? `running · ${loadedModel}`
                : runtimeStatus.serverRunning
                  ? 'starting'
                  : 'stopped'
            }
            open={runtimeOpen}
            onOpenChange={setRuntimeOpen}
          >
            <LlamaCppRuntimeControls
              busy={busy}
              cliAvailable={cliAvailable}
              canStart={Boolean(resolveLlamaCppModelPath(settings))}
              runtimeLoaded={runtimeStatus.loaded}
              serverRunning={runtimeStatus.serverRunning}
              loadedModels={runtimeStatus.models}
              onStart={handleStart}
              onStop={handleStop}
            />
            <LlamaCppServerLogPanel
              serverRunning={runtimeStatus.serverRunning}
              managedByApp={isLlamaCppRuntimeManagedByApp()}
              open={serverLogOpen}
              onOpenChange={setServerLogOpen}
            />
          </LlamaCppCollapsibleSection>
        </div>
      </SettingsCollapsibleContent>
    </SettingsCollapsibleContainer>
  );
}
