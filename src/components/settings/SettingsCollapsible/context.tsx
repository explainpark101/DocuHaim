import { createContext, useContext, type ReactNode } from 'react';

export type SettingsCollapsibleContextValue = {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggle: () => void;
  contentKey: string;
};

const SettingsCollapsibleContext = createContext<SettingsCollapsibleContextValue | null>(null);

export function SettingsCollapsibleProvider({
  value,
  children,
}: {
  value: SettingsCollapsibleContextValue;
  children: ReactNode;
}) {
  return (
    <SettingsCollapsibleContext.Provider value={value}>
      {children}
    </SettingsCollapsibleContext.Provider>
  );
}

export function useSettingsCollapsible(): SettingsCollapsibleContextValue {
  const ctx = useContext(SettingsCollapsibleContext);
  if (!ctx) {
    throw new Error(
      'SettingsCollapsible components must be used within SettingsCollapsibleContainer.',
    );
  }
  return ctx;
}

export function useSettingsCollapsibleOptional(): SettingsCollapsibleContextValue | null {
  return useContext(SettingsCollapsibleContext);
}
