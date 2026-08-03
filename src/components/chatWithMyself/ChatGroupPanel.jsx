import { useMemo, useState } from 'react';
import { Plus, Users, X } from 'lucide-react';
import ChatAddGroupDialog from '@/components/chatWithMyself/ui/ChatAddGroupDialog';
import { SELF_GROUP, sortGroupsKo } from '@/utils/chatWithMyself';

function groupColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}

/**
 * Right rail: group list.
 * Click toggles view-only filter for that group; click again clears filter.
 */
export default function ChatGroupPanel({
  groups = [],
  viewGroup = null,
  onToggleViewGroup,
  onAddGroup,
  onAfterAddGroup,
  onClose,
  className = '',
}) {
  const [adding, setAdding] = useState(false);
  const sorted = useMemo(() => sortGroupsKo(groups), [groups]);
  const filtering = viewGroup != null;

  const confirmAdd = async (name) => {
    await onAddGroup?.(name);
    onAfterAddGroup?.(name);
  };

  const rowClass = (name) => {
    const active = viewGroup === name;
    const dimmed = filtering && !active;
    return `flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition ${
      active
        ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
        : 'text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg'
    } ${dimmed ? 'opacity-35' : 'opacity-100'}`;
  };

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <Users size={16} className="shrink-0 text-gray-500" />
        <span className="flex-1 text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
          그룹
        </span>
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
          title="그룹 추가"
          aria-label="그룹 추가"
        >
          <Plus size={16} />
        </button>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="그룹 닫기"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <ChatAddGroupDialog
        open={adding}
        onOpenChange={setAdding}
        onConfirm={confirmAdd}
        title="그룹 추가"
      />

      {filtering ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-blue-600 dark:border-odp-borderSoft dark:text-blue-300">
          「{viewGroup}」만 보기 · 다시 클릭하면 전체
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        <button
          type="button"
          className={rowClass(SELF_GROUP)}
          aria-pressed={viewGroup === SELF_GROUP}
          onClick={() => onToggleViewGroup?.(SELF_GROUP)}
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
            className={rowClass(g)}
            aria-pressed={viewGroup === g}
            onClick={() => onToggleViewGroup?.(g)}
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
