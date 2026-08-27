import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

let cachedFamilies: string[] | null = null;
let loadPromise: Promise<string[]> | null = null;

/** Clear cache so the next load re-queries the OS. */
export function invalidateSystemFontFamiliesCache(): void {
  cachedFamilies = null;
  loadPromise = null;
}

/** Installed font families from the OS (Tauri desktop only). */
export async function loadSystemFontFamilies(): Promise<string[]> {
  if (!isTauriDesktopPlatform()) return [];
  if (cachedFamilies) return cachedFamilies;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const families = await invoke<string[]>('list_system_font_families');
      cachedFamilies = Array.isArray(families) ? families : [];
    } catch {
      cachedFamilies = [];
    } finally {
      loadPromise = null;
    }
    return cachedFamilies ?? [];
  })();

  return loadPromise;
}
