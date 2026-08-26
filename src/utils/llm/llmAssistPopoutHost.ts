import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  LLM_ASSIST_MSG,
  LLM_ASSIST_POPOUT_FEATURES,
  LLM_ASSIST_POPOUT_NAME,
  getLlmAssistPopoutUrl,
  isLlmAssistMessage,
  postLlmAssistMessage,
} from '@/utils/llm/llmAssistBridge';

/** Tauri WebviewWindow label (matches browser window name). */
export const LLM_ASSIST_TAURI_POPOUT_LABEL = LLM_ASSIST_POPOUT_NAME;

const LLM_ASSIST_TAURI_MAIN_LABEL = 'main';

export type LlmAssistBridgePayload = {
  type: string;
  state?: Record<string, unknown>;
  action?: string;
  payload?: Record<string, unknown>;
  source?: Window | null;
};

type LlmAssistBridgeHandler = (message: LlmAssistBridgePayload) => void;

function parseBridgePayload(data: unknown): LlmAssistBridgePayload | null {
  if (!isLlmAssistMessage(data)) return null;
  const record = data as Record<string, unknown>;
  const message: LlmAssistBridgePayload = {
    type: String(record.type),
  };
  if (record.state && typeof record.state === 'object') {
    message.state = record.state as Record<string, unknown>;
  }
  if (typeof record.action === 'string') {
    message.action = record.action;
  }
  if (record.payload && typeof record.payload === 'object') {
    message.payload = record.payload as Record<string, unknown>;
  }
  return message;
}

function parseWindowOpenFeatures(features: string): {
  width?: number;
  height?: number;
  resizable?: boolean;
} {
  const out: { width?: number; height?: number; resizable?: boolean } = {};
  for (const token of features.split(',')) {
    const [rawKey, rawValue] = token.trim().split('=');
    const key = rawKey?.trim().toLowerCase();
    const value = rawValue?.trim();
    if (!key || !value) continue;
    if (key === 'width') out.width = Number(value);
    if (key === 'height') out.height = Number(value);
    if (key === 'resizable') out.resizable = value === 'yes' || value === 'true' || value === '1';
  }
  return out;
}

async function getTauriPopoutWindow() {
  const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  return WebviewWindow.getByLabel(LLM_ASSIST_TAURI_POPOUT_LABEL);
}

export async function isLlmAssistTauriPopoutWindow(): Promise<boolean> {
  if (!isDesktopApp()) return false;
  const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  return getCurrentWebviewWindow().label === LLM_ASSIST_TAURI_POPOUT_LABEL;
}

export async function isLlmAssistTauriMainWindowOpen(): Promise<boolean> {
  if (!isDesktopApp()) return true;
  const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  const main = await WebviewWindow.getByLabel(LLM_ASSIST_TAURI_MAIN_LABEL);
  return main !== null;
}

export async function openLlmAssistTauriPopout(): Promise<boolean> {
  const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  const existing = await WebviewWindow.getByLabel(LLM_ASSIST_TAURI_POPOUT_LABEL);
  if (existing) {
    await existing.setFocus();
    return true;
  }

  const parsed = parseWindowOpenFeatures(LLM_ASSIST_POPOUT_FEATURES);
  const popout = new WebviewWindow(LLM_ASSIST_TAURI_POPOUT_LABEL, {
    url: '/#/llm-assist-popout',
    width: parsed.width ?? 480,
    height: parsed.height ?? 820,
    resizable: parsed.resizable ?? true,
    center: true,
    title: 'AI 도우미',
  });

  return await new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };

    popout.once('tauri://created', () => finish(true));
    popout.once('tauri://error', (event) => {
      console.warn('LLM assist Tauri popout failed:', event);
      finish(false);
    });
    window.setTimeout(() => finish(true), 4000);
  });
}

export async function focusLlmAssistTauriPopout(): Promise<void> {
  const popout = await getTauriPopoutWindow();
  if (popout) await popout.setFocus();
}

export async function isLlmAssistTauriPopoutOpen(): Promise<boolean> {
  const popout = await getTauriPopoutWindow();
  return popout !== null;
}

export async function closeLlmAssistTauriPopout(): Promise<void> {
  const popout = await getTauriPopoutWindow();
  if (popout) {
    try {
      await popout.close();
    } catch {
      // ignore
    }
  }
}

export async function closeCurrentLlmAssistTauriPopout(): Promise<void> {
  if (!isDesktopApp()) return;
  const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  try {
    await getCurrentWebviewWindow().close();
  } catch {
    // ignore
  }
}

export function emitLlmAssistTauriToPopout(
  type: string,
  payload: Record<string, unknown> = {},
): void {
  void (async () => {
    try {
      const { emitTo } = await import('@tauri-apps/api/event');
      await emitTo(LLM_ASSIST_TAURI_POPOUT_LABEL, type, payload);
    } catch (error) {
      console.warn('LLM assist emit to popout failed:', error);
    }
  })();
}

export function emitLlmAssistTauriToMain(
  type: string,
  payload: Record<string, unknown> = {},
): void {
  void (async () => {
    try {
      const { emitTo } = await import('@tauri-apps/api/event');
      await emitTo(LLM_ASSIST_TAURI_MAIN_LABEL, type, payload);
    } catch (error) {
      console.warn('LLM assist emit to main failed:', error);
    }
  })();
}

