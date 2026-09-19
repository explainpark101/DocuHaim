import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

type WorkspacePanePlaceholderProps = {
  /** Optional accessible label while content loads. */
  label?: string;
  className?: string;
  /**
   * `full` — header + body skeleton (Suspense / standalone).
   * `body` — body only when the leaf chrome header is already rendered.
   */
  variant?: 'full' | 'body';
};

/**
 * Full-bleed skeleton for a newly created split pane.
 * Reserves the leaf's flex space until real tab content replaces it.
 */
export default function WorkspacePanePlaceholder({
  label = '페인 로딩 중',
  className = '',
  variant = 'full',
}: WorkspacePanePlaceholderProps) {
  return (
    <div
      className={`absolute inset-0 z-10 flex h-full min-h-full w-full min-w-0 flex-col overflow-hidden bg-white dark:bg-odp-surface ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {variant === 'full' ? (
        <div className="flex h-8 shrink-0 items-center gap-2 border-b border-gray-200 bg-gray-50 px-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          <div className="h-2.5 w-28 max-w-[50%] animate-pulse rounded bg-gray-200 dark:bg-odp-focusBg" />
          <div className="ml-auto size-5 shrink-0 animate-pulse rounded bg-gray-200/80 dark:bg-odp-focusBg/80" />
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3">
        <div className="h-3 w-[72%] animate-pulse rounded bg-gray-100 dark:bg-odp-focusBg/70" />
        <div className="h-3 w-[88%] animate-pulse rounded bg-gray-100 dark:bg-odp-focusBg/70" />
        <div className="h-3 w-[64%] animate-pulse rounded bg-gray-100 dark:bg-odp-focusBg/70" />
        <div className="mt-2 min-h-0 flex-1 animate-pulse rounded-md bg-gray-50 dark:bg-odp-bgSoft/80" />
      </div>
    </div>
  );
}

type WorkspacePaneContentRevealProps = {
  /** When true, show placeholder until the first paint of children completes. */
  pending: boolean;
  onReady?: () => void;
  children: ReactNode;
};

/**
 * Keeps a placeholder filling the leaf, then swaps to `children` after mount/paint.
 */
export function WorkspacePaneContentReveal({
  pending,
  onReady,
  children,
}: WorkspacePaneContentRevealProps) {
  const [ready, setReady] = useState(!pending);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const pendingGen = useRef(0);

  useLayoutEffect(() => {
    if (!pending) {
      setReady(true);
      return;
    }
    setReady(false);
    const gen = ++pendingGen.current;
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (pendingGen.current !== gen) return;
        setReady(true);
        onReadyRef.current?.();
      });
    });
    return () => {
      window.cancelAnimationFrame(raf1);
      if (raf2) window.cancelAnimationFrame(raf2);
    };
  }, [pending]);

  return (
    <>
      {!ready ? <WorkspacePanePlaceholder variant="body" /> : null}
      <div
        className={`absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden ${
          ready ? '' : 'invisible'
        }`}
        aria-hidden={!ready}
      >
        {children}
      </div>
    </>
  );
}
