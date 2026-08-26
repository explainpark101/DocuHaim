import { useEffect, useState } from 'react';
import {
  WEBFONTS_CHANGED_EVENT,
  getCachedWebfontCss,
  loadWebfontsFromStorage,
  notifyWebfontsChanged,
} from '@/utils/webfontSettingsStore';

/**
 * Injects user webfont CSS into the document so cover/print/editor can use it.
 */
export default function UserWebfontStyles() {
  const [css, setCss] = useState(() => getCachedWebfontCss());

  useEffect(() => {
    let cancelled = false;
    void loadWebfontsFromStorage().then((settings) => {
      if (cancelled) return;
      setCss(settings.css);
      notifyWebfontsChanged(settings);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<{ css?: string }>).detail;
      setCss(typeof detail?.css === 'string' ? detail.css : getCachedWebfontCss());
    };
    window.addEventListener(WEBFONTS_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(WEBFONTS_CHANGED_EVENT, onChange);
  }, []);

  if (!css.trim()) return null;

  return (
    <style id="s3haim-user-webfonts" data-s3haim-webfonts="1">
      {css}
    // @ts-expect-error TS(2339): Property 'style' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
    </style>
  );
}
