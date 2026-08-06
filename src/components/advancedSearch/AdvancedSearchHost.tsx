import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AdvancedSearchModal from '@/components/advancedSearch/AdvancedSearchModal';
import { useAdvancedSearchActivityStatus } from '@/components/advancedSearch/useAdvancedSearchActivityStatus.js';
import {
  advancedSearchEngine,
  subscribeOpenAdvancedSearch,
  type AdvancedSearchHit,
} from '@/utils/advancedSearch';

type TreeNode = {
  type?: string;
  path?: string;
  name?: string;
  children?: TreeNode[];
};

export type AdvancedSearchHostProps = {
  /** Trees used for filename/path matching and rebuild source listing. */
  getTrees: () => Array<TreeNode[] | null | undefined>;
  /** Open a vault file by path (storage-aware). */
  onOpenFile: (path: string) => void | Promise<void>;
};

/**
 * Global Cmd/Ctrl+K Advanced Search host (Spotlight-style).
 */
export default function AdvancedSearchHost({
  getTrees,
  onOpenFile,
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
      return advancedSearchEngine.search(query, getTrees(), 50);
    },
    [getTrees],
  );

  const handleSelect = useCallback(
    (hit: AdvancedSearchHit) => {
      if (hit.kind === 'command' && hit.path) {
        navigate(hit.path);
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
    [navigate, onOpenFile],
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