export async function subscribeLlmAssistTauriFromChild(
  handler: LlmAssistBridgeHandler,
): Promise<() => void> {
  const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  const main = getCurrentWebviewWindow();

  const onReady = await main.listen<Record<string, unknown>>(LLM_ASSIST_MSG.READY, (event) => {
    const message = parseBridgePayload({ type: LLM_ASSIST_MSG.READY, ...event.payload });
    if (message) handler(message);
  });
  const onAction = await main.listen<Record<string, unknown>>(LLM_ASSIST_MSG.ACTION, (event) => {
    const message = parseBridgePayload({ type: LLM_ASSIST_MSG.ACTION, ...event.payload });
    if (message) handler(message);
  });

  return () => {
    onReady();
    onAction();
  };
}

export async function subscribeLlmAssistTauriFromParent(
  handler: LlmAssistBridgeHandler,
): Promise<() => void> {
  const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  const popout = getCurrentWebviewWindow();

  const onSync = await popout.listen<Record<string, unknown>>(LLM_ASSIST_MSG.SYNC, (event) => {
    const message = parseBridgePayload({ type: LLM_ASSIST_MSG.SYNC, ...event.payload });
    if (message) handler(message);
  });
  const onParentClosing = await popout.listen<Record<string, unknown>>(
    LLM_ASSIST_MSG.PARENT_CLOSING,
    (event) => {
      const message = parseBridgePayload({ type: LLM_ASSIST_MSG.PARENT_CLOSING, ...event.payload });
      if (message) handler(message);
    },
  );

  return () => {
    onSync();
    onParentClosing();
  };
}

export async function focusLlmAssistPopoutWindow(win: Window | null): Promise<void> {
  if (isDesktopApp()) {
    await focusLlmAssistTauriPopout();
    return;
  }
  if (win && !win.closed) win.focus();
}

export type LlmAssistPopoutOpenResult = 'tauri' | Window | null;

/** Open LLM assist in a separate window (Tauri WebviewWindow or browser popup). */
export async function openLlmAssistPopoutWindow(): Promise<LlmAssistPopoutOpenResult> {
  if (isDesktopApp()) {
    const ok = await openLlmAssistTauriPopout();
    return ok ? 'tauri' : null;
  }

  const url = getLlmAssistPopoutUrl();
  return window.open(url, LLM_ASSIST_POPOUT_NAME, LLM_ASSIST_POPOUT_FEATURES);
}

export async function closeLlmAssistPopoutWindow(win: Window | null): Promise<void> {
  if (isDesktopApp()) {
    await closeLlmAssistTauriPopout();
    return;
  }
  if (win && !win.closed) {
    try {
      win.close();
    } catch {
      // ignore
    }
  }
}

export async function isLlmAssistPopoutWindowOpen(win: Window | null): Promise<boolean> {
  if (isDesktopApp()) return isLlmAssistTauriPopoutOpen();
  return Boolean(win && !win.closed);
}

export function syncLlmAssistPopoutWindow(
  win: Window | null,
  state: Record<string, unknown>,
): void {
  if (isDesktopApp()) {
    emitLlmAssistTauriToPopout(LLM_ASSIST_MSG.SYNC, { state });
    return;
  }
  if (!win || win.closed) return;
  postLlmAssistMessage(win, LLM_ASSIST_MSG.SYNC, { state });
}

export function notifyLlmAssistPopoutParentClosing(win: Window | null): void {
  if (isDesktopApp()) {
    emitLlmAssistTauriToPopout(LLM_ASSIST_MSG.PARENT_CLOSING, {});
    void closeLlmAssistTauriPopout();
    return;
  }
  if (!win || win.closed) return;
  postLlmAssistMessage(win, LLM_ASSIST_MSG.PARENT_CLOSING);
  try {
    win.close();
  } catch {
    // ignore
  }
}

export async function subscribeLlmAssistPopoutFromChild(
  handler: LlmAssistBridgeHandler,
): Promise<() => void> {
  if (isDesktopApp()) return subscribeLlmAssistTauriFromChild(handler);

  const onMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    const message = parseBridgePayload(event.data);
    if (!message) return;
    if (message.type === LLM_ASSIST_MSG.READY || message.type === LLM_ASSIST_MSG.ACTION) {
      message.source =
        event.source && typeof (event.source as Window).postMessage === 'function'
          ? (event.source as Window)
          : null;
      handler(message);
    }
  };

  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}

export async function subscribeLlmAssistPopoutFromParent(
  handler: LlmAssistBridgeHandler,
): Promise<() => void> {
  if (isDesktopApp()) return subscribeLlmAssistTauriFromParent(handler);

  const onMessage = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    const message = parseBridgePayload(event.data);
    if (!message) return;
    if (message.type === LLM_ASSIST_MSG.SYNC || message.type === LLM_ASSIST_MSG.PARENT_CLOSING) {
      handler(message);
    }
  };

  window.addEventListener('message', onMessage);
  return () => window.removeEventListener('message', onMessage);
}

export function postLlmAssistPopoutReady(): void {
  if (isDesktopApp()) {
    emitLlmAssistTauriToMain(LLM_ASSIST_MSG.READY, {});
    return;
  }
  if (!window.opener || window.opener.closed) return;
  postLlmAssistMessage(window.opener, LLM_ASSIST_MSG.READY);
}

export function postLlmAssistPopoutAction(
  action: string,
  payload: Record<string, unknown> = {},
): void {
  if (isDesktopApp()) {
    emitLlmAssistTauriToMain(LLM_ASSIST_MSG.ACTION, { action, payload });
    return;
  }
  if (!window.opener || window.opener.closed) return;
  postLlmAssistMessage(window.opener, LLM_ASSIST_MSG.ACTION, { action, payload });
}
