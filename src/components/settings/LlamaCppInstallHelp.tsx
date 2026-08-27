import { useCallback, useState } from 'react';
import { CircleHelp, Loader2 } from 'lucide-react';
import { Popover } from 'radix-ui';
import { isTauriMacOS, isTauriWindows } from '@/utils/tauriPlatform';
import {
  installLlamaCppViaBrewMac,
  installLlamaCppViaOfficialScriptMac,
  installLlamaCppViaScoopWindows,
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

type LlamaCppInstallHelpProps = {
  toolkit: LlamaCppToolkitStatus | null;
  onRefresh: () => void | Promise<void>;
};

type InstallAction = 'brew' | 'official' | 'scoop';

/** Install help popover is shown on macOS and Windows desktop only. */
export function isLlamaCppInstallHelpAvailable(): boolean {
  return isTauriMacOS() || isTauriWindows();
}

function InstallLog({ log }: { log: string }) {
  if (!log) return null;
  return (
    <pre className="mt-2 max-h-28 overflow-auto rounded bg-gray-100 px-2 py-1 font-mono text-[9px] text-gray-700 dark:bg-odp-bgSoft dark:text-odp-muted">
      {log}
    </pre>
  );
}

function MacInstallHelp({
  toolkit,
  onRefresh,
}: LlamaCppInstallHelpProps) {
  const [busyAction, setBusyAction] = useState<InstallAction | null>(null);
  const [log, setLog] = useState('');
  const binaryReady = toolkit?.binaryAvailable === true;

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

  return (
    <>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Homebrew
          <pre className={CODE_BLOCK_CLASS}>brew install llama.cpp</pre>
          {!binaryReady ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('brew', installLlamaCppViaBrewMac)}
            >
              {busyAction === 'brew' ? <Loader2 size={12} className="animate-spin" /> : null}
              brew로 설치
            </button>
          ) : (
            <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">
              llama-server ready{toolkit?.binaryPath ? `: ${toolkit.binaryPath}` : ''}
            </p>
          )}
        </li>
        <li>
          Official installer
          <pre className={CODE_BLOCK_CLASS}>curl -LsSf https://llama.app/install.sh | sh</pre>
          <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
            Installs <code className="rounded px-0.5">llama-server</code> into{' '}
            <code className="rounded px-0.5">~/.local/bin</code>.
          </p>
          {!binaryReady ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('official', installLlamaCppViaOfficialScriptMac)}
            >
              {busyAction === 'official' ? <Loader2 size={12} className="animate-spin" /> : null}
              공식 설치 스크립트 실행
            </button>
          ) : null}
        </li>
      </ol>
      <InstallLog log={log} />
    </>
  );
}

function WindowsInstallHelp({
  toolkit,
  onRefresh,
}: LlamaCppInstallHelpProps) {
  const [busyAction, setBusyAction] = useState<InstallAction | null>(null);
  const [log, setLog] = useState('');
  const binaryReady = toolkit?.binaryAvailable === true;

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

  return (
    <>
      <ol className="list-decimal space-y-2 pl-4">
        <li>
          Scoop
          <pre className={CODE_BLOCK_CLASS}>
            {`scoop bucket add extras\nscoop install llama.cpp`}
          </pre>
          <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
            GPU builds may live in the <code className="rounded px-0.5">versions</code> bucket (e.g.{' '}
            <code className="rounded px-0.5">llama.cpp-cu13</code>).
          </p>
          {!binaryReady ? (
            <button
              type="button"
              className={ACTION_BTN_CLASS}
              disabled={busyAction != null}
              onClick={() => void runInstall('scoop', installLlamaCppViaScoopWindows)}
            >
              {busyAction === 'scoop' ? <Loader2 size={12} className="animate-spin" /> : null}
              scoop으로 설치
            </button>
          ) : (
            <p className="mt-1 text-[10px] text-sky-700 dark:text-sky-300">
              llama-server ready{toolkit?.binaryPath ? `: ${toolkit.binaryPath}` : ''}
            </p>
          )}
        </li>
        <li>
          GitHub Releases
          <p className="mt-1 text-[10px]">
            Download a Windows zip with <code className="rounded px-0.5">llama-server.exe</code>, extract
            it, and add the folder to PATH or set the binary path in Settings.
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
      </ol>
      <InstallLog log={log} />
    </>
  );
}

export default function LlamaCppInstallHelp({ toolkit, onRefresh }: LlamaCppInstallHelpProps) {
  if (!isLlamaCppInstallHelpAvailable()) return null;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button type="button" className={TRIGGER_CLASS} aria-label="llama.cpp 설치 도움말">
          <CircleHelp size={14} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="left" sideOffset={8} className={CONTENT_CLASS}>
          <p className="mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong">llama-server 설치</p>
          {isTauriMacOS() ? (
            <MacInstallHelp toolkit={toolkit} onRefresh={onRefresh} />
          ) : (
            <WindowsInstallHelp toolkit={toolkit} onRefresh={onRefresh} />
          )}
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
  );
}
