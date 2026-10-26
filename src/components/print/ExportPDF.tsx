import { useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';
import ExportPdfOpenMenu from '@/components/print/ExportPdfOpenMenu';
import type { ExportPdfPaginationMode } from '@/utils/exportPdf/exportPdfPaginationModeSettings';
import { openExportPdfSurface } from '@/utils/workspaceTabs/openExportPdfSurface';

type CurrentFile = {
  type?: string | null;
  id?: string | null;
  content?: string | null;
  [key: string]: unknown;
};

type Props = {
  value?: string;
  theme?: string;
  currentFile?: CurrentFile | null;
  disabled?: boolean;
  /** Unused; the menu always shows the printer icon. Kept for call-site compatibility. */
  trigger?: ReactNode;
};

export default function ExportPDF({
  value = '',
  theme = 'light',
  currentFile = null,
  disabled,
}: Props) {
  const navigate = useNavigate();
  const tabsCtx = useWorkspaceTabsCtxOptional();

  const open = useCallback(
    (paginationMode: ExportPdfPaginationMode) => {
      if (disabled) return;
      openExportPdfSurface({
        currentFile,
        editorContent: value,
        theme,
        navigate,
        paginationMode,
        openInFocusedPane: (tabId) =>
          Boolean(tabsCtx?.workspaceTabsEnabled && tabsCtx.openExportPdfInFocusedPane?.(tabId)),
      });
    },
    [navigate, value, theme, disabled, currentFile, tabsCtx],
  );

  return (
    <ExportPdfOpenMenu
      variant="md-toolbar"
      disabled={Boolean(disabled)}
      onOpen={open}
    />
  );
}
