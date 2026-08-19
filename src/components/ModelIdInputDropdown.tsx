import { useCallback, useMemo, useState } from 'react';
import { DropdownMenu } from 'radix-ui';

export type ModelIdOption = { id: string; displayName: string };

type ModelIdInputDropdownProps = {
  value: string;
  onChange?: (nextId: string) => void;
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
  options,
  loading = false,
  placeholder = '',
  className = '',
  maxItems = 30,
}: ModelIdInputDropdownProps) {
  const [open, setOpen] = useState(false);

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
      setOpen(false);
    },
    [onChange],
  );

  const showEmptyState = !loading && (query ? filtered.length === 0 : options.length === 0);
  const emptyLabel = query ? '일치하는 모델이 없습니다.' : '모델 목록이 비어 있습니다.';

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <input
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label="모델 ID"
          className={`min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft ${className}`.trim()}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-100050 max-h-72 min-w-48 overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          side="bottom"
          align="start"
          sideOffset={4}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {loading ? (
            <div className="px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted">
              목록을 불러오는 중…
            </div>
          ) : showEmptyState ? (
            <DropdownMenu.Item disabled className="cursor-default select-none rounded px-2 py-1.5 text-xs text-gray-500 dark:text-odp-muted">
              {emptyLabel}
            </DropdownMenu.Item>
          ) : (
            filtered.map((opt) => (
              <DropdownMenu.Item
                key={opt.id}
                onSelect={(e) => {
                  e.preventDefault();
                  handlePick(opt.id);
                }}
                className="flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-left text-xs text-gray-800 outline-none data-highlighted:bg-gray-100 dark:text-odp-fg dark:data-highlighted:bg-odp-focusBg"
              >
                {opt.displayName}
              </DropdownMenu.Item>
            ))
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

