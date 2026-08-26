import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';
import {
  APP_HEADING_LEVELS,
  MAX_EXPORT_HEADING_LEVEL,
  type AppHeadingLevel,
} from '@/utils/markdownHeadings';

type NovelHeadingOptions = {
  levels: AppHeadingLevel[];
  HTMLAttributes: Record<string, string>;
};

function headingTag(level: number): string {
  return level <= MAX_EXPORT_HEADING_LEVEL ? `h${level}` : 'h6';
}

export const NovelHeading = Node.create<NovelHeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [...APP_HEADING_LEVELS],
      HTMLAttributes: {},
    };
  },

  content: 'inline*',
  group: 'block',
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    };
  },

  parseHTML() {
    const deep = this.options.levels
      .filter((level: any) => level > MAX_EXPORT_HEADING_LEVEL)
      .flatMap((level: any) => [
        {
          tag: `h6[data-heading-level="${level}"]`,
          attrs: { level },
        },
        {
          tag: `h${level}`,
          attrs: { level },
        },
      ]);
    const standard = this.options.levels
      .filter((level: any) => level <= MAX_EXPORT_HEADING_LEVEL)
      .map((level: any) => ({
      tag: `h${level}`,
      attrs: { level }
    }));
    return [...deep, ...standard];
  },

  renderHTML({
    node,
    HTMLAttributes
  }: any) {
    const hasLevel = this.options.levels.includes(node.attrs.level as AppHeadingLevel);
    const level = hasLevel ? Number(node.attrs.level) : this.options.levels[0] ?? 1;
    const attrs =
      level > MAX_EXPORT_HEADING_LEVEL
        ? mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            'data-heading-level': String(level),
            class: `md-heading md-heading-${level}`,
          })
        : mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
    return [headingTag(level), attrs, 0];
  },

  addCommands() {
    return {
      setHeading: (attributes: { level: number }) => ({
        commands
      }: any) => {
        if (!this.options.levels.includes(attributes.level as AppHeadingLevel)) return false;
        return commands.setNode(this.name, attributes);
      },
      toggleHeading: (attributes: { level: number }) => ({
        commands
      }: any) => {
        if (!this.options.levels.includes(attributes.level as AppHeadingLevel)) return false;
        return commands.toggleNode(this.name, 'paragraph', attributes);
      },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce<Record<string, () => boolean>>((items: any, level: any) => {
      const combo = level === 10 ? 'Mod-Alt-0' : `Mod-Alt-${level}`;
      items[combo] = () => this.editor.commands.toggleNode(this.name, 'paragraph', { level });
      return items;
    }, {});
  },

  addInputRules() {
    const minLevel = Math.min(...this.options.levels);
    return this.options.levels.map((level: any) => textblockTypeInputRule({
      find: new RegExp(`^(#{${minLevel},${level}})\\s$`),
      type: this.type,
      getAttributes: { level },
    }),
    );
  },
});
