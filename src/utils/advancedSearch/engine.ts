import {
  collectIndexablePathsFromTree,
  isIndexableFilePath,
  isPathUnderFolder,
} from '@/utils/advancedSearch/collectSources';
import {
  buildFileSizeMapFromTree,
  countIndexChunksForLength,
  FILE_INDEX_LARGE_BYTES,
  isKnownLargeIndexFile,
  orderFilePathsForIndexing,
} from '@/utils/advancedSearch/fileIndexChunking';
import { indexableEncMdBody } from '@/utils/encMd';
import {
  pruneIndexToPaths,
  removeFileDocumentsByPrefix,
  retargetFileDocumentsByPrefix,
  upsertChatDayDocuments,
  upsertFileDocument,
} from '@/utils/advancedSearch/buildIndex';
import {
  clearIndexInVault,
  docsToObjectAsync,
  gzipJsonBytes,
  gunzipBytes,
  loadDocsAndManifestFromVault,
  saveIndexToVault,
  type AdvancedSearchBackend,
} from '@/utils/advancedSearch/store';
import {
  loadAdvancedSearchIndexEnabled,
  loadAdvancedSearchIncludeOtherFiles,
  loadAdvancedSearchLiveScanLimits,
  loadAdvancedSearchExcludeFolders,
  loadAdvancedSearchCheckpointEvery,
  saveAdvancedSearchIndexEnabled,
  saveAdvancedSearchIncludeOtherFiles,
  saveAdvancedSearchLiveScanLimits,
  saveAdvancedSearchExcludeFolders,
  saveAdvancedSearchCheckpointEvery,
  isLiveScanUnlimited,
  type AdvancedSearchLiveScanLimits,
} from '@/utils/advancedSearch/settings';
import {
  emptyIndex,
  isIndexInitialized,
  recountManifest,
  type InMemoryIndex,
} from '@/utils/advancedSearch/types';
import {
  subscribeAdvancedSearchChanges,
  type AdvancedSearchChangeEvent,
} from '@/utils/advancedSearch/notify';
import { runAdvancedSearch, type AdvancedSearchHit } from '@/utils/advancedSearch/query';
import {
  deleteRebuildCheckpoint,
  getRebuildCheckpoint,
  isCheckpointCompatible,
  saveRebuildCheckpoint,
  type RebuildCheckpointRecord,
} from '@/utils/advancedSearch/rebuildCheckpointDb';
import {
  chatIndexClaimKey,
  fileIndexClaimKey,
  runClaimedWorkQueue,
  withIndexPathLock,
  withIndexWriteLock,
} from '@/utils/advancedSearch/indexPathLock';
import { indexRebuildConcurrency } from '@/utils/advancedSearch/mapPool';
import {
  emptyDocIdMap,
  hydrateDocIdMapFromDocs,
  type DocIdMapState,
} from '@/utils/advancedSearch/docIdMap';
import { isSearchIsolationReady, searchIsolationBlockedReason } from '@/utils/advancedSearch/isolation';
import { isTauriApp } from '@/utils/tauriPlatform';
import {
  searchContentPageFromIndex,
  searchContentPageLive,
} from '@/utils/advancedSearch/contentSearchPage';
import type { ContentSearchFileHit } from '@/utils/advancedSearch/contentSearchSnippets';
import { buildIndexedCoverage } from '@/utils/advancedSearch/indexedCoverage';
import { liveScanContentHits } from '@/utils/advancedSearch/liveContentSearch';
import { RebuildCancelledError } from '@/utils/advancedSearch/rebuildCancel';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
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
  /** Vault folders (and descendants) skipped by the inverted index. */
  excludedFolders: string[];
  /** Write a rebuild checkpoint every N completed sources. */
  checkpointEvery: number;
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
  /**
   * Deprecated for UI: always empty. Use `getBuildLogsAsync` / `subscribeBuildLogs`
   * so log polling does not re-render the whole Settings tree.
   */
  buildLogs: BuildLogEntry[];
  /** False when SharedArrayBuffer / COOP+COEP isolation is missing (web). Tauri always true. */
  isolationReady: boolean;
  /**
   * How body content is searched:
   * - index: Lucivy inverted index
   * - live: vault file/chat scan fallback (web when Lucivy unavailable)
   * - off: filename/path/commands only
   */
  contentSearchMode: 'index' | 'live' | 'off';
  /** Caps for web live vault body scan when Lucivy is unavailable. */
  liveScanLimits: AdvancedSearchLiveScanLimits;
};

