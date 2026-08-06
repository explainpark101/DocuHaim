import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdvancedSearchModal from '@/components/advancedSearch/AdvancedSearchModal';
import { useAdvancedSearchActivityStatus } from '@/components/advancedSearch/useAdvancedSearchActivityStatus.js';
import {
  advancedSearchEngine,
  subscribeOpenAdvancedSearch,
  type AdvancedSearchHit,
  type AdvancedSearchOpenMode,
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
import { requestOpenAdvancedSearch } from '@/utils/advancedSearch/openRequest';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';

const PRINT_FOCUS_TARGETS: Record<string, PrintToolbarFocusTarget> = {
  'print-focus-back': 'back',
  'print-focus-font': 'font',
  'print-focus-toc': 'toc',
  'print-focus-save': 'save',
  'print-focus-export': 'export',
  'print-focus-paper': 'paper',
  'print-focus-image-max': 'image-max',
};
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
  /** Currently open editor file (for contextual commands like export). */
  currentFile?: OpenFileSnapshot;
  /** Live editor markdown (preferred over currentFile.content for export). */
  editorContent?: string;
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
  currentFile = null,
  editorContent = '',
  theme = 'light',
  preferPrintActions = false,
}: AdvancedSearchHostProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pickerMode, setPickerMode] = useState<AdvancedSearchOpenMode>('default');
  const [status, setStatus] = useState(() => advancedSearchEngine.getStatus());
  const [editorActionsAvailable, setEditorActionsAvailable] = useState(() =>
    hasEditorActions(),
  );
  const [printActionsAvailable, setPrintActionsAvailable] = useState(() =>
    hasPrintActions(),
  );

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

  const openSearch = useCallback((mode: AdvancedSearchOpenMode = 'default') => {
    setPickerMode(mode);
    setOpen(true);
  }, []);

  useEffect(() => {
    return subscribeOpenAdvancedSearch((detail) => {
      openSearch(detail?.mode === 'print-paper' ? 'print-paper' : 'default');
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
    if (!next) setPickerMode('default');
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      if (pickerMode === 'print-paper') {
        return advancedSearchEngine.search(query, [], 50, {
          printPaperPickerMode: true,
        });
      }

      const hits = await advancedSearchEngine.search(query, getTrees(), 50, {
        currentFile,
        editorActionsAvailable,
        printActionsAvailable,
      });

      if (!printActionsAvailable) return hits;

      const tocHits: AdvancedSearchHit[] = matchPrintTocEntries(query, 40).map(
        (e, index) => ({
          docId: `print-toc:${e.id}`,
          kind: 'command',
          path: e.id,
          title: e.text,
          preview: `H${e.level} · 목차로 스크롤`,
          commandId: 'print-scroll-heading',
          reasons: ['command'],
          score: 190 - index,
        }),
      );

      const seen = new Set<string>();
      const merged: AdvancedSearchHit[] = [];
      for (const hit of [...tocHits, ...hits]) {
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
      pickerMode,
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
      navigate('/export-pdf', {
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
    (hit: AdvancedSearchHit) => {
      if (hit.kind === 'command') {
        const commandId = hit.commandId;

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
    [navigate, onOpenFile, openExportPdf, currentFile],
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
      preferPrintActions={preferPrintActions}
      printPaperPickerMode={pickerMode === 'print-paper'}
    />
  );
}
