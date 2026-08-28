import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';

export type FileUploadQueueItemStatus =
  | 'queued'
  | 'uploading'
  | 'done'
  | 'skipped'
  | 'error'
  | 'cancelled';

export type FileUploadQueueItem = {
  id: string;
  name: string;
  relativePath: string;
  status: FileUploadQueueItemStatus;
  error?: string;
  vaultKey?: string;
};

export type FileUploadQueueBatch = {
  id: string;
  storageType: string;
  destPath: string;
  label: string;
  isActive: boolean;
  items: FileUploadQueueItem[];
};

export type FileUploadQueueChipState = 'idle' | 'queued' | 'uploading' | 'complete';

export type FileUploadQueueSummary = {
  visible: boolean;
  isActive: boolean;
  chipState: FileUploadQueueChipState;
  label: string;
  done: number;
  total: number;
  errorCount: number;
  skippedCount: number;
  cancelledCount: number;
};

export type BeginFileUploadBatchInput = {
  storageType: string;
  destPath?: string;
  label?: string;
};

export type EnqueueFileUploadItemInput = {
  name: string;
  relativePath?: string;
};

type State = {
  batches: FileUploadQueueBatch[];
  panelOpen: boolean;
};

type Action =
  | { type: 'BEGIN_BATCH'; payload: FileUploadQueueBatch }
  | { type: 'ENQUEUE_ITEM'; payload: { batchId: string; item: FileUploadQueueItem } }
  | {
      type: 'UPDATE_ITEM';
      payload: {
        itemId: string;
        status: FileUploadQueueItemStatus;
        error?: string;
        vaultKey?: string;
      };
    }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'FINISH_BATCH'; payload: { batchId: string } }
  | { type: 'CLEAR_BATCHES' }
  | { type: 'SET_PANEL_OPEN'; payload: boolean };

function makeItemId(): string {
  return `upload-item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeBatchId(): string {
  return `upload-batch-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function mapBatches(
  batches: FileUploadQueueBatch[],
  mapBatch: (batch: FileUploadQueueBatch) => FileUploadQueueBatch,
): FileUploadQueueBatch[] {
  return batches.map(mapBatch);
}

function findItemContext(
  batches: FileUploadQueueBatch[],
  itemId: string,
): { batch: FileUploadQueueBatch; item: FileUploadQueueItem } | null {
  for (const batch of batches) {
    const item = batch.items.find((entry) => entry.id === itemId);
    if (item) return { batch, item };
  }
  return null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'BEGIN_BATCH':
      return { ...state, batches: [...state.batches, action.payload] };
    case 'ENQUEUE_ITEM':
      return {
        ...state,
        batches: mapBatches(state.batches, (batch) =>
          batch.id === action.payload.batchId
            ? { ...batch, items: [...batch.items, action.payload.item] }
            : batch,
        ),
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        batches: mapBatches(state.batches, (batch) => ({
          ...batch,
          items: batch.items.map((item) =>
            item.id === action.payload.itemId
              ? {
                  ...item,
                  status: action.payload.status,
                  ...(action.payload.error !== undefined ? { error: action.payload.error } : {}),
                  ...(action.payload.vaultKey !== undefined
                    ? { vaultKey: action.payload.vaultKey }
                    : {}),
                }
              : item,
          ),
        })),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        batches: mapBatches(state.batches, (batch) => ({
          ...batch,
          items: batch.items.filter((item) => item.id !== action.payload.itemId),
        })).filter((batch) => batch.items.length > 0 || batch.isActive),
      };
    case 'FINISH_BATCH':
      return {
        ...state,
        batches: mapBatches(state.batches, (batch) =>
          batch.id === action.payload.batchId ? { ...batch, isActive: false } : batch,
        ),
      };
    case 'CLEAR_BATCHES':
      return { batches: [], panelOpen: false };
    case 'SET_PANEL_OPEN':
      return { ...state, panelOpen: action.payload };
    default:
      return state;
  }
}

function getAllItems(batches: FileUploadQueueBatch[]): FileUploadQueueItem[] {
  return batches.flatMap((batch) => batch.items);
}

