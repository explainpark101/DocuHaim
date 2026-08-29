/**
 * Coalesce vault save/chat notify events before indexing.
 * Runs on idle so typing and autosave stay responsive.
 */

import { whenIdle } from '@/utils/advancedSearch/yieldToMain';

export type IncrementalFlushPayload = {
  files: ReadonlyMap<string, string>;
  chats: ReadonlyMap<string, string>;
};

export type IncrementalIndexQueue = {
  enqueueFile: (path: string, content: string) => void;
  enqueueChat: (dateStr: string, content: string) => void;
  pause: () => void;
  resume: () => void;
  clear: () => void;
  dispose: () => void;
};

export function createIncrementalIndexQueue(options: {
  debounceMs: number;
  idleTimeoutMs: number;
  onFlush: (payload: IncrementalFlushPayload) => Promise<void>;
  shouldRun: () => boolean;
}): IncrementalIndexQueue {
  const pendingFiles = new Map<string, string>();
  const pendingChats = new Map<string, string>();
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let idleId: number | null = null;
  let running = false;
  let paused = false;

  const clearIdle = () => {
    if (idleId != null && typeof cancelIdleCallback === 'function') {
      cancelIdleCallback(idleId);
      idleId = null;
    }
  };

  const clearDebounce = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
  };

  const schedule = () => {
    if (paused) return;
    if (pendingFiles.size === 0 && pendingChats.size === 0) return;
    clearDebounce();
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      runWhenIdle();
    }, options.debounceMs);
  };

  const runWhenIdle = () => {
    if (paused || running) return;
    if (!options.shouldRun()) {
      schedule();
      return;
    }
    clearIdle();
    idleId = whenIdle(() => {
      idleId = null;
      void flush();
    }, options.idleTimeoutMs);
  };

  const flush = async () => {
    if (running || paused) return;
    if (pendingFiles.size === 0 && pendingChats.size === 0) return;
    if (!options.shouldRun()) {
      schedule();
      return;
    }

    running = true;
    const files = new Map(pendingFiles);
    const chats = new Map(pendingChats);
    pendingFiles.clear();
    pendingChats.clear();

    try {
      await options.onFlush({ files, chats });
    } catch (err) {
      console.warn('[advancedSearch] incremental index flush failed', err);
      for (const [path, content] of files) {
        if (!pendingFiles.has(path)) pendingFiles.set(path, content);
      }
      for (const [dateStr, content] of chats) {
        if (!pendingChats.has(dateStr)) pendingChats.set(dateStr, content);
      }
    } finally {
      running = false;
      if (pendingFiles.size > 0 || pendingChats.size > 0) {
        schedule();
      }
    }
  };

  return {
    enqueueFile(path: string, content: string) {
      pendingFiles.set(path, content);
      schedule();
    },
    enqueueChat(dateStr: string, content: string) {
      pendingChats.set(dateStr, content);
      schedule();
    },
    pause() {
      paused = true;
      clearDebounce();
      clearIdle();
    },
    resume() {
      paused = false;
      schedule();
    },
    clear() {
      pendingFiles.clear();
      pendingChats.clear();
      clearDebounce();
      clearIdle();
    },
    dispose() {
      paused = true;
      pendingFiles.clear();
      pendingChats.clear();
      clearDebounce();
      clearIdle();
    },
  };
}
