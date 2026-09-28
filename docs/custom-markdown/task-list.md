# Task list (`[ ]` / `[~]` / `[x]`)

GFM task list plus an app-custom **status** checkbox. Used in Haim Editor WYSIWYG, source (Ctrl-Tab), preview, and Export PDF.

## 문법

```markdown
- [ ] 일반 할 일 (check)
- [x] 일반 완료
- [~] 상태 할 일 — 진행 중 (status)
* [X] 완료 (대문자 X → 저장 시 `[x]`)
1. [ ] 번호 목록도 동일
```

| Marker | Kind | Status | UI |
|--------|------|--------|-----|
| `[ ]` | `check` | `todo` | unchecked |
| `[x]` / `[X]` | `check` | `done` | checked (canonical `[x]`) |
| `[~]` | `status` | `doing` | indeterminate |

### Kinds

Document setting `taskCheckbox` in `<!-- document-settings -->` chooses the mode for the whole file (Document Settings modal):

| `taskCheckbox` | Click / Ctrl-Tab | Notes |
|----------------|------------------|-------|
| `check` (default) | `todo ↔ done` | GFM-compatible; never writes `~` on toggle |
| `status` | `todo → doing → done → todo` | Creates / advances `[~]` doing state |

Per-item `data-kind` still exists in the editor DOM; clicks follow the **document** preference.
Typing `[~]` still parses as `doing`; in `check` mode the next click goes to `done`.

## Spec (interop)

기준 구현: `src/utils/taskCheckboxStatus.ts`, `HaimTaskItem` / `HaimTaskList`, `markdownItTaskListPlugin.ts`.

### 1. Grammar

```text
TASK_LINE := INDENT LIST_MARK WS "[" MARKER "]" WS? TEXT
LIST_MARK := "-" | "*" | "+" | DIGITS ("." | ")")
MARKER    := " " | "~" | "x" | "X"
```

Regex (line start):

```js
/^\s*(?:[-*+]|\d+[.)])\s+\[([ xX~])\](?:\s|$)/
```

### 2. Parse

1. Capture marker char in group 1.
2. Map status: ` ` → `todo`, `~` → `doing`, `x`/`X` → `done`.
3. Map kind: `~` → `status`, otherwise `check`.
4. Unknown marker → `todo` / `check`.

### 3. Serialize

| Kind + Status | Marker |
|---------------|--------|
| check + todo | ` ` |
| check + done | `x` |
| check + doing (invalid) | ` ` (coerce) |
| status + todo | ` ` |
| status + doing | `~` |
| status + done | `x` |

Prefer list bullet `-` when writing from TipTap.

### 4. Canonical HTML

```html
<ul class="contains-task-list" data-type="taskList">
  <li class="task-list-item" data-kind="check" data-status="todo" data-type="taskItem">
    <label>
      <input class="task-list-item-checkbox" type="checkbox"
             data-kind="check" data-status="todo" aria-checked="false" disabled="">
    </label>
    …
  </li>
  <li class="task-list-item" data-kind="status" data-status="doing">
    <input class="task-list-item-checkbox task-list-item-checkbox--status"
           data-kind="status" data-status="doing" aria-checked="mixed">
  </li>
  <li class="task-list-item" data-kind="check" data-status="done" data-checked="true">
    <input … data-status="done" aria-checked="true" checked="">
  </li>
</ul>
```

Static HTML cannot set the DOM `indeterminate` property — use `data-status="doing"` + CSS / TipTap NodeView (`checkbox.indeterminate = true`).

### 5. TipTap typing (WYSIWYG)

- `- ` alone → bullet list (unchanged).
- `-[ ]` / `- [ ]` / `- [x]` + trailing space → `kind=check` task item.
- `-[~]` / `- [~]` + trailing space → `kind=status`, `status=doing`.
- Short form `[ ]` / `[x]` / `[~]` + space (incl. after `- ` turned into a bullet) → promote bullet/ordered list to task list with matching kind.
- Slash 「할 일 목록」 → regular task list (`check`).
- Slash 「상태 할 일」 → task item with `kind=status`, `status=doing`.

### 6. Non-goals

- Persisting per-item `kind=status` across vault reload when the marker is not `~` and document mode is `check`.
- Patching md-editor-rt vendor `github-task-lists`.
- Div-only custom checkboxes (native `<input type="checkbox">` + `accent-color`).
- Chat-specific task markers.

## Implementation

| Role | Path |
|------|------|
| Status / kind helper | `src/utils/taskCheckboxStatus.ts` |
| TipTap | `HaimTaskItem.ts` / `HaimTaskList.ts` |
| Preview HTML | `markdownItTaskListPlugin.ts` + `appMarkdownItPlugins.ts` |
| Source Ctrl-Tab | `editorMarkdownStyle.ts` + `HaimSourcePane.tsx` |
| CSS | `src/styles/haim-editor/style.css` |
