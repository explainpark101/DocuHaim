import { useEffect, useRef, type ComponentProps } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';
import { parseExcalidrawDocument } from '@/utils/excalidrawDocument';
import { serializeExcalidrawDocument } from '@/utils/excalidrawSerialize';

const CHANGE_DEBOUNCE_MS = 500;

type ExcalidrawInitialData = NonNullable<
  ComponentProps<typeof Excalidraw>['initialData']
>;
type ExcalidrawOnChange = NonNullable<
  ComponentProps<typeof Excalidraw>['onChange']
>;

export type ExcalidrawEditorProps = {
  value?: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  onChange?: (json: string) => void;
  onSave?: () => void;
};

/**
 * Vault `.excalidraw` canvas editor.
 * initialData is fixed at mount (parent remounts via key={fileId}).
 */
export default function ExcalidrawEditor({
  value = '',
  theme = 'light',
  readOnly = false,
  onChange,
  onSave,
}: ExcalidrawEditorProps) {
  const onChangeRef = useRef(onChange);
  const onSaveRef = useRef(onSave);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Capture open-time scene only — parent remounts via key={fileId} on file switch.
  const initialDataRef = useRef<ExcalidrawInitialData>(
    (() => {
      const scene = parseExcalidrawDocument(value);
      return {
        elements: scene.elements,
        appState: {
          ...scene.appState,
          theme: theme === 'dark' ? 'dark' : 'light',
        },
        files: scene.files,
        scrollToContent: true,
      } as ExcalidrawInitialData;
    })(),
  );
  const initialData = initialDataRef.current;

  const handleChange: ExcalidrawOnChange = (elements, appState, files) => {
    if (readOnly) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const json = serializeExcalidrawDocument(
        elements,
        appState,
        files ?? {},
      );
      onChangeRef.current?.(json);
    }, CHANGE_DEBOUNCE_MS);
  };

  useEffect(() => {
    if (readOnly || typeof onSave !== 'function') return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod || e.key.toLowerCase() !== 's') return;
      e.preventDefault();
      e.stopPropagation();
      onSaveRef.current?.();
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [readOnly, onSave]);

  const excalidrawTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      {/* Excalidraw needs an explicit-sized hosting box */}
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <Excalidraw
            initialData={initialData}
            theme={excalidrawTheme}
            viewModeEnabled={readOnly}
            langCode="ko"
            UIOptions={{
              canvasActions: {
                loadScene: false,
                saveToActiveFile: false,
                toggleTheme: false,
              },
            }}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
