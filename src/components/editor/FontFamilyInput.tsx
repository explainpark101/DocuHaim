import { useState, useRef, useEffect, useMemo, type ChangeEvent } from 'react';
import { Plus } from 'lucide-react';
import { Form } from 'radix-ui';
import { WebfontCssEditorModal } from '@/components/settings/WebfontCssEditorModal';
import { formInputClassName } from '@/components/shared/ui/RadixSelectField';
import { buildFontFamilyOptions } from '@/utils/fontOptions';
import { WEBFONTS_CHANGED_EVENT } from '@/utils/webfontSettingsStore';
import { withFontFallback } from '@/utils/fontFallback';

type FontFamilyInputProps = {
  value?: string;
  onChange: (value: string) => void;
  /** When omitted, uses buildFontFamilyOptions() (app → user → system). */
  options?: string[];
  placeholder?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  /** Show “웹폰트 추가” action (default true). */
  allowAddWebfont?: boolean;
};

/**
 * font-family combobox: type freely, pick base/user webfonts, or add a new webfont CSS file.
 */
export default function FontFamilyInput({
  value = '',
  onChange,
  options,
  placeholder = '폰트 입력 또는 선택',
  id,
  className = '',
  inputClassName = '',
  allowAddWebfont = true,
}: FontFamilyInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [optionsTick, setOptionsTick] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const fieldName = id || 'font-family';

  const commaSplit = useMemo(() => {
    const lastComma = inputValue.lastIndexOf(',');
    if (lastComma < 0) {
      return {
        prefix: '',
        query: inputValue.trim(),
      };
    }
    return {
      prefix: `${inputValue.slice(0, lastComma + 1)} `,
      query: inputValue.slice(lastComma + 1).trim(),
    };
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const onWebfontsChanged = () => setOptionsTick((t) => t + 1);
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onWebfontsChanged);
    return () => window.removeEventListener(WEBFONTS_CHANGED_EVENT, onWebfontsChanged);
  }, []);

  const liveOptions = useMemo(
    () => buildFontFamilyOptions(options ?? []),
    // optionsTick refreshes after WEBFONTS_CHANGED / webfont add so cache names appear
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options, optionsTick],
  );
  const filtered =
    commaSplit.query === ''
      ? liveOptions
      : liveOptions.filter((opt) =>
          opt.toLowerCase().includes(commaSplit.query.toLowerCase()),
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
    const next = `${commaSplit.prefix}${font}`;
    setInputValue(next);
    onChange(next);
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
      <Form.Root onSubmit={(e) => e.preventDefault()}>
        <Form.Field name={fieldName}>
          <Form.Control asChild>
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
              className={`${formInputClassName} ${inputClassName}`.trim()}
              style={{ fontFamily: withFontFallback(inputValue) }}
            />
          </Form.Control>
        </Form.Field>
      </Form.Root>
      <div
        id={id ? `${id}-listbox` : undefined}
        role="listbox"
        className={`absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-odp-borderSoft dark:bg-odp-bgSoft ${
          open ? 'block' : 'hidden'
        }`}
      >
        {filtered.length === 0 && !allowAddWebfont ? (
          <div className="px-3 py-2 text-sm text-gray-500 dark:text-odp-muted">
            제안 목록 없음 (직접 입력한 값 사용)
          </div>
        ) : (
          <>
            {filtered.map((font, i) => (
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
            ))}
            {allowAddWebfont ? (
              <button
                type="button"
                role="option"
                id={id ? `${id}-opt-add` : undefined}
                className="flex w-full items-center gap-1.5 border-t border-gray-100 px-3 py-2 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none dark:border-odp-border dark:text-blue-400 dark:hover:bg-blue-950/40 dark:focus:bg-blue-950/40"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setAddOpen(true);
                }}
              >
                <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden />
                웹폰트 추가
              </button>
            ) : null}
          </>
        )}
      </div>

      <WebfontCssEditorModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSaved={(families) => {
          const first = families[0];
          if (first) {
            setInputValue(first);
            onChange(first);
          }
          setOptionsTick((t) => t + 1);
        }}
      />
    </div>
  );
}
