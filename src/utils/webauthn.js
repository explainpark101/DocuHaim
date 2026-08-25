/**
 * WebAuthn PRF for passkey-based unlock (fingerprint, Windows Hello, etc.).
 * Uses @simplewebauthn/browser for registration and buffer helpers; PRF auth uses raw get() for binary salt.
 *
 * Safari: startRegistration/startAuthentication must be invoked from a native click with no async work
 * (no await, no fetch) before the call. See https://simplewebauthn.dev/docs/advanced/browser-quirks
 *
 * Tauri desktop: WebView WebAuthn is unreliable — route through native biometry
 * (Touch ID / Windows Hello) via desktopBiometricUnlock.
 */

import {
  startRegistration,
  browserSupportsWebAuthn,
  base64URLStringToBuffer,
  bufferToBase64URLString,
} from '@simplewebauthn/browser';

export { browserSupportsWebAuthn } from '@simplewebauthn/browser';
import { encryptWithEntropy, decryptWithEntropy } from '@/utils/crypto';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  disableDesktopBiometricUnlock,
  enableDesktopBiometricUnlock,
  getDesktopBiometryMarker,
  isDesktopBiometricAvailable,
  loadCredsWithDesktopBiometric,
  saveCredsWithDesktopBiometric,
  unlockWithDesktopBiometric,
  updateDesktopBiometricWrappedPassword,
} from '@/utils/desktopBiometricUnlock';
import { hasDesktopStoredCredsMarker } from '@/utils/desktopStrongholdSecrets';

const S3HAIM_PRF_INFO = new TextEncoder().encode('S3 Haim Master Password Wrap V1');
const S3HAIM_CREDS_INFO = new TextEncoder().encode('S3 Haim Creds Encryption V1');
const WEB_AUTHN_STORAGE_KEY = 's3NotesWebAuthn';
const ENCRYPTED_STORAGE_KEY = 's3NotesEncrypted';

function bufToBase64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function base64ToBuf(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
}

function getRpId() {
  if (typeof window === 'undefined' || !window.location?.hostname) return 'localhost';
  return window.location.hostname;
}

/**
 * 패스키 저장 시 표시할 사용자 식별용 문자열.
 * 현재 페이지 URL(호스트·경로)을 반영해, 어느 배포에서 쓰는 패스키인지 구분되게 한다.
 * e.g. explainpark101.github.io/s3haim → name: s3haim@explainpark101.github.io, displayName: Docu Haim (explainpark101.github.io/s3haim)
 * HKDF info strings above stay "S3 Haim … V1" for crypto compatibility.
 */
function getWebAuthnUserDisplay() {
  const host = getRpId();
  const pathname =
    typeof window !== 'undefined' && window.location?.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '';
  const name = `s3haim@${host}`;
  const displayName = pathname ? `Docu Haim (${host}${pathname})` : `Docu Haim (${host})`;
  return { name, displayName };
}

function randomBytes(length) {
  return crypto.getRandomValues(new Uint8Array(length));
}

function challengeBase64URL() {
  return bufferToBase64URLString(randomBytes(32));
}

export async function isWebAuthnPRFSupported() {
  // Tauri shells use native biometry (desktop plugin-biometry / Android plugin-biometric), not browser PRF.
  if (isDesktopApp()) {
    return isDesktopBiometricAvailable();
  }
  if (!(await browserSupportsWebAuthn())) return false;
  if (!window.PublicKeyCredential || typeof PublicKeyCredential.getClientCapabilities !== 'function') return false;
  try {
    const caps = await PublicKeyCredential.getClientCapabilities('public-key');
    return caps?.extensions?.includes?.('prf') === true;
  } catch {
    return false;
  }
}

/**
 * True if WebAuthn save option should be shown.
 * Uses PRF when detectable; falls back to basic WebAuthn so browsers that support passkeys
 * but lack getClientCapabilities() (or don't list 'prf') still show the option. Actual save
 * will fail with a clear error if PRF is not supported.
 * On Tauri (desktop + Android), only native biometry counts — never browser passkeys/PRF.
 */
export async function isWebAuthnAvailableForSave() {
  if (isDesktopApp()) {
    return isDesktopBiometricAvailable();
  }
  if (await isWebAuthnPRFSupported()) return true;
  return browserSupportsWebAuthn();
}

/**
 * Derive AES-GCM key from PRF 32-byte output using HKDF (for password wrap only).
 */
