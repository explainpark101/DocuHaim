---
name: Note cover shapes
overview: Extend note cover with shape elements (rect/ellipse/roundRect), in-shape text, fill/border styling, and resize—building on the v1 cover canvas, sidebar, and note-cover HTML comment schema.
todos:
  - id: shape-schema
    content: Add shape element types to noteCover schema (v bump + normalize compat); fill, border, text-in-shape fields
    status: completed
  - id: shape-render
    content: CoverSlide + CoverEditor render branches for shapes; drag/resize reuse; in-shape text edit
    status: completed
  - id: shape-sidebar
    content: CoverSidebar actions (add shape) + selection props (fill, border color/width, text, padding)
    status: completed
  - id: shape-print
    content: Verify print CSS color-adjust for fill/border; smoke test comment round-trip
    status: completed
isProject: false
---

# Note cover shapes (follow-up)

Depends on v1 cover ([note_cover_page](note_cover_page_d916361b.plan.md)): HTML `<!-- note-cover -->` JSON, CoverSlide/CoverEditor/CoverSidebar, frame layout.

## Scope

- Shape element types: `rect`, `ellipse`, `roundRect` (corner radius %)
- **In-shape text**: optional `text`, `textAlign`, `fontSize`, `color`, `fontWeight`, padding
- **Fill** (`fill`) and **border** (`borderColor`, `borderWidth`, `borderStyle`)
- Size/position via existing drag/resize + sidebar numeric fields
- Schema `v` bump with normalize that ignores unknown types gracefully for older clients

## Out of scope

- Freehand / path shapes, connectors, animations, multi-slide

## Touch points

- [`src/utils/noteCover/types.ts`](src/utils/noteCover/types.ts), [`parse.ts`](src/utils/noteCover/parse.ts)
- [`src/components/noteCover/CoverSlide.tsx`](src/components/noteCover/CoverSlide.tsx), [`CoverEditor.tsx`](src/components/noteCover/CoverEditor.tsx), [`CoverSidebar.tsx`](src/components/noteCover/CoverSidebar.tsx)

## Schema sketch

```json
{
  "id": "...",
  "type": "roundRect",
  "x": 10, "y": 20, "w": 80, "h": 30,
  "fill": "#e0f2fe",
  "borderColor": "#0284c7",
  "borderWidth": 2,
  "borderStyle": "solid",
  "cornerRadiusPct": 4,
  "text": "Subtitle",
  "textAlign": "center",
  "fontSize": 24,
  "color": "#0c4a6e",
  "fontWeight": "bold",
  "paddingPct": 2
}
```
