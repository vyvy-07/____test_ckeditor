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
        const { state, dispatch } = editor.view;
        const { selection } = state;
        const { $from } = selection;

        // Kiểm tra nếu đang ở đầu node và node hiện tại là customCell và rỗng
        if (
          $from.parent.type.name === 'customCell' &&
          $from.parent.textContent.length === 0
        ) {
          // Ngăn xóa node khi nội dung trống
          return true;
        }

        // Kiểm tra nếu node hiện tại là ảnh
        if ($from.nodeAfter?.type.name === 'image') {
          // Xóa node ảnh
          const imagePos = $from.pos + 1; // Vị trí node ảnh
          dispatch(
            state.tr.delete(imagePos, imagePos + $from.nodeAfter.nodeSize)
          );
          return true; // Ngăn hành vi mặc định
        }

        return false; // Cho phép hành vi mặc định nếu không phải trường hợp đặc biệt
      },
    };
  },
});
