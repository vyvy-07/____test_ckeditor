import { Node, mergeAttributes } from '@tiptap/core';

export const CustomCell = Node.create({
  name: 'customCell',

  group: 'block',

  content: 'block*',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[class=custom-cell]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ class: 'custom-cell' }, HTMLAttributes),
      0,
    ];
  },
});
