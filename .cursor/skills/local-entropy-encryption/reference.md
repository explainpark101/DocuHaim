# Local Entropy Encryption — Implementation Reference

## 암호화/복호화 유틸 (Web Crypto)

```javascript
async function deriveKey(entropy, salt = new Uint8Array(16)) {
  const baseKey = await crypto.subtle.importKey(
    'raw', entropy, 'PBKDF2', false, ['deriveBits', 'deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
  );
}

async function encryptWithEntropy(plaintext, entropy) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(entropy, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv }, key, encoded
  );
  return { salt: Array.from(salt), iv: Array.from(iv), cipher: Array.from(new Uint8Array(cipher)) };
}

async function decryptWithEntropy(encrypted, entropy) {
  const key = await deriveKey(entropy, new Uint8Array(encrypted.salt));
  const dec = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(encrypted.iv) },
    key, new Uint8Array(encrypted.cipher)
  );
  return new TextDecoder().decode(dec);
}
```

## 파라미터

| 항목 | 값 | 비고 |
|------|-----|------|
| PBKDF2 iterations | 100000 | entropy 강화용 |
| PBKDF2 hash | SHA-256 | |
| Salt 길이 | 16 bytes | 암호화 시 매번 랜덤 |
| IV 길이 | 12 bytes | AES-GCM 권장 |
| 대칭키 | AES-GCM 256-bit | deriveKey로 유도 |

## 입출력

- **entropy**: `Uint8Array` (예: 32바이트). 호출자가 WebAuthn PRF, PBKDF2(비밀번호) 등으로 생성해 전달.
- **encryptWithEntropy(plaintext, entropy)**: `plaintext`는 문자열. 반환값은 `{ salt, iv, cipher }` (각각 number[]), JSON 직렬화 가능.
- **decryptWithEntropy(encrypted, entropy)**: `encrypted`는 위 구조 객체. 반환값은 복호화된 문자열.
