import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import { RouteSuspenseFallback } from '@/App/RouteSuspenseFallback';
import { AppProviders } from '@/App/AppProviders';
import { AppShellView } from '@/App/AppShellView';

const LlmAssistPopoutPage = lazy(() => import('@/pages/LlmAssistPopoutPage'));

export default function App() {
  const location = useLocation();
  if (location.pathname === '/llm-assist-popout') {
    return (
      <div className="llm-assist-popout-layout flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden max-w-full bg-white dark:bg-odp-bgSofter">
        <Suspense fallback={<RouteSuspenseFallback />}>
          <LlmAssistPopoutPage />
        </Suspense>
      </div>
    );
  }
  return (
    <AppProviders>
      <AppShellView />
    </AppProviders>
  );
}
