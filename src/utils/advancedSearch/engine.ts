import {
  collectIndexablePathsFromTree,
  isIndexableFilePath,
} from './collectSources';
import {
  applyChatUpsertPatch,
  applyFileUpsertPatch,
  upsertChatDayDocuments,
  upsertFileDocument,
} from './buildIndex';
import {
  clearIndexInVault,
  hydrateIndexFromBlobs,
  loadIndexFromVault,
  saveIndexBlobsToVault,
  saveIndexToVault,
  type AdvancedSearchBackend,
} from './store';
import {
  loadAdvancedSearchIndexEnabled,
  loadAdvancedSearchIncludeOtherFiles,
  saveAdvancedSearchIndexEnabled,
  saveAdvancedSearchIncludeOtherFiles,
} from './settings';
import {
  emptyIndex,
  isIndexInitialized,
  recountManifest,
  type InMemoryIndex,
} from './types';
import { ensureGaru } from './tokenize';
import {
  subscribeAdvancedSearchChanges,
  type AdvancedSearchChangeEvent,
} from './notify';
import { runAdvancedSearch, type AdvancedSearchHit } from './query';
import { IndexWorkerClient } from './indexWorkerClient';
import { fileDocId } from './paths';
import { chatDateFromPath } from './collectSources';

export type BuildLogLevel = 'info' | 'ok' | 'warn' | 'error';

export type BuildLogEntry = {
  id: number;
  at: string;
  level: BuildLogLevel;
  message: string;
};

export type EngineStatus = {
  enabled: boolean;
  loaded: boolean;
  building: boolean;
  dirty: boolean;
  /** False until user runs a full background build (or legacy index with docs). */
  hasIndex: boolean;
  /** Index txt/json/html/… in addition to Markdown. */
  includeOtherFiles: boolean;
  fileCount: number;
  chatCount: number;
  builtAt: string | null;
  lastError: string | null;
  /** 0–1 while building; null when idle. */
  buildProgress: number | null;
  /** Recent background index log lines (newest last). */
  buildLogs: BuildLogEntry[];
};

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

/** Emit UI updates at most this often during rebuild (React thrash freeze). */
const EMIT_MIN_MS = 250;
/** Log a progress line every N successful items (failures always logged). */
const LOG_EVERY = 20;
const MAX_BUILD_LOGS = 300;

/** Yield to the event loop so paint/input can run between heavy sync work (fallback path). */
function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

class AdvancedSearchEngine {
  private index: InMemoryIndex = emptyIndex();
  private loaded = false;
  private building = false;
  private dirty = false;
  private enabled = loadAdvancedSearchIndexEnabled();
  private includeOtherFiles = loadAdvancedSearchIncludeOtherFiles();
  private backend: AdvancedSearchBackend | null = null;
  private getTree: (() => TreeNode[]) | null = null;
  private persistTimer: ReturnType<typeof setTimeout> | null = null;
  private lastError: string | null = null;
  private buildProgress: number | null = null;
  private buildLogs: BuildLogEntry[] = [];
  private buildLogSeq = 0;
  private lastBuildEmitAt = 0;
  private unsub: (() => void) | null = null;
  private listeners = new Set<() => void>();
  private workerClient: IndexWorkerClient | null | undefined;
  private workerInitFailed = false;
  private workerReady = false;

  constructor() {
    this.unsub = subscribeAdvancedSearchChanges((event) => {
      void this.handleChangeEvent(event);
    });
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    for (const l of this.listeners) {
      try {
        l();
      } catch {
        // ignore
      }
    }
  }

  private appendLog(level: BuildLogLevel, message: string): void {
    this.buildLogSeq += 1;
    this.buildLogs.push({
      id: this.buildLogSeq,
      at: new Date().toISOString(),
      level,
      message,
    });
    if (this.buildLogs.length > MAX_BUILD_LOGS) {
      this.buildLogs = this.buildLogs.slice(-MAX_BUILD_LOGS);
    }
  }

