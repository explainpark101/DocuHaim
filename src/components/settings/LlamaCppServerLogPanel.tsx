import { useEffect, useState } from 'react';
import {
  clearLlamaCppServerLog,
  getLlamaCppServerLogLines,
  subscribeLlamaCppServerLog,
} from '@/utils/llm/llamaCppServerLog';
import { isLlamaCppServerManagedByApp } from '@/utils/llamaCppShell';
import MlxVlmVirtualLogPanel from '@/components/settings/MlxVlmVirtualLogPanel';

export function useLlamaCppServerLogLines() {
  const [lines, setLines] = useState(() => getLlamaCppServerLogLines());

  useEffect(() => subscribeLlamaCppServerLog(() => setLines(getLlamaCppServerLogLines())), []);

  return lines;
}

type LlamaCppServerLogPanelProps = {
  serverRunning: boolean;
  managedByApp: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LlamaCppServerLogPanel({
  serverRunning,
  managedByApp: managedByAppProp,
  open,
  onOpenChange,
}: LlamaCppServerLogPanelProps) {
  const lines = useLlamaCppServerLogLines();
  const [managedByApp, setManagedByApp] = useState(
    () => managedByAppProp || isLlamaCppServerManagedByApp(),
  );

  useEffect(() => {
    setManagedByApp(managedByAppProp || isLlamaCppServerManagedByApp());
  }, [managedByAppProp, serverRunning]);

  useEffect(
    () =>
      subscribeLlamaCppServerLog(() => {
        setManagedByApp(isLlamaCppServerManagedByApp());
      }),
    [],
  );

  const emptyHint = serverRunning
    ? managedByApp
      ? '서버 로그를 기다리는 중…'
      : '외부에서 실행 중인 서버는 이 앱에서 로그를 가져올 수 없습니다.'
    : 'Start server를 실행하면 llama-server raw 출력이 여기에 표시됩니다.';

  return (
    <MlxVlmVirtualLogPanel
      title="서버 로그"
      {...(serverRunning
        ? { subtitle: managedByApp ? '앱 관리 server' : '외부 프로세스' }
        : {})}
      lines={lines}
      emptyHint={emptyHint}
      open={open}
      onOpenChange={onOpenChange}
      onClear={clearLlamaCppServerLog}
    />
  );
}
