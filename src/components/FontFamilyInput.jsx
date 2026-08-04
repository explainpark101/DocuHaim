import { useState, useRef, useEffect } from 'react';
import { withFontFallback } from '@/utils/fontFallback';

/**
 * font-family 전용 입력 컴포넌트.
 * input + datalist처럼 동작하되, 제안 목록을 div로 구현.
 * 사용자가 목록에서 선택하거나 직접 폰트 이름을 입력할 수 있다.
 *
 * @param {string} value - 현재 font-family 값
 * @param {(v: string) => void} onChange
 * @param {string[]} options - 제안 폰트 목록
 * @param {string} [placeholder]
 * @param {string} [id]
 * @param {string} [className]
 */
export default function FontFamilyInput({
  value = '',
  onChange,
  options = [],
  placeholder = '폰트 입력 또는 선택',
  id,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filtered =
    inputValue.trim() === ''
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(inputValue.trim().toLowerCase())
        );

  const handleBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  const handleFocus = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setInputValue(v);
    onChange(v);
    setOpen(true);
  };

  const handleSelect = (font) => {
    setInputValue(font);
    onChange(font);
    setOpen(false);
  };

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleClickOutside = (e) => {
      if (!el.contains(e.target)) setOpen(false);
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
        className="w-full rounded border border-gray-300 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        style={{ fontFamily: withFontFallback(inputValue) }}
      />
      <div
        id={id ? `${id}-listbox` : undefined}
        role="listbox"
        className={`absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded border border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shadow-lg ${
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
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-odp-focusBg focus:bg-gray-100 dark:focus:bg-odp-focusBg focus:outline-none"
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
