# Plan frontmatter (`*.plan.md` YAML)

Document-leading YAML between `---` fences, Cursor plan style. Preview and print replace it with a status-icon card; the markdown body after the closing `---` renders normally.

## 문법

```markdown
---
name: Chat AI Replies
overview: Short summary under the title.
todos:
  - id: step-one
    content: First task
    status: pending
  - id: step-two
    content: Second task
    status: in_progress
  - id: step-three
    content: Done task
    status: completed
isProject: false
---

# Body heading

Regular markdown continues here.
```

Does **not** require a `.plan.md` filename — any note whose **first** block is this frontmatter shape is transformed.

## Spec (interop)

Reference: `src/utils/planFrontmatter/`.

### 1. Grammar

```
document      = plan_frontmatter body?
plan_frontmatter = "---" NEWLINE yaml_text "---" NEWLINE?
yaml_text     = YAML mapping with plan fields (see below)
```

Opening fence: line 0 of the document, exactly `---` (optional trailing spaces).  
Closing fence: a later line that is exactly `---` (optional trailing spaces).

### 2. Plan detection

After `js-yaml` `load`:

1. Value must be a mapping (object).
2. `todos` must be an **array** (may be empty).
3. Otherwise leave the fences for normal CommonMark parsing (`hr` + paragraphs). Invalid YAML → no transform.

### 3. Fields

| Field | Required | Notes |
|-------|----------|--------|
| `name` | recommended | string; fallback `title`, else `"Plan"` |
| `overview` | no | string; fallback `description` |
| `todos` | yes (array) | each item: `id`, `content` (or `title`), `status` |
| `todos[].id` | no | string; default `todo-{n}` (1-based) |
| `todos[].content` | yes per item | skip item if missing/blank |
| `todos[].status` | no | see normalization; default `pending` |
| `isProject` | no | boolean; also accepts `is_project` |

### 4. Status normalization

| Input (case-insensitive) | Canonical |
|--------------------------|-----------|
| `pending` (default) | `pending` |
| `in_progress`, `in-progress`, `inprogress`, `progress` | `in_progress` |
| `completed`, `complete`, `done` | `completed` |
| `cancelled`, `canceled` | `cancelled` |
| `error`, `failed`, `fail` | `error` |

### 5. Parse algorithm

1. If document line 0 is not a `---` fence, stop.
2. Find the next line that is a closing `---` fence; if none, stop.
3. YAML-load the inner text; if not plan-shaped, stop (do not consume).
4. Normalize todos / name / overview / isProject.
5. Emit a single **html_block** with the canonical card HTML; advance the block parser past the closing fence.
6. Remaining source is normal Markdown.

Rule must run **before** the thematic-break (`hr`) rule so leading `---` is not consumed as an HR.

### 6. Canonical HTML

```html
<div class="md-plan-frontmatter" data-md-plan="1" role="region" aria-label="Plan">
  <div class="md-plan-frontmatter__header">
    <div class="md-plan-frontmatter__name" role="heading" aria-level="2">…</div>
    <div class="md-plan-frontmatter__meta">
      <!-- optional --> <span class="md-plan-frontmatter__badge" data-md-plan-project="1">Project</span>
      <span class="md-plan-frontmatter__progress" data-md-plan-progress="1">2/5</span>
    </div>
  </div>
  <!-- optional --> <p class="md-plan-frontmatter__overview">…</p>
  <ul class="md-plan-frontmatter__todos">
    <li class="md-plan-frontmatter__todo md-plan-frontmatter__todo--pending" data-status="pending">
      <span class="md-plan-frontmatter__icon md-plan-frontmatter__icon--pending" aria-hidden="true"></span>
      <span class="md-plan-frontmatter__todo-body">
        <span class="md-plan-frontmatter__todo-content">…</span>
        <span class="md-plan-frontmatter__status-label">Pending</span>
      </span>
    </li>
  </ul>
</div>
```

Progress label = `completedCount/totalTodos` (tabular). Empty todos → `<p class="md-plan-frontmatter__empty">No todos</p>`.

Text nodes and attribute values must be HTML-escaped (`& " ' < >`).

### 7. Icon presentation (host CSS)

| `data-status` | Icon meaning |
|---------------|--------------|
| `pending` | empty circle |
| `in_progress` | loader arc; **screen-only** rotate animation; print static |
| `completed` | check in circle; content strikethrough |
| `cancelled` | x in circle |
| `error` | alert circle |

Hosts may use CSS masks / background SVGs; contract is class + `data-status` / `data-md-plan`.

### 8. Preview vs print

| Context | Expected |
|---------|----------|
| Editor / MdPreview | Card with icons; `in_progress` may spin |
| Print / Export PDF | Same card; `print-color-adjust: exact`; **no** spinner animation; avoid breaking inside the card when possible |

### 9. Non-goals

- Interactive status toggles writing back to YAML
- Requiring `.plan.md` extension
- Transforming non-leading or mid-document `---` YAML blocks
- Treating arbitrary YAML frontmatter (without `todos` array) as a plan

## 구현

| 역할 | 경로 |
|------|------|
| Parse / normalize | `src/utils/planFrontmatter/parse.ts` |
| HTML builder | `src/utils/planFrontmatter/renderHtml.ts` |
| markdown-it | `src/utils/planFrontmatter/markdownItPlugin.ts` |
| CSS (preview + print) | `src/styles/md-editor-rt/plan-frontmatter.css` |
| Register + XSS | `src/config/mdEditorConfig.js`, `MarkdownEditor.jsx` |
