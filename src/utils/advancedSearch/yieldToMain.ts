/** Cooperative yield so indexing / tree builds do not starve the UI thread. */

type SchedulerWithYield = {
  yield?: () => Promise<void>;
  postTask?: (
    callback: () => void,
    options?: { priority?: 'user-blocking' | 'user-visible' | 'background' },
  ) => Promise<unknown>;
};

function getScheduler(): SchedulerWithYield | undefined {
  if (typeof globalThis === 'undefined') return undefined;
  const sch = (globalThis as { scheduler?: SchedulerWithYield }).scheduler;
  return sch;
}

/**
 * Schedule work when the browser is idle (or after `timeoutMs` at most).
 * Returns an idle callback id when supported; otherwise `null`.
 */
export function whenIdle(fn: () => void, timeoutMs = 30000): number | null {
  if (typeof requestIdleCallback === 'function') {
    return requestIdleCallback(fn, { timeout: timeoutMs });
  }
  setTimeout(fn, 0);
  return null;
}

/**
 * Yield to the browser so input / resize / paint can run.
 * Prefers `scheduler.yield()` (MWG break-up-long-tasks); falls back to rAF + setTimeout.
 */
export function yieldToMain(): Promise<void> {
  const sch = getScheduler();
  if (typeof sch?.yield === 'function') {
    return sch.yield();
  }
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        setTimeout(resolve, 0);
      });
      return;
    }
    setTimeout(resolve, 0);
  });
}

/**
 * Schedule non-urgent work after paint (MWG schedule-tasks-by-priority).
 * Uses `scheduler.postTask({ priority: 'background' })` when available.
 */
export function scheduleBackgroundTask(fn: () => void): void {
  const sch = getScheduler();
  if (typeof sch?.postTask === 'function') {
    void sch.postTask(fn, { priority: 'background' });
    return;
  }
  whenIdle(fn, 200);
}

/**
 * Run `fn` and yield if it took longer than `budgetMs`.
 */
export async function yieldIfSlow(
  startedAt: number,
  budgetMs = 12,
): Promise<void> {
  if (Date.now() - startedAt >= budgetMs) {
    await yieldToMain();
  }
}

/**
 * Wait until workspace tab restore finishes (or timeout) so index load does not
 * contend with parallel tab file reads during startup.
 */
export async function waitForWorkspaceTabsRestore(
  isEnabled: () => boolean,
  isRestored: () => boolean,
  options?: { pollMs?: number; timeoutMs?: number },
): Promise<void> {
  if (!isEnabled()) return;
  if (isRestored()) return;
  const pollMs = options?.pollMs ?? 40;
  const timeoutMs = options?.timeoutMs ?? 120_000;
  const start = Date.now();
  while (!isRestored()) {
    if (Date.now() - start > timeoutMs) return;
    await new Promise<void>((r) => setTimeout(r, pollMs));
    await yieldToMain();
  }
}
