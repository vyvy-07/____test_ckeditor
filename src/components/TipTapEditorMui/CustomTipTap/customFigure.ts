import { Node, mergeAttributes } from '@tiptap/core';

export interface FigureImageAttributes {
  src: string;
  alt?: string;
  caption?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImage: {
      setFigureImage: (attributes: FigureImageAttributes) => ReturnType;
    };
  }
}

import { Plugin } from 'prosemirror-state';

export interface FigureImageAttributes {
  src: string;
  alt?: string;
  style?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    figureImage: {
      setFigureImage: (attributes: FigureImageAttributes) => ReturnType;
    };
  }
}
export const FigureImage = Node.create({
  name: 'figureImage',

  group: 'block',
  content: 'inline*',
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      style: { default: 'width: 100%; height: auto;' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
      },
    ];
  },

  renderHTML({ HTMLAttributes, node }) {
    const { src, alt, style } = node.attrs;
    return [
      'figure',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ['img', { src, alt, style }],
      ['figcaption', {}, 0],
    ];
  },

  addCommands() {
    return {
      setFigureImage:
        ({ src, alt = '' }: { src: string; alt?: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { src, alt },
            content: [
              {
                type: 'text',
                text: 'Enter caption here',
              },
            ],
          });
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const clipboardData = event.clipboardData;
            const items = clipboardData?.items || [];
            for (const item of items) {
              if (item.type.startsWith('image/')) {
                const file: any = item.getAsFile();
                const src = URL.createObjectURL(file);

                view.dispatch(
                  view.state.tr.replaceSelectionWith(
                    this.type.create({
                      attrs: { src, alt: 'Pasted image' },
                      content: [{ type: 'text', text: 'Enter caption here' }],
                    })
                  )
                );
                return true;
              }
            }
            return false;
          },
        },
      }),
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { src, alt, style } = node.attrs;
      const figure = document.createElement('figure');
      figure.setAttribute('style', style);
      figure.style.position = 'relative';
      // figure.style.display = 'inline-block';
      figure.style.margin = '0';
      figure.style.minWidth = '50px'; // Giới hạn chiều rộng tối thiểu

      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.minWidth = '50px'; // Đảm bảo hình ảnh không thu nhỏ quá nhỏ

      const caption = document.createElement('figcaption');
      caption.contentEditable = 'true';
      caption.textContent = node.textContent || 'Enter caption here';

      caption.addEventListener('input', () => {
        const newText = caption.textContent || 'Enter caption here';
        editor.commands.updateAttributes('figureImage', {
          content: [{ type: 'text', text: newText }],
        });
      });

      const resizeHandle = document.createElement('div');
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.right = '0';
      resizeHandle.style.bottom = '0';
      resizeHandle.style.width = '10px';
      resizeHandle.style.height = '10px';
      resizeHandle.style.background = 'rgba(0,0,0,0.5)';
      resizeHandle.style.cursor = 'nwse-resize';

      // Thêm phần tử hiển thị chiều rộng
      const widthDisplay = document.createElement('span');
      widthDisplay.style.position = 'absolute';
      widthDisplay.style.top = '-20px';
      widthDisplay.style.right = '0';
      widthDisplay.style.padding = '2px 5px';
      widthDisplay.style.background = 'rgba(0, 0, 0, 0.7)';
      widthDisplay.style.color = 'white';
      widthDisplay.style.fontSize = '12px';
      widthDisplay.style.borderRadius = '3px';
      widthDisplay.textContent = '100%'; // Giá trị mặc định

      figure.appendChild(img);
      figure.appendChild(caption);
      figure.appendChild(resizeHandle);
      figure.appendChild(widthDisplay);

      let isResizing = false;
      let startX = 0;
      let initialWidth = 0;

      const parentWidth = () => figure.parentElement?.offsetWidth || 1;

      const onMouseMove = (event: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = event.clientX - startX;
        const newWidth = Math.max(
          Math.min(initialWidth + deltaX, parentWidth()), // Giới hạn theo chiều rộng của parent
          50 // Đặt giới hạn tối thiểu là 50px
        );

        // Chắc chắn rằng chiều rộng luôn trong phạm vi từ 0 đến 100%
        const newWidthPercent = Math.max(
          0,
          Math.min((newWidth / parentWidth()) * 100, 100)
        );

        if (
          Math.abs(newWidthPercent - parseFloat(figure.style.width || '100%')) >
          0.1
        ) {
          figure.style.width = `${newWidthPercent}%`;
          img.style.width = `${newWidthPercent}%`;
          widthDisplay.textContent = `${Math.round(newWidthPercent)}%`;

          // Cập nhật `style` vào editor
          editor.commands.updateAttributes('figureImage', {
            style: `width: ${newWidthPercent}%; height: auto;`,
          });
        }
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // Lấy giá trị width cuối cùng
        const finalWidth = figure.style.width;

        // Cập nhật vào editor
        editor.commands.updateAttributes('figureImage', {
          style: `width: ${finalWidth}; height: auto;`,
        });

        // Cập nhật hiển thị width
        widthDisplay.textContent = finalWidth;
      };

      resizeHandle.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isResizing = true;
        startX = event.clientX;
        initialWidth = figure.offsetWidth; // Lấy chiều rộng ban đầu
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      return {
        dom: figure,
        contentDOM: caption,
        update: (updatedNode) => {
          if (isResizing) return true;

          if (updatedNode.type !== node.type) return false;

          const { src, alt, style } = updatedNode.attrs;

          if (src !== node.attrs.src) img.src = src;
          if (alt !== node.attrs.alt) img.alt = alt;
          if (style !== node.attrs.style) {
            const matchWidth = style.match(/width: ([^;]+)/);
            if (matchWidth) {
              const newWidth = matchWidth[1];
              figure.style.width = newWidth;

              // Cập nhật hiển thị chiều rộng
              widthDisplay.textContent = newWidth;
            }
          }

          return true;
        },
      };
    };
  },
});
// export const FigureImage = Node.create({
//   name: 'figureImage',