export type RebuildOptions = {
  /**
   * When a checkpoint exists:
   * - true → resume from checkpoint
   * - false → discard checkpoint and rebuild from scratch
   * When no checkpoint, ignored.
   * Ignored for folder-scoped incremental index.
   */
  resume?: boolean;
  /**
   * Index only this vault folder (and descendants). Merges into the existing
   * Lucivy index (does not wipe / prune the rest of the vault).
   */
  folderPath?: string;
  /**
   * When true with `folderPath`, ignore user excludedFolders for this run.
   * System excludes (`.trash`, `.advanced-search`, …) still apply.
   */
  ignoreExcludedFolders?: boolean;
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

const EMIT_MIN_MS = 400;
const LOG_EMIT_MS = 500;
/** Soft default; rebuild raises this so every file start/end can be kept. */
const DEFAULT_MAX_BUILD_LOGS = 2000;
const ABSOLUTE_MAX_BUILD_LOGS = 100_000;

function gzipBytes(input: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gzip(input, { level: 6 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

type LucivyApi = typeof import('@/utils/advancedSearch/lucivyBackend');

class AdvancedSearchEngine {
  private index: InMemoryIndex = emptyIndex();
  private docIdMap: DocIdMapState = emptyDocIdMap();
  private loaded = false;
  private lucivyReady = false;
  private building = false;
  private cancelRequested = false;
  private lastBuildCancelled = false;
  /** Dedupe keys for stepwise cancel logs (cleared on rebuild / cancel). */
  private cancelLogKeys = new Set<string>();
  private hasCheckpoint = false;
  private checkpointProcessedCount = 0;
  private dirty = false;
  private enabled = loadAdvancedSearchIndexEnabled();
  private includeOtherFiles = loadAdvancedSearchIncludeOtherFiles();
  private excludedFolders: string[] = loadAdvancedSearchExcludeFolders();
  private checkpointEvery = loadAdvancedSearchCheckpointEvery();
  private liveScanLimits: AdvancedSearchLiveScanLimits =
    loadAdvancedSearchLiveScanLimits();
  private backend: AdvancedSearchBackend | null = null;
  private getTree: (() => TreeNode[]) | null = null;
  private storageKey = '';
  private persistTimer: ReturnType<typeof setTimeout> | null = null;
  private lastError: string | null = null;
  private buildProgress: number | null = null;
  private buildLogs: BuildLogEntry[] = [];
  private buildLogSeq = 0;
  private maxBuildLogs = DEFAULT_MAX_BUILD_LOGS;
  private lastBuildEmitAt = 0;
  private logEmitTimer: ReturnType<typeof setTimeout> | null = null;
  private logDirty = false;
  private unsub: (() => void) | null = null;
  private listeners = new Set<() => void>();
  private logListeners = new Set<() => void>();
  private lucivyApi: LucivyApi | null = null;
  private searchGeneration = 0;

  constructor() {
    this.unsub = subscribeAdvancedSearchChanges((event) => {
      void this.handleChangeEvent(event);
    });
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Log-only subscription — does not fire on progress-only status emits. */
  subscribeBuildLogs(listener: () => void): () => void {
    this.logListeners.add(listener);
    return () => this.logListeners.delete(listener);
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

  private emitLogListeners(): void {
    for (const l of this.logListeners) {
      try {
        l();
      } catch {
        // ignore
      }
    }
  }

  private scheduleLogEmit(force = false): void {
    this.logDirty = true;
    if (force) {
      if (this.logEmitTimer) {
        clearTimeout(this.logEmitTimer);
        this.logEmitTimer = null;
      }
      this.logDirty = false;
      this.emitLogListeners();
      return;
    }
    if (this.logEmitTimer) return;
    this.logEmitTimer = setTimeout(() => {
      this.logEmitTimer = null;
      if (!this.logDirty) return;
      this.logDirty = false;
      this.emitLogListeners();
    }, LOG_EMIT_MS);
  }

  private appendLog(level: BuildLogLevel, message: string): void {
    this.buildLogSeq += 1;
    this.buildLogs.push({
      id: this.buildLogSeq,
      at: new Date().toISOString(),
      level,
      message,
    });
    if (this.buildLogs.length > this.maxBuildLogs) {
      this.buildLogs = this.buildLogs.slice(-this.maxBuildLogs);
    }
    this.scheduleLogEmit(level === 'error' || level === 'warn');
  }

  /** Ensure the ring buffer can hold start+end for every rebuild source. */
  private ensureBuildLogCapacity(fileCount: number, chatDayCount: number): void {
    const needed = Math.max(
      DEFAULT_MAX_BUILD_LOGS,
      fileCount * 2 + chatDayCount * 2 + 64,
    );
    this.maxBuildLogs = Math.min(ABSOLUTE_MAX_BUILD_LOGS, needed);
  }

  private clearBuildLogs(): void {
    this.buildLogs = [];
    this.maxBuildLogs = DEFAULT_MAX_BUILD_LOGS;
    this.scheduleLogEmit(true);
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

  /** Async copy of logs so callers do not block the UI thread on large arrays. */
  async getBuildLogsAsync(): Promise<BuildLogEntry[]> {
    await yieldToMain();
    return this.buildLogs.slice();
  }

  hasIndex(): boolean {
    return this.loaded && isIndexInitialized(this.index) && this.lucivyReady;
  }

  /** Live vault scan allowed (web when backend ready; not used for full vault on Tauri). */
  private canLiveContentSearch(): boolean {
    if (!this.enabled) return false;
    return Boolean(this.backend?.isReady?.());
  }

  /** Full vault body scan when Lucivy index is unavailable (web only). */
  private shouldFullLiveContentSearch(): boolean {
    if (!this.canLiveContentSearch()) return false;
    if (this.hasIndex()) return false;
    if (isTauriApp()) return false;
    return true;
  }

  /** Scan only paths/messages missing from the inverted index. */
  private shouldSupplementUnindexedLive(): boolean {
    if (!this.canLiveContentSearch()) return false;
    return this.hasIndex();
  }

  /** @deprecated use shouldFullLiveContentSearch */
  private shouldLiveContentSearch(): boolean {
    return this.shouldFullLiveContentSearch();
  }

  getContentSearchMode(): 'index' | 'live' | 'off' {
    if (!this.enabled) return 'off';
    if (this.hasIndex()) return 'index';
    if (this.shouldLiveContentSearch()) return 'live';
    return 'off';
  }

  getStatus(): EngineStatus {
    return {
      enabled: this.enabled,
      loaded: this.loaded,
      building: this.building,
      dirty: this.dirty,
      hasIndex: this.hasIndex(),
      includeOtherFiles: this.includeOtherFiles,
      excludedFolders: [...this.excludedFolders],
      checkpointEvery: this.checkpointEvery,
      fileCount: this.index.manifest.fileCount,
      chatCount: this.index.manifest.chatCount,
      builtAt: this.index.manifest.builtAt || null,
      lastError: this.lastError,
      lastBuildCancelled: this.lastBuildCancelled,
      hasCheckpoint: this.hasCheckpoint,
      checkpointProcessedCount: this.checkpointProcessedCount,
      buildProgress: this.buildProgress,
      buildLogs: [],
      isolationReady: isSearchIsolationReady(),
      contentSearchMode: this.getContentSearchMode(),
      liveScanLimits: { ...this.liveScanLimits },
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

  setExcludedFolders(paths: readonly string[]): void {
    this.excludedFolders = saveAdvancedSearchExcludeFolders(paths);
    this.emit();
    void this.refreshCheckpointStatus();
  }

  setCheckpointEvery(value: unknown): void {
    this.checkpointEvery = saveAdvancedSearchCheckpointEvery(value);
    this.emit();
  }

  private indexPathOptions(): {
    includeOtherFiles: boolean;
    excludedFolders: string[];
  } {
    return {
      includeOtherFiles: this.includeOtherFiles,
      excludedFolders: this.excludedFolders,
    };
  }

  setLiveScanLimits(value: Partial<AdvancedSearchLiveScanLimits>): void {
    this.liveScanLimits = saveAdvancedSearchLiveScanLimits(value);
    this.emit();
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
    this.lucivyApi = await import('@/utils/advancedSearch/lucivyBackend');
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
      if (!isCheckpointCompatible(cp, this.includeOtherFiles, this.excludedFolders)) {
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
      if (!isCheckpointCompatible(cp, this.includeOtherFiles, this.excludedFolders)) return null;
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
    this.cancelLogKeys.clear();
    this.logCancelStep(
      'request',
      '요청 접수 — 신규 claim 중단 · 진행 중 파일은 즉시 포기 · 완료분만 체크포인트',
    );
    this.emitBuildProgress(true);
    void this.loadLucivyApi()
      .then(async (api) => {
        if (!this.cancelRequested || !this.building) return;
        if (typeof api.lucivyCancelNative !== 'function') {
          this.logCancelStep(
            'native-skip',
            '네이티브 Lucivy 취소 신호 없음 (웹/미지원) — 워커 협력 취소만 진행',
          );
          return;
        }
        this.logCancelStep('native-send', '네이티브 Lucivy 취소 신호 전송');
        await api.lucivyCancelNative();
        if (this.cancelRequested && this.building) {
          this.logCancelStep(
            'native-done',
            '네이티브 취소 신호 완료 — 진행 중 워커·체크포인트 정리 대기',
          );
        }
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : String(err);
        this.logCancelStep(
          'native-fail',
          `네이티브 취소 신호 실패 — ${msg} (워커 협력 취소 계속)`,
        );
      });
  }

  /** Stepwise cancel log (deduped by key). */
  private logCancelStep(key: string, message: string): void {
    if (this.cancelLogKeys.has(key)) return;
    this.cancelLogKeys.add(key);
    this.appendLog('warn', `중지 · ${message}`);
  }

  private assertNotCancelled(phase?: string, detail?: string): void {
    if (!this.cancelRequested) return;
    if (phase) {
      const key = detail ? `abort:${phase}:${detail}` : `abort:${phase}`;
      this.logCancelStep(
        key,
        detail ? `${phase} 중단 · ${detail}` : `${phase} 중단`,
      );
    }
    throw new RebuildCancelledError();
  }

  private async loadCompatibleCheckpoint(): Promise<RebuildCheckpointRecord | null> {
    if (!this.storageKey) return null;
    try {
      const cp = await getRebuildCheckpoint(this.storageKey);
      if (!isCheckpointCompatible(cp, this.includeOtherFiles, this.excludedFolders)) {
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
      await yieldToMain();
      const snapshot = await this.lucivyApi.lucivyExportSnapshot();
      const luceGz = await gzipBytes(snapshot);
      await yieldToMain();
      const docsObj = await docsToObjectAsync(this.index.docs, 150);
      await yieldToMain();
      const docsGz = await gzipJsonBytes(docsObj);
      await saveRebuildCheckpoint({
        key: this.storageKey,
        includeOtherFiles: this.includeOtherFiles,
        excludedFolders: this.excludedFolders,
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
      await yieldToMain();
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
    const fileN = processedFilePaths.length;
    const chatN = processedChatPaths.length;
    this.logCancelStep(
      'checkpoint-begin',
      '최종 체크포인트 단계 시작',
    );
    try {
      if (fileN + chatN > 0) {
        this.logCancelStep(
          'checkpoint-write',
          `완료분만 체크포인트 저장 중 (파일 ${fileN} · 채팅 ${chatN})`,
        );
        await this.writeCheckpoint(processedFilePaths, processedChatPaths);
        this.logCancelStep('checkpoint-done', '체크포인트 저장 완료');
      } else {
        this.logCancelStep(
          'checkpoint-skip',
          '처리할 항목이 없어 체크포인트 생략',
        );
      }
    } catch (err) {
      console.warn('[advancedSearch] checkpoint flush on cancel failed', err);
      const msg = err instanceof Error ? err.message : String(err);
      this.logCancelStep('checkpoint-fail', `체크포인트 저장 실패 — ${msg}`);
    }
    this.logCancelStep('loop-exit', '색인 루프 종료');
    throw new RebuildCancelledError();
  }

  /** Cooperative cancel check used as chat yieldFn during rebuild. */
  private async yieldOrCancel(phase?: string, detail?: string): Promise<void> {
    this.assertNotCancelled(phase, detail);
    await yieldToMain();
    this.assertNotCancelled(phase, detail);
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

    const folderPath = String(options.folderPath || '').replace(/^\/+/, '');
    const folderScoped = Boolean(folderPath);
    const ignoreExcluded = Boolean(
      folderScoped && options.ignoreExcludedFolders,
    );

    this.building = true;
    this.cancelRequested = false;
    this.cancelLogKeys.clear();
    this.lastBuildCancelled = false;
    this.buildProgress = 0;
    this.lastError = null;
    this.lastBuildEmitAt = 0;
    this.clearBuildLogs();
    const engineLabel = isTauriApp() ? 'native Lucivy' : 'Lucivy';
    if (folderScoped) {
      this.appendLog(
        'info',
        `폴더 색인 시작 · ${folderPath}${
          ignoreExcluded ? ' (제외 폴더 무시)' : ''
        } · ${engineLabel}`,
      );
    } else {
      this.appendLog(
        'info',
        this.includeOtherFiles
          ? `색인 시작 (Markdown + 기타 텍스트, ${engineLabel})`
          : `색인 시작 (Markdown만, ${engineLabel})`,
      );
    }
    this.emit();

    try {
      this.appendLog('info', '파일 트리 수집 중…');
      this.emit();
      const fromGet = this.getTree?.() || [];
      const tree =
        fromGet.length > 0
          ? fromGet
          : ((await this.backend.listAll?.()) as TreeNode[]) || [];
      const pathOpts = ignoreExcluded
        ? {
            includeOtherFiles: this.includeOtherFiles,
            excludedFolders: [] as string[],
            ignoreExcludedFolders: true,
          }
        : this.indexPathOptions();
      let { filePaths, chatDayPaths } = collectIndexablePathsFromTree(
        tree as TreeNode[],
        pathOpts,
      );
      if (folderScoped) {
        filePaths = filePaths.filter((p) => isPathUnderFolder(p, folderPath));
        chatDayPaths = chatDayPaths.filter((p) =>
          isPathUnderFolder(p, folderPath),
        );
      }
      const fileSizeByPath = buildFileSizeMapFromTree(tree as TreeNode[]);
      const largeFileCount = filePaths.filter((p) =>
        isKnownLargeIndexFile(p, fileSizeByPath),
      ).length;
      filePaths = orderFilePathsForIndexing(filePaths, fileSizeByPath);
      const total = Math.max(filePaths.length + chatDayPaths.length, 1);
      this.ensureBuildLogCapacity(filePaths.length, chatDayPaths.length);
      this.appendLog(
        'info',
        `대상: 파일 ${filePaths.length}${this.includeOtherFiles ? ' (md+기타)' : ' (md)'} · 채팅 day ${chatDayPaths.length}${
          folderScoped
            ? ` · 폴더 ${folderPath}`
            : this.excludedFolders.length
              ? ` · 제외 폴더 ${this.excludedFolders.length}`
              : ''
        }${ignoreExcluded ? ' · 제외 폴더 무시' : ''}${
          largeFileCount > 0
            ? ` · 대용량(≥${Math.round(FILE_INDEX_LARGE_BYTES / 1024)}KB) ${largeFileCount}개 후순위·청크`
            : ''
        }`,
      );
      this.emit();

      if (folderScoped) {
        // Merge into existing index — do not wipe or use full-rebuild checkpoints.
        await this.ensureLoaded();
        if (!this.lucivyReady) {
          throw new Error(
            searchIsolationBlockedReason() ||
              'Lucivy index is not ready for folder indexing',
          );
        }
        await this.rebuildWithLucivy(filePaths, chatDayPaths, total, null, {
          incremental: true,
        });
      } else {
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

        await this.rebuildWithLucivy(filePaths, chatDayPaths, total, checkpoint, {
          incremental: false,
        });
        await this.clearCheckpoint();
        this.hasCheckpoint = false;
        this.checkpointProcessedCount = 0;
      }
    } catch (err) {
      if (err instanceof RebuildCancelledError || this.cancelRequested) {
        this.lastBuildCancelled = true;
        this.lastError = null;
        this.appendLog(
          'warn',
          folderScoped
            ? '중지 · 폴더 색인 중단 (완료분까지 저장됨)'
            : '중지 · 완료 — 체크포인트 유지 (다시 색인 시 이어서/처음부터 선택)',
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
        this.appendLog(
          'ok',
          folderScoped ? '폴더 색인 종료' : '백그라운드 색인 종료',
        );
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
    mode: { incremental: boolean } = { incremental: false },
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

    if (mode.incremental) {
      // Keep current Lucivy + docs; only upsert the scoped paths.
      this.appendLog(
        'info',
        `기존 색인에 병합 · 남은 파일 ${remainingFiles.length} · 채팅 day ${remainingChats.length}`,
      );
      this.emit();
    } else if (checkpoint) {
      this.appendLog(
        'info',
        `체크포인트에서 재개 (파일 ${processedFiles.size}/${filePaths.length} · 채팅 ${processedChats.size}/${chatDayPaths.length})`,
      );
      this.emit();
      await yieldToMain();
      const snapshot = gunzipBytes(checkpoint.luceGz);
      await yieldToMain();
      let docsMap = new Map<string, import('@/utils/advancedSearch/types').DocMeta>();
      try {
        const raw = gunzipSync(checkpoint.docsGz);
        await yieldToMain();
        docsMap = new Map(
          Object.entries(
            JSON.parse(strFromU8(raw)) as Record<
              string,
              import('@/utils/advancedSearch/types').DocMeta
            >,
          ),
        );
      } catch {
        docsMap = new Map();
      }
      await yieldToMain();
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
      this.appendLog(
        'info',
        isTauriApp()
          ? '네이티브 Lucivy 인덱스 생성 중…'
          : 'Lucivy OPFS 인덱스 생성 중…',
      );
      this.emit();
      this.index = emptyIndex();
      this.docIdMap = emptyDocIdMap();
      await api.destroyLucivyIndex();
      await api.openOrCreateLucivyIndex(null);
    }

    this.lucivyReady = true;
    this.loaded = true;

    const skipCheckpoint = mode.incremental;

    const bulk = {
      skipRecount: true as const,
      isCancelled: () => this.cancelRequested,
    };
    let n = processedFiles.size + processedChats.size;
    this.buildProgress = n / total;
    this.emitBuildProgress(true);

    let fileOk = processedFiles.size;
    let fileFail = 0;
    let sinceCheckpoint = 0;
    const concurrency = indexRebuildConcurrency();
    const fileDoneBase = processedFiles.size;
    this.appendLog(
      'info',
      `파일 색인 워커 ${concurrency}개 · claim queue (경로당 1회)`,
    );
    this.emit();

    // Workers pull distinct paths from a shared claim queue (no double-index).
    // Path lock vs incremental notify; Lucivy writes serialized in upsert.
    // Cancel: stop new claims immediately; one checkpoint flush after the pool.
    try {
      await runClaimedWorkQueue(
        remainingFiles,
        concurrency,
        (path) => fileIndexClaimKey(path),
        async (path, claimOrdinal) => {
          this.assertNotCancelled('파일 claim', path);
          const displayOrdinal = fileDoneBase + claimOrdinal;
          await withIndexPathLock(fileIndexClaimKey(path), async () => {
            this.assertNotCancelled('파일 잠금', path);
            this.appendLog(
              'info',
              `색인 start · 파일 ${displayOrdinal}/${filePaths.length} · ${path}`,
            );
            try {
              const { text: raw } = (await this.backend!.readText?.(path)) || {
                text: '',
              };
              this.assertNotCancelled('파일 읽기 후', path);
              await this.yieldOrCancel('파일 준비', path);
              const text = indexableEncMdBody(path, raw);
              const chunkCount = countIndexChunksForLength(text.length);
              if (chunkCount > 1) {
                this.appendLog(
                  'info',
                  `대용량 청크 색인 · ${chunkCount}청크 · ${path}`,
                );
              }
              this.assertNotCancelled('파일 upsert 전', path);
              await upsertFileDocument(
                this.index,
                this.docIdMap,
                path,
                text,
                bulk,
              );
              this.assertNotCancelled('파일 upsert 후', path);
              let doneCount = 0;
              await withIndexWriteLock(async () => {
                fileOk += 1;
                doneCount = fileOk;
                processedFiles.add(path);
                n += 1;
                sinceCheckpoint += 1;
                this.buildProgress = n / total;
              });
              this.appendLog(
                'ok',
                `색인 end · 파일 ${doneCount}/${filePaths.length} · ${path}`,
              );
              this.emitBuildProgress();
            } catch (err) {
              if (err instanceof RebuildCancelledError) {
                this.logCancelStep(
                  `abandon-file:${path}`,
                  `진행 중이던 파일 색인 즉시 중단 (체크포인트 미포함) · ${path}`,
                );
                throw err;
              }
              await withIndexWriteLock(async () => {
                fileFail += 1;
                processedFiles.add(path);
                n += 1;
                sinceCheckpoint += 1;
                this.buildProgress = n / total;
              });
              const msg = err instanceof Error ? err.message : String(err);
              this.appendLog('warn', `색인 end · 파일 실패 · ${path} — ${msg}`);
              this.emitBuildProgress();
            }
          });

          let doCheckpoint = false;
          await withIndexWriteLock(async () => {
            if (
              !skipCheckpoint &&
              !this.cancelRequested &&
              sinceCheckpoint >= this.checkpointEvery
            ) {
              sinceCheckpoint = 0;
              doCheckpoint = true;
            }
          });
          if (doCheckpoint) {
            this.assertNotCancelled('파일 주기 체크포인트 전', path);
            await withIndexWriteLock(async () => {
              await this.writeCheckpoint(
                [...processedFiles],
                [...processedChats],
              );
            });
          }
          this.assertNotCancelled('파일 작업 완료 후', path);
        },
        {
          shouldStop: () => this.cancelRequested,
          onStopClaiming: () => {
            this.logCancelStep(
              'file-claim-stop',
              '파일 claim 큐 중단 — 새 파일 없음 · 진행 중 파일은 포기 후 완료분만 저장',
            );
          },
        },
      );
      this.assertNotCancelled('파일 풀 종료 후');
    } catch (err) {
      if (err instanceof RebuildCancelledError || this.cancelRequested) {
        this.logCancelStep(
          'file-pool-drain',
          '진행 중 파일 포기 완료 — 완료분만 체크포인트로 진행',
        );
        if (!skipCheckpoint) {
          await this.flushCheckpointBeforeCancel(
            [...processedFiles],
            [...processedChats],
          );
        } else {
          // Folder merge: persist completed upserts without a full-rebuild checkpoint.
          recountManifest(this.index);
          this.index.manifest.initialized = true;
          this.index.manifest.nextNumericId = this.docIdMap.nextNumericId;
          this.dirty = true;
          await this.persistNow();
        }
      }
      throw err;
    }
    this.appendLog(
      'info',
      `파일 색인 완료 (성공 ${fileOk} · 실패 ${fileFail})`,
    );
    this.emitBuildProgress(true);

    let chatOk = processedChats.size;
    let chatFail = 0;
    const chatDoneBase = processedChats.size;
    this.appendLog(
      'info',
      `채팅 색인 워커 ${concurrency}개 · claim queue (day당 1회)`,
    );
    this.emit();

    try {
      await runClaimedWorkQueue(
        remainingChats,
        concurrency,
        (path) => chatIndexClaimKey(path),
        async (path, claimOrdinal) => {
          this.assertNotCancelled('채팅 claim', path);
          const displayOrdinal = chatDoneBase + claimOrdinal;
          await withIndexPathLock(chatIndexClaimKey(path), async () => {
            this.assertNotCancelled('채팅 잠금', path);
            this.appendLog(
              'info',
              `색인 start · 채팅 ${displayOrdinal}/${chatDayPaths.length} · ${path}`,
            );
            try {
              const { text } = (await this.backend!.readText?.(path)) || {
                text: '',
              };
              this.assertNotCancelled('채팅 읽기 후', path);
              const changed = await upsertChatDayDocuments(
                this.index,
                this.docIdMap,
                path,
                text,
                {
                  ...bulk,
                  yieldEvery: 8,
                  yieldFn: () => this.yieldOrCancel('채팅 메시지 배치', path),
                  lucivyBatchSize: isTauriApp() ? 64 : 32,
                },
              );
              this.assertNotCancelled('채팅 upsert 후', path);
              let doneCount = 0;
              await withIndexWriteLock(async () => {
                chatOk += 1;
                doneCount = chatOk;
                processedChats.add(path);
                n += 1;
                sinceCheckpoint += 1;
                this.buildProgress = n / total;
              });
              this.appendLog(
                'ok',
                `색인 end · 채팅 ${doneCount}/${chatDayPaths.length} · ${path} (+${changed})`,
              );
              this.emitBuildProgress();
            } catch (err) {
              if (err instanceof RebuildCancelledError) {
                this.logCancelStep(
                  `abandon-chat:${path}`,
                  `진행 중이던 채팅 day 색인 즉시 중단 (체크포인트 미포함) · ${path}`,
                );
                throw err;
              }
              await withIndexWriteLock(async () => {
                chatFail += 1;
                processedChats.add(path);
                n += 1;
                sinceCheckpoint += 1;
                this.buildProgress = n / total;
              });
              const msg = err instanceof Error ? err.message : String(err);
              this.appendLog('warn', `색인 end · 채팅 실패 · ${path} — ${msg}`);
              this.emitBuildProgress();
            }
          });

          let doCheckpoint = false;
          await withIndexWriteLock(async () => {
            if (
              !skipCheckpoint &&
              !this.cancelRequested &&
              sinceCheckpoint >= this.checkpointEvery
            ) {
              sinceCheckpoint = 0;
              doCheckpoint = true;
            }
          });
          if (doCheckpoint) {
            this.assertNotCancelled('채팅 주기 체크포인트 전', path);
            await withIndexWriteLock(async () => {
              await this.writeCheckpoint(
                [...processedFiles],
                [...processedChats],
              );
            });
          }
          this.assertNotCancelled('채팅 작업 완료 후', path);
        },
        {
          shouldStop: () => this.cancelRequested,
          onStopClaiming: () => {
            this.logCancelStep(
              'chat-claim-stop',
              '채팅 claim 큐 중단 — 새 day 없음 · 진행 중 day는 포기 후 완료분만 저장',
            );
          },
        },
      );
      this.assertNotCancelled('채팅 풀 종료 후');
    } catch (err) {
      if (err instanceof RebuildCancelledError || this.cancelRequested) {
        this.logCancelStep(
          'chat-pool-drain',
          '진행 중 채팅 포기 완료 — 완료분만 체크포인트로 진행',
        );
        if (!skipCheckpoint) {
          await this.flushCheckpointBeforeCancel(
            [...processedFiles],
            [...processedChats],
          );
        } else {
          recountManifest(this.index);
          this.index.manifest.initialized = true;
          this.index.manifest.nextNumericId = this.docIdMap.nextNumericId;
          this.dirty = true;
          await this.persistNow();
        }
      }
      throw err;
    }
    this.assertNotCancelled('채팅 단계 이후');
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
      !isIndexableFilePath(path, this.indexPathOptions())
    ) {
      return;
    }
    if (!isSearchIsolationReady()) return;
    await this.ensureLoaded();
    if (!this.lucivyReady) return;

    await withIndexPathLock(fileIndexClaimKey(path), async () => {
      if (!this.building) {
        this.appendLog('info', `색인 start · 파일 · ${path}`);
      }
      try {
        const changed = await upsertFileDocument(
          this.index,
          this.docIdMap,
          path,
          content,
        );
        if (!this.building) {
          this.appendLog(
            'ok',
            `색인 end · 파일 · ${path}${changed ? '' : ' (unchanged)'}`,
          );
        }
        if (changed) {
          this.index.manifest.initialized = true;
          this.schedulePersist();
        }
      } catch (err) {
        if (!this.building) {
          const msg = err instanceof Error ? err.message : String(err);
          this.appendLog('warn', `색인 end · 파일 실패 · ${path} — ${msg}`);
        }
        throw err;
      }
    });
  }

  async indexChatDay(dateStrOrPath: string, content: string): Promise<void> {
    if (!this.enabled) return;
    if (!isSearchIsolationReady()) return;
    await this.ensureLoaded();
    if (!this.lucivyReady) return;

    await withIndexPathLock(chatIndexClaimKey(dateStrOrPath), async () => {
      if (!this.building) {
        this.appendLog('info', `색인 start · 채팅 · ${dateStrOrPath}`);
      }
      try {
        const changed = await upsertChatDayDocuments(
          this.index,
          this.docIdMap,
          dateStrOrPath,
          content,
        );
        if (!this.building) {
          this.appendLog(
            'ok',
            `색인 end · 채팅 · ${dateStrOrPath} (+${changed})`,
          );
        }
        if (changed > 0) {
          this.index.manifest.initialized = true;
          this.schedulePersist();
        }
      } catch (err) {
        if (!this.building) {
          const msg = err instanceof Error ? err.message : String(err);
          this.appendLog(
            'warn',
            `색인 end · 채팅 실패 · ${dateStrOrPath} — ${msg}`,
          );
        }
        throw err;
      }
    });
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
    if (event.type === 'retargetPaths') {
      if (!this.enabled) return;
      if (!isSearchIsolationReady()) return;
      await this.ensureLoaded();
      if (!this.index || !this.lucivyReady) return;
      const changed = await retargetFileDocumentsByPrefix(
        this.index,
        this.docIdMap,
        event.from,
        event.to,
      );
      if (changed > 0) {
        this.appendLog(
          'info',
          `색인 경로 이동 · ${changed}건 · ${event.from} → ${event.to}`,
        );
        this.schedulePersist();
        this.emit();
      }
      return;
    }
    if (event.type === 'removePaths') {
      if (!this.enabled) return;
      if (!isSearchIsolationReady()) return;
      await this.ensureLoaded();
      if (!this.index || !this.lucivyReady) return;
      const removed = await removeFileDocumentsByPrefix(
        this.index,
        this.docIdMap,
        event.path,
      );
      if (removed > 0) {
        this.appendLog(
          'info',
          `색인 문서 제거 · ${removed}건 · ${event.path}`,
        );
        this.schedulePersist();
        this.emit();
      }
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

  async searchContentPage(
    query: string,
    trees: Array<TreeNode[] | null | undefined>,
    limit = 40,
  ): Promise<ContentSearchFileHit[]> {
    if (this.enabled) await this.ensureLoaded();
    const gen = ++this.searchGeneration;
    const q = String(query || '').trim();
    if (!q || !this.backend) return [];

    const useIndex = this.enabled && this.hasIndex();
    let indexHits: ContentSearchFileHit[] = [];
    let indexSearchFailed = false;

    if (useIndex) {
      try {
        indexHits = await searchContentPageFromIndex({
          query: q,
          index: this.index,
          backend: this.backend,
          limit,
          generation: gen,
          isCurrent: (g) => g === this.searchGeneration,
          lucivySearch: async (terms, lim) => {
            const api = await this.loadLucivyApi();
            const built = api.buildContainsAndQuery('body', terms);
            if (!built) return [];
            const rawHits = await api.lucivySearch(built, { limit: lim });
            return rawHits
              .map((h) => {
                const docId = this.docIdMap.numericToString.get(h.docId);
                if (!docId) return null;
                return { docId, score: h.score };
              })
              .filter((x): x is { docId: string; score: number } => x != null);
          },
        });
      } catch (err) {
        indexSearchFailed = true;
        console.warn('[advancedSearch] indexed content page search failed', err);
      }
    }

    if (gen !== this.searchGeneration) return indexHits;

    const mergeHits = (base: ContentSearchFileHit[], extra: ContentSearchFileHit[]): ContentSearchFileHit[] => {
      const byId = new Map(base.map((h) => [h.docId, h]));
      for (const hit of extra) {
        if (!byId.has(hit.docId)) byId.set(hit.docId, hit);
      }
      return Array.from(byId.values())
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
        .slice(0, limit);
    };

    if (indexSearchFailed || !useIndex) {
      if (!this.shouldFullLiveContentSearch() && !(indexSearchFailed && this.canLiveContentSearch())) {
        return indexHits;
      }
      try {
        return await searchContentPageLive({
          query: q,
          trees,
          backend: this.backend,
          includeOtherFiles: this.includeOtherFiles,
          excludedFolders: this.excludedFolders,
          limits: this.liveScanLimits,
          limit,
          generation: gen,
          isCurrent: (g) => g === this.searchGeneration,
        });
      } catch (err) {
        console.warn('[advancedSearch] live content page search failed', err);
        return indexHits;
      }
    }

    if (!this.shouldSupplementUnindexedLive()) return indexHits;

    const remaining = limit - indexHits.length;
    if (remaining <= 0) return indexHits;

    try {
      const liveHits = await searchContentPageLive({
        query: q,
        trees,
        backend: this.backend,
        includeOtherFiles: this.includeOtherFiles,
        excludedFolders: this.excludedFolders,
        limits: this.liveScanLimits,
        limit: remaining,
        generation: gen,
        isCurrent: (g) => g === this.searchGeneration,
        onlyUnindexed: true,
        indexedCoverage: buildIndexedCoverage(this.index),
      });
      if (gen !== this.searchGeneration) return indexHits;
      return mergeHits(indexHits, liveHits);
    } catch (err) {
      console.warn('[advancedSearch] unindexed content page scan failed', err);
      return indexHits;
    }
  }

  async search(
    query: string,
    trees: Array<TreeNode[] | null | undefined>,
    limit = 50,
    commandContext?: import('@/utils/advancedSearch/commands').AppCommandContext,
  ): Promise<AdvancedSearchHit[]> {
    if (this.enabled) await this.ensureLoaded();
    const useIndex = this.enabled && this.hasIndex();
    const gen = ++this.searchGeneration;

    const base = await runAdvancedSearch({
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

    if (gen !== this.searchGeneration) return base;

    const q = String(query || '').trim();
    if (!q || !this.backend) return base;

    const mergeLiveHits = (liveHits: AdvancedSearchHit[]): AdvancedSearchHit[] => {
      if (liveHits.length === 0) return base;
      const byId = new Map(base.map((h) => [h.docId, h]));
      for (const hit of liveHits) {
        const prev = byId.get(hit.docId);
        if (!prev) {
          byId.set(hit.docId, hit);
          continue;
        }
        const reasons = Array.from(new Set([...prev.reasons, ...hit.reasons]));
        const merged: AdvancedSearchHit = {
          docId: prev.docId,
          kind: hit.kind,
          path: hit.path,
          title: hit.title,
          reasons,
          score: Math.max(prev.score, hit.score) + 5,
        };
        const preview = hit.preview || prev.preview;
        if (preview !== undefined) merged.preview = preview;
        if (hit.dateStr !== undefined) merged.dateStr = hit.dateStr;
        else if (prev.dateStr !== undefined) merged.dateStr = prev.dateStr;
        if (hit.messageId !== undefined) merged.messageId = hit.messageId;
        else if (prev.messageId !== undefined) merged.messageId = prev.messageId;
        if (hit.group !== undefined) merged.group = hit.group;
        else if (prev.group !== undefined) merged.group = prev.group;
        byId.set(hit.docId, merged);
      }
      return Array.from(byId.values())
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'))
        .slice(0, limit);
    };

    const liveScanOpts = {
      query: q,
      trees,
      backend: this.backend,
      includeOtherFiles: this.includeOtherFiles,
      excludedFolders: this.excludedFolders,
      limits: this.liveScanLimits,
      generation: gen,
      isCurrent: (g: number) => g === this.searchGeneration,
    };

    if (useIndex && this.shouldSupplementUnindexedLive()) {
      try {
        const liveHits = await liveScanContentHits({
          ...liveScanOpts,
          onlyUnindexed: true,
          indexedCoverage: buildIndexedCoverage(this.index),
          ...(isLiveScanUnlimited(this.liveScanLimits.maxHits)
            ? { limit: limit * 2 }
            : { limit: Math.min(limit * 2, this.liveScanLimits.maxHits) }),
        });
        if (gen !== this.searchGeneration) return base;
        return mergeLiveHits(liveHits);
      } catch (err) {
        console.warn('[advancedSearch] unindexed live content scan failed', err);
        return base;
      }
    }

    if (!useIndex && this.shouldFullLiveContentSearch()) {
      try {
        const liveHits = await liveScanContentHits({
          ...liveScanOpts,
          ...(isLiveScanUnlimited(this.liveScanLimits.maxHits)
            ? {}
            : { limit: Math.min(limit * 2, this.liveScanLimits.maxHits) }),
        });
        if (gen !== this.searchGeneration) return base;
        return mergeLiveHits(liveHits);
      } catch (err) {
        console.warn('[advancedSearch] live content scan failed', err);
        return base;
      }
    }

    return base;
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

export { notifyAdvancedSearchChange } from '@/utils/advancedSearch/notify';
export { chatDateFromPath } from '@/utils/advancedSearch/collectSources';
export type { AdvancedSearchHit };
