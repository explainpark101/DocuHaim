import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  isExportPdfAppPathname,
  parseExportPdfPathFromAppPathname,
  openNotePathnameForStoragePath,
} from '@/utils/appHref';
import { useWorkspaceTabsCtxOptional } from '@/App/hooks/useWorkspaceTabsCtx';

/**
 * When workspace tabs are on, `/export-pdf/...` deep links open the pane print
 * surface and rewrite the URL back to the note path.
 */
export function useExportPdfPaneDeepLink(): void {
  const location = useLocation();
  const navigate = useNavigate();
  const tabsCtx = useWorkspaceTabsCtxOptional();

  useEffect(() => {
    if (!tabsCtx?.workspaceTabsEnabled) return;
    if (!isExportPdfAppPathname(location.pathname)) return;
    const path = parseExportPdfPathFromAppPathname(location.pathname);
    const activeId = tabsCtx.state.activeId;
    const matching = path
      ? tabsCtx.state.tabs.find((t) => t.kind === 'file' && t.path === path)
      : null;
    const tabId = matching?.id ?? activeId;
    tabsCtx.openExportPdfInFocusedPane?.(tabId);
    if (path) {
      navigate(openNotePathnameForStoragePath(path), { replace: true });
      return;
    }
    if (activeId) {
      const tab = tabsCtx.state.tabs.find((t) => t.id === activeId);
      if (tab && tab.kind === 'file') {
        navigate(openNotePathnameForStoragePath(tab.path), { replace: true });
        return;
      }
    }
    navigate('/', { replace: true });
  }, [location.pathname, navigate, tabsCtx]);
}
