import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from 'react';
import { useSyncExternalStore } from 'react';
import {
  createChatTimelineStore,
  type ChatTimelineState,
  type ChatTimelineStore,
} from '@/utils/chatWithMyself/chatTimelineStore';

const ChatTimelineContext = createContext<ChatTimelineStore | null>(null);

export function ChatTimelineProvider({
  store,
  children,
}: {
  store: ChatTimelineStore;
  children: ReactNode;
}) {
  return (
    <ChatTimelineContext.Provider value={store}>
      {children}
    </ChatTimelineContext.Provider>
  );
}

export function useChatTimelineStore(): ChatTimelineStore {
  const store = useContext(ChatTimelineContext);
  if (!store) {
    throw new Error('ChatTimelineProvider is missing');
  }
  return store;
}

/**
 * Selector subscription. The selector must return a stable reference
 * (store field, boolean, null, or the same object) or React will loop.
 */
export function useChatTimeline<T>(
  selector: (state: ChatTimelineState) => T,
): T {
  const store = useChatTimelineStore();
  const selectorRef = useRef(selector);
  selectorRef.current = selector;
  const cacheRef = useRef<T | undefined>(undefined);
  const hasCacheRef = useRef(false);

  const getSnapshot = useCallback(() => {
    const next = selectorRef.current(store.getState());
    if (hasCacheRef.current && Object.is(cacheRef.current, next)) {
      return cacheRef.current as T;
    }
    hasCacheRef.current = true;
    cacheRef.current = next;
    return next;
  }, [store]);

  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

export function useChatTimelineMessage(id: string | null | undefined) {
  const idRef = useRef(id);
  idRef.current = id ?? null;
  return useChatTimeline((state) => {
    const currentId = idRef.current;
    if (!currentId) return null;
    return state.messages.find((message) => message.id === currentId) ?? null;
  });
}

export function useChatTimelineStoreHandle(): ChatTimelineStore {
  const storeRef = useRef<ChatTimelineStore | null>(null);
  if (!storeRef.current) storeRef.current = createChatTimelineStore();
  return storeRef.current;
}
