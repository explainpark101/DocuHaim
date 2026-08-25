/**
 * §3 Storage backend — S3/WebDAV clients, tree load, settings store injection.
 * Implementation: `useMainAppController.ts` (marker `// 3. S3 Actions`).
 */
export const APP_STORAGE_BACKEND_SECTION = '§3 Storage Backend' as const;

export const VAULT_PATH_STORAGE_TYPES = ['s3', 'local', 'webdav'] as const;
export type VaultPathStorageType = (typeof VAULT_PATH_STORAGE_TYPES)[number];

export function isVaultPathStorageType(type: string | null | undefined): type is VaultPathStorageType {
  return VAULT_PATH_STORAGE_TYPES.includes(type as VaultPathStorageType);
}
