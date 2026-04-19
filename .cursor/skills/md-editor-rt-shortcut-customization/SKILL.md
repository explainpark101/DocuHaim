---
name: md-editor-rt-shortcut-customization
description: Customize md-editor-rt shortcuts by replacing/removing default CodeMirror keymap extensions and adding project-specific bindings (e.g., remap Ctrl/Cmd+D to multi-cursor). Use when changing editor keyboard behavior.
---

# md-editor-rt Shortcut Customization

`md-editor-rt`의 기본 단축키는 CodeMirror `keymap` 확장으로 주입된다.  
따라서 단축키를 안정적으로 수정/삭제하려면 **기본 keymap 확장을 제거하고 새 keymap을 다시 주입**해야 한다.

## 핵심 원칙

1. `codeMirrorExtensions(extensions, { keyBindings })`를 사용한다.
2. `extensions`에서 `type === 'keymap'`을 먼저 제거한다.
3. `keyBindings`를 복제/필터링해 원하는 키만 제거 또는 교체한다.
4. 새 `keymap.of(...)`를 확장 배열에 다시 push 한다.

## 이 프로젝트 권장 패턴 (Ctrl/Cmd + D 멀티커서)

```jsx
import { config } from 'md-editor-rt';
import { keymap } from '@codemirror/view';
import { selectNextOccurrence } from '@codemirror/search';

config({
  codeMirrorExtensions(extensions, { keyBindings }) {
    // 1) 기본 keymap 제거
    const nextExtensions = [...extensions].filter((item) => item.type !== 'keymap');

    // 2) Ctrl/Cmd + D 기본 바인딩 제거(줄 삭제 등 충돌 방지)
    const baseKeyBindings = (keyBindings || []).filter((binding) => {
      const key = String(binding?.key || '').toLowerCase();
      const mac = String(binding?.mac || '').toLowerCase();
      return key !== 'ctrl-d' && key !== 'mod-d' && mac !== 'cmd-d';
    });

    // 3) 커스텀 바인딩 추가
    const newKeyBindings = [
      {
        key: 'Ctrl-d',
        mac: 'Cmd-d',
        preventDefault: true,
        run: (view) => {
          selectNextOccurrence(view);
          return true;
        },
      },
      ...baseKeyBindings,
    ];

    // 4) 새 keymap 주입
    nextExtensions.push({
      type: 'keymap',
      extension: keymap.of(newKeyBindings),
    });

    return nextExtensions;
  },
});
```

## 자주 쓰는 작업

### 1) 기본 단축키 수정

- 기본 바인딩을 `find`해서 `key/mac`만 바꾼 사본을 만든 뒤,
- 기존 항목을 제외한 배열과 합쳐 새 keymap 생성.

### 2) 단축키 삭제

- `keyBindings.filter(...)`로 특정 키 제거.
- 또는 모든 기본 단축키를 제거하려면 `type === 'keymap'` 확장을 통째로 제거 후 필요한 것만 다시 추가.

### 3) 단축키 추가

- `keymap.of([{ key, mac, run }])` 항목을 추가.
- 텍스트 삽입이 목적이면 `editorRef.current?.insert(...)` 또는 CodeMirror `view.dispatch(...)`를 사용.

## 주의사항

- 단축키 충돌이 있으면 `keydown` 이벤트 가로채기보다 **keymap 재구성**을 우선한다.
- `run`은 처리 성공 시 `true`를 반환해야 다음 핸들러로 내려가지 않는다.
- `preventDefault: true`를 함께 주어 브라우저/OS 기본 동작과 충돌을 줄인다.

