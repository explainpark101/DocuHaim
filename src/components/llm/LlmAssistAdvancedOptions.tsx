import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Braces,
  ChevronDown,
  CircleHelp,
  List,
  Plus,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';
import { Select, Tabs, Tooltip } from 'radix-ui';
import Button from '@/components/Button';
import { IconSearch, IconX } from '@/components/icons';
import { JsonCodeMirrorEditor } from '@/components/editor/JsonCodeMirrorEditor';
import LlmAssistCollapsible from '@/components/llm/LlmAssistCollapsible';
import Modal from '@/components/modals/Modal';
import { useLlmAssistAdvancedOptionsUndoHistory } from '@/hooks/useLlmAssistAdvancedOptionsUndoHistory';
import type { LlmAssistAdvancedOptionsUndoSnapshot } from '@/utils/llm/llmAssistAdvancedOptionsUndoHistory';
import {
  buildRequestOptionGoogleSearchUrl,
  getRequestOptionHelp,
  getRequestOptionValuePlaceholder,
} from '@/utils/llm/llmAssistRequestOptionHelp';
import {
  createEmptyRequestOptionEntry,
  createDefaultRequestOptionEntries,
  entriesFromRequestOptions,
  LLM_ASSIST_SUGGESTED_REQUEST_OPTION_KEYS,
  normalizeRequestOptions,
  parseRequestOptionsJsonText,
  requestOptionsFromEntries,
  requestOptionsToJsonText,
  type LlmAssistRequestOptionEntry,
} from '@/utils/llm/llmAssistRequestOptions';

const TOOLTIP_CONTENT_CLASS =
  'z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong';

/** Above Select.Content (z-100010) when portaled from dropdown rows. */
const SELECT_ITEM_TOOLTIP_CLASS =
  'z-100011 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong';

const SELECT_ITEM_CLASS =
  'cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40';

const CUSTOM_KEY_SELECT_TIP = '제안 목록에 없는 key를 직접 입력합니다.';

const DELETE_BTN_CLASS =
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800/80 dark:text-red-400 dark:hover:bg-red-950/40';

const TAB_TRIGGER_CLASS =
  'inline-flex flex-1 items-center justify-center gap-1 rounded px-2 py-1 text-[11px] font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white';

const HELP_BTN_CLASS =
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft';

const CUSTOM_KEY = '__custom__';

type Props = {
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
};

function keySelectValue(key: string): string {
  if (!key) return CUSTOM_KEY;
  if ((LLM_ASSIST_SUGGESTED_REQUEST_OPTION_KEYS as readonly string[]).includes(key)) {
    return key;
  }
  return CUSTOM_KEY;
}

function stableOptionsJson(options: Record<string, unknown>): string {
  try {
    return JSON.stringify(normalizeRequestOptions(options));
  } catch {
    return '';
  }
}

type RequestOptionKeySelectItemProps = {
  value: string;
  label: string;
  tip: string;
  dimmed?: boolean;
};

