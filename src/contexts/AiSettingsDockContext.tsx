import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type AiSettingsDockContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openDock: () => void;
  closeDock: () => void;
  toggleDock: () => void;
};

const AiSettingsDockContext = createContext<AiSettingsDockContextValue | null>(null);

export function AiSettingsDockProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openDock = useCallback(() => setOpen(true), []);
  const closeDock = useCallback(() => setOpen(false), []);
  const toggleDock = useCallback(() => setOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      openDock,
      closeDock,
      toggleDock,
    }),
    [open, openDock, closeDock, toggleDock],
  );

  return (
    <AiSettingsDockContext.Provider value={value}>{children}</AiSettingsDockContext.Provider>
  );
}

export function useAiSettingsDock(): AiSettingsDockContextValue {
  const ctx = useContext(AiSettingsDockContext);
  if (!ctx) {
    throw new Error('useAiSettingsDock must be used within AiSettingsDockProvider');
  }
  return ctx;
}

export function useAiSettingsDockOptional(): AiSettingsDockContextValue | null {
  return useContext(AiSettingsDockContext);
}
