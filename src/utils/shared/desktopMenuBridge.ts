/**
 * Desktop native menu bridge (Tauri File menu actions).
 */

import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { exportPdfPathnameForStoragePath } from '@/utils/appHref';

export const DESKTOP_MENU_ACTION_EVENT = 'desktop-menu-action';

export const DESKTOP_MENU_OPEN_S3_HAIM = 'open-s3-haim';
export const DESKTOP_MENU_OPEN_WEBDAV_HAIM = 'open-webdav-haim';
export const DESKTOP_MENU_OPEN_LOCAL_HAIM = 'open-local-haim';
export const DESKTOP_MENU_OPEN_LOCAL_HAIM_FOLDER = 'open-local-haim-folder';
export const DESKTOP_MENU_OPEN_PRINT = 'open-print';
export const DESKTOP_MENU_TOGGLE_LLM_ASSIST = 'toggle-llm-assist';

type OpenFileLike = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
  viewer?: string | null;
  content?: string | null;
} | null;

/** Whether the active editor can open the print / export-pdf page. */
export function isMarkdownFileOpenForPrint(file: OpenFileLike): boolean {
  if (!file) return false;
  const viewer = file.viewer || 'markdown';
  if (viewer !== 'markdown') return false;
  if (file.type === 'session') {
    const name = String(file.name || file.id || '');
    return /\.(md|markdown)$/i.test(name) || viewer === 'markdown';
  }
  return true;
}

export async function syncDesktopMenuUi(state: {
  printEnabled: boolean;
  llmAssistOpen: boolean;
}): Promise<void> {
  if (!isDesktopApp()) return;
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('sync_desktop_menu_ui', {
      printEnabled: state.printEnabled,
      llmAssistOpen: state.llmAssistOpen,
    });
  } catch {
    // ignore when running outside Tauri shell
  }
}

type DesktopMenuActionHandlers = {
  setStorageMode: (mode: string) => void;
  openLocalFolder: () => void | Promise<void>;
  openPrintPage: () => void;
  toggleLlmAssist: () => void;
};

export function handleDesktopMenuAction(
  actionId: string,
  handlers: DesktopMenuActionHandlers,
): void {
  switch (actionId) {
    case DESKTOP_MENU_OPEN_S3_HAIM:
      handlers.setStorageMode(STORAGE_MODE_S3);
      return;
    case DESKTOP_MENU_OPEN_WEBDAV_HAIM:
      handlers.setStorageMode(STORAGE_MODE_WEBDAV);
      return;
    case DESKTOP_MENU_OPEN_LOCAL_HAIM:
      handlers.setStorageMode(STORAGE_MODE_LOCAL);
      return;
    case DESKTOP_MENU_OPEN_LOCAL_HAIM_FOLDER:
      void handlers.openLocalFolder();
      return;
    case DESKTOP_MENU_OPEN_PRINT:
      handlers.openPrintPage();
      return;
    case DESKTOP_MENU_TOGGLE_LLM_ASSIST:
      handlers.toggleLlmAssist();
      return;
    default:
      return;
  }
}

export function buildDesktopPrintNavigation(
  file: OpenFileLike,
  editorContent: string,
  theme: string,
  navigate: (path: string, options?: { state?: Record<string, unknown> }) => void,
): void {
  const value = String(editorContent ?? file?.content ?? '');
  const useFile = file?.id ? file : null;
  setPendingPrintReturnState({
    currentFile: useFile,
    editorContent: value,
  });
  navigate(exportPdfPathnameForStoragePath(useFile?.id), {
    state: {
      value,
      theme: theme === 'dark' ? 'dark' : 'light',
      currentFile: useFile,
    },
  });
}

type UnlistenFn = () => void;

let actionBridgeStarted = false;
let actionUnlisten: UnlistenFn | null = null;

/** Listen for native menu selections and dispatch to handlers. */
export async function startDesktopMenuActionBridge(
  handlers: DesktopMenuActionHandlers,
): Promise<UnlistenFn | null> {
  if (!isDesktopApp() || typeof window === 'undefined') return null;
  if (actionBridgeStarted && actionUnlisten) {
    return actionUnlisten;
  }
  actionBridgeStarted = true;
  try {
    const { listen } = await import('@tauri-apps/api/event');
    actionUnlisten = await listen<string>(DESKTOP_MENU_ACTION_EVENT, (event) => {
      handleDesktopMenuAction(String(event.payload || ''), handlers);
    });
    return actionUnlisten;
  } catch {
    actionBridgeStarted = false;
    return null;
  }
}

export function stopDesktopMenuActionBridge(): void {
  actionUnlisten?.();
  actionUnlisten = null;
  actionBridgeStarted = false;
}
