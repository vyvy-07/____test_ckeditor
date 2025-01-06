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

      // // Nút chỉnh kích thước
      // const dotStyle = `
      //   position: absolute;
      //   width: 10px;
      //   height: 10px;
      //   background: #000;
      //   border-radius: 50%;
      //   cursor: nwse-resize;
      // `;

      // const dots = [
      //   { position: 'top: -5px; left: -5px;', cursor: 'nwse-resize' },
      //   { position: 'top: -5px; right: -5px;', cursor: 'nesw-resize' },
      //   { position: 'bottom: -5px; left: -5px;', cursor: 'nesw-resize' },
      //   { position: 'bottom: -5px; right: -5px;', cursor: 'nwse-resize' },
      // ];

      // let isResizing = false;
      // let startX: number,
      //   startY: number,
      //   startWidth: number,
      //   startHeight: number;

      // dots.forEach(({ position, cursor }, index) => {
      //   const dot = document.createElement('div');
      //   dot.setAttribute('style', `${dotStyle} ${position} cursor: ${cursor};`);

      //   dot.addEventListener('mousedown', (e) => {
      //     e.preventDefault();
      //     isResizing = true;
      //     startX = e.clientX;
      //     startY = e.clientY;
      //     startWidth = figure.offsetWidth;
      //     startHeight = figure.offsetHeight;

      //     const onMouseMove = (e: MouseEvent) => {
      //       if (!isResizing) return;

      //       const deltaX = e.clientX - startX;
      //       const deltaY = e.clientY - startY;

      //       let newWidth = startWidth;
      //       let newHeight = startHeight;

      //       if (index === 0 || index === 2) newWidth = startWidth - deltaX;
      //       else newWidth = startWidth + deltaX;

      //       if (index === 0 || index === 1) newHeight = startHeight - deltaY;
      //       else newHeight = startHeight + deltaY;

      //       newWidth = Math.max(50, newWidth);
      //       newHeight = Math.max(50, newHeight);

      //       figure.style.width = `${newWidth}px`;
      //       figure.style.height = `${newHeight}px`;
      //       img.style.width = `${newWidth}px`;
      //       img.style.height = `${newHeight}px`;
      //     };

      //     const onMouseUp = () => {
      //       isResizing = false;

      //       // Kiểm tra xem getPos có hợp lệ không
      //       const pos = getPos();
      //       if (pos === undefined) {
      //         console.error('getPos is undefined or invalid.');
      //         return;
      //       }

      //       // Cập nhật thuộc tính của node sau khi thay đổi kích thước
      //       const newAttrs = {
      //         ...node.attrs,
      //         style: `width: ${figure.style.width}; height: ${figure.style.height};`,
      //       };

      //       // Cập nhật node với các thuộc tính mới
      //       editor.view.dispatch(
      //         editor.view.state.tr.setNodeMarkup(pos, undefined, newAttrs)
      //       );

      //       document.removeEventListener('mousemove', onMouseMove);
      //       document.removeEventListener('mouseup', onMouseUp);
      //     };

      //     document.addEventListener('mousemove', onMouseMove);
      //     document.addEventListener('mouseup', onMouseUp);
      //   });

      //   figure.appendChild(dot);
      // });

      figure.appendChild(img);
      figure.appendChild(caption);

      return {
        dom: figure,
        contentDOM: caption,
      };
    };
  },
});
