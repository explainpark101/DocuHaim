import { MonitorSmartphone } from 'lucide-react';

export default function TelegramShellGate() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <MonitorSmartphone className="text-sky-700 dark:text-sky-300" size={28} aria-hidden />
      <h1 className="text-lg font-semibold text-gray-900 dark:text-odp-fgStrong">Telegram</h1>
      <p className="max-w-md text-sm text-gray-600 dark:text-odp-muted">
        데스크톱 또는 Android 앱에서만 사용할 수 있습니다. 웹 브라우저에서는 Telegram 계정에 연결하지
        않습니다.
      </p>
    </div>
  );
}