  private clearBuildLogs(): void {
    this.buildLogs = [];
  }

  /** Throttle listener notify during bulk rebuild to avoid main-thread React storms. */
  private emitBuildProgress(force = false): void {
    const now = Date.now();
    if (!force && now - this.lastBuildEmitAt < EMIT_MIN_MS) return;
    this.lastBuildEmitAt = now;
    this.emit();
  }

  getBuildLogs(): BuildLogEntry[] {
    return this.buildLogs;
  }

  hasIndex(): boolean {
    return this.loaded && isIndexInitialized(this.index);
  }

  getStatus(): EngineStatus {
    return {
      enabled: this.enabled,
      loaded: this.loaded,
      building: this.building,
      dirty: this.dirty,
      hasIndex: this.hasIndex(),
      includeOtherFiles: this.includeOtherFiles,
      fileCount: this.index.manifest.fileCount,
      chatCount: this.index.manifest.chatCount,
      builtAt: this.index.manifest.builtAt || null,
      lastError: this.lastError,
      buildProgress: this.buildProgress,
      buildLogs: this.buildLogs,
    };
  }

  getIndex(): InMemoryIndex {
    return this.index;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(value: boolean): void {
    this.enabled = Boolean(value);
    saveAdvancedSearchIndexEnabled(this.enabled);
    this.emit();
    // Do not auto-rebuild when enabling — user must start indexing from Settings.
    if (this.enabled && this.backend?.isReady?.()) {
      void this.ensureLoaded();
    }
  }

  setIncludeOtherFiles(value: boolean): void {
    this.includeOtherFiles = Boolean(value);
    saveAdvancedSearchIncludeOtherFiles(this.includeOtherFiles);
    this.emit();
  }

  configure(options: {
    backend: AdvancedSearchBackend | null;
    getTree?: () => TreeNode[];
  }): void {
    this.backend = options.backend;
    if (options.getTree) this.getTree = options.getTree;
  }

  async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    if (!this.backend?.isReady?.()) return;
    try {
      this.index = await loadIndexFromVault(this.backend);
      // Legacy manifests without `initialized`: treat non-empty docs as initialized.
      if (
        this.index.manifest.initialized !== true &&
        this.index.docs.size > 0
      ) {
        this.index.manifest.initialized = true;
      }
      this.loaded = true;
      this.lastError = null;
      this.emit();
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      this.index = emptyIndex();
      this.loaded = true;
      this.emit();
    }
  }

  private schedulePersist(): void {
    this.dirty = true;
    this.emit();
    if (this.persistTimer) clearTimeout(this.persistTimer);
    this.persistTimer = setTimeout(() => {
      void this.persistNow();
    }, 1200);
  }

  async persistNow(): Promise<void> {
    if (!this.enabled || !this.backend?.isReady?.()) return;
    try {
      await saveIndexToVault(this.backend, this.index);
      this.dirty = false;
      this.lastError = null;
      this.emit();
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      this.emit();
    }
  }

  async clearCache(): Promise<void> {
    if (this.persistTimer) {
      clearTimeout(this.persistTimer);
      this.persistTimer = null;
    }
    if (this.workerClient) {
      void this.workerClient.cancel();
    }
    this.index = emptyIndex();
    this.loaded = true;
    this.dirty = false;
    this.buildProgress = null;
    if (this.backend?.isReady?.()) {
      try {
        await clearIndexInVault(this.backend);
        this.lastError = null;
      } catch (err) {
        this.lastError = err instanceof Error ? err.message : String(err);
      }
    }
    this.emit();
  }

  private getWorker(): IndexWorkerClient | null {
    if (this.workerInitFailed) return null;
    if (this.workerClient === undefined) {
      this.workerClient = IndexWorkerClient.tryCreate({
        onLog: (level, message) => {
          this.appendLog(level, message);
          this.emitBuildProgress();
        },
      });
      if (!this.workerClient) this.workerInitFailed = true;
    }
    return this.workerClient;
  }

