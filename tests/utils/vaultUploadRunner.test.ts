import { describe, expect, it } from 'vitest';
import { createVaultUploadRunner } from '@/utils/vaultUploadRunner';
import type { FileUploadQueueContextValue } from '@/contexts/FileUploadQueueContext';

function createMockQueue(): FileUploadQueueContextValue & {
  items: Array<{ id: string; status: string }>;
} {
  const items: Array<{ id: string; status: string }> = [];
  let nextId = 1;
  const queue: FileUploadQueueContextValue & { items: typeof items } = {
    batches: [],
    panelOpen: false,
    summary: {
      visible: false,
      isActive: false,
      chipState: 'idle',
      label: '',
      done: 0,
      total: 0,
      errorCount: 0,
      skippedCount: 0,
      cancelledCount: 0,
    },
    beginBatch: () => 'batch-1',
    enqueueItem: () => {
      const id = `item-${nextId++}`;
      items.push({ id, status: 'queued' });
      return id;
    },
    markUploading: (id) => {
      const item = items.find((entry) => entry.id === id);
      if (item) item.status = 'uploading';
    },
    markDone: (id) => {
      const item = items.find((entry) => entry.id === id);
      if (item) item.status = 'done';
    },
    markSkipped: (id) => {
      const item = items.find((entry) => entry.id === id);
      if (item) item.status = 'skipped';
    },
    markError: (id) => {
      const item = items.find((entry) => entry.id === id);
      if (item) item.status = 'error';
    },
    finishBatch: () => {},
    setPanelOpen: () => {},
    clearBatch: () => {},
    cancelItem: () => {},
    removeItem: () => {},
    deleteUploadedFile: async () => {},
    isItemCancelled: () => false,
    registerDeleteVaultFile: () => {},
    deleteVaultFileRef: { current: null },
    items,
  };
  return queue;
}

describe('createVaultUploadRunner', () => {
  it('marks items done after successful run', async () => {
    const queue = createMockQueue();
    const runner = createVaultUploadRunner(
      queue,
      { storageType: 's3', destPath: 'notes/' },
      [{ key: 'a.md', name: 'a.md' }],
    );

    await runner.run('a.md', async () => 'ok');
    runner.finish();

    expect(queue.items[0]?.status).toBe('done');
  });

  it('marks skipped items without uploading', () => {
    const queue = createMockQueue();
    const runner = createVaultUploadRunner(
      queue,
      { storageType: 'local', destPath: '' },
      [{ key: 'skip.md', name: 'skip.md' }],
    );

    runner.markSkipped('skip.md');
    expect(queue.items[0]?.status).toBe('skipped');
  });
});
