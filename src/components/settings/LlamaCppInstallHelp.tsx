import { useCallback, useState } from 'react';
import { CircleHelp, Loader2 } from 'lucide-react';
import { Popover } from 'radix-ui';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import LlamaCppInstallLogFloatingPanel from '@/components/settings/LlamaCppInstallLogFloatingPanel';
import { isTauriMacOS, isTauriWindows } from '@/utils/tauriPlatform';
import {
  abortLlamaCppInstall,
  installLlamaCppViaBrewMac,
  installLlamaCppViaOfficialScriptMac,
  installLlamaCppViaScoopWindows,
  isLlamaCppInstallAbortedError,
  type LlamaCppInstallAction,
  type LlamaCppToolkitStatus,
} from '@/utils/llamaCppShell';

const LLAMA_CPP_RELEASES_URL = 'https://github.com/ggml-org/llama.cpp/releases';

const CONTENT_CLASS =
  'z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md outline-none dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg';

const TRIGGER_CLASS =
  'inline-flex shrink-0 items-center justify-center rounded-full border border-sky-300/80 bg-white/80 p-1 text-sky-800 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 dark:border-sky-800/60 dark:bg-odp-bgSoft dark:text-sky-200 dark:hover:bg-sky-950/40';

const CODE_BLOCK_CLASS =
  'mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft';

const ACTION_BTN_CLASS =
  'mt-1.5 inline-flex items-center gap-1.5 rounded border border-sky-300/80 bg-sky-50 px-2 py-1 text-[10px] font-medium text-sky-900 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-100 dark:hover:bg-sky-950/60';

const INSTALL_LABEL: Record<LlamaCppInstallAction, string> = {
  brew: 'brew install llama.cpp',
  official: 'official install script',
  scoop: 'scoop install llama.cpp',
};

type LlamaCppInstallHelpProps = {
  toolkit: LlamaCppToolkitStatus | null;
  onRefresh: () => void | Promise<void>;
};

/** Install help popover is shown on macOS and Windows desktop only. */
export function isLlamaCppInstallHelpAvailable(): boolean {
  return isTauriMacOS() || isTauriWindows();
}

type InstallRunner = (options: {
  onOutput: (line: string) => void;
  signal?: AbortSignal;
}) => Promise<void>;

