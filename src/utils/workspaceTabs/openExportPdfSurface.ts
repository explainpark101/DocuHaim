import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { exportPdfPathnameForStoragePath } from '@/utils/appHref';
import { loadWorkspaceTabsEnabled } from '@/utils/workspaceTabsSettings';

type OpenExportPdfArgs = {
  currentFile?: {
    type?: string | null;
    id?: string | null;
    content?: string | null;
    [key: string]: unknown;
  } | null;
  editorContent: string;
  theme?: string;
  navigate: (path: string, options?: { state?: Record<string, unknown> }) => void;
  openInFocusedPane?: (tabId: string | null) => boolean;
  openCoverEdit?: boolean;
};

/**
 * Open Export PDF: pane surface when workspace tabs are on, else full-page route.
 */
export function openExportPdfSurface({
  currentFile,
  editorContent,
  theme = 'light',
  navigate,
  openInFocusedPane,
  openCoverEdit = false,
}: OpenExportPdfArgs): void {
  setPendingPrintReturnState({ currentFile, editorContent });

  if (loadWorkspaceTabsEnabled() && openInFocusedPane) {
    const tabId =
      currentFile?.type && currentFile?.id
        ? `${currentFile.type}:${currentFile.id}`
        : null;
    if (openInFocusedPane(tabId)) return;
  }

  navigate(exportPdfPathnameForStoragePath(currentFile?.id ?? null), {
    state: {
      value: editorContent,
      theme: theme === 'dark' ? 'dark' : 'light',
      currentFile,
      ...(openCoverEdit ? { openCoverEdit: true } : {}),
    },
  });
}
