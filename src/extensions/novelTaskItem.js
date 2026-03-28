import TaskItem from '@tiptap/extension-task-item';

/**
 * 큰 터치 영역·커스텀 체크 UI를 쓰는 TaskItem (기본 패키지 노드뷰 대체)
 */
export const NovelTaskItem = TaskItem.extend({
  name: 'taskItem',

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const listItem = document.createElement('li');
      const checkboxWrapper = document.createElement('label');
      const checkbox = document.createElement('input');
      const face = document.createElement('span');
      const content = document.createElement('div');

      listItem.classList.add('novel-task-item');
      checkboxWrapper.className = 'novel-task-checkbox-hit';
      checkboxWrapper.contentEditable = 'false';
      checkbox.className = 'novel-task-checkbox-input';
      checkbox.type = 'checkbox';
      face.className = 'novel-task-checkbox-face';
      face.setAttribute('aria-hidden', 'true');
      content.className = 'novel-task-item-content';

      const updateA11y = () => {
        checkbox.setAttribute(
          'aria-label',
          `할 일 체크: ${node.textContent?.trim() || '빈 항목'}`,
        );
      };
      updateA11y();

      checkbox.addEventListener('mousedown', (e) => e.preventDefault());
      checkbox.addEventListener('change', (event) => {
        if (!editor.isEditable && !this.options.onReadOnlyChecked) {
          checkbox.checked = !checkbox.checked;
          return;
        }
        const { checked } = event.target;
        if (editor.isEditable && typeof getPos === 'function') {
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .command(({ tr }) => {
              const position = getPos();
              if (typeof position !== 'number') return false;
              const currentNode = tr.doc.nodeAt(position);
              tr.setNodeMarkup(position, undefined, {
                ...(currentNode?.attrs ?? {}),
                checked,
              });
              return true;
            })
            .run();
        }
        if (!editor.isEditable && this.options.onReadOnlyChecked) {
          if (!this.options.onReadOnlyChecked(node, checked)) {
            checkbox.checked = !checkbox.checked;
          }
        }
      });

      Object.entries(this.options.HTMLAttributes ?? {}).forEach(([key, value]) => {
        if (value == null) return;
        if (key === 'class') {
          String(value)
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => listItem.classList.add(c));
        } else {
          listItem.setAttribute(key, value);
        }
      });

      listItem.dataset.checked = node.attrs.checked;
      checkbox.checked = node.attrs.checked;
      checkboxWrapper.append(checkbox, face);
      listItem.append(checkboxWrapper, content);

      Object.entries(HTMLAttributes ?? {}).forEach(([key, value]) => {
        if (value == null) return;
        if (key === 'class') {
          String(value)
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => listItem.classList.add(c));
        } else {
          listItem.setAttribute(key, value);
        }
      });

      return {
        dom: listItem,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) return false;
          listItem.dataset.checked = updatedNode.attrs.checked;
          checkbox.checked = updatedNode.attrs.checked;
          updateA11y();
          return true;
        },
      };
    };
  },
});
