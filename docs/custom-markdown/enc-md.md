# Encrypted markdown (`.enc.md`)

Vault note files with the **`.enc.md`** extension store password-encrypted markdown. Plaintext never lives on disk; the editor holds plaintext only after unlock (session password cache).

## Syntax (overview)

- File name must end with `.enc.md` (case-insensitive).
- Create via **새 파일** → format badge **`.enc.md`**, or type a name that already ends with `.enc.md`.
- Body on disk is a single JSON object (AES-GCM wire format).

## Spec (interop)

### 1. File name

```text
ENC_MD_NAME := STEM ".enc.md"   # STEM has no trailing registered create-file extension
```

Detection: path/name lowercased ends with `.enc.md` (`isEncMdPath`).

Still treated as markdown for the editor viewer (last segment is `md`).

### 2. Wire body (canonical)

Same password-based payload as chat encrypted messages / `encryptData`:

```json
{ "ciphertext": "<base64>", "iv": "<base64>", "salt": "<base64>" }
```

- `salt`: 16 bytes, PBKDF2 (SHA-256, 100000 iterations) → AES-GCM-256 key
- `iv`: 12 bytes
- `ciphertext`: AES-GCM ciphertext (includes auth tag)

UTF-8 plaintext markdown ↔ encrypt/decrypt with user password. Empty note at create time encrypts `""`.

### 3. Lifecycle

1. **Create** — Prompt password → write encrypted empty body → open unlocked in editor (in-memory session stores password for path only).
2. **Open** — Read ciphertext → if no session password, PromptModal → decrypt → editor plaintext. Any leftover memo drafts for the path are deleted.
3. **Save** — **Manual save only** (no 5s debounce, no tab/window auto-save, no idle remote auto-sync into the editor). Encrypt with session password (or prompt) → write JSON to vault. Failures do **not** write plaintext to IndexedDB drafts or pending-upload queues.
4. **Close tab** — Drop in-memory password for that path.

Password storage: **RAM Map only** — never localStorage / sessionStorage / IndexedDB.

### 4. Non-goals

- Server-side encryption / WebAuthn PRF for note files
- Indexing ciphertext as searchable body (Advanced Search indexes filename only; body empty)
- Automatic conversion between `.md` and `.enc.md`
- Auto-save, idle remote auto-sync into the editor, or offline draft recovery for `.enc.md` plaintext

## Options / attrs

N/A (extension + JSON body only). Create-file badge metadata lives in `CREATE_FILE_FORMATS` (`id: 'enc.md'`).

## Implementation

| Role | Path |
|------|------|
| Detect / encrypt / session password | `src/utils/encMd.ts` |
| Create-file formats + badges | `src/utils/createFileFormats.ts`, `CreateItemModal.jsx` |
| Path resolve | `src/utils/createItemPath.ts` |
| Crypto primitive | `src/utils/crypto.js` (`encryptData` / `decryptData`) |
| Open (S3/WebDAV helper) | `src/utils/storage/openPathFileFromBackend.js` |
| Create / open / save UI | `src/App.jsx` + `PromptModal` |
| Tree lock icon | `src/components/TreeNode.jsx` |
| AS index skip body | `src/utils/advancedSearch/engine.ts` via `indexableEncMdBody` |
| Agent rule for new formats | `.cursor/rules/create-file-formats.mdc` |
