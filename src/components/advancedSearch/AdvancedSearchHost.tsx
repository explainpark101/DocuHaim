import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdvancedSearchModal from '@/components/advancedSearch/AdvancedSearchModal';
import { useAdvancedSearchActivityStatus } from '@/components/advancedSearch/useAdvancedSearchActivityStatus.js';
import {
  advancedSearchEngine,
  listBrowseDirectoryHits,
  listChatGroupHits,
  listExistingFootnoteHits,
  listFootnoteInsertChoiceHits,
  normalizeDirPath,
  subscribeOpenAdvancedSearch,
  type AdvancedSearchHit,
  type AdvancedSearchOpenMode,
  type ChatGroupEntry,
} from '@/utils/advancedSearch';
import {
  hasEditorActions,
  runEditorAction,
  subscribeEditorActions,
} from '@/utils/advancedSearch/editorActions';
import {
  focusPrintToolbar,
  hasPrintActions,
  matchPrintTocEntries,
  runPrintAction,
  scrollPrintHeading,
  subscribePrintActions,
  type PrintToolbarFocusTarget,
} from '@/utils/advancedSearch/printActions';
import {
  hasChatActions,
  runChatAction,
  subscribeChatActions,
} from '@/utils/advancedSearch/chatActions';
import { scoreFuzzyRelevance } from '@/utils/advancedSearch/fuzzyMatch';
import { requestOpenAdvancedSearch } from '@/utils/advancedSearch/openRequest';
import {
  FOOTNOTE_INSERT_COMMAND_ID,
  FOOTNOTE_INSERT_COMPOSE_ID,
  FOOTNOTE_INSERT_EXISTING_ITEM_ID,
  FOOTNOTE_INSERT_PICK_EXISTING_ID,
  getFootnoteInsertMarkdown,
  runInsertExistingFootnote,
  runOpenFootnoteCompose,
} from '@/utils/advancedSearch/footnoteInsert';
import {
  loadEditorAutocompleteEnabled,
  subscribeEditorAutocomplete,
  toggleEditorAutocompleteEnabled,
} from '@/utils/editorAutocompleteSettings';
import {
  loadMirrorEditEnabled,
  subscribeMirrorEdit,
  toggleMirrorEditEnabled,
} from '@/utils/mirrorEditSettings';
import {
  applyFootnoteDisplayModeCommand,
  applyWorkspaceTabsAutoSaveCommand,
  isFootnoteDisplayModeCommandId,
  isSettingsToggleId,
  isWorkspaceTabsAutoSaveCommandId,
  subscribeSettingsToggles,
  toggleSettingsToggle,
} from '@/utils/advancedSearch/settingsToggles';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';
import { exportPdfPathnameForStoragePath } from '@/utils/appHref';

const PRINT_FOCUS_TARGETS: Record<string, PrintToolbarFocusTarget> = {
  'print-focus-back': 'back',
  'print-focus-font': 'font',
  'print-focus-toc': 'toc',
  'print-focus-save': 'save',
  'print-focus-export': 'export',
  'print-focus-paper': 'paper',
  'print-focus-image-max': 'image-max',
  'print-focus-view-nav': 'view-nav',
  'print-focus-view-pages': 'view-pages',
  'print-focus-zoom': 'zoom',
};

/** Parent folder of an open file (`''` = vault root). */
function parentDirOfFilePath(filePath: string | null | undefined): string {
  const p = String(filePath || '')
    .replace(/^\/+/, '')
    .replace(/\\/g, '/');
  if (!p) return '';
  const idx = p.lastIndexOf('/');
  if (idx < 0) return '';
  return p.slice(0, idx + 1);
}

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

type OpenFileSnapshot = {
  id?: string | null;
  name?: string | null;
  viewer?: string | null;
  type?: string | null;
  content?: string | null;
} | null;

