/**
 * Boot splash progress UI — runs before the main app graph finishes loading.
 * Production: build-time `#boot-manifest` byte budget for a stable bar.
 * Dev: grow budget dynamically from observed resources (fastest visual feedback).
 */

import {
  BOOT_MANIFEST_SCRIPT_ID,
  formatBootBytes,
  labelForBootFile,
  type BootManifest,
  type BootManifestAsset,
} from '@/boot/bootManifest';
import {
  BOOT_SPLASH_TIP_INTERVAL_MS,
  BOOT_SPLASH_TIPS,
} from '@/boot/bootSplashTips';

export type BootSplashApi = {
  /** Updates the detail row (loading specifics). Tip row rotates separately. */
  setStatus: (status: string, detail?: string) => void;
  setProgress: (ratio: number) => void;
  markResource: (url: string, transferBytes?: number) => void;
  complete: () => void;
};

declare global {
  interface Window {
    __docuhaimBootSplash?: BootSplashApi;
  }
}

const DEV_DEFAULT_CHUNK_BYTES = 48_000;
const DEV_HEADROOM_BYTES = 180_000;
const DEV_CREEP_CAP = 0.86;
const DEV_CREEP_STEP = 0.012;
const DEV_CREEP_MS = 400;

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function isDevMode(): boolean {
  try {
    return Boolean(import.meta.env?.DEV);
  } catch {
    return false;
  }
}

