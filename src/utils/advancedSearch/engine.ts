import {
  collectIndexablePathsFromTree,
  isIndexableFilePath,
} from './collectSources';
import { indexableEncMdBody } from '@/utils/encMd';
import {
  pruneIndexToPaths,
  upsertChatDayDocuments,
  upsertFileDocument,
} from './buildIndex';
import {
  clearIndexInVault,
  docsToObject,
  gzipJsonBytes,
  gunzipBytes,
  loadDocsAndManifestFromVault,
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
import {
  subscribeAdvancedSearchChanges,
  type AdvancedSearchChangeEvent,
} from './notify';
import { runAdvancedSearch, type AdvancedSearchHit } from './query';
import {
  deleteRebuildCheckpoint,
  getRebuildCheckpoint,
  isCheckpointCompatible,
  saveRebuildCheckpoint,
  type RebuildCheckpointRecord,
} from './rebuildCheckpointDb';
import {
  emptyDocIdMap,
  hydrateDocIdMapFromDocs,
  type DocIdMapState,
} from './docIdMap';
import { isSearchIsolationReady, searchIsolationBlockedReason } from './isolation';
import { gzip, gunzipSync, strFromU8 } from 'fflate';

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
  /** True when the last finished build was user-cancelled (checkpoint kept). */
  lastBuildCancelled: boolean;
  /** Interrupted rebuild checkpoint available in IndexedDB. */
  hasCheckpoint: boolean;
  /** Processed source count stored in the checkpoint (files + chat days). */
  checkpointProcessedCount: number;
  /** 0–1 while building; null when idle. */
  buildProgress: number | null;
  /** Recent background index log lines (newest last). */
  buildLogs: BuildLogEntry[];
  /** False when SharedArrayBuffer / COOP+COEP isolation is missing. */
  isolationReady: boolean;
};

export type RebuildOptions = {
  /**
   * When a checkpoint exists:
   * - true → resume from checkpoint
   * - false → discard checkpoint and rebuild from scratch
   * When no checkpoint, ignored.
   */
  resume?: boolean;
};

export type RebuildCheckpointInfo = {
  processedFileCount: number;
  processedChatCount: number;
  updatedAt: number;
};

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

const EMIT_MIN_MS = 250;
const MAX_BUILD_LOGS = 2000;
const CHECKPOINT_EVERY = 25;

