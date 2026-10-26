import { isTauriAndroid } from '@/utils/tauriPlatform';

const CHANNEL_ID = 'downloads';

let lastKey = '';
let lastAt = 0;

/** Ask for POST_NOTIFICATIONS on Android. No-op elsewhere. */
export async function ensureAndroidDownloadNotificationPermission(): Promise<boolean> {
  if (!isTauriAndroid()) return false;
  try {
    const notification = await import('@tauri-apps/plugin-notification');
    let granted = await notification.isPermissionGranted();
    if (!granted) {
      const perm = await notification.requestPermission();
      granted = perm === 'granted';
    }
    return granted;
  } catch {
    return false;
  }
}

/**
 * Show a system notification for a finished Android download.
 * Requests permission when it has not been granted yet.
 */
export async function notifyAndroidDownloadedFile(
  fileName: string,
  title = '다운로드 완료',
): Promise<void> {
  if (!isTauriAndroid()) return;
  const label = fileName.trim() || '파일';
  const key = `${title}\0${label}`;
  const now = Date.now();
  if (key === lastKey && now - lastAt < 1500) return;
  lastKey = key;
  lastAt = now;

  try {
    const granted = await ensureAndroidDownloadNotificationPermission();
    if (!granted) return;
    const notification = await import('@tauri-apps/plugin-notification');
    await notification.createChannel({
      id: CHANNEL_ID,
      name: '다운로드',
      importance: notification.Importance.High,
    });
    notification.sendNotification({
      title,
      body: label,
      channelId: CHANNEL_ID,
    });
  } catch {
    // Notification plugin is optional until the Android shell is rebuilt.
  }
}
