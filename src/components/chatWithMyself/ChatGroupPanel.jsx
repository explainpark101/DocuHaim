import { useMemo, useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { SELF_GROUP, sortGroupsKo } from '@/utils/chatWithMyself';

function groupColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}

/**
 * Right rail: group list (when not in search mode).
 * Wide viewport sidebar; on mobile can be omitted by parent.
 */
export default function ChatGroupPanel({
  groups = [],
  selectedGroup,
  onSelectGroup,
  onAddGroup,
  className = '',
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const sorted = useMemo(() => sortGroupsKo(groups), [groups]);

  const cancelAdd = () => {
    setName('');
    setAdding(false);
  };

  const confirmAdd = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      cancelAdd();
      return;
    }
    try {
      await onAddGroup?.(trimmed);
      onSelectGroup?.(trimmed);
    } catch {
      /* ignore */
    }
    setName('');
    setAdding(false);
  };

  const rowClass = (active) =>
    `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
      active
        ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
        : 'text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg'
    }`;

  return (
    <div
      className={`flex h-full min-h-0 w-80 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <Users size={16} className="shrink-0 text-gray-500" />
        <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
          그룹
        </span>
        <button
          type="button"
          onClick={() => {
            setAdding(true);
            setName('');
          }}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          title="그룹 추가"
          aria-label="그룹 추가"
        >
          <Plus size={16} />
        </button>
      </div>

      {adding ? (
        <div className="flex gap-1 border-b border-gray-100 px-2 py-2 dark:border-odp-borderSoft">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                confirmAdd();
              }
              if (e.key === 'Escape') {
                e.preventDefault();
                cancelAdd();
              }
            }}
            placeholder="그룹명"
            className="min-w-0 flex-1 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm dark:border-odp-borderStrong"
          />
          <button
            type="button"
            onClick={confirmAdd}
            className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white"
          >
            추가
          </button>
          <button
            type="button"
            onClick={cancelAdd}
            className="rounded-md px-2 py-1 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          >
            취소
          </button>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        <button
          type="button"
          className={rowClass(selectedGroup === SELF_GROUP)}
          onClick={() => onSelectGroup?.(SELF_GROUP)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
            나
          </span>
          <span className="truncate font-medium">{SELF_GROUP}</span>
        </button>
        {sorted.map((g) => (
          <button
            key={g}
            type="button"
            className={rowClass(selectedGroup === g)}
            onClick={() => onSelectGroup?.(g)}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: groupColor(g) }}
            >
              {g.slice(0, 1)}
            </span>
            <span className="truncate">{g}</span>
          </button>
        ))}
        {sorted.length === 0 ? (
          <p className="px-3 py-4 text-xs text-gray-400">
            아직 그룹이 없습니다. + 또는 입력창에서 「직접추가」로 만들 수 있습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
