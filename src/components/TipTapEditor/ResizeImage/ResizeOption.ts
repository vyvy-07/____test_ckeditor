import { Node, mergeAttributes } from '@tiptap/core';
import { NodeView, EditorView } from '@tiptap/pm/view';

export interface ResizableFigureOptions {
  HTMLAttributes: Record<string, any>;
}

export const ResizableFigure = Node.create<ResizableFigureOptions>({
  name: 'resizableFigure',

  group: 'block',

  content: 'inline*',

  inline: false,

  atom: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: 'https://via.placeholder.com/300x150',
      },
      width: {
        default: '300px',
      },
      height: {
        default: '200px',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="resizable-figure"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'resizable-figure',
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`, // Đảm bảo width và height vào style
      }),
      [
        'figure',
        {},
        ['img', { src: HTMLAttributes.src }],
        ['figcaption', {}, 0],
      ],
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) =>
      new ResizableFigureView(node, getPos, editor);
  },
});

class ResizableFigureView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  node: any;
  getPos: () => number;
  editor: any;
  toggleButton: HTMLElement;

  constructor(node: any, getPos: () => number, editor: any) {
    this.node = node;
    this.getPos = getPos;
    this.editor = editor;

    // Create the main DOM for the Node
    this.dom = document.createElement('div');
    this.dom.classList.add('resizable-figure');
    this.dom.setAttribute('data-type', 'resizable-figure');
    this.dom.style.position = 'relative';
    this.dom.style.width = node.attrs.width; // Preserve width in node.attrs
    this.dom.style.height = node.attrs.height;
    this.dom.style.resize = 'both';
    this.dom.style.overflow = 'hidden';
    this.dom.style.border = '1px solid #ccc';

    // Create the figure
    const figure = document.createElement('figure');
    figure.style.margin = '0';
    figure.style.display = 'flex';
    figure.style.flexDirection = 'column';
    figure.style.alignItems = 'center';

    // Create img
    const img = document.createElement('img');
    img.src = node.attrs.src;
    img.style.width = '100%';
    img.style.height = 'auto';

    // Create figcaption (editable content)
    const figcaption = document.createElement('figcaption');
    figcaption.style.marginTop = '10px';
    figcaption.style.fontSize = '14px';
    figcaption.style.color = '#555';
    figcaption.style.textAlign = 'center';
    figcaption.contentEditable = 'true'; // Allow editing by default
    figcaption.setAttribute('data-placeholder', 'Enter caption...');
    if (!figcaption.innerHTML.trim()) {
      figcaption.innerHTML = 'typing caption';
    }
    // Connect editable content area
    this.contentDOM = figcaption;

    // Create toggle button for caption
    this.toggleButton = document.createElement('button');
    this.toggleButton.textContent = 'Disable Caption';
    this.toggleButton.style.marginTop = '10px';
    this.toggleButton.addEventListener('click', this.toggleCaption.bind(this));

    // Append elements
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.appendChild(this.toggleButton);
    this.dom.appendChild(figure);

    // Listen for resize changes
    this.dom.addEventListener('mouseup', this.updateNodeAttributes.bind(this));
  }

  // Toggle the visibility and editability of the caption
  toggleCaption() {
    const figcaption = this.contentDOM;
    if (figcaption.contentEditable === 'true') {
      // Make the figcaption non-editable and hide it
      figcaption.contentEditable = 'false';
      this.toggleButton.textContent = 'Enable Caption';
    } else {
      // Make the figcaption editable and show it
      figcaption.contentEditable = 'true';
      this.toggleButton.textContent = 'Disable Caption';
    }
  }

  // Update node attributes when resizing
  updateNodeAttributes() {
    const width = `${this.dom.offsetWidth}px`;
    const height = `${this.dom.offsetHeight}px`;

    // Update the DOM style directly
    this.dom.style.width = width;
    this.dom.style.height = height;

    // Update the node.attrs in ProseMirror
    this.editor.commands.command(({ tr }: any) => {
      tr.setNodeMarkup(this.getPos(), undefined, {
        ...this.node.attrs,
        width,
        height,
      });
      return true;
    });
  }

  // Prevent mutation handling for caption content
  ignoreMutation(mutation: any) {
    if (mutation.type === 'characterData' || mutation.type === 'childList') {
      return false;
    }
    return true;
  }
}

// class ResizableFigureView implements NodeView {
//   dom: HTMLElement;
//   contentDOM: HTMLElement;
//   node: any;
//   getPos: () => number;
//   editor: any;

//   constructor(node: any, getPos: () => number, editor: any) {
//     this.node = node;
//     this.getPos = getPos;
//     this.editor = editor;

//     // Tạo DOM chính cho Node
//     this.dom = document.createElement('div');
//     this.dom.classList.add('resizable-figure');
//     this.dom.setAttribute('data-type', 'resizable-figure');
//     this.dom.style.position = 'relative';
//     this.dom.style.width = node.attrs.width; // Lưu width trong node.attrs
//     this.dom.style.height = node.attrs.height;
//     this.dom.style.resize = 'both';
//     this.dom.style.overflow = 'hidden';
//     this.dom.style.border = '1px solid #ccc';

//     // Tạo figure
//     const figure = document.createElement('figure');
//     figure.style.margin = '0';
//     figure.style.display = 'flex';
//     figure.style.flexDirection = 'column';
//     figure.style.alignItems = 'center';

//     // Tạo img
//     const img = document.createElement('img');
//     img.src = node.attrs.src;
//     img.style.width = '100%';
//     img.style.height = 'auto';

//     // Tạo figcaption (editable content)
//     const figcaption = document.createElement('figcaption');
//     figcaption.style.marginTop = '10px';
//     figcaption.style.fontSize = '14px';
//     figcaption.style.color = '#555';
//     figcaption.style.textAlign = 'center';
//     figcaption.contentEditable = 'true'; // Cho phép chỉnh sửa nội dung
//     figcaption.setAttribute('data-placeholder', 'Enter caption...');

//     // Kết nối vùng nội dung editable
//     this.contentDOM = figcaption;

//     // Gắn vào figure
//     figure.appendChild(img);
//     figure.appendChild(figcaption);

//     // Gắn vào DOM chính
//     this.dom.appendChild(figure);

//     // Lắng nghe thay đổi kích thước
//     this.dom.addEventListener('mouseup', this.updateNodeAttributes.bind(this));
//   }

//   // Cập nhật thuộc tính khi thay đổi kích thước
//   updateNodeAttributes() {
//     const width = `${this.dom.offsetWidth}px`;
//     const height = `${this.dom.offsetHeight}px`;

//     // Cập nhật style DOM trực tiếp
//     this.dom.style.width = width;
//     this.dom.style.height = height;

//     // Cập nhật node.attrs trong ProseMirror
//     this.editor.commands.command(({ tr }: any) => {
//       tr.setNodeMarkup(this.getPos(), undefined, {
//         ...this.node.attrs,
//         width,
//         height,
//       });
//       return true;
//     });
//   }

//   // Không bỏ qua nội dung con trong figcaption
//   ignoreMutation(mutation: any) {
//     if (mutation.type === 'characterData' || mutation.type === 'childList') {
//       return false;
//     }
//     return true;
//   }
// }
