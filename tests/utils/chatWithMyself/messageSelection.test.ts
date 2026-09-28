import { describe, expect, it } from 'vitest';
import {
  rangeSelectIds,
  shouldBulkPin,
  sortMessagesByAtAsc,
  toggleSelectedId,
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
});
