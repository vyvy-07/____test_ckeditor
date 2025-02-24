import { Node } from '@tiptap/core';

// export const Caption = Node.create({
//   name: 'caption',

//   group: 'block', // Chỉ định 'block' vì nó sẽ được dùng như một phần của ảnh
//   content: 'inline*', // Chỉ chứa nội dung inline

//   parseHTML() {
//     return [
//       {
//         tag: 'figcaption',
//       },
//     ];
//   },

//   renderHTML() {
//     return ['figcaption', 0];
//   },

//   addNodeView() {
//     return ({ node }) => {
//       const dom = document.createElement('figcaption');
//       dom.textContent = node.textContent;

//       return {
//         dom,
//       };
//     };
//   },
// });
// import { Node } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    caption: {
      setCaption: (caption: string) => ReturnType;
    };
  }
}
export const Caption = Node.create({
  name: 'caption',

  group: 'block',
  content: 'text*',
  defining: true,

  parseHTML() {
    return [
      {
        tag: 'figcaption',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setCaption:
        (text: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            content: [
              {
                type: 'text',
                text,
              },
            ],
          });
        },
    };
  },
});
