/**
 * Session wrapping for LLM API keys: decrypt once per unlock, re-encrypt with
 * random session entropy. Entropy lives in the factory closure (not on window).
 */
import { decryptWithEntropy, encryptWithEntropy } from '@/utils/crypto';

export type ApiKeyGetter = () => string | Promise<string>;

export type ApiKeySessionInit =
  | { ok: true }
  | { ok: false; error: string };

export type ApiKeySession = {
  clear: () => void;
  init: (getPlaintextApiKey: ApiKeyGetter) => Promise<ApiKeySessionInit>;
  withApiKey: <T>(
    getPlaintextApiKey: ApiKeyGetter,
    fn: (apiKey: string) => Promise<T>,
  ) => Promise<T>;
};

type EncryptedBlob = {
  salt: number[];
  iv: number[];
  cipher: number[];
};

function isEncryptedBlob(value: unknown): value is EncryptedBlob {
  if (!value || typeof value !== 'object') return false;
  const rec = value as Record<string, unknown>;
  return Array.isArray(rec.salt) && Array.isArray(rec.iv) && Array.isArray(rec.cipher);
}

export function createApiKeySession(options: {
  storageKey: string;
  missingKeyMessage: string;
  allowEmpty?: boolean;
}): ApiKeySession {
  const { storageKey, missingKeyMessage, allowEmpty = false } = options;
  let sessionEntropy: Uint8Array | null = null;

  const clear = () => {
    sessionEntropy = null;
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  const hasActiveSession = () => {
    if (!sessionEntropy) return false;
    try {
      return Boolean(sessionStorage.getItem(storageKey));
    } catch {
      return false;
    }
  };

  const init = async (getPlaintextApiKey: ApiKeyGetter): Promise<ApiKeySessionInit> => {
    if (hasActiveSession()) return { ok: true };

    const apiKey = (await getPlaintextApiKey())?.trim() ?? '';
    if (!apiKey) {
      if (allowEmpty) return { ok: true };
      return { ok: false, error: missingKeyMessage };
    }

    sessionEntropy = crypto.getRandomValues(new Uint8Array(32));
    const encrypted = await encryptWithEntropy(apiKey, sessionEntropy);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(encrypted));
    } catch {
      sessionEntropy = null;
      return { ok: false, error: '세션 저장소에 API 키를 저장할 수 없습니다.' };
    }
    return { ok: true };
  };

  const decryptSessionApiKey = async (): Promise<string | null> => {
    if (!sessionEntropy) return null;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (!isEncryptedBlob(parsed)) return null;
      return decryptWithEntropy(parsed, sessionEntropy);
    } catch {
      return null;
    }
  };

  const withApiKey = async <T>(
    getPlaintextApiKey: ApiKeyGetter,
    fn: (apiKey: string) => Promise<T>,
  ): Promise<T> => {
    const plaintext = (await getPlaintextApiKey())?.trim() ?? '';
    if (!plaintext) {
      if (allowEmpty) return fn('');
      throw new Error(missingKeyMessage);
    }

    const started = await init(getPlaintextApiKey);
    if (!started.ok) throw new Error(started.error || 'API 키 세션을 초기화할 수 없습니다.');

    const apiKey = await decryptSessionApiKey();
    if (!apiKey) {
      clear();
      const retry = await init(getPlaintextApiKey);
      if (!retry.ok) throw new Error(retry.error || 'API 키 세션을 초기화할 수 없습니다.');
      const retryKey = await decryptSessionApiKey();
      if (!retryKey) {
        if (allowEmpty) return fn('');
        throw new Error('API 키를 복호화할 수 없습니다.');
      }
      return fn(retryKey);
    }
    return fn(apiKey);
  };

  return { clear, init, withApiKey };
}

const geminiSession = createApiKeySession({
  storageKey: 's3haim-gemini-api-key-session',
  missingKeyMessage:
    'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
});

const openaiCompatibleSession = createApiKeySession({
  storageKey: 's3haim-openai-compatible-api-key-session',
  missingKeyMessage:
    'OpenAI 호환 API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
  allowEmpty: true,
});

export const clearGeminiApiKeySession = geminiSession.clear;
export const initGeminiApiKeySession = geminiSession.init;
export const withGeminiApiKey = geminiSession.withApiKey;

export const clearOpenAiCompatibleApiKeySession = openaiCompatibleSession.clear;
export const initOpenAiCompatibleApiKeySession = openaiCompatibleSession.init;
export const withOpenAiCompatibleApiKey = openaiCompatibleSession.withApiKey;
