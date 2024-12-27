import { Node, mergeAttributes } from '@tiptap/core';

export const CustomRow = Node.create({
  name: 'customRow',

  group: 'block', // Hàng cũng thuộc nhóm block

  content: 'customCell{2}', // Mỗi hàng chứa đúng 2 ô

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[class=custom-row]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'custom-row' }, HTMLAttributes), 0];
  },
});
