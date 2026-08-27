import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearMlxLmServerLog,
  getMlxLmServerLogText,
  subscribeMlxLmServerLog,
} from '@/utils/llm/mlxLmServerLog';
import { isMlxLmServerManagedByApp } from '@/utils/llm/mlxLmShell';

export function useMlxLmServerLogText(): string {
  const [text, setText] = useState(() => getMlxLmServerLogText());

  useEffect(() => subscribeMlxLmServerLog(() => setText(getMlxLmServerLogText())), []);

  return text;
}

type MlxLmServerLogPanelProps = {
  serverRunning: boolean;
  managedByApp: boolean;
};

export default function MlxLmServerLogPanel({
  serverRunning,
  managedByApp: managedByAppProp,
}: MlxLmServerLogPanelProps) {
  const logText = useMlxLmServerLogText();
  const [managedByApp, setManagedByApp] = useState(
    () => managedByAppProp || isMlxLmServerManagedByApp(),
  );
  const scrollRef = useRef<HTMLPreElement | null>(null);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    setManagedByApp(managedByAppProp || isMlxLmServerManagedByApp());
  }, [managedByAppProp, serverRunning]);

  useEffect(
    () =>
      subscribeMlxLmServerLog(() => {
        setManagedByApp(isMlxLmServerManagedByApp());
      }),
    [],
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distanceFromBottom < 24;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !stickToBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [logText]);

  const emptyHint = serverRunning
    ? managedByApp
      ? '서버 로그를 기다리는 중…'
      : '외부에서 실행 중인 서버는 이 앱에서 로그를 가져올 수 없습니다.'
    : '서버를 시작하면 mlx_lm.server 출력이 여기에 표시됩니다.';

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-gray-700 dark:text-odp-fg">서버 로그</p>
        <button
          type="button"
          disabled={!logText}
          onClick={() => {
            clearMlxLmServerLog();
            stickToBottomRef.current = true;
          }}
          className="rounded border border-gray-200 px-2 py-0.5 text-[10px] text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
        >
          Clear
        </button>
      </div>

      <pre
        ref={scrollRef}
        onScroll={handleScroll}
        className="max-h-64 overflow-y-auto rounded border border-gray-200 bg-gray-950/95 p-2.5 font-mono text-[10px] leading-relaxed text-emerald-100 dark:border-odp-borderStrong"
      >
        {logText || emptyHint}
      </pre>
    </div>
  );
}
