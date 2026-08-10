# s3haim custom Markdown

md-editor-rt / markdown-it / CommonMark **기본 문법**이 아닌, 이 앱에서 추가·확장한 문법만 모은다.

전역 플러그인 등록: `src/config/mdEditorConfig.js` (`main.jsx`에서 import).

각 feature 문서는 **문법 예시**와 함께, 다른 Markdown 파서에서도 동일하게 구현할 수 있는 **Spec (interop)** 을 포함한다.

## 문서 목록

| 문서 | 문법 | 영역 |
|------|------|------|
| [wiki-image.md](./wiki-image.md) | `![[path\|opts]]` + 캡션 | 에디터 / 미리보기 / 채팅 / 인쇄 |
| [markdown-image-attrs.md](./markdown-image-attrs.md) | `![alt](src){attrs}` | 에디터 / 미리보기 / 인쇄 |
| [page-break.md](./page-break.md) | `<pgbr/>` | 에디터 / 인쇄·PDF |
| [heading-levels.md](./heading-levels.md) | `#######` … `##########` (h7–h10) | 에디터 / Novel / 인쇄 |
| [chat-file.md](./chat-file.md) | `[[file:…]]` | 채팅 |
| [chat-note.md](./chat-note.md) | `[[note:…]]` | 채팅 |
| [chat-folder.md](./chat-folder.md) | `[[folder:…]]` | 채팅 |
| [chat-day-file-comments.md](./chat-day-file-comments.md) | `<!-- chat-msg … -->` 등 | 채팅 일별 파일 |
| [chat-saved-note.md](./chat-saved-note.md) | `<!-- chat-with-myself … -->` + 카드 | 채팅→노트 |
| [note-cover.md](./note-cover.md) | `<!-- note-cover … -->` | 인쇄 표지 |
| [haim-table.md](./haim-table.md) | `<!-- haim-table … -->` + GFM 표 | 에디터 / 미리보기 / 인쇄 / 다운로드 |
| [preview-hard-break.md](./preview-hard-break.md) | `<br/>` (Mirror Edit Enter) | 에디터 / 미리보기 |

## Spec conventions (all features)

Feature 문서의 **Spec** 섹션은 파서 중립 계약이다. markdown-it 토큰 이름은 참고용이며, 다른 엔진은 동등 AST/HTML이면 충분하다.

권장 구성:

1. **Grammar** — 정규식 / EBNF / 토큰 형태
2. **Parse algorithm** — 단계·우선순위·실패 시 동작 (리터럴로 남김 등)
3. **Value normalization** — 크기·색·escape 규칙
4. **Canonical HTML (or structured) output** — 속성명·클래스·placeholder
5. **Post-process rules** — caption fold, paragraph unwrap 등
6. **Non-goals / out of scope** — hydration URL, UI 카드 등 앱 전용 단계

공유 규칙:

| 항목 | 계약 |
|------|------|
| Size value | bare digits → `Npx`; else allow `^\d+(\.\d+)?(px\|%\|vh\|vw)$` only |
| Hex color | `#RGB` / `#RRGGBB` / `#RRGGBBAA` (optional `#`); expand 3→6; lowercase; reject `transparent`/`none`/non-hex → treat as absent |
| Placeholder img `src` | `data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=` (1×1 transparent GIF) when real URL is resolved later |
| Style attr | `width:…;height:…;background-color:…;` (omit empty parts; trailing `;` when non-empty) |
| HTML comment attrs | `key="value"` only; escape `& " <` and newlines as `&#10;` on write; reverse on read |

## 커스텀이 아닌 것

다음을 새로 문서화하거나 “앱 전용 문법”으로 다루지 않는다.

- CommonMark / GFM (제목 h1–h6, 링크, 목록, 코드펜스, 테이블, task list 등)
- md-editor-rt 기본 기능 (KaTeX, Mermaid, 이모지 등)
- 미리보기 외부 링크 `target=_blank` (`previewLinkTargetBlankPlugin`) — **문법 아님**, 렌더러만
- 녹음 동기화 — `.sync.pb` / `.sync.json` **사이드카**, 인라인 마커 없음
- Obsidian식 일반 `[[wikilink]]` — **미지원** (`![[]]`, `[[file:]]`, `[[note:]]`, `[[folder:]]`만)

## 새 문법 추가 시

같은 변경에 `docs/custom-markdown/<feature>.md`(문법 + **Spec**)를 추가하고 이 표와 VitePress 사이드바(`docs/.vitepress/config.ts`)에 한 줄 넣는다.  
Cursor rule: `.cursor/rules/custom-markdown-docs.mdc`

사이트: 앱 배포 시 `{base}docs/` (로컬: `bun run docs:dev`).

VitePress용 디렉터리 인덱스는 `index.md`다 (`README.md` 아님).
