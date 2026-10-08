import { getDraftKey, getMemoDraft, deleteMemoDraft } from '@/utils/memoDraftsDb';
import { isEncMdPath, tryUnlockEncMdContent } from '@/utils/encMd';
import { toDisplayableImageObjectUrl } from '@/utils/heicConvert';
import { VIEWER_IMAGE_EXTENSIONS } from '@/utils/imageExtensions';
import {
  prepareViewerText,
  resolveTextOpenViewer,
} from '@/utils/vaultFileViewers';
import { resolveOpenTextContent } from '@/utils/workspaceTabs/resolveOpenText';

type OpenBackend = {
  readBytes: (path: string) => Promise<{ body: ArrayBuffer | Uint8Array; contentLength?: number }>;
  getObjectUrl: (path: string) => Promise<string>;
  readText: (
    path: string,
  ) => Promise<{ text: string; contentLength?: number | null; lastModified?: Date | number }>;
  head?: (path: string) => Promise<{ contentLength?: number | null } | null>;
};

type OpenNode = {
  path: string;
  name: string;
  lastModified?: Date | number;
};

export type OpenPathFileResult = {
  currentFile: Record<string, unknown>;
  editorContent: string;
  revokePrev?: (prev: any) => void;
  needsEncMdPassword?: boolean;
  encMdCiphertext?: string;
};

/**
 * Open a path-based file (S3/WebDAV/idb/local) via StorageBackend into editor state payloads.
 */
export async function openPathFileFromBackend({
  backend,
  type,
  node,
}: {
  backend: OpenBackend;
  type: 's3' | 'webdav' | 'local' | 'idb';
  node: OpenNode;
}): Promise<OpenPathFileResult | null> {
  if (!backend || !node?.path) return null;
  const ext = (node.name.split('.').pop() || '').toLowerCase();
  const imageExts = [...VIEWER_IMAGE_EXTENSIONS];
  const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
  const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];

  const revokePrev = (prev: any) => {
    if (
      prev &&
      (prev.viewer === 'image' ||
        prev.viewer === 'pdf' ||
        prev.viewer === 'audio' ||
        prev.viewer === 'video') &&
      prev.objectUrl
    ) {
      URL.revokeObjectURL(prev.objectUrl);
    }
  };

  if ((imageExts as string[]).includes(ext)) {
    let url = await backend.getObjectUrl(node.path);
    if (ext === 'heic' || ext === 'heif') {
      const { body } = await backend.readBytes(node.path);
      url = await toDisplayableImageObjectUrl(
        new Blob([body as BlobPart]),
        node.name,
      );
    }
    const head = await backend.head?.(node.path);
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        viewer: 'image',
        objectUrl: url,
        size: head?.contentLength ?? null,
        lastModified: node.lastModified,
      },
      editorContent: '',
      revokePrev,
    };
  }

  if (ext === 'pdf') {
    const { body, contentLength } = await backend.readBytes(node.path);
    const blob = new Blob([body as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        viewer: 'pdf',
        objectUrl: url,
        size: contentLength,
        lastModified: node.lastModified,
      },
      editorContent: '',
      revokePrev,
    };
  }

  if (audioExts.includes(ext)) {
    const url = await backend.getObjectUrl(node.path);
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        viewer: 'audio',
        objectUrl: url,
        lastModified: node.lastModified,
      },
      editorContent: '',
      revokePrev,
    };
  }

  if (videoExts.includes(ext)) {
    const url = await backend.getObjectUrl(node.path);
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        viewer: 'video',
        objectUrl: url,
        lastModified: node.lastModified,
      },
      editorContent: '',
      revokePrev,
    };
  }

  const specialOpen = resolveTextOpenViewer(node.path, node.name);
  if (specialOpen) {
    const { text, contentLength, lastModified } = await backend.readText(node.path);
    const display = prepareViewerText(text, specialOpen.viewer);
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        content: display,
        viewer: specialOpen.viewer,
        size: contentLength,
        lastModified: lastModified ?? node.lastModified,
      },
      editorContent: display,
      revokePrev,
    };
  }

  if (ext === 'json') {
    const { text, contentLength, lastModified } = await backend.readText(node.path);
    const display = prepareViewerText(text, 'json');
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        content: display,
        viewer: 'json',
        size: contentLength,
        lastModified: lastModified ?? node.lastModified,
      },
      editorContent: display,
      revokePrev,
    };
  }

  if (ext === 'html' || ext === 'htm' || ext === 'svg') {
    const { text, contentLength, lastModified } = await backend.readText(node.path);
    const viewer = ext === 'svg' ? 'svg' : 'html';
    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        content: text,
        viewer,
        size: contentLength,
        lastModified: lastModified ?? node.lastModified,
      },
      editorContent: text,
      revokePrev,
    };
  }

  if (ext === 'md' || ext === 'markdown' || ext === '') {
    const { text: serverText, contentLength, lastModified } = await backend.readText(node.path);
    const serverLastModified = lastModified ?? node.lastModified;
    const serverLastModTs =
      serverLastModified instanceof Date
        ? serverLastModified.getTime()
        : serverLastModified
          ? new Date(serverLastModified).getTime()
          : 0;

    const draftKey = getDraftKey(type, node.path);
    const encNote = isEncMdPath(node.path) || isEncMdPath(node.name);

    if (encNote) {
      await deleteMemoDraft(draftKey);
      const unlocked = await tryUnlockEncMdContent(node.path, serverText);
      if (unlocked.status === 'need-password') {
        return {
          currentFile: {
            type,
            id: node.path,
            name: node.name,
            content: '',
            viewer: 'markdown',
            size: contentLength,
            lastModified: serverLastModified,
            encMd: true,
          },
          editorContent: '',
          needsEncMdPassword: true,
          encMdCiphertext: unlocked.ciphertext,
          revokePrev,
        };
      }
      return {
        currentFile: {
          type,
          id: node.path,
          name: node.name,
          content: unlocked.text,
          viewer: 'markdown',
          size: contentLength,
          lastModified: serverLastModified,
          encMd: true,
        },
        editorContent: unlocked.text,
        revokePrev,
      };
    }

    const draft = await getMemoDraft(draftKey);
    const resolved = await resolveOpenTextContent({
      serverText,
      serverLastModTs,
      existingTab: null,
      draft,
      fileName: String(node.name || ''),
      filePath: node.path,
      serverLabel: type === 'local' ? '디스크 내용' : '서버 내용',
      deleteDraft: () => deleteMemoDraft(draftKey),
    });

    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        content: resolved.baselineContent,
        viewer: 'markdown',
        size: contentLength,
        lastModified: serverLastModified,
      },
      editorContent: resolved.contentToUse,
      revokePrev,
    };
  }

  return {
    currentFile: {
      type,
      id: node.path,
      name: node.name,
      viewer: 'unsupported',
      lastModified: node.lastModified,
    },
    editorContent: '',
    revokePrev,
  };
}
