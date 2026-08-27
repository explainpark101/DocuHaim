import { isTauriMacOS } from '@/utils/tauriPlatform';

let cachedPhysicalBytes: number | null | undefined;

/** Physical RAM on this Mac (Tauri shell + sysctl). Cached for the session. */
export async function getMacPhysicalMemoryBytes(): Promise<number | null> {
  if (cachedPhysicalBytes !== undefined) return cachedPhysicalBytes;
  if (!isTauriMacOS()) {
    cachedPhysicalBytes = null;
    return null;
  }

  try {
    const { Command } = await import('@tauri-apps/plugin-shell');
    const result = await Command.create('sysctl-memsize', ['-n', 'hw.memsize']).execute();
    if (result.code !== 0) {
      cachedPhysicalBytes = null;
      return null;
    }
    const raw = String(result.stdout || '').trim();
    const bytes = Number.parseInt(raw, 10);
    cachedPhysicalBytes = Number.isFinite(bytes) && bytes > 0 ? bytes : null;
    return cachedPhysicalBytes;
  } catch {
    cachedPhysicalBytes = null;
    return null;
  }
}

/**
 * Conservative unified memory budget for loading one MLX model.
 * Leaves headroom for macOS + the Tauri webview.
 */
export async function getMlxAvailableMemoryBudgetBytes(): Promise<number | null> {
  const total = await getMacPhysicalMemoryBytes();
  if (total == null) return null;
  return Math.floor(total * 0.55);
}

export function formatMemoryBudgetLabel(bytes: number | null): string {
  if (bytes == null || bytes <= 0) return 'RAM 정보 없음';
  const gb = bytes / 1024 ** 3;
  return `사용 가능 추정 ${gb.toFixed(1)} GB (통합 메모리)`;
}
