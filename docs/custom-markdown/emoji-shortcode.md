# Emoji shortcode (`:name:`)

GitHub-style shortcodes that render as native emoji glyphs.

## 문법

```markdown
Done :cross_mark: :white_check_mark: :smile:
```

- Form: `:name:` where `name` is `[a-zA-Z0-9_+-]+`
- Unknown names stay literal (`:not_a_real_emoji:`)
- Inside inline code / fenced code: **not** converted (`:cross_mark:` stays text)

Vault markdown keeps the shortcode form. Haim WYSIWYG shows an emoji atom; serialize writes `:canonical_name:` (or an alias shortcode that TipTap stored).

## Spec (interop)

### 1. Grammar

```
shortcode = ":" name ":"
name      = 1*( ALPHA / DIGIT / "_" / "+" / "-" )
```

Case-sensitive match against the GitHub emoji shortcode set (same catalog as TipTap `gitHubEmojis`).

### 2. Parse algorithm

1. Scan **prose text** only (not `code_inline`, not fenced `code` / `pre` bodies).
2. For each `:name:`:
   - If `name` is a known shortcode or canonical emoji id → replace with the native emoji string (or editor atom).
   - Else leave the literal `:name:` unchanged.
3. Prefer the leftmost non-overlapping match; do not nest.
4. Emoticons like `:-)` are optional editor input helpers, **not** part of this vault shortcode contract.

### 3. Canonical output

| Layer | Output |
|-------|--------|
| Vault / source markdown | `:name:` (shortcode text) |
| Preview / print HTML | Unicode emoji character in a text node (no wrapper required) |
| Haim TipTap | `emoji` inline atom (`span[data-type="emoji"]`) |

### 4. Non-goals

- Custom vault emoji image packs
- Skin-tone modifiers in the shortcode grammar (use catalog entries that already include them)
- Replacing arbitrary Unicode emoji back to shortcodes on save (optional; Haim may keep typed Unicode as-is)

## 구현

| 역할 | 경로 |
|------|------|
| Shared resolve | `src/utils/emojiShortcode.ts` |
| markdown-it preview | `src/utils/emojiShortcodeMarkdownIt.ts` + `appMarkdownItPlugins.ts` |
| Haim TipTap | `src/components/haimEditor/extensions/HaimEmoji.ts` (`markdownTokenizer` + `parseMarkdown`) |
| Catalog | `@tiptap/extension-emoji` `gitHubEmojis` |
