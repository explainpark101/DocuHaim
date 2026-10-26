import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';
import { isTauriAndroid } from '@/utils/tauriPlatform';

const GITHUB_LATEST_API =
  'https://api.github.com/repos/explainpark101/DocuHaim/releases/latest';

const ANDROID_APK_DOWNLOAD_PROGRESS_EVENT = 'android-apk-download-progress';

export type TauriAndroidUpdateCheckResult =
  | {
      ok: true;
      localVersion: string;
      remoteVersion: string;
      updateAvailable: boolean;
      apkUrl?: string;
      apkName?: string;
    }
  | {
      ok: false;
      localVersion: string;
      error: string;
      remoteVersion?: string;
      updateAvailable?: boolean;
    };

export type AndroidUpdateUiPhase =
  | 'idle'
  | 'downloading'
  | 'ready'
  | 'installing'
  | 'error';

export type AndroidUpdateUiState = {
  phase: AndroidUpdateUiPhase;
  /** 0–100 when Content-Length known; null while indeterminate. */
  percent: number | null;
  version: string;
  error: string;
};

type GithubReleaseAsset = {
  name?: string;
  browser_download_url?: string;
};

type GithubLatestRelease = {
  tag_name?: string;
  assets?: GithubReleaseAsset[];
};

type PendingApk = {
  url: string;
  name: string;
  version: string;
  localPath?: string;
};

type ProgressPayload = {
  downloaded?: number;
  total?: number | null;
  percent?: number | null;
};

let pendingApk: PendingApk | null = null;
let downloadPromise: Promise<string> | null = null;
let progressUnlisten: (() => void) | null = null;

const uiListeners = new Set<() => void>();

let uiState: AndroidUpdateUiState = {
  phase: 'idle',
  percent: null,
  version: '',
  error: '',
};

function setUiState(patch: Partial<AndroidUpdateUiState>): void {
  uiState = { ...uiState, ...patch };
  uiListeners.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore subscriber errors
    }
  });
}

export function getAndroidUpdateUiState(): AndroidUpdateUiState {
  return uiState;
}

export function subscribeAndroidUpdateUi(listener: () => void): () => void {
  uiListeners.add(listener);
  return () => {
    uiListeners.delete(listener);
  };
}

export function clearPendingTauriAndroidUpdate(): void {
  pendingApk = null;
  downloadPromise = null;
  void detachProgressListener();
  setUiState({ phase: 'idle', percent: null, version: '', error: '' });
}

export function hasPendingTauriAndroidUpdate(): boolean {
  return pendingApk !== null;
}

export function hasDownloadedTauriAndroidUpdate(): boolean {
  return Boolean(pendingApk?.localPath);
}

function normalizeSemver(tag: string): string {
  return tag.trim().replace(/^v/i, '');
}

