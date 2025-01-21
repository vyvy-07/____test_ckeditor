// import { Node, mergeAttributes } from '@tiptap/core';

// export const CustomCell = Node.create({
//   name: 'customCell',

//   group: 'block',

//   content: 'block*',

//   addOptions() {
//     return {
//       HTMLAttributes: {},
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'div[class=custom-cell]',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return [
//       'div',
//       mergeAttributes({ class: 'custom-cell' }, HTMLAttributes),
//       0,
//     ];
//   },
// });

import { Node, mergeAttributes } from '@tiptap/core';

export const CustomCell = Node.create({
  name: 'customCell',

  group: 'block',

  content: 'block*',

  isolating: true,

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

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { state, view } = editor;
        const { selection } = state;
        const { $from } = selection;

        // Kiểm tra nếu đang ở đầu node và node hiện tại là customCell
        if (
          $from.parent.type.name === 'customCell' &&
          $from.parent.textContent.length === 0
        ) {
          // Ngăn xóa node khi nội dung trống
          return true;
        }

        return false;
      },
    };
  },
});
