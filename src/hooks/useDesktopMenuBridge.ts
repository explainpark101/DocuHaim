import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  buildDesktopPrintNavigation,
  isMarkdownFileOpenForPrint,
  startDesktopMenuActionBridge,
  stopDesktopMenuActionBridge,
  syncDesktopMenuUi,
} from '@/utils/desktopMenuBridge';

type OpenFileLike = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
  viewer?: string | null;
  content?: string | null;
} | null;

type UseDesktopMenuBridgeOptions = {
  enabled?: boolean;
  setStorageMode: (mode: string) => void;
  openLocalFolder: () => void | Promise<void>;
  currentFile: OpenFileLike;
  editorContent: string;
  theme: string;
  llmAssistOpen: boolean;
  toggleLlmAssist: () => void;
};

/**
 * Wires Tauri native File menu to vault / print / LLM assist actions and syncs menu enable state.
 */
export function useDesktopMenuBridge({
  enabled = true,
  setStorageMode,
  openLocalFolder,
  currentFile,
  editorContent,
  theme,
  llmAssistOpen,
  toggleLlmAssist,
}: UseDesktopMenuBridgeOptions): void {
  const navigate = useNavigate();
  const handlersRef = useRef({
    setStorageMode,
    openLocalFolder,
    openPrintPage: () => {},
    toggleLlmAssist,
  });

  handlersRef.current = {
    setStorageMode,
    openLocalFolder,
    openPrintPage: () => {
      if (!isMarkdownFileOpenForPrint(currentFile)) return;
      buildDesktopPrintNavigation(currentFile, editorContent, theme, navigate);
    },
    toggleLlmAssist,
  };

  useEffect(() => {
    if (!enabled || !isDesktopApp()) return;
    let cancelled = false;
    void startDesktopMenuActionBridge({
      setStorageMode: (mode) => handlersRef.current.setStorageMode(mode),
      openLocalFolder: () => handlersRef.current.openLocalFolder(),
      openPrintPage: () => handlersRef.current.openPrintPage(),
      toggleLlmAssist: () => handlersRef.current.toggleLlmAssist(),
    }).then((unlisten) => {
      if (cancelled && unlisten) unlisten();
    });
    return () => {
      cancelled = true;
      stopDesktopMenuActionBridge();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !isDesktopApp()) return;
    void syncDesktopMenuUi({
      printEnabled: isMarkdownFileOpenForPrint(currentFile),
      llmAssistOpen,
    });
  }, [enabled, currentFile, llmAssistOpen]);
}
