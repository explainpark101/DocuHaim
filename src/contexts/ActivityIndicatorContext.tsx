/**
 * Activity indicator context — bottom bar progress for uploads, indexing, chat, etc.
 */
import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';

export const ActivityTypes = {
  FILE_UPLOAD: 'file-upload',
  RECORDING: 'recording',
  NOTE_PROCESSING: 'note-processing',
  PHOTO_UPLOAD: 'photo-upload',
  DOWNLOAD: 'download',
  CHAT_SEND: 'chat-send',
  CHAT_LOAD: 'chat-load',
  CHAT_SEARCH: 'chat-search',
  CHAT_SYNC: 'chat-sync',
  CHAT_NOTE: 'chat-note',
  ADVANCED_SEARCH_INDEX: 'advanced-search-index',
} as const;

export type ActivityType = (typeof ActivityTypes)[keyof typeof ActivityTypes];

const Status = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type ActivityStatus = (typeof Status)[keyof typeof Status];

export type ActivityIndicatorItem = {
  id: string;
  type: ActivityType;
  label: string;
  status: ActivityStatus;
  detail?: string;
  progress?: number;
  /** When true, chip stays visible after status becomes done. */
  pin?: boolean;
};

export type AddActivityIndicatorInput = {
  id?: string;
  type: ActivityType;
  label: string;
  status?: ActivityStatus;
  detail?: string;
  progress?: number;
  pin?: boolean;
};

export type ActivityIndicatorUpdates = Partial<
  Pick<ActivityIndicatorItem, 'label' | 'status' | 'detail' | 'progress' | 'pin' | 'type'>
>;

export type ActivityIndicatorContextValue = {
  indicators: ActivityIndicatorItem[];
  addIndicator: (payload: AddActivityIndicatorInput) => string;
  removeIndicator: (id: string) => void;
  updateIndicator: (id: string, updates: ActivityIndicatorUpdates) => void;
};

type ReducerState = ActivityIndicatorItem[];

type ReducerAction =
  | { type: 'ADD'; payload: ActivityIndicatorItem }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'UPDATE'; payload: { id: string; updates: ActivityIndicatorUpdates } };

const initialState: ReducerState = [];

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.some((i) => i.id === action.payload.id);
      if (exists) return state;
      return [
        ...state,
        {
          ...action.payload,
          status: action.payload.status ?? Status.PROCESSING,
        },
      ];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.payload.id);
    case 'UPDATE':
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, ...action.payload.updates } : i,
      );
    default:
      return state;
  }
}

const ActivityIndicatorContext = createContext<ActivityIndicatorContextValue | null>(null);

export function ActivityIndicatorProvider({ children }: { children: ReactNode }) {
  const [indicators, dispatch] = useReducer(reducer, initialState);

  const addIndicator = useCallback((payload: AddActivityIndicatorInput) => {
    const id = payload.id || `activity-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const item: ActivityIndicatorItem = {
      id,
      type: payload.type,
      label: payload.label,
      status: payload.status ?? Status.PROCESSING,
      ...(payload.detail !== undefined ? { detail: payload.detail } : {}),
      ...(payload.progress !== undefined ? { progress: payload.progress } : {}),
      ...(payload.pin !== undefined ? { pin: payload.pin } : {}),
    };
    dispatch({ type: 'ADD', payload: item });
    return id;
  }, []);

  const removeIndicator = useCallback((id: string) => {
    dispatch({ type: 'REMOVE', payload: { id } });
  }, []);

  const updateIndicator = useCallback((id: string, updates: ActivityIndicatorUpdates) => {
    dispatch({ type: 'UPDATE', payload: { id, updates } });
  }, []);

  const value: ActivityIndicatorContextValue = {
    indicators,
    addIndicator,
    removeIndicator,
    updateIndicator,
  };

  return (
    <ActivityIndicatorContext.Provider value={value}>
      {children}
    </ActivityIndicatorContext.Provider>
  );
}

export function useActivityIndicator(): ActivityIndicatorContextValue {
  const ctx = useContext(ActivityIndicatorContext);
  if (!ctx) {
    throw new Error('useActivityIndicator must be used within ActivityIndicatorProvider');
  }
  return ctx;
}
