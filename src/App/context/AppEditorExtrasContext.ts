import { createContext } from 'react';

/**
 * Editor image upload / download / advanced-search trees / presigned URL /
 * open-in-new-window / storage-usage unused-image helpers for AppLayout.
 */
export type AppEditorExtrasValue = {
  handleUploadEditorImage: (...args: any[]) => any;
  cancelEditorImageUpload: (...args: any[]) => any;
  isUploadingEditorImage: boolean;
  editorImageUploadPercent: number;
  handleRequestDownload: (...args: any[]) => any;
  handleViewUnsupportedAsText: (...args: any[]) => any;
  getAdvancedSearchTrees: (...args: any[]) => any;
  ensureAdvancedSearchBrowseFolder: (...args: any[]) => any;
  getPresignedUrlForPath: (...args: any[]) => any;
  handleOpenInNewWindow: (...args: any[]) => any;
  handleOpenStorageUsageFile: (...args: any[]) => any;
  handleDeleteUnusedImagePaths: (...args: any[]) => any;
  handleReadUnusedImageBytes: (...args: any[]) => any;
  handleReadUnusedImageText: (...args: any[]) => any;
};

export const APP_EDITOR_EXTRAS_KEYS = [
  'handleUploadEditorImage',
  'cancelEditorImageUpload',
  'isUploadingEditorImage',
  'editorImageUploadPercent',
  'handleRequestDownload',
  'handleViewUnsupportedAsText',
  'getAdvancedSearchTrees',
  'ensureAdvancedSearchBrowseFolder',
  'getPresignedUrlForPath',
  'handleOpenInNewWindow',
  'handleOpenStorageUsageFile',
  'handleDeleteUnusedImagePaths',
  'handleReadUnusedImageBytes',
  'handleReadUnusedImageText',
] as const satisfies readonly (keyof AppEditorExtrasValue)[];

export const AppEditorExtrasContext = createContext<AppEditorExtrasValue | null>(null);
