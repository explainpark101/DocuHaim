// 녹음·필기 동기화 동반 파일을 UI에서 숨길지 (localStorage)
const LOCAL_STORAGE_KEY = 's3haim_hide_recording_companions';

/** 기본값: 숨김. 명시적으로 '0'이면 목록·녹음 UI에 표시 */
export function loadHideRecordingCompanions() {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === '0') return false;
    return true;
  } catch {
    return true;
  }
}

export function saveHideRecordingCompanions(value: any) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}
