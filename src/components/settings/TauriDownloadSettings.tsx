import { useCallback, useEffect, useState } from 'react';
import { RadioGroup, Switch } from 'radix-ui';
import { IconDownload, IconFolder, IconTrash } from '@/components/icons';
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
import {
  convertOpenWithAppCacheRetentionValue,
  loadOpenWithAppCacheRetentionSettings,
  OPEN_WITH_APP_CACHE_RETENTION_CHANGED_EVENT,
  OPEN_WITH_APP_CACHE_RETENTION_UNIT_OPTIONS,
  saveOpenWithAppCacheRetentionSettings,
  type OpenWithAppCacheRetentionSettings,
  type OpenWithAppCacheRetentionUnit,
} from '@/utils/tauriOpenWithAppCacheSettings';
import { purgeExpiredOpenWithAppCache } from '@/utils/tauriOpenWithAppCache';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';
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
  const [retention, setRetention] = useState<OpenWithAppCacheRetentionSettings>(() =>
    loadOpenWithAppCacheRetentionSettings(),
  );
  const [purgeBusy, setPurgeBusy] = useState(false);

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
    setRetention(loadOpenWithAppCacheRetentionSettings());
    void refreshFastTarget();
    const onRetention = () => setRetention(loadOpenWithAppCacheRetentionSettings());
    window.addEventListener(OPEN_WITH_APP_CACHE_RETENTION_CHANGED_EVENT, onRetention);
    const unsub = subscribeSettingsToggles((id, enabled) => {
      if (id === 'settings-tauri-download-save-dialog') {
        setSaveDialogEnabled(enabled);
      }
    });
    return () => {
      window.removeEventListener(OPEN_WITH_APP_CACHE_RETENTION_CHANGED_EVENT, onRetention);
      unsub();
    };
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

  const commitRetention = useCallback((next: OpenWithAppCacheRetentionSettings) => {
    setRetention(next);
    saveOpenWithAppCacheRetentionSettings(next);
    void purgeExpiredOpenWithAppCache().catch((error) => {
      console.warn('Open-with-app cache purge after settings change failed:', error);
    });
  }, []);

  const handlePurgeNow = useCallback(async () => {
    setPurgeBusy(true);
    try {
      await purgeExpiredOpenWithAppCache();
    } finally {
      setPurgeBusy(false);
    }
  }, []);

  if (!isTauriDesktopPlatform()) return null;

  return (
    <div id="settings-tauri-download" tabIndex={-1} className="scroll-mt-4 space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
        <IconDownload size={16} />
        파일 다운로드
      </h3>

      <section className={settingsSectionCardClass('sky')} aria-label="다운로드 위치">
        <p className="text-xs text-gray-600 dark:text-odp-muted">
          Tauri 데스크톱에서 파일을 내려받을 때 저장 위치를 먼저 확인하거나, 빠른 다운로드 폴더로
          바로 저장할 수 있습니다. 완료 시 상단 토스트로 알려 줍니다.
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
          <div className="rounded-md border border-gray-200 bg-white/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/40">
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
      </section>

      <section className={settingsSectionCardClass('violet')} aria-label="앱 열기 임시 캐시">
        <div className="text-xs font-semibold text-gray-700 dark:text-odp-fg">앱 열기 임시 캐시</div>
        <p className="text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
          「앱 열기」는 다운로드 폴더를 묻지 않고 OS Temp 아래{' '}
          <span className="font-mono">DocuHaim/open-with-app</span>에 저장한 뒤 기본 앱으로 엽니다.
          설정한 기간이 지난 파일은 자동으로 삭제합니다. (기본값: 3개월)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-odp-fg">
            <span className="sr-only">보관 기간</span>
            <input
              type="number"
              min={0.1}
              step={retention.unit === 'hour' ? 1 : 0.1}
              value={retention.value}
              onChange={(e) => {
                const next = Number(e.target.value);
                commitRetention({
                  ...retention,
                  value: Number.isFinite(next) && next > 0 ? next : retention.value,
                });
              }}
              className="w-24 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
              aria-label="앱 열기 임시 캐시 보관 기간"
            />
          </label>
          <RadioGroup.Root
            className="flex flex-wrap items-center gap-3 text-xs text-gray-700 dark:text-odp-fg"
            value={retention.unit}
            onValueChange={(next) => {
              if (
                next !== 'hour' &&
                next !== 'day' &&
                next !== 'month' &&
                next !== 'year'
              ) {
                return;
              }
              const unit = next as OpenWithAppCacheRetentionUnit;
              commitRetention({
                unit,
                value: convertOpenWithAppCacheRetentionValue(
                  retention.value,
                  retention.unit,
                  unit,
                ),
              });
            }}
            aria-label="앱 열기 임시 캐시 보관 단위"
          >
            {OPEN_WITH_APP_CACHE_RETENTION_UNIT_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer">
                <RadioGroup.Item
                  value={opt.value}
                  className="size-3.5 shrink-0 rounded-full border border-gray-400 bg-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                >
                  <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-1.5 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <span>{opt.label}</span>
              </label>
            ))}
          </RadioGroup.Root>
        </div>
        <div>
          <Button
            type="button"
            variant="secondary"
            disabled={purgeBusy}
            onClick={() => void handlePurgeNow()}
          >
            <IconTrash size={14} />
            만료 캐시 지금 정리
          </Button>
        </div>
      </section>
    </div>
  );
}
