import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';
import { useVisualViewportLock } from '@/hooks/useVisualViewportLock';
import { loadHideRecordingCompanions } from '@/utils/recordingVisibilitySettings';
import { loadTreeStickyFolderPathEnabled } from '@/utils/treeStickySettings';
import { loadTreeShowModifiedDateEnabled } from '@/utils/treeModifiedDateSettings';
import {
  loadShowHiddenFolders,
  loadShowTrashFolder,
} from '@/utils/treeVisibilitySettings';
import {
  loadTreeHoverExpandSettings,
  saveTreeHoverExpandSettings,
} from '@/utils/treeHoverExpandSettings';
import { isSettingsAppPathname, isContentSearchAppPathname } from '@/utils/appHref';
import { getActiveTab, isChatTab } from '@/utils/workspaceTabs';
import { useLocation } from 'react-router';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';

export type ChromeOwnedApi = {
  operationStatus: string;
  setOperationStatus: (v: string | ((p: string) => string)) => void;
  isMobile: boolean;
  setIsMobile: (v: boolean | ((p: boolean) => boolean)) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean | ((p: boolean) => boolean)) => void;
  showHiddenFolders: boolean;
  setShowHiddenFolders: (v: boolean | ((p: boolean) => boolean)) => void;
  showTrashFolder: boolean;
  setShowTrashFolder: (v: boolean | ((p: boolean) => boolean)) => void;
  hideRecordingCompanions: boolean;
  setHideRecordingCompanions: (v: boolean | ((p: boolean) => boolean)) => void;
  treeStickyFolderPathEnabled: boolean;
  setTreeStickyFolderPathEnabled: (v: boolean | ((p: boolean) => boolean)) => void;
  showTreeModifiedDate: boolean;
  setShowTreeModifiedDate: (v: boolean | ((p: boolean) => boolean)) => void;
  treeHoverExpandSettings: any;
  setTreeHoverExpandSettings: (v: any) => void;
  uploadFileInputRef: MutableRefObject<any>;
  uploadFolderInputRef: MutableRefObject<any>;
  fileInputRef: MutableRefObject<any>;
  expandPathsRef: MutableRefObject<any>;
  fileTabContextMenuRef: MutableRefObject<any>;
  chatAttachDropHost: any;
  setChatAttachDropHost: (v: any) => void;
  chatAttachDropHandlerRef: MutableRefObject<any>;
  handleDropToChatAttach: (items: any) => void;
  handleRegisterChatAttachDrop: (handler: any) => void;
  quizSourceDropActive: boolean;
  setQuizSourceDropActive: (v: boolean) => void;
  quizSourceDropHost: HTMLElement | null;
  setQuizSourceDropHost: (v: HTMLElement | null) => void;
  handleDropToQuizSource: (items: any) => void;
  handleRegisterQuizSourceDrop: (handler: any) => void;
  shareGroupSend: any;
  setShareGroupSend: (v: any) => void;
  authWanted: boolean;
  setAuthWanted: (v: boolean | ((p: boolean) => boolean)) => void;
  isChatRoute: boolean;
  isSettingsRoute: boolean;
  isContentSearchRoute: boolean;
  chatSurfaceActive: boolean;
  lockChatViewport: boolean;
};

const ChromeOwnedContext = createContext<ChromeOwnedApi | null>(null);

export function useChromeOwned(): ChromeOwnedApi {
  const ctx = useContext(ChromeOwnedContext);
  if (!ctx) throw new Error('useChromeOwned must be used within AppChromeStateProvider');
  return ctx;
}

/**
 * Owns sidebar/mobile/tree-display chrome state.
 * Must sit under WorkspaceTabsProvider (needs active tab for chat surface).
 */
