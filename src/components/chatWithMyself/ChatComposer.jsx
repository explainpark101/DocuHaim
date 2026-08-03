import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MdEditor, config } from 'md-editor-rt';
import KO_KR from '@vavt/cm-extension/dist/locale/ko-KR';
import { Send, X } from 'lucide-react';
import '@/styles/md-editor-rt/style.css';
import {
  ADD_GROUP_VALUE,
  SELF_GROUP,
  sortGroupsKo,
} from '@/utils/chatWithMyself';

config({
  editorConfig: {
    languageUserDefined: {
      'ko-KR': KO_KR,
    },
  },
});

function usePrefersColorScheme() {
  const [prefersDark, setPrefersDark] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handle = (e) => setPrefersDark(e.matches);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);
  return prefersDark ? 'dark' : 'light';
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  });
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const onChange = () =>
      setCoarse(mq.matches || window.innerWidth < 768);
    mq.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);
  return coarse;
}

export default function ChatComposer({
  groups = [],
  selectedGroup,
  onSelectedGroupChange,
  onAddGroup,
  onSend,
  sending = false,
  theme,
  replyTo = null,
  onClearReply,
}) {
  const [value, setValue] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const prevGroupRef = useRef(selectedGroup || SELF_GROUP);
  const wrapRef = useRef(null);
  const valueRef = useRef(value);
  const systemTheme = usePrefersColorScheme();
  const resolvedTheme = theme || systemTheme;
  const isMobile = useIsCoarsePointer();
  const sortedGroups = useMemo(() => sortGroupsKo(groups), [groups]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const doSend = useCallback(async () => {
    const body = valueRef.current.trim();
    if (!body || sending) return;
    await onSend?.(body, selectedGroup || SELF_GROUP, replyTo || null);
    setValue('');
    onClearReply?.();
  }, [sending, onSend, selectedGroup, replyTo, onClearReply]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || isMobile) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== 'Enter' || e.shiftKey || e.isComposing) return;
      if (!el.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      doSend();
    };
    el.addEventListener('keydown', onKeyDown, true);
    return () => el.removeEventListener('keydown', onKeyDown, true);
  }, [doSend, isMobile]);

  const handleGroupChange = (e) => {
    const next = e.target.value;
    if (next === ADD_GROUP_VALUE) {
      prevGroupRef.current = selectedGroup || SELF_GROUP;
      setAddOpen(true);
      setNewGroupName('');
      return;
    }
    onSelectedGroupChange?.(next);
  };

  const confirmAddGroup = async () => {
    const name = newGroupName.trim();
    if (!name) {
      onSelectedGroupChange?.(prevGroupRef.current);
      setAddOpen(false);
      return;
    }
    try {
      await onAddGroup?.(name);
      onSelectedGroupChange?.(name);
    } catch {
      onSelectedGroupChange?.(prevGroupRef.current);
    }
    setAddOpen(false);
  };

  const cancelAddGroup = () => {
    onSelectedGroupChange?.(prevGroupRef.current);
    setAddOpen(false);
  };

  return (
    <div className="shrink-0 border-t border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft p-2 md:p-3">
      {replyTo ? (
        <div className="mb-2 flex items-start gap-2 rounded-md border-l-4 border-blue-500 bg-blue-50 px-2 py-1.5 dark:bg-blue-950/30">
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              {replyTo.group || SELF_GROUP} 에게 답장
            </div>
            <div className="truncate text-xs text-gray-600 dark:text-gray-300">
              {replyTo.snippet || replyTo.body || ''}
            </div>
          </div>
          <button
            type="button"
            onClick={onClearReply}
            className="rounded p-0.5 text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            aria-label="답장 취소"
          >
            <X size={14} />
          </button>
        </div>
      ) : null}
      <div className="mb-2 flex items-center gap-2">
        <label className="sr-only" htmlFor="chat-group-select">
          그룹
        </label>
        <select
          id="chat-group-select"
          value={addOpen ? ADD_GROUP_VALUE : selectedGroup || SELF_GROUP}
          onChange={handleGroupChange}
          className="max-w-[50%] rounded-md border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-surface px-2 py-1 text-sm text-gray-800 dark:text-odp-fgStrong"
        >
          <option value={SELF_GROUP}>{SELF_GROUP}</option>
          {sortedGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
          <option value={ADD_GROUP_VALUE}>직접추가</option>
        </select>
        {addOpen ? (
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <input
              autoFocus
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  confirmAddGroup();
                }
                if (e.key === 'Escape') cancelAddGroup();
              }}
              placeholder="그룹명"
              className="min-w-0 flex-1 rounded-md border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-surface px-2 py-1 text-sm"
            />
            <button
              type="button"
              onClick={confirmAddGroup}
              className="rounded-md bg-blue-600 px-2 py-1 text-xs text-white"
            >
              추가
            </button>
            <button
              type="button"
              onClick={cancelAddGroup}
              className="rounded-md px-2 py-1 text-xs text-gray-600 dark:text-gray-300"
            >
              취소
            </button>
          </div>
        ) : null}
      </div>

      <div className="flex items-end gap-2">
        <div
          ref={wrapRef}
          className="chat-composer-editor min-h-[72px] max-h-[200px] min-w-0 flex-1 overflow-hidden rounded-md border border-gray-200 dark:border-odp-borderSoft"
        >
          <MdEditor
            editorId="chat-with-myself-composer"
            modelValue={value}
            onChange={setValue}
            theme={resolvedTheme}
            language="ko-KR"
            preview={false}
            toolbars={[]}
            footers={[]}
            noUploadImg
            placeholder="메시지 입력…"
            style={{ height: '120px' }}
          />
        </div>
        <button
          type="button"
          onClick={doSend}
          disabled={sending || !value.trim()}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
          title="전송"
          aria-label="전송"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
        {isMobile ? '줄바꿈 후 전송 버튼을 누르세요' : 'Enter 전송 · Shift+Enter 줄바꿈'}
      </p>
    </div>
  );
}
