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
        default: '100%', // Sử dụng % mặc định
      },
      height: {
        default: 'auto', // Chiều cao tự động
      },
      alt: '',
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
    const style = [];

    if (HTMLAttributes.width) {
      style.push(`width: ${HTMLAttributes.width};`);
    }
    if (HTMLAttributes.height) {
      style.push(`height: ${HTMLAttributes.height};`);
    }

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'resizable-figure',
        style: style.join(' '), // Kết hợp các style
      }),
      [
        'figure',
        {},
        ['img', { src: HTMLAttributes.src, alt: HTMLAttributes.alt }],
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

  constructor(node: any, getPos: () => number, editor: any) {
    this.node = node;
    this.getPos = getPos;
    this.editor = editor;

    // Create the main DOM for the Node
    this.dom = document.createElement('div');
    this.dom.classList.add('resizable-figure');
    this.dom.setAttribute('data-type', 'resizable-figure');
    this.dom.style.position = 'relative';
    this.dom.style.width = node.attrs.width; // Preserve width in %
    this.dom.style.height = node.attrs.height;
    this.dom.style.resize = 'none'; // Disable default resize
    this.dom.style.overflow = 'hidden';
    this.dom.style.border = '1px solid #ccc';
    this.dom.style.maxWidth = '100%';

    // Create the figure
    const figure = document.createElement('figure');
    figure.style.margin = '0';
    figure.style.display = 'flex';
    figure.style.flexDirection = 'column';
    figure.style.alignItems = 'center';

    // Create img
    const img = document.createElement('img');
    img.src = node.attrs.src;
    img.alt = node.attrs.alt;
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
    this.contentDOM = figcaption;

    // Append elements
    figure.appendChild(img);
    figure.appendChild(figcaption);
    this.dom.appendChild(figure);

    // Add resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.style.width = '10px';
    resizeHandle.style.height = '10px';
    resizeHandle.style.background = 'rgba(0,0,0,0.5)';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.right = '0';
    resizeHandle.style.bottom = '0';
    resizeHandle.style.cursor = 'nwse-resize';
    this.dom.appendChild(resizeHandle);

    // Add event listeners for resize
    resizeHandle.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      let startX = event.clientX;
      let startWidth = this.dom.offsetWidth;
      const parentWidth = this.dom.parentElement?.offsetWidth || 1;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const newWidth = Math.max(startWidth + deltaX, 50); // Minimum width
        const widthPercentage = `${(newWidth / parentWidth) * 100}%`;
        const aspectRatio =
          parseFloat(this.dom.offsetHeight.toString()) /
          parseFloat(this.dom.offsetWidth.toString());
        const newHeight = newWidth * aspectRatio;

        this.dom.style.width = widthPercentage;
        this.dom.style.height = `${newHeight}px`;
      };

      const onMouseUp = () => {
        this.updateNodeAttributes();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Prevent propagation of events in the caption
    this.contentDOM.addEventListener('mousedown', (event: MouseEvent) => {
      event.stopPropagation();
    });
  }
  updateNodeAttributes() {
    const parentWidth = this.dom.parentElement?.offsetWidth || 1;
    let widthPercentage = (this.dom.offsetWidth / parentWidth) * 100;

    // Làm tròn tới 2 chữ số thập phân
    widthPercentage = Math.min(Math.round(widthPercentage * 100) / 100, 110);

    const width = `${widthPercentage}%`;
    const height = 'fit-content'; // Chiều cao giữ nguyên bằng px

    // Cập nhật DOM
    this.dom.style.width = width;
    this.dom.style.height = height;

    // Cập nhật thuộc tính node.attrs trong ProseMirror
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
