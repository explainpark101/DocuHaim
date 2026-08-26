import { useMemo, useState } from 'react';
import { FileText, Search } from 'lucide-react';
import Modal from '@/components/shared/modals/Modal';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';

export type ChatFolderPickFile = {
  path: string;
  name: string;
};

export type ChatFolderPickModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folderPath: string;
  folderName?: string | null;
  files?: ChatFolderPickFile[];
  onSelectFile?: ((path: string) => void) | undefined;
};

/**
 * Pick a descendant file from a shared folder card.
 */
export default function ChatFolderPickModal({
  isOpen,
  onClose,
  folderPath,
  folderName = null,
  files = [],
  onSelectFile,
}: ChatFolderPickModalProps) {
  const [query, setQuery] = useState('');
  useHistoryOverlayBack(isOpen, onClose, true, 'chat-folder-pick');

  const title =
    String(folderName || '').trim() ||
    String(folderPath || '')
      .replace(/\/+$/, '')
      .split('/')
      .filter(Boolean)
      .pop() ||
    'folder';

  const folderPrefix = String(folderPath || '').replace(/\\/g, '/');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = Array.isArray(files) ? files : [];
    if (!q) return list;
    return list.filter((f) => {
      const name = String(f.name || '').toLowerCase();
      const path = String(f.path || '').toLowerCase();
      return name.includes(q) || path.includes(q);
    });
  }, [files, query]);

  const relativePath = (filePath: string) => {
    const p = String(filePath || '');
    if (folderPrefix && p.startsWith(folderPrefix)) {
      return p.slice(folderPrefix.length) || p;
    }
    return p;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ignoreEnterInFields
      contentClassName="max-w-lg max-h-[min(90vh,560px)] w-[min(92vw,32rem)]"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        <div className="min-w-0 shrink-0">
          <h2 className="truncate text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            {title}
          </h2>
          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400" title={folderPath}>
            {folderPath.replace(/\/+$/, '') || folderPath}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            열 파일을 선택하세요
          </p>
        </div>

        <label className="relative shrink-0">
          <Search
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="파일 검색"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm text-gray-800 outline-none focus:border-blue-400 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg"
          />
        </label>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-gray-200 dark:border-odp-borderSoft">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-gray-400 dark:text-gray-500">
              {files.length === 0
                ? '이 폴더에서 불러온 파일이 없습니다. 사이드바에서 폴더를 펼친 뒤 다시 시도하세요.'
                : '검색 결과가 없습니다.'}
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-odp-borderSoft">
              {filtered.map((file) => (
                <li key={file.path}>
                  <button
                    type="button"
                    onClick={() => onSelectFile?.(file.path)}
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-odp-focusBg"
                  >
                    <FileText
                      size={16}
                      className="shrink-0 text-blue-600 dark:text-blue-400"
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-800 dark:text-odp-fgStrong">
                        {file.name}
                      </span>
                      <span className="block truncate text-[11px] text-gray-500 dark:text-gray-400">
                        {relativePath(file.path)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}
