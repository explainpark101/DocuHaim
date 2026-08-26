/** Shared vault file/folder tree node shape (S3, local, WebDAV). */

export type VaultTreeNodeType = 'file' | 'folder';

export type VaultTreeNode = {
  name: string;
  type: VaultTreeNodeType;
  path: string;
  children?: VaultTreeNode[] | undefined;
  /** Lazy WebDAV/local folder expansion flag. */
  childrenLoaded?: boolean | undefined;
  key?: string | undefined;
  lastModified?: Date | string | undefined;
  size?: number | undefined;
  /** File System Access API handle (local vault). */
  handle?: { getFile?: () => Promise<File> } | null | undefined;
};

export type S3ListContentItem = {
  Key?: string | undefined;
  LastModified?: Date | string | undefined;
  Size?: number | undefined;
};
