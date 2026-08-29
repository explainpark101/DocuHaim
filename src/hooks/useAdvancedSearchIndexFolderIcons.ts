import { useEffect, useState } from 'react';
import { advancedSearchEngine } from '@/utils/advancedSearch/engine';

/**
 * Subscribe to Advanced Search index settings used by sidebar folder icons
 * (filled = indexable, outline = excluded / index off).
 */
export function useAdvancedSearchIndexFolderIcons(): {
  indexEnabled: boolean;
  excludedFolders: string[];
} {
  const [indexEnabled, setIndexEnabled] = useState(
    () => advancedSearchEngine.getStatus().enabled,
  );
  const [excludedFolders, setExcludedFolders] = useState(
    () => advancedSearchEngine.getStatus().excludedFolders || [],
  );

  useEffect(() => {
    const sync = () => {
      const status = advancedSearchEngine.getStatus();
      setIndexEnabled(status.enabled);
      setExcludedFolders(status.excludedFolders || []);
    };
    sync();
    return advancedSearchEngine.subscribe(sync);
  }, []);

  return { indexEnabled, excludedFolders };
}
