import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion as Motion, useAnimationControls } from 'motion/react';
import { Folder } from 'lucide-react';
import { IconFilePlus, IconFolderPlus } from '@/components/icons';
import Modal from '@/components/modals/Modal';
import {
  isCreateItemPathTaken,
  listCreateItemFolderSuggestions,
  resolveCreateItemAutocompleteContext,
  resolveCreateItemPath,
} from '@/utils/createItemPath';
import { vibrateErrorFeedback } from '@/utils/hapticFeedback';

const SHAKE_X = [0, -8, 8, -6, 6, -3, 3, 0];

/**
 * @param {{
 *   isOpen: boolean;
 *   type?: 'file' | 'folder' | null;
 *   parentLabel?: string;
 *   parentPath?: string;
 *   storageType?: string;
 *   tree?: unknown[] | null;
 *   ensureFolderLoaded?: (folderPath: string) => void | Promise<void>;
 *   onClose: () => void;
 *   onSubmit: (name: string) => void | Promise<void>;
 *   isSubmitting?: boolean;
 * }} props
 */
export function CreateItemModal({
  isOpen,
  type,
  parentLabel,
  parentPath = '',
  storageType,
  tree = null,
  ensureFolderLoaded,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const listboxId = useId();
  const [name, setName] = useState('');
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeSuggest, setActiveSuggest] = useState(0);
  const [folderLoadTick, setFolderLoadTick] = useState(0);
  const wasBlockedRef = useRef(false);
  const wrapRef = useRef(null);
  const shakeControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      setName('');
      setSuggestOpen(false);
      setActiveSuggest(0);
      wasBlockedRef.current = false;
      void shakeControls.set({ x: 0 });
    }
  }, [isOpen, type, shakeControls]);

  const itemType = type === 'folder' ? 'folder' : 'file';
  const trees = useMemo(() => [tree], [tree]);

  const resolved = useMemo(
    () => (name.trim() ? resolveCreateItemPath(parentPath, name, itemType) : null),
    [name, parentPath, itemType],
  );

  const isOutsideRoot = resolved?.ok === false && resolved.reason === 'outside-root';
  const isDuplicate =
    Boolean(resolved?.ok)
    && isCreateItemPathTaken(trees, resolved, itemType);
  const isBlocked = isOutsideRoot || isDuplicate;

  const autocomplete = useMemo(
    () => resolveCreateItemAutocompleteContext(parentPath, name),
    [parentPath, name],
  );

  useEffect(() => {
    if (!isOpen) return;
    const dirs = new Set();
    if (autocomplete.ok) dirs.add(autocomplete.listDir);
    if (resolved?.ok) dirs.add(resolved.parentDirPath);

    let cancelled = false;
    void (async () => {
      for (const dir of dirs) {
        if (!dir) continue;
        try {
          await ensureFolderLoaded?.(dir);
        } catch {
          /* ignore load errors; suggestions/dup check use current tree */
        }
      }
      if (!cancelled) setFolderLoadTick((n) => n + 1);
    })();
    return () => {
      cancelled = true;
    };
  }, [
    isOpen,
    autocomplete.ok ? autocomplete.listDir : '',
    resolved?.ok ? resolved.parentDirPath : '',
    ensureFolderLoaded,
  ]);

  const suggestions = useMemo(() => {
    if (!autocomplete.ok) return [];
    return listCreateItemFolderSuggestions(
      trees,
      autocomplete.listDir,
      autocomplete.prefix,
    );
    // folderLoadTick: refresh after lazy folder load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trees, autocomplete, folderLoadTick]);

  useEffect(() => {
    setActiveSuggest(0);
  }, [name, suggestions.length]);

  const playBlockedFeedback = () => {
    vibrateErrorFeedback();
    void shakeControls.start({
      x: SHAKE_X,
      transition: { duration: 0.4 },
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isBlocked && !wasBlockedRef.current) {
      playBlockedFeedback();
    }
    wasBlockedRef.current = isBlocked;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- edge trigger only
  }, [isOpen, isBlocked]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const onPointerDown = (e) => {
      if (!el.contains(e.target)) setSuggestOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const applySuggestion = (item) => {
    if (!autocomplete.ok) return;
    const next = `${autocomplete.stem}${item.name}/`;
    setName(next);
    setSuggestOpen(true);
    setActiveSuggest(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const result = resolveCreateItemPath(parentPath, trimmed, itemType);
    if (!result.ok) {
      if (result.reason === 'outside-root') playBlockedFeedback();
      return;
    }
    if (isCreateItemPathTaken(trees, result, itemType)) {
      playBlockedFeedback();
      return;
    }
    setSuggestOpen(false);
    onSubmit(trimmed);
  };

  const handleKeyDown = (e) => {
    if (!suggestOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggest((i) => (i + 1) % suggestions.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggest((i) => (i - 1 + suggestions.length) % suggestions.length);
      return;
    }
    if (e.key === 'Escape') {
      // Modal layer handles Esc (closes suggestions via onClose first).
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const item = suggestions[activeSuggest] || suggestions[0];
      if (item) applySuggestion(item);
    }
  };

  const handleModalClose = () => {
    if (isSubmitting) return;
    if (suggestOpen) {
      setSuggestOpen(false);
      return;
    }
    onClose();
  };

  const isFolder = itemType === 'folder';
  const title = isFolder ? '새 폴더' : '새 파일';
  const Icon = isFolder ? IconFolderPlus : IconFilePlus;
  const rootLabel =
    storageType === 'local' ? '로컬: ' : storageType === 'webdav' ? 'WebDAV: ' : 'S3: ';
  const previewPath = (() => {
    if (!name.trim()) {
      const placeholder = isFolder ? '새 폴더/' : '새 파일.md';
      return `${rootLabel}${parentPath || ''}${placeholder}`;
    }
    if (resolved?.ok) return `${rootLabel}${resolved.path}`;
    if (isOutsideRoot) return `${rootLabel}(루트 밖 — 생성 불가)`;
    return `${rootLabel}${parentPath || ''}${name.trim()}`;
  })();

  const listDirLabel = autocomplete.ok
    ? (autocomplete.listDir || '(루트)')
    : '(루트 밖)';

  const inputBorderClass = isBlocked
    ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
    : 'border-gray-300 dark:border-odp-borderStrong focus:ring-blue-500 focus:border-transparent';

  const showSuggestions =
    suggestOpen && !isOutsideRoot && autocomplete.ok && suggestions.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2 flex items-center gap-2">
            <Icon size={20} />
            {title}
          </h2>
          {parentLabel && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              시작 위치: {parentLabel}
            </p>
          )}

          <div ref={wrapRef} className="relative">
            <Motion.div animate={shakeControls}>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSuggestOpen(true);
                }}
                onFocus={() => setSuggestOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isFolder
                    ? '폴더 이름 또는 상대 경로 (../ · Tab 자동완성)'
                    : '파일 이름 또는 상대 경로 (.md 생략, ../ · Tab 자동완성)'
                }
                className={`w-full px-3 py-2 text-sm border rounded-lg bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg outline-none focus:ring-2 ${inputBorderClass}`}
                autoFocus
                autoComplete="off"
                disabled={isSubmitting}
                role="combobox"
                aria-expanded={showSuggestions}
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-activedescendant={
                  showSuggestions && suggestions[activeSuggest]
                    ? `${listboxId}-opt-${activeSuggest}`
                    : undefined
                }
                aria-invalid={isBlocked}
                aria-label={isFolder ? '폴더 이름' : '파일 이름'}
              />
            </Motion.div>

            {/* Keep destination visible above suggestions so the list never covers it. */}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              생성될 위치:{' '}
              <span
                className={`font-mono break-all ${
                  isBlocked ? 'text-red-600 dark:text-red-400' : ''
                }`}
              >
                {previewPath}
              </span>
            </p>

            {showSuggestions && (
              <div
                id={listboxId}
                role="listbox"
                aria-label={`폴더 자동완성 · ${listDirLabel}`}
                className="mt-2 max-h-40 overflow-auto rounded-lg border border-gray-200 bg-white shadow-md dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              >
                <div className="sticky top-0 border-b border-gray-100 bg-gray-50 px-3 py-1.5 text-[11px] text-gray-500 dark:border-odp-border dark:bg-odp-bgSofter dark:text-odp-muted">
                  폴더 목록 · {listDirLabel}
                </div>
                {suggestions.map((item, index) => {
                  const active = index === activeSuggest;
                  return (
                    <button
                      key={`${item.name}:${item.path || ''}`}
                      type="button"
                      role="option"
                      id={`${listboxId}-opt-${index}`}
                      aria-selected={active}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                        active
                          ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-100'
                          : 'text-gray-800 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg'
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        applySuggestion(item);
                      }}
                      onMouseEnter={() => setActiveSuggest(index)}
                    >
                      <Folder
                        size={14}
                        className="shrink-0 text-gray-400 dark:text-odp-muted"
                        aria-hidden
                      />
                      <span className="font-mono truncate">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {isOutsideRoot && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">
              루트 밖으로 나갈 수 없습니다.
            </p>
          )}
          {isDuplicate && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">
              {isFolder
                ? '같은 이름의 폴더가 이미 있습니다.'
                : '같은 이름의 파일이 이미 있습니다.'}
            </p>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-odp-borderSoft flex justify-end gap-2 bg-gray-50 dark:bg-odp-bgSofter">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-odp-fgStrong bg-gray-200 dark:bg-odp-bgSoft hover:bg-gray-300 dark:hover:bg-odp-focusBg rounded-lg transition"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || isBlocked}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition"
          >
            {isSubmitting ? '생성 중...' : '생성'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
