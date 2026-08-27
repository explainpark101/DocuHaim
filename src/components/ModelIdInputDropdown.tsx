import { useCallback, useMemo, useRef, useState } from 'react';
import { Popover } from 'radix-ui';

export type ModelIdOption = { id: string; displayName: string };

type ModelIdInputDropdownProps = {
  value: string;
  onChange?: (nextId: string) => void;
  /** Fires only when the user picks an item from the suggestion list. */
  onPick?: (nextId: string) => void;
  onInputBlur?: () => void;
  options: readonly ModelIdOption[];
  loading?: boolean;
  placeholder?: string;
  className?: string;
  maxItems?: number;
};

/**
 * Input + searchable dropdown suggestions.
 * - The input value is always usable even when it doesn't match any option.
 * - Choosing a dropdown option auto-fills the input with option.id.
 */
export function ModelIdInputDropdown({
  value,
  onChange,
  onPick,
  onInputBlur,
  options,
  loading = false,
  placeholder = '',
  className = '',
  maxItems = 30,
}: ModelIdInputDropdownProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = (value || '').trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = !query
      ? [...options]
      : options.filter((o) => {
        const id = (o.id || '').toLowerCase();
        const label = (o.displayName || '').toLowerCase();
        return id.includes(query) || label.includes(query);
      });
    return list.slice(0, Math.max(1, maxItems));
  }, [options, query, maxItems]);

  const handlePick = useCallback(
    (nextId: string) => {
      onChange?.(nextId);
      onPick?.(nextId);
      setOpen(false);
    },
    [onChange, onPick],
  );

  const isAnchorTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    return Boolean(inputRef.current?.contains(target));
  }, []);

  const showEmptyState = !loading && (query ? filtered.length === 0 : options.length === 0);
  const emptyLabel = query ? '일치하는 모델이 없습니다.' : '모델 목록이 비어 있습니다.';

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <Popover.Anchor asChild>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange?.(e.target.value);
            if (!open) setOpen(true);
          }}
          onBlur={() => onInputBlur?.()}
          placeholder={placeholder}
          aria-label="모델 ID"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={`min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${className}`.trim()}
        />
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className="z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          side="bottom"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          // Keep list open while focus stays on the anchor input (search-as-you-type).
          // Without this, Radix treats the focused Anchor as "outside" Content and closes immediately.
          onFocusOutside={(e) => {
            if (
              document.activeElement === inputRef.current
              || isAnchorTarget(e.target)
            ) {
              e.preventDefault();
            }
          }}
          onPointerDownOutside={(e) => {
            if (isAnchorTarget(e.target)) e.preventDefault();
          }}
          onInteractOutside={(e) => {
            if (isAnchorTarget(e.target)) e.preventDefault();
          }}
        >
          {loading ? (
            <div className="px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted">
              목록을 불러오는 중…
            </div>
          ) : showEmptyState ? (
            <div className="cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted">
              {emptyLabel}
            </div>
          ) : (
            <ul role="listbox" aria-label="모델 목록">
              {filtered.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={opt.id === value}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handlePick(opt.id)}
                    className="flex w-full cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none hover:bg-gray-100 focus-visible:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg dark:focus-visible:bg-odp-focusBg"
                  >
                    {opt.displayName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
