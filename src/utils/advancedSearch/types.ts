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
  /** Lucivy numeric _node_id */
  numericId?: number;
};

export type ManifestDocEntry = {
  contentHash: string;
  kind: DocKind;
  lastModified?: string | null;
  numericId?: number;
};

export type IndexManifest = {
  schemaVersion: number;
  builtAt: string;
  fileCount: number;
  chatCount: number;
  /** True after user-triggered full build (or legacy load with docs). */
  initialized: boolean;
  /** Next Lucivy numeric id to allocate. */
  nextNumericId?: number;
  docs: Record<string, ManifestDocEntry>;
};

/** Lucivy LUCE snapshot + docs meta (replaces Map postings). */
export const INDEX_SCHEMA_VERSION = 2;

export type InMemoryIndex = {
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
    nextNumericId: 1,
    docs: {},
  };
}

export function emptyIndex(): InMemoryIndex {
  return {
    docs: new Map(),
    manifest: emptyManifest(),
  };
}

export function recountManifest(index: InMemoryIndex): void {
  let fileCount = 0;
  let chatCount = 0;
  let maxNumeric = 0;
  const docs: Record<string, ManifestDocEntry> = {};
  for (const [docId, meta] of index.docs) {
    if (meta.kind === 'file') fileCount += 1;
    else chatCount += 1;
    if (typeof meta.numericId === 'number' && meta.numericId > maxNumeric) {
      maxNumeric = meta.numericId;
    }
    const entry: ManifestDocEntry = {
      contentHash: meta.contentHash,
      kind: meta.kind,
    };
    if (typeof meta.numericId === 'number') entry.numericId = meta.numericId;
    docs[docId] = entry;
  }
  const wasInitialized = index.manifest.initialized === true || fileCount + chatCount > 0;
  const prevNext = index.manifest.nextNumericId ?? 1;
  index.manifest = {
    schemaVersion: INDEX_SCHEMA_VERSION,
    builtAt: new Date().toISOString(),
    fileCount,
    chatCount,
    initialized: wasInitialized,
    nextNumericId: Math.max(prevNext, maxNumeric + 1),
    docs,
  };
}

export function isIndexInitialized(index: InMemoryIndex): boolean {
  if (index.manifest.initialized === true) return true;
  return index.docs.size > 0;
}