export type AdvancedSearchHostProps = {
  /** Trees used for filename/path matching and rebuild source listing. */
  getTrees: () => Array<TreeNode[] | null | undefined>;
  /** Open a vault file by path (storage-aware). */
  onOpenFile: (path: string) => void | Promise<void>;
  /**
   * Ensure folder children are loaded (local/WebDAV lazy trees) before listing.
   * Called when entering a folder in browse-directory mode.
   */
  ensureBrowseFolderLoaded?: (folderPath: string) => void | Promise<void>;
  /** Open create file/folder modal for the current browse folder. */
  onRequestCreateItem?: (
    type: 'file' | 'folder',
    parentPath: string,
  ) => void;
  /** Load chat groups for nested "채팅 그룹 선택" mode (SELF_GROUP added by lister). */
  getChatGroups?: () => ChatGroupEntry[] | Promise<ChatGroupEntry[]>;
  /** Resolve chat group / wiki image paths for avatars in results. */
  getPresignedUrl?:
    | ((path: string) => Promise<string | null | undefined>)
    | undefined;
  /** Currently open editor file (for contextual commands like export). */
  currentFile?: OpenFileSnapshot;
  /**
   * Default parent folder for create-file / create-folder (vault-relative, trailing `/`).
   * Empty string = vault root. Prefer this over deriving from `currentFile` alone
   * so chat/settings surfaces and focused tabs stay correct.
   */
  defaultCreateParentPath?: string;
  /** Live editor markdown (preferred over currentFile.content for export). */
  editorContent?: string;
  /** `.settings/snippets.json` content for dynamic snippet commands. */
  snippetConfig?: {
    snippets: Array<{
      id: string;
      name?: string;
      prefix?: string;
      body?: string;
      description?: string;
    }>;
  };
  theme?: 'light' | 'dark' | string;
  /** Prefer print-oriented empty hints when on the export page. */
  preferPrintActions?: boolean;
};

/**
 * Global Cmd/Ctrl+K Advanced Search host (Spotlight-style).
 */