function buildSummary(
  batches: FileUploadQueueBatch[],
  panelOpen: boolean,
  chipStateOverride: FileUploadQueueChipState | null,
): FileUploadQueueSummary {
  const allItems = getAllItems(batches);
  if (allItems.length === 0) {
    return {
      visible: true,
      isActive: false,
      chipState: chipStateOverride ?? 'idle',
      label: '업로드',
      done: 0,
      total: 0,
      errorCount: 0,
      skippedCount: 0,
      cancelledCount: 0,
    };
  }

  const total = allItems.length;
  const done = allItems.filter((item) => item.status === 'done').length;
  const errorCount = allItems.filter((item) => item.status === 'error').length;
  const skippedCount = allItems.filter(
    (item) => item.status === 'skipped' || item.status === 'cancelled',
  ).length;
  const cancelledCount = allItems.filter((item) => item.status === 'cancelled').length;
  const finishedCount = allItems.filter((item) =>
    ['done', 'error', 'skipped', 'cancelled'].includes(item.status),
  ).length;
  const uploadingCount = allItems.filter((item) => item.status === 'uploading').length;
  const queuedCount = allItems.filter((item) => item.status === 'queued').length;
  const isActive =
    batches.some((batch) => batch.isActive) ||
    allItems.some((item) => item.status === 'queued' || item.status === 'uploading');

  let chipState: FileUploadQueueChipState = 'idle';
  if (chipStateOverride) {
    chipState = chipStateOverride;
  } else if (uploadingCount > 0) {
    chipState = 'uploading';
  } else if (queuedCount > 0 || isActive) {
    chipState = 'queued';
  } else if (finishedCount > 0) {
    chipState = 'complete';
  }

  let label = '업로드 중';
  if (!isActive) {
    if (errorCount > 0) {
      label = `업로드 완료 (${done}/${total}, 실패 ${errorCount})`;
    } else if (skippedCount > 0) {
      label = `업로드 완료 (${done}/${total}, 취소 ${skippedCount})`;
    } else {
      label = `업로드 완료 (${done}/${total})`;
    }
  } else if (total > 1) {
    label = `업로드 중 (${finishedCount}/${total})`;
  }

  const visible = isActive || panelOpen || finishedCount > 0 || chipStateOverride != null;

  return {
    visible,
    isActive,
    chipState,
    label,
    done,
    total,
    errorCount,
    skippedCount,
    cancelledCount,
  };
}

export type DeleteVaultFileHandler = (storageType: string, path: string) => Promise<void>;

export type FileUploadQueueContextValue = {
  batches: FileUploadQueueBatch[];
  panelOpen: boolean;
  summary: FileUploadQueueSummary;
  beginBatch: (input: BeginFileUploadBatchInput) => string;
  enqueueItem: (batchId: string, input: EnqueueFileUploadItemInput) => string;
  markUploading: (itemId: string) => void;
  markDone: (itemId: string, vaultKey?: string) => void;
  markSkipped: (itemId: string) => void;
  markError: (itemId: string, error: string) => void;
  finishBatch: (batchId: string) => void;
  setPanelOpen: (open: boolean) => void;
  clearBatch: () => void;
  cancelItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  deleteUploadedFile: (itemId: string) => Promise<void>;
  isItemCancelled: (itemId: string) => boolean;
  registerDeleteVaultFile: (handler: DeleteVaultFileHandler | null) => void;
  deleteVaultFileRef: MutableRefObject<DeleteVaultFileHandler | null>;
};

const FileUploadQueueContext = createContext<FileUploadQueueContextValue | null>(null);

