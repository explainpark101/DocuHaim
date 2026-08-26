import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Check, Pencil, Plus, Users, X } from 'lucide-react';
import ChatGroupAvatar from '@/components/chatWithMyself/ui/ChatGroupAvatar';
import ChatGroupIconCropModal from '@/components/chatWithMyself/ChatGroupIconCropModal';
import ChatGroupIconSourceModal from '@/components/chatWithMyself/ChatGroupIconSourceModal';
import { SELF_GROUP, resolveGroupLabel, sortGroupsKo } from '@/utils/chatWithMyself';
import { isSvgImageSource } from '@/utils/chatWithMyself/cropPadImage';

const DRAFT_ENTER: any = {
  type: 'spring',
  stiffness: 420,
  damping: 30,
};

const iconBtnClass =
  'rounded p-1 text-gray-400 hover:bg-black/5 hover:text-gray-700 disabled:opacity-40 dark:hover:bg-white/10 dark:hover:text-gray-200';

/**
 * Right rail: group list.
 * Click name or avatar toggles view-only filter; click again clears filter.
 * Pencil enters edit mode (rename + icon change). Draft row adds groups.
 */
export default function ChatGroupPanel({
  groups = [],
  viewGroup = null,
  onToggleViewGroup,
  onAddGroup,
  onAfterAddGroup,
  onRenameGroup,
  onSetGroupIcon,
  getPresignedUrl,
  onClose,
  className = ''
}: any) {
  const [drafting, setDrafting] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftIconUrl, setDraftIconUrl] = useState(null);
  const [draftIconFile, setDraftIconFile] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  /** @type {[string|null, function]} null = draft icon, else group id */
  const [cropTarget, setCropTarget] = useState(null);
  const [committing, setCommitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [renaming, setRenaming] = useState(false);
  const draftInputRef = useRef(null);
  const editInputRef = useRef(null);
  const commitGuardRef = useRef(false);
  const renameGuardRef = useRef(false);
  const iconPickerOpenRef = useRef(false);
  const sourceOpenRef = useRef(false);
  const cropOpenRef = useRef(false);
  const sorted = useMemo(() => sortGroupsKo(groups), [groups]);
  const filtering = viewGroup != null;
  const viewLabel = resolveGroupLabel(groups, viewGroup);

  useEffect(() => {
    if (!drafting) return;
    const id = window.requestAnimationFrame(() => {
      // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
      draftInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [drafting]);

  useEffect(() => {
    if (!editingId) return;
    const id = window.requestAnimationFrame(() => {
      // @ts-expect-error TS(2339) FIXME: Property 'focus' does not exist on type 'never'.
      editInputRef.current?.focus();
      // @ts-expect-error TS(2339) FIXME: Property 'select' does not exist on type 'never'.
      editInputRef.current?.select();
    });
    return () => window.cancelAnimationFrame(id);
  }, [editingId]);

  useEffect(() => {
    return () => {
      if (draftIconUrl) URL.revokeObjectURL(draftIconUrl);
      if (cropSrc) URL.revokeObjectURL(cropSrc);
    };
  }, [draftIconUrl, cropSrc]);

  const resetDraft = () => {
    setDrafting(false);
    setDraftName('');
    setDraftIconFile(null);
    if (draftIconUrl) URL.revokeObjectURL(draftIconUrl);
    setDraftIconUrl(null);
    commitGuardRef.current = false;
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditName('');
    renameGuardRef.current = false;
  };

  const startDraft = () => {
    if (drafting || committing || editingId) return;
    cancelRename();
    setDraftName('');
    setDraftIconFile(null);
    if (draftIconUrl) URL.revokeObjectURL(draftIconUrl);
    setDraftIconUrl(null);
    setDrafting(true);
  };

  const startRename = (g: any) => {
    if (drafting || committing || renaming) return;
    resetDraft();
    setEditingId(g.id);
    setEditName(g.name);
  };

  const syncIconPickerOpen = () => {
    iconPickerOpenRef.current = sourceOpenRef.current || cropOpenRef.current;
  };

  const openIconSource = (targetId: any) => {
    iconPickerOpenRef.current = true;
    sourceOpenRef.current = true;
    setCropTarget(targetId);
    setSourceOpen(true);
  };

  const setSourceModalOpen = (next: any) => {
    sourceOpenRef.current = next;
    setSourceOpen(next);
    syncIconPickerOpen();
  };

  const setCropModalOpen = (next: any) => {
    cropOpenRef.current = next;
    setCropOpen(next);
    if (!next && cropSrc) {
      URL.revokeObjectURL(cropSrc);
      setCropSrc(null);
      setCropFile(null);
    }
    syncIconPickerOpen();
  };

  const onSourceImageChosen = (file: any) => {
    if (!file || !(file.type.startsWith('image/') || isSvgImageSource(file))) return;
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    const url = URL.createObjectURL(file);
    setCropFile(file);
    // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    setCropSrc(url);
    cropOpenRef.current = true;
    iconPickerOpenRef.current = true;
    setCropOpen(true);
  };

  const onCropConfirm = async (file: any) => {
    if (cropTarget == null) {
      if (draftIconUrl) URL.revokeObjectURL(draftIconUrl);
      const url = URL.createObjectURL(file);
      setDraftIconFile(file);
      // @ts-expect-error TS(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setDraftIconUrl(url);
      return;
    }
    await onSetGroupIcon?.(cropTarget, file);
  };

  const commitDraft = async () => {
    if (committing || commitGuardRef.current) return;
    const trimmed = draftName.trim();
    if (!trimmed) {
      resetDraft();
      return;
    }
    commitGuardRef.current = true;
    setCommitting(true);
    try {
      const next = await onAddGroup?.(trimmed, {
        iconFile: draftIconFile || undefined,
      });
      const created =
        Array.isArray(next)
          ? next.find((g) => g.name === trimmed) || next[next.length - 1]
          : null;
      onAfterAddGroup?.(created?.id || trimmed, created || null);
      resetDraft();
    } catch {
      commitGuardRef.current = false;
    } finally {
      setCommitting(false);
    }
  };

  const commitRename = async () => {
    if (!editingId || renaming || renameGuardRef.current) return;
    const trimmed = editName.trim();
    if (!trimmed) {
      cancelRename();
      return;
    }
    const current = sorted.find((g: any) => g.id === editingId);
    if (current && current.name === trimmed) {
      cancelRename();
      return;
    }
    renameGuardRef.current = true;
    setRenaming(true);
    try {
      await onRenameGroup?.(editingId, trimmed);
      cancelRename();
    } catch {
      renameGuardRef.current = false;
    } finally {
      setRenaming(false);
    }
  };

  const onDraftBlur = (e: any) => {
    const next = e.relatedTarget;
    if (next && e.currentTarget.parentElement?.contains(next)) return;
    if (commitGuardRef.current) return;
    window.setTimeout(() => {
      if (iconPickerOpenRef.current || commitGuardRef.current) return;
      void commitDraft();
    }, 0);
  };

  const onRenameBlur = (e: any) => {
    const next = e.relatedTarget;
    if (next && e.currentTarget.parentElement?.contains(next)) return;
    if (renameGuardRef.current) return;
    window.setTimeout(() => {
      if (iconPickerOpenRef.current || renameGuardRef.current) return;
      void commitRename();
    }, 0);
  };

  const rowShell = (active: any) => {
    const dimmed = filtering && !active;
    return `flex w-full items-center gap-1 px-2 py-1.5 text-sm transition ${
      active
        ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
        : 'text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg'
    } ${dimmed ? 'opacity-35' : 'opacity-100'}`;
  };

  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft ${className}`}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <Users size={16} className="shrink-0 text-ink dark:text-odp-fgStrong" />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
          그룹
        </span>
        <button
          type="button"
          onClick={startDraft}
          disabled={drafting || committing || Boolean(editingId)}
          className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-odp-focusBg"
          title="그룹 추가"
          aria-label="그룹 추가"
        >
          <Plus size={16} />
        </button>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="그룹 닫기"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <ChatGroupIconSourceModal
        open={sourceOpen}
        onOpenChange={setSourceModalOpen}
        onImageChosen={onSourceImageChosen}
        title={cropTarget ? '그룹 아이콘 변경' : '그룹 아이콘'}
      />
      <ChatGroupIconCropModal
        open={cropOpen}
        imageSrc={cropSrc}
        sourceFile={cropFile}
        onOpenChange={setCropModalOpen}
        onConfirm={onCropConfirm}
        title="그룹 아이콘 자르기"
      />

      {filtering ? (
        <div className="border-b border-gray-100 px-3 py-1.5 text-[11px] text-blue-600 dark:border-odp-borderSoft dark:text-blue-300">
          「{viewLabel}」만 보기 · 다시 클릭하면 전체
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        <div className={rowShell(viewGroup === SELF_GROUP)}>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-0.5 text-left"
            aria-pressed={viewGroup === SELF_GROUP}
            onClick={() => onToggleViewGroup?.(SELF_GROUP)}
          >
            <ChatGroupAvatar name={SELF_GROUP} size="md" />
            <span className="truncate font-medium">{SELF_GROUP}</span>
          </button>
        </div>

        {sorted.map((g: any) => {
          const active = viewGroup === g.id;
          const isEditing = editingId === g.id;
          return (
            <div key={g.id} className={rowShell(active)}>
              {isEditing ? (
                <div className="flex min-w-0 flex-1 items-center gap-2 px-1 py-0.5">
                  <ChatGroupAvatar
                    name={g.name}
                    colorKey={g.id}
                    size="md"
                    iconPath={g.iconPath}
                    getPresignedUrl={getPresignedUrl}
                    editable={Boolean(onSetGroupIcon)}
                    onRequestEdit={() => openIconSource(g.id)}
                  />
                  <input
                    ref={editInputRef}
                    value={editName}
                    onChange={(e: any) => setEditName(e.target.value)}
                    onBlur={onRenameBlur}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        void commitRename();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        cancelRename();
                      }
                    }}
                    disabled={renaming}
                    className="min-w-0 flex-1 rounded-md border border-gray-300 bg-transparent px-2 py-0.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                    aria-label="그룹명 수정"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 rounded px-1 py-0.5 text-left"
                  aria-pressed={active}
                  title={active ? '전체 보기' : `${g.name}만 보기`}
                  onClick={() => onToggleViewGroup?.(g.id)}
                >
                  <ChatGroupAvatar
                    name={g.name}
                    colorKey={g.id}
                    size="md"
                    iconPath={g.iconPath}
                    getPresignedUrl={getPresignedUrl}
                  />
                  <span className="min-w-0 flex-1 truncate">{g.name}</span>
                </button>
              )}
              {isEditing ? (
                <button
                  type="button"
                  title="저장"
                  aria-label="저장"
                  disabled={renaming}
                  className={`${iconBtnClass} text-blue-600 dark:text-blue-300`}
                  onMouseDown={(e: any) => e.preventDefault()}
                  onClick={() => void commitRename()}
                >
                  <Check size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  title="그룹 수정"
                  aria-label="그룹 수정"
                  disabled={drafting || committing || Boolean(editingId)}
                  className={iconBtnClass}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    startRename(g);
                  }}
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
          );
        })}

        <AnimatePresence initial={false}>
          {drafting ? (
            <Motion.div
              key="group-draft"
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 6, height: 0 }}
              transition={DRAFT_ENTER}
              className="overflow-hidden"
            >
              <div className="flex w-full items-center gap-2 px-3 py-2">
                <ChatGroupAvatar
                  name={draftName.trim() || '새'}
                  size="md"
                  iconUrl={draftIconUrl}
                  editable
                  onRequestEdit={() => openIconSource(null)}
                  title="아이콘 선택"
                />
                <input
                  ref={draftInputRef}
                  value={draftName}
                  onChange={(e: any) => setDraftName(e.target.value)}
                  onBlur={onDraftBlur}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      void commitDraft();
                    } else if (e.key === 'Escape') {
                      e.preventDefault();
                      resetDraft();
                    }
                  }}
                  placeholder="그룹명"
                  disabled={committing}
                  className="min-w-0 flex-1 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-odp-borderStrong dark:text-odp-fgStrong"
                />
                <button
                  type="button"
                  title="추가"
                  aria-label="추가"
                  disabled={committing}
                  className="rounded p-1 text-blue-600 hover:bg-blue-50 disabled:opacity-40 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  onMouseDown={(e: any) => {
                    e.preventDefault();
                  }}
                  onClick={() => void commitDraft()}
                >
                  <Check size={16} />
                </button>
              </div>
            </Motion.div>
          ) : null}
        </AnimatePresence>

        {sorted.length === 0 && !drafting ? (
          <p className="px-3 py-4 text-xs text-gray-400">
            아직 그룹이 없습니다. + 또는 입력창에서 「직접추가」로 만들 수 있습니다.
          </p>
        ) : null}
      </div>
    </div>
  );
}
