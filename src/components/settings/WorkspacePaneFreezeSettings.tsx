import { useEffect, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import {
  loadWorkspacePaneFreezeMode,
  saveWorkspacePaneFreezeMode,
  WORKSPACE_PANE_FREEZE_CHANGED_EVENT,
  WORKSPACE_PANE_FREEZE_OPTIONS,
  type WorkspacePaneFreezeMode,
} from '@/utils/workspacePaneFreezeSettings';

function isFreezeMode(value: string): value is WorkspacePaneFreezeMode {
  return value === 'off' || value === 'hover-or-focus' || value === 'focus';
}

/** Settings radio: freeze policy for unfocused / idle split panes. */
export default function WorkspacePaneFreezeSettings() {
  const [mode, setMode] = useState<WorkspacePaneFreezeMode>(() =>
    loadWorkspacePaneFreezeMode(),
  );

  useEffect(() => {
    const sync = (event?: Event) => {
      const detail = (event as CustomEvent<{ mode?: WorkspacePaneFreezeMode }> | undefined)
        ?.detail;
      setMode(
        detail?.mode && isFreezeMode(detail.mode)
          ? detail.mode
          : loadWorkspacePaneFreezeMode(),
      );
    };
    window.addEventListener(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, sync);
    return () => {
      window.removeEventListener(WORKSPACE_PANE_FREEZE_CHANGED_EVENT, sync);
    };
  }, []);

  return (
    <div
      id="settings-workspace-pane-freeze"
      tabIndex={-1}
      className="scroll-mt-4 space-y-2"
    >
      <p className="text-xs font-medium text-gray-700 dark:text-odp-fg">
        비활성 스플릿 페인 프리징
      </p>
      <RadioGroup.Root
        className="flex flex-col gap-2"
        value={mode}
        onValueChange={(next) => {
          if (!isFreezeMode(next)) return;
          saveWorkspacePaneFreezeMode(next);
          setMode(next);
        }}
        aria-label="비활성 스플릿 페인 프리징"
      >
        {WORKSPACE_PANE_FREEZE_OPTIONS.map((opt) => {
          const selected = mode === opt.value;
          return (
            <RadioGroup.Item
              key={opt.value}
              value={opt.value}
              className={[
                'w-90 origin-left rounded-lg border-2 px-3 py-2.5 text-left outline-none transition-all duration-200',
                'focus-visible:ring-2 focus-visible:ring-blue-500/40',
                selected
                  ? 'scale-100 border-blue-600 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950/30'
                  : 'scale-[0.92] border-gray-400 hover:border-gray-500 dark:border-odp-borderStrong dark:hover:border-gray-400',
              ].join(' ')}
            >
              <div className={selected ? '' : 'opacity-50'}>
                <div className="text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                  {opt.label}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                  {opt.description}
                </div>
              </div>
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
    </div>
  );
}
