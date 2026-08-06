import { useState, type ReactNode } from 'react';
import {
  ALargeSmall,
  Bold,
  Eraser,
  Frame,
  PaintBucket,
  Palette,
  SquareDashed,
  Type,
} from 'lucide-react';
import { Form, Popover, Tooltip } from 'radix-ui';
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful';
import FontFamilyInput from '@/components/FontFamilyInput';
import {
  formInputCompactClassName,
  RadixSelectField,
} from '@/components/ui/RadixSelectField';
import { COVER_FONT_WEIGHT_OPTIONS } from '@/utils/fontOptions';
import type { HaimTableStyle } from '@/utils/haimTable/types';
import {
  cssHexToInputValue,
  CSS_HEX_CHECKER_STYLE,
  normalizeCssHexColor,
} from '@/utils/cssColor';

type Props = {
  value: HaimTableStyle;
  onChange: (next: HaimTableStyle) => void;
  fontOptions?: string[] | undefined;
  idPrefix?: string;
  compact?: boolean;
};

const FONT_WEIGHT_NONE = '__none__';

const FONT_WEIGHT_OPTIONS = [
  { value: FONT_WEIGHT_NONE, label: '기본' },
  ...COVER_FONT_WEIGHT_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
  { value: 'normal', label: 'normal' },
  { value: 'bold', label: 'bold' },
];

const colorTooltipContentClass =
  'z-100050 rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-[11px] text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong';

function FieldLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex shrink-0 text-gray-400 dark:text-odp-muted" aria-hidden>
        {icon}
      </span>
      {children}
    </span>
  );
}

function ColorField({
  id,
  label,
  icon,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: ReactNode;
  value?: string | undefined;
  onChange: (v: string | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const normalized = normalizeCssHexColor(value);
  const hex = cssHexToInputValue(normalized);
  const hasValue = Boolean(value);
  const displayCode = normalized ?? (value?.trim() || null);

  const setHex = (next: string) => {
    const color = normalizeCssHexColor(next.startsWith('#') ? next : `#${next}`);
    if (color) onChange(color);
  };

  return (
    <Form.Field name={id} className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted">
      <Form.Label asChild>
        <span>
          <FieldLabel icon={icon}>{label}</FieldLabel>
        </span>
      </Form.Label>
      <span className="flex items-center gap-1">
        <Popover.Root open={open} onOpenChange={setOpen} modal>
          <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root {...(open || !displayCode ? { open: false } : {})}>
              <Tooltip.Trigger asChild>
                <Popover.Trigger asChild>
                  <button
                    id={id}
                    type="button"
                    aria-label={`${label} 색 선택${displayCode ? `: ${displayCode}` : ''}`}
                    aria-expanded={open}
                    className="h-7 w-8 shrink-0 cursor-pointer rounded-md border border-gray-300 bg-white p-0.5 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  >
                    <span className="relative block h-full w-full overflow-hidden rounded-sm border border-black/10">
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={CSS_HEX_CHECKER_STYLE}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          backgroundColor:
                            hasValue && normalized ? normalized : 'transparent',
                        }}
                      />
                    </span>
                  </button>
                </Popover.Trigger>
              </Tooltip.Trigger>
              {displayCode ? (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className={colorTooltipContentClass}
                    side="top"
                    sideOffset={6}
                  >
                    {displayCode}
                    <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              ) : null}
            </Tooltip.Root>
          </Tooltip.Provider>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="start"
              sideOffset={6}
              collisionPadding={12}
              className="z-100050 w-54 rounded-xl border border-gray-200 bg-white p-2.5 text-gray-800 shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft dark:text-odp-fg"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="[&_.react-colorful]:h-40 [&_.react-colorful]:w-full">
                <HexAlphaColorPicker color={hex} onChange={setHex} />
              </div>
              <HexColorInput
                color={hex}
                onChange={setHex}
                prefixed
                alpha
                placeholder="#rrggbbaa"
                aria-label={`${label} HEX`}
                className={`mt-2 font-mono ${formInputCompactClassName} w-full`}
              />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {hasValue ? (
          <button
            type="button"
            className="inline-flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-gray-600"
            onClick={() => onChange(undefined)}
          >
            <Eraser className="h-3 w-3" aria-hidden />
            clear
          </button>
        ) : null}
      </span>
    </Form.Field>
  );
}