//   group: 'block',
//   content: 'inline*',
//   draggable: true,

//   addAttributes() {
//     return {
//       src: { default: null },
//       alt: { default: '' },
//       style: { default: 'width: initial; height: auto;' },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'figure',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes, node }) {
//     const { src, alt, style } = node.attrs;
//     return [
//       'figure',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       ['img', { src, alt, style }],
//       ['figcaption', {}, 0],
//     ];
//   },

//   addCommands() {
//     return {
//       setFigureImage:
//         ({ src, alt = '' }: { src: string; alt?: string }) =>
//         ({ commands }) => {
//           return commands.insertContent({
//             type: this.name,
//             attrs: { src, alt },
//             content: [
//               {
//                 type: 'text',
//                 text: 'Enter caption here',
//               },
//             ],
//           });
//         },
//     };
//   },

//   addProseMirrorPlugins() {
//     return [
//       new Plugin({
//         props: {
//           handlePaste: (view, event) => {
//             const clipboardData = event.clipboardData;
//             const items = clipboardData?.items || [];
//             for (const item of items) {
//               if (item.type.startsWith('image/')) {
//                 const file: any = item.getAsFile();
//                 const src = URL.createObjectURL(file);

//                 view.dispatch(
//                   view.state.tr.replaceSelectionWith(
//                     this.type.create({
//                       attrs: { src, alt: 'Pasted image' },
//                       content: [{ type: 'text', text: 'Enter caption here' }],
//                     })
//                   )
//                 );
//                 return true;
//               }
//             }
//             return false;
//           },
//         },
//       }),
//     ];
//   },

// addNodeView() {
//   return ({ node, getPos, editor }) => {
//     const { src, alt, style } = node.attrs;
//     const figure = document.createElement('figure');
//     figure.setAttribute('style', style);
//     const img = document.createElement('img');
//     img.src = src;
//     img.alt = alt;
//     img.style.width = '100%';
//     img.style.height = 'auto';