  private async ensureWorkerReady(): Promise<IndexWorkerClient | null> {
    const client = this.getWorker();
    if (!client) return null;
    if (this.workerReady) return client;
    try {
      await client.init();
      this.workerReady = true;
      return client;
    } catch (err) {
      console.warn('[advancedSearch] worker init failed; using main thread', err);
      this.workerInitFailed = true;
      this.workerReady = false;
      client.dispose();
      this.workerClient = null;
      return null;
    }
  }

  /**
   * Full vault index build.
   * Prefer Web Worker for CPU work; fall back to main-thread path if unavailable.
   */
  async rebuild(): Promise<void> {
    if (!this.enabled) {
      this.appendLog('warn', '역색인이 꺼져 있어 색인을 시작할 수 없습니다.');
      this.emit();
      return;
    }
    if (!this.backend?.isReady?.()) {
      this.appendLog('warn', '저장소가 준비되지 않아 색인을 시작할 수 없습니다.');
      this.emit();
      return;
    }
    if (this.building) {
      this.appendLog('warn', '이미 색인이 진행 중입니다.');
      this.emit();
      return;
    }
    this.building = true;
    this.buildProgress = 0;
    this.lastError = null;
    this.lastBuildEmitAt = 0;
    this.clearBuildLogs();
    this.appendLog(
      'info',
      this.includeOtherFiles
        ? '색인 시작 (Markdown + 기타 텍스트)'
        : '색인 시작 (Markdown만)',
    );
    this.emit();

    try {
      this.appendLog('info', '파일 트리 수집 중…');
      this.emit();
      const fromGet = this.getTree?.() || [];
      const tree =
        fromGet.length > 0
          ? fromGet
          : ((await this.backend.listAll?.()) as TreeNode[]) || [];
      const { filePaths, chatDayPaths } = collectIndexablePathsFromTree(
        tree as TreeNode[],
        { includeOtherFiles: this.includeOtherFiles },
      );
      const total = Math.max(filePaths.length + chatDayPaths.length, 1);
      this.appendLog(
        'info',
        `대상: 파일 ${filePaths.length}${this.includeOtherFiles ? ' (md+기타)' : ' (md)'} · 채팅 day ${chatDayPaths.length}`,
      );
      this.emit();

      const worker = await this.ensureWorkerReady();
      if (worker) {
        await this.rebuildWithWorker(worker, filePaths, chatDayPaths, total);
      } else {
        this.appendLog('warn', 'Web Worker 불가 — 메인 스레드에서 색인합니다.');
        this.emit();
        await this.rebuildOnMainThread(filePaths, chatDayPaths, total);
      }
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      this.appendLog('error', `색인 실패: ${this.lastError}`);
    } finally {
      this.building = false;
      this.buildProgress = null;
      if (!this.lastError) {
        this.appendLog('ok', '백그라운드 색인 종료');
      }
      this.emit();
    }
  }

  private async rebuildWithWorker(
    worker: IndexWorkerClient,
    filePaths: string[],
    chatDayPaths: string[],
    total: number,
  ): Promise<void> {
    this.appendLog('info', 'Web Worker에서 색인 중…');
    this.emit();
    await worker.startRebuild();

    let n = 0;
    let fileOk = 0;
    let fileFail = 0;
    for (const path of filePaths) {
      try {
        const { text } = (await this.backend!.readText?.(path)) || { text: '' };
        await worker.processFile(path, text);
        fileOk += 1;
        if (fileOk === 1 || fileOk % LOG_EVERY === 0) {
          this.appendLog('ok', `[파일] ${fileOk}/${filePaths.length} ${path}`);
        }
      } catch (err) {
        fileFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[파일 실패] ${path} — ${msg}`);
      }
      n += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
    }
    this.appendLog(
      'info',
      `파일 색인 완료 (성공 ${fileOk} · 실패 ${fileFail})`,
    );
    this.emitBuildProgress(true);

    let chatOk = 0;
    let chatFail = 0;
    for (const path of chatDayPaths) {
      try {
        const { text } = (await this.backend!.readText?.(path)) || { text: '' };
        const changed = await worker.processChatDay(path, text);
        chatOk += 1;
        if (chatOk === 1 || chatOk % LOG_EVERY === 0) {
          this.appendLog(
            'ok',
            `[채팅] ${chatOk}/${chatDayPaths.length} ${path} (+${changed})`,
          );
        }
      } catch (err) {
        chatFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[채팅 실패] ${path} — ${msg}`);
      }
      n += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
    }
    this.appendLog(
      'info',
      `채팅 색인 완료 (day 성공 ${chatOk} · 실패 ${chatFail})`,
    );

