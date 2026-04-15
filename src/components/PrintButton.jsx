import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Printer } from 'lucide-react';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';

export default function PrintButton({
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
    navigate('/export-pdf', { state: { value, theme } });
  }, [navigate, value, theme, disabled, currentFile]);

  return (
    <button
      type="button"
      className="shrink-0 inline-flex items-center justify-center rounded-md border p-1.5 shadow-sm transition border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:hover:text-odp-fgStrong"
      onClick={open}
      disabled={disabled}
      title="프린트"
      aria-label="프린트"
    >
      {trigger ?? <Printer className="size-4" aria-hidden />}
    </button>
  );
}
