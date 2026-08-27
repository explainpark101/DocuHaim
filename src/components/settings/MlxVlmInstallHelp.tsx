import { useCallback, useRef, useState } from 'react';
import { CircleHelp, Loader2 } from 'lucide-react';
import { Popover } from 'radix-ui';
import {
  installHuggingFaceHubTool,
  installMlxVlmTool,
  installUvMac,
  type MlxVlmToolkitStatus,
} from '@/utils/mlxVlmShell';

const HOVER_OPEN_MS = 250;

const CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg';

const TRIGGER_CLASS =
  'inline-flex shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-white/80 p-1 text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:border-emerald-800/60 dark:bg-odp-bgSoft dark:text-emerald-200 dark:hover:bg-emerald-950/40';

const ACTION_BTN_CLASS =
  'mt-1.5 inline-flex items-center gap-1.5 rounded border border-emerald-300/80 bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-900 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/60';

type InstallAction = 'uv' | 'mlx-vlm' | 'huggingface-hub';

type MlxVlmInstallHelpProps = {
  toolkit: MlxVlmToolkitStatus | null;
  onRefresh: () => void | Promise<void>;
};

function InstallHelpBody({
  toolkit,
  onRefresh,
}: MlxVlmInstallHelpProps) {
  const [busyAction, setBusyAction] = useState<InstallAction | null>(null);
  const [log, setLog] = useState('');

  const runInstall = useCallback(
    async (action: InstallAction, fn: (options: { onOutput: (line: string) => void }) => Promise<void>) => {
      setBusyAction(action);
      setLog('');
      try {
        await fn({
          onOutput: (line) => {
            setLog((prev) => prev + line);
          },
        });
        await onRefresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Install failed.';
        setLog((prev) => `${prev}${message}\n`);
      } finally {
        setBusyAction(null);
      }
    },
    [onRefresh],
  );

  const uvAvailable = toolkit?.uvAvailable === true;
  const mlxInstalled = toolkit?.mlxVlmInstalled === true;
  const hfInstalled = toolkit?.hfHubInstalled === true;

  return (
    <>
      <p className="mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong">uv + uv tool run</p>
      <p className="mb-2 text-[10px] text-gray-500 dark:text-odp-muted">
        이 앱은 GUI PATH 대신 <code className="rounded px-0.5">uv tool run --from …</code>로
        mlx-vlm / huggingface-hub CLI를 실행합니다.
      </p>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          uv 설치 (Mac)
          <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
            curl -LsSf https://astral.sh/uv/install.sh | sh
          </pre>
          {!uvAvailable ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('uv', installUvMac)}
            >
              {busyAction === 'uv' ? <Loader2 size={12} className="animate-spin" /> : null}
              uv 설치
            </button>
          ) : (
            <p className="mt-1 text-[10px] text-emerald-700 dark:text-emerald-300">
              uv ready{toolkit?.uvPath ? `: ${toolkit.uvPath}` : ''}
            </p>
          )}
        </li>
        <li>
          PATH 등록 (<code className="rounded px-0.5">~/.zshrc</code> 등, 터미널용)
          <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
            {`export PATH="$HOME/.local/bin:$PATH"\n# 또는\nsource "$HOME/.local/bin/env"`}
          </pre>
        </li>
        <li>
          도구 설치 (로컬에 없을 때)
          <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
            uv tool install mlx-vlm{'\n'}uv tool install huggingface-hub
          </pre>
          {uvAvailable && !mlxInstalled ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('mlx-vlm', installMlxVlmTool)}
            >
              {busyAction === 'mlx-vlm' ? <Loader2 size={12} className="animate-spin" /> : null}
              mlx-vlm 설치
            </button>
          ) : null}
          {uvAvailable && !hfInstalled ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('huggingface-hub', installHuggingFaceHubTool)}
            >
              {busyAction === 'huggingface-hub' ? (
                <Loader2 size={12} className="animate-spin" />
              ) : null}
              huggingface-hub 설치
            </button>
          ) : null}
          {uvAvailable && mlxInstalled && hfInstalled ? (
            <p className="mt-1 text-[10px] text-emerald-700 dark:text-emerald-300">
              mlx-vlm · huggingface-hub installed
            </p>
          ) : null}
        </li>
        <li>
          실행 예 (앱 내부와 동일)
          <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
            {`uv tool run --from mlx-vlm mlx_vlm.generate --help\nuv tool run --from huggingface-hub hf download org/model`}
          </pre>
        </li>
      </ol>
      {log ? (
        <pre className="mt-2 max-h-28 overflow-auto rounded bg-gray-100 px-2 py-1 font-mono text-[9px] text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted">
          {log}
        </pre>
      ) : null}
    </>
  );
}

export default function MlxVlmInstallHelp({ toolkit, onRefresh }: MlxVlmInstallHelpProps) {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const hoverOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverOpenTimer = useCallback(() => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
  }, []);

  const scheduleHoverOpen = useCallback(() => {
    clearHoverOpenTimer();
    hoverOpenTimerRef.current = setTimeout(() => setOpen(true), HOVER_OPEN_MS);
  }, [clearHoverOpenTimer]);

  const closeUnlessPinned = useCallback(() => {
    clearHoverOpenTimer();
    if (!pinned) setOpen(false);
  }, [clearHoverOpenTimer, pinned]);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) setPinned(false);
  }, []);

  const handleTriggerClick = useCallback(() => {
    clearHoverOpenTimer();
    setPinned((wasPinned) => {
      const nextPinned = !wasPinned;
      setOpen(nextPinned);
      return nextPinned;
    });
  }, [clearHoverOpenTimer]);

  const handleTriggerFocus = useCallback(() => {
    clearHoverOpenTimer();
    setOpen(true);
  }, [clearHoverOpenTimer]);

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange} modal={false}>
      <Popover.Anchor asChild>
        <button
          type="button"
          aria-label="MLX-VLM 설치 방법"
          aria-expanded={open}
          aria-haspopup="dialog"
          className={TRIGGER_CLASS}
          onMouseEnter={scheduleHoverOpen}
          onMouseLeave={closeUnlessPinned}
          onFocus={handleTriggerFocus}
          onClick={handleTriggerClick}
        >
          <CircleHelp size={14} />
        </button>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={6}
          className={CONTENT_CLASS}
          onMouseEnter={() => {
            clearHoverOpenTimer();
            setOpen(true);
          }}
          onMouseLeave={closeUnlessPinned}
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <InstallHelpBody toolkit={toolkit} onRefresh={onRefresh} />
          <Popover.Arrow className="fill-white dark:fill-odp-surface" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
