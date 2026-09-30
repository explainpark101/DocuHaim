import { describe, expect, it } from 'vitest';
import {
  joinMessageBodiesForMerge,
  planMergeChatMessages,
  rangeSelectIds,
  shouldBulkPin,
  sortMessagesByAtAsc,
  toggleSelectedId,
  unionMessageReactions,
} from '@/utils/chatWithMyself/messageSelection';

describe('messageSelection', () => {
  it('toggleSelectedId adds and removes', () => {
    const a = toggleSelectedId(new Set(), 'm1');
    expect([...a]).toEqual(['m1']);
    const b = toggleSelectedId(a, 'm1');
    expect([...b]).toEqual([]);
  });

  it('rangeSelectIds fills inclusive range', () => {
    const ordered = ['a', 'b', 'c', 'd'];
    const next = rangeSelectIds(ordered, new Set(['x']), 'b', 'd');
    expect([...next].sort()).toEqual(['b', 'c', 'd', 'x']);
  });

  it('shouldBulkPin is true when any is unpinned', () => {
    expect(shouldBulkPin([{ pinnedAt: '2020-01-01' }, { pinnedAt: '' }])).toBe(
      true,
    );
    expect(
      shouldBulkPin([{ pinnedAt: '2020-01-01' }, { pinnedAt: '2020-01-02' }]),
    ).toBe(false);
  });

  it('sortMessagesByAtAsc orders by at', () => {
    const sorted = sortMessagesByAtAsc([
      { at: '2024-01-02T00:00:00.000Z', id: 'b' },
      { at: '2024-01-01T00:00:00.000Z', id: 'a' },
    ]);
    expect(sorted.map((m) => m.id)).toEqual(['a', 'b']);
  });

  it('joinMessageBodiesForMerge joins trimmed bodies', () => {
    expect(
      joinMessageBodiesForMerge([
        { body: 'alpha  ' },
        { body: '' },
        { body: 'beta' },
      ]),
    ).toBe('alpha\n\nbeta');
  });

  it('unionMessageReactions dedupes by key', () => {
    const reactions = unionMessageReactions([
      { reactions: [{ kind: 'emoji', value: '👍' }] },
      {
        reactions: [
          { kind: 'emoji', value: '👍' },
          { kind: 'lucide', value: 'heart' },
        ],
      },
    ]);
    expect(reactions).toEqual([
      { kind: 'emoji', value: '👍' },
      { kind: 'lucide', value: 'heart' },
    ]);
  });

  it('planMergeChatMessages keeps earliest and removes the rest', () => {
    const plan = planMergeChatMessages([
      {
        id: 'b',
        at: '2024-01-02T00:00:00.000Z',
        body: 'second',
        pinnedAt: '2024-01-02T01:00:00.000Z',
        markdown: true,
      },
      {
        id: 'a',
        at: '2024-01-01T00:00:00.000Z',
        body: 'first',
        reactions: [{ kind: 'emoji', value: '😀' }],
      },
    ]);
    expect(plan).not.toBeNull();
    expect(plan?.keep.id).toBe('a');
    expect(plan?.remove.map((m) => m.id)).toEqual(['b']);
    expect(plan?.body).toBe('first\n\nsecond');
    expect(plan?.markdown).toBe(true);
    expect(plan?.pinnedAt).toBe('2024-01-02T01:00:00.000Z');
    expect(plan?.reactions).toEqual([{ kind: 'emoji', value: '😀' }]);
    expect(planMergeChatMessages([{ id: 'only', at: '2024-01-01T00:00:00.000Z' }])).toBeNull();
  });
});