async function deriveWrapKey(prfOutput) {
  const masterKey = await crypto.subtle.importKey(
    'raw',
    prfOutput,
    'HKDF',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      salt: new Uint8Array(0),
      hash: 'SHA-256',
      info: S3HAIM_PRF_INFO,
    },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Legacy: derive AES-GCM key for old webauthn blob format (iv/ciphertext base64). */
async function deriveCredsKey(prfOutput) {
  const masterKey = await crypto.subtle.importKey(
    'raw',
    prfOutput,
    'HKDF',
    false,
    ['deriveKey'],
  );
  return crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      salt: new Uint8Array(0),
      hash: 'SHA-256',
      info: S3HAIM_CREDS_INFO,
    },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Legacy decrypt for old webauthn blob format (iv, ciphertext base64). */
async function decryptCredsWithPRFKeyLegacy(prfKeyOutput, blob) {
  const key = await deriveCredsKey(prfKeyOutput);
  const iv = base64ToBuf(blob.iv);
  const ciphertext = base64ToBuf(blob.ciphertext);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(decrypted);
}

/**
 * Create a passkey with PRF enabled via @simplewebauthn/browser.
 * Returns credentialId (base64url) and salt (base64) for later get().
 */
export async function createPasskeyWithPRF() {
  const rpId = getRpId();
  const challenge = challengeBase64URL();
  const userId = bufferToBase64URLString(randomBytes(16));
  const salt = randomBytes(32);
  const { name: userName, displayName: userDisplayName } = getWebAuthnUserDisplay();

  const optionsJSON = {
    rp: { name: 'S3 Haim', id: rpId },
    user: {
      id: userId,
      name: userName,
      displayName: userDisplayName,
    },
    challenge,
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ],
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'required',
      authenticatorAttachment: 'platform',
    },
    extensions: {
      prf: {},
    },
  };

  const credential = await startRegistration({ optionsJSON });
  const prfOut = credential?.clientExtensionResults?.prf;
  if (!prfOut?.enabled) throw new Error('이 기기에서 PRF(지문/보안 키 암호화)를 지원하지 않습니다.');

  const rawId = credential.rawId;
  const credentialIdStr = typeof rawId === 'string' ? rawId : bufferToBase64URLString(rawId);

  return {
    credentialId: credentialIdStr,
    salt: bufToBase64(salt),
  };
}

/**
 * Get PRF-derived key via getAssertion. Uses raw navigator.credentials.get so we can pass binary salt.
 */
export async function getPasskeyPRFKey(credentialId, saltBase64) {
  const rpId = getRpId();
  const challenge = randomBytes(32);
  const salt = typeof saltBase64 === 'string' ? new Uint8Array(base64ToBuf(saltBase64)) : saltBase64;

  const getOptions = {
    publicKey: {
      rpId,
      challenge,
      allowCredentials: [
        {
          type: 'public-key',
          id: base64URLStringToBuffer(credentialId),
        },
      ],
      userVerification: 'required',
      extensions: {
        prf: {
          eval: {
            first: salt,
          },
        },
      },
    },
  };

  const assertion = await navigator.credentials.get(getOptions);
  if (!assertion) throw new Error('보안 키 인증에 실패했습니다.');
  const prfResults = assertion.getClientExtensionResults?.()?.prf?.results?.first;
  if (!prfResults) throw new Error('PRF 결과를 가져올 수 없습니다.');
  return prfResults;
}

/**
 * Wrap (encrypt) master password with PRF-derived key. Returns { iv, ciphertext } base64.
 */
export async function wrapPasswordWithPRFKey(prfKeyOutput, password) {
  const key = await deriveWrapKey(prfKeyOutput);
  const iv = randomBytes(12);
  const encoded = new TextEncoder().encode(password);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  );
  return {
    iv: bufToBase64(iv),
    ciphertext: bufToBase64(ciphertext),
  };
}

/**
 * Unwrap (decrypt) master password with PRF-derived key.
 */
export async function unwrapPasswordWithPRFKey(prfKeyOutput, wrapped) {
  const key = await deriveWrapKey(prfKeyOutput);
  const iv = base64ToBuf(wrapped.iv);
  const ciphertext = base64ToBuf(wrapped.ciphertext);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(decrypted);
}

export function getStoredWebAuthn() {
  try {
    const raw = localStorage.getItem(WEB_AUTHN_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.desktopBiometry === true && (data.mode === 'password' || data.mode === 'creds')) {
      return data;
    }
    if (!data?.credentialId || !data?.salt) return null;
    return data;
  } catch {
    return null;
  }
}

