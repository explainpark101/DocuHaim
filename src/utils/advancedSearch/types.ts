export type DocKind = 'file' | 'chat';

export type DocMeta = {
  kind: DocKind;
  path: string;
  title?: string;
  dateStr?: string;
  messageId?: string;
  group?: string;
  preview?: string;
  contentHash: string;
};

export type ManifestDocEntry = {
  contentHash: string;
  kind: DocKind;
  lastModified?: string | null;
};

export type IndexManifest = {
  schemaVersion: number;
  builtAt: string;
  fileCount: number;
  chatCount: number;
  /** True after user-triggered full build (or legacy load with docs). */
  initialized: boolean;
  docs: Record<string, ManifestDocEntry>;
};

export const INDEX_SCHEMA_VERSION = 1;

export type InMemoryIndex = {
  postings: Map<string, Set<string>>;
  docs: Map<string, DocMeta>;
  manifest: IndexManifest;
};

export function emptyManifest(): IndexManifest {
  return {
    schemaVersion: INDEX_SCHEMA_VERSION,
    builtAt: new Date(0).toISOString(),
    fileCount: 0,
    chatCount: 0,
    initialized: false,
    docs: {},
  };
}

export function emptyIndex(): InMemoryIndex {
  return {
    postings: new Map(),
    docs: new Map(),
    manifest: emptyManifest(),
  };
}

export function recountManifest(index: InMemoryIndex): void {
  let fileCount = 0;
  let chatCount = 0;
  const docs: Record<string, ManifestDocEntry> = {};
  for (const [docId, meta] of index.docs) {
    if (meta.kind === 'file') fileCount += 1;
    else chatCount += 1;
    docs[docId] = {
      contentHash: meta.contentHash,
      kind: meta.kind,
    };
  }
  const wasInitialized = index.manifest.initialized === true || fileCount + chatCount > 0;
  index.manifest = {
    schemaVersion: INDEX_SCHEMA_VERSION,
    builtAt: new Date().toISOString(),
    fileCount,
    chatCount,
    initialized: wasInitialized,
    docs,
  };
}

export function isIndexInitialized(index: InMemoryIndex): boolean {
  if (index.manifest.initialized === true) return true;
  return index.docs.size > 0;
}
