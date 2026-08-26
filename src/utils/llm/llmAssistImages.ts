export const LLM_ASSIST_MAX_IMAGES = 4;
export const LLM_ASSIST_MAX_IMAGE_BYTES = 4 * 1024 * 1024;
export const LLM_ASSIST_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const RESIZE_THRESHOLD_BYTES = 1.5 * 1024 * 1024;
const RESIZE_MAX_DIMENSION = 2048;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(`이미지를 읽을 수 없습니다: ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지를 불러올 수 없습니다.'));
    img.src = dataUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error('이미지 압축에 실패했습니다.'));
        else resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}

async function resizeImageFile(file: File) {
  const dataUrl = await readFileAsDataUrl(file);
  const img = await loadImageFromDataUrl(dataUrl);
  const scale = Math.min(1, RESIZE_MAX_DIMENSION / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('이미지 리사이즈에 실패했습니다.');
  ctx.drawImage(img, 0, 0, width, height);

  const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const quality = outputMime === 'image/jpeg' ? 0.88 : undefined;
  const blob = await canvasToBlob(canvas, outputMime, quality);
  return readFileAsDataUrl(new File([blob], file.name, { type: outputMime }));
}

function parseDataUrl(dataUrl: any) {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error('이미지 데이터 형식이 올바르지 않습니다.');
  return { mimeType: match[1], dataBase64: match[2] };
}

function mimeTypeToExtension(mimeType: any) {
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    default:
      return 'png';
  }
}

function withClipboardFileName(file: any) {
  if (file.name) return file;
  const ext = mimeTypeToExtension(file.type);
  return new File([file], `clipboard-${Date.now()}.${ext}`, { type: file.type });
}

/**
 * @param {DataTransfer | null | undefined} clipboardData
 * @returns {File[]}
 */
export function extractImageFilesFromClipboard(clipboardData: any) {
  if (!clipboardData) return [];

  const files: any = [];
  const seen = new Set();

  const pushFile = (file: any) => {
    if (!file || !file.type.startsWith('image/')) return;
    const key = `${file.type}:${file.size}:${file.lastModified}`;
    if (seen.has(key)) return;
    seen.add(key);
    files.push(withClipboardFileName(file));
  };

  if (clipboardData.items) {
    for (const item of clipboardData.items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        pushFile(item.getAsFile());
      }
    }
  }

  if (!files.length && clipboardData.files?.length) {
    for (const file of clipboardData.files) {
      pushFile(file);
    }
  }

  return files;
}

/**
 * @param {ClipboardEvent} event
 * @param {number} currentCount
 */
export async function readClipboardImagesAsAttachments(event: any, currentCount = 0) {
  const files = extractImageFilesFromClipboard(event.clipboardData);
  if (!files.length) return [];
  return readImageFilesAsAttachments(files, currentCount);
}

/**
 * @param {File} file
 * @returns {Promise<{ id: string, name: string, mimeType: string, dataBase64: string, previewDataUrl: string }>}
 */
export async function readImageFileAsAttachment(file: any) {
  const inputFile = withClipboardFileName(file);
  if (!LLM_ASSIST_IMAGE_MIME_TYPES.includes(inputFile.type)) {
    throw new Error('JPEG, PNG, WebP, GIF 이미지만 첨부할 수 있습니다.');
  }
  if (inputFile.size > LLM_ASSIST_MAX_IMAGE_BYTES) {
    throw new Error(`이미지는 파일당 ${Math.round(LLM_ASSIST_MAX_IMAGE_BYTES / (1024 * 1024))}MB 이하여야 합니다.`);
  }

  const dataUrl =
    inputFile.size > RESIZE_THRESHOLD_BYTES
      ? await resizeImageFile(inputFile)
      : await readFileAsDataUrl(inputFile);
  const { mimeType, dataBase64 } = parseDataUrl(dataUrl);

  return {
    id: crypto.randomUUID(),
    name: inputFile.name,
    mimeType,
    dataBase64,
    previewDataUrl: dataUrl,
  };
}

/**
 * @param {FileList | File[]} files
 * @param {number} currentCount
 * @returns {Promise<{ id: string, name: string, mimeType: string, dataBase64: string, previewDataUrl: string }[]>}
 */
export async function readImageFilesAsAttachments(files: any, currentCount = 0) {
  const list = [...files].filter((f) => f.type.startsWith('image/'));
  if (!list.length) throw new Error('이미지 파일을 선택하세요.');

  const remaining = LLM_ASSIST_MAX_IMAGES - currentCount;
  if (remaining <= 0) {
    throw new Error(`이미지는 최대 ${LLM_ASSIST_MAX_IMAGES}장까지 첨부할 수 있습니다.`);
  }
  if (list.length > remaining) {
    throw new Error(`이미지는 최대 ${LLM_ASSIST_MAX_IMAGES}장까지 첨부할 수 있습니다. (현재 ${currentCount}장)`);
  }

  const attachments = [];
  for (const file of list) {
    attachments.push(await readImageFileAsAttachment(file));
  }
  return attachments;
}

/**
 * @param {unknown} raw
 * @returns {{ id: string, name: string, mimeType: string, dataBase64: string, previewDataUrl: string } | null}
 */
export function normalizeImageAttachment(raw: any) {
  if (!raw || typeof raw !== 'object') return null;
  const id = typeof raw.id === 'string' ? raw.id : '';
  const name = typeof raw.name === 'string' ? raw.name : 'image';
  const mimeType = typeof raw.mimeType === 'string' ? raw.mimeType : '';
  const dataBase64 = typeof raw.dataBase64 === 'string' ? raw.dataBase64 : '';
  if (!id || !mimeType || !dataBase64) return null;
  const previewDataUrl =
    typeof raw.previewDataUrl === 'string' && raw.previewDataUrl.startsWith('data:')
      ? raw.previewDataUrl
      : `data:${mimeType};base64,${dataBase64}`;
  return { id, name, mimeType, dataBase64, previewDataUrl };
}
