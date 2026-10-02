import { useEffect, useState } from 'react';
import { getVersion } from '@tauri-apps/api/app';
import { IconRefresh } from '@/components/icons';
import { getLocalAppBuildId } from '@/utils/pwaUpdate';
import {
  isTauriAndroid,
  isTauriDesktopPlatform,
} from '@/utils/tauriPlatform';

type AppUpdateSectionProps = {
  onCheckAppUpdate?: () => void;
  isCheckingAppUpdate?: boolean;
  latestAppBuildId?: string;
};

/**
 * Platform-aware app version + update check panel (PWA / Tauri desktop / Android).
 */
export default function AppUpdateSection({
  onCheckAppUpdate,
  isCheckingAppUpdate = false,
  latestAppBuildId = '',
}: AppUpdateSectionProps) {
  const isAndroid = isTauriAndroid();
  const isDesktop = isTauriDesktopPlatform();
  const [nativeVersion, setNativeVersion] = useState('');

  useEffect(() => {
    if (!isAndroid && !isDesktop) return;
    let cancelled = false;
    void getVersion()
      .then((v) => {
        if (!cancelled) setNativeVersion(v.trim());
      })
      .catch(() => {
        if (!cancelled) setNativeVersion('');
      });
    return () => {
      cancelled = true;
    };
  }, [isAndroid, isDesktop]);

  const currentLabel = isAndroid || isDesktop
    ? nativeVersion || getLocalAppBuildId() || '알 수 없음'
    : getLocalAppBuildId() || '알 수 없음';

  const description = isAndroid
    ? '설치된 APK 버전을 확인하고, GitHub Release의 최신 APK가 있으면 내려받아 설치합니다. (알 수 없는 앱 설치 허용 필요)'
    : isDesktop
      ? '데스크톱 자동 업데이트로 최신 설치 패키지를 확인하고 적용합니다.'
      : '배포 빌드 해시와 서비스 워커(PWA) 캐시를 확인해 최신 버전이 있는지 확인하고, 바로 적용할 수 있습니다.';

  return (
    <div
      id="settings-app-update"
      tabIndex={-1}
      className="scroll-mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-odp-borderStrong dark:bg-odp-surface"
    >
      <h3 className="mb-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
        앱 업데이트
      </h3>
      <p className="mb-3 text-xs text-gray-600 dark:text-odp-muted">{description}</p>
      <dl className="mb-3 space-y-1 text-xs text-gray-600 dark:text-odp-muted">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          <dt className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">
            현재 버전
          </dt>
          <dd className="min-w-0 break-all font-mono">{currentLabel}</dd>
        </div>
        {latestAppBuildId ? (
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            <dt className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">
              최신 버전
            </dt>
            <dd className="min-w-0 break-all font-mono">{latestAppBuildId}</dd>
          </div>
        ) : null}
      </dl>
      <button
        type="button"
        onClick={() => onCheckAppUpdate?.()}
        disabled={isCheckingAppUpdate || typeof onCheckAppUpdate !== 'function'}
        className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <IconRefresh size={16} />
        {isCheckingAppUpdate
          ? '최신 버전 확인 중...'
          : isAndroid
            ? '최신 APK 확인 및 업데이트'
            : '최신 버전 확인 및 즉시 업데이트'}
      </button>
    </div>
  );
}
