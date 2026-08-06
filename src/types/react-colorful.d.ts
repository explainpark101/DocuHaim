declare module 'react-colorful' {
  import type {
    ComponentType,
    HTMLAttributes,
    InputHTMLAttributes,
  } from 'react';

  type ColorPickerBaseProps<T extends string> = {
    color?: T;
    onChange?: (newColor: T) => void;
    onChangeEnd?: (newColor: T) => void;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onChange' | 'onChangeCapture'>;

  export type HexColorPickerProps = ColorPickerBaseProps<string>;
  export type HexAlphaColorPickerProps = ColorPickerBaseProps<string>;

  export type HexColorInputProps = {
    color?: string;
    onChange?: (newColor: string) => void;
    /** Enables `#` prefix displaying */
    prefixed?: boolean;
    /** Allows `#rgba` and `#rrggbbaa` color formats */
    alpha?: boolean;
  } & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

  export const HexColorPicker: ComponentType<HexColorPickerProps>;
  export const HexAlphaColorPicker: ComponentType<HexAlphaColorPickerProps>;
  export const HexColorInput: ComponentType<HexColorInputProps>;
}
