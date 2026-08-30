/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useChatStorageCtx } from '@/components/chatWithMyself/ShareTargetGate';
import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import { headObject } from '@/utils/s3Client';
import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  SETTINGS_TAB_ID,
  popClosedTab,
  popTabsRestoreQueue,
  pushClosedTab,
} from '@/utils/workspaceTabs';
import { findFileTab, softCapPrompt } from '@/utils/workspaceTabs/appBridge';
import { closedTabEntryFromWorkspaceTab } from '@/utils/workspaceTabs/closedTabHistory';
import { evictForSoftCap, openOrReplaceFileTab } from '@/utils/workspaceTabs/workspaceTabsStore';
import { readMeta, sortGroupsKo } from '@/utils/chatWithMyself';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { webdavHead } from '@/utils/webdavClient';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { buildSessionTree, listSessionWorkspaces } from '@/utils/sessionWorkspace';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';

const TAB_RESTORE_FILE_CONCURRENCY = 2;

async function forEachWithConcurrency<T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  if (items.length === 0) return;
  let i = 0;
  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (i < items.length) {
        const idx = i++;
        const item = items[idx];
        if (item === undefined) return;
        await fn(item);
        await yieldToMain();
      }
    },
  );
  await Promise.all(workers);
}

/**
 * useAdvancedSearchTabsDomain: context-owned domain handlers.
 */
