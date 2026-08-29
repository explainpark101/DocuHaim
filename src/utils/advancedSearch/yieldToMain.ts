/** Cooperative yield so indexing does not starve the UI thread. */

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
 * Yield to the browser: paint frame first, then a macrotask.
 * Prefer this over bare setTimeout(0) during long rebuild loops.
 */
export function yieldToMain(): Promise<void> {
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
