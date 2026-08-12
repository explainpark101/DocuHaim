/**
 * Global preview footnote marker display mode (sup / sub / raw text).
 * Per-document on/off lives in `<!-- footnotes {json} -->` (see noteFootnotesMeta).
 */

export type FootnoteDisplayMode = 'sup' | 'sub' | 'rawText';

const LOCAL_STORAGE_KEY = 's3haim_footnote_display_mode';

export const FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT = 's3haim-footnote-display-mode-changed';

/** Fired when display mode changes (preview remount). */
export const PREVIEW_FOOTNOTES_SOURCES_CHANGED_EVENT = FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT;

export const FOOTNOTE_DISPLAY_MODE_OPTIONS = [
  {
    value: 'sup' as const,
    label: '윗첨자 (sup)',
    description: '본문 [^N]을 <sup>으로 표시',
  },
  {
    value: 'sub' as const,
    label: '아랫첨자 (sub)',
    description: '본문 [^N]을 <sub>으로 표시',
  },
  {
    value: 'rawText' as const,
    label: '일반 글씨 (raw)',
    description: '본문 [^N]을 본문과 같은 크기로 표시',
  },
] as const;

type Listener = (mode: FootnoteDisplayMode) => void;

const listeners = new Set<Listener>();

export function isFootnoteDisplayMode(value: unknown): value is FootnoteDisplayMode {
  return value === 'sup' || value === 'sub' || value === 'rawText';
}

export function loadFootnoteDisplayMode(): FootnoteDisplayMode {
  if (typeof window === 'undefined') return 'sup';
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (isFootnoteDisplayMode(raw)) return raw;
  } catch {
    // ignore
  }
  return 'sup';
}

export function saveFootnoteDisplayMode(mode: FootnoteDisplayMode): void {
  if (typeof window === 'undefined') return;
  if (!isFootnoteDisplayMode(mode)) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}

function notify(mode: FootnoteDisplayMode): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(FOOTNOTE_DISPLAY_MODE_CHANGED_EVENT, { detail: { mode } }),
    );
  }
  for (const listener of listeners) {
    try {
      listener(mode);
    } catch {
      // ignore
    }
  }
}

export function setFootnoteDisplayMode(mode: FootnoteDisplayMode): void {
  if (!isFootnoteDisplayMode(mode)) return;
  saveFootnoteDisplayMode(mode);
  notify(mode);
}

export function subscribeFootnoteDisplayMode(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** @deprecated Prefer loadFootnoteDisplayMode; kept for older imports. Always true — use doc meta. */
export function loadPreviewFootnotesSourcesEnabled(): boolean {
  return true;
}

/** @deprecated Doc-level `<!-- footnotes -->` controls enable. */
export function savePreviewFootnotesSourcesEnabled(_enabled: boolean): void {
  // no-op: enable is per-document
}

/** @deprecated */
export function setPreviewFootnotesSourcesEnabled(_enabled: boolean): void {
  // no-op
}
