import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Printer } from 'lucide-react';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';
import { openExportPdfSurface } from '@/utils/workspaceTabs/openExportPdfSurface';

export default function ExportPDF({
  value = '',
  theme = 'light',
  currentFile = null,
  disabled,
  trigger,
}) {
  const navigate = useNavigate();
  const tabsCtx = useWorkspaceTabsCtxOptional();

  const open = useCallback(() => {
    if (disabled) return;
    openExportPdfSurface({
      currentFile,
      editorContent: value,
      theme,
      navigate,
      openInFocusedPane: (tabId) =>
        Boolean(tabsCtx?.workspaceTabsEnabled && tabsCtx.openExportPdfInFocusedPane?.(tabId)),
    });
  }, [navigate, value, theme, disabled, currentFile, tabsCtx]);

  return (
    <button
      type="button"
      className="md-editor-toolbar-item"
      onClick={open}
      disabled={disabled}
      title="PDF로 내보내기"
      aria-label="PDF로 내보내기"
    >
      {trigger ?? <Printer className="md-editor-icon" size={16} />}
    </button>
  );
}
