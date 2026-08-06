declare module 'react-colorful' {
  import type {
    ComponentType,
    HTMLAttributes,
    InputHTMLAttributes,
  } from 'react';

  export type HexColorPickerProps = {
    color?: string;
    onChange?: (newColor: string) => void;
    onChangeEnd?: (newColor: string) => void;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'onChange' | 'onChangeCapture'>;

  export type HexColorInputProps = {
    color?: string;
    onChange?: (newColor: string) => void;
    /** Enables `#` prefix displaying */
    prefixed?: boolean;
    /** Allows `#rgba` and `#rrggbbaa` color formats */
    alpha?: boolean;
  } & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>;

  export const HexColorPicker: ComponentType<HexColorPickerProps>;
  export const HexColorInput: ComponentType<HexColorInputProps>;
}
