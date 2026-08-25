export { APP_INIT_SECTION } from '@/App/sections/appInit';
export { APP_AUTH_ACTIONS_SECTION } from '@/App/sections/appAuthActions';
export { APP_STORAGE_BACKEND_SECTION, isVaultPathStorageType, VAULT_PATH_STORAGE_TYPES } from '@/App/sections/appStorageBackend';
export type { VaultPathStorageType } from '@/App/sections/appStorageBackend';
export { APP_LOCAL_FOLDER_SECTION } from '@/App/sections/appLocalFolder';
export { APP_FILE_SESSION_SECTION } from '@/App/sections/appFileSession';
export { APP_TREE_CRUD_SECTION } from '@/App/sections/appTreeCrud';
export { createAutoSaveSyncHandlers } from '@/App/sections/appAutoSaveSync';
// useMainAppController is imported directly by MainApp (heavy); keep out of barrel.
