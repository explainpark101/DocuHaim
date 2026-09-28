# Docuhaim note link (`docuhaim://`)

Haim Editor / 노트 Markdown용 vault 노트 하이퍼링크. 표준 링크 문법을 유지하고, `href`만 앱 전용 스킴을 쓴다.

채팅 `[[note:]]` 와는 별개다.

## 문법

```markdown
[회의록](docuhaim://notes/meeting.md)
[표지](docuhaim://folder/file%20name.md)
```

- 스킴 접두사: 정확히 `docuhaim://` (대소문자 무시)
- 표시 텍스트는 일반 Markdown 링크와 동일

## Spec (interop)

다른 Markdown 엔진에 포팅할 때의 계약. 기준 구현: `src/utils/docuhaimLink.ts` + `resolvePreviewHref` + Haim `HaimLink`.

### 1. Grammar

```text
DOCUHAIM_LINK := "[" link-text "]" "(" DOCUHAIM_HREF ")"
DOCUHAIM_HREF := "docuhaim://" PATH_BODY   # scheme case-insensitive
PATH_BODY     := /.*/   # do NOT parse as URL host/path
```

Do **not** use a URL parser that treats `docuhaim://a/b.md` as host=`a`, path=`/b.md`. Everything after `docuhaim://` is the vault storage path body.

### 2. Normalize path body

Given `PATH_BODY`:

1. `trim`
2. `decodeURIComponent` (on failure, keep raw)
3. Replace `\` → `/`
4. Strip leading `/`
5. Empty → invalid (no in-app open)

### 3. Build href

Given vault storage path `P`:

1. Normalize as above
2. Split on `/`, `encodeURIComponent` each segment, rejoin with `/`
3. Prefix `docuhaim://` (lowercase canonical)

### 4. Canonical HTML

```html
<a href="docuhaim://notes/meeting.md" rel="noopener noreferrer" target="_blank">회의록</a>
```

`target` / `rel` may follow the host editor’s link defaults; click handlers must still intercept `docuhaim://` before a browser custom-scheme navigation.

### 5. Click → in-app open

1. Read `href` from mark attributes first (prefer over DOM `HTMLAnchorElement.href`, which can rewrite schemes).
2. If `parseDocuhaimHref(href)` yields path `V`:
   - Open vault note `V` in-app (equivalent to navigating `/view/{V}`).
   - Do **not** `window.open` the custom scheme.
3. Editable surfaces may require Ctrl/Cmd+click or an “open on click” setting for non-docuhaim links; `docuhaim://` in **read-only / preview** must open on plain click.

### 6. Non-goals

- Chat `[[note:…]]` shortcode
- Relative `.md` links without the `docuhaim://` scheme (those use existing relative `/view` resolution)
- Opening in an external OS handler for the custom scheme

### 7. Presentation — note icon (optional)

When Settings 「노트 링크 아이콘」 is on (default), preview/WYSIWYG may show a leading note icon via CSS (`::before`). This is presentation-only and must **not** appear in stored Markdown.

## Implementation

| Role | Path |
|------|------|
| URI helpers | `src/utils/docuhaimLink.ts` |
| Preview / classic MD click | `src/utils/appHref.ts` (`resolvePreviewHref`) |
| TipTap link + click | `src/components/haimEditor/extensions/HaimLink.ts` |
| Open bridge | `src/utils/haimOpenViewPath.ts` (registered from `HaimEditor`) |
| Insert UI | `HaimUrlLinkModal` / `DocuhaimNoteLinkModal` + toolbar 「링크」 submenu (URL 링크 / 노트 링크) |
| Insert range | `src/utils/haimEditorInsertRange.ts` — last focused caret, else document end; modal 「최하단에 추가」 |
| Note icon | `src/styles/docuhaim-link-icon.css` + `haimDocuhaimLinkIconSettings` (Settings / AS, default on; presentation only) |
