import { Node } from '@tiptap/core';

export const Caption = Node.create({
  name: 'caption',

  group: 'block', // Chỉ định là block vì nó là phần của ảnh
  content: 'inline*', // Nội dung là text hoặc inline elements

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ];
  },

  renderHTML() {
    return ['figcaption', 0]; // Xuất ra figcaption
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('figcaption');
      dom.contentEditable = 'true'; // Cho phép chỉnh sửa nội dung
      dom.textContent = node.textContent;

      return {
        dom,
      };
    };
  },
});
