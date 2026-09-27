import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { STORAGE_MODE_IDB } from '@/utils/storageSettings';
import { isVaultEmpty } from '@/utils/vault/idbVaultStore';
import {
  hasCompletedFirstNotePrompt,
  markFirstNotePromptDone,
} from '@/utils/vault/firstNoteOnboarding';

/**
 * Brand-new / empty IDB vault: show non-resizable welcome modal → CreateItemModal.
 */
export function useFirstNoteOnboardingDomain() {
  const { isUnlocked } = useAuth();
  const { storageMode, isIdbTreeLoading } = useVault();
  const treeOps = useTreeOps();
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isUnlocked || storageMode !== STORAGE_MODE_IDB || isIdbTreeLoading) return;
      if (hasCompletedFirstNotePrompt()) {
        setChecked(true);
        return;
      }
      try {
        const empty = await isVaultEmpty();
        if (!cancelled && empty) {
          setWelcomeOpen(true);
        }
      } catch {
        /* ignore */
      } finally {
        if (!cancelled) setChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageMode, isIdbTreeLoading]);

  const dismissWelcome = useCallback(() => {
    markFirstNotePromptDone();
    setWelcomeOpen(false);
  }, []);

  const handleCreateFirstNote = useCallback(() => {
    markFirstNotePromptDone();
    setWelcomeOpen(false);
    treeOps.requestCreateItem?.(STORAGE_MODE_IDB, '', null, 'file');
  }, [treeOps]);

  return {
    firstNoteWelcomeOpen: welcomeOpen && checked,
    dismissFirstNoteWelcome: dismissWelcome,
    handleCreateFirstNote,
  };
}