class RebuildCancelledError extends Error {
  constructor() {
    super('REBUILD_CANCELLED');
    this.name = 'RebuildCancelledError';
  }
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function gzipBytes(input: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gzip(input, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

type LucivyApi = typeof import('./lucivyBackend');

class AdvancedSearchEngine {
  private index: InMemoryIndex = emptyIndex();
  private docIdMap: DocIdMapState = emptyDocIdMap();
  private loaded = false;
  private lucivyReady = false;
  private building = false;
  private cancelRequested = false;
  private lastBuildCancelled = false;
  private hasCheckpoint = false;
  private checkpointProcessedCount = 0;
  private dirty = false;
  private enabled = loadAdvancedSearchIndexEnabled();
  private includeOtherFiles = loadAdvancedSearchIncludeOtherFiles();
  private backend: AdvancedSearchBackend | null = null;
  private getTree: (() => TreeNode[]) | null = null;
  private storageKey = '';
  private persistTimer: ReturnType<typeof setTimeout> | null = null;
  private lastError: string | null = null;
  private buildProgress: number | null = null;
  private buildLogs: BuildLogEntry[] = [];
  private buildLogSeq = 0;
  private lastBuildEmitAt = 0;
  private unsub: (() => void) | null = null;
  private listeners = new Set<() => void>();
  private lucivyApi: LucivyApi | null = null;

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
    return this.loaded && isIndexInitialized(this.index) && this.lucivyReady;
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
      lastBuildCancelled: this.lastBuildCancelled,
      hasCheckpoint: this.hasCheckpoint,
      checkpointProcessedCount: this.checkpointProcessedCount,
      buildProgress: this.buildProgress,
      buildLogs: this.buildLogs,
      isolationReady: isSearchIsolationReady(),
    };
  }

  getIndex(): InMemoryIndex {
    return this.index;
  }

  getDocIdMap(): DocIdMapState {
    return this.docIdMap;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(value: boolean): void {
    this.enabled = Boolean(value);
    saveAdvancedSearchIndexEnabled(this.enabled);
    this.emit();
    if (this.enabled && this.backend?.isReady?.()) {
      void this.ensureLoaded();
    }
  }

  setIncludeOtherFiles(value: boolean): void {
    this.includeOtherFiles = Boolean(value);
    saveAdvancedSearchIncludeOtherFiles(this.includeOtherFiles);
    this.emit();
    void this.refreshCheckpointStatus();
  }

  configure(options: {
    backend: AdvancedSearchBackend | null;
    getTree?: () => TreeNode[];
    storageKey?: string;
  }): void {
    this.backend = options.backend;
    if (options.getTree) this.getTree = options.getTree;
    if (typeof options.storageKey === 'string') {
      this.storageKey = options.storageKey;
      void this.refreshCheckpointStatus();
    }
  }

  private async loadLucivyApi(): Promise<LucivyApi> {
    if (this.lucivyApi) return this.lucivyApi;
    this.lucivyApi = await import('./lucivyBackend');
    return this.lucivyApi;
  }

  private assertIsolation(): void {
    if (!isSearchIsolationReady()) {
      throw new Error(
        searchIsolationBlockedReason() ||
          'Cross-origin isolation required for Lucivy search index',
      );
    }
  }

  async ensureLoaded(): Promise<void> {
    if (this.loaded && this.lucivyReady) return;
    if (!this.backend?.isReady?.()) return;
    try {
      if (!isSearchIsolationReady()) {
        const { index } = await loadDocsAndManifestFromVault(this.backend);
        this.index = index;
        this.docIdMap = hydrateDocIdMapFromDocs(
          index.docs,
          index.manifest.nextNumericId,
        );
        this.loaded = true;
        this.lucivyReady = false;
        this.lastError = searchIsolationBlockedReason();
        this.emit();
        return;
      }

      const { index, luceGz } = await loadDocsAndManifestFromVault(this.backend);
      this.index = index;
      this.docIdMap = hydrateDocIdMapFromDocs(
        index.docs,
        index.manifest.nextNumericId,
      );

      const api = await this.loadLucivyApi();
      let snapshot: Uint8Array | null = null;
      if (luceGz?.byteLength) {
        try {
          snapshot = gunzipBytes(luceGz);
        } catch {
          snapshot = null;
        }
      }
      await api.openOrCreateLucivyIndex(snapshot);
      this.lucivyReady = true;
      this.loaded = true;
      this.lastError = null;
      this.emit();
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      this.index = emptyIndex();
      this.docIdMap = emptyDocIdMap();
      this.loaded = true;
      this.lucivyReady = false;
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
    if (!this.enabled || !this.backend?.isReady?.() || !this.lucivyReady) return;
    try {
      this.assertIsolation();
      const api = await this.loadLucivyApi();
      await api.lucivyCommit();
      const snapshot = await api.lucivyExportSnapshot();
      recountManifest(this.index);
      this.index.manifest.nextNumericId = this.docIdMap.nextNumericId;
      await saveIndexToVault(this.backend, this.index, snapshot);
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
    this.cancelRequested = true;
    this.index = emptyIndex();
    this.docIdMap = emptyDocIdMap();
    this.loaded = true;
    this.lucivyReady = false;
    this.dirty = false;
    this.buildProgress = null;
    this.lastBuildCancelled = false;
    this.hasCheckpoint = false;
    this.checkpointProcessedCount = 0;
    if (this.storageKey) {
      try {
        await deleteRebuildCheckpoint(this.storageKey);
      } catch {
        // ignore
      }
    }
    try {
      if (this.lucivyApi) {
        await this.lucivyApi.destroyLucivyIndex();
        this.lucivyApi.terminateLucivyRuntime();
        this.lucivyApi = null;
      }
    } catch {
      // ignore
    }
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

  async refreshCheckpointStatus(): Promise<void> {
    if (!this.storageKey) {
      this.hasCheckpoint = false;
      this.checkpointProcessedCount = 0;
      this.emit();
      return;
    }
    try {
      const cp = await getRebuildCheckpoint(this.storageKey);
      if (!isCheckpointCompatible(cp, this.includeOtherFiles)) {
        if (cp) await deleteRebuildCheckpoint(this.storageKey);
        this.hasCheckpoint = false;
        this.checkpointProcessedCount = 0;
      } else {
        const done =
          (cp.processedFilePaths?.length || 0) +
          (cp.processedChatPaths?.length || 0);
        this.hasCheckpoint = done > 0;
        this.checkpointProcessedCount = done;
      }
    } catch (err) {
      console.warn('[advancedSearch] refreshCheckpointStatus failed', err);
      this.hasCheckpoint = false;
      this.checkpointProcessedCount = 0;
    }
    this.emit();
  }

  async getRebuildCheckpointInfo(): Promise<RebuildCheckpointInfo | null> {
    if (!this.storageKey) return null;
    try {
      const cp = await getRebuildCheckpoint(this.storageKey);
      if (!isCheckpointCompatible(cp, this.includeOtherFiles)) return null;
      const processedFileCount = cp.processedFilePaths?.length || 0;
      const processedChatCount = cp.processedChatPaths?.length || 0;
      if (processedFileCount + processedChatCount <= 0) return null;
      return {
        processedFileCount,
        processedChatCount,
        updatedAt: cp.updatedAt || 0,
      };
    } catch {
      return null;
    }
  }

  /** @deprecated Use refreshCheckpointStatus */
  async maybeResumeRebuild(): Promise<void> {
    await this.refreshCheckpointStatus();
  }

  cancelRebuild(): void {
    if (!this.building) return;
    this.cancelRequested = true;
    this.appendLog('warn', '색인 중지 요청…');
    this.emitBuildProgress(true);
  }

  private assertNotCancelled(): void {
    if (this.cancelRequested) {
      throw new RebuildCancelledError();
    }
  }

  private async loadCompatibleCheckpoint(): Promise<RebuildCheckpointRecord | null> {
    if (!this.storageKey) return null;
    try {
      const cp = await getRebuildCheckpoint(this.storageKey);
      if (!isCheckpointCompatible(cp, this.includeOtherFiles)) {
        if (cp) await deleteRebuildCheckpoint(this.storageKey);
        return null;
      }
      return cp;
    } catch (err) {
      console.warn('[advancedSearch] load checkpoint failed', err);
      return null;
    }
  }

  private async clearCheckpoint(): Promise<void> {
    if (!this.storageKey) return;
    try {
      await deleteRebuildCheckpoint(this.storageKey);
    } catch {
      // ignore
    }
  }

  private async writeCheckpoint(
    processedFilePaths: string[],
    processedChatPaths: string[],
  ): Promise<void> {
    if (!this.storageKey || !this.lucivyApi) return;
    try {
      await this.lucivyApi.lucivyCommit();
      const snapshot = await this.lucivyApi.lucivyExportSnapshot();
      const luceGz = await gzipBytes(snapshot);
      const docsGz = await gzipJsonBytes(docsToObject(this.index.docs));
      await saveRebuildCheckpoint({
        key: this.storageKey,
        includeOtherFiles: this.includeOtherFiles,
        processedFilePaths: [...processedFilePaths],
        processedChatPaths: [...processedChatPaths],
        luceGz,
        docsGz,
      });
      this.appendLog(
        'info',
        `체크포인트 저장 (파일 ${processedFilePaths.length} · 채팅 ${processedChatPaths.length})`,
      );
      this.emitBuildProgress();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.appendLog('warn', `체크포인트 저장 실패 — ${msg}`);
      this.emitBuildProgress();
    }
  }

  private async flushCheckpointBeforeCancel(
    processedFilePaths: string[],
    processedChatPaths: string[],
  ): Promise<void> {
    if (!this.cancelRequested) return;
    try {
      if (processedFilePaths.length + processedChatPaths.length > 0) {
        await this.writeCheckpoint(processedFilePaths, processedChatPaths);
      }
    } catch (err) {
      console.warn('[advancedSearch] checkpoint flush on cancel failed', err);
    }
    throw new RebuildCancelledError();
  }

  async rebuild(options: RebuildOptions = {}): Promise<void> {
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
    if (!isSearchIsolationReady()) {
      this.appendLog(
        'error',
        searchIsolationBlockedReason() ||
          'Cross-origin isolation required (COOP/COEP).',
      );
      this.lastError = searchIsolationBlockedReason();
      this.emit();
      return;
    }
    if (this.building) {
      this.appendLog('warn', '이미 색인이 진행 중입니다.');
      this.emit();
      return;
    }
    this.building = true;
    this.cancelRequested = false;
    this.lastBuildCancelled = false;
    this.buildProgress = 0;
    this.lastError = null;
    this.lastBuildEmitAt = 0;
    this.clearBuildLogs();
    this.appendLog(
      'info',
      this.includeOtherFiles
        ? '색인 시작 (Markdown + 기타 텍스트, Lucivy)'
        : '색인 시작 (Markdown만, Lucivy)',
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

      let checkpoint = await this.loadCompatibleCheckpoint();
      if (checkpoint && options.resume === false) {
        this.appendLog('info', '체크포인트를 버리고 처음부터 색인합니다.');
        await this.clearCheckpoint();
        checkpoint = null;
        this.hasCheckpoint = false;
        this.checkpointProcessedCount = 0;
      } else if (checkpoint && options.resume !== false) {
        this.appendLog('info', '저장된 체크포인트에서 이어서 색인합니다.');
      }

      await this.rebuildWithLucivy(filePaths, chatDayPaths, total, checkpoint);
      await this.clearCheckpoint();
      this.hasCheckpoint = false;
      this.checkpointProcessedCount = 0;
    } catch (err) {
      if (err instanceof RebuildCancelledError || this.cancelRequested) {
        this.lastBuildCancelled = true;
        this.lastError = null;
        this.appendLog(
          'warn',
          '색인 중지됨 — 체크포인트 유지 (다시 색인 시 이어서/처음부터 선택)',
        );
      } else {
        this.lastError = err instanceof Error ? err.message : String(err);
        this.appendLog('error', `색인 실패: ${this.lastError}`);
      }
    } finally {
      this.cancelRequested = false;
      this.building = false;
      this.buildProgress = null;
      if (!this.lastError && !this.lastBuildCancelled) {
        this.appendLog('ok', '백그라운드 색인 종료');
      }
      void this.refreshCheckpointStatus();
      this.emit();
    }
  }

  private async rebuildWithLucivy(
    filePaths: string[],
    chatDayPaths: string[],
    total: number,
    checkpoint: RebuildCheckpointRecord | null,
  ): Promise<void> {
    const api = await this.loadLucivyApi();
    const processedFiles = new Set(
      checkpoint?.processedFilePaths?.filter((p) => filePaths.includes(p)) || [],
    );
    const processedChats = new Set(
      checkpoint?.processedChatPaths?.filter((p) => chatDayPaths.includes(p)) ||
        [],
    );
    const remainingFiles = filePaths.filter((p) => !processedFiles.has(p));
    const remainingChats = chatDayPaths.filter((p) => !processedChats.has(p));

    if (checkpoint) {
      this.appendLog(
        'info',
        `체크포인트에서 재개 (파일 ${processedFiles.size}/${filePaths.length} · 채팅 ${processedChats.size}/${chatDayPaths.length})`,
      );
      this.emit();
      const snapshot = gunzipBytes(checkpoint.luceGz);
      let docsMap = new Map<string, import('./types').DocMeta>();
      try {
        const raw = gunzipSync(checkpoint.docsGz);
        docsMap = new Map(
          Object.entries(
            JSON.parse(strFromU8(raw)) as Record<
              string,
              import('./types').DocMeta
            >,
          ),
        );
      } catch {
        docsMap = new Map();
      }
      this.index = {
        docs: docsMap,
        manifest: {
          ...emptyIndex().manifest,
          initialized: false,
        },
      };
      this.docIdMap = hydrateDocIdMapFromDocs(
        this.index.docs,
        this.index.manifest.nextNumericId,
      );
      await api.openOrCreateLucivyIndex(snapshot);
      await pruneIndexToPaths(this.index, this.docIdMap, filePaths, chatDayPaths, {
        skipRecount: true,
      });
    } else {
      this.appendLog('info', 'Lucivy OPFS 인덱스 생성 중…');
      this.emit();
      this.index = emptyIndex();
      this.docIdMap = emptyDocIdMap();
      await api.destroyLucivyIndex();
      await api.openOrCreateLucivyIndex(null);
    }

    this.lucivyReady = true;
    this.loaded = true;

    const bulk = { skipRecount: true as const };
    let n = processedFiles.size + processedChats.size;
    this.buildProgress = n / total;
    this.emitBuildProgress(true);

    let fileOk = processedFiles.size;
    let fileFail = 0;
    let sinceCheckpoint = 0;
    for (const path of remainingFiles) {
      this.assertNotCancelled();
      try {
        const { text: raw } = (await this.backend!.readText?.(path)) || {
          text: '',
        };
        const text = indexableEncMdBody(path, raw);
        await upsertFileDocument(this.index, this.docIdMap, path, text, bulk);
        fileOk += 1;
        this.appendLog('ok', `[파일] ${fileOk}/${filePaths.length} ${path}`);
      } catch (err) {
        if (err instanceof RebuildCancelledError) throw err;
        fileFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[파일 실패] ${path} — ${msg}`);
      }
      processedFiles.add(path);
      n += 1;
      sinceCheckpoint += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
      if (sinceCheckpoint >= CHECKPOINT_EVERY) {
        await this.writeCheckpoint([...processedFiles], [...processedChats]);
        sinceCheckpoint = 0;
      }
      if (this.cancelRequested) {
        await this.flushCheckpointBeforeCancel(
          [...processedFiles],
          [...processedChats],
        );
      }
      await yieldToMain();
    }
    this.appendLog(
      'info',
      `파일 색인 완료 (성공 ${fileOk} · 실패 ${fileFail})`,
    );
    this.emitBuildProgress(true);

    let chatOk = processedChats.size;
    let chatFail = 0;
    for (const path of remainingChats) {
      this.assertNotCancelled();
      try {
        const { text } = (await this.backend!.readText?.(path)) || { text: '' };
        const changed = await upsertChatDayDocuments(
          this.index,
          this.docIdMap,
          path,
          text,
          {
            ...bulk,
            yieldEvery: 8,
            yieldFn: yieldToMain,
          },
        );
        chatOk += 1;
        this.appendLog(
          'ok',
          `[채팅] ${chatOk}/${chatDayPaths.length} ${path} (+${changed})`,
        );
      } catch (err) {
        if (err instanceof RebuildCancelledError) throw err;
        chatFail += 1;
        const msg = err instanceof Error ? err.message : String(err);
        this.appendLog('warn', `[채팅 실패] ${path} — ${msg}`);
      }
      processedChats.add(path);
      n += 1;
      sinceCheckpoint += 1;
      this.buildProgress = n / total;
      this.emitBuildProgress();
      if (sinceCheckpoint >= CHECKPOINT_EVERY) {
        await this.writeCheckpoint([...processedFiles], [...processedChats]);
        sinceCheckpoint = 0;
      }
      if (this.cancelRequested) {
        await this.flushCheckpointBeforeCancel(
          [...processedFiles],
          [...processedChats],
        );
      }
      await yieldToMain();
    }
    this.assertNotCancelled();
    this.appendLog(
      'info',
      `채팅 색인 완료 (day 성공 ${chatOk} · 실패 ${chatFail})`,
    );

    recountManifest(this.index);
    this.index.manifest.initialized = true;
    this.index.manifest.nextNumericId = this.docIdMap.nextNumericId;
    this.dirty = true;
    this.buildProgress = 1;
    this.appendLog(
      'info',
      `저장 중… (파일 문서 ${this.index.manifest.fileCount} · 채팅 문서 ${this.index.manifest.chatCount})`,
    );
    this.emit();
    await this.persistNow();
    this.appendLog('ok', '색인 저장 완료 (.advanced-search/index.luce.gz)');
  }

  async indexFile(path: string, content: string): Promise<void> {
    if (!this.enabled) return;
    if (
      !isIndexableFilePath(path, { includeOtherFiles: this.includeOtherFiles })
    ) {
      return;
    }
    if (!isSearchIsolationReady()) return;
    await this.ensureLoaded();
    if (!this.lucivyReady) return;

    const changed = await upsertFileDocument(
      this.index,
      this.docIdMap,
      path,
      content,
    );
    if (changed) {
      this.index.manifest.initialized = true;
      this.schedulePersist();
    }
  }

  async indexChatDay(dateStrOrPath: string, content: string): Promise<void> {
    if (!this.enabled) return;
    if (!isSearchIsolationReady()) return;
    await this.ensureLoaded();
    if (!this.lucivyReady) return;

    const changed = await upsertChatDayDocuments(
      this.index,
      this.docIdMap,
      dateStrOrPath,
      content,
    );
    if (changed > 0) {
      this.index.manifest.initialized = true;
      this.schedulePersist();
    }
  }

  private async handleChangeEvent(
    event: AdvancedSearchChangeEvent,
  ): Promise<void> {
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
    commandContext?: import('./commands').AppCommandContext,
  ): Promise<AdvancedSearchHit[]> {
    if (this.enabled) await this.ensureLoaded();
    const useIndex = this.enabled && this.hasIndex();
    return runAdvancedSearch({
      query,
      trees,
      index: this.index,
      indexEnabled: useIndex,
      lucivySearch: useIndex
        ? async (terms, lim) => {
            const api = await this.loadLucivyApi();
            const q = api.buildContainsAndQuery('body', terms);
            if (!q) return [];
            const hits = await api.lucivySearch(q, { limit: lim });
            return hits
              .map((h) => {
                const docId = this.docIdMap.numericToString.get(h.docId);
                if (!docId) return null;
                return { docId, score: h.score };
              })
              .filter((x): x is { docId: string; score: number } => x != null);
          }
        : null,
      limit,
      ...(commandContext ? { commandContext } : {}),
    });
  }

  dispose(): void {
    this.unsub?.();
    this.unsub = null;
    if (this.persistTimer) clearTimeout(this.persistTimer);
    try {
      this.lucivyApi?.terminateLucivyRuntime();
    } catch {
      // ignore
    }
    this.lucivyApi = null;
  }
}

export const advancedSearchEngine = new AdvancedSearchEngine();

export { notifyAdvancedSearchChange } from './notify';
export { chatDateFromPath } from './collectSources';
export type { AdvancedSearchHit };
