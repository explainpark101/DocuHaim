---
name: settings-collapsible-content
description: Adds Settings page expand/collapse panels with SettingsCollapsible (Container, Heading, Content). Use when making a settings section collapsible or converting a static settings block to accordion-style UI.
---

# Settings Collapsible

## Module

`src/components/settings/SettingsCollapsible/`

| Export | Role |
|--------|------|
| `SettingsCollapsibleContainer` | Shell + `open` / `contentKey` context (controlled or `defaultOpen`) |
| `SettingsCollapsibleHeading` | Chevron toggle header (`aria-expanded`) |
| `SettingsCollapsibleContent` | Motion height + opacity body |
| `useSettingsCollapsible` | Read context (e.g. collapsed summary outside content) |

Import from `@/components/settings/SettingsCollapsible`.

## Standard pattern

Inside `Container`, **do not** pass `open` / `contentKey` to `Content` — they inherit from context.

```tsx
import {
  SettingsCollapsibleContainer,
  SettingsCollapsibleContent,
  SettingsCollapsibleHeading,
} from '@/components/settings/SettingsCollapsible';

<SettingsCollapsibleContainer
  id="settings-og"
  contentKey="settings-og-worker"
  defaultOpen={false}
  tabIndex={-1}
  className="scroll-mt-4 space-y-3 rounded-lg border …"
>
  <SettingsCollapsibleHeading>Open Graph Worker</SettingsCollapsibleHeading>
  <SettingsCollapsibleContent>{/* body */}</SettingsCollapsibleContent>
</SettingsCollapsibleContainer>
```

### Checklist

1. `Container`: `id` (anchor), `contentKey` (unique Motion key; defaults to `id`), `defaultOpen` or controlled `open` + `onOpenChange`.
2. `Heading` **outside** `Content`.
3. Forms: `as="form"` + `onSubmit` on `Container`.
4. `Heading` props: `subtitle`, `trailing` (collapsed hint), `unstyled` (custom title component), `titleAs`, `className`.

### Controlled + collapsed summary

```tsx
const [open, setOpen] = useState(true);

<SettingsCollapsibleContainer open={open} onOpenChange={setOpen} …>
  <SettingsCollapsibleHeading>…</SettingsCollapsibleHeading>
  <SettingsCollapsibleContent>…</SettingsCollapsibleContent>
  {!open ? <p>…</p> : null}
</SettingsCollapsibleContainer>
```

## Reuse wrappers

| Need | Use |
|------|-----|
| Top-level settings group | `SettingsPageGroup` (built on Container) |
| Nested MLX / llama.cpp subsection | `MlxVlmCollapsibleSection` / `LlamaCppCollapsibleSection` |

## Standalone Content (no Container)

When open is driven elsewhere (e.g. toggle switch), pass props explicitly:

```tsx
<SettingsCollapsibleContent open={enabled} contentKey="settings-workspace-tabs-autosave">
  …
</SettingsCollapsibleContent>
```

Custom headers (log panel with Clear button): keep bespoke header; use `Content` with explicit `open` / `contentKey`.

## Anti-patterns

```text
❌ BAD — duplicate open/contentKey on Content inside Container
❌ BAD — Heading inside Content
❌ BAD — hand-roll collapse CSS
✅ GOOD — Container > Heading + Content
✅ GOOD — SettingsPageGroup / OgWorkerSettings / S3 form pattern
```

## References

- `OgWorkerSettings.tsx` — uncontrolled panel
- `SettingsPageGroup.tsx` — controlled group + `titleAs="span"`
- `SettingsPage.jsx` — `as="form"` + `trailing` hint
- `MlxVlmSettings.tsx` — `unstyled` custom title

Prefer **English** in new code comments if Korean Unicode might corrupt.
