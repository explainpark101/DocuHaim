#!/usr/bin/env python3
"""Extract MainApp body into useMainAppController; leave thin MainApp shell."""
from pathlib import Path
import re

main_path = Path("src/App/MainApp.tsx")
lines = main_path.read_text().splitlines(True)

fn_start = next(i for i, l in enumerate(lines) if "export function MainApp()" in l)
scripts = next(i for i, l in enumerate(lines) if l.startswith("  if (!scriptsLoaded)"))

tail = "".join(lines[scripts:])
m = re.search(r"<AppLayout\n\s*\{\.\.\.\{\n(.*?)\n\s*\}\}\n\s*>", tail, re.S)
layout_props = re.findall(r"(\w+)", m.group(1)) if m else []
print("layout props", len(layout_props))

# Collect AppModals prop names from types or from AppModals usage
modals_m = re.search(r"<AppModals\n(.*?)\n\s*/>", tail, re.S)
modal_props = re.findall(r"(\w+)=\{", modals_m.group(1)) if modals_m else []
print("modal props", len(modal_props))

all_props = sorted(set(layout_props) | set(modal_props) | {
    "scriptsLoaded", "location", "currentFile", "editorContent", "storageMode",
    "localTree", "webdavTree", "s3Tree", "openAdvancedSearchFile", "snippetConfig",
    "showAuthModal", "shareBlockingAuth", "handleUnlock", "fileInputRef",
    "proceedWithoutStoredCreds", "openSettingsWorkspaceTab",
    "canUnlockWithWebAuthnForModal", "handleUnlockWithWebAuthn",
    "autoPromptWebAuthnForModal",
})

# Imports: keep all except shell components
import_lines = []
for l in lines[:fn_start]:
    if any(x in l for x in ("AppLayout", "AppModals", "ExportPdfGate", "RouteSuspenseFallback")):
        continue
    import_lines.append(l)

body = "".join(lines[fn_start + 1 : scripts])
ret = "  return {\n    " + ",\n    ".join(all_props) + ",\n  };\n"

hook_path = Path("src/App/sections/useMainAppController.ts")
hook_path.write_text("".join(import_lines) + "\nexport function useMainAppController() {\n" + body + ret + "}\n")
print("controller lines", len(hook_path.read_text().splitlines()))

thin = """// @ts-nocheck — thin shell; logic in sections/useMainAppController
import { AppModals } from './components/AppModals';
import { AppLayout } from './components/AppLayout';
import { ExportPdfGate } from './components/ExportPdfGate';
import { isExportPdfAppPathname, parseExportPdfPathFromAppPathname } from '@/utils/appHref';
import { useMainAppController } from './sections/useMainAppController';

export function MainApp() {
  const c = useMainAppController();
  const {
    scriptsLoaded,
    location,
    currentFile,
    editorContent,
    storageMode,
    localTree,
    webdavTree,
    s3Tree,
    openAdvancedSearchFile,
    snippetConfig,
    showAuthModal,
    shareBlockingAuth,
    handleUnlock,
    fileInputRef,
    proceedWithoutStoredCreds,
    openSettingsWorkspaceTab,
    canUnlockWithWebAuthnForModal,
    handleUnlockWithWebAuthn,
    autoPromptWebAuthnForModal,
  } = c;

  if (!scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg">
        로딩 중...
      </div>
    );
  }

  if (isExportPdfAppPathname(location.pathname)) {
    const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
    const navState = location.state && typeof location.state === 'object' ? location.state : null;
    const documentFile = navState?.currentFile ?? currentFile;
    const documentValue =
      typeof navState?.value === 'string'
        ? navState.value
        : typeof editorContent === 'string'
          ? editorContent
          : '';
    const waitingForRouteDoc =
      Boolean(routeExportPath)
      && !navState?.value
      && documentFile?.id !== routeExportPath;

    return (
      <ExportPdfGate
        documentValue={documentValue}
        documentFile={documentFile}
        openCoverEdit={Boolean(navState?.openCoverEdit)}
        isDocumentLoading={waitingForRouteDoc}
        hasNavigationSession={Boolean(navState) || Boolean(routeExportPath)}
        storageMode={storageMode}
        localTree={localTree}
        webdavTree={webdavTree}
        s3Tree={s3Tree}
        openAdvancedSearchFile={openAdvancedSearchFile}
        snippetConfig={snippetConfig}
        showAuthModal={showAuthModal}
        shareBlockingAuth={shareBlockingAuth}
        handleUnlock={handleUnlock}
        fileInputRef={fileInputRef}
        proceedWithoutStoredCreds={proceedWithoutStoredCreds}
        openSettingsWorkspaceTab={openSettingsWorkspaceTab}
        canUnlockWithWebAuthnForModal={canUnlockWithWebAuthnForModal}
        handleUnlockWithWebAuthn={handleUnlockWithWebAuthn}
        autoPromptWebAuthnForModal={autoPromptWebAuthnForModal}
      />
    );
  }

  return (
    <AppLayout {...c}>
      <AppModals {...c} />
    </AppLayout>
  );
}
"""
main_path.write_text(thin)
print("MainApp lines", len(thin.splitlines()))