export default function LlamaCppInstallHelp({ toolkit, onRefresh }: LlamaCppInstallHelpProps) {
  const [busyAction, setBusyAction] = useState<LlamaCppInstallAction | null>(null);
  const [panelAction, setPanelAction] = useState<LlamaCppInstallAction | null>(null);
  const [log, setLog] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMinimized, setPanelMinimized] = useState(false);
  const [pendingAbortAction, setPendingAbortAction] = useState<LlamaCppInstallAction | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const binaryReady = toolkit?.binaryAvailable === true;
  const mac = isTauriMacOS();
  const win = isTauriWindows();

  const startInstall = useCallback(
    async (action: LlamaCppInstallAction, fn: InstallRunner) => {
      setBusyAction(action);
      setPanelAction(action);
      setLog('');
      setPanelOpen(true);
      setPanelMinimized(false);
      try {
        await fn({
          onOutput: (line) => {
            setLog((prev) => prev + line);
          },
        });
        setLog((prev) => `${prev}\n[done] install finished.\n`);
        await onRefresh();
      } catch (err) {
        if (isLlamaCppInstallAbortedError(err)) {
          setLog((prev) => `${prev}\n[aborted] install cancelled.\n`);
          return;
        }
        const message = err instanceof Error ? err.message : 'Install failed.';
        setLog((prev) => `${prev}${message}\n`);
      } finally {
        setBusyAction(null);
      }
    },
    [onRefresh],
  );

  const requestInstall = useCallback(
    (action: LlamaCppInstallAction, fn: InstallRunner) => {
      if (busyAction) {
        if (busyAction === action) {
          setHelpOpen(false);
          setPendingAbortAction(action);
        }
        return;
      }
      void startInstall(action, fn);
    },
    [busyAction, startInstall],
  );

  const confirmAbort = useCallback(async () => {
    const action = pendingAbortAction;
    setPendingAbortAction(null);
    if (!action) return;
    try {
      await abortLlamaCppInstall(action);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to abort install.';
      setLog((prev) => `${prev}${message}\n`);
    }
  }, [pendingAbortAction]);

  if (!isLlamaCppInstallHelpAvailable()) return null;

  return (
    <>
      <Popover.Root open={helpOpen} onOpenChange={setHelpOpen}>
        <Popover.Trigger asChild>
          <button type="button" className={TRIGGER_CLASS} aria-label="llama.cpp 설치 도움말">
            <CircleHelp size={14} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content side="left" sideOffset={8} className={CONTENT_CLASS}>
            <p className="mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong">llama-server 설치</p>
            <ol className="list-decimal space-y-2 pl-4">
              {mac ? (
                <>
                  <li>
                    Homebrew
                    <pre className={CODE_BLOCK_CLASS}>brew install llama.cpp</pre>
                    {!binaryReady || busyAction === 'brew' ? (
                      <button
                        type="button"
                        className={ACTION_BTN_CLASS}
                        disabled={busyAction != null && busyAction !== 'brew'}
                        onClick={() => requestInstall('brew', installLlamaCppViaBrewMac)}
                      >
                        {busyAction === 'brew' ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : null}
                        {busyAction === 'brew' ? '설치 중… (다시 누르면 Abort)' : 'brew로 설치'}
                      </button>
                    ) : (
                      <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">
                        llama-server ready
                        {toolkit?.binaryPath ? `: ${toolkit.binaryPath}` : ''}
                      </p>
                    )}
                  </li>
                  <li>
                    Official installer
                    <pre className={CODE_BLOCK_CLASS}>
                      curl -LsSf https://llama.app/install.sh | sh
                    </pre>
                    <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
                      Installs <code className="rounded px-0.5">llama-server</code> into{' '}
                      <code className="rounded px-0.5">~/.local/bin</code>.
                    </p>
                    {!binaryReady || busyAction === 'official' ? (
                      <button
                        type="button"
                        className={ACTION_BTN_CLASS}
                        disabled={busyAction != null && busyAction !== 'official'}
                        onClick={() =>
                          requestInstall('official', installLlamaCppViaOfficialScriptMac)
                        }
                      >
                        {busyAction === 'official' ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : null}
                        {busyAction === 'official'
                          ? '설치 중… (다시 누르면 Abort)'
                          : '공식 설치 스크립트 실행'}
                      </button>
                    ) : null}
                  </li>
                </>
              ) : null}

              {win ? (
                <>
                  <li>
                    Scoop
                    <pre className={CODE_BLOCK_CLASS}>
                      {`scoop bucket add extras\nscoop install llama.cpp`}
                    </pre>
                    <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
                      GPU builds may live in the <code className="rounded px-0.5">versions</code>{' '}
                      bucket (e.g. <code className="rounded px-0.5">llama.cpp-cu13</code>).
                    </p>
                    {!binaryReady || busyAction === 'scoop' ? (
                      <button
                        type="button"
                        className={ACTION_BTN_CLASS}
                        disabled={busyAction != null && busyAction !== 'scoop'}
                        onClick={() => requestInstall('scoop', installLlamaCppViaScoopWindows)}
                      >
                        {busyAction === 'scoop' ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : null}
                        {busyAction === 'scoop'
                          ? '설치 중… (다시 누르면 Abort)'
                          : 'scoop으로 설치'}
                      </button>
                    ) : (
                      <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">
                        llama-server ready
                        {toolkit?.binaryPath ? `: ${toolkit.binaryPath}` : ''}
                      </p>
                    )}
                  </li>
                  <li>
                    GitHub Releases
                    <p className="mt-1 text-[10px]">
                      Download a Windows zip with{' '}
                      <code className="rounded px-0.5">llama-server.exe</code>, extract it, and add
                      the folder to PATH or set the binary path in Settings.
                    </p>
                    <a
                      href={LLAMA_CPP_RELEASES_URL}
                      className="mt-1 inline-block text-[10px] font-medium text-sky-700 underline dark:text-sky-300"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ggml-org/llama.cpp releases
                    </a>
                  </li>
                </>
              ) : null}
            </ol>
            <p className="mt-2 text-[10px] text-gray-500 dark:text-odp-muted">
              Detected: {toolkit?.binaryPath || 'none'}
            </p>
            <button
              type="button"
              className="mt-2 text-[10px] font-medium text-sky-700 underline dark:text-sky-300"
              onClick={() => void onRefresh()}
            >
              Re-probe binary
            </button>
            <Popover.Arrow className="fill-white dark:fill-odp-surface" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      <LlamaCppInstallLogFloatingPanel
        open={panelOpen}
        minimized={panelMinimized}
        action={panelAction}
        log={log}
        running={busyAction != null}
        onMinimize={() => setPanelMinimized(true)}
        onExpand={() => {
          setPanelMinimized(false);
          setPanelOpen(true);
        }}
        onClose={() => {
          if (busyAction) return;
          setPanelOpen(false);
          setPanelMinimized(false);
          setPanelAction(null);
        }}
      />

      <ConfirmModal
        isOpen={Boolean(pendingAbortAction)}
        title="Abort install?"
        message={
          pendingAbortAction
            ? `Stop the in-progress ${INSTALL_LABEL[pendingAbortAction]}?`
            : ''
        }
        confirmLabel="Abort"
        cancelLabel="Continue"
        variant="danger"
        onConfirm={() => void confirmAbort()}
        onCancel={() => setPendingAbortAction(null)}
      />
    </>
  );
}
