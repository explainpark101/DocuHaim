import { HttpMethod, upload } from '@tauri-apps/plugin-upload';
import { getSignedPutUrl, putObject } from '@/utils/s3Client';
import { readOpenPathBytes } from '@/utils/shared/desktopOpenFiles';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';

type S3ClientLike = Parameters<typeof putObject>[0];
type UploadProgressHandler = Parameters<typeof upload>[2];

/**
 * Upload a local file path to S3. On Tauri desktop uses plugin-upload (streaming from disk).
 */
export async function uploadLocalPathToS3(
  client: S3ClientLike,
  params: {
    bucket: string;
    key: string;
    filePath: string;
    contentType?: string;
  },
  onProgress?: UploadProgressHandler,
): Promise<void> {
  const contentType = params.contentType || 'application/octet-stream';
  if (isTauriDesktopPlatform()) {
    const signedUrl = await getSignedPutUrl(
      client,
      {
        Bucket: params.bucket,
        Key: params.key,
        ContentType: contentType,
      },
      300,
    );
    const headers = new Map<string, string>();
    headers.set('Content-Type', contentType);
    await upload(signedUrl, params.filePath, onProgress, headers, HttpMethod.Put);
    return;
  }

  const bytes = await readOpenPathBytes(params.filePath);
  await putObject(client, {
    Bucket: params.bucket,
    Key: params.key,
    Body: bytes,
    ContentType: contentType,
  });
}