function patch(
  value: HaimTableStyle,
  key: keyof HaimTableStyle,
  next: string | undefined,
): HaimTableStyle {
  const out = { ...value };
  if (next === undefined || next === '') delete out[key];
  else out[key] = next;
  return out;
}

/**
 * Shared style fields for table cells, sections, and template rules.
 */
export function HaimTableStyleFields({
  value,
  onChange,
  fontOptions,
  idPrefix = 'haim-style',
  compact = false,
}: Props) {
  const gap = compact ? 'gap-1.5' : 'gap-2';
  const iconCls = 'h-3 w-3';
  const weightValue = value.fontWeight?.trim() || FONT_WEIGHT_NONE;

  return (
    <Form.Root
      className={`grid grid-cols-2 ${gap} sm:grid-cols-3`}
      onSubmit={(e) => e.preventDefault()}
    >
      <ColorField
        id={`${idPrefix}-bg`}
        label="배경"
        icon={<PaintBucket className={iconCls} />}
        value={value.bg}
        onChange={(v) => onChange(patch(value, 'bg', v))}
      />
      <ColorField
        id={`${idPrefix}-border-inner`}
        label="내부 border"
        icon={<SquareDashed className={iconCls} />}
        value={value.borderInner}
        onChange={(v) => onChange(patch(value, 'borderInner', v))}
      />
      <ColorField
        id={`${idPrefix}-border-outer`}
        label="외부 border"
        icon={<Frame className={iconCls} />}
        value={value.borderOuter}
        onChange={(v) => onChange(patch(value, 'borderOuter', v))}
      />
      <ColorField
        id={`${idPrefix}-color`}
        label="글자색"
        icon={<Palette className={iconCls} />}
        value={value.color}
        onChange={(v) => onChange(patch(value, 'color', v))}
      />
      <Form.Field
        name={`${idPrefix}-font-family`}
        className="col-span-2 flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted sm:col-span-1"
      >
        <Form.Label asChild>
          <span>
            <FieldLabel icon={<Type className={iconCls} />}>font-family</FieldLabel>
          </span>
        </Form.Label>
        <FontFamilyInput
          id={`${idPrefix}-font-family`}
          value={value.fontFamily ?? ''}
          onChange={(v) => onChange(patch(value, 'fontFamily', v.trim() || undefined))}
          {...(fontOptions !== undefined ? { options: fontOptions } : {})}
          inputClassName={formInputCompactClassName}
        />
      </Form.Field>
      <Form.Field
        name={`${idPrefix}-font-size`}
        className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted"
      >
        <Form.Label asChild>
          <span>
            <FieldLabel icon={<ALargeSmall className={iconCls} />}>font-size</FieldLabel>
          </span>
        </Form.Label>
        <Form.Control asChild>
          <input
            id={`${idPrefix}-font-size`}
            type="text"
            value={value.fontSize ?? ''}
            placeholder="14px"
            onChange={(e) => onChange(patch(value, 'fontSize', e.target.value.trim() || undefined))}
            className={formInputCompactClassName}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field
        name={`${idPrefix}-font-weight`}
        className="flex flex-col gap-0.5 text-[10px] text-gray-500 dark:text-odp-muted"
      >
        <Form.Label asChild>
          <span>
            <FieldLabel icon={<Bold className={iconCls} />}>font-weight</FieldLabel>
          </span>
        </Form.Label>
        <RadixSelectField
          id={`${idPrefix}-font-weight`}
          aria-label="font-weight"
          value={
            FONT_WEIGHT_OPTIONS.some((o) => o.value === weightValue)
              ? weightValue
              : FONT_WEIGHT_NONE
          }
          onValueChange={(v) =>
            onChange(patch(value, 'fontWeight', v === FONT_WEIGHT_NONE ? undefined : v))
          }
          options={FONT_WEIGHT_OPTIONS}
          className="h-7 w-full"
        />
      </Form.Field>
    </Form.Root>
  );
}
