import { Suspense, lazy } from 'react';
import EditorPane from '@/components/shell/EditorPane';
import WorkspaceTabBar from '@/components/shell/workspace/WorkspaceTabBar';
import WorkspaceTabHost, {
  WorkspaceKeepAlivePanel,
} from '@/components/shell/workspace/WorkspaceTabHost';
import { CHAT_TAB_ID, SETTINGS_TAB_ID, isFileTab } from '@/utils/workspaceTabs';

const ChatWithMyselfPane = lazy(() => import('@/components/chatWithMyself/ChatWithMyselfPane'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

function RouteSuspenseFallback() {
  return (
    <div className="flex h-full min-h-48 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-bgSofter dark:text-odp-muted">
      로딩 중…
    </div>
  );
}

/**
 * Unified workspace: tab strip + keep-alive file editors + singleton chat/settings.
 * When `tabsEnabled` is false (legacy), hide the tab bar and show either
 * exclusive chat/settings (`isChatRoute` / `isSettingsRoute`) or a single editor from mirrors.
 */
export default function WorkspaceMainPanels({
  tabs,
  activeId,
  savingTabIds,
  onActivateTab,
  onCloseTab,
  onReorderTabs,
  onFileTabContextMenu,
  isMobileLayout = false,
  editorPaneProps,
  chatPaneProps,
  settingsPaneProps,
  mirrors,
  tabsEnabled = true,
  isChatRoute = false,
  isSettingsRoute = false,

  /** `titlebar` — tab strip lives in DesktopTitlebar; omit inline WorkspaceTabBar. */
  tabBarPlacement = 'inline'
}: any) {
  const fileTabs = tabs.filter(isFileTab);
  const hasChatTab = tabs.some((t: any) => t.kind === 'chat');
  const hasSettingsTab = tabs.some((t: any) => t.kind === 'settings');
  const chatActive = tabsEnabled ? activeId === CHAT_TAB_ID : isChatRoute;
  const settingsActive = tabsEnabled ? activeId === SETTINGS_TAB_ID : isSettingsRoute;
  const showChat = tabsEnabled ? hasChatTab : isChatRoute;
  const showSettings = tabsEnabled ? hasSettingsTab : isSettingsRoute;
  // Home (`activeId` cleared) or no tabs → empty editor shell.
  const showEmpty = tabsEnabled
    ? tabs.length === 0 || activeId == null
    : !isChatRoute && !isSettingsRoute && !mirrors?.currentFile && fileTabs.length === 0;

  if (!tabsEnabled) {
    return (
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <WorkspaceTabHost>
          {isSettingsRoute ? (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <Suspense fallback={<RouteSuspenseFallback />}>
                <SettingsPage {...settingsPaneProps} />
              </Suspense>
            </div>
          ) : isChatRoute ? (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <Suspense fallback={<RouteSuspenseFallback />}>
                <ChatWithMyselfPane {...chatPaneProps} isActive />
              </Suspense>
            </div>
          ) : (
            <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
              <EditorPane
                {...editorPaneProps({
                  currentFile: mirrors?.currentFile ?? null,
                  editorContent: mirrors?.editorContent ?? '',
                  editedFileName: mirrors?.editedFileName ?? '',
                  setEditedFileName: mirrors?.setEditedFileName,
                  onChangeEditor: mirrors?.onChangeEditor,
                  isActiveFile: true,
                })}
              />
            </div>
          )}
        </WorkspaceTabHost>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {tabBarPlacement === 'inline' ? (
        <WorkspaceTabBar
          tabs={tabs}
          activeId={activeId}
          savingTabIds={savingTabIds}
          onActivate={onActivateTab}
          onClose={onCloseTab}
          onReorder={onReorderTabs}
          onFileTabContextMenu={onFileTabContextMenu}
          isMobileLayout={isMobileLayout}
        />
      ) : null}
      <WorkspaceTabHost>
        {fileTabs.map((tab: any) => {
          const active = tab.id === activeId;
          const useMirrors =
            active &&
            mirrors?.currentFile &&
            mirrors.currentFile.type === tab.storageType &&
            mirrors.currentFile.id === tab.path;
          const paneFile = useMirrors ? mirrors.currentFile : tab.currentFile;
          const paneContent = useMirrors ? mirrors.editorContent : tab.editorContent;
          const paneName = useMirrors ? mirrors.editedFileName : tab.editedFileName;
          return (
            <WorkspaceKeepAlivePanel key={tab.id} active={active}>
              <EditorPane
                {...editorPaneProps({
                  currentFile: paneFile,
                  editorContent: paneContent,
                  editedFileName: paneName,
                  setEditedFileName: useMirrors
                    ? mirrors.setEditedFileName
                    : (name: any) => mirrors?.onInactiveEditedFileName?.(tab.id, name),
                  onChangeEditor: useMirrors
                    ? mirrors.onChangeEditor
                    : (value: any) => mirrors?.onInactiveEditorChange?.(tab.id, value),
                  isActiveFile: active,
                })}
              />
            </WorkspaceKeepAlivePanel>
          );
        })}

        {showChat ? (
          <WorkspaceKeepAlivePanel active={chatActive}>
            <Suspense fallback={<RouteSuspenseFallback />}>
              <ChatWithMyselfPane {...chatPaneProps} isActive={chatActive} />
            </Suspense>
          </WorkspaceKeepAlivePanel>
        ) : null}

        {showSettings ? (
          <WorkspaceKeepAlivePanel active={settingsActive}>
            <Suspense fallback={<RouteSuspenseFallback />}>
              <SettingsPage {...settingsPaneProps} />
            </Suspense>
          </WorkspaceKeepAlivePanel>
        ) : null}

        {showEmpty ? (
          <div className="absolute inset-0 flex min-h-0 min-w-0 flex-col overflow-hidden">
            <EditorPane
              {...editorPaneProps({
                currentFile: null,
                editorContent: '',
                editedFileName: '',
                setEditedFileName: mirrors?.setEditedFileName,
                onChangeEditor: mirrors?.onChangeEditor,
                isActiveFile: true,
              })}
            />
          </div>
        ) : null}
      </WorkspaceTabHost>
    </div>
  );
}