function compareSemver(a: string, b: string): number {
  const pa = normalizeSemver(a)
    .split(/[.+-]/)
    .map((p) => Number.parseInt(p, 10));
  const pb = normalizeSemver(b)
    .split(/[.+-]/)
    .map((p) => Number.parseInt(p, 10));
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i += 1) {
    const x = Number.isFinite(pa[i]) ? (pa[i] as number) : 0;
    const y = Number.isFinite(pb[i]) ? (pb[i] as number) : 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

async function resolvePreferredAbi(): Promise<string> {
  try {
    const abi = await invoke<string>('android_primary_abi');
    if (typeof abi === 'string' && abi.trim()) return abi.trim();
  } catch {
    // fall through
  }
  return 'arm64-v8a';
}

function pickApkAsset(
  assets: GithubReleaseAsset[],
  version: string,
  abi: string,
): GithubReleaseAsset | null {
  const versionToken = normalizeSemver(version);
  const preferred = [
    `DocuHaim_${versionToken}_${abi}-debug.apk`,
    `DocuHaim_${versionToken}_universal-debug.apk`,
  ];
  for (const name of preferred) {
    const hit = assets.find((a) => a.name === name && a.browser_download_url);
    if (hit) return hit;
  }
  // Fuzzy: any matching ABI debug APK for this version.
  const fuzzy = assets.find(
    (a) =>
      typeof a.name === 'string' &&
      a.browser_download_url &&
      a.name.includes(versionToken) &&
      a.name.includes(abi) &&
      a.name.endsWith('-debug.apk'),
  );
  if (fuzzy) return fuzzy;
  return (
    assets.find(
      (a) =>
        typeof a.name === 'string' &&
        a.browser_download_url &&
        a.name.includes('universal') &&
        a.name.endsWith('-debug.apk'),
    ) ?? null
  );
}

export async function checkTauriAndroidUpdate(): Promise<TauriAndroidUpdateCheckResult> {
  if (!isTauriAndroid()) {
    return { ok: false, localVersion: '', error: 'not-tauri-android' };
  }

  let localVersion = '';
  try {
    localVersion = (await getVersion()).trim();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error ?? '');
    return { ok: false, localVersion: '', error: message || 'getVersion failed' };
  }

  try {
    const response = await fetch(GITHUB_LATEST_API, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'DocuHaim-Android-Updater',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      return {
        ok: false,
        localVersion,
        error: `GitHub HTTP ${response.status}`,
      };
    }
    const payload = (await response.json()) as GithubLatestRelease;
    const remoteVersion = normalizeSemver(payload.tag_name || '');
    if (!remoteVersion) {
      return { ok: false, localVersion, error: 'missing release tag' };
    }

    const updateAvailable = compareSemver(localVersion, remoteVersion) < 0;
    if (!updateAvailable) {
      clearPendingTauriAndroidUpdate();
      return {
        ok: true,
        localVersion,
        remoteVersion,
        updateAvailable: false,
      };
    }

    const abi = await resolvePreferredAbi();
    const asset = pickApkAsset(payload.assets || [], remoteVersion, abi);
    if (!asset?.browser_download_url || !asset.name) {
      return {
        ok: false,
        localVersion,
        remoteVersion,
        error: `No APK asset for ABI ${abi}`,
        updateAvailable: true,
      };
    }

    const samePending =
      pendingApk &&
      pendingApk.url === asset.browser_download_url &&
      pendingApk.name === asset.name &&
      pendingApk.version === remoteVersion;

    if (!samePending) {
      pendingApk = {
        url: asset.browser_download_url,
        name: asset.name,
        version: remoteVersion,
      };
      downloadPromise = null;
      if (uiState.phase !== 'downloading' && uiState.phase !== 'installing') {
        setUiState({
          phase: 'idle',
          percent: null,
          version: remoteVersion,
          error: '',
        });
      }
    } else if (pendingApk) {
      pendingApk = {
        ...pendingApk,
        url: asset.browser_download_url,
        name: asset.name,
        version: remoteVersion,
      };
    }

    return {
      ok: true,
      localVersion,
      remoteVersion,
      updateAvailable: true,
      apkUrl: asset.browser_download_url,
      apkName: asset.name,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error ?? '');
    console.warn('Tauri Android update check failed:', error);
    return {
      ok: false,
      localVersion,
      error: message || 'unknown',
      updateAvailable: hasPendingTauriAndroidUpdate(),
    };
  }
}

function invokeErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) return message;
  }
  return String(error ?? '');
}

function mapInstallError(error: unknown): Error {
  const message = invokeErrorMessage(error);
  const lower = message.toLowerCase();
  if (message.includes('NEED_UNKNOWN_SOURCES') || lower.includes('unknown_sources')) {
    return new Error(
      '이 앱에서 APK를 설치하려면 방금 연 설정에서 「알 수 없는 앱 설치」를 허용한 뒤, 다시 「업데이트」를 눌러 주세요.',
    );
  }
  if (
    lower.includes('incompatible') ||
    lower.includes('signature') ||
    lower.includes('conflict') ||
    lower.includes('패키지')
  ) {
    return new Error(
      '기존 앱과 서명(패키지)이 달라 업데이트할 수 없습니다. DocuHaim을 삭제한 뒤 GitHub Release의 최신 APK를 다시 설치해 주세요. (이후부터는 같은 sideload 서명으로 자동 업데이트가 됩니다.)',
    );
  }
  return error instanceof Error ? error : new Error(message || 'Android update install failed');
}

async function detachProgressListener(): Promise<void> {
  if (!progressUnlisten) return;
  try {
    progressUnlisten();
  } catch {
    // ignore
  }
  progressUnlisten = null;
}

async function attachProgressListener(): Promise<void> {
  await detachProgressListener();
  try {
    const { listen } = await import('@tauri-apps/api/event');
    progressUnlisten = await listen<ProgressPayload>(
      ANDROID_APK_DOWNLOAD_PROGRESS_EVENT,
      (event) => {
        const payload = event.payload || {};
        const raw = payload.percent;
        const percent =
          typeof raw === 'number' && Number.isFinite(raw)
            ? Math.max(0, Math.min(100, Math.floor(raw)))
            : null;
        if (uiState.phase === 'downloading') {
          setUiState({ percent });
        }
      },
    );
  } catch (error) {
    console.warn('Android APK progress listener failed:', error);
  }
}

