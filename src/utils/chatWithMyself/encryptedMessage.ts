import { decryptData, encryptData } from '@/utils/crypto';

/** User-facing label when ciphertext is locked. */
export const ENCRYPTED_MESSAGE_LABEL = '암호화된 메시지';

export type ChatEncryptedPayload = {
  ciphertext: string;
  iv: string;
  salt: string;
};

/**
 * True when message is marked encrypted (attr or boolean).
 * @param {{ encrypted?: unknown } | null | undefined} msg
 */
export function isChatMessageEncrypted(
  msg: { encrypted?: unknown } | null | undefined,
): boolean {
  const v = msg?.encrypted;
  return v === true || v === '1' || v === 'true';
}

/**
 * Parse body as encryptData wire JSON. Returns null if not a payload.
 */
export function parseEncryptedChatPayload(
  body: string | null | undefined,
): ChatEncryptedPayload | null {
  const raw = String(body ?? '').trim();
  if (!raw || raw[0] !== '{') return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ChatEncryptedPayload>;
    if (
      typeof parsed?.ciphertext !== 'string' ||
      typeof parsed?.iv !== 'string' ||
      typeof parsed?.salt !== 'string' ||
      !parsed.ciphertext ||
      !parsed.iv ||
      !parsed.salt
    ) {
      return null;
    }
    return {
      ciphertext: parsed.ciphertext,
      iv: parsed.iv,
      salt: parsed.salt,
    };
  } catch {
    return null;
  }
}

/** Encrypt plaintext → JSON string for chat-msg body. */
export async function encryptChatMessageBody(
  plaintext: string,
  password: string,
): Promise<string> {
  const pw = String(password || '').trim();
  if (!pw) throw new Error('Password required');
  const encrypted = await encryptData(pw, String(plaintext ?? ''));
  return JSON.stringify({
    ciphertext: encrypted.ciphertext,
    iv: encrypted.iv,
    salt: encrypted.salt,
  });
}

/** Decrypt chat-msg body JSON with password → plaintext. */
export async function decryptChatMessageBody(
  body: string,
  password: string,
): Promise<string> {
  const pw = String(password || '').trim();
  if (!pw) throw new Error('Password required');
  const payload = parseEncryptedChatPayload(body);
  if (!payload) throw new Error('Invalid encrypted message');
  return decryptData(pw, payload);
}
