import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Select, Tabs } from 'radix-ui';
import { JsonCodeMirrorEditor } from '@/components/editor/JsonCodeMirrorEditor';
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

/**
 * Collapsible advanced generation options: field rows or JSON (CodeMirror).
 */
export default function LlmAssistAdvancedOptions({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'fields' | 'json'>('fields');
  const [entries, setEntries] = useState<LlmAssistRequestOptionEntry[]>(() =>
    entriesFromRequestOptions(value),
  );
  const [jsonText, setJsonText] = useState(() => requestOptionsToJsonText(value));
  const [jsonError, setJsonError] = useState('');
  const entriesRef = useRef(entries);
  entriesRef.current = entries;

  // Sync from parent when template load / reset replaces options content.
  useEffect(() => {
    const incoming = normalizeRequestOptions(value);
    const local = requestOptionsFromEntries(entriesRef.current);
    if (stableOptionsJson(incoming) === stableOptionsJson(local)) return;
    setEntries(entriesFromRequestOptions(incoming));
    setJsonText(requestOptionsToJsonText(incoming));
    setJsonError('');
  }, [value]);

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

  return (
    <div className="rounded border border-gray-200 dark:border-odp-borderSoft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong"
        aria-expanded={open}
      >
        <span>
          고급 설정
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

      {open ? (
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
              <Tabs.Trigger
                value="fields"
                className="flex-1 rounded px-2 py-1 text-[11px] font-medium text-gray-500 outline-none transition data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:text-odp-muted"
              >
                필드
              </Tabs.Trigger>
              <Tabs.Trigger
                value="json"
                className="flex-1 rounded px-2 py-1 text-[11px] font-medium text-gray-500 outline-none transition data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:text-odp-muted"
              >
                JSON
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="fields" className="mt-2 space-y-2 outline-none">
              {entries.map((entry) => {
                const selectVal = keySelectValue(entry.key);
                return (
                  <div key={entry.id} className="space-y-1 rounded border border-gray-100 p-1.5 dark:border-odp-borderSoft/60">
                    <div className="flex items-start gap-1">
                      <Select.Root
                        value={selectVal}
                        onValueChange={(next) => {
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
                          className="inline-flex h-7 min-w-0 flex-1 items-center justify-between gap-1 rounded border border-gray-300 bg-white px-2 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
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
                                <Select.Item
                                  key={key}
                                  value={key}
                                  disabled={usedKeys.has(key) && entry.key !== key}
                                  className="cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40 data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40"
                                >
                                  <Select.ItemText>{key}</Select.ItemText>
                                </Select.Item>
                              ))}
                              <Select.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderSoft" />
                              <Select.Item
                                value={CUSTOM_KEY}
                                className="cursor-pointer rounded px-2 py-1 text-[11px] outline-none data-highlighted:bg-violet-50 dark:data-highlighted:bg-violet-950/40"
                              >
                                <Select.ItemText>직접 입력…</Select.ItemText>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      <button
                        type="button"
                        onClick={() => {
                          const next = entries.filter((row) => row.id !== entry.id);
                          commitEntries(
                            next.length ? next : createDefaultRequestOptionEntries(),
                          );
                        }}
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-500 hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
                        title="행 삭제"
                        aria-label="행 삭제"
                      >
                        <Trash2 size={12} aria-hidden />
                      </button>
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
                      placeholder='value (예: 0.4, true, "text", [1,2])'
                      className="w-full rounded border border-gray-300 bg-white px-2 py-1 font-mono text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                    />
                  </div>
                );
              })}
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
      ) : null}
    </div>
  );
}
