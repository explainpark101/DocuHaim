import { useCallback, useEffect, useState } from 'react';
import { Switch } from 'radix-ui';
import { IconDownload, IconFolder } from '@/components/icons';
import Button from '@/components/Button';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  loadTauriDownloadSaveDialogEnabled,
  saveTauriDownloadSaveDialogEnabled,
} from '@/utils/tauriDownloadSettings';
import {
  describeTauriFastDownloadTarget,
  pickTauriFastDownloadFolder,
  saveTauriFastDownloadFolder,
} from '@/utils/tauriFastDownload';
import { setSettingsToggle, subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';

const switchRootClass = (checked: boolean) =>
  [
    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-400',
    checked
      ? 'border-blue-500 bg-blue-500 shadow-sm dark:border-blue-500 dark:bg-blue-500'
      : 'border-transparent bg-gray-300 dark:border-odp-borderStrong dark:bg-odp-borderStrong',
  ].join(' ');

const switchThumbClass =
  'block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform data-[state=checked]:translate-x-[1.125rem]';

export default function TauriDownloadSettings() {
  const [saveDialogEnabled, setSaveDialogEnabled] = useState(() =>
    loadTauriDownloadSaveDialogEnabled(),
  );
  const [fastTargetLabel, setFastTargetLabel] = useState('');
  const [fastFolderBusy, setFastFolderBusy] = useState(false);

  const refreshFastTarget = useCallback(async () => {
    if (!isTauriDesktopPlatform()) return;
    try {
      setFastTargetLabel(await describeTauriFastDownloadTarget());
    } catch {
      setFastTargetLabel('');
    }
  }, []);

  useEffect(() => {
    if (!isTauriDesktopPlatform()) return;
    setSaveDialogEnabled(loadTauriDownloadSaveDialogEnabled());
    void refreshFastTarget();
    return subscribeSettingsToggles((id, enabled) => {
      if (id === 'settings-tauri-download-save-dialog') {
        setSaveDialogEnabled(enabled);
      }
    });
  }, [refreshFastTarget]);

  const handlePickFastFolder = useCallback(async () => {
    setFastFolderBusy(true);
    try {
      const picked = await pickTauriFastDownloadFolder();
      if (picked) await refreshFastTarget();
    } finally {
      setFastFolderBusy(false);
    }
  }, [refreshFastTarget]);

  const handleResetFastFolder = useCallback(async () => {
    saveTauriFastDownloadFolder(null);
    await refreshFastTarget();
  }, [refreshFastTarget]);

  if (!isTauriDesktopPlatform()) return null;

  return (
    <div
      id="settings-tauri-download"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
        <IconDownload size={16} />
        데스크톱 앱 다운로드
      </h3>
      <p className="mb-3 text-xs text-gray-600 dark:text-odp-muted">
        Tauri 데스크톱 빌드에서 파일을 내려받을 때 저장 위치를 먼저 확인하거나, 빠른 다운로드
        폴더로 바로 저장할 수 있습니다. 완료 시 상단 토스트로 알려 줍니다.
      </p>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">
            다운로드 위치 사전 확인
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            켜면 파일마다 저장 대화상자를 열어 경로와 이름을 확인합니다. 끄면 아래 빠른 다운로드
            폴더(또는 시스템 다운로드 폴더)로 바로 저장합니다. (기본값: 켜짐)
          </p>
        </div>
        <Switch.Root
          className={switchRootClass(saveDialogEnabled)}
          checked={saveDialogEnabled}
          onCheckedChange={(checked) => {
            setSaveDialogEnabled(checked);
            saveTauriDownloadSaveDialogEnabled(checked);
            setSettingsToggle('settings-tauri-download-save-dialog', checked);
          }}
          aria-label="다운로드 위치 사전 확인"
        >
          <Switch.Thumb className={switchThumbClass} />
        </Switch.Root>
      </div>

      {!saveDialogEnabled ? (
        <div className="mt-4 rounded-md border border-gray-200 bg-white/70 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40">
          <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">
            빠른 다운로드 폴더
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
            Storage API처럼 폴더를 지정해 두면 확인 없이 바로 저장합니다. 지정하지 않으면 Tauri
            시스템 다운로드 폴더를 사용합니다.
          </p>
          <p className="mt-2 break-all font-mono text-[11px] text-gray-600 dark:text-odp-muted">
            {fastTargetLabel || '불러오는 중…'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              disabled={fastFolderBusy}
              onClick={() => void handlePickFastFolder()}
            >
              <IconFolder size={14} />
              폴더 지정
            </Button>
            <Button
              type="button"
              variant="tertiary"
              disabled={fastFolderBusy}
              onClick={() => void handleResetFastFolder()}
            >
              <IconDownload size={14} />
              시스템 다운로드 폴더
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
