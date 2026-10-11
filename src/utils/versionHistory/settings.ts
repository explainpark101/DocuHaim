/**
 * Master toggle for app-managed version archives (notes + chat ISO files).
 * S3 native versioning follows bucket settings, not this toggle.
 */

const STORAGE_KEY = 'docuhaim-version-history-enabled';
const MAX_KEY = 'docuhaim-version-history-note-max';

const listeners = new Set<() => void>();

function notify(): void {
  for (const l of listeners) {
    try {
      l();
    } catch {
      // ignore
    }
  }
}

export function loadVersionHistoryEnabled(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === '1' || raw === 'true';
  } catch {
    return true;
  }
}

export function saveVersionHistoryEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
  } catch {
    // ignore
  }
  notify();
}

export function loadNoteVersionMax(): number {
  try {
    const n = Number(localStorage.getItem(MAX_KEY));
    if (Number.isFinite(n) && n >= 1 && n <= 100) return Math.floor(n);
  } catch {
    // ignore
  }
  return 20;
}

export function saveNoteVersionMax(max: number): void {
  const n = Math.min(100, Math.max(1, Math.floor(Number(max) || 20)));
  try {
    localStorage.setItem(MAX_KEY, String(n));
  } catch {
    // ignore
  }
  notify();
}

export function subscribeVersionHistorySettings(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
