import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, FolderInput, X } from 'lucide-react';
import Button from '@/components/Button';
import Modal from '@/components/modals/Modal';
import ChatSelect from '@/components/chatWithMyself/ui/ChatSelect';
import {
  ADD_GROUP_VALUE,
  SELF_GROUP,
  sortGroupsKo,
} from '@/utils/chatWithMyself';

export type ChatBulkGroupChangeGroup = {
  id: string;
  name: string;
  iconPath?: string;
};

export type ChatBulkGroupChangeModalProps = {
  isOpen: boolean;
  count: number;
  groups?: ChatBulkGroupChangeGroup[];
  onAddGroup?:
    | ((
        name: string,
      ) =>
        | Promise<ChatBulkGroupChangeGroup[] | void>
        | ChatBulkGroupChangeGroup[]
        | void)
    | undefined;
  onConfirm?: ((groupId: string) => Promise<void> | void) | undefined;
  onClose?: (() => void) | undefined;
  getPresignedUrl?:
    | ((path: string) => Promise<string | null | undefined>)
    | null
    | undefined;
};

/**
 * Pick a target group for bulk message group change (keeps edit history).
 */
export default function ChatBulkGroupChangeModal({
  isOpen,
  count,
  groups = [],
  onAddGroup,
  onConfirm,
  onClose,
  getPresignedUrl,
}: ChatBulkGroupChangeModalProps) {
  const [selectedGroup, setSelectedGroup] = useState(SELF_GROUP);
  const [inlineAddOpen, setInlineAddOpen] = useState(false);
  const [inlineGroupName, setInlineGroupName] = useState('');
  const [addingGroup, setAddingGroup] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const inlineGroupInputRef = useRef<HTMLInputElement | null>(null);
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

  const groupOptions = useMemo(
    () => [
      { value: SELF_GROUP, label: SELF_GROUP },
      ...sortedGroups.map((g) => {
        const option: { value: string; label: string; iconPath?: string } = {
          value: g.id,
          label: g.name,
        };
        if (g.iconPath) option.iconPath = g.iconPath;
        return option;
      }),
      { value: ADD_GROUP_VALUE, label: '직접추가' },
    ],
    [sortedGroups],
  );

  const groupSelectValue = inlineAddOpen
    ? ADD_GROUP_VALUE
    : selectedGroup || SELF_GROUP;

  useEffect(() => {
    if (!isOpen) return;
    busyRef.current = false;
    setBusy(false);
    setSelectedGroup(SELF_GROUP);
    setInlineAddOpen(false);
    setInlineGroupName('');
    setAddingGroup(false);
  }, [isOpen]);

  useEffect(() => {
    if (!inlineAddOpen) return;
    const t = window.setTimeout(() => inlineGroupInputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [inlineAddOpen]);

  const handleGroupChange = (value: string) => {
    if (value === ADD_GROUP_VALUE) {
      setInlineAddOpen(true);
      setInlineGroupName('');
      return;
    }
    setInlineAddOpen(false);
    setSelectedGroup(value || SELF_GROUP);
  };

  const commitInlineGroup = async () => {
    const name = inlineGroupName.trim();
    if (!name || !onAddGroup || addingGroup) return;
    setAddingGroup(true);
    try {
      const next = await onAddGroup(name);
      const list = Array.isArray(next) ? next : groups;
      const match =
        list.find((g) => g.name === name) ||
        list.find((g) => g.id === name);
      if (match) setSelectedGroup(match.id);
      else setSelectedGroup(name);
      setInlineAddOpen(false);
      setInlineGroupName('');
    } finally {
      setAddingGroup(false);
    }
  };

  const handleConfirm = async () => {
    if (busyRef.current || inlineAddOpen) return;
    busyRef.current = true;
    setBusy(true);
    try {
      await onConfirm?.(selectedGroup || SELF_GROUP);
      onClose?.();
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (busyRef.current) return;
        onClose?.();
      }}
      contentClassName="max-w-md max-h-[90vh]"
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            그룹 변경
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-odp-muted">
            선택한 {count}개 메시지의 그룹을 바꿉니다. 각 메시지에 수정 이력이
            남습니다.
          </p>
        </header>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          <label className="block text-xs font-medium text-gray-600 dark:text-odp-muted">
            대상 그룹
          </label>
          <ChatSelect
            id="chat-bulk-group-select"
            ariaLabel="그룹"
            value={groupSelectValue}
            onValueChange={handleGroupChange}
            options={groupOptions}
            showGroupAvatars
            {...(getPresignedUrl ? { getPresignedUrl } : {})}
            triggerClassName="w-full max-w-full"
            className="min-w-0 w-full"
          />
          {inlineAddOpen ? (
            <div className="flex items-center gap-1.5">
              <input
                ref={inlineGroupInputRef}
                type="text"
                value={inlineGroupName}
                onChange={(e) => setInlineGroupName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void commitInlineGroup();
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    setInlineAddOpen(false);
                    setInlineGroupName('');
                  }
                }}
                placeholder="그룹명"
                disabled={addingGroup}
                className="min-w-0 flex-1 rounded-md border border-gray-300 bg-transparent px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                aria-label="그룹 직접 추가"
              />
              <button
                type="button"
                title="그룹 추가"
                aria-label="그룹 추가"
                disabled={addingGroup || !inlineGroupName.trim()}
                onClick={() => void commitInlineGroup()}
                className="inline-flex shrink-0 items-center justify-center rounded p-1.5 text-blue-600 hover:bg-blue-50 disabled:opacity-40 dark:text-blue-300 dark:hover:bg-blue-900/30"
              >
                <Check size={16} />
              </button>
            </div>
          ) : null}
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderStrong">
          <Button
            type="button"
            variant="secondary"
            disabled={busy}
            onClick={() => onClose?.()}
          >
            <X size={14} />
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={busy || inlineAddOpen}
            onClick={() => void handleConfirm()}
          >
            <FolderInput size={14} />
            변경
          </Button>
        </footer>
      </div>
    </Modal>
  );
}
