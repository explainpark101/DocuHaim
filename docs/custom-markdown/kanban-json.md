# Kanban board (`.kanban.json`)

Vault kanban boards opened at `/view/<path>` with a dedicated **Kanban** viewer (`KanbanPane`). The board JSON owns columns and cards (hybrid model: inline title/body, tags, and zero or more vault `linkPaths`).

## Syntax

Pretty-printed JSON (`application/json`), schema **version 1**:

```json
{
  "version": 1,
  "columns": [
    { "id": "col_todo", "title": "To Do", "icon": "📋", "color": null, "width": null, "cardIds": [] },
    { "id": "col_doing", "title": "Doing", "icon": null, "color": null, "width": null, "cardIds": [] },
    { "id": "col_done", "title": "Done", "icon": null, "color": null, "width": null, "cardIds": [] }
  ],
  "cards": {
    "card_x": {
      "id": "card_x",
      "title": "Write docs",
      "body": "Optional notes",
      "linkPaths": ["notes/spec.md", "notes/design.md"],
      "tags": ["urgent", "docs"]
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `version` | `1` | Schema version |
| `columns` | array | Ordered columns (left → right) |
| `columns[].id` | string | Stable column id |
| `columns[].title` | string | Display name |
| `columns[].icon` | string \| `null` | Optional native emoji glyph before the title (emoji-mart picker); empty/`null` = none |
| `columns[].color` | string \| `null` | Optional hex accent (`#RGB` / `#RRGGBB` / `#RRGGBBAA`) |
| `columns[].width` | number \| `null` | Column width in CSS px (clamped 200–560); `null` → default **288** |
| `columns[].cardIds` | string[] | Ordered card ids in this column |
| `cards` | object | Map of card id → card |
| `cards[].title` | string | Card title |
| `cards[].body` | string | Card body (Markdown in the side editor) |
| `cards[].linkPaths` | string[] | Vault POSIX paths opened from the card (ordered, unique) |
| `cards[].tags` | string[] | Free-form tags (ordered; case-insensitive unique) |

**Legacy:** singular `linkPath` (string \| `null`) is accepted on read and migrated into `linkPaths`. Writers emit only `linkPaths`.

**Card edit session:** title / body / tags / `linkPaths` are edited as a draft in the side panel and applied to the board JSON only when **카드 저장** is pressed (or the nested editor save shortcut while that panel is open). Closing or switching cards with unsaved draft prompts discard.

**Search:** Ctrl/Cmd+F (outside nested markdown editors) or **파일 관리 → 카드 검색** opens an in-board find bar matching **title**, **body**, and **tags** (case-insensitive substring). Enter / ↑↓ cycle hits.

**Tree → board:** hold **Ctrl** (Windows/Linux) or **Cmd** (macOS) while dragging TreeNode file(s) / folder(s) onto the open kanban board to create linked cards (`title` = node name, `linkPaths` = `[path]`, empty `body` / `tags`). Drop targets the column under the pointer (else the first column). Paths already present on any card are skipped. Without the modifier, the kanban drop overlay stays hidden so normal open/move DnD still works.

**Board pan:** drag empty board / column chrome horizontally (Embla-like grab scroll). Card grips, buttons, inputs, and column resize gutters do not start pan (Space+drag / middle-click also pan). Touch keeps native overflow scrolling.

CreateItemModal / `CREATE_FILE_FORMATS` entry: `.kanban.json`. Intermediate suffix `.kanban` completes to `.kanban.json`.

## Spec (interop)

### Grammar

- Root: JSON object.
- Required keys: `columns` (array). `cards` defaults to `{}` when absent.
- Unknown keys on root / column / card: ignore on read; do not require round-trip.

### Parse algorithm

1. `JSON.parse` the file text. On failure → empty seed board + UI error banner (do not throw).
2. If root is not an object or `columns` is not an array → empty seed board + error.
3. Normalize each column:
   - `id`: non-empty string (generate if missing).
   - `title`: string (fallback `Column N`).
   - `icon`: trimmed native emoji string (max 32 code units) or `null` when missing/empty.
   - `color`: hex via project hex rules or `null`.
   - `width`: CSS px clamp 200–560 or `null`.
   - `cardIds`: unique non-empty strings only.
4. Normalize each card in `cards`:
   - `id`, `title`, `body` strings.
   - `linkPaths`: unique trimmed POSIX paths; if absent/empty, migrate legacy `linkPath`.
   - `tags`: unique (case-insensitive) trimmed strings; missing → `[]`.
5. Drop `cardIds` entries with no matching `cards` entry. Orphan cards (in map, not listed) remain in `cards` for round-trip safety but are not shown.
6. Force `version` to `1` on write.

### Value normalization

| Value | Rule |
|-------|------|
| Hex color | `#RGB` / `#RRGGBB` / `#RRGGBBAA` (optional `#`); lowercase; invalid → `null` |
| Column icon | Trimmed string; empty → `null`; length capped at 32 (ZWJ sequences allowed) |
| Column width | integer px; clamp to **200–560**; omit/`null`/invalid → default **288** |
| `linkPaths` | Trim each; `\` → `/`; drop empties; de-dupe preserving order |
| `tags` | Trim; drop empties; de-dupe case-insensitively (keep first spelling) |
| Empty file | Treated as valid empty board (To Do / Doing / Done) |

### Canonical output

`serializeKanbanDocument` writes pretty-printed JSON with trailing newline:

- `version: 1`
- columns in display order
- `cards` as an object keyed by card id
- `icon` / `color` / `width` may be JSON `null`
- `linkPaths` / `tags` always arrays (never legacy `linkPath`)

### Non-goals / out of scope (MVP)

- Swimlanes
- Cover images on cards/columns
- Auto-creating notes under a column folder
- Bases / property-driven columns (Obsidian Bases View style)
- Separate `/kanban/` URL route (uses `/view/<path>`)

## Implementation

| Concern | Path |
|---------|------|
| Path detect | `src/utils/kanban/kanbanPath.ts` |
| Parse / serialize / mutations | `src/utils/kanban/kanbanDocument.ts` |
| **Viewer registry** | `src/utils/vaultFileViewers/` (`SPECIAL_VAULT_FORMATS`) — add future JSON/MD composite panes here |
| Create format | `src/utils/createFileFormats.ts` (`kanban.json`) |
| Open / save viewer | `openPathFileFromBackend`, `useFileSessionDomain`, `EDITABLE_VIEWERS` via registry |
| UI | `src/components/kanban/KanbanPane.tsx` (lazy from `EditorPane`) |
| Column emoji icon | `src/components/kanban/KanbanColumnIconPicker.tsx` (`@emoji-mart/react`) |
| Link picker | `src/components/kanban/KanbanLinkPickerModal.tsx` (multi-select) |
| Tree Ctrl/Cmd drop | `src/utils/kanban/kanbanTreeCardDrop.ts`, `KanbanTreeCardDroppable.tsx` (Sidebar DndContext portal) |
| Tests | `tests/utils/kanbanDocument.test.ts`, `tests/utils/kanbanTreeCardDrop.test.ts`, `tests/utils/vaultFileViewers.test.ts` |

### Adding another JSON- or Markdown-based view

1. Register a row in `SPECIAL_VAULT_FORMATS` (`family: 'json' | 'markdown'`, dedicated `viewer` id, `createSeed`, optional `treeIcon`).
2. Add `CREATE_FILE_FORMATS` entry + intermediate suffix if needed.
3. Lazy-load a pane in `EditorPane` for that `viewer` id.
4. Unit-test registry match + seed (see `vaultFileViewers.test.ts`).
