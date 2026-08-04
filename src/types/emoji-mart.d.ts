declare module '@emoji-mart/react' {
  import type { ComponentType } from 'react';

  export type EmojiMartEmoji = {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords?: string[];
    shortcodes?: string;
  };

  export type PickerProps = {
    data?: unknown;
    i18n?: unknown;
    onEmojiSelect?: (emoji: EmojiMartEmoji) => void;
    onClickOutside?: () => void;
    theme?: 'auto' | 'light' | 'dark';
    locale?: string;
    previewPosition?: 'top' | 'bottom' | 'none';
    skinTonePosition?: 'preview' | 'search' | 'none';
    searchPosition?: 'sticky' | 'static' | 'none';
    navPosition?: 'top' | 'bottom' | 'none';
    perLine?: number;
    emojiSize?: number;
    emojiButtonSize?: number;
    maxFrequentRows?: number;
    autoFocus?: boolean;
    set?: string;
    icons?: string;
    dynamicWidth?: boolean;
  };

  const Picker: ComponentType<PickerProps>;
  export default Picker;
}

declare module '@emoji-mart/data' {
  const data: unknown;
  export default data;
}

declare module 'emoji-mart' {
  export const Store: {
    get: (key: string) => unknown;
    set: (key: string, value: unknown) => void;
  };

  export const FrequentlyUsed: {
    add: (emoji: { id: string } | string) => void;
    get: (options: { maxFrequentRows: number; perLine: number }) => string[];
    DEFAULTS: string[];
  };
}
