import { Extension } from '@tiptap/core';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    toggleCaption: {
      /**
       * Insert a custom figure image with src, alt, and caption attributes.
       */
      toggleCaption: () => ReturnType;
    };
  }
}

export const ToggleCaption = Extension.create({
  name: 'toggleCaption',

  addCommands() {
    return {
      toggleCaption:
        () =>
        ({ state, dispatch }: { state: any; dispatch: any }) => {
          const { from, to } = state.selection;
          const node = state.doc.nodeAt(from);

          if (node && node.type.name === 'figureImage') {
            // Lấy giá trị hiện tại của thuộc tính 'hasCaption'
            const hasCaption = node.attrs.hasCaption;
            // Toggle 'hasCaption' và cập nhật lại giá trị hiển thị của figcaption
            const newHasCaption = !hasCaption;

            const tr = state.tr.setNodeMarkup(from, undefined, {
              ...node.attrs,
              hasCaption: newHasCaption,
            });

            // Cập nhật sự thay đổi
            dispatch(tr);
          }

          return true;
        },
    };
  },
});
