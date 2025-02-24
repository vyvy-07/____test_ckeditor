import { Node, mergeAttributes } from '@tiptap/core';

export const CustomRow = Node.create({
  name: 'customRow',

  group: 'block',

  content: 'customCell{3}',

  addAttributes() {
    return {
      layoutName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-layout-name'),
        renderHTML: ({ layoutName }) => ({
          'data-layout-name': layoutName || null,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[class^=custom-row]' }];
  },

  renderHTML({ HTMLAttributes }) {
    const { layoutName, ...rest } = HTMLAttributes;
    return [
      'div',
      mergeAttributes(rest, { class: `custom-row ${layoutName || ''}`.trim() }),
      0,
    ];
  },
});