export function AppChromeStateProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const workspaceTabsApi = useWorkspaceTabsCtx();
  const workspaceTabsEnabled = workspaceTabsApi.workspaceTabsEnabled;
  const activeWorkspaceTab = getActiveTab(workspaceTabsApi.state);

  const [operationStatus, setOperationStatus] = useState('');
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.localStorage.getItem('s3haim_sidebar_collapsed') === '1';
    } catch {
      return false;
    }
  });
  const [showHiddenFolders, setShowHiddenFolders] = useState(() => loadShowHiddenFolders());
  const [showTrashFolder, setShowTrashFolder] = useState(() => loadShowTrashFolder());
  const [hideRecordingCompanions, setHideRecordingCompanions] = useState(() =>
    loadHideRecordingCompanions(),
  );
  const [treeStickyFolderPathEnabled, setTreeStickyFolderPathEnabled] = useState(() =>
    loadTreeStickyFolderPathEnabled(),
  );
  const [showTreeModifiedDate, setShowTreeModifiedDate] = useState(() =>
    loadTreeShowModifiedDateEnabled(),
  );
  const [treeHoverExpandSettings, setTreeHoverExpandSettings] = useState(() =>
    loadTreeHoverExpandSettings(),
  );
  const uploadFileInputRef = useRef<any>(null);
  const uploadFolderInputRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const expandPathsRef = useRef<any>(null);
  const fileTabContextMenuRef = useRef<any>(null);
  const [chatAttachDropHost, setChatAttachDropHost] = useState<any>(null);
  const chatAttachDropHandlerRef = useRef<any>(null);
  const [quizSourceDropActive, setQuizSourceDropActive] = useState(false);
  const [quizSourceDropHost, setQuizSourceDropHost] = useState<HTMLElement | null>(null);
  const quizSourceDropHandlerRef = useRef<any>(null);
  const [shareGroupSend, setShareGroupSend] = useState<any>(null);
  const [authWanted, setAuthWanted] = useState(false);

  const isChatRoute =
    location.pathname === '/chat' || location.pathname.endsWith('/chat');
  const isSettingsRoute = isSettingsAppPathname(location.pathname);
  const isContentSearchRoute = isContentSearchAppPathname(location.pathname);
  const chatTabActive = isChatTab(activeWorkspaceTab);
  const chatSurfaceActive = workspaceTabsEnabled ? chatTabActive : isChatRoute;
  const lockChatViewport = isMobile && chatSurfaceActive;
  useVisualViewportLock(lockChatViewport);
  useHistoryOverlayBack(sidebarOpen, closeSidebar, isMobile, 'main-sidebar');

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('s3haim_sidebar_collapsed', sidebarCollapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    saveTreeHoverExpandSettings(treeHoverExpandSettings);
  }, [treeHoverExpandSettings]);

  const handleDropToChatAttach = useCallback((items: any) => {
    chatAttachDropHandlerRef.current?.(items);
  }, []);

  const handleRegisterChatAttachDrop = useCallback((handler: any) => {
    chatAttachDropHandlerRef.current =
      typeof handler === 'function' ? handler : null;
  }, []);

  const handleDropToQuizSource = useCallback((items: any) => {
    quizSourceDropHandlerRef.current?.(items);
  }, []);

  const handleRegisterQuizSourceDrop = useCallback((handler: any) => {
    quizSourceDropHandlerRef.current =
      typeof handler === 'function' ? handler : null;
  }, []);

  const value = useMemo(
    () => ({
      operationStatus,
      setOperationStatus,
      isMobile,
      setIsMobile,
      sidebarOpen,
      setSidebarOpen,
      sidebarCollapsed,
      setSidebarCollapsed,
      showHiddenFolders,
      setShowHiddenFolders,
      showTrashFolder,
      setShowTrashFolder,
      hideRecordingCompanions,
      setHideRecordingCompanions,
      treeStickyFolderPathEnabled,
      setTreeStickyFolderPathEnabled,
      showTreeModifiedDate,
      setShowTreeModifiedDate,
      treeHoverExpandSettings,
      setTreeHoverExpandSettings,
      uploadFileInputRef,
      uploadFolderInputRef,
      fileInputRef,
      expandPathsRef,
      fileTabContextMenuRef,
      chatAttachDropHost,
      setChatAttachDropHost,
      chatAttachDropHandlerRef,
      handleDropToChatAttach,
      handleRegisterChatAttachDrop,
      quizSourceDropActive,
      setQuizSourceDropActive,
      quizSourceDropHost,
      setQuizSourceDropHost,
      handleDropToQuizSource,
      handleRegisterQuizSourceDrop,
      shareGroupSend,
      setShareGroupSend,
      authWanted,
      setAuthWanted,
      isChatRoute,
      isSettingsRoute,
      isContentSearchRoute,
      chatSurfaceActive,
      lockChatViewport,
    }),
    [
      operationStatus,
      isMobile,
      sidebarOpen,
      sidebarCollapsed,
      showHiddenFolders,
      showTrashFolder,
      hideRecordingCompanions,
      treeStickyFolderPathEnabled,
      showTreeModifiedDate,
      treeHoverExpandSettings,
      chatAttachDropHost,
      handleDropToChatAttach,
      handleRegisterChatAttachDrop,
      quizSourceDropActive,
      quizSourceDropHost,
      handleDropToQuizSource,
      handleRegisterQuizSourceDrop,
      shareGroupSend,
      authWanted,
      isChatRoute,
      isSettingsRoute,
      isContentSearchRoute,
      chatSurfaceActive,
      lockChatViewport,
    ],
  );

  return (
    <ChromeOwnedContext.Provider value={value}>{children}</ChromeOwnedContext.Provider>
  );
}
