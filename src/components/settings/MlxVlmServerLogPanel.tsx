import { useEffect, useState } from 'react';
import {
  clearMlxVlmServerLog,
  getMlxVlmServerLogLines,
  subscribeMlxVlmServerLog,
} from '@/utils/llm/mlxVlmServerLog';
import type { MlxVlmLogLine } from '@/utils/llm/mlxVlmRawLogBuffer';
import { isMlxVlmServerManagedByApp } from '@/utils/llm/mlxVlmShell';
import MlxVlmVirtualLogPanel from '@/components/settings/MlxVlmVirtualLogPanel';

export function useMlxVlmServerLogLines(): readonly MlxVlmLogLine[] {
  const [lines, setLines] = useState(() => getMlxVlmServerLogLines());

  useEffect(() => subscribeMlxVlmServerLog(() => setLines(getMlxVlmServerLogLines())), []);

  return lines;
}

type MlxVlmServerLogPanelProps = {
  serverRunning: boolean;
  managedByApp: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MlxVlmServerLogPanel({
  serverRunning,
  managedByApp: managedByAppProp,
  open,
  onOpenChange,
}: MlxVlmServerLogPanelProps) {
  const lines = useMlxVlmServerLogLines();
  const [managedByApp, setManagedByApp] = useState(
    () => managedByAppProp || isMlxVlmServerManagedByApp(),
  );

  useEffect(() => {
    setManagedByApp(managedByAppProp || isMlxVlmServerManagedByApp());
  }, [managedByAppProp, serverRunning]);

  useEffect(
    () =>
      subscribeMlxVlmServerLog(() => {
        setManagedByApp(isMlxVlmServerManagedByApp());
      }),
    [],
  );

  const emptyHint = serverRunning
    ? managedByApp
      ? '서버 로그를 기다리는 중…'
      : '외부에서 실행 중인 서버는 이 앱에서 로그를 가져올 수 없습니다.'
    : 'Load model을 실행하면 mlx_vlm.generate worker raw 출력이 여기에 표시됩니다.';

  return (
    <MlxVlmVirtualLogPanel
      title="서버 로그"
      {...(serverRunning
        ? { subtitle: managedByApp ? '앱 관리 worker' : '외부 프로세스' }
        : {})}
      lines={lines}
      emptyHint={emptyHint}
      open={open}
      onOpenChange={onOpenChange}
      onClear={clearMlxVlmServerLog}
    />
  );
}
