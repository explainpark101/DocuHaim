import { useEffect, useState } from 'react';
import { readDocumentTheme } from '@/utils/documentTheme';

/**
 * Live app color theme (`light` | `dark`) from `document.documentElement`'s
 * Tailwind `dark` class — not OS `prefers-color-scheme`.
 */
export function useDocumentTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readDocumentTheme());

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(readDocumentTheme());
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return theme;
}