export default function AdvancedSearchHost({
  getTrees,
  onOpenFile,
  ensureBrowseFolderLoaded,
  onRequestCreateItem,
  getChatGroups,
  getPresignedUrl,
  currentFile = null,
  defaultCreateParentPath,
  editorContent = '',
  snippetConfig,
  theme = 'light',
  preferPrintActions = false,
}: AdvancedSearchHostProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState<AdvancedSearchOpenMode>('default');
  const [browsePath, setBrowsePath] = useState('');
  const [status, setStatus] = useState(() => advancedSearchEngine.getStatus());
  const [editorActionsAvailable, setEditorActionsAvailable] = useState(() =>
    hasEditorActions(),
  );
  const [printActionsAvailable, setPrintActionsAvailable] = useState(() =>
    hasPrintActions(),
  );
  const [chatActionsAvailable, setChatActionsAvailable] = useState(() =>
    hasChatActions(),
  );
  const [editorAutocompleteEnabled, setEditorAutocompleteEnabled] = useState(() =>
    loadEditorAutocompleteEnabled(),
  );
  const [editorMirrorEditEnabled, setEditorMirrorEditEnabled] = useState(() =>
    loadMirrorEditEnabled(),
  );

  const [settingsToggleEpoch, setSettingsToggleEpoch] = useState(0);

  useAdvancedSearchActivityStatus();

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      setStatus(advancedSearchEngine.getStatus());
    });
  }, []);

  useEffect(() => {
    return subscribeEditorActions(() => {
      setEditorActionsAvailable(hasEditorActions());
    });
  }, []);

  useEffect(() => {
    return subscribePrintActions(() => {
      setPrintActionsAvailable(hasPrintActions());
    });
  }, []);

  useEffect(() => {
    return subscribeChatActions(() => {
      setChatActionsAvailable(hasChatActions());
    });
  }, []);

  useEffect(() => {
    return subscribeEditorAutocomplete((enabled) => {
      setEditorAutocompleteEnabled(enabled);
    });
  }, []);

  useEffect(() => {
    return subscribeMirrorEdit((enabled) => {
      setEditorMirrorEditEnabled(enabled);
    });
  }, []);

  useEffect(() => {
    return subscribeSettingsToggles(() => {
      setSettingsToggleEpoch((n) => n + 1);
    });
  }, []);

  const openSearch = useCallback((mode: AdvancedSearchOpenMode = 'default') => {
    setPickerMode(mode);
    if (mode !== 'browse-directory') setBrowsePath('');
    setOpen(true);
  }, []);

  useEffect(() => {
    return subscribeOpenAdvancedSearch((detail) => {
      if (detail?.mode === 'print-paper') openSearch('print-paper');
      else if (detail?.mode === 'browse-directory') openSearch('browse-directory');
      else if (detail?.mode === 'chat-groups') openSearch('chat-groups');
      else if (detail?.mode === 'footnote-insert') openSearch('footnote-insert');
      else if (detail?.mode === 'footnote-existing') openSearch('footnote-existing');
      else openSearch('default');
    });
  }, [openSearch]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== 'k') return;
      e.preventDefault();
      e.stopPropagation();
      openSearch('default');
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [openSearch]);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setPickerMode('default');
      setBrowsePath('');
    }
  }, []);

  const enterBrowseFolder = useCallback(
    async (folderPath: string) => {
      const next = normalizeDirPath(folderPath);
      if (ensureBrowseFolderLoaded && next) {
        try {
          await ensureBrowseFolderLoaded(next);
          // Let parent tree setState commit so getTrees() sees children.
          await new Promise<void>((resolve) => {
            window.setTimeout(() => resolve(), 0);
          });
        } catch (err) {
          console.warn('[advancedSearch] browse folder load failed', next, err);
        }
      }
      setBrowsePath(next);
      setPickerMode('browse-directory');
    },
    [ensureBrowseFolderLoaded],
  );

  const handleSearch = useCallback(
    async (query: string) => {
      if (pickerMode === 'print-paper') {
        return advancedSearchEngine.search(query, [], 50, {
          printPaperPickerMode: true,
        });
      }

      if (pickerMode === 'browse-directory') {
        return listBrowseDirectoryHits(getTrees(), browsePath, query, 200);
      }

      if (pickerMode === 'chat-groups') {
        let groups: ChatGroupEntry[] = [];
        if (getChatGroups) {
          try {
            groups = (await getChatGroups()) || [];
          } catch (err) {
            console.warn('[advancedSearch] getChatGroups failed', err);
          }
        }
        return listChatGroupHits(groups, query, 80);
      }

      if (pickerMode === 'footnote-insert') {
        return listFootnoteInsertChoiceHits(query);
      }

      if (pickerMode === 'footnote-existing') {
        const markdown = getFootnoteInsertMarkdown() || editorContent || '';
        return listExistingFootnoteHits(markdown, query, 80);
      }

      const hits = await advancedSearchEngine.search(query, getTrees(), 50, {
        currentFile,
        editorActionsAvailable,
        printActionsAvailable,
        chatActionsAvailable,
        editorAutocompleteEnabled,
        editorMirrorEditEnabled,
        snippetConfig,
      });

      if (!printActionsAvailable) return hits;

      const q = query.trim().toLowerCase();
      const tocHits: AdvancedSearchHit[] = matchPrintTocEntries(query, 40)
        .map((e, index) => {
          const title = e.text;
          const score = q
            ? scoreFuzzyRelevance(title, q) || 400 - index
            : 150 - index;
          return {
            docId: `print-toc:${e.id}`,
            kind: 'command' as const,
            path: e.id,
            title,
            preview: `H${e.level} · 목차로 스크롤`,
            commandId: 'print-scroll-heading' as const,
            reasons: ['command' as const],
            score,
          };
        })
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'));

      const seen = new Set<string>();
      const merged: AdvancedSearchHit[] = [];
      for (const hit of [...tocHits, ...hits].sort(
        (a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'),
      )) {
        if (seen.has(hit.docId)) continue;
        seen.add(hit.docId);
        merged.push(hit);
        if (merged.length >= 50) break;
      }
      return merged;
    },
    [
      getTrees,
      currentFile,
      editorActionsAvailable,
      printActionsAvailable,
      chatActionsAvailable,
      editorAutocompleteEnabled,
      editorMirrorEditEnabled,
      snippetConfig,
      pickerMode,
      browsePath,
      getChatGroups,
      editorContent,
      settingsToggleEpoch,
    ],
  );

  const openExportPdf = useCallback(
    (opts: { useCurrentFile: boolean }) => {
      const value = String(editorContent ?? currentFile?.content ?? '');
      const file = opts.useCurrentFile || currentFile?.id ? currentFile : null;
      setPendingPrintReturnState({
        currentFile: file,
        editorContent: value,
      });
      navigate(exportPdfPathnameForStoragePath(file?.id), {
        state: {
          value,
          theme: theme === 'dark' ? 'dark' : 'light',
          currentFile: file,
        },
      });
    },
    [navigate, editorContent, currentFile, theme],
  );

  const handleSelect = useCallback(
    (hit: AdvancedSearchHit): boolean | void => {
      if (pickerMode === 'browse-directory') {
        if (
          hit.kind === 'command' &&
          (hit.commandId === 'browse-new-file' || hit.commandId === 'browse-new-folder')
        ) {
          const type = hit.commandId === 'browse-new-folder' ? 'folder' : 'file';
          const parentPath = hit.path || browsePath || '';
          window.setTimeout(() => {
            onRequestCreateItem?.(type, parentPath);
          }, 0);
          return;
        }
        if (hit.kind === 'folder') {
          void enterBrowseFolder(hit.path || '');
          return false;
        }
        if (hit.kind === 'file' && hit.path) {
          void onOpenFile(hit.path);
          return;
        }
        return false;
      }

      if (hit.kind === 'command') {
        const commandId = hit.commandId;

        if (commandId === 'browse-directory') {
          setPickerMode('browse-directory');
          setBrowsePath('');
          return false;
        }

        if (commandId?.startsWith('snippet-insert-')) {
          const snippetId = hit.path;
          const snippet = snippetConfig?.snippets?.find((s) => s.id === snippetId);
          if (!snippet?.body) return;
          window.setTimeout(() => {
            runEditorAction('editor-insert-snippet', snippet.body);
          }, 0);
          return;
        }

        if (commandId === 'create-file' || commandId === 'create-folder') {
          const type = commandId === 'create-folder' ? 'folder' : 'file';
          const parentPath =
            typeof defaultCreateParentPath === 'string'
              ? defaultCreateParentPath
              : parentDirOfFilePath(currentFile?.id);
          window.setTimeout(() => {
            onRequestCreateItem?.(type, parentPath);
          }, 0);
          return;
        }

        if (commandId === 'chat-select-group') {
          setPickerMode('chat-groups');
          return false;
        }

        if (commandId === FOOTNOTE_INSERT_COMMAND_ID) {
          setPickerMode('footnote-insert');
          return false;
        }

        if (commandId === FOOTNOTE_INSERT_PICK_EXISTING_ID) {
          setPickerMode('footnote-existing');
          return false;
        }

        if (commandId === FOOTNOTE_INSERT_COMPOSE_ID) {
          window.setTimeout(() => {
            runOpenFootnoteCompose();
          }, 0);
          return;
        }

        if (commandId === FOOTNOTE_INSERT_EXISTING_ITEM_ID) {
          const label = String(hit.path || '').trim();
          if (label) {
            window.setTimeout(() => {
              runInsertExistingFootnote(label);
            }, 0);
          }
          return;
        }

        if (commandId === 'chat-select-group-item') {
          if (hit.path) navigate(hit.path);
          return;
        }

        if (commandId === 'chat-clear-group') {
          navigate(hit.path || '/chat#group-clear');
          return;
        }

        if (commandId === 'editor-autocomplete-toggle') {
          toggleEditorAutocompleteEnabled();
          return;
        }

        if (commandId === 'editor-mirror-edit-toggle') {
          toggleMirrorEditEnabled();
          return;
        }

        if (isSettingsToggleId(commandId)) {
          toggleSettingsToggle(commandId);
          return;
        }

        if (isWorkspaceTabsAutoSaveCommandId(commandId)) {
          applyWorkspaceTabsAutoSaveCommand(commandId);
          return;
        }

        if (isFootnoteDisplayModeCommandId(commandId)) {
          applyFootnoteDisplayModeCommand(commandId);
          return;
        }

        if (commandId === 'print-scroll-heading' && hit.path) {
          const headingId = hit.path;
          window.setTimeout(() => {
            scrollPrintHeading(headingId);
          }, 0);
          return;
        }

        if (commandId === 'print-change-paper') {
          window.setTimeout(() => {
            requestOpenAdvancedSearch({ mode: 'print-paper' });
          }, 0);
          return;
        }

        if (commandId && PRINT_FOCUS_TARGETS[commandId]) {
          const target = PRINT_FOCUS_TARGETS[commandId];
          window.setTimeout(() => {
            focusPrintToolbar(target);
          }, 0);
          return;
        }

        if (commandId?.startsWith('print-')) {
          window.setTimeout(() => {
            runPrintAction(commandId);
          }, 0);
          return;
        }

        if (commandId?.startsWith('editor-')) {
          window.setTimeout(() => {
            runEditorAction(commandId);
          }, 0);
          return;
        }

        if (commandId?.startsWith('chat-focus-') || commandId === 'chat-focus-composer') {
          window.setTimeout(() => {
            runChatAction(commandId);
          }, 0);
          return;
        }

        if (commandId === 'export-current') {
          openExportPdf({ useCurrentFile: true });
          return;
        }
        if (commandId === 'export-pdf') {
          openExportPdf({ useCurrentFile: Boolean(currentFile?.id) });
          return;
        }
        if (hit.path) {
          navigate(hit.path);
        }
        return;
      }
      if (hit.kind === 'chat' && hit.messageId) {
        navigate(`/chat#msg-${hit.messageId}`);
        return;
      }
      if (hit.kind === 'file' && hit.path) {
        void onOpenFile(hit.path);
      }
    },
    [
      navigate,
      onOpenFile,
      onRequestCreateItem,
      openExportPdf,
      currentFile,
      defaultCreateParentPath,
      snippetConfig,
      pickerMode,
      browsePath,
      enterBrowseFolder,
    ],
  );

  return (
    <AdvancedSearchModal
      open={open}
      onOpenChange={handleOpenChange}
      onSearch={handleSearch}
      onSelectHit={handleSelect}
      indexEnabled={status.enabled}
      hasIndex={status.hasIndex}
      building={status.building}
      editorActionsAvailable={editorActionsAvailable}
      printActionsAvailable={printActionsAvailable}
      chatActionsAvailable={chatActionsAvailable}
      preferPrintActions={preferPrintActions}
      printPaperPickerMode={pickerMode === 'print-paper'}
      browseDirectoryMode={pickerMode === 'browse-directory'}
      browsePath={browsePath}
      chatGroupsPickerMode={pickerMode === 'chat-groups'}
      footnoteInsertPickerMode={pickerMode === 'footnote-insert'}
      footnoteExistingPickerMode={pickerMode === 'footnote-existing'}
      {...(getPresignedUrl ? { getPresignedUrl } : {})}
    />
  );
}
