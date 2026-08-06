import {
  isIndexWorkerResponse,
  type ChatUpsertPatch,
  type FileUpsertPatch,
  type FinalizeResult,
  type IndexWorkerEvent,
  type IndexWorkerInbound,
  type IndexWorkerRequest,
  type IndexWorkerResponse,
  type WorkerLogLevel,
} from './indexWorkerProtocol';

type Pending = {
  resolve: (value: IndexWorkerResponse) => void;
  reject: (err: Error) => void;
};

export type IndexWorkerClientOptions = {
  onLog?: (level: WorkerLogLevel, message: string) => void;
  onProgress?: (done: number, totalHint?: number) => void;
};

/**
 * Main-thread RPC wrapper around the advanced-search index Worker.
 * Returns null from `tryCreate` when Workers are unavailable.
 */
export class IndexWorkerClient {
  private worker: Worker;
  private seq = 0;
  private pending = new Map<number, Pending>();
  private options: IndexWorkerClientOptions;
  private disposed = false;

  private constructor(worker: Worker, options: IndexWorkerClientOptions = {}) {
    this.worker = worker;
    this.options = options;
    this.worker.onmessage = (ev: MessageEvent<IndexWorkerInbound>) => {
      this.handleMessage(ev.data);
    };
    this.worker.onerror = (ev) => {
      const err = new Error(ev.message || 'Index worker error');
      for (const [, p] of this.pending) p.reject(err);
      this.pending.clear();
    };
  }

  static tryCreate(options?: IndexWorkerClientOptions): IndexWorkerClient | null {
    if (typeof Worker === 'undefined') return null;
    try {
      const worker = new Worker(
        new URL('./indexWorker.ts', import.meta.url),
        { type: 'module' },
      );
      return new IndexWorkerClient(worker, options || {});
    } catch (err) {
      console.warn('[advancedSearch] failed to create index worker', err);
      return null;
    }
  }

  setOptions(options: IndexWorkerClientOptions): void {
    this.options = { ...this.options, ...options };
  }

  private handleMessage(msg: IndexWorkerInbound): void {
    if (!msg || typeof msg !== 'object') return;
    if (!isIndexWorkerResponse(msg)) {
      const event = msg as IndexWorkerEvent;
      if (event.type === 'log') {
        this.options.onLog?.(event.level, event.message);
      } else if (event.type === 'progress') {
        this.options.onProgress?.(event.done, event.totalHint);
      }
      return;
    }
    const pending = this.pending.get(msg.id);
    if (!pending) return;
    this.pending.delete(msg.id);
    if (msg.type === 'error') {
      pending.reject(new Error(msg.message));
      return;
    }
    pending.resolve(msg);
  }

  private request(
    body: IndexWorkerRequest extends infer R
      ? R extends { id: number }
        ? Omit<R, 'id'>
        : never
      : never,
  ): Promise<IndexWorkerResponse> {
    if (this.disposed) {
      return Promise.reject(new Error('Index worker disposed'));
    }
    const id = (this.seq += 1);
    const req = { ...body, id } as IndexWorkerRequest;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      try {
        this.worker.postMessage(req);
      } catch (err) {
        this.pending.delete(id);
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }

  async init(): Promise<void> {
    const res = await this.request({ type: 'init' });
    if (res.type !== 'ok') {
      throw new Error('Index worker init failed');
    }
  }

  async startRebuild(): Promise<void> {
    const res = await this.request({ type: 'startRebuild' });
    if (res.type !== 'ok') {
      throw new Error('Index worker startRebuild failed');
    }
  }

  async processFile(path: string, content: string): Promise<boolean> {
    const res = await this.request({ type: 'processFile', path, content });
    if (res.type !== 'processFileResult') {
      throw new Error('Unexpected processFile response');
    }
    return res.ok;
  }

  async processChatDay(path: string, content: string): Promise<number> {
    const res = await this.request({ type: 'processChatDay', path, content });
    if (res.type !== 'processChatDayResult') {
      throw new Error('Unexpected processChatDay response');
    }
    return res.changed;
  }

  async finalize(): Promise<FinalizeResult> {
    const res = await this.request({ type: 'finalize' });
    if (res.type !== 'finalizeResult') {
      throw new Error('Unexpected finalize response');
    }
    return res.result;
  }

  async upsertFile(
    path: string,
    content: string,
    existingHash?: string | null,
  ): Promise<FileUpsertPatch> {
    const res = await this.request({
      type: 'upsertFile',
      path,
      content,
      existingHash: existingHash ?? null,
    });
    if (res.type !== 'upsertFileResult') {
      throw new Error('Unexpected upsertFile response');
    }
    return res.patch;
  }

  async upsertChatDay(
    path: string,
    content: string,
    existingHashes: Record<string, string>,
  ): Promise<ChatUpsertPatch> {
    const res = await this.request({
      type: 'upsertChatDay',
      path,
      content,
      existingHashes,
    });
    if (res.type !== 'upsertChatDayResult') {
      throw new Error('Unexpected upsertChatDay response');
    }
    return res.patch;
  }

  async cancel(): Promise<void> {
    try {
      await this.request({ type: 'cancel' });
    } catch {
      // ignore
    }
  }

  dispose(): void {
    this.disposed = true;
    for (const [, p] of this.pending) {
      p.reject(new Error('Index worker disposed'));
    }
    this.pending.clear();
    this.worker.terminate();
  }
}