    this.appendLog('info', '압축·저장 중…');
    this.buildProgress = 1;
    this.emit();
    const { manifest, postingsGz, docsGz } = await worker.finalize();
    this.appendLog(
      'info',
      `저장 중… (파일 문서 ${manifest.fileCount} · 채팅 문서 ${manifest.chatCount})`,
    );
    this.emit();
    // Keep copies for hydrate in case a storage backend mutates buffers.
    const postingsCopy = postingsGz.slice();
    const docsCopy = docsGz.slice();
    await saveIndexBlobsToVault(this.backend!, manifest, postingsGz, docsGz);
    this.index = hydrateIndexFromBlobs(manifest, postingsCopy, docsCopy);
    this.loaded = true;
    this.dirty = false;
    this.lastError = null;
    this.appendLog('ok', '색인 저장 완료 (.advanced-search/) [Worker]');
  }

  private async rebuildOnMainThread(
    filePaths: string[],
    chatDayPaths: string[],
    total: number,
  ): Promise<void> {
    this.appendLog('info', '한국어 토크나이저(garu-ko) 로드 중…');
    this.emit();
    await ensureGaru();
    this.appendLog('ok', '토크나이저 준비 완료');
    this.emit();

    const next = emptyIndex();
    const bulk = { skipRecount: true as const };
    let n = 0;
    let fileOk = 0;
    let fileFail = 0;
    for (const path of filePaths) {
      try {
        const { text } = (await this.backend!.readText?.(path)) || { text: '' };
        await upsertFileDocument(next, path, text, bulk);
        fileOk += 1;
        if (fileOk === 1 || fileOk % LOG_EVERY === 0) {
          this.appendLog('ok', `[파일] ${fileOk}/${filePaths.length} ${path}`);
        }
      } catch (err) {
        fileFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[파일 실패] ${path} — ${msg}`);
      }
      n += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
      await yieldToMain();
    }
    this.appendLog(
      'info',
      `파일 색인 완료 (성공 ${fileOk} · 실패 ${fileFail})`,
    );
    this.emitBuildProgress(true);

    let chatOk = 0;
    let chatFail = 0;
    for (const path of chatDayPaths) {
      try {
        const { text } = (await this.backend!.readText?.(path)) || { text: '' };
        const changed = await upsertChatDayDocuments(next, path, text, {
          ...bulk,
          yieldEvery: 8,
          yieldFn: yieldToMain,
        });
        chatOk += 1;
        if (chatOk === 1 || chatOk % LOG_EVERY === 0) {
          this.appendLog(
            'ok',
            `[채팅] ${chatOk}/${chatDayPaths.length} ${path} (+${changed})`,
          );
        }
      } catch (err) {
        chatFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[채팅 실패] ${path} — ${msg}`);
      }
      n += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
      await yieldToMain();
    }
    this.appendLog(
      'info',
      `채팅 색인 완료 (day 성공 ${chatOk} · 실패 ${chatFail})`,
    );

    recountManifest(next);
    next.manifest.initialized = true;
    this.index = next;
    this.loaded = true;
    this.dirty = true;
    this.buildProgress = 1;
    this.appendLog(
      'info',
      `저장 중… (파일 문서 ${next.manifest.fileCount} · 채팅 문서 ${next.manifest.chatCount})`,
    );
    this.emit();
    await this.persistNow();
    this.appendLog('ok', '색인 저장 완료 (.advanced-search/)');
  }

  /**
   * Incremental update for one saved file.
   * Runs whenever indexing is enabled (even if a full vault rebuild has never run).
   */
  async indexFile(path: string, content: string): Promise<void> {
    if (!this.enabled) return;
    if (
      !isIndexableFilePath(path, { includeOtherFiles: this.includeOtherFiles })
    ) {
      return;
    }
    await this.ensureLoaded();

    const worker = await this.ensureWorkerReady();
    if (worker) {
      const docId = fileDocId(path);
      const existingHash = this.index.docs.get(docId)?.contentHash ?? null;
      const patch = await worker.upsertFile(path, content, existingHash);
      if (applyFileUpsertPatch(this.index, patch)) {
        this.index.manifest.initialized = true;
        this.schedulePersist();
      }
      return;
    }

    const changed = await upsertFileDocument(this.index, path, content);
    if (changed) {
      this.index.manifest.initialized = true;
      this.schedulePersist();
    }
  }

  /**
   * Incremental update for one chat day.
   * Runs whenever indexing is enabled (even if a full vault rebuild has never run).
   */
  async indexChatDay(dateStrOrPath: string, content: string): Promise<void> {
    if (!this.enabled) return;
    await this.ensureLoaded();

    const worker = await this.ensureWorkerReady();
    if (worker) {
      const dateStr =
        chatDateFromPath(dateStrOrPath) ||
        (/^\d{4}-\d{2}-\d{2}$/.test(dateStrOrPath) ? dateStrOrPath : null);
      const existingHashes: Record<string, string> = {};
      if (dateStr) {
        for (const [docId, meta] of this.index.docs) {
          if (meta.kind === 'chat' && meta.dateStr === dateStr) {
            existingHashes[docId] = meta.contentHash;
          }
        }
      }
      const patch = await worker.upsertChatDay(
        dateStrOrPath,
        content,
        existingHashes,
      );
      if (applyChatUpsertPatch(this.index, patch) > 0) {
        this.index.manifest.initialized = true;
        this.schedulePersist();
      }
      return;
    }

    const changed = await upsertChatDayDocuments(
      this.index,
      dateStrOrPath,
      content,
    );
    if (changed > 0) {
      this.index.manifest.initialized = true;
      this.schedulePersist();
    }
  }

  private async handleChangeEvent(event: AdvancedSearchChangeEvent): Promise<void> {
    if (event.type === 'rebuild') {
      await this.rebuild();
      return;
    }
    if (event.type === 'clear') {
      await this.clearCache();
      return;
    }
    if (!this.enabled) return;
    if (event.type === 'file') {
      await this.indexFile(event.path, event.content);
      return;
    }
    if (event.type === 'chatDay') {
      await this.indexChatDay(event.dateStr, event.content);
    }
  }

  async search(
    query: string,
    trees: Array<TreeNode[] | null | undefined>,
    limit = 50,
  ): Promise<AdvancedSearchHit[]> {
    if (this.enabled) await this.ensureLoaded();
    const useIndex = this.enabled && this.hasIndex();
    return runAdvancedSearch({
      query,
      trees,
      index: this.index,
      indexEnabled: useIndex,
      limit,
    });
  }

  dispose(): void {
    this.unsub?.();
    this.unsub = null;
    if (this.persistTimer) clearTimeout(this.persistTimer);
    this.workerClient?.dispose();
    this.workerClient = null;
    this.workerReady = false;
  }
}

export const advancedSearchEngine = new AdvancedSearchEngine();

export { notifyAdvancedSearchChange } from './notify';
export { chatDateFromPath } from './collectSources';
export type { AdvancedSearchHit };
