/* eslint-disable @typescript-eslint/no-explicit-any -- Export PDF gate props bridge */

export type ExportPdfGateProps = {
  documentValue: string;
  documentFile: any;
  openCoverEdit: boolean;
  isDocumentLoading: boolean;
  hasNavigationSession: boolean;
  storageMode: string;
  localTree: any;
  webdavTree: any;
  s3Tree: any;
  openAdvancedSearchFile: (...args: any[]) => any;
  snippetConfig: any;
  showAuthModal: boolean;
  shareBlockingAuth: boolean;
  handleUnlock: (...args: any[]) => any;
  fileInputRef: any;
  proceedWithoutStoredCreds: (...args: any[]) => any;
  openSettingsWorkspaceTab: (...args: any[]) => any;
  canUnlockWithWebAuthnForModal: boolean;
  handleUnlockWithWebAuthn: (...args: any[]) => any;
  autoPromptWebAuthnForModal: boolean;
};
