import { Search } from 'lucide-react';

type HaimTypographySearchFieldProps = {
  value: string;
  onChange: (next: string) => void;
  id?: string;
  className?: string;
};

/**
 * Search box embedded above Typography rule lists (global + document settings).
 */
export default function HaimTypographySearchField({
  value,
  onChange,
  id = 'haim-typography-search',
  className = '',
}: HaimTypographySearchFieldProps) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2 py-1.5 dark:border-odp-borderStrong dark:bg-odp-bg ${className}`.trim()}
    >
      <Search size={14} className="shrink-0 text-gray-400" aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="규칙 검색 (이름, 힌트…)"
        aria-label="Typography 규칙 검색"
        autoComplete="off"
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 dark:text-odp-fg"
      />
    </div>
  );
}
