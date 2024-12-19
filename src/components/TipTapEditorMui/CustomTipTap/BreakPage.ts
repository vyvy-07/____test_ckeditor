import { Node, mergeAttributes } from '@tiptap/core';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Set the font size
       */

      /**
       * Unset the font size
       */
      setPageBreak: () => ReturnType;
    };
  }
}
export const PageBreak = Node.create({
  name: 'pageBreak',

  group: 'block',

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-page-break]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-page-break': '' }),
      [
        'div',
        { class: 'page-break-container' },
        ['span', { class: 'page-break-text' }, 'Page Break'],
      ],
    ];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});
