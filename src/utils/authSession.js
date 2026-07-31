/**
 * Persist unlock state for the browser tab session.
 * Ciphertext and session entropy both live in sessionStorage so a reload
 * in the same tab can restore without re-entering the password.
 * Closing the tab clears sessionStorage (and thus the auto-login session).
 */
import { encryptWithEntropy, decryptWithEntropy } from '@/utils/crypto';

const SESSION_STORAGE_KEY = 's3haim-auth-session';
const ENTROPY_STORAGE_KEY = 's3haim-auth-session-entropy';

export function clearAuthSession() {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(ENTROPY_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * @param {{ creds: object, password?: string }} payload
 */
export async function saveAuthSession({ creds, password = '' }) {
  if (!creds || typeof creds !== 'object') {
    clearAuthSession();
    return;
  }

  const entropy = crypto.getRandomValues(new Uint8Array(32));
  const encrypted = await encryptWithEntropy(
    JSON.stringify({ creds, password: password || '' }),
    entropy,
  );

  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(encrypted));
    sessionStorage.setItem(ENTROPY_STORAGE_KEY, JSON.stringify(Array.from(entropy)));
  } catch {
    clearAuthSession();
  }
}

/**
 * @returns {Promise<{ creds: object, password: string } | null>}
 */
export async function tryRestoreAuthSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    const entropyRaw = sessionStorage.getItem(ENTROPY_STORAGE_KEY);
    if (!raw || !entropyRaw) return null;

    const entropy = new Uint8Array(JSON.parse(entropyRaw));
    const decrypted = await decryptWithEntropy(JSON.parse(raw), entropy);
    const parsed = JSON.parse(decrypted);
    if (!parsed?.creds || typeof parsed.creds !== 'object') {
      clearAuthSession();
      return null;
    }
    return {
      creds: parsed.creds,
      password: typeof parsed.password === 'string' ? parsed.password : '',
    };
  } catch {
    clearAuthSession();
    return null;
  }
}