function readEmbeddedManifest(): BootManifest | null {
  const el = document.getElementById(BOOT_MANIFEST_SCRIPT_ID);
  if (!el?.textContent?.trim()) return null;
  try {
    const parsed = JSON.parse(el.textContent) as BootManifest;
    if (parsed?.version !== 1 || !Array.isArray(parsed.assets)) return null;
    if (!(parsed.totalBytes > 0) || parsed.assets.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function urlToAssetKey(rawUrl: string): string {
  let pathPart = rawUrl.split('?')[0] || rawUrl;
  try {
    pathPart = new URL(rawUrl, location.href).pathname;
  } catch {
    // keep
  }
  return pathPart.replace(/^\//, '');
}

function matchManifestAsset(
  rawUrl: string,
  byFile: Map<string, BootManifestAsset>,
): BootManifestAsset | undefined {
  const key = urlToAssetKey(rawUrl);
  const direct = byFile.get(key);
  if (direct) return direct;
  for (const asset of byFile.values()) {
    if (key.endsWith(asset.file) || key.endsWith(`/${asset.file}`)) return asset;
  }
  return undefined;
}

function isTrackableResourceUrl(rawUrl: string): boolean {
  const pathOnly = (rawUrl.split('?')[0] || rawUrl).toLowerCase();
  if (/\.(js|mjs|css|wasm|tsx?|jsx?)(\?|$)/i.test(pathOnly)) return true;
  if (pathOnly.includes('/assets/') || pathOnly.includes('/src/')) return true;
  if (pathOnly.includes('/node_modules/') || pathOnly.includes('/@fs/')) return true;
  if (pathOnly.includes('/@id/') || pathOnly.includes('/@vite/')) return true;
  return false;
}

function estimateTransferBytes(rawUrl: string, hinted?: number): number {
  if (typeof hinted === 'number' && hinted > 0) return hinted;
  const path = (rawUrl.split('?')[0] || rawUrl).toLowerCase();
  if (path.endsWith('.css')) return 24_000;
  if (path.includes('/src/')) return 16_000;
  return DEV_DEFAULT_CHUNK_BYTES;
}

export function initBootSplash(): BootSplashApi {
  if (typeof window !== 'undefined' && window.__docuhaimBootSplash) {
    return window.__docuhaimBootSplash;
  }

  const statusEl = document.getElementById('boot-splash-status');
  const detailEl = document.getElementById('boot-splash-detail');
  const fillEl = document.getElementById('boot-splash-bar-fill');
  const barEl = document.getElementById('boot-splash-bar');

  const isDev = isDevMode();
  const manifest = isDev ? null : readEmbeddedManifest();
  const byFile = new Map<string, BootManifestAsset>();
  for (const asset of manifest?.assets || []) {
    byFile.set(asset.file.replace(/^\//, ''), asset);
  }

  const useByteBudget = Boolean(manifest && manifest.totalBytes > 0 && byFile.size > 0);
  const useDynamicDev = isDev || !useByteBudget;

  let totalBytes = useByteBudget ? manifest!.totalBytes : 0;
  let loadedBytes = 0;
  let loadedCount = 0;
  let floor = 0.04;
  let completed = false;
  let lastLabel = '';
  let tipIndex = 0;
  let tipTimer: ReturnType<typeof setInterval> | null = null;
  let creepTimer: ReturnType<typeof setInterval> | null = null;
  const seen = new Set<string>();

  const paintTip = () => {
    if (completed || !statusEl || BOOT_SPLASH_TIPS.length === 0) return;
    statusEl.textContent = BOOT_SPLASH_TIPS[tipIndex % BOOT_SPLASH_TIPS.length] || '';
  };

  const paintBar = () => {
    if (completed) return;
    let ratio: number;
    if (useByteBudget) {
      ratio = clamp01(Math.max(floor, totalBytes > 0 ? loadedBytes / totalBytes : floor));
    } else {
      // Dev / no manifest: loaded vs growing headroom budget.
      const denom = Math.max(totalBytes, loadedBytes + DEV_HEADROOM_BYTES, 1);
      ratio = clamp01(Math.max(floor, loadedBytes / denom));
    }
    const pct = Math.round(ratio * 100);
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (barEl) barEl.setAttribute('aria-valuenow', String(pct));
    return pct;
  };

  const paintDetail = (explicit?: string) => {
    if (completed || !detailEl) return;
    if (explicit != null) {
      detailEl.textContent = explicit;
      return;
    }
    const pct = paintBar() ?? 0;
    if (useByteBudget) {
      const label = lastLabel ? ` · ${lastLabel}` : '';
      detailEl.textContent =
        `${formatBootBytes(loadedBytes)} / ${formatBootBytes(totalBytes)} · ${pct}%${label}`;
      return;
    }
    if (loadedCount > 0) {
      const label = lastLabel ? ` · ${lastLabel}` : '';
      const budget = Math.max(totalBytes, loadedBytes + DEV_HEADROOM_BYTES);
      detailEl.textContent =
        `${formatBootBytes(loadedBytes)} / ~${formatBootBytes(budget)} · ${pct}%${label}`;
      return;
    }
    detailEl.textContent = '모듈을 불러오는 중…';
  };

  const render = (detail?: string) => {
    if (completed) return;
    paintBar();
    paintDetail(detail);
  };

  const markResource = (rawUrl: string, transferBytes?: number) => {
    if (completed || !rawUrl) return;

    if (useByteBudget) {
      const asset = matchManifestAsset(rawUrl, byFile);
      if (!asset) {
        lastLabel = labelForBootFile(rawUrl);
        render();
        return;
      }
      if (seen.has(asset.file)) return;
      seen.add(asset.file);
      loadedBytes += asset.bytes;
      loadedCount += 1;
      lastLabel = asset.label || labelForBootFile(asset.file);
      render();
      return;
    }

    if (!isTrackableResourceUrl(rawUrl)) return;

    let url = rawUrl;
    try {
      url = new URL(rawUrl, location.href).href;
    } catch {
      // keep raw
    }
    if (seen.has(url)) return;
    seen.add(url);

    const bytes = estimateTransferBytes(rawUrl, transferBytes);
    loadedBytes += bytes;
    loadedCount += 1;
    // Keep a moving ceiling so the bar advances immediately but never hits 100% early.
    totalBytes = Math.max(totalBytes, loadedBytes) + DEV_HEADROOM_BYTES;
    lastLabel = labelForBootFile(url);
    // Soft floor so sparse marks still feel lively.
    floor = Math.max(floor, clamp01(1 - Math.exp(-loadedCount * 0.11)) * 0.72);
    render();
  };

  const stopTimers = () => {
    if (tipTimer != null) {
      clearInterval(tipTimer);
      tipTimer = null;
    }
    if (creepTimer != null) {
      clearInterval(creepTimer);
      creepTimer = null;
    }
  };

  const api: BootSplashApi = {
    setStatus(status, detail) {
      // Tip row is owned by the rotator; callers update the detail row.
      render(detail ?? status);
    },
    setProgress(ratio) {
      floor = Math.max(floor, clamp01(ratio));
      render();
    },
    markResource,
    complete() {
      completed = true;
      stopTimers();
      floor = 1;
      if (useByteBudget) {
        loadedBytes = totalBytes;
      } else {
        totalBytes = Math.max(totalBytes, loadedBytes);
      }
      if (fillEl) fillEl.style.width = '100%';
      if (barEl) barEl.setAttribute('aria-valuenow', '100');
      if (statusEl) statusEl.textContent = '거의 완료…';
      if (detailEl) {
        detailEl.textContent = useByteBudget
          ? `${formatBootBytes(totalBytes)} / ${formatBootBytes(totalBytes)} · 100%`
          : '100%';
      }
    },
  };

  tipIndex = Math.floor(Math.random() * BOOT_SPLASH_TIPS.length);
  paintTip();
  tipTimer = setInterval(() => {
    tipIndex = (tipIndex + 1) % BOOT_SPLASH_TIPS.length;
    paintTip();
  }, BOOT_SPLASH_TIP_INTERVAL_MS);

  if (useDynamicDev) {
    render('모듈을 불러오는 중…');
    creepTimer = setInterval(() => {
      if (completed) return;
      floor = Math.min(DEV_CREEP_CAP, floor + DEV_CREEP_STEP);
      // Slowly eat headroom so a quiet network still inches forward.
      if (totalBytes > loadedBytes + 8_000) {
        totalBytes = Math.max(loadedBytes + 8_000, totalBytes - 12_000);
      }
      render();
    }, DEV_CREEP_MS);
  } else {
    render(`0 B / ${formatBootBytes(totalBytes)} · 0%`);
  }

  document.querySelectorAll('link[rel="modulepreload"], link[rel="stylesheet"][href]').forEach((node) => {
    const link = node as HTMLLinkElement;
    const href = link.href;
    if (!href) return;
    const done = () => markResource(href);
    link.addEventListener('load', done, { once: true });
    link.addEventListener('error', done, { once: true });
  });

  try {
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const res = entry as PerformanceResourceTiming;
        const transfer =
          typeof res.transferSize === 'number' && res.transferSize > 0
            ? res.transferSize
            : typeof res.encodedBodySize === 'number' && res.encodedBodySize > 0
              ? res.encodedBodySize
              : undefined;
        markResource(entry.name, transfer);
      }
    });
    obs.observe({ type: 'resource', buffered: true });
  } catch {
    // ignore
  }

  try {
    for (const entry of performance.getEntriesByType('resource')) {
      const res = entry as PerformanceResourceTiming;
      const transfer =
        typeof res.transferSize === 'number' && res.transferSize > 0
          ? res.transferSize
          : typeof res.encodedBodySize === 'number' && res.encodedBodySize > 0
            ? res.encodedBodySize
            : undefined;
      markResource(entry.name, transfer);
    }
  } catch {
    // ignore
  }

  window.__docuhaimBootSplash = api;
  return api;
}

export function getBootSplash(): BootSplashApi | undefined {
  return typeof window !== 'undefined' ? window.__docuhaimBootSplash : undefined;
}
