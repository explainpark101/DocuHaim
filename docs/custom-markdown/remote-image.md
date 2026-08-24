# Remote image (`<!-- remote-image … -->`)

Caches a public HTTPS image URL (typically ImgBB) as an HTML comment **immediately before** a wiki image, standard markdown image, or Mermaid fence. The original source markup stays unchanged; the comment is metadata for blog/formatted HTML copy so the same asset is not re-uploaded.

## Syntax

```markdown
<!-- remote-image url="https://i.ibb.co/….png" hash="a1b2c3…" -->
![[photos/cover.jpg|w=480]]

<!-- remote-image url="https://i.ibb.co/….png" hash="d4e5f6…" -->
![alt](data:image/png;base64,…)

<!-- remote-image url="https://i.ibb.co/….png" hash="789abc…" -->
```mermaid
flowchart TD
  A --> B
```
```

- Comment may be separated from the target by optional blank / whitespace-only lines.
- Editor preview still hydrates vault paths / live Mermaid / inline `data:` — it does **not** swap to the remote URL.

## Spec (interop)

기준 구현: `src/utils/remoteImageComment.ts`.

### 1. Grammar

```text
REMOTE_IMAGE := "<!--" WS "remote-image" WS ATTRS "-->"
ATTRS        := ( WS KEY "=" '"' VALUE '"' )*
KEY          := /[\w-]+/
VALUE        := /[^"]*/   # after unescape on read
```

Regex (attr region):

```js
/<!--\s*remote-image\s+([^>]*?)-->/gi
```

Attrs are parsed with `/([\w-]+)="([^"]*)"/g`.

**Required attrs:** `url`, `hash`.

**Write escape** (same as chat HTML comments): `&` → `&amp;`, `"` → `&quot;`, `<` → `&lt;`, newlines → `&#10;`.

**Read unescape:** reverse `&#10;`, `&lt;`, `&quot;`, `&amp;`.

Canonical serialize:

```text
<!-- remote-image url="{escapedUrl}" hash="{escapedHash}" -->
```

### 2. Placement

Immediately before one of:

| Target | Match |
|--------|--------|
| Wiki image | `![[path\|opts]]` |
| Markdown image | `![alt](src){optional attrs}` |
| Mermaid fence | opening line ` ```mermaid ` … closing ` ``` ` |

Optional blank lines between comment and target are allowed. On write, insert one trailing newline after the comment when creating a new sidecar.

### 3. `url`

Absolute `https://…` only. Non-https → treat comment as absent (ignore).

### 4. `hash`

Fingerprint of the **source key** (not the remote file bytes):

| Kind | Key |
|------|-----|
| wiki | wiki path (before `\|` options) |
| markdown / base64 | image `src` string (including `data:`) |
| mermaid | fence body (trim trailing whitespace) |

Algorithm: SHA-256 hex truncated to 24 chars when `crypto.subtle` is available (same as `hashText` in `src/utils/advancedSearch/hash.ts`); otherwise FNV-1a fallback from that helper.

Occurrence: when the same key appears multiple times, the Nth target (0-based) pairs with the comment immediately preceding that occurrence.

### 5. Reuse / upsert

1. Locate target by kind + key + occurrence.
2. If a valid preceding comment exists and `hash` matches current key hash → reuse `url` (no upload).
3. Else upload → upsert comment (replace attrs if comment already present; else insert).

### 6. Non-goals

- Does not replace preview rendering with the remote URL.
- Does not migrate legacy `![[https://…]]` notes back to vault + comment.
- Not a leading document-meta stack entry (`note-cover` / `footnotes` / `document-settings`).

## Options / attrs

| Attr | Required | Notes |
|------|----------|--------|
| `url` | yes | `https://` ImgBB (or other) display URL |
| `hash` | yes | source-key fingerprint |

## Implementation

| Role | Path |
|------|------|
| Parse / upsert / lookup | `src/utils/remoteImageComment.ts` |
| ImgBB convert (sidecar) | `MarkdownEditor` / Novel / Export PDF convert handlers |
| Formatted HTML copy | `EditorPane` + `imgbbCopyCandidates` |
| Hash helper | `src/utils/advancedSearch/hash.ts` |

See also: [wiki-image.md](./wiki-image.md).
