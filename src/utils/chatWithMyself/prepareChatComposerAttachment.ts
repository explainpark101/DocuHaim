import { isFileProbablyImage } from '@/utils/editorImageUpload';
import { isProbablyHeicFile, toDisplayableImageObjectUrl } from '@/utils/heicConvert';
import { isViewerImageFileName } from '@/utils/imageExtensions';

export type PreparedChatComposerAttachment = {
  file: File;
  kind: 'image' | 'file';
  previewUrl: string | null;
};

/** Chat raster images; HEIC/HEIF are uploaded as generic files instead. */
export async function isChatComposerImageFile(file: File | null | undefined): Promise<boolean> {
  if (!file) return false;
  if (isProbablyHeicFile(file)) return false;
  if (file.type?.startsWith('image/')) return true;
  if (isViewerImageFileName(file.name)) return true;
  try {
    return await isFileProbablyImage(file);
  } catch {
    return false;
  }
}

/**
 * Prepare a dropped/selected file for chat composer queue.
 * Never throws — falls back to a generic file row when preview fails.
 */
export async function prepareChatComposerAttachment(
  file: File,
): Promise<PreparedChatComposerAttachment> {
  const isImage = await isChatComposerImageFile(file);
  if (!isImage) {
    return { file, kind: 'file', previewUrl: null };
  }

  let previewUrl: string | null = null;
  try {
    previewUrl = await toDisplayableImageObjectUrl(file, file.name);
  } catch (error) {
    console.warn('Chat image preview failed:', error);
  }

  return {
    file,
    kind: 'image',
    previewUrl,
  };
}
