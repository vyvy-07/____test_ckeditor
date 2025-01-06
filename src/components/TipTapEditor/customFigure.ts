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
// import { Node, mergeAttributes } from '@tiptap/core';

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
//         'position: relative; display: inline-block; margin: 0;'
//       );

//       const img = document.createElement('img');
//       img.setAttribute('src', src);
//       img.setAttribute('alt', alt);
//       img.setAttribute('style', style);

//       const caption = document.createElement('figcaption');
//       caption.setAttribute('contenteditable', 'true');
//       caption.textContent =
//         node.content.size > 0 ? node.textContent : 'Enter caption here';

//       // Nút chỉnh kích thước
//       const dotStyle = `
//         position: absolute;
//         width: 10px;
//         height: 10px;
//         background: #000;
//         border-radius: 50%;
//         cursor: nwse-resize;
//       `;

//       const dots = [
//         { position: 'top: -5px; left: -5px;', cursor: 'nwse-resize' },
//         { position: 'top: -5px; right: -5px;', cursor: 'nesw-resize' },
//         { position: 'bottom: -5px; left: -5px;', cursor: 'nesw-resize' },
//         { position: 'bottom: -5px; right: -5px;', cursor: 'nwse-resize' },
//       ];

//       let isResizing = false;
//       let startX: number,
//         startY: number,
//         startWidth: number,
//         startHeight: number;

//       dots.forEach(({ position, cursor }, index) => {
//         const dot = document.createElement('div');
//         dot.setAttribute('style', `${dotStyle} ${position} cursor: ${cursor};`);

//         dot.addEventListener('mousedown', (e) => {
//           e.preventDefault();
//           isResizing = true;
//           startX = e.clientX;
//           startY = e.clientY;
//           startWidth = figure.offsetWidth;
//           startHeight = figure.offsetHeight;

//           const onMouseMove = (e: MouseEvent) => {
//             if (!isResizing) return;

//             const deltaX = e.clientX - startX;
//             const deltaY = e.clientY - startY;

//             let newWidth = startWidth;
//             let newHeight = startHeight;

//             if (index === 0 || index === 2) newWidth = startWidth - deltaX;
//             else newWidth = startWidth + deltaX;

//             if (index === 0 || index === 1) newHeight = startHeight - deltaY;
//             else newHeight = startHeight + deltaY;

//             newWidth = Math.max(50, newWidth);
//             newHeight = Math.max(50, newHeight);

//             figure.style.width = `${newWidth}px`;
//             figure.style.height = `${newHeight}px`;
//             img.style.width = `${newWidth}px`;
//             img.style.height = `${newHeight}px`;
//           };

//           const onMouseUp = () => {
//             isResizing = false;

//             if (typeof getPos === 'function') {
//               const newAttrs = {
//                 ...node.attrs,
//                 style: `width: ${figure.style.width}; height: ${figure.style.height};`,
//               };
//               editor.view.dispatch(
//                 editor.view.state.tr.setNodeMarkup(
//                   getPos(),
//                   undefined,
//                   newAttrs
//                 )
//               );
//             }

//             document.removeEventListener('mousemove', onMouseMove);
//             document.removeEventListener('mouseup', onMouseUp);
//           };

//           document.addEventListener('mousemove', onMouseMove);
//           document.addEventListener('mouseup', onMouseUp);
//         });

//         figure.appendChild(dot);
//       });

//       figure.appendChild(img);
//       figure.appendChild(caption);

//       return {
//         dom: figure,
//         contentDOM: caption,
//       };
//     };
//   },
// });

/////////////////////////////////
import Image from '@tiptap/extension-image';
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
//         'position: relative; display: inline-block; margin: 0;'
//       );

//       const img = document.createElement('img');
//       img.setAttribute('src', src);
//       img.setAttribute('alt', alt);
//       img.setAttribute('style', style);

//       const caption = document.createElement('figcaption');
//       caption.setAttribute('contenteditable', 'true');
//       caption.textContent =
//         node.content.size > 0 ? node.textContent : 'Enter caption here';

//       figure.appendChild(img);
//       figure.appendChild(caption);

//       return {
//         dom: figure,
//         contentDOM: caption,
//       };
//     };
//   },
// });

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

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const { src, alt, style } = node.attrs;

      const figure = document.createElement('figure');
      figure.setAttribute(
        'style',
        'position: relative; display: inline-block; margin: 0;'
      );

      const img = document.createElement('img');
      img.setAttribute('src', src);
      img.setAttribute('alt', alt);
      img.setAttribute('style', style);

      const caption = document.createElement('figcaption');
      caption.setAttribute('contenteditable', 'true');
      caption.textContent =
        node.content.size > 0 ? node.textContent : 'Enter caption here';

      figure.appendChild(img);
      figure.appendChild(caption);

      // Add resize handle on the top-right corner
      const resizeHandle = document.createElement('div');
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.top = '0';
      resizeHandle.style.right = '0';
      resizeHandle.style.width = '10px';
      resizeHandle.style.height = '10px';
      resizeHandle.style.background = 'rgba(0,0,0,0.5)';
      resizeHandle.style.cursor = 'ne-resize'; // Diagonal resize handle
      resizeHandle.style.zIndex = '9999';

      figure.appendChild(resizeHandle);

      let isResizing = false;
      let lastX = 0;
      let lastY = 0;

      resizeHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isResizing = true;
        lastX = e.clientX;
        lastY = e.clientY;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      function onMouseMove(e: MouseEvent) {
        if (isResizing) {
          let dx = e.clientX - lastX;
          let dy = e.clientY - lastY;

          // Resize the figure element
          figure.style.width = `${figure.offsetWidth + dx}px`;
          figure.style.height = `${figure.offsetHeight - dy}px`;

          // Resize the image element to match the figure size
          img.style.width = `${figure.offsetWidth}px`; // Update the img width
          img.style.height = `${figure.offsetHeight}px`; // Update the img height

          lastX = e.clientX;
          lastY = e.clientY;

          // Wait until the DOM has been updated before calculating dimensions
          requestAnimationFrame(() => {
            const figureRect = figure.getBoundingClientRect();
            console.log(
              `Image width: ${figureRect.width}px, Image height: ${figureRect.height}px`
            );

            const editorContainer = document.querySelector(
              '.editor_tiptap'
            ) as HTMLElement;
            const editorRect = editorContainer.getBoundingClientRect();

            const imgRelativeWidth =
              (figureRect.width / editorRect.width) * 100; // Percentage relative to editor
            const imgRelativeHeight =
              (figureRect.height / editorRect.height) * 100; // Percentage relative to editor

            console.log(
              `Relative to editor: Width: ${imgRelativeWidth}%, Height: ${imgRelativeHeight}%`
            );
          });
        }
      }

      function onMouseUp() {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      // Ensure that the image is fully loaded before calculating its size
      img.onload = () => {
        requestAnimationFrame(() => {
          const figureRect = figure.getBoundingClientRect();
          console.log(
            `Image loaded: Width: ${figureRect.width}px, Height: ${figureRect.height}px`
          );
        });
      };

      return {
        dom: figure,
        contentDOM: caption,
      };
    };
  },
});
