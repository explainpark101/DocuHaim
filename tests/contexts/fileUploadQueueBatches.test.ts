import { describe, expect, it } from 'vitest';

type Item = { id: string; status: string };
type Batch = { id: string; items: Item[]; isActive: boolean };

function appendBatch(batches: Batch[], batch: Batch): Batch[] {
  return [...batches, batch];
}

describe('upload queue batch accumulation', () => {
  it('appends batches instead of replacing them', () => {
    const first: Batch = {
      id: 'batch-1',
      isActive: true,
      items: [
        { id: 'a', status: 'uploading' },
        { id: 'b', status: 'queued' },
      ],
    };
    const second: Batch = {
      id: 'batch-2',
      isActive: true,
      items: [{ id: 'c', status: 'queued' }],
    };

    const batches = appendBatch(appendBatch([], first), second);
    expect(batches).toHaveLength(2);
    expect(batches.flatMap((batch) => batch.items)).toHaveLength(3);
  });
});