function RequestOptionKeySelectItem({
  value,
  label,
  tip,
  dimmed = false,
}: RequestOptionKeySelectItemProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Select.Item
          value={value}
          className={`${SELECT_ITEM_CLASS}${dimmed ? ' opacity-40' : ''}`}
        >
          <Select.ItemText>{label}</Select.ItemText>
        </Select.Item>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="left"
          sideOffset={8}
          className={SELECT_ITEM_TOOLTIP_CLASS}
        >
          {tip}
          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/**
 * Collapsible advanced generation options: field rows or JSON (CodeMirror).
 */
export default function LlmAssistAdvancedOptions({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'fields' | 'json'>('fields');
  const [helpKey, setHelpKey] = useState<string | null>(null);
  const [undoSessionKey, setUndoSessionKey] = useState(0);
  const [entries, setEntries] = useState<LlmAssistRequestOptionEntry[]>(() =>
    entriesFromRequestOptions(value),
  );
  const [jsonText, setJsonText] = useState(() => requestOptionsToJsonText(value));
  const [jsonError, setJsonError] = useState('');
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  useEffect(() => {
    if (open) setUndoSessionKey((key) => key + 1);
  }, [open]);

  const applyUndoSnapshot = useCallback(
    (snapshot: LlmAssistAdvancedOptionsUndoSnapshot) => {
      setTab(snapshot.tab);
      setEntries(snapshot.entries.map((entry) => ({ ...entry })));
      setJsonText(snapshot.jsonText);
      if (snapshot.tab === 'fields') {
        const options = requestOptionsFromEntries(snapshot.entries);
        setJsonError('');
        onChange(options);
        return;
      }
      const parsed = parseRequestOptionsJsonText(snapshot.jsonText);
      if (parsed.ok) {
        setJsonError('');
        setEntries(entriesFromRequestOptions(parsed.options));
        onChange(parsed.options);
        return;
      }
      setJsonError(parsed.error);
      onChange(requestOptionsFromEntries(snapshot.entries));
    },
    [onChange],
  );

  const { undo, redo } = useLlmAssistAdvancedOptionsUndoHistory({
    enabled: open,
    historyKey: undoSessionKey,
    tab,
    entries,
    jsonText,
    applySnapshot: applyUndoSnapshot,
  });

  // Sync from parent when template load / reset replaces options content.
  useEffect(() => {
    const incoming = normalizeRequestOptions(value);
    const local = requestOptionsFromEntries(entriesRef.current);
    if (stableOptionsJson(incoming) === stableOptionsJson(local)) return;
    setEntries(entriesFromRequestOptions(incoming));
    setJsonText(requestOptionsToJsonText(incoming));
    setJsonError('');
    if (open) setUndoSessionKey((key) => key + 1);
  }, [value, open]);

  const usedKeys = useMemo(
    () => new Set(entries.map((e) => e.key.trim()).filter(Boolean)),
    [entries],
  );

  const commitEntries = (nextEntries: LlmAssistRequestOptionEntry[]) => {
    setEntries(nextEntries);
    const options = requestOptionsFromEntries(nextEntries);
    setJsonText(requestOptionsToJsonText(options));
    setJsonError('');
    onChange(options);
  };

  const commitJsonText = (text: string) => {
    setJsonText(text);
    const parsed = parseRequestOptionsJsonText(text);
    if (!parsed.ok) {
      setJsonError(parsed.error);
      return;
    }
    setJsonError('');
    setEntries(entriesFromRequestOptions(parsed.options));
    onChange(parsed.options);
  };

  const optionCount = Object.keys(value || {}).length;
  const helpContent = helpKey !== null ? getRequestOptionHelp(helpKey) : null;
  const helpModalTitle =
    helpKey !== null && helpKey.trim() ? helpKey.trim() : '옵션 키';

  // Capture-phase: swallow undo/redo so the note editor never receives them.
  useEffect(() => {
    if (!open || helpKey !== null) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;
      if (!mod || event.altKey) return;
      const key = event.key.toLowerCase();
      const isUndo = key === 'z' && !event.shiftKey;
      const isRedo = key === 'y' || (key === 'z' && event.shiftKey);
      if (!isUndo && !isRedo) return;

      // JSON tab: CodeMirror keeps its own per-field undo while focused.
      if (tab === 'json') {
        const target = event.target;
        if (target instanceof Element && target.closest('.cm-editor')) return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (isRedo) redo();
      else undo();
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [helpKey, open, redo, tab, undo]);

  return (
    <div
      className={`rounded border border-gray-200 dark:border-odp-borderSoft ${
        open ? '' : 'bg-slate-300/90 dark:bg-slate-950/40'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1 px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${
          open ? 'rounded-t bg-transparent' : 'rounded'
        }`}
        aria-expanded={open}
      >
        <span className="shrink-0 whitespace-nowrap">
          <span className="inline-flex items-center gap-1">
            <SlidersHorizontal size={13} className="shrink-0 opacity-70" aria-hidden />
            고급 설정
          </span>
          {!open && optionCount > 0 ? (
            <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">
              ({optionCount})
            </span>
          ) : null}
        </span>
        <ChevronDown
          size={14}
          aria-hidden
          className={`shrink-0 opacity-70 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <LlmAssistCollapsible open={open}>
        <div className="space-y-2 border-t border-gray-200 px-2 pb-2 pt-2 dark:border-odp-borderSoft">
          <p className="text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
            LLM 요청에 합쳐지는 생성 옵션입니다. 제안 목록 외 key도 추가할 수 있습니다.
          </p>

          <Tabs.Root
            value={tab}
            onValueChange={(next) => {
              const mode = next === 'json' ? 'json' : 'fields';
              if (mode === 'json') {
                setJsonText(requestOptionsToJsonText(requestOptionsFromEntries(entries)));
                setJsonError('');
              } else {
                const parsed = parseRequestOptionsJsonText(jsonText);
                if (parsed.ok) {
                  setEntries(entriesFromRequestOptions(parsed.options));
                  setJsonError('');
                }
              }
              setTab(mode);
            }}
          >
            <Tabs.List className="flex gap-1 rounded border border-gray-200 p-0.5 dark:border-odp-borderSoft">
              <Tabs.Trigger value="fields" className={TAB_TRIGGER_CLASS}>
                <List size={12} aria-hidden className="opacity-80" />
                필드
              </Tabs.Trigger>
              <Tabs.Trigger value="json" className={TAB_TRIGGER_CLASS}>
                <Braces size={12} aria-hidden className="opacity-80" />
                JSON
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="fields" className="mt-2 space-y-2 outline-none">
              <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
              {entries.map((entry) => {
                const selectVal = keySelectValue(entry.key);
                return (
                  <div key={entry.id} className="space-y-1 rounded border border-gray-100 p-1.5 dark:border-odp-borderSoft/60">
                    <div className="flex flex-wrap items-start gap-x-1 gap-y-1">
                      <Select.Root
                        value={selectVal}
                        onValueChange={(next) => {
                          if (
                            next !== CUSTOM_KEY
                            && usedKeys.has(next)
                            && entry.key !== next
                          ) {
                            return;
                          }
                          commitEntries(
                            entries.map((row) => {
                              if (row.id !== entry.id) return row;
                              if (next === CUSTOM_KEY) {
                                return {
                                  ...row,
                                  key: selectVal === CUSTOM_KEY ? row.key : '',
                                };
                              }
                              return { ...row, key: next };
                            }),
                          );
                        }}
                      >
                        <Select.Trigger
                          className="inline-flex h-7 min-w-[8rem] flex-1 items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                          aria-label="옵션 키"
                        >
                          <Select.Value placeholder="key 선택" />
                          <Select.Icon>
                            <ChevronDown size={12} aria-hidden />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content
                            className="z-100010 max-h-64 overflow-auto rounded border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-surface"
                            position="popper"
                            sideOffset={4}
                          >
                            <Select.Viewport className="p-1">
                              {LLM_ASSIST_SUGGESTED_REQUEST_OPTION_KEYS.map((key) => (
                                <RequestOptionKeySelectItem
                                  key={key}
                                  value={key}
                                  label={key}
                                  tip={getRequestOptionHelp(key).summary}
                                  dimmed={usedKeys.has(key) && entry.key !== key}
                                />
                              ))}
                              <Select.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderSoft" />
                              <RequestOptionKeySelectItem
                                value={CUSTOM_KEY}
                                label="직접 입력…"
                                tip={CUSTOM_KEY_SELECT_TIP}
                              />
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            type="button"
                            onClick={() => {
                              const next = entries.filter((row) => row.id !== entry.id);
                              commitEntries(
                                next.length ? next : createDefaultRequestOptionEntries(),
                              );
                            }}
                            className={DELETE_BTN_CLASS}
                            aria-label="행 삭제"
                          >
                            <Trash2 size={12} aria-hidden />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side="top"
                            sideOffset={4}
                            className={TOOLTIP_CONTENT_CLASS}
                          >
                            행 삭제
                            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            type="button"
                            onClick={() => setHelpKey(entry.key)}
                            className={HELP_BTN_CLASS}
                            aria-label={`${entry.key.trim() || '옵션'} 설명`}
                          >
                            <CircleHelp size={12} aria-hidden />
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side="top"
                            sideOffset={4}
                            className={TOOLTIP_CONTENT_CLASS}
                          >
                            {getRequestOptionHelp(entry.key).summary}
                            <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </div>
                    {selectVal === CUSTOM_KEY ? (
                      <input
                        type="text"
                        value={entry.key}
                        onChange={(e) => {
                          const key = e.target.value;
                          commitEntries(
                            entries.map((row) =>
                              row.id === entry.id ? { ...row, key } : row,
                            ),
                          );
                        }}
                        placeholder="custom key"
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                      />
                    ) : null}
                    <input
                      type="text"
                      value={entry.valueText}
                      onChange={(e) => {
                        const valueText = e.target.value;
                        commitEntries(
                          entries.map((row) =>
                            row.id === entry.id ? { ...row, valueText } : row,
                          ),
                        );
                      }}
                      placeholder={getRequestOptionValuePlaceholder(entry.key)}
                      className="w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    />
                  </div>
                );
              })}
              </Tooltip.Provider>
              <button
                type="button"
                onClick={() =>
                  commitEntries([...entries, createEmptyRequestOptionEntry()])
                }
                className="inline-flex w-full items-center justify-center gap-1 rounded border border-dashed border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
              >
                <Plus size={12} aria-hidden />
                옵션 추가
              </button>
            </Tabs.Content>

            <Tabs.Content value="json" className="mt-2 outline-none">
              <div className="h-40">
                <JsonCodeMirrorEditor
                  value={jsonText}
                  onChange={commitJsonText}
                  className="h-full"
                />
              </div>
              {jsonError ? (
                <p className="mt-1 text-[10px] text-red-600 dark:text-red-400">{jsonError}</p>
              ) : (
                <p className="mt-1 text-[10px] text-gray-500 dark:text-odp-muted">
                  유효한 JSON 객체로 저장됩니다. 제안되지 않은 key도 그대로 전송됩니다.
                </p>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </LlmAssistCollapsible>

      <Modal
        isOpen={helpKey !== null}
        onClose={() => setHelpKey(null)}
        resizable={false}
        contentClassName="max-w-md max-h-[90vh]"
      >
        <div className="p-6">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300">
              <CircleHelp size={24} aria-hidden />
            </div>
          </div>
          <h2 className="mb-2 text-center text-lg font-bold text-gray-800 dark:text-odp-fgStrong">
            {helpModalTitle}
          </h2>
          {helpContent ? (
            <p className="mb-5 text-start text-sm leading-relaxed whitespace-pre-line break-keep text-gray-600 dark:text-gray-400">
              {helpContent.detail}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={() => setHelpKey(null)}>
              <IconX size={14} aria-hidden />
              닫기
            </Button>
            <a
              href={buildRequestOptionGoogleSearchUrl(helpKey ?? '')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <IconSearch size={14} aria-hidden />
              Google에서 검색
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
