/**
 * Android Tauri share-sheet → chat ShareTargetGate bridge.
 * PWA uses Web Share Target + SW; the native APK uses ACTION_SEND intents instead.
 */

import { isTauriAndroid } from '@/utils/tauriPlatform';
import { readOpenPathBytes } from '@/utils/shared/desktopOpenFiles';

export const ANDROID_SHARE_TARGET_EVENT = 'android-share-target';

/** Dispatched from MainActivity when a share Intent is captured (warm onNewIntent). */
export const ANDROID_SHARE_PENDING_DOM_EVENT = 'tauri-android-share-pending';

/** From Android activity-alias share targets. */
export type AndroidShareMode = 'sendSelf' | 'chooseGroup' | 'choose';

export type AndroidSharePayload = {
  title?: string;
  text?: string;
  urls?: string[];
  /** `sendSelf` | `chooseGroup` | `choose` */
  mode?: string;
};

export type AndroidShareIntake = {
  body: string;
  files: File[];
  mode: AndroidShareMode;
};

function normalizeShareMode(mode: string | null | undefined): AndroidShareMode {
  const value = String(mode || '').trim();
  if (value === 'sendSelf' || value === 'chooseGroup' || value === 'choose') {
    return value;
  }
  return 'choose';
}

type Listener = (intake: AndroidShareIntake) => void;

const listeners = new Set<Listener>();
let started = false;
let unlisten: (() => void) | null = null;
let removeDomHooks: (() => void) | null = null;
const recentKeys = new Set<string>();
/** Held when publish runs before ShareTargetGate (or any listener) subscribes. */
let bufferedIntake: AndroidShareIntake | null = null;
let pollInFlight: Promise<void> | null = null;

function basenameFromUri(uri: string): string {
  const raw = String(uri || '').trim();
  if (!raw) return 'shared-file';
  try {
    const pathOnly = raw.split('?')[0] || raw;
    const parts = pathOnly.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || 'shared-file';
    return decodeURIComponent(last) || 'shared-file';
  } catch {
    return 'shared-file';
  }
}

function guessMimeFromName(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith('.md') || lower.endsWith('.markdown')) return 'text/markdown';
  if (lower.endsWith('.png')) return 'image/png';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.txt')) return 'text/plain';
  if (lower.endsWith('.mp4')) return 'video/mp4';
  if (lower.endsWith('.mp3')) return 'audio/mpeg';
  return 'application/octet-stream';
}

function buildShareBody(payload: AndroidSharePayload): string {
  const title = String(payload.title || '').trim();
  const text = String(payload.text || '').trim();
  if (title && text) {
    if (text.includes(title)) return text;
    return `${title}\n${text}`;
  }
  return text || title;
}

function intakeKey(intake: AndroidShareIntake): string {
  const names = intake.files.map((f) => `${f.name}:${f.size}`).join('|');
  return `${intake.mode}\0${intake.body}\0${names}`;
}

function deliverToListeners(intake: AndroidShareIntake): void {
  const key = intakeKey(intake);
  if (recentKeys.has(key)) return;
  recentKeys.add(key);
  window.setTimeout(() => recentKeys.delete(key), 4000);
  for (const listener of listeners) {
    try {
      listener(intake);
    } catch {
      // ignore
    }
  }
}

function publish(intake: AndroidShareIntake): void {
  if (!intake.body && !intake.files.length) return;
  // Cold start: bridge take/emit often wins the race before ShareTargetGate mounts.
  // Buffer instead of marking recentKeys, or the late Opened/deferred emit is dropped.
  if (listeners.size === 0) {
    bufferedIntake = intake;
    return;
  }
  // Flush any prior buffer first so a later publish cannot wipe it unread.
  const pending = bufferedIntake;
  bufferedIntake = null;
  if (pending) deliverToListeners(pending);
  deliverToListeners(intake);
}

function flushBufferedToListeners(): void {
  const pending = bufferedIntake;
  if (!pending || listeners.size === 0) return;
  bufferedIntake = null;
  deliverToListeners(pending);
}

async function filesFromShareUrls(urls: string[]): Promise<File[]> {
  const out: File[] = [];
  for (const url of urls) {
    const trimmed = String(url || '').trim();
    if (!trimmed || trimmed.startsWith('data:')) continue;
    try {
      const bytes = await readOpenPathBytes(trimmed);
      const name = basenameFromUri(trimmed);
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      out.push(
        new File([copy], name, {
          type: guessMimeFromName(name),
        }),
      );
    } catch (err) {
      console.warn('Android share: failed to read URI', trimmed, err);
    }
  }
  return out;
}

async function intakeFromPayload(
  payload: AndroidSharePayload | null | undefined,
): Promise<AndroidShareIntake | null> {
  if (!payload) return null;
  const body = buildShareBody(payload);
  const files = await filesFromShareUrls(
    Array.isArray(payload.urls) ? payload.urls : [],
  );
  if (!body && !files.length) return null;
  return { body, files, mode: normalizeShareMode(payload.mode) };
}

async function pollPendingAndroidShare(): Promise<void> {
  if (pollInFlight) return pollInFlight;
  pollInFlight = (async () => {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      const pending = await invoke<AndroidSharePayload | null>(
        'take_pending_android_share',
      );
      const intake = await intakeFromPayload(pending);
      if (intake) publish(intake);
    } catch {
      // command unavailable outside Android / before IPC ready
    } finally {
      pollInFlight = null;
    }
  })();
  return pollInFlight;
}

export function subscribeAndroidShareTarget(listener: Listener): () => void {
  listeners.add(listener);
  // Deliver any share that arrived before the gate subscribed.
  queueMicrotask(() => {
    flushBufferedToListeners();
  });
  return () => {
    listeners.delete(listener);
  };
}

/** Start listening for native share intents (Tauri Android only). */
export async function startAndroidShareTargetBridge(): Promise<void> {
  if (!isTauriAndroid() || started || typeof window === 'undefined') return;
  started = true;

  // Listen first so a warm share between take and listen is not dropped.
  try {
    const { listen } = await import('@tauri-apps/api/event');
    unlisten = await listen<AndroidSharePayload>(
      ANDROID_SHARE_TARGET_EVENT,
      (event) => {
        void (async () => {
          const intake = await intakeFromPayload(event.payload);
          if (intake) publish(intake);
        })();
      },
    );
  } catch {
    // ignore
  }

  const onDomSharePending = (): void => {
    void pollPendingAndroidShare();
  };
  const onVisibility = (): void => {
    if (document.visibilityState === 'visible') {
      void pollPendingAndroidShare();
    }
  };
  window.addEventListener(ANDROID_SHARE_PENDING_DOM_EVENT, onDomSharePending);
  document.addEventListener('visibilitychange', onVisibility);
  removeDomHooks = () => {
    window.removeEventListener(ANDROID_SHARE_PENDING_DOM_EVENT, onDomSharePending);
    document.removeEventListener('visibilitychange', onVisibility);
  };

  await pollPendingAndroidShare();
}

export function stopAndroidShareTargetBridge(): void {
  unlisten?.();
  unlisten = null;
  removeDomHooks?.();
  removeDomHooks = null;
  started = false;
  bufferedIntake = null;
}
