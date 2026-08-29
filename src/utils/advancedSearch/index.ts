export {
  ADVANCED_SEARCH_FOLDER,
  SYSTEM_INDEX_EXCLUDED_FOLDERS,
  vaultTrashDestPath,
  advancedSearchFolderPrefix,
  manifestKey,
  docsKey,
  luceKey,
  postingsKey,
  fileDocId,
  chatDocId,
} from '@/utils/advancedSearch/paths';
export {
  loadAdvancedSearchIndexEnabled,
  saveAdvancedSearchIndexEnabled,
  loadAdvancedSearchIncludeOtherFiles,
  saveAdvancedSearchIncludeOtherFiles,
  loadAdvancedSearchUiAnimationEnabled,
  saveAdvancedSearchUiAnimationEnabled,
  loadAdvancedSearchBuildLogAutoScroll,
  saveAdvancedSearchBuildLogAutoScroll,
  loadAdvancedSearchLiveScanLimits,
  saveAdvancedSearchLiveScanLimits,
  normalizeLiveScanLimits,
  DEFAULT_LIVE_SCAN_LIMITS,
  LIVE_SCAN_LIMIT_BOUNDS,
  LIVE_SCAN_UNLIMITED,
  isLiveScanUnlimited,
  loadAdvancedSearchExcludeFolders,
  saveAdvancedSearchExcludeFolders,
  normalizeExcludeFolders,
  addExcludeFolder,
  removeExcludeFolder,
  isPathUnderExcludedFolders,
  loadAdvancedSearchCheckpointEvery,
  saveAdvancedSearchCheckpointEvery,
  normalizeCheckpointEvery,
  DEFAULT_CHECKPOINT_EVERY,
  CHECKPOINT_EVERY_BOUNDS,
  type AdvancedSearchLiveScanLimits,
} from '@/utils/advancedSearch/settings';
export {
  advancedSearchEngine,
  notifyAdvancedSearchChange,
  type AdvancedSearchHit,
  type EngineStatus,
  type BuildLogEntry,
  type BuildLogLevel,
  type RebuildOptions,
  type RebuildCheckpointInfo,
} from '@/utils/advancedSearch/engine';
export { subscribeAdvancedSearchChanges } from '@/utils/advancedSearch/notify';
export { collectSearchableFileEntries, isIndexableFilePath, isExcludedPath, isSystemIndexExcludedFolder } from '@/utils/advancedSearch/collectSources';
export {
  APP_COMMANDS,
  matchAppCommands,
  matchAppCommandsRanked,
  getAppCommands,
  scoreCommandRelevance,
} from '@/utils/advancedSearch/commands';
export type { AppCommand, AppCommandId, AppCommandContext, RankedAppCommand } from '@/utils/advancedSearch/commands';
export {
  registerEditorActions,
  runEditorAction,
  hasEditorActions,
  subscribeEditorActions,
  EDITOR_ACTION_COMMANDS,
} from '@/utils/advancedSearch/editorActions';
export type { EditorActionId } from '@/utils/advancedSearch/editorActions';
export {
  registerPrintActions,
  registerPrintTocProvider,
  registerPrintPreviewNavigator,
  runPrintAction,
  hasPrintActions,
  subscribePrintActions,
  focusPrintToolbar,
  scrollPrintHeading,
  PRINT_ACTION_COMMANDS,
  PRINT_PAPER_SIZE_COMMANDS,
} from '@/utils/advancedSearch/printActions';
export type { PrintActionId, PrintTocEntry, PrintPreviewNavigator } from '@/utils/advancedSearch/printActions';
export {
  registerChatActions,
  runChatAction,
  hasChatActions,
  subscribeChatActions,
  CHAT_ACTION_COMMANDS,
} from '@/utils/advancedSearch/chatActions';
export type { ChatActionId } from '@/utils/advancedSearch/chatActions';
export {
  registerMlxVlmActions,
  runMlxVlmAction,
  isMlxVlmActionsAvailable,
  subscribeMlxVlmActions,
  MLX_VLM_ACTION_COMMANDS,
} from '@/utils/advancedSearch/mlxVlmActions';
export type { MlxVlmActionId } from '@/utils/advancedSearch/mlxVlmActions';
export {
  listBrowseDirectoryHits,
  findBrowseFolderNode,
  getBrowseChildren,
  normalizeDirPath,
} from '@/utils/advancedSearch/browseDirectory';
export type { BrowseTreeNode } from '@/utils/advancedSearch/browseDirectory';
export {
  listChatGroupHits,
  chatGroupHashPath,
  chatClearGroupHashPath,
  parseChatGroupHash,
  isChatClearGroupHash,
  CHAT_SELECT_GROUP_COMMAND_ID,
  CHAT_SELECT_GROUP_ITEM_COMMAND_ID,
  CHAT_CLEAR_GROUP_COMMAND_ID,
} from '@/utils/advancedSearch/chatGroups';
export type { ChatGroupEntry } from '@/utils/advancedSearch/chatGroups';
export {
  listFootnoteInsertChoiceHits,
  listExistingFootnoteHits,
  registerFootnoteInsertHandlers,
  hasFootnoteInsertHandlers,
  getFootnoteInsertMarkdown,
  runInsertExistingFootnote,
  runOpenFootnoteCompose,
  subscribeFootnoteInsertHandlers,
  isFootnoteInsertCommandId,
  isFootnoteRelatedCommandId,
  FOOTNOTE_INSERT_COMMAND_ID,
  FOOTNOTE_INSERT_PICK_EXISTING_ID,
  FOOTNOTE_INSERT_COMPOSE_ID,
  FOOTNOTE_INSERT_EXISTING_ITEM_ID,
} from '@/utils/advancedSearch/footnoteInsert';
export type { FootnoteInsertCommandId } from '@/utils/advancedSearch/footnoteInsert';
export {
  listCircleNumberHits,
  isCircleNumberInsertCommandId,
  CIRCLE_NUMBER_INSERT_COMMAND_ID,
  CIRCLE_NUMBER_INSERT_ITEM_ID,
} from '@/utils/advancedSearch/circleNumberInsert';
export type { CircleNumberInsertCommandId } from '@/utils/advancedSearch/circleNumberInsert';
export {
  SETTINGS_TOGGLE_DEFS,
  isSettingsToggleId,
  loadSettingsToggle,
  setSettingsToggle,
  toggleSettingsToggle,
  subscribeSettingsToggles,
  getSettingsToggleStates,
  isWorkspaceTabsAutoSaveCommandId,
  getWorkspaceTabsAutoSaveCommands,
  applyWorkspaceTabsAutoSaveCommand,
  workspaceTabsAutoSaveModeFromCommandId,
  isFootnoteDisplayModeCommandId,
  getFootnoteDisplayModeCommands,
  applyFootnoteDisplayModeCommand,
  footnoteDisplayModeFromCommandId,
} from '@/utils/advancedSearch/settingsToggles';
export type {
  SettingsToggleId,
  SettingsToggleDef,
  WorkspaceTabsAutoSaveCommandId,
  FootnoteDisplayModeCommandId,
} from '@/utils/advancedSearch/settingsToggles';
export {
  fuzzyMatchText,
  fuzzyMatchTokensInHaystacks,
  scoreFuzzyRelevance,
  scoreFuzzyFields,
} from '@/utils/advancedSearch/fuzzyMatch';
export {
  requestOpenAdvancedSearch,
  subscribeOpenAdvancedSearch,
} from '@/utils/advancedSearch/openRequest';
export type {
  AdvancedSearchOpenDetail,
  AdvancedSearchOpenMode,
} from '@/utils/advancedSearch/openRequest';
