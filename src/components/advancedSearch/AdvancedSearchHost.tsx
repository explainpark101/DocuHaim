import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdvancedSearchModal from '@/components/advancedSearch/AdvancedSearchModal';
import { useAdvancedSearchActivityStatus } from '@/components/advancedSearch/useAdvancedSearchActivityStatus.js';
import {
  advancedSearchEngine,
  subscribeOpenAdvancedSearch,
  type AdvancedSearchHit,
} from '@/utils/advancedSearch';
import { setPendingPrintReturnState } from '@/utils/printNavigationState';

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
}: AdvancedSearchHostProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(() => advancedSearchEngine.getStatus());

  useAdvancedSearchActivityStatus();

  useEffect(() => {
    return advancedSearchEngine.subscribe(() => {
      setStatus(advancedSearchEngine.getStatus());
    });
  }, []);

  useEffect(() => {
    return subscribeOpenAdvancedSearch(() => {
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== 'k') return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      return advancedSearchEngine.search(query, getTrees(), 50, {
        currentFile,
      });
    },
    [getTrees, currentFile],
  );

  const openExportPdf = useCallback(
    (opts: { useCurrentFile: boolean }) => {
      const value = opts.useCurrentFile
        ? String(editorContent ?? currentFile?.content ?? '')
        : String(editorContent ?? currentFile?.content ?? '');
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
        if (hit.commandId === 'export-current') {
          openExportPdf({ useCurrentFile: true });
          return;
        }
        if (hit.commandId === 'export-pdf') {
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
      onOpenChange={setOpen}
      onSearch={handleSearch}
      onSelectHit={handleSelect}
      indexEnabled={status.enabled}
      hasIndex={status.hasIndex}
      building={status.building}
    />
  );
}
