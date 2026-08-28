import { createContext } from 'react';
import type { DocumentTheme } from '@/utils/documentTheme';

/** §1–2 bootstrap / chrome gate slice. */
export type AppBootstrapValue = {
  scriptsLoaded: boolean;
  theme: DocumentTheme;
  setTheme: (theme: DocumentTheme) => void;
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
  handleSaveS3Creds: (...args: any[]) => any;
  handleExportCreds: (...args: any[]) => any;
  handleImportCreds: (...args: any[]) => any;
  handleSettingsClose: (...args: any[]) => any;
  webauthnPRFSupported: boolean;
};

export const AppBootstrapContext = createContext<AppBootstrapValue | null>(null);
