import { createContext } from 'react';

/** §7–8 auto-save / sync + editor change. */
export type AutoSaveValue = {
  handleEditorChange: (value: string) => void;
  lastInputAt: number | null;
  lastAutoSaveAt: number | null;
  lastAutoSyncAt: number | null;
  autoSaveIndicatorClass: string;
};

export const AutoSaveContext = createContext<AutoSaveValue | null>(null);
