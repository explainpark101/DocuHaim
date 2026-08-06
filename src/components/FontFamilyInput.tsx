import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { withFontFallback } from '@/utils/fontFallback';

type FontFamilyInputProps = {
  value?: string;
  onChange: (value: string) => void;
  options?: string[];
  placeholder?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
};

/**
 * font-family combobox: type freely or pick from suggestions.
 */
export default function FontFamilyInput({
  value = '',
  onChange,
  options = [],
  placeholder = '폰트 입력 또는 선택',
  id,
  className = '',
  inputClassName = '',
}: FontFamilyInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filtered =
    inputValue.trim() === ''
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(inputValue.trim().toLowerCase()),
        );

  const handleBlur = () => {
    window.setTimeout(() => setOpen(false), 150);
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputValue(v);
    onChange(v);
    setOpen(true);
  };

  const handleSelect = (font: string) => {
    setInputValue(font);
    onChange(font);
    setOpen(false);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-activedescendant={open && filtered[0] ? `${id}-opt-0` : undefined}
        className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg ${inputClassName}`}
        style={{ fontFamily: withFontFallback(inputValue) }}
      />
      <div
        id={id ? `${id}-listbox` : undefined}
        role="listbox"
        className={`absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-bgSoft ${
          open ? 'block' : 'hidden'
        }`}
      >
        {filtered.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500 dark:text-odp-muted">
            제안 목록 없음 (직접 입력한 값 사용)
          </div>
        ) : (
          filtered.map((font, i) => (
            <button
              key={font}
              type="button"
              role="option"
              id={id ? `${id}-opt-${i}` : undefined}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-odp-focusBg dark:focus:bg-odp-focusBg"
              style={{ fontFamily: withFontFallback(font) }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(font);
              }}
            >
              {font}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
