import { getVersion } from '@tauri-apps/api/app';
import { invoke } from '@tauri-apps/api/core';
import { isTauriAndroid } from '@/utils/tauriPlatform';

const GITHUB_LATEST_API =
  'https://api.github.com/repos/explainpark101/DocuHaim/releases/latest';

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

type GithubReleaseAsset = {
  name?: string;
  browser_download_url?: string;
};

type GithubLatestRelease = {
  tag_name?: string;
  assets?: GithubReleaseAsset[];
};

let pendingApk: { url: string; name: string; version: string } | null = null;

export function clearPendingTauriAndroidUpdate(): void {
  pendingApk = null;
}

export function hasPendingTauriAndroidUpdate(): boolean {
  return pendingApk !== null;
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
      pendingApk = null;
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

    pendingApk = {
      url: asset.browser_download_url,
      name: asset.name,
      version: remoteVersion,
    };
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

export async function installPendingTauriAndroidUpdate(): Promise<void> {
  if (!pendingApk) {
    throw new Error('No pending Android update');
  }
  const { url, name } = pendingApk;
  pendingApk = null;
  try {
    await invoke<string>('android_download_and_install_apk', {
      url,
      fileName: name,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error ?? '');
    const lower = message.toLowerCase();
    if (
      lower.includes('incompatible') ||
      lower.includes('signature') ||
      lower.includes('conflict') ||
      lower.includes('패키지')
    ) {
      throw new Error(
        '기존 앱과 서명(패키지)이 달라 업데이트할 수 없습니다. DocuHaim을 삭제한 뒤 GitHub Release의 최신 APK를 다시 설치해 주세요. (이후부터는 같은 sideload 서명으로 자동 업데이트가 됩니다.)',
      );
    }
    throw error instanceof Error ? error : new Error(message || 'Android update install failed');
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