export function setStoredWebAuthn(data) {
  if (!data) {
    localStorage.removeItem(WEB_AUTHN_STORAGE_KEY);
    return;
  }
  localStorage.setItem(WEB_AUTHN_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Enable WebAuthn: create passkey, get PRF key, wrap current master password, store.
 * On Tauri desktop, stores the master password in OS biometry-protected storage instead.
 */
export async function enableWebAuthnUnlock(masterPassword) {
  if (isDesktopApp()) {
    if (!(await isDesktopBiometricAvailable())) {
      throw new Error('Biometric unlock is not available in this Tauri shell.');
    }
    await enableDesktopBiometricUnlock(masterPassword);
    return;
  }
  const { credentialId, salt } = await createPasskeyWithPRF();
  const prfKey = await getPasskeyPRFKey(credentialId, salt);
  const encryptedPassword = await wrapPasswordWithPRFKey(prfKey, masterPassword);
  setStoredWebAuthn({ credentialId, salt, encryptedPassword });
}

/**
 * Unlock using WebAuthn: get assertion with PRF, derive key, unwrap password, return it.
 * On Tauri desktop, prompts Touch ID / Windows Hello and returns the stored password.
 */
export async function unlockWithWebAuthn() {
  if (getDesktopBiometryMarker()?.mode === 'password') {
    return unlockWithDesktopBiometric();
  }
  const stored = getStoredWebAuthn();
  if (!stored) throw new Error('등록된 보안 키가 없습니다.');
  const prfKey = await getPasskeyPRFKey(stored.credentialId, stored.salt);
  return unwrapPasswordWithPRFKey(prfKey, stored.encryptedPassword);
}

export function disableWebAuthnUnlock() {
  if (getDesktopBiometryMarker()) {
    void disableDesktopBiometricUnlock();
    return;
  }
  setStoredWebAuthn(null);
}

/**
 * When user changes master password, update the wrapped password so WebAuthn still works.
 */
export async function updateWebAuthnWrappedPassword(newMasterPassword) {
  if (getDesktopBiometryMarker()?.mode === 'password') {
    await updateDesktopBiometricWrappedPassword(newMasterPassword);
    return;
  }
  const stored = getStoredWebAuthn();
  if (!stored) return;
  const prfKey = await getPasskeyPRFKey(stored.credentialId, stored.salt);
  const encryptedPassword = await wrapPasswordWithPRFKey(prfKey, newMasterPassword);
  setStoredWebAuthn({ ...stored, encryptedPassword });
}

/**
 * Whether stored creds are encrypted with WebAuthn (no password).
 */
export function isStoredWithWebAuthn() {
  try {
    if (isDesktopApp()) {
      const marker = getDesktopBiometryMarker();
      return marker?.mode === 'creds' && hasDesktopStoredCredsMarker();
    }
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(ENCRYPTED_STORAGE_KEY) : null;
    if (!raw) return false;
    const data = JSON.parse(raw);
    return data?.webauthn === true && getStoredWebAuthn() != null;
  } catch {
    return false;
  }
}

/**
 * Save S3 creds using WebAuthn: create passkey if needed, encrypt with PRF entropy (local-entropy-encryption), store.
 * On Tauri desktop, encrypts with biometry-protected entropy instead of WebView PRF.
 */
export async function saveCredsWithWebAuthn(creds) {
  if (isDesktopApp()) {
    if (!(await isDesktopBiometricAvailable())) {
      throw new Error('Biometric unlock is not available in this Tauri shell.');
    }
    await saveCredsWithDesktopBiometric(creds);
    return;
  }
  let stored = getStoredWebAuthn();
  if (!stored?.credentialId || !stored.salt) {
    const created = await createPasskeyWithPRF();
    stored = { credentialId: created.credentialId, salt: created.salt };
    setStoredWebAuthn(stored);
  }
  const prfKey = await getPasskeyPRFKey(stored.credentialId, stored.salt);
  const entropy = prfKey instanceof Uint8Array ? prfKey : new Uint8Array(prfKey);
  const encrypted = await encryptWithEntropy(JSON.stringify(creds), entropy);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(ENCRYPTED_STORAGE_KEY, JSON.stringify({ ...encrypted, webauthn: true }));
  }
}

/**
 * Load S3 creds using WebAuthn (PRF assertion). Returns decrypted creds object.
 */
export async function loadCredsWithWebAuthn() {
  if (getDesktopBiometryMarker()?.mode === 'creds') {
    return loadCredsWithDesktopBiometric();
  }
  const stored = getStoredWebAuthn();
  if (!stored) throw new Error('등록된 보안 키가 없습니다.');
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(ENCRYPTED_STORAGE_KEY) : null;
  if (!raw) throw new Error('저장된 연결 정보가 없습니다.');
  const blob = JSON.parse(raw);
  if (blob?.webauthn !== true) throw new Error('보안 키로 저장된 데이터가 아닙니다.');
  const prfKey = await getPasskeyPRFKey(stored.credentialId, stored.salt);
  const entropy = prfKey instanceof Uint8Array ? prfKey : new Uint8Array(prfKey);
  let decryptedStr;
  if (Array.isArray(blob.cipher) && Array.isArray(blob.salt)) {
    decryptedStr = await decryptWithEntropy(blob, entropy);
  } else {
    decryptedStr = await decryptCredsWithPRFKeyLegacy(prfKey, blob);
  }
  return JSON.parse(decryptedStr);
}
