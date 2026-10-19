import { describe, expect, it, vi } from 'vitest';
import {
  createChatTimelineStore,
  deriveVisibleMessages,
  type ChatTimelineMessage,
} from '@/utils/chatWithMyself/chatTimelineStore';

function msg(id: string, group: string): ChatTimelineMessage {
  return { id, group };
}

describe('chatTimelineStore', () => {
  it('keeps the visible array when prepended days miss the group', () => {
    const kept = [msg('a', 'diary')];
    const next = deriveVisibleMessages(
      [msg('old', 'other'), ...kept],
      [],
      'diary',
      kept,
    );
    expect(next).toBe(kept);
  });

  it('replaces visible messages when the group gains a hit', () => {
    const kept = [msg('a', 'diary')];
    const added = msg('old', 'diary');
    const next = deriveVisibleMessages(
      [added, ...kept],
      [],
      'diary',
      kept,
    );
    expect(next).not.toBe(kept);
    expect(next.map((m) => m.id)).toEqual(['old', 'a']);
  });

  it('does not notify when the scan date is unchanged', () => {
    const store = createChatTimelineStore();
    const listener = vi.fn();
    store.subscribe(listener);
    const scan = {
      dateStr: '2020-01-01',
      label: '2020년 01월 01일',
      groupLabel: '일기',
      index: 3,
      total: 10,
    };
    store.setOlderScan(scan);
    store.setOlderScan({ ...scan });
    expect(listener).toHaveBeenCalledTimes(1);
    store.setOlderScan(null);
    expect(store.getState().olderScan).toBeNull();
  });

  it('preserves visible identity across setMessages for unrelated groups', () => {
    const store = createChatTimelineStore();
    store.setViewContext([], 'diary');
    store.setMessages([msg('a', 'diary')]);
    const visible = store.getState().visibleMessages;
    const listener = vi.fn();
    store.subscribe(listener);
    store.setMessages((prev) => [msg('b', 'other'), ...prev]);
    expect(store.getState().visibleMessages).toBe(visible);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
