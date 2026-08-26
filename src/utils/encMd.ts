import { decryptData, encryptData } from '@/utils/shared/crypto';

export type EncMdPayload = {
  ciphertext: string;
  iv: string;
  salt: string;
};

/** True when path/name is an encrypted markdown note (`.enc.md`). */
export function isEncMdPath(name: string | null | undefined): boolean {
  return String(name || '')
    .trim()
    .toLowerCase()
    .endsWith('.enc.md');
}

/**
 * Parse vault body as encryptData wire JSON. Returns null if not a payload.
 */
export function parseEncMdPayload(
  body: string | null | undefined,
): EncMdPayload | null {
  const raw = String(body ?? '').trim();
  if (!raw || raw[0] !== '{') return null;
  try {
    const parsed = JSON.parse(raw) as Partial<EncMdPayload>;
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

/** Encrypt plaintext → JSON string for `.enc.md` vault body. */
export async function encryptEncMdContent(
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

/** Decrypt `.enc.md` vault body JSON with password → plaintext. */
export async function decryptEncMdContent(
  body: string,
  password: string,
): Promise<string> {
  const pw = String(password || '').trim();
  if (!pw) throw new Error('Password required');
  const payload = parseEncMdPayload(body);
  if (!payload) throw new Error('Invalid encrypted note');
  return decryptData(pw, payload);
}

/** Session-only passwords keyed by vault-relative path (in-memory Map).
 * Never written to localStorage, sessionStorage, or IndexedDB. */
const encMdPasswordByPath = new Map<string, string>();

function normalizeEncMdPathKey(path: string | null | undefined): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .trim();
}

export function setEncMdPassword(
  path: string,
  password: string,
): void {
  const key = normalizeEncMdPathKey(path);
  const pw = String(password || '').trim();
  if (!key || !pw) return;
  encMdPasswordByPath.set(key, pw);
}

export function getEncMdPassword(path: string | null | undefined): string | null {
  const key = normalizeEncMdPathKey(path);
  if (!key) return null;
  return encMdPasswordByPath.get(key) || null;
}

export function clearEncMdPassword(path: string | null | undefined): void {
  const key = normalizeEncMdPathKey(path);
  if (!key) return;
  encMdPasswordByPath.delete(key);
}

export function clearAllEncMdPasswords(): void {
  encMdPasswordByPath.clear();
}

/**
 * Decrypt vault ciphertext for editor open.
 * Uses session password when present; otherwise returns need-password.
 */
export async function tryUnlockEncMdContent(
  path: string,
  ciphertext: string,
): Promise<
  | { status: 'plain'; text: string }
  | { status: 'unlocked'; text: string }
  | { status: 'need-password'; ciphertext: string }
> {
  if (!isEncMdPath(path)) {
    return { status: 'plain', text: String(ciphertext ?? '') };
  }
  const raw = String(ciphertext ?? '');
  const pw = getEncMdPassword(path);
  if (!pw) {
    return { status: 'need-password', ciphertext: raw };
  }
  try {
    const text = await decryptEncMdContent(raw, pw);
    return { status: 'unlocked', text };
  } catch {
    clearEncMdPassword(path);
    return { status: 'need-password', ciphertext: raw };
  }
}

/** Encrypt editor plaintext for vault write when path is `.enc.md`. */
export async function prepareEncMdVaultBody(
  path: string,
  plaintext: string,
  password?: string | null,
): Promise<string> {
  if (!isEncMdPath(path)) return String(plaintext ?? '');
  const pw = String(password || getEncMdPassword(path) || '').trim();
  if (!pw) throw new Error('Password required');
  setEncMdPassword(path, pw);
  return encryptEncMdContent(plaintext, pw);
}

/** Advanced Search: never index ciphertext as body. */
export function indexableEncMdBody(
  path: string,
  text: string,
): string {
  if (isEncMdPath(path)) return '';
  return String(text ?? '');
}
