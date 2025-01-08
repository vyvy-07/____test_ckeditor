// import { Node, mergeAttributes, CommandProps } from '@tiptap/core';
// export interface FigureImageAttributes {
//   src: string;
//   alt?: string;
//   caption?: string;
// }

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     figureImage: {
//       setFigureImage: (attributes: FigureImageAttributes) => ReturnType;
//     };
//   }
// }

// export const FigureImage = Node.create({
//   name: 'figureImage',

//   group: 'block',

//   content: 'block*', // Cho phép caption có thể chỉnh sửa
//   draggable: true,

//   addAttributes() {
//     return {
//       src: {
//         default: null,
//       },
//       alt: {
//         default: '',
//       },
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
//     const { src, alt } = node.attrs;

//     return [
//       'figure',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       ['img', { src, alt }],
//       ['figcaption', {}, 0], // `0` đại diện cho nội dung có thể chỉnh sửa
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
//                 type: 'paragraph', // Cho phép nội dung chỉnh sửa bên trong figcaption
//                 content: [{ type: 'text', text: 'Enter caption here' }],
//               },
//             ],
//           });
//         },
//     };
//   },
// });

////////////////////////////////////
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

// import { Node, mergeAttributes } from '@tiptap/core';
/////////////////////////////////////////////////10:14
// export interface FigureImageAttributes {
//   src: string;
//   alt?: string;
//   // caption?: string;
// }

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     figureImage: {
//       setFigureImage: (attributes: FigureImageAttributes) => ReturnType;
//     };
//   }
// }
// export const FigureImage = Node.create({
//   name: 'figureImage',

//   group: 'block',
//   content: 'inline*',
//   draggable: true,

//   addAttributes() {
//     return {
//       src: { default: null },
//       alt: { default: '' },
//       style: { default: 'width: 100%; height: auto;' },
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

//   addNodeView() {
//     return ({ node, getPos, editor }) => {
//       const { src, alt, style } = node.attrs;

//       const figure = document.createElement('figure');
//       figure.setAttribute(
//         'style',
//         `position: relative; display: inline-block; margin: 0; ${style || ''}`
//       );

//       const img = document.createElement('img');
//       img.setAttribute('src', src);
//       img.setAttribute('alt', alt);
//       img.setAttribute(
//         'style',
//         style || 'width: auto; max-width: 100%; transition: width 0.2s ease;'
//       );

//       const caption = document.createElement('figcaption');
//       caption.setAttribute('contenteditable', 'true');
//       caption.textContent =
//         node.content.size > 0 ? node.textContent : 'Enter caption here';

//       figure.appendChild(img);
//       figure.appendChild(caption);

//       const resizeDot = document.createElement('div');
//       resizeDot.style.position = 'absolute';
//       resizeDot.style.right = '0';
//       resizeDot.style.bottom = '0';
//       resizeDot.style.width = '10px';
//       resizeDot.style.height = '10px';
//       resizeDot.style.background = 'rgba(0,0,0,0.5)';
//       resizeDot.style.cursor = 'nwse-resize';
//       resizeDot.style.zIndex = '10';
//       figure.appendChild(resizeDot);

//       let isResizing = false;
//       let startX = 0;
//       let startWidth = 0;

//       const onMouseMove = (e: any) => {
//         if (!isResizing) return;

//         const deltaX = e.clientX - startX;
//         const newWidth = Math.max(startWidth + deltaX, 50);

//         img.style.width = `100%`;
//         figure.style.width = `${newWidth}px`;
//         // caption.style.width = `100%`;

//         // Cập nhật style qua lệnh
//         editor.commands.updateAttributes('figureImage', {
//           style: `width: ${newWidth}px; height: auto; transition: width 0.2s ease;`,
//         });
//       };

//       const onMouseUp = () => {
//         isResizing = false;
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//       };

//       resizeDot.addEventListener('mousedown', (e) => {
//         e.preventDefault();
//         isResizing = true;
//         startX = e.clientX;
//         startWidth = figure.offsetWidth;

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//       });

//       return {
//         dom: figure,
//         contentDOM: caption,
//         update: (updatedNode) => {
//           if (updatedNode.type !== node.type) return false;

//           const { src, alt, style } = updatedNode.attrs;

//           if (src !== node.attrs.src) img.setAttribute('src', src);
//           if (alt !== node.attrs.alt) img.setAttribute('alt', alt);
//           if (style !== node.attrs.style)
//             img.setAttribute(
//               'style',
//               style ||
//                 'width: auto; max-width: 100%; transition: width 0.2s ease;'
//             );

//           return true;
//         },
//       };
//     };
//   },
// });
//////////////////////////////////////4:03
// export const FigureImage = Node.create({
//   name: 'figureImage',

//   group: 'block',
//   content: 'caption?', // Chỉ chứa block nội dung
//   draggable: true,

//   addAttributes() {
//     return {
//       src: { default: null },
//       alt: { default: '' },
//       style: { default: 'width: 100%; height: auto;' },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'figure',
//         getAttrs: (node) =>
//           (node as HTMLElement).querySelector('figcaption') ? {} : false,
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes, node }) {
//     const { src, alt, style } = node.attrs;
//     return [
//       'figure',
//       mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//       ['img', { src, alt, style }],
//       ['figcaption', {}, 0], // Render figcaption nếu có nội dung
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
//                 type: 'caption',
//                 content: [
//                   {
//                     type: 'text',
//                     text: 'Enter caption here',
//                   },
//                 ],
//               },
//             ],
//           });
//         },
//     };
//   },

//   addNodeView() {
//     return ({ node, getPos, editor }) => {
//       const { src, alt, style } = node.attrs;

//       const figure = document.createElement('figure');
//       figure.style.cssText = `position: relative; display: inline-block; margin: 0; ${
//         style || ''
//       }`;

//       const img = document.createElement('img');
//       img.src = src;
//       img.alt = alt;
//       img.style.cssText =
//         'width: auto; max-width: 100%; transition: width 0.2s ease;';
//       figure.appendChild(img);

//       const figcaption = document.createElement('figcaption');
//       figcaption.contentEditable = 'true';
//       figcaption.textContent =
//         node.content.size > 0 ? node.textContent : 'Enter caption here';
//       figure.appendChild(figcaption);

//       figcaption.addEventListener('input', () => {
//         const newCaption = figcaption.textContent || '';
//         editor.commands.updateAttributes('caption', { text: newCaption });
//       });

//       return {
//         dom: figure,
//         contentDOM: figcaption, // Nội dung editable của figcaption
//         update: (updatedNode) => {
//           if (updatedNode.type !== node.type) return false;

//           const { src, alt, style } = updatedNode.attrs;

//           if (src !== node.attrs.src) img.setAttribute('src', src);
//           if (alt !== node.attrs.alt) img.setAttribute('alt', alt);
//           if (style !== node.attrs.style)
//             figure.style.cssText = `position: relative; display: inline-block; margin: 0; ${
//               style || ''
//             }`;

//           return true;
//         },
//       };
//     };
//   },
// });
////////////////

// import { Node } from '@tiptap/core';

// Caption Node
// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     caption: {
//       setCaption: (text: string) => ReturnType;
//     };
//   }
// }

// // FigureImage Node
// export const FigureImage = Node.create({
//   name: 'figureImage',

//   group: 'block',
//   content: 'caption?',
//   draggable: true,

//   addAttributes() {
//     return {
//       src: { default: null },
//       alt: { default: '' },
//       style: { default: 'width: 100%; height: auto;' },
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
//       HTMLAttributes,
//       ['img', { src, alt, style }],
//       0, // Placeholder for caption
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
//           });
//         },

//       toggleCaption:
//         () =>
//         ({ state, dispatch }: { state: any; dispatch: any }) => {
//           const { $from } = state.selection;
//           const node = $from.node($from.depth);

//           if (node.type.name === 'figureImage') {
//             const hasCaption = node.content.size > 0;
//             if (hasCaption) {
//               // Remove Caption
//               const tr = state.tr;
//               tr.delete($from.pos + 1, $from.pos + 1 + node.nodeSize);
//               dispatch(tr);
//             } else {
//               // Add Caption
//               const tr = state.tr;
//               tr.insert(
//                 $from.pos + node.nodeSize - 1,
//                 state.schema.nodes.caption.create()
//               );
//               dispatch(tr);
//             }
//             return true;
//           }

//           return false;
//         },
//     };
//   },

//   addNodeView() {
//     return ({ node, getPos, editor }) => {
//       const { src, alt, style } = node.attrs;

//       const figure = document.createElement('figure');
//       figure.style.cssText = `position: relative; display: inline-block; margin: 0; ${
//         style || ''
//       }`;

//       const img = document.createElement('img');
//       img.src = src;
//       img.alt = alt;
//       img.style.cssText =
//         'width: auto; max-width: 100%; transition: width 0.2s ease;';
//       figure.appendChild(img);

//       const resizeDot = document.createElement('div');
//       resizeDot.style.position = 'absolute';
//       resizeDot.style.right = '0';
//       resizeDot.style.bottom = '0';
//       resizeDot.style.width = '10px';
//       resizeDot.style.height = '10px';
//       resizeDot.style.background = 'rgba(0,0,0,0.5)';
//       resizeDot.style.cursor = 'nwse-resize';
//       resizeDot.style.zIndex = '10';
//       figure.appendChild(resizeDot);

//       let isResizing = false;
//       let startX = 0;
//       let startWidth = 0;

//       const onMouseMove = (e: MouseEvent) => {
//         if (!isResizing) return;

//         const deltaX = e.clientX - startX;
//         const newWidth = Math.max(startWidth + deltaX, 50);

//         img.style.width = '100%';
//         figure.style.width = `${newWidth}px`;

//         editor.commands.updateAttributes('figureImage', {
//           style: `width: ${newWidth}px; height: auto; transition: width 0.2s ease;`,
//         });
//       };

//       const onMouseUp = () => {
//         isResizing = false;
//         document.removeEventListener('mousemove', onMouseMove);
//         document.removeEventListener('mouseup', onMouseUp);
//       };

//       resizeDot.addEventListener('mousedown', (e) => {
//         e.preventDefault();
//         isResizing = true;
//         startX = e.clientX;
//         startWidth = figure.offsetWidth;

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//       });

//       return {
//         dom: figure,
//         contentDOM: document.createElement('figcaption'), // Placeholder for caption
//         update: (updatedNode) => {
//           if (updatedNode.type !== node.type) return false;

//           const { src, alt, style } = updatedNode.attrs;

//           if (src !== node.attrs.src) img.setAttribute('src', src);
//           if (alt !== node.attrs.alt) img.setAttribute('alt', alt);
//           if (style !== node.attrs.style)
//             figure.style.cssText = `position: relative; display: inline-block; margin: 0; ${
//               style || ''
//             }`;

//           return true;
//         },
//       };
//     };
//   },
// });

// import { Node, mergeAttributes } from '@tiptap/core';
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
      figure.setAttribute(
        'style',
        `position: relative; display: inline-block; margin: 0; ${style || ''}`
      );

      const img = document.createElement('img');
      img.setAttribute('src', src);
      img.setAttribute('alt', alt);
      img.setAttribute(
        'style',
        style || 'width: auto; max-width: 100%; transition: width 0.2s ease;'
      );

      const caption = document.createElement('figcaption');
      caption.setAttribute('contenteditable', 'true');
      caption.textContent = node.textContent || 'Enter caption here';

      caption.addEventListener('input', () => {
        const newCaption = caption.textContent || 'Enter caption here';
        editor.commands.updateAttributes('figureImage', {
          content: [{ type: 'text', text: newCaption }],
        });
      });

      figure.appendChild(img);
      figure.appendChild(caption);

      const resizeDot = document.createElement('div');
      resizeDot.style.position = 'absolute';
      resizeDot.style.right = '0';
      resizeDot.style.bottom = '0';
      resizeDot.style.width = '10px';
      resizeDot.style.height = '10px';
      resizeDot.style.background = 'rgba(0,0,0,0.5)';
      resizeDot.style.cursor = 'nwse-resize';
      resizeDot.style.zIndex = '10';
      figure.appendChild(resizeDot);

      let isResizing = false;
      let startX = 0;
      let startWidth = 0;

      const onMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, 50); // Giới hạn tối thiểu là 50px.

        img.style.width = '100%';
        figure.style.width = `${newWidth}px`;

        editor.commands.updateAttributes('figureImage', {
          style: `width: ${newWidth}px; height: auto; transition: width 0.2s ease;`,
        });
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      resizeDot.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isResizing = true;
        startX = e.clientX;
        startWidth = figure.offsetWidth;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      return {
        dom: figure,
        contentDOM: caption,
        update: (updatedNode) => {
          if (updatedNode.type !== node.type) return false;

          const { src, alt, style } = updatedNode.attrs;

          if (src !== node.attrs.src) img.setAttribute('src', src);
          if (alt !== node.attrs.alt) img.setAttribute('alt', alt);
          if (style !== node.attrs.style)
            img.setAttribute(
              'style',
              style ||
                'width: auto; max-width: 100%; transition: width 0.2s ease;'
            );

          return true;
        },
      };
    };
  },
});
