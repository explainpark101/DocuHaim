/**
 * Boot splash progress UI — runs before the main app graph finishes loading.
 * Uses build-time `#boot-manifest` (bytes per critical asset) for a stable bar.
 */

import {
  BOOT_MANIFEST_SCRIPT_ID,
  formatBootBytes,
  labelForBootFile,
  type BootManifest,
  type BootManifestAsset,
} from '@/boot/bootManifest';

export type BootSplashApi = {
  setStatus: (status: string, detail?: string) => void;
  setProgress: (ratio: number) => void;
  markResource: (url: string) => void;
  complete: () => void;
};

declare global {
  interface Window {
    __docuhaimBootSplash?: BootSplashApi;
  }
}

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

function readEmbeddedManifest(): BootManifest | null {
  const el = document.getElementById(BOOT_MANIFEST_SCRIPT_ID);
  if (!el?.textContent?.trim()) return null;
  try {
    const parsed = JSON.parse(el.textContent) as BootManifest;
    if (parsed?.version !== 1 || !Array.isArray(parsed.assets)) return null;
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
  // BASE_URL prefix / trailing variants
  for (const asset of byFile.values()) {
    if (key.endsWith(asset.file) || key.endsWith(`/${asset.file}`)) return asset;
  }
  return undefined;
}

export function initBootSplash(): BootSplashApi {
  if (typeof window !== 'undefined' && window.__docuhaimBootSplash) {
    return window.__docuhaimBootSplash;
  }

  const statusEl = document.getElementById('boot-splash-status');
  const detailEl = document.getElementById('boot-splash-detail');
  const fillEl = document.getElementById('boot-splash-bar-fill');
  const barEl = document.getElementById('boot-splash-bar');

  const manifest = readEmbeddedManifest();
  const byFile = new Map<string, BootManifestAsset>();
  for (const asset of manifest?.assets || []) {
    byFile.set(asset.file.replace(/^\//, ''), asset);
  }

  const useByteBudget = Boolean(manifest && manifest.totalBytes > 0 && byFile.size > 0);
  const totalBytes = useByteBudget ? manifest!.totalBytes : 0;

  const seen = new Set<string>();
  let loadedBytes = 0;
  let loadedCount = 0;
  let expectedCount = useByteBudget ? byFile.size : 0;
  let floor = 0.04;
  let completed = false;
  let lastLabel = '';

  if (!useByteBudget) {
    expectedCount = document.querySelectorAll(
      'link[rel="modulepreload"], link[rel="stylesheet"][href], script[type="module"][src]',
    ).length;
  }

  const render = (status?: string, detail?: string) => {
    if (completed) return;
    let ratio: number;
    if (useByteBudget) {
      ratio = clamp01(Math.max(floor, loadedBytes / totalBytes));
    } else {
      ratio = clamp01(
        Math.max(floor, expectedCount > 0 ? loadedCount / expectedCount : floor),
      );
    }
    const pct = Math.round(ratio * 100);
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (barEl) barEl.setAttribute('aria-valuenow', String(pct));
    if (status != null && statusEl) statusEl.textContent = status;
    if (detail != null && detailEl) {
      detailEl.textContent = detail;
    } else if (detailEl && useByteBudget) {
      detailEl.textContent =
        `${formatBootBytes(loadedBytes)} / ${formatBootBytes(totalBytes)} · ${pct}%`;
    } else if (detailEl && expectedCount > 0) {
      detailEl.textContent = `${loadedCount} / ${expectedCount} · ${pct}%`;
    }
  };

  const markResource = (rawUrl: string) => {
    if (completed || !rawUrl) return;

    if (useByteBudget) {
      const asset = matchManifestAsset(rawUrl, byFile);
      if (!asset) {
        // Outside critical budget (lazy chunks) — update label only.
        lastLabel = labelForBootFile(rawUrl);
        render(`로딩 중: ${lastLabel}`);
        return;
      }
      if (seen.has(asset.file)) return;
      seen.add(asset.file);
      loadedBytes += asset.bytes;
      loadedCount += 1;
      lastLabel = asset.label || labelForBootFile(asset.file);
      render(`로딩 중: ${lastLabel}`);
      return;
    }

    let url = rawUrl;
    try {
      url = new URL(rawUrl, location.href).href;
    } catch {
      // keep raw
    }
    if (seen.has(url)) return;
    const pathOnly = url.split('?')[0] || url;
    if (
      !/\.(js|mjs|css|wasm)(\?|$)/i.test(pathOnly) &&
      !pathOnly.includes('/assets/') &&
      !pathOnly.includes('/src/')
    ) {
      return;
    }
    seen.add(url);
    loadedCount += 1;
    if (loadedCount > expectedCount) expectedCount = loadedCount;
    lastLabel = labelForBootFile(url);
    render(
      `로딩 중: ${lastLabel}`,
      `${loadedCount} / ${Math.max(expectedCount, loadedCount)}`,
    );
  };

  const api: BootSplashApi = {
    setStatus(status, detail) {
      render(status, detail);
    },
    setProgress(ratio) {
      floor = Math.max(floor, clamp01(ratio));
      render();
    },
    markResource,
    complete() {
      completed = true;
      floor = 1;
      loadedBytes = useByteBudget ? totalBytes : loadedBytes;
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

  if (useByteBudget) {
    render(
      '앱을 준비하는 중…',
      `0 B / ${formatBootBytes(totalBytes)} · 0%`,
    );
  } else {
    render('앱을 준비하는 중…', expectedCount > 0 ? `0 / ${expectedCount}` : '');
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
        markResource(entry.name);
      }
    });
    obs.observe({ type: 'resource', buffered: true });
  } catch {
    // ignore
  }

  try {
    for (const entry of performance.getEntriesByType('resource')) {
      markResource(entry.name);
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