/**
 * Download the pending APK in the background. Safe to call repeatedly (deduped).
 * App remains usable; progress is published via subscribeAndroidUpdateUi.
 */
export async function downloadPendingTauriAndroidUpdate(): Promise<string> {
  if (!pendingApk) {
    throw new Error('No pending Android update');
  }
  if (pendingApk.localPath) {
    setUiState({
      phase: 'ready',
      percent: 100,
      version: pendingApk.version,
      error: '',
    });
    return pendingApk.localPath;
  }
  if (downloadPromise) {
    return downloadPromise;
  }

  const snapshot = pendingApk;
  setUiState({
    phase: 'downloading',
    percent: 0,
    version: snapshot.version,
    error: '',
  });

  downloadPromise = (async () => {
    const { ensureAndroidDownloadNotificationPermission, notifyAndroidDownloadedFile } =
      await import('@/utils/androidDownloadNotification');
    await ensureAndroidDownloadNotificationPermission();
    await attachProgressListener();
    try {
      const path = await invoke<string>('android_download_apk', {
        url: snapshot.url,
        fileName: snapshot.name,
      });
      void notifyAndroidDownloadedFile(snapshot.name, '업데이트 다운로드 완료');
      if (pendingApk && pendingApk.url === snapshot.url && pendingApk.name === snapshot.name) {
        pendingApk = { ...pendingApk, localPath: path };
      } else {
        pendingApk = { ...snapshot, localPath: path };
      }
      setUiState({
        phase: 'ready',
        percent: 100,
        version: snapshot.version,
        error: '',
      });
      return path;
    } catch (error: unknown) {
      const message = invokeErrorMessage(error);
      setUiState({
        phase: 'error',
        percent: null,
        version: snapshot.version,
        error: message || 'Android update download failed',
      });
      throw error instanceof Error ? error : new Error(message || 'Android update download failed');
    } finally {
      await detachProgressListener();
      downloadPromise = null;
    }
  })();

  return downloadPromise;
}

/**
 * Install a previously downloaded APK. Keeps pending metadata on failure so the
 * status-bar Update button can retry after the user cancels the system/install flow.
 */
export async function installPendingTauriAndroidUpdate(): Promise<void> {
  if (!pendingApk) {
    throw new Error('No pending Android update');
  }

  let localPath = pendingApk.localPath;
  if (!localPath) {
    localPath = await downloadPendingTauriAndroidUpdate();
  }

  const snapshot = pendingApk;
  setUiState({
    phase: 'installing',
    percent: 100,
    version: snapshot.version,
    error: '',
  });

  try {
    await invoke('android_install_apk', { path: localPath });
    // Installer UI takes over; leave ready so Cancel / retry still works if user backs out.
    setUiState({
      phase: 'ready',
      percent: 100,
      version: snapshot.version,
      error: '',
    });
  } catch (error: unknown) {
    setUiState({
      phase: 'ready',
      percent: 100,
      version: snapshot.version,
      error: '',
    });
    throw mapInstallError(error);
  }
}

const ANDROID_UPDATE_POLL_MS = 5 * 60 * 1000;

type AndroidUpdateListener = (result: TauriAndroidUpdateCheckResult) => void;

let androidUpdateListener: AndroidUpdateListener | null = null;
let androidUpdatePollInstalled = false;

export function setTauriAndroidUpdateListener(
  listener: AndroidUpdateListener | null,
): void {
  androidUpdateListener = listener;
}

export function initTauriAndroidUpdaterPolling(): void {
  if (!isTauriAndroid() || androidUpdatePollInstalled) return;
  androidUpdatePollInstalled = true;

  const runCheck = () => {
    void checkTauriAndroidUpdate().then((result) => {
      if (result.updateAvailable && androidUpdateListener) {
        androidUpdateListener(result);
      }
    });
  };

  runCheck();
  window.setInterval(runCheck, ANDROID_UPDATE_POLL_MS);
  const onVisible = () => {
    if (document.visibilityState === 'visible') runCheck();
  };
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('focus', runCheck);
  window.addEventListener('pageshow', runCheck);
}