//     const caption = document.createElement('figcaption');
//     caption.contentEditable = 'true';
//     caption.textContent = node.textContent || 'Enter caption here';

//     caption.addEventListener('input', () => {
//       const newText = caption.textContent || 'Enter caption here';
//       editor.commands.updateAttributes('figureImage', {
//         content: [{ type: 'text', text: newText }],
//       });
//     });

//     const resizeHandle = document.createElement('div');
//     resizeHandle.style.position = 'absolute';
//     resizeHandle.style.right = '0';
//     resizeHandle.style.bottom = '0';
//     resizeHandle.style.width = '10px';
//     resizeHandle.style.height = '10px';
//     resizeHandle.style.background = 'rgba(0,0,0,0.5)';
//     resizeHandle.style.cursor = 'nwse-resize';

//     // Thêm phần tử hiển thị chiều rộng
//     const widthDisplay = document.createElement('span');
//     widthDisplay.style.position = 'absolute';
//     widthDisplay.style.top = '-20px';
//     widthDisplay.style.right = '0';
//     widthDisplay.style.padding = '2px 5px';
//     widthDisplay.style.background = 'rgba(0, 0, 0, 0.7)';
//     widthDisplay.style.color = 'white';
//     widthDisplay.style.fontSize = '12px';
//     widthDisplay.style.borderRadius = '3px';
//     widthDisplay.textContent = '100%'; // Giá trị mặc định

//     figure.appendChild(img);
//     figure.appendChild(caption);
//     figure.appendChild(resizeHandle);
//     figure.appendChild(widthDisplay);

//     let isResizing = false;
//     let startX = 0;
//     let initialWidth = 0;

//     const parentWidth = () => figure.parentElement?.offsetWidth || 1;

//     const onMouseMove = (event: MouseEvent) => {
//       if (!isResizing) return;

//       const deltaX = event.clientX - startX;

//       // Tính chiều rộng mới
//       const newWidth = Math.max(
//         Math.min(initialWidth + deltaX, parentWidth()),
//         0.05 * parentWidth() // Đặt giới hạn tối thiểu 5%
//       );

//       // Tính tỷ lệ % mới
//       const newWidthPercent = (newWidth / parentWidth()) * 100;

//       // Cập nhật chiều rộng của figure
//       figure.style.width = `${newWidthPercent}%`;

//       // Cập nhật hiển thị chiều rộng
//       widthDisplay.textContent = `${Math.round(newWidthPercent)}%`;

//       // Cập nhật `style` vào editor
//       editor.commands.updateAttributes('figureImage', {
//         style: `width: ${newWidthPercent}%; height: auto;`,
//       });
//     };

//     const onMouseUp = () => {
//       isResizing = false;
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };

//     resizeHandle.addEventListener('mousedown', (event) => {
//       event.preventDefault();
//       isResizing = true;
//       startX = event.clientX;
//       initialWidth = figure.offsetWidth; // Lấy chiều rộng ban đầu
//       document.addEventListener('mousemove', onMouseMove);
//       document.addEventListener('mouseup', onMouseUp);
//     });

//     return {
//       dom: figure,
//       contentDOM: caption,
//       update: (updatedNode) => {
//         // Không cập nhật nếu đang resize
//         if (isResizing) return true;

//         if (updatedNode.type !== node.type) return false;

//         const { src, alt, style } = updatedNode.attrs;

//         if (src !== node.attrs.src) img.src = src;
//         if (alt !== node.attrs.alt) img.alt = alt;
//         if (style !== node.attrs.style) {
//           const matchWidth = style.match(/width: ([^;]+)/);
//           if (matchWidth) {
//             const newWidth = matchWidth[1];
//             figure.style.width = newWidth;

//             // Cập nhật hiển thị chiều rộng
//             widthDisplay.textContent = newWidth;
//           }
//         }

//         return true;
//       },
//     };
//   };
//   },
// });