export function useAdvancedSearchTabsDomain() {
  const { s3Creds } = useAuth();
  const { getS3Client, localRootHandle, localTree, localVaultFsPath, s3Tree, sessionWorkspaces, storageMode, webdavConfig, webdavReady, webdavTree } = useVault();
  const { restorePersistedWorkspaceTabsRef, selectFileRawRef } = useFileSessionOwned();
  const { activateWorkspaceTab, closeWorkspaceTabById, cycleWorkspaceTab, openChatWorkspaceTab, openContentSearchWorkspaceTab, openSettingsWorkspaceTab, setState: setWorkspaceTabs, workspaceTabsEnabledRef, workspaceTabsRef } = useWorkspaceTabsCtx();
  const advancedSearchTreesRef = useRef({
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspaces,
  });
  advancedSearchTreesRef.current = {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspaces,
  };

  const getAdvancedSearchTrees = useCallback(() => {
    const cur = advancedSearchTreesRef.current;
    const trees = [];
    if (cur.storageMode === STORAGE_MODE_LOCAL) trees.push(cur.localTree);
    else if (cur.storageMode === STORAGE_MODE_WEBDAV) trees.push(cur.webdavTree);
    else trees.push(cur.s3Tree);
    for (const ws of listSessionWorkspaces(cur.sessionWorkspaces)) {
      trees.push(buildSessionTree(ws));
    }
    return trees;
  }, []);

  // webdavReady owned by VaultProvider (useVault)

  const resolveClosedFileNode = useCallback(
    async (entry: any) => {
      if (entry.kind !== 'file') return null;
      const { storageType, path } = entry;
      const fallbackName =
        entry.name || path.split('/').filter(Boolean).pop() || 'file';
      if (storageType === 'local') {
        if (localVaultFsPath) {
          const node =
            findFileNodeByPath(localTree, path) ||
            findNodeByPath(localTree, path) || {
              type: 'file',
              path,
              name: fallbackName,
            };
          return (node as any)?.type === 'file' ? node : null;
        }
        if (!localRootHandle) {
          throw new Error('Local storage not ready');
        }
        const node =
          findFileNodeByPath(localTree, path) ||
          findNodeByPath(localTree, path) ||
          (await resolveLocalFileNode(localRootHandle, path));
        return (node as any)?.type === 'file' ? node : null;
      }
      if (storageType === 'webdav') {
        if (!webdavReady || !webdavConfig) {
          throw new Error('WebDAV not ready');
        }
        const node =
          findFileNodeByPath(webdavTree, path) || findNodeByPath(webdavTree, path);
        if ((node as any)?.type === 'file') return node;
        const meta = await webdavHead(webdavConfig, path);
        if (!meta) return null;
        return {
          path,
          id: path,
          name: fallbackName,
          type: 'file',
        };
      }
      // s3
      const node = findFileNodeByPath(s3Tree, path) || findNodeByPath(s3Tree, path);
      if ((node as any)?.type === 'file') return node;
      const client = getS3Client();
      if (!client || !s3Creds?.bucket) {
        throw new Error('S3 not ready');
      }
      const meta = await headObject(client, s3Creds.bucket, path);
      if (!meta) return null;
      return {
        path,
        id: path,
        name: fallbackName,
        type: 'file',
      };
    },
    [
      localRootHandle,
      localVaultFsPath,
      localTree,
      webdavReady,
      webdavConfig,
      webdavTree,
      s3Tree,
      getS3Client,
      s3Creds?.bucket,
    ],
  );

  const reopenClosedWorkspaceTab = useCallback(async () => {
    if (!workspaceTabsEnabledRef.current) return;
    // Prefer explicitly closed tabs; then cold-start queue from last open list.
    for (;;) {
      const entry = popClosedTab() || popTabsRestoreQueue();
      if (!entry) return;
      if (entry.kind === 'chat') {
        openChatWorkspaceTab();
        return;
      }
      if (entry.kind === 'settings') {
        openSettingsWorkspaceTab();
        return;
      }
      if (entry.kind === 'content-search') {
        openContentSearchWorkspaceTab();
        return;
      }
      try {
        const node = await resolveClosedFileNode(entry);
        if (!node) {
          // Missing — already popped; try older history.
          continue;
        }
        await selectFileRawRef.current?.(entry.storageType, node);
        return;
      } catch (err) {
        // Transient failure: put entry back and stop.
        console.error('Reopen closed tab failed:', err);
        pushClosedTab(entry);
        return;
      }
    }
  }, [openChatWorkspaceTab, openContentSearchWorkspaceTab, openSettingsWorkspaceTab, resolveClosedFileNode]);

  const restorePersistedWorkspaceTabs = useCallback(
    async (persisted: any, options: any = {}) => {
      const { activeId: explicitActiveId = null, navigateActiveUrl = false } = options as {
        activeId?: string | null;
        navigateActiveUrl?: boolean;
      };
      if (!workspaceTabsEnabledRef.current || !persisted?.tabs?.length) return false;

      const targetActiveId = explicitActiveId ?? persisted.activeId;
      let restoredAny = false;

      // Phase 1: open chat/settings shells without stealing focus.
      for (const tab of persisted.tabs) {
        if (tab.kind === 'chat') {
          openChatWorkspaceTab({ navigateUrl: false, activate: false });
          restoredAny = true;
        } else if (tab.kind === 'settings') {
          openSettingsWorkspaceTab({ navigateUrl: false, activate: false });
          restoredAny = true;
        } else if (tab.kind === 'content-search') {
          openContentSearchWorkspaceTab({ navigateUrl: false, activate: false });
          restoredAny = true;
        }
      }

      // Phase 2: create file tab shells (loading placeholders) without activation.
      const fileTabs = persisted.tabs.filter((t: any) => t.kind === 'file');
      let nextState = workspaceTabsRef.current;
      for (const tab of fileTabs) {
        if (findFileTab(nextState, tab.type, tab.path)) {
          restoredAny = true;
          continue;
        }
        const fallbackName = tab.path.split('/').filter(Boolean).pop() || 'file';
        const evicted = evictForSoftCap(nextState.tabs, { promptCloseDirty: softCapPrompt });
        if (!evicted) continue;
        for (const closed of evicted.closed) {
          pushClosedTab(closedTabEntryFromWorkspaceTab(closed));
        }
        nextState = openOrReplaceFileTab(
          { ...nextState, tabs: evicted.tabs },
          {
            storageType: tab.type,
            path: tab.path,
            currentFile: {
              type: tab.type,
              id: tab.path,
              name: fallbackName,
              viewer: 'loading',
            },
            editorContent: '',
            editedFileName: fallbackName,
            ...(tab.appRoute ? { appRoute: tab.appRoute } : {}),
          },
          Date.now(),
          { activate: false },
        );
        restoredAny = true;
      }
      workspaceTabsRef.current = nextState;
      setWorkspaceTabs(nextState);
      await yieldToMain();

      // Phase 3: activate the last-used tab from the start.
      if (targetActiveId === CHAT_TAB_ID) {
        if (nextState.tabs.some((t) => t.id === CHAT_TAB_ID)) {
          activateWorkspaceTab(CHAT_TAB_ID, { navigateUrl: navigateActiveUrl });
        }
      } else if (targetActiveId === SETTINGS_TAB_ID) {
        if (nextState.tabs.some((t) => t.id === SETTINGS_TAB_ID)) {
          activateWorkspaceTab(SETTINGS_TAB_ID, { navigateUrl: navigateActiveUrl });
        }
      } else if (targetActiveId === CONTENT_SEARCH_TAB_ID) {
        if (nextState.tabs.some((t) => t.id === CONTENT_SEARCH_TAB_ID)) {
          activateWorkspaceTab(CONTENT_SEARCH_TAB_ID, { navigateUrl: navigateActiveUrl });
        }
      } else if (typeof targetActiveId === 'string' && targetActiveId) {
        const activeExists = nextState.tabs.some((tab) => tab.id === targetActiveId);
        if (activeExists) {
          activateWorkspaceTab(targetActiveId, { navigateUrl: navigateActiveUrl });
        }
      }

      // Phase 4: load file tab contents with limited concurrency.
      await forEachWithConcurrency(fileTabs, TAB_RESTORE_FILE_CONCURRENCY, async (tab: any) => {
        try {
          const node = await resolveClosedFileNode({
            kind: 'file',
            storageType: tab.type,
            path: tab.path,
          });
          if ((node as any)?.type !== 'file') return;
          await selectFileRawRef.current?.(tab.type, node, {
            skipNavigate: true,
            background: true,
          });
        } catch (err) {
          console.warn('Failed to restore workspace tab:', tab.path, err);
        }
      });

      // Re-activate in case any load briefly changed focus.
      if (targetActiveId === CHAT_TAB_ID) {
        if (workspaceTabsRef.current.tabs.some((t) => t.id === CHAT_TAB_ID)) {
          activateWorkspaceTab(CHAT_TAB_ID, { navigateUrl: false });
        }
      } else if (targetActiveId === SETTINGS_TAB_ID) {
        if (workspaceTabsRef.current.tabs.some((t) => t.id === SETTINGS_TAB_ID)) {
          activateWorkspaceTab(SETTINGS_TAB_ID, { navigateUrl: false });
        }
      } else if (targetActiveId === CONTENT_SEARCH_TAB_ID) {
        if (workspaceTabsRef.current.tabs.some((t) => t.id === CONTENT_SEARCH_TAB_ID)) {
          activateWorkspaceTab(CONTENT_SEARCH_TAB_ID, { navigateUrl: false });
        }
      } else if (typeof targetActiveId === 'string' && targetActiveId) {
        if (workspaceTabsRef.current.tabs.some((tab) => tab.id === targetActiveId)) {
          activateWorkspaceTab(targetActiveId, { navigateUrl: false });
        }
      }

      return restoredAny;
    },
    [
      activateWorkspaceTab,
      openChatWorkspaceTab,
      openContentSearchWorkspaceTab,
      openSettingsWorkspaceTab,
      resolveClosedFileNode,
      setWorkspaceTabs,
    ],
  );

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (!workspaceTabsEnabledRef.current) return;
      if (e.defaultPrevented || e.isComposing) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      // Ctrl/Cmd+Shift+T — reopen most recently closed tab
      if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
        e.preventDefault();
        e.stopPropagation();
        void reopenClosedWorkspaceTab();
        return;
      }

      // Ctrl/Cmd+W — close active tab
      if (!e.altKey && !e.shiftKey && (e.key === 'w' || e.key === 'W')) {
        e.preventDefault();
        e.stopPropagation();
        const activeId = workspaceTabsRef.current.activeId;
        if (activeId) closeWorkspaceTabById(activeId);
        return;
      }

      // Ctrl/Cmd+Tab / Ctrl/Cmd+Shift+Tab — cycle open tabs
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        cycleWorkspaceTab(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [reopenClosedWorkspaceTab, closeWorkspaceTabById, cycleWorkspaceTab]);

  const { ready: chatStorageReady, ctx: chatStorageCtx } = useChatStorageCtx({
    storageMode,
    getS3Client,
    s3Bucket: s3Creds.bucket,
    localRootHandle,
    webdavConfig,
  });

  const getAdvancedSearchChatGroups = useCallback(async () => {
    if (!chatStorageReady || !chatStorageCtx) return [];
    try {
      const meta = await readMeta(chatStorageCtx);
      return sortGroupsKo(meta.groups || []);
    } catch (err) {
      console.warn('[advancedSearch] read chat groups failed', err);
      return [];
    }
  }, [chatStorageReady, chatStorageCtx]);

  const api = {
    getAdvancedSearchTrees,
    getAdvancedSearchChatGroups,
    reopenClosedWorkspaceTab,
    restorePersistedWorkspaceTabs,
    chatStorageReady,
    chatStorageCtx,
  };
  restorePersistedWorkspaceTabsRef.current = restorePersistedWorkspaceTabs;
  return api;
}
