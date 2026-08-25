import { AppModals } from '@/App/components/AppModals';
import { AppLayout } from '@/App/components/AppLayout';
import { ExportPdfGate, shouldShowExportPdfGate } from '@/App/components/ExportPdfGate';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useLocation } from 'react-router';

/**
 * Thin shell: gates + layout + modals. Domain state comes from AppProviders.
 */
export function AppShellView() {
  const location = useLocation();
  const bootstrap = useAppBootstrap();

  if (!bootstrap.scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg">
        로딩 중...
      </div>
    );
  }

  if (shouldShowExportPdfGate(location.pathname)) {
    return <ExportPdfGate />;
  }

  return (
    <AppLayout>
      <AppModals />
    </AppLayout>
  );
}
