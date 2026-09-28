---
name: Kanban phase 2 swimlane cover
overview: After `.kanban.json` MVP (columns/cards DnD, hybrid linkPath), add swimlanes, card/column cover images, and optional column-folder quick-add notes. No code in this document — planning only.
todos:
  - id: schema-v2
    content: Extend kanbanDocument to version 2 (swimlanes, cover refs) with v1 migrate
    status: completed
  - id: swimlane-ui
    content: Horizontal swimlanes + card move across lane/column; DnD matrix
    status: completed
  - id: cover-images
    content: Column/card cover images via vault wiki-image / .images upload
    status: completed
  - id: column-folder-notes
    content: Optional column folderPath + quick-add creates note and card linkPath
    status: completed
  - id: docs-tests
    content: Update kanban-json.md Spec + unit tests for v2 migrate/mutations
    status: completed
isProject: false
---

# Kanban phase 2 — swimlane · cover · column folder

Depends on MVP: [kanban_json_mvp_991728aa.plan.md](./kanban_json_mvp_991728aa.plan.md) (`.kanban.json` v1, `KanbanPane`, hybrid cards).

## Goals

1. **Swimlanes** — rows that group cards across columns (status × lane matrix).
2. **Cover images** — optional visual on columns and/or cards (vault path or wiki-image).
3. **Column folder quick-add** — bind a column to a vault folder; “새 노트” creates `.md` and attaches `linkPath` on a new card.

## Non-goals (still later)

- Obsidian Bases property-driven columns
- Dedicated `/kanban/` route
- Real-time multiplayer / Yjs on boards
- Card checklist / due dates / labels taxonomy (unless needed for swimlane filters)

## Proposed schema (v2 sketch)

Keep pretty-printed JSON. Bump `version` to `2`. Migrate v1 on parse (default single lane).

```json
{
  "version": 2,
  "lanes": [
    { "id": "lane_default", "title": "Default" }
  ],
  "columns": [
    {
      "id": "col_todo",
      "title": "To Do",
      "color": null,
      "coverPath": null,
      "folderPath": null,
      "cardIdsByLane": {
        "lane_default": []
      }
    }
  ],
  "cards": {
    "card_x": {
      "id": "card_x",
      "title": "",
      "body": "",
      "linkPath": null,
      "coverPath": null,
      "laneId": "lane_default"
    }
  }
}
```

Migration from v1:

- Create one default lane.
- Map each column `cardIds` → `cardIdsByLane[lane_default]`.
- Set each card `laneId` to default; `coverPath` / column `folderPath` / `coverPath` → `null`.

## UI direction

| Feature | Behavior |
|---------|----------|
| Swimlanes | Vertical stack of lane rows; each row repeats columns; card DnD across lane and column |
| Lane chrome | Add / rename / reorder / delete (ConfirmModal danger; cards move to default or blocked if last lane) |
| Cover | Thumbnail on card header / column header; picker reuses vault image upload / wiki path |
| Folder quick-add | Column settings: choose folder; toolbar “노트 추가” → `createItem` + card with `linkPath` |

Reuse: `@dnd-kit/*`, `react-colorful` (existing column color), `ConfirmModal`, Radix Tooltip, session undo (extend snapshot to v2 doc).

## Implementation order

1. Schema + migrate + tests (`kanbanDocument` v2).
2. Swimlane layout + DnD matrix (hardest UX).
3. Cover paths + hydration (wiki-image / object URL).
4. Column `folderPath` + create-note wiring (`useTreeOpsDomain` / createItem).
5. Docs (`docs/custom-markdown/kanban-json.md`) Spec update.

## Open questions

- Should `cardIds` stay denormalized per column×lane, or derive from `cards[].laneId` + column membership only?
- Cover: store vault path only vs embed remote-image sidecar?
- Deleting a lane with cards: force move vs refuse?

## References

- MVP UX inspiration: [Obsidian Kanban Bases View](https://community.obsidian.md/plugins/kanban-bases-view) (swimlane-like grouping is a common power-user ask; Bases columns remain out of scope).
