/**
 * Gemini API key session: decrypt once per unlock, re-encrypt with random session entropy.
 * Session entropy lives only in module closure (not exported, not on window).
 * Encrypted blob is stored in sessionStorage.
 */
import { encryptWithEntropy, decryptWithEntropy } from '@/utils/crypto';

const SESSION_STORAGE_KEY = 's3haim-gemini-api-key-session';

/** @type {Uint8Array | null} */
let sessionEntropy = null;

export function clearGeminiApiKeySession() {
  sessionEntropy = null;
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

function hasActiveSession() {
  if (!sessionEntropy) return false;
  try {
    return Boolean(sessionStorage.getItem(SESSION_STORAGE_KEY));
  } catch {
    return false;
  }
}

/**
 * @param {() => string | Promise<string>} getPlaintextApiKey
 */
export async function initGeminiApiKeySession(getPlaintextApiKey) {
  if (hasActiveSession()) return { ok: true };

  const apiKey = (await getPlaintextApiKey())?.trim();
  if (!apiKey) {
    return { ok: false, error: 'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.' };
  }

  sessionEntropy = crypto.getRandomValues(new Uint8Array(32));
  const encrypted = await encryptWithEntropy(apiKey, sessionEntropy);
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(encrypted));
  } catch {
    sessionEntropy = null;
    return { ok: false, error: '세션 저장소에 API 키를 저장할 수 없습니다.' };
  }
  return { ok: true };
}

async function decryptSessionApiKey() {
  if (!sessionEntropy) return null;
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return decryptWithEntropy(JSON.parse(raw), sessionEntropy);
  } catch {
    return null;
  }
}

/**
 * Run an async callback with the decrypted API key. Key is not returned to callers.
 * @template T
 * @param {() => string | Promise<string>} getPlaintextApiKey
 * @param {(apiKey: string) => Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function withGeminiApiKey(getPlaintextApiKey, fn) {
  const init = await initGeminiApiKeySession(getPlaintextApiKey);
  if (!init.ok) throw new Error(init.error || 'API 키 세션을 초기화할 수 없습니다.');

  const apiKey = await decryptSessionApiKey();
  if (!apiKey) {
    clearGeminiApiKeySession();
    const retry = await initGeminiApiKeySession(getPlaintextApiKey);
    if (!retry.ok) throw new Error(retry.error || 'API 키 세션을 초기화할 수 없습니다.');
    const retryKey = await decryptSessionApiKey();
    if (!retryKey) throw new Error('API 키를 복호화할 수 없습니다.');
    return fn(retryKey);
  }
  return fn(apiKey);
}
