import { getDraftKey, getMemoDraft, deleteMemoDraft } from '@/utils/memoDraftsDb';
import { isEncMdPath, tryUnlockEncMdContent } from '@/utils/encMd';

/**
 * Open a path-based file (S3/WebDAV) via StorageBackend into editor state payloads.
 *
 * @param {Object} params
 * @param {{ readBytes: Function, getObjectUrl: Function, readText?: Function }} params.backend
 * @param {'s3'|'webdav'|'local'} params.type
 * @param {{ path: string, name: string, lastModified?: Date|number }} params.node
 * @returns {Promise<{
 *   currentFile: object,
 *   editorContent: string,
 *   revokePrev?: Function,
 *   needsEncMdPassword?: boolean,
 *   encMdCiphertext?: string,
 * } | null>}
 */
export async function openPathFileFromBackend({
  backend,
  type,
  node
}: any) {
  if (!backend || !node?.path) return null;
  const ext = (node.name.split('.').pop() || '').toLowerCase();
  const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
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

  if (imageExts.includes(ext)) {
    const url = await backend.getObjectUrl(node.path);
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
    const blob = new Blob([body], { type: 'application/pdf' });
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

  if (ext === 'json') {
    const { text, contentLength, lastModified } = await backend.readText(node.path);
    const maxFormatLen = 100000;
    let display = text;
    if (text.length <= maxFormatLen) {
      try {
        display = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        display = text;
      }
    }
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
      // Never merge plaintext drafts; scrub any leftover IndexedDB draft.
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

    let contentToUse = serverText;
    if (draft) {
      if (serverLastModTs > draft.originalLastModified) {
        const msg =
          type === 's3'
            ? '서버에 더 최신 버전이 있습니다. 기존 내용을 버리고 서버 버전으로 교체할까요?'
            : '더 최신 버전이 있습니다. 기존 내용을 버리고 최신 버전으로 교체할까요?';
        const useServer = window.confirm(msg);
        if (useServer) {
          contentToUse = serverText;
          await deleteMemoDraft(draftKey);
        } else {
          contentToUse = draft.content;
        }
      } else {
        contentToUse = draft.content;
      }
    }

    return {
      currentFile: {
        type,
        id: node.path,
        name: node.name,
        content: contentToUse,
        viewer: 'markdown',
        size: contentLength,
        lastModified: serverLastModified,
      },
      editorContent: contentToUse,
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
