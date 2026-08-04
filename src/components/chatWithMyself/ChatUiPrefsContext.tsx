import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

export type ChatUiPrefs = {
  openLinksInNewWindow: boolean;
};

const DEFAULT_PREFS: ChatUiPrefs = {
  openLinksInNewWindow: false,
};

const ChatUiPrefsContext = createContext<ChatUiPrefs>(DEFAULT_PREFS);

/**
 * Chat-wide UI preferences (link target, etc.).
 */
export function ChatUiPrefsProvider({
  openLinksInNewWindow = false,
  children,
}: {
  openLinksInNewWindow?: boolean;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({
      openLinksInNewWindow: Boolean(openLinksInNewWindow),
    }),
    [openLinksInNewWindow],
  );
  return (
    <ChatUiPrefsContext.Provider value={value}>
      {children}
    </ChatUiPrefsContext.Provider>
  );
}

export function useChatUiPrefs(): ChatUiPrefs {
  return useContext(ChatUiPrefsContext);
}

export function useOpenLinksInNewWindow(): boolean {
  return useChatUiPrefs().openLinksInNewWindow;
}
