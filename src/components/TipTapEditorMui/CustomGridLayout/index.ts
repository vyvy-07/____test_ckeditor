import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customTable: {
      insertCustomTable: (layoutName: string, columns: number) => ReturnType;
    };
  }
}

export const CustomTable = Node.create({
  name: 'customTable',

  group: 'block',

  content: 'customRow',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[class=custom-table]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ class: 'custom-table' }, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      insertCustomTable:
        (layoutName = 'default', columns = 3) =>
        ({ commands }) => {
          // Tạo các customCell dựa trên số cột (columns)
          const cells = Array.from({ length: columns }, (_, index) => ({
            type: 'customCell',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: `Cell ${index + 1}` }],
              },
            ],
          }));

          // Trả về nội dung chèn vào editor với các thông tin layout và số cột
          return commands.insertContent({
            type: 'customTable',
            content: [
              {
                type: 'customRow',
                attrs: { layoutName }, // Gửi layoutName để áp dụng CSS
                content: cells,
              },
            ],
          });
        },
    };
  },
});
