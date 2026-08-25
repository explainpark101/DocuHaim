import { createContext } from 'react';

/** §1–2 bootstrap / chrome gate slice. */
export type AppBootstrapValue = {
  scriptsLoaded: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  shareBlockingAuth: boolean;
  setShareBlockingAuth: (blocking: boolean) => void;
  showAuthModal: boolean;
  handleUnlock: (...args: any[]) => any;
  handleUnlockWithWebAuthn: (...args: any[]) => any;
  canUnlockWithWebAuthnForModal: boolean;
  autoPromptWebAuthnForModal: boolean;
  proceedWithoutStoredCreds: (...args: any[]) => any;
  fileInputRef: { current: any };
  openSettingsWorkspaceTab: (...args: any[]) => any;
};

export const AppBootstrapContext = createContext<AppBootstrapValue | null>(null);
