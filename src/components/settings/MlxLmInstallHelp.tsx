import { CircleHelp } from 'lucide-react';
import { Tooltip } from 'radix-ui';

const TOOLTIP_CLASS =
  'z-100001 max-w-[min(92vw,360px)] rounded-md border border-gray-200 bg-white px-3 py-2.5 text-[11px] leading-relaxed text-gray-700 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg';

export default function MlxLmInstallHelp() {
  return (
    <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="MLX-LM 설치 방법"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-emerald-300/80 bg-white/80 p-1 text-emerald-800 transition hover:bg-emerald-50 dark:border-emerald-800/60 dark:bg-odp-bgSoft dark:text-emerald-200 dark:hover:bg-emerald-950/40"
          >
            <CircleHelp size={14} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CLASS}>
            <p className="mb-2 font-semibold text-gray-800 dark:text-odp-fgStrong">uv로 MLX-LM 설치</p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                uv 설치
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  curl -LsSf https://astral.sh/uv/install.sh | sh
                </pre>
              </li>
              <li>
                PATH 등록 (<code className="rounded px-0.5">~/.zshrc</code> 등)
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  {`export PATH="$HOME/.local/bin:$PATH"\n# 또는\nsource "$HOME/.local/bin/env"`}
                </pre>
                터미널을 다시 열거나 <code className="rounded px-0.5">source ~/.zshrc</code>
              </li>
              <li>
                도구 설치
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  uv tool install mlx-lm
                </pre>
                Hugging Face 다운로드용 hub CLI도 함께 필요하면:
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  uv tool install huggingface-hub
                </pre>
              </li>
              <li>
                이 앱은 PATH에서{' '}
                <code className="rounded px-0.5">which mlx_lm.server</code>로 실행 파일을 찾아
                서버를 시작합니다. uv / Homebrew 설치 후 PATH에 포함되어야 합니다.
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  which mlx_lm.server
                </pre>
                python3 모듈만 있는 경우에는{' '}
                <code className="rounded px-0.5">python3 -m mlx_lm.server</code>로 대체됩니다.
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1 font-mono text-[10px] dark:bg-odp-bgSoft">
                  uv pip install mlx-lm huggingface_hub --python python3
                </pre>
                또는 <code className="rounded px-0.5">pip install mlx-lm huggingface_hub</code>
              </li>
            </ol>
            <p className="mt-2 text-[10px] text-gray-500 dark:text-odp-muted">
              확인: <code className="rounded px-0.5">which mlx_lm.server</code> 또는{' '}
              <code className="rounded px-0.5">mlx_lm.server --help</code>
            </p>
            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
