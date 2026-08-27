import { AppModals } from '@/App/components/AppModals';
import { AppLayout } from '@/App/components/AppLayout';
import { ExportPdfGate, shouldShowExportPdfGate } from '@/App/components/ExportPdfGate';
import MlxLmActionHost from '@/components/settings/MlxLmActionHost';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useLocation } from 'react-router';
import { isDesktopApp } from '@/utils/isDesktopApp';

/**
 * Thin shell: gates + layout + modals. Domain state comes from AppProviders.
 */
export function AppShellView() {
  const location = useLocation();
  const bootstrap = useAppBootstrap();

  if (!bootstrap.scriptsLoaded) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg ${
          isDesktopApp() ? 'h-dvh max-h-dvh overflow-hidden' : 'h-screen'
        }`}
      >
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
      <MlxLmActionHost />
    </AppLayout>
  );
}
