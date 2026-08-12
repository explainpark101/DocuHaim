export {
  ADVANCED_SEARCH_FOLDER,
  advancedSearchFolderPrefix,
  manifestKey,
  postingsKey,
  docsKey,
  fileDocId,
  chatDocId,
} from './paths';
export {
  loadAdvancedSearchIndexEnabled,
  saveAdvancedSearchIndexEnabled,
  loadAdvancedSearchIncludeOtherFiles,
  saveAdvancedSearchIncludeOtherFiles,
  loadAdvancedSearchUiAnimationEnabled,
  saveAdvancedSearchUiAnimationEnabled,
} from './settings';
export {
  advancedSearchEngine,
  notifyAdvancedSearchChange,
  type AdvancedSearchHit,
  type EngineStatus,
  type BuildLogEntry,
  type BuildLogLevel,
  type RebuildOptions,
  type RebuildCheckpointInfo,
} from './engine';
export { subscribeAdvancedSearchChanges } from './notify';
export { collectSearchableFileEntries, isIndexableFilePath } from './collectSources';
export {
  APP_COMMANDS,
  matchAppCommands,
  matchAppCommandsRanked,
  getAppCommands,
  scoreCommandRelevance,
} from './commands';
export type { AppCommand, AppCommandId, AppCommandContext, RankedAppCommand } from './commands';
export {
  registerEditorActions,
  runEditorAction,
  hasEditorActions,
  subscribeEditorActions,
  EDITOR_ACTION_COMMANDS,
} from './editorActions';
export type { EditorActionId } from './editorActions';
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
} from './printActions';
export type { PrintActionId, PrintTocEntry, PrintPreviewNavigator } from './printActions';
export {
  registerChatActions,
  runChatAction,
  hasChatActions,
  subscribeChatActions,
  CHAT_ACTION_COMMANDS,
} from './chatActions';
export type { ChatActionId } from './chatActions';
export {
  listBrowseDirectoryHits,
  findBrowseFolderNode,
  getBrowseChildren,
  normalizeDirPath,
} from './browseDirectory';
export type { BrowseTreeNode } from './browseDirectory';
export {
  listChatGroupHits,
  chatGroupHashPath,
  chatClearGroupHashPath,
  parseChatGroupHash,
  isChatClearGroupHash,
  CHAT_SELECT_GROUP_COMMAND_ID,
  CHAT_SELECT_GROUP_ITEM_COMMAND_ID,
  CHAT_CLEAR_GROUP_COMMAND_ID,
} from './chatGroups';
export type { ChatGroupEntry } from './chatGroups';
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
} from './footnoteInsert';
export type { FootnoteInsertCommandId } from './footnoteInsert';
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
} from './settingsToggles';
export type {
  SettingsToggleId,
  SettingsToggleDef,
  WorkspaceTabsAutoSaveCommandId,
  FootnoteDisplayModeCommandId,
} from './settingsToggles';
export {
  fuzzyMatchText,
  fuzzyMatchTokensInHaystacks,
  scoreFuzzyRelevance,
  scoreFuzzyFields,
} from './fuzzyMatch';
export {
  requestOpenAdvancedSearch,
  subscribeOpenAdvancedSearch,
} from './openRequest';
export type {
  AdvancedSearchOpenDetail,
  AdvancedSearchOpenMode,
} from './openRequest';