export function FileUploadQueueProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { batches: [], panelOpen: false });
  const cancelledItemIdsRef = useRef(new Set<string>());
  const deleteVaultFileRef = useRef<DeleteVaultFileHandler | null>(null);
  const [chipStateOverride, setChipStateOverride] = useState<FileUploadQueueChipState | null>(null);
  const prevActiveRef = useRef(false);

  const beginBatch = useCallback((input: BeginFileUploadBatchInput) => {
    const id = makeBatchId();
    const destPath = input.destPath ?? '';
    const batch: FileUploadQueueBatch = {
      id,
      storageType: input.storageType,
      destPath,
      label: input.label ?? (destPath || '루트'),
      isActive: true,
      items: [],
    };
    dispatch({ type: 'BEGIN_BATCH', payload: batch });
    return id;
  }, []);

  const enqueueItem = useCallback((batchId: string, input: EnqueueFileUploadItemInput) => {
    const id = makeItemId();
    const relativePath = input.relativePath ?? input.name;
    dispatch({
      type: 'ENQUEUE_ITEM',
      payload: {
        batchId,
        item: {
          id,
          name: input.name,
          relativePath,
          status: 'queued',
        },
      },
    });
    return id;
  }, []);

  const markUploading = useCallback((itemId: string) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { itemId, status: 'uploading' } });
  }, []);

  const markDone = useCallback((itemId: string, vaultKey?: string) => {
    cancelledItemIdsRef.current.delete(itemId);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        itemId,
        status: 'done',
        ...(vaultKey !== undefined ? { vaultKey } : {}),
      },
    });
  }, []);

  const markSkipped = useCallback((itemId: string) => {
    cancelledItemIdsRef.current.delete(itemId);
    dispatch({ type: 'UPDATE_ITEM', payload: { itemId, status: 'skipped' } });
  }, []);

  const markError = useCallback((itemId: string, error: string) => {
    cancelledItemIdsRef.current.delete(itemId);
    dispatch({ type: 'UPDATE_ITEM', payload: { itemId, status: 'error', error } });
  }, []);

  const finishBatch = useCallback((batchId: string) => {
    dispatch({ type: 'FINISH_BATCH', payload: { batchId } });
  }, []);

  const setPanelOpen = useCallback((open: boolean) => {
    dispatch({ type: 'SET_PANEL_OPEN', payload: open });
  }, []);

  const clearBatch = useCallback(() => {
    cancelledItemIdsRef.current.clear();
    dispatch({ type: 'CLEAR_BATCHES' });
  }, []);

  const isItemCancelled = useCallback((itemId: string) => {
    return cancelledItemIdsRef.current.has(itemId);
  }, []);

  const cancelItem = useCallback((itemId: string) => {
    cancelledItemIdsRef.current.add(itemId);
    dispatch({ type: 'UPDATE_ITEM', payload: { itemId, status: 'cancelled' } });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    cancelledItemIdsRef.current.delete(itemId);
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  }, []);

  const registerDeleteVaultFile = useCallback((handler: DeleteVaultFileHandler | null) => {
    deleteVaultFileRef.current = handler;
  }, []);

  const batchesRef = useRef(state.batches);
  batchesRef.current = state.batches;

  const deleteUploadedFile = useCallback(
    async (itemId: string) => {
      const ctx = findItemContext(batchesRef.current, itemId);
      if (!ctx) return;
      const { batch, item } = ctx;
      if (item.status === 'done' && item.vaultKey && deleteVaultFileRef.current) {
        await deleteVaultFileRef.current(batch.storageType, item.vaultKey);
      }
      removeItem(itemId);
    },
    [removeItem],
  );

  const summary = useMemo(
    () => buildSummary(state.batches, state.panelOpen, chipStateOverride),
    [chipStateOverride, state.batches, state.panelOpen],
  );

  useEffect(() => {
    const wasActive = prevActiveRef.current;
    const isActive = summary.isActive;
    prevActiveRef.current = isActive;

    if (wasActive && !isActive && summary.total > 0) {
      setChipStateOverride('complete');
      const timer = window.setTimeout(() => setChipStateOverride(null), 2800);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [summary.isActive, summary.total]);

  const value: FileUploadQueueContextValue = {
    batches: state.batches,
    panelOpen: state.panelOpen,
    summary,
    beginBatch,
    enqueueItem,
    markUploading,
    markDone,
    markSkipped,
    markError,
    finishBatch,
    setPanelOpen,
    clearBatch,
    cancelItem,
    removeItem,
    deleteUploadedFile,
    isItemCancelled,
    registerDeleteVaultFile,
    deleteVaultFileRef,
  };

  return (
    <FileUploadQueueContext.Provider value={value}>{children}</FileUploadQueueContext.Provider>
  );
}

export function useFileUploadQueue(): FileUploadQueueContextValue {
  const ctx = useContext(FileUploadQueueContext);
  if (!ctx) {
    throw new Error('useFileUploadQueue must be used within FileUploadQueueProvider');
  }
  return ctx;
}
