# Task list (`[ ]` / `[~]` / `[x]`)

GFM task list plus an app-custom **doing** marker. Used in Haim Editor WYSIWYG, source (Ctrl-Tab), preview, and Export PDF.

## 문법

```markdown
- [ ] 할 일
- [~] 진행 중
- [x] 완료
* [X] 완료 (대문자 X → 저장 시 `[x]`)
1. [ ] 번호 목록도 동일
```

| Marker | Status | UI |
|--------|--------|-----|
| `[ ]` | `todo` | unchecked |
| `[~]` | `doing` | indeterminate |
| `[x]` / `[X]` | `done` | checked (canonical `[x]`) |

Click / Ctrl-Tab cycle: `todo → doing → done → todo`.

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
2. Map: ` ` → `todo`, `~` → `doing`, `x`/`X` → `done`.
3. Unknown → `todo`.

### 3. Serialize

| Status | Marker |
|--------|--------|
| `todo` | ` ` |
| `doing` | `~` |
| `done` | `x` |

Prefer list bullet `-` when writing from TipTap.

### 4. Canonical HTML

```html
<ul class="contains-task-list" data-type="taskList">
  <li class="task-list-item" data-status="todo" data-type="taskItem">
    <label>
      <input class="task-list-item-checkbox" type="checkbox"
             data-status="todo" aria-checked="false" disabled="">
    </label>
    …
  </li>
  <li class="task-list-item" data-status="doing">
    <input … data-status="doing" aria-checked="mixed">
  </li>
  <li class="task-list-item" data-status="done" data-checked="true">
    <input … data-status="done" aria-checked="true" checked="">
  </li>
</ul>
```

Static HTML cannot set the DOM `indeterminate` property — use `data-status="doing"` + CSS / TipTap NodeView (`checkbox.indeterminate = true`).

### 5. TipTap typing (WYSIWYG)

- `- ` alone → bullet list (unchanged).
- `- [ ]` / `- [~]` / `- [x]` + trailing space → task item with status.
- Short form `[ ]` / `[~]` / `[x]` + space (incl. inside a bullet line) → promote to task.

### 6. Non-goals

- Patching md-editor-rt vendor `github-task-lists`.
- Div-only custom checkboxes (native `<input type="checkbox">` + `accent-color`).
- Chat-specific task markers.

## Implementation

| Role | Path |
|------|------|
| Status helper | `src/utils/taskCheckboxStatus.ts` |
| TipTap | `HaimTaskItem.ts` / `HaimTaskList.ts` |
| Preview HTML | `markdownItTaskListPlugin.ts` + `appMarkdownItPlugins.ts` |
| Source Ctrl-Tab | `editorMarkdownStyle.ts` + `HaimSourcePane.tsx` |
| CSS | `src/styles/haim-editor/style.css` |
