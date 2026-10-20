/**
 * Yield the main thread so input and paint can run.
 * scheduler.yield is limited availability; Safari falls back to setTimeout(0).
 */

type SchedulerWithYield = {
  yield?: () => Promise<void>;
};

export function yieldToMain(): Promise<void> {
  const scheduler = (globalThis as { scheduler?: SchedulerWithYield }).scheduler;
  if (scheduler && typeof scheduler.yield === 'function') {
    return scheduler.yield();
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
