const PRINT_RETURN_STATE_KEY = 's3haim_print_return_state';

let inMemoryPrintReturnState = null;

function toSerializableFile(file) {
  if (!file || typeof file !== 'object') return null;
  return {
    type: file.type ?? null,
    id: file.id ?? null,
    name: file.name ?? null,
    content: typeof file.content === 'string' ? file.content : '',
    viewer: file.viewer ?? 'markdown',
    size: file.size ?? null,
    lastModified: file.lastModified ?? null,
  };
}

export function setPendingPrintReturnState({ currentFile, editorContent }) {
  inMemoryPrintReturnState = {
    currentFile: currentFile ?? null,
    editorContent: typeof editorContent === 'string' ? editorContent : '',
  };

  if (typeof window === 'undefined') return;
  try {
    const payload = {
      currentFile: toSerializableFile(currentFile),
      editorContent: typeof editorContent === 'string' ? editorContent : '',
    };
    window.sessionStorage.setItem(PRINT_RETURN_STATE_KEY, JSON.stringify(payload));
  } catch {
    // ignore sessionStorage write failures
  }
}

export function consumePendingPrintReturnState() {
  const inMemory = inMemoryPrintReturnState;
  inMemoryPrintReturnState = null;

  if (typeof window === 'undefined') return inMemory;

  if (inMemory) {
    try {
      window.sessionStorage.removeItem(PRINT_RETURN_STATE_KEY);
    } catch {
      // ignore sessionStorage delete failures
    }
    return inMemory;
  }

  try {
    const raw = window.sessionStorage.getItem(PRINT_RETURN_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    window.sessionStorage.removeItem(PRINT_RETURN_STATE_KEY);
    return parsed;
  } catch {
    return null;
  }
}
