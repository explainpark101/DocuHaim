import { SELF_GROUP } from '@/utils/chatWithMyself/paths.js';
import { groupMatches } from '@/utils/chatWithMyself/storage';

/**
 * External timeline store (zustand vanilla shape: getState / setState / subscribe).
 * Message identity stays stable when a group filter hides newly loaded days, so
 * list subscribers do not re-render while older history is scanned.
 */

export type ChatTimelineMessage = {
  id: string;
  group?: string;
  pendingSync?: string;
  [key: string]: unknown;
};

export type OlderHistoryScan = {
  dateStr: string;
  label: string;
  groupLabel: string;
  /** Index into day keys, newest = 0. */
  index: number;
  total: number;
};

export type ChatTimelineState = {
  messages: ChatTimelineMessage[];
  groups: unknown;
  viewGroupFilter: string | null;
  visibleMessages: ChatTimelineMessage[];
  dayKeys: string[];
  loadedDayIndex: number;
  olderScan: OlderHistoryScan | null;
};

export type ChatTimelineStore = {
  getState: () => ChatTimelineState;
  subscribe: (listener: () => void) => () => void;
  setMessages: (
    value:
      | ChatTimelineMessage[]
      | ((prev: ChatTimelineMessage[]) => ChatTimelineMessage[]),
  ) => void;
  setDayKeys: (dayKeys: string[]) => void;
  setLoadedDayIndex: (index: number) => void;
  setViewContext: (groups: unknown, viewGroupFilter: string | null) => void;
  setOlderScan: (scan: OlderHistoryScan | null) => void;
};

function sameMessageRefs(
  previous: ChatTimelineMessage[],
  next: ChatTimelineMessage[],
): boolean {
  if (previous.length !== next.length) return false;
  for (let i = 0; i < previous.length; i += 1) {
    if (previous[i] !== next[i]) return false;
  }
  return true;
}

export function deriveVisibleMessages(
  messages: ChatTimelineMessage[],
  groups: unknown,
  viewGroupFilter: string | null,
  previous: ChatTimelineMessage[] | null,
): ChatTimelineMessage[] {
  if (!viewGroupFilter) return messages;
  const next: ChatTimelineMessage[] = [];
  for (const message of messages) {
    const group = typeof message.group === 'string' ? message.group : SELF_GROUP;
    if (groupMatches(groups, group || SELF_GROUP, viewGroupFilter)) {
      next.push(message);
    }
  }
  if (previous && sameMessageRefs(previous, next)) return previous;
  return next;
}

function createInitialState(): ChatTimelineState {
  return {
    messages: [],
    groups: [],
    viewGroupFilter: null,
    visibleMessages: [],
    dayKeys: [],
    loadedDayIndex: 0,
    olderScan: null,
  };
}

export function createChatTimelineStore(): ChatTimelineStore {
  let state = createInitialState();
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  const commit = (next: ChatTimelineState) => {
    if (next === state) return;
    state = next;
    emit();
  };

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setMessages: (value) => {
      const prev = state.messages;
      const next = typeof value === 'function' ? value(prev) : value;
      if (next === prev) return;
      const visibleMessages = deriveVisibleMessages(
        next,
        state.groups,
        state.viewGroupFilter,
        state.viewGroupFilter ? state.visibleMessages : null,
      );
      commit({ ...state, messages: next, visibleMessages });
    },
    setDayKeys: (dayKeys) => {
      if (dayKeys === state.dayKeys) return;
      commit({ ...state, dayKeys });
    },
    setLoadedDayIndex: (loadedDayIndex) => {
      if (loadedDayIndex === state.loadedDayIndex) return;
      commit({ ...state, loadedDayIndex });
    },
    setViewContext: (groups, viewGroupFilter) => {
      const visibleMessages = deriveVisibleMessages(
        state.messages,
        groups,
        viewGroupFilter,
        viewGroupFilter ? state.visibleMessages : null,
      );
      if (
        groups === state.groups &&
        viewGroupFilter === state.viewGroupFilter &&
        visibleMessages === state.visibleMessages
      ) {
        return;
      }
      commit({
        ...state,
        groups,
        viewGroupFilter,
        visibleMessages,
      });
    },
    setOlderScan: (olderScan) => {
      const prev = state.olderScan;
      if (olderScan == null && prev == null) return;
      if (
        olderScan &&
        prev &&
        olderScan.dateStr === prev.dateStr &&
        olderScan.index === prev.index &&
        olderScan.label === prev.label &&
        olderScan.groupLabel === prev.groupLabel &&
        olderScan.total === prev.total
      ) {
        return;
      }
      commit({ ...state, olderScan });
    },
  };
}
