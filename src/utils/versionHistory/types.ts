/** Shared note + chat edit version history types. */

export type VersionSource = 's3-native' | 'app' | 'legacy-app';

export type VersionHistoryMode = 'native' | 'app' | 'off';

export type VersionHistoryTarget =
  | { kind: 'note'; path: string }
  | { kind: 'chatEdit'; messageId: string };

export type VersionEntry = {
  id: string;
  source: VersionSource;
  at: string;
  size: number;
  isLatest?: boolean;
  isDeleteMarker?: boolean;
  /** S3 object key when source is s3-native or legacy file path for app. */
  key?: string;
  versionId?: string;
  /** Chat-only: group label stored in serializeEditVersion. */
  group?: string;
  /** True when this entry must not be deleted from history UI (current object). */
  protectCurrent?: boolean;
};

export type VersionDeleteResult = {
  deletedIds: string[];
  failed: Array<{ id: string; message: string }>;
};

export type VersionHistoryVaultBackend = {
  isReady?: () => boolean;
  readText: (path: string) => Promise<{ text: string }>;
  writeText: (
    path: string,
    text: string,
    contentType?: string,
  ) => Promise<void>;
  delete: (path: string) => Promise<void>;
  deletePrefix?: (prefix: string) => Promise<void>;
  mkdir?: (path: string) => Promise<void>;
  listAll?: () => Promise<unknown>;
  /** Optional flat key listing (chat backends). */
  listKeys?: (prefix: string) => Promise<string[]>;
};

export type VersionHistoryS3Deps = {
  getClient: () => unknown;
  bucket: string;
};

export type VersionHistoryContext = {
  storageMode: string;
  s3?: VersionHistoryS3Deps | null;
  getVaultBackend: () => VersionHistoryVaultBackend | null;
  /** Chat backend put/list/delete when archiving chat edits. */
  chatBackend?: {
    ensureChatFolder: () => Promise<void>;
    putTextOverwrite: (
      key: string,
      content: string,
      contentType?: string,
    ) => Promise<unknown>;
    listKeys: (prefix: string) => Promise<string[]>;
    deleteKey: (key: string) => Promise<void>;
    getText: (key: string) => Promise<string | null>;
  } | null;
};
