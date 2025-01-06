import { Node } from '@tiptap/core';

export const Caption = Node.create({
  name: 'caption',

  group: 'block', // Chỉ định 'block' vì nó sẽ được dùng như một phần của ảnh
  content: 'inline*', // Chỉ chứa nội dung inline

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ];
  },

  renderHTML() {
    return ['figcaption', 0];
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('figcaption');
      dom.textContent = node.textContent;

      return {
        dom,
      };
    };
  },
});
