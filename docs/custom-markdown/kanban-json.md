# Kanban board (`.kanban.json`)

Vault kanban boards opened at `/view/<path>` with a dedicated **Kanban** viewer (`KanbanPane`). The board JSON owns columns, swimlanes, and cards (hybrid model: inline title/body, tags, covers, and zero or more vault `linkPaths`).

## Syntax

Pretty-printed JSON (`application/json`), schema **version 2**:

```json
{
  "version": 2,
  "settings": {
    "swimlanesEnabled": false,
    "columnIconsEnabled": true,
    "coversEnabled": true,
    "columnFoldersEnabled": true,
    "columnColorsEnabled": true,
    "tagsEnabled": true,
    "linksEnabled": true,
    "maxLanes": null,
    "maxColumns": null,
    "maxCardsPerCell": null
  },
  "lanes": [
    { "id": "lane_default", "title": "Default" }
  ],
  "columns": [
    {
      "id": "col_todo",
      "title": "To Do",
      "icon": "📋",
      "color": null,
      "width": null,
      "coverPath": null,
      "folderPath": null,
      "cardIdsByLane": { "lane_default": ["card_x"] }
    }
  ],
  "cards": {
    "card_x": {
      "id": "card_x",
      "title": "Write docs",
      "body": "Optional notes",
      "linkPaths": ["notes/spec.md"],
      "tags": ["urgent"],
      "coverPath": null,
      "laneId": "lane_default"
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `version` | `2` | Schema version (v1 files migrate on read) |
| `settings` | object | Board-local feature flags and capacity limits (문서 설정) |
| `settings.swimlanesEnabled` | boolean | Show swimlane rows; default **false** (first lane only; data kept) |
| `settings.columnIconsEnabled` | boolean | Column emoji icons |
| `settings.coversEnabled` | boolean | Column/card cover UI |
| `settings.columnFoldersEnabled` | boolean | Column folder bind + quick-add notes |
| `settings.columnColorsEnabled` | boolean | Column accent color |
| `settings.tagsEnabled` | boolean | Card tags edit/display |
| `settings.linksEnabled` | boolean | Card vault `linkPaths` |
| `settings.maxLanes` | number \| `null` | Max swimlane rows; `null` = unlimited (cap 50) |
| `settings.maxColumns` | number \| `null` | Max columns; `null` = unlimited (cap 50) |
| `settings.maxCardsPerCell` | number \| `null` | Max cards per column×lane cell; `null` = unlimited (cap 500) |
| `lanes` | array | Ordered swimlanes (top → bottom) |
| `lanes[].id` | string | Stable lane id |
| `lanes[].title` | string | Display name |
| `columns` | array | Ordered columns (left → right) |
| `columns[].id` | string | Stable column id |
| `columns[].title` | string | Display name |
| `columns[].icon` | string \| `null` | Optional native emoji before the title |
| `columns[].color` | string \| `null` | Optional hex accent |
| `columns[].width` | number \| `null` | Column width CSS px (200–560); `null` → **288** |
| `columns[].coverPath` | string \| `null` | Vault image path for column header cover |
| `columns[].folderPath` | string \| `null` | Vault folder for quick-add notes (`""` = vault root) |
| `columns[].cardIdsByLane` | object | Map of lane id → ordered card ids in that cell |
| `cards` | object | Map of card id → card |
| `cards[].linkPaths` | string[] | Vault POSIX paths |
| `cards[].tags` | string[] | Free-form tags |
| `cards[].coverPath` | string \| `null` | Vault image path for card cover |
| `cards[].laneId` | string | Owning swimlane (kept in sync with `cardIdsByLane`) |

**Legacy v1:** flat `columns[].cardIds` migrate into `cardIdsByLane[lane_default]`; singular `linkPath` migrates into `linkPaths`; missing `settings` defaults to swimlanes **off**, other features on / unlimited. Writers emit only v2 shape.

**Board settings (문서 설정):** `KanbanDocumentSettingsModal` — toggles and limits stored in the `.kanban.json` `settings` object (not markdown document settings).

**Swimlanes:** each lane is a row repeating all columns. Cards move across column and lane via DnD. When `swimlanesEnabled` is false, only the first lane is shown.

**Covers:** thumbnail from vault path (wiki-image / presigned URL resolver).

**Column folder quick-add:** bind `folderPath`, then use the folder button on a cell to open Create Item in that folder; on success a linked card is added to that column×lane.

**Card edit session:** draft side panel + **카드 저장**.

**Search / tree drop / board pan:** unchanged from MVP (Ctrl/Cmd+F; Ctrl/Cmd tree drop; horizontal grab pan).

## Spec (interop)

### Grammar

- Root: JSON object.
- Required: `columns` (array). `lanes` defaults to one Default lane. `cards` defaults to `{}`.

### Parse algorithm

1. `JSON.parse`; on failure → empty seed board + error banner.
2. Normalize `settings` (defaults: swimlanes off, other features on, limits `null`).
3. Normalize `lanes` (or create `lane_default`).
4. Normalize each column:
   - Prefer `cardIdsByLane`; else migrate flat `cardIds` → default lane.
   - `coverPath` / `folderPath` / `icon` / `color` / `width` as below.
5. Normalize cards (`linkPaths` + legacy `linkPath`, `tags`, `coverPath`, `laneId`).
6. Drop unknown card ids from buckets; sync `card.laneId` from membership.
7. Write always forces `version: 2` and a full `settings` object.

### Value normalization

| Value | Rule |
|-------|------|
| Hex color | `#RGB` / `#RRGGBB` / `#RRGGBBAA`; invalid → `null` |
| Column icon | Trimmed; empty → `null`; max 32 code units |
| Vault path | Trim; `\` → `/`; empty → `null` (`folderPath` may be `""` for root when set) |
| Column width | Clamp **200–560**; omit/invalid → default **288** |
| `linkPaths` / `tags` | Same as v1 (unique order-preserving) |
| Limits (`maxLanes` / `maxColumns` / `maxCardsPerCell`) | Positive int or `null`; clamp to caps 50 / 50 / 500 |

### Canonical output

- `version: 2`
- `settings` (all feature flags + three limit fields)
- `lanes` then `columns` then `cards`
- Every lane id appears as a key under each column’s `cardIdsByLane`
- No flat `cardIds`; no singular `linkPath`

### Non-goals

- Bases / property-driven columns
- Dedicated `/kanban/` route
- Multiplayer / Yjs

## Implementation

| Concern | Path |
|---------|------|
| Parse / serialize / mutations | `src/utils/kanban/kanbanDocument.ts` |
| DnD collision (cell-aware) | `src/utils/kanban/kanbanDndCollision.ts` |
| UI | `src/components/kanban/KanbanPane.tsx` |
| Board document settings | `src/components/kanban/KanbanDocumentSettingsModal.tsx` |
| Cover thumb | `src/components/kanban/KanbanCoverImage.tsx` |
| Folder picker | `src/components/kanban/KanbanFolderPickerModal.tsx` |
| Tests | `tests/utils/kanbanDocument.test.ts`, `tests/utils/kanbanDndCollision.test.ts` |
