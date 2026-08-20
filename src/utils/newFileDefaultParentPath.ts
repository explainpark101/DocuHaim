import { isSettingsAppPathname } from '@/utils/appHref';
import { getParentFolderPath } from '@/utils/treeMove';
import { isFileTab, type WorkspaceTab } from '@/utils/workspaceTabs';

export type ResolveNewFileDefaultParentPathInput = {
  pathname: string;
  /** Chat route or focused chat workspace tab. */
  chatSurfaceActive: boolean;
  workspaceTabsEnabled: boolean;
  activeTab: WorkspaceTab | null | undefined;
  /** Open file path when tabs are off (or no focused file tab). */
  currentFilePath?: string | null;
};

/**
 * Default create-file parent folder for Cmd/Ctrl+N / Advanced Search "새 파일".
 * Returns vault-relative dir with trailing `/`, or `''` for vault root (`/`).
 */
export function resolveNewFileDefaultParentPath(
  input: ResolveNewFileDefaultParentPathInput,
): string {
  if (input.chatSurfaceActive || isSettingsAppPathname(input.pathname)) {
    return '';
  }

  if (input.workspaceTabsEnabled && isFileTab(input.activeTab)) {
    return getParentFolderPath(input.activeTab.path);
  }

  return getParentFolderPath(input.currentFilePath || '');
}
