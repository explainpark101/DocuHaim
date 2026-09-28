import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { HaimSlashCommandItem } from '@/components/haimEditor/slashCommands/haimSlashCommandItems';

export type HaimSlashCommandListProps = {
  items: HaimSlashCommandItem[];
  command: (item: HaimSlashCommandItem) => void;
};

export type HaimSlashCommandListHandle = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

/**
 * Floating slash-command list (keyboard + click).
 * Mounted via TipTap ReactRenderer + Suggestion mount().
 */
const HaimSlashCommandList = forwardRef<
  HaimSlashCommandListHandle,
  HaimSlashCommandListProps
>(function HaimSlashCommandList({ items, command }, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useLayoutEffect(() => {
    const el = itemRefs.current[selectedIndex];
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (items.length === 0) return false;
      // Let the editor handle Shift/Alt/Mod+Arrow (text selection, etc.).
      if (event.shiftKey || event.altKey || event.metaKey || event.ctrlKey) {
        return false;
      }
      if (event.key === 'ArrowUp') {
        setSelectedIndex((i) => (i + items.length - 1) % items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((i) => (i + 1) % items.length);
        return true;
      }
      if (event.key === 'Enter') {
        const item = items[selectedIndex];
        if (item) command(item);
        return true;
      }
      return false;
    },
  }));

  if (items.length === 0) {
    return (
      <div
        className="w-[min(92vw,300px)] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-muted"
        role="listbox"
        aria-label="슬래시 명령"
      >
        결과 없음
      </div>
    );
  }

  let lastGroup = '';

  return (
    <div
      ref={listRef}
      className="flex max-h-[min(60vh,360px)] w-[min(92vw,300px)] flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-surface"
      role="listbox"
      aria-label="슬래시 명령"
    >
      {items.map((item, index) => {
        const showGroup = item.groupLabel !== lastGroup;
        lastGroup = item.groupLabel;
        const Icon = item.Icon;
        const selected = index === selectedIndex;
        return (
          <div key={item.id}>
            {showGroup ? (
              <div className="px-2.5 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-odp-muted">
                {item.groupLabel}
              </div>
            ) : null}
            <button
              type="button"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="option"
              aria-selected={selected}
              className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm ${
                selected
                  ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-100'
                  : 'text-gray-800 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-bgSoft'
              }`}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => {
                command(item);
              }}
            >
              <Icon
                size={14}
                className="shrink-0 text-gray-500 dark:text-odp-muted"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate font-medium">
                {item.title}
              </span>
              <span className="shrink-0 truncate text-xs text-gray-400 dark:text-odp-muted">
                {item.titleEn}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
});

export default HaimSlashCommandList;
