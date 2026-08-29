import { describe, expect, it, vi } from 'vitest';
import {
  createIncrementalIndexQueue,
  type IncrementalFlushPayload,
} from '@/utils/advancedSearch/incrementalIndexQueue';

describe('createIncrementalIndexQueue', () => {
  it('coalesces duplicate paths and debounces flush', async () => {
    vi.useFakeTimers();
    const onFlush = vi.fn(async (_payload: IncrementalFlushPayload) => undefined);
    let runnable = true;
    const queue = createIncrementalIndexQueue({
      debounceMs: 1000,
      idleTimeoutMs: 5000,
      shouldRun: () => runnable,
      onFlush,
    });

    queue.enqueueFile('notes/a.md', 'first');
    queue.enqueueFile('notes/a.md', 'second');
    queue.enqueueChat('2026-01-01', 'chat body');

    await vi.advanceTimersByTimeAsync(999);
    expect(onFlush).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    await vi.runAllTimersAsync();

    expect(onFlush).toHaveBeenCalledTimes(1);
    const payload = onFlush.mock.calls[0]?.[0];
    expect(payload?.files.get('notes/a.md')).toBe('second');
    expect(payload?.chats.get('2026-01-01')).toBe('chat body');

    queue.dispose();
    vi.useRealTimers();
  });

  it('pauses scheduling until resumed', async () => {
    vi.useFakeTimers();
    const onFlush = vi.fn(async (_payload: IncrementalFlushPayload) => undefined);
    const queue = createIncrementalIndexQueue({
      debounceMs: 100,
      idleTimeoutMs: 1000,
      shouldRun: () => true,
      onFlush,
    });

    queue.pause();
    queue.enqueueFile('notes/b.md', 'body');
    await vi.advanceTimersByTimeAsync(500);
    expect(onFlush).not.toHaveBeenCalled();

    queue.resume();
    await vi.advanceTimersByTimeAsync(100);
    await vi.runAllTimersAsync();
    expect(onFlush).toHaveBeenCalledTimes(1);

    queue.dispose();
    vi.useRealTimers();
  });
});
