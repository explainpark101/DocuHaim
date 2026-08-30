import { create } from 'zustand';

export type QuizTabMode = 'quiz' | 'edit';

type QuizPaneSessionState = {
  /** Per-tab quiz vs markdown-edit mode (`tabId` = `storageType:path`). */
  tabModes: Record<string, QuizTabMode>;
  /** Tabs with a warm `QuizPane` instance (cleared when the tab closes). */
  warmTabIds: string[];
  getMode: (tabId: string) => QuizTabMode;
  setMode: (tabId: string, mode: QuizTabMode) => void;
  markWarm: (tabId: string) => void;
  isWarm: (tabId: string) => boolean;
  evictTab: (tabId: string) => void;
};

export const useQuizPaneSessionStore = create<QuizPaneSessionState>((set, get) => ({
  tabModes: {},
  warmTabIds: [],
  getMode: (tabId) => get().tabModes[tabId] ?? 'quiz',
  setMode: (tabId, mode) =>
    set((state) => ({
      tabModes: { ...state.tabModes, [tabId]: mode },
    })),
  markWarm: (tabId) =>
    set((state) =>
      state.warmTabIds.includes(tabId)
        ? state
        : { warmTabIds: [...state.warmTabIds, tabId] },
    ),
  isWarm: (tabId) => get().warmTabIds.includes(tabId),
  evictTab: (tabId) =>
    set((state) => {
      const { [tabId]: _removed, ...tabModes } = state.tabModes;
      return {
        tabModes,
        warmTabIds: state.warmTabIds.filter((id) => id !== tabId),
      };
    }),
}));

export function getQuizTabMode(tabId: string): QuizTabMode {
  return useQuizPaneSessionStore.getState().getMode(tabId);
}

export function setQuizTabMode(tabId: string, mode: QuizTabMode): void {
  useQuizPaneSessionStore.getState().setMode(tabId, mode);
}

export function markQuizPaneWarm(tabId: string): void {
  useQuizPaneSessionStore.getState().markWarm(tabId);
}

export function isQuizPaneWarm(tabId: string): boolean {
  return useQuizPaneSessionStore.getState().isWarm(tabId);
}

export function evictQuizPaneTab(tabId: string): void {
  useQuizPaneSessionStore.getState().evictTab(tabId);
}
