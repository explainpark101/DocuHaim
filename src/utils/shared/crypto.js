const bufToBase64 = (buf) =>
  btoa(Array.from(new Uint8Array(buf)).map((b) => String.fromCharCode(b)).join(''));

const base64ToBuf = (b64) =>
  new Uint8Array(
    atob(b64)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );

const generateKey = async (password, salt) => {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
};

// --- Local entropy encryption (see .cursor/skills/local-entropy-encryption) ---

export async function deriveKey(entropy, salt = new Uint8Array(16)) {
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    entropy instanceof Uint8Array ? entropy : new Uint8Array(entropy),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  );
  const saltBuf = salt instanceof Uint8Array ? salt : new Uint8Array(salt);
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: saltBuf, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptWithEntropy(plaintext, entropy) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(entropy, salt);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const cipher = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded,
  );
  return {
    salt: Array.from(salt),
    iv: Array.from(iv),
    cipher: Array.from(new Uint8Array(cipher)),
  };
}

export async function decryptWithEntropy(encrypted, entropy) {
  const key = await deriveKey(entropy, new Uint8Array(encrypted.salt));
  const dec = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encrypted.iv) },
    key,
    new Uint8Array(encrypted.cipher),
  );
  return new TextDecoder().decode(dec);
}

/** PBKDF2(password, salt) → 256-bit entropy for use with encryptWithEntropy/decryptWithEntropy. */
export async function deriveEntropyFromPassword(password, salt) {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const saltBuf = salt instanceof Uint8Array ? salt : new Uint8Array(salt);
  const bits = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: saltBuf, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  return new Uint8Array(bits);
}

// --- Password-based (export/import only; wire format: base64 salt/iv/ciphertext) ---

export const encryptData = async (password, dataStr) => {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await generateKey(password, salt);
  const enc = new TextEncoder();

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(dataStr),
  );

  return {
    ciphertext: bufToBase64(ciphertext),
    iv: bufToBase64(iv),
    salt: bufToBase64(salt),
  };
};

export const decryptData = async (password, encryptedObj) => {
  const salt = base64ToBuf(encryptedObj.salt);
  const iv = base64ToBuf(encryptedObj.iv);
  const ciphertext = base64ToBuf(encryptedObj.ciphertext);
  const key = await generateKey(password, salt);

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext,
  );

  return new TextDecoder().decode(decrypted);
};

