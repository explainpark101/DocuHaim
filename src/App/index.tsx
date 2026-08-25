import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import { RouteSuspenseFallback } from './RouteSuspenseFallback';
import { MainApp } from './MainApp';

const LlmAssistPopoutPage = lazy(() => import('@/pages/LlmAssistPopoutPage'));

export default function App() {
  const location = useLocation();
  if (location.pathname === '/llm-assist-popout') {
    return (
      <div className="llm-assist-popout-layout min-h-screen max-w-screen bg-white dark:bg-odp-bgSofter">
        <Suspense fallback={<RouteSuspenseFallback />}>
          <LlmAssistPopoutPage />
        </Suspense>
      </div>
    );
  }
  return <MainApp />;
}
