---
name: local-entropy-encryption
description: Encrypts and decrypts sensitive data locally using Web Crypto API with entropy (e.g. from WebAuthn PRF or PBKDF2). AES-GCM with PBKDF2 key derivation, vanilla JS only. Use when implementing client-side encryption, API key protection, or entropy-based secret storage without sending secrets to the server.
---

# Local Entropy-Based Encryption (Web Crypto)

브라우저에서 **entropy**(바이트 배열)만으로 평문을 암호화·복호화합니다. entropy는 WebAuthn PRF, PBKDF2 등으로 외부에서 만들어 전달받습니다. 서버로 비밀을 보내지 않습니다.

## 원칙

- **Vanilla JS**: `crypto.subtle`만 사용, 외부 라이브러리 없음
- **보안 컨텍스트**: HTTPS 또는 localhost에서만 동작
- **Entropy**: 암호화/복호화 키의 원천은 호출자가 제공 (이 스킬은 키 유도·AES-GCM만 담당)

## API 요약

| 함수 | 역할 |
|------|------|
| `deriveKey(entropy, salt)` | entropy + salt로 PBKDF2 → AES-GCM 256비트 키 |
| `encryptWithEntropy(plaintext, entropy)` | 평문 암호화 → `{ salt, iv, cipher }` |
| `decryptWithEntropy(encrypted, entropy)` | `{ salt, iv, cipher }` → 평문 |

## Wire 형식

암호화 결과는 다음 구조의 JSON 호환 객체입니다.

```javascript
{ salt: number[], iv: number[], cipher: number[] }
```

- `salt`: 16바이트, PBKDF2용 (매 암호화마다 랜덤)
- `iv`: 12바이트, AES-GCM용 (매 암호화마다 랜덤)
- `cipher`: 암호문 바이트 배열

## 사용 예

```javascript
// entropy는 예: WebAuthn PRF 결과 또는 PBKDF2(비밀번호) 출력
const entropy = new Uint8Array(32); // 실제로는 PRF/deriveBits 등으로 생성

const encrypted = await encryptWithEntropy('my-secret-api-key', entropy);
// 저장: JSON.stringify(encrypted)

const decrypted = await decryptWithEntropy(encrypted, entropy);
// decrypted === 'my-secret-api-key'
```

## 상세 구현

전체 코드 및 PBKDF2 반복 횟수·해시 등은 [reference.md](reference.md) 참고.
