import { isEncMdPath, tryUnlockEncMdContent } from '@/utils/encMd';
import { toDisplayableImageObjectUrl } from '@/utils/heicConvert';
import { VIEWER_IMAGE_EXTENSIONS } from '@/utils/imageExtensions';
import { vaultPathBasename } from '@/utils/vault/vaultPathBasename';
import type { VaultStorageType } from '@/utils/vault/resolveVaultFileNode';

export type VaultDocumentPreviewFile = {
  type: VaultStorageType;
  id: string;
  name: string;
  viewer: string;
  content?: string;
  objectUrl?: string;
  encMd?: boolean;
  size?: number | null | undefined;
  lastModified?: Date | number;
};

export type VaultDocumentPreviewPayload = {
  currentFile: VaultDocumentPreviewFile;
  content: string;
  needsEncMdPassword?: boolean;
  revoke?: () => void;
};

type StorageBackend = {
  readText?: (path: string) => Promise<{ text: string; contentLength?: number; lastModified?: Date | number }>;
  readBytes?: (path: string) => Promise<{ body: ArrayBuffer | Uint8Array; contentLength?: number }>;
  getObjectUrl?: (path: string) => Promise<string>;
  head?: (path: string) => Promise<{ contentLength?: number }>;
};

function extensionOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

function revokeObjectUrl(url: string | undefined): void {
  if (!url) return;
  try {
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
}

export async function loadVaultDocumentPreview({
  backend,
  storageType,
  path,
}: {
  backend: StorageBackend | null | undefined;
  storageType: VaultStorageType;
  path: string;
}): Promise<VaultDocumentPreviewPayload | null> {
  if (!backend || !path) return null;

  const name = vaultPathBasename(path);
  const ext = extensionOf(name);
  const imageExts = [...VIEWER_IMAGE_EXTENSIONS];
  const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
  const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];

  if (imageExts.includes(ext as (typeof imageExts)[number]) && backend.getObjectUrl) {
    let url = await backend.getObjectUrl(path);
    if (ext === 'heic' || ext === 'heif') {
      const body = await backend.readBytes?.(path);
      if (body?.body) {
        revokeObjectUrl(url);
        const bytes = body.body instanceof Uint8Array ? body.body : new Uint8Array(body.body);
        const part = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as BlobPart;
        url = await toDisplayableImageObjectUrl(new Blob([part]), name);
      }
    }
    const head = await backend.head?.(path);
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'image',
        objectUrl: url,
        size: head?.contentLength ?? null,
      },
      content: '',
      revoke: () => revokeObjectUrl(url),
    };
  }

  if (ext === 'pdf' && backend.readBytes) {
    const { body, contentLength } = await backend.readBytes(path);
    const bytes = body instanceof Uint8Array ? body : new Uint8Array(body);
    const part = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as BlobPart;
    const blob = new Blob([part], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'pdf',
        objectUrl: url,
        size: contentLength ?? null,
      },
      content: '',
      revoke: () => revokeObjectUrl(url),
    };
  }

  if (audioExts.includes(ext) && backend.getObjectUrl) {
    const url = await backend.getObjectUrl(path);
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'audio',
        objectUrl: url,
      },
      content: '',
      revoke: () => revokeObjectUrl(url),
    };
  }

  if (videoExts.includes(ext) && backend.getObjectUrl) {
    const url = await backend.getObjectUrl(path);
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'video',
        objectUrl: url,
      },
      content: '',
      revoke: () => revokeObjectUrl(url),
    };
  }

  if (!backend.readText) return null;

  if (ext === 'json') {
    const { text, contentLength, lastModified } = await backend.readText(path);
    let display = text;
    if (text.length <= 100_000) {
      try {
        display = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        display = text;
      }
    }
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'json',
        content: display,
        ...(contentLength != null ? { size: contentLength } : {}),
        ...(lastModified != null ? { lastModified } : {}),
      },
      content: display,
    };
  }

  if (ext === 'html' || ext === 'htm' || ext === 'svg') {
    const { text, contentLength, lastModified } = await backend.readText(path);
    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: ext === 'svg' ? 'svg' : 'html',
        content: text,
        ...(contentLength != null ? { size: contentLength } : {}),
        ...(lastModified != null ? { lastModified } : {}),
      },
      content: text,
    };
  }

  if (ext === 'md' || ext === 'markdown' || ext === '' || isEncMdPath(path) || isEncMdPath(name)) {
    const { text, contentLength, lastModified } = await backend.readText(path);
    if (isEncMdPath(path) || isEncMdPath(name)) {
      const unlocked = await tryUnlockEncMdContent(path, text);
      if (unlocked.status === 'need-password') {
        return {
          currentFile: {
            type: storageType,
            id: path,
            name,
            viewer: 'markdown',
            content: '',
            ...(contentLength != null ? { size: contentLength } : {}),
            encMd: true,
            ...(lastModified != null ? { lastModified } : {}),
          },
          content: '',
          needsEncMdPassword: true,
        };
      }
      return {
        currentFile: {
          type: storageType,
          id: path,
          name,
          viewer: 'markdown',
          content: unlocked.text,
          ...(contentLength != null ? { size: contentLength } : {}),
          encMd: true,
          ...(lastModified != null ? { lastModified } : {}),
        },
        content: unlocked.text,
      };
    }

    return {
      currentFile: {
        type: storageType,
        id: path,
        name,
        viewer: 'markdown',
        content: text,
        ...(contentLength != null ? { size: contentLength } : {}),
        ...(lastModified != null ? { lastModified } : {}),
      },
      content: text,
    };
  }

  const { text, contentLength, lastModified } = await backend.readText(path);
  return {
    currentFile: {
      type: storageType,
      id: path,
      name,
      viewer: 'raw',
      content: text,
      ...(contentLength != null ? { size: contentLength } : {}),
      ...(lastModified != null ? { lastModified } : {}),
    },
    content: text,
  };
}
