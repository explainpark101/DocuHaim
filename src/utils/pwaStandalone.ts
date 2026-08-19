const PWA_DISPLAY_MODE_QUERIES = [
  '(display-mode: standalone)',
  '(display-mode: fullscreen)',
  '(display-mode: minimal-ui)',
] as const;

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

/**
 * True when the app runs as an installed PWA (standalone / fullscreen / iOS home screen).
 * Regular browser tabs return false so Ctrl/Cmd+N keeps opening a new window.
 */
export function isPwaStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  if (PWA_DISPLAY_MODE_QUERIES.some((query) => window.matchMedia(query).matches)) {
    return true;
  }
  return Boolean((navigator as NavigatorWithStandalone).standalone);
}
