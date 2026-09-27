import { decryptData, encryptData } from '@/utils/crypto';

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
 * Editor fields after the user dismisses the unlock prompt for `.enc.md`.
 * Keeps ciphertext so "view as text" / "enter password" can continue.
 */
export function buildLockedEncMdEditorFile(base: {
  type: string;
  id: string;
  name: string;
  ciphertext: string;
  size?: number | null;
  lastModified?: unknown;
  handle?: unknown;
  parentHandle?: unknown;
}): {
  type: string;
  id: string;
  name: string;
  content: string;
  viewer: 'unsupported';
  encMd: true;
  encMdLocked: true;
  size?: number | null;
  lastModified?: unknown;
  handle?: unknown;
  parentHandle?: unknown;
} {
  const content = String(base.ciphertext ?? '');
  return {
    type: base.type,
    id: base.id,
    name: base.name,
    content,
    viewer: 'unsupported',
    encMd: true,
    encMdLocked: true,
    ...(base.size != null ? { size: base.size } : {}),
    ...(base.lastModified != null ? { lastModified: base.lastModified } : {}),
    ...(base.handle != null ? { handle: base.handle } : {}),
    ...(base.parentHandle != null ? { parentHandle: base.parentHandle } : {}),
  };
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

/**
 * Decrypt with the current password and re-encrypt with a new password.
 * Does not touch the session password map — caller commits after vault write.
 */
export async function reencryptEncMdContent(
  ciphertext: string,
  currentPassword: string,
  newPassword: string,
): Promise<{ plaintext: string; vaultBody: string }> {
  const current = String(currentPassword || '').trim();
  const next = String(newPassword || '').trim();
  if (!current) throw new Error('Password required');
  if (!next) throw new Error('Password required');
  if (current === next) {
    throw new Error('새 비밀번호가 현재 비밀번호와 같습니다.');
  }
  const plaintext = await decryptEncMdContent(ciphertext, current);
  const vaultBody = await encryptEncMdContent(plaintext, next);
  return { plaintext, vaultBody };
}

/** Advanced Search: never index ciphertext as body. */
export function indexableEncMdBody(
  path: string,
  text: string,
): string {
  if (isEncMdPath(path)) return '';
  return String(text ?? '');
}

/** Rename crossing `.md` ↔ `.enc.md` (encrypt / decrypt), or none. */
export type EncMdRenameKind = 'none' | 'encrypt' | 'decrypt';

export function getEncMdRenameKind(
  oldPathOrName: string | null | undefined,
  newPathOrName: string | null | undefined,
): EncMdRenameKind {
  const fromEnc = isEncMdPath(oldPathOrName);
  const toEnc = isEncMdPath(newPathOrName);
  if (fromEnc === toEnc) return 'none';
  return toEnc ? 'encrypt' : 'decrypt';
}

/** Move session password when an `.enc.md` path is renamed without mode change. */
export function relocateEncMdPassword(
  oldPath: string | null | undefined,
  newPath: string | null | undefined,
): void {
  const from = normalizeEncMdPathKey(oldPath);
  const to = normalizeEncMdPathKey(newPath);
  if (!from || !to || from === to) return;
  const pw = encMdPasswordByPath.get(from);
  if (!pw) return;
  encMdPasswordByPath.set(to, pw);
  encMdPasswordByPath.delete(from);
}

export type EncMdPasswordRequestFn = (opts: {
  title?: string;
  message?: string;
  confirmLabel?: string;
}) => Promise<string>;

export type EncMdRenameWriteResult = {
  kind: 'encrypt' | 'decrypt';
  /** Text/JSON body to write at the new vault path. */
  vaultBody: string;
  /** Editor plaintext after the conversion. */
  plaintext: string;
  /** Password entered for this conversion (commit after vault write succeeds). */
  password: string;
};

/**
 * Apply session password changes after a successful enc-mode rename write.
 */
export function commitEncMdRenamePasswords(
  result: EncMdRenameWriteResult,
  oldPath: string,
  newPath: string,
): void {
  if (result.kind === 'encrypt') {
    clearEncMdPassword(oldPath);
    setEncMdPassword(newPath, result.password);
    return;
  }
  clearEncMdPassword(oldPath);
  clearEncMdPassword(newPath);
}

/**
 * When renaming across `.md` ↔ `.enc.md`, prompt for a password and build the
 * vault body to write *before* the rename commit. Returns null when there is
 * no enc-mode change (caller may copy/move as usual). For same-mode `.enc.md`
 * renames, relocates the session password immediately (path-only identity change).
 *
 * Throws `Error('cancelled')` if the password prompt is dismissed.
 * Call `commitEncMdRenamePasswords` after the vault write succeeds.
 */
export async function prepareEncMdRenameWrite(options: {
  oldPath: string;
  newPath: string;
  /** Known plaintext (open editor). Preferred write source when present. */
  plaintext?: string | null;
  /** Read current vault object text (ciphertext or plain). */
  readVaultText: () => Promise<string>;
  requestPassword: EncMdPasswordRequestFn;
}): Promise<EncMdRenameWriteResult | null> {
  const kind = getEncMdRenameKind(options.oldPath, options.newPath);
  if (kind === 'none') return null;

  const hasPlain =
    options.plaintext != null && typeof options.plaintext === 'string';

  if (kind === 'encrypt') {
    const plain = hasPlain
      ? String(options.plaintext)
      : await options.readVaultText();
    const password = await options.requestPassword({
      title: '암호화해서 이름 변경',
      message:
        '이 노트를 .enc.md로 바꾸려면 비밀번호를 입력하세요.\n같은 비밀번호로만 다시 열 수 있습니다.',
      confirmLabel: '암호화',
    });
    const vaultBody = await encryptEncMdContent(plain, password);
    return { kind: 'encrypt', vaultBody, plaintext: plain, password };
  }

  const password = await options.requestPassword({
    title: '복호화해서 이름 변경',
    message: '이 노트를 일반 .md로 바꾸려면 비밀번호를 입력하세요.',
    confirmLabel: '복호화',
  });
  const vaultText = await options.readVaultText();
  let decrypted: string;
  try {
    decrypted = await decryptEncMdContent(vaultText, password);
  } catch {
    const sessionPw = getEncMdPassword(options.oldPath);
    if (hasPlain && sessionPw && sessionPw === String(password || '').trim()) {
      decrypted = String(options.plaintext);
    } else {
      throw new Error(
        '비밀번호가 올바르지 않거나 파일을 복호화할 수 없습니다.',
      );
    }
  }
  const plaintext = hasPlain ? String(options.plaintext) : decrypted;
  return { kind: 'decrypt', vaultBody: plaintext, plaintext, password };
}
