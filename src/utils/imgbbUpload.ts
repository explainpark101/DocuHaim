import { fileFromImageUrl, isDataImageUri } from '@/utils/markdownImageExport';

const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export type ImgbbUploadResult = {
  url: string;
  displayUrl: string;
  deleteUrl: string;
  id: string;
};

export function isPublicHttpImageUrl(value: string | null | undefined): boolean {
  return /^https?:\/\//i.test(String(value || '').trim());
}

/** Prefer display URL, then path when it is data:/http(s):/blob:. */
export function resolveImgbbFetchSrc(options: {
  path?: string | null;
  imageSrc?: string | null;
}): string {
  const imageSrc = String(options.imageSrc || '').trim();
  const path = String(options.path || '').trim();
  if (imageSrc) return imageSrc;
  if (isDataImageUri(path) || isPublicHttpImageUrl(path) || /^blob:/i.test(path)) {
    return path;
  }
  return '';
}

function stripDataUriBase64(dataUri: string): string {
  const raw = String(dataUri || '').trim();
  const comma = raw.indexOf(',');
  if (comma < 0) return raw;
  return raw.slice(comma + 1).replace(/\s/g, '');
}

/**
 * Upload an image to ImgBB (POST multipart/form-data).
 * `image` may be a File/Blob, a `data:image/...;base64,...` URI, a blob: URL, or a remote https URL.
 */
export async function uploadImageToImgbb(options: {
  apiKey: string;
  image: string | Blob | File;
  name?: string;
  expiration?: number;
}): Promise<ImgbbUploadResult> {
  const apiKey = String(options.apiKey || '').trim();
  if (!apiKey) {
    throw new Error('ImgBB API 키가 없습니다. 설정에서 키를 저장하세요.');
  }

  const body = new FormData();
  body.append('key', apiKey);

  const expiration = options.expiration;
  if (typeof expiration === 'number' && Number.isFinite(expiration) && expiration > 0) {
    body.append('expiration', String(Math.floor(expiration)));
  }

  const image = options.image;
  if (typeof image === 'string') {
    const raw = image.trim();
    if (!raw) throw new Error('업로드할 이미지가 비어 있습니다.');
    if (isDataImageUri(raw)) {
      body.append('image', stripDataUriBase64(raw));
    } else if (isPublicHttpImageUrl(raw)) {
      body.append('image', raw);
    } else if (/^blob:/i.test(raw)) {
      const file = await fileFromImageUrl(raw, options.name);
      body.append('image', file, file.name);
      if (options.name) body.append('name', options.name);
    } else {
      throw new Error('지원하지 않는 이미지 소스입니다.');
    }
  } else if (image instanceof Blob) {
    const fileName =
      options.name ||
      (image instanceof File && image.name ? image.name : 'image.png');
    body.append('image', image, fileName);
    body.append('name', fileName.replace(/\.[^.]+$/, '') || 'image');
  } else {
    throw new Error('지원하지 않는 이미지 소스입니다.');
  }

  if (options.name && !body.has('name')) {
    body.append('name', options.name);
  }

  const response = await fetch(IMGBB_UPLOAD_URL, {
    method: 'POST',
    body,
  });

  let json: {
    success?: boolean;
    status?: number;
    error?: { message?: string };
    data?: {
      id?: string;
      url?: string;
      display_url?: string;
      delete_url?: string;
    };
  } | null = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok || !json?.success || !json.data) {
    const message =
      json?.error?.message ||
      (response.ok ? 'ImgBB 업로드에 실패했습니다.' : `ImgBB 업로드 실패 (${response.status})`);
    throw new Error(message);
  }

  const url = String(json.data.url || json.data.display_url || '').trim();
  if (!url) {
    throw new Error('ImgBB 응답에 이미지 URL이 없습니다.');
  }

  return {
    id: String(json.data.id || ''),
    url,
    displayUrl: String(json.data.display_url || url),
    deleteUrl: String(json.data.delete_url || ''),
  };
}
