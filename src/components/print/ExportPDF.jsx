import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Printer } from 'lucide-react';
import { setPendingPrintReturnState } from '@/utils/print/printNavigationState';
import { exportPdfPathnameForStoragePath } from '@/utils/appHref';

export default function ExportPDF({
  value = '',
  theme = 'light',
  currentFile = null,
  disabled,
  trigger,
}) {
  const navigate = useNavigate();

  const open = useCallback(() => {
    if (disabled) return;
    setPendingPrintReturnState({ currentFile, editorContent: value });
    navigate(exportPdfPathnameForStoragePath(currentFile?.id), {
      state: { value, theme, currentFile },
    });
  }, [navigate, value, theme, disabled, currentFile]);

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
