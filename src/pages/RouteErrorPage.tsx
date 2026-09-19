import { useEffect, useState } from 'react';
import { useNavigate, useRouteError } from 'react-router';
import { Home } from 'lucide-react';
import Button from '@/components/Button';
import { IconAlert, IconCheck, IconCopy, IconRefresh } from '@/components/icons';
import { copyText } from '@/utils/shared/copyText';
import { formatRouteError } from '@/utils/routeErrorMessage';

const COPY_FEEDBACK_MS = 2000;

/**
 * React Router ErrorBoundary UI for the app shell route.
 * ToastProvider is unavailable here (replaces AppShell), so copy feedback is local.
 */
export default function RouteErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const formatted = formatRouteError(error);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
    return () => window.clearTimeout(id);
  }, [copied]);

  const handleCopy = async () => {
    setCopyFailed(false);
    const ok = await copyText(formatted.copyText, false);
    if (ok) {
      setCopied(true);
      return;
    }
    setCopyFailed(true);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-white px-4 py-10 text-gray-900 dark:bg-odp-bg dark:text-odp-fg">
      <div className="w-full max-w-xl">
        <div className="mb-4 flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-odp-accentRed dark:bg-red-950/50 dark:text-red-300">
            <IconAlert size={18} />
          </span>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight">{formatted.title}</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-odp-muted">
              앱을 다시 불러오거나 홈으로 이동해 보세요. 문제가 계속되면 아래 오류
              내용을 복사해 제보해 주세요.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-odp-border dark:bg-odp-bgSoft">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-gray-200 px-3 py-2 dark:border-odp-border">
            <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-gray-500 dark:text-odp-muted">
              오류 상세
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                void handleCopy();
              }}
              aria-label={copied ? '복사됨' : '오류 메시지 복사'}
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
              {copied ? '복사됨' : '복사'}
            </Button>
          </div>
          <pre className="max-h-[min(50vh,24rem)] overflow-auto px-3 py-3 font-mono text-xs leading-relaxed break-words whitespace-pre-wrap text-gray-800 dark:text-odp-fgStrong">
            {formatted.details}
          </pre>
        </div>

        {copyFailed ? (
          <p className="mt-2 text-xs text-odp-accentRed" role="status">
            클립보드에 복사하지 못했습니다. 위 텍스트를 직접 선택해 복사해 주세요.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button type="button" variant="primary" onClick={handleReload}>
            <IconRefresh size={14} />
            다시 불러오기
          </Button>
          <Button type="button" variant="secondary" onClick={handleHome}>
            <Home size={14} />
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}
