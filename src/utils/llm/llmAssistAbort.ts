/**
 * Abort helpers for in-flight LLM Assist generation.
 */

export function createLlmAssistAbortError(message = 'LLM generation aborted'): Error {
  if (typeof DOMException !== 'undefined') {
    return new DOMException(message, 'AbortError');
  }
  const err = new Error(message);
  err.name = 'AbortError';
  return err;
}

export function isLlmAssistAbortError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const name = (err as { name?: string }).name;
  if (name === 'AbortError') return true;
  if (typeof DOMException !== 'undefined' && err instanceof DOMException) {
    return err.name === 'AbortError';
  }
  return false;
}

export function throwIfLlmAssistAborted(signal?: AbortSignal | null): void {
  if (!signal?.aborted) return;
  if (signal.reason != null && isLlmAssistAbortError(signal.reason)) {
    throw signal.reason;
  }
  if (signal.reason instanceof Error) throw signal.reason;
  throw createLlmAssistAbortError();
}

/** Sleep that rejects early when `signal` aborts. */
export function sleepUntilLlmAssistAbort(
  ms: number,
  signal?: AbortSignal | null,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(
        isLlmAssistAbortError(signal.reason)
          ? signal.reason
          : createLlmAssistAbortError(),
      );
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(
        isLlmAssistAbortError(signal?.reason)
          ? signal?.reason
          : createLlmAssistAbortError(),
      );
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
