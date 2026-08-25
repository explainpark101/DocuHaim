/**
 * Cross-domain leftovers for AppLayout (goal &lt;40 keys).
 * Prefer domain hooks; carve further when touching these handlers.
 */
export const APP_HANDLER_KEYS = [
  // Session workspace (8)
  'closeSessionWorkspace',
  'handleOpenSessionFiles',
  'handleOpenSessionDirectory',
  'handleDropSessionTransfer',
  'handleRequestSaveSessionToNote',
  'handleRequestSessionTransformDownload',
  'isOpeningSession',
  'requestNewTempFile',
  // Chat integration (11)
  'chatStorageCtx',
  'chatStorageReady',
  'shareGroupSend',
  'handleShareBlockingChange',
  'handleShareComposeClaimed',
  'handleShareGroupSendConsumed',
  'handleShareNodeToChatWithMyself',
  'handleShareNoteToChatWithMyself',
  'handleCreateNoteFromChatMessage',
  'handleOpenNoteFromChat',
  'getChatImageUrlForPath',
  'getAdvancedSearchChatGroups',
  // Editor image / download / advanced search (9)
  'handleUploadEditorImage',
  'cancelEditorImageUpload',
  'isUploadingEditorImage',
  'editorImageUploadPercent',
  'handleRequestDownload',
  'handleViewUnsupportedAsText',
  'getAdvancedSearchTrees',
  'ensureAdvancedSearchBrowseFolder',
  'getPresignedUrlForPath',
  // Recording toggle (1)
  'handleToggleRecording',
  // Shell helpers (7)
  'operationStatus',
  'addToNoteSelectPath',
  'setAddToNoteSelectPath',
  'setShowSuffixChangeConfirmModal',
  'setSuffixConfirmAction',
  'handleOpenInNewWindow',
  'handleOpenStorageUsageFile',
  'handleDeleteUnusedImagePaths',
  'handleReadUnusedImageBytes',
  'handleReadUnusedImageText',
] as const;

export type AppHandlerKey = (typeof APP_HANDLER_KEYS)[number];
