/**
 * Regression: share intake published before ShareTargetGate subscribes must not be lost.
 * Mirrors buffer/deliver behavior in androidShareTarget.ts (kept local so we can unit-test
 * without Tauri Android IPC).
 */
import { describe, expect, it, vi } from 'vitest';

type Intake = { body: string; files: File[]; mode: string };

function createShareBus() {
  const listeners = new Set<(intake: Intake) => void>();
  const recentKeys = new Set<string>();
  let buffered: Intake | null = null;

  const keyOf = (intake: Intake) =>
    `${intake.mode}\0${intake.body}\0${intake.files.map((f) => f.name).join('|')}`;

  const deliver = (intake: Intake) => {
    const key = keyOf(intake);
    if (recentKeys.has(key)) return;
    recentKeys.add(key);
    for (const listener of listeners) listener(intake);
  };

  const publish = (intake: Intake) => {
    if (!intake.body && !intake.files.length) return;
    if (listeners.size === 0) {
      buffered = intake;
      return;
    }
    buffered = null;
    deliver(intake);
  };

  const subscribe = (listener: (intake: Intake) => void) => {
    listeners.add(listener);
    queueMicrotask(() => {
      const pending = buffered;
      if (!pending || listeners.size === 0) return;
      buffered = null;
      deliver(pending);
    });
    return () => {
      listeners.delete(listener);
    };
  };

  return { publish, subscribe };
}

describe('android share target buffer', () => {
  it('delivers intake published before the first subscriber', async () => {
    const bus = createShareBus();
    const heard: Intake[] = [];

    bus.publish({ body: 'shared text', files: [], mode: 'sendSelf' });

    bus.subscribe((intake) => {
      heard.push(intake);
    });

    await vi.waitFor(() => {
      expect(heard).toHaveLength(1);
    });
    expect(heard[0]?.body).toBe('shared text');
    expect(heard[0]?.mode).toBe('sendSelf');
  });

  it('does not drop a late duplicate after buffering (no recentKeys on buffer)', async () => {
    const bus = createShareBus();
    const heard: Intake[] = [];

    bus.publish({ body: 'shared text', files: [], mode: 'sendSelf' });
    // Same payload again while still buffered — latest wins, still delivered once.
    bus.publish({ body: 'shared text', files: [], mode: 'sendSelf' });

    bus.subscribe((intake) => {
      heard.push(intake);
    });

    await vi.waitFor(() => {
      expect(heard).toHaveLength(1);
    });
  });
});
