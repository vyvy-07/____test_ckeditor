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
        default: '100%',
      },
      height: {
        default: 'auto',
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

  constructor(node: any, getPos: () => number, editor: any) {
    this.node = node;
    this.getPos = getPos;
    this.editor = editor;

    // Tạo DOM chính cho Node
    this.dom = document.createElement('div');
    this.dom.classList.add('resizable-figure');
    this.dom.setAttribute('data-type', 'resizable-figure');
    this.dom.style.position = 'relative';
    this.dom.style.width = `${
      (parseFloat(node.attrs.width) / this.getEditorWidth()) * 100
    }%`;
    this.dom.style.height = node.attrs.height;
    this.dom.style.resize = 'both';
    this.dom.style.overflow = 'hidden';
    this.dom.style.border = '1px solid #ccc';
    this.dom.style.maxWidth = '100%';

    // Tạo figure
    const figure = document.createElement('figure');
    figure.style.margin = '0';
    figure.style.display = 'flex';
    figure.style.flexDirection = 'column';
    figure.style.alignItems = 'center';

    // Tạo img
    const img = document.createElement('img');
    img.src = node.attrs.src;
    img.style.width = '100%';
    img.style.height = 'auto';

    // Tạo figcaption (editable content)
    const figcaption = document.createElement('figcaption');
    figcaption.style.marginTop = '10px';
    figcaption.style.fontSize = '14px';
    figcaption.style.color = '#555';
    figcaption.style.textAlign = 'center';
    figcaption.contentEditable = 'true'; // Cho phép chỉnh sửa nội dung
    figcaption.setAttribute('data-placeholder', 'Enter caption...');
    if (!figcaption.innerHTML.trim()) {
      figcaption.innerHTML = 'typing caption';
    }
    this.contentDOM = figcaption;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    this.dom.appendChild(figure);

    // Lắng nghe sự kiện thay đổi kích thước của phần tử
    this.dom.addEventListener('resize', () => this.updateNodeAttributes());

    // Lắng nghe sự kiện thay đổi kích thước của khung cha (editor)
    window.addEventListener('resize', () => {
      return this.updateWidthPercentage();
    });
  }

  // Lấy chiều rộng của editor hiện tại
  getEditorWidth() {
    const editorElement = document.querySelector(
      '.tiptap__editor'
    ) as HTMLElement;
    return editorElement ? editorElement.getBoundingClientRect().width : 0;
  }

  // Cập nhật kích thước (phần trăm) khi thay đổi kích thước khung cha
  updateWidthPercentage() {
    const editorWidth = this.getEditorWidth();
    const currentWidthPx = this.dom.offsetWidth;
    const widthPercentage = (currentWidthPx / editorWidth) * 100;

    // Cập nhật chiều rộng của phần tử
    this.dom.style.width = `${Math.min(widthPercentage, 100)}%`;

    // Đồng bộ lại node.attrs
    this.editor.commands.command(({ tr }: any) => {
      tr.setNodeMarkup(this.getPos(), undefined, {
        ...this.node.attrs,
        width: `${Math.min(widthPercentage, 100)}%`, // Đảm bảo chiều rộng không vượt quá 100%
      });
      return true;
    });
  }

  // Cập nhật thuộc tính khi thay đổi kích thước
  updateNodeAttributes() {
    const editorWidth = this.getEditorWidth();
    const widthPx = this.dom.offsetWidth;
    const heightPx = this.dom.offsetHeight;
    const widthPercentage = (widthPx / editorWidth) * 100;

    // Cập nhật DOM
    this.dom.style.width = `${Math.min(widthPercentage, 100)}%`;
    this.dom.style.height = `${heightPx}px`;

    // Cập nhật node.attrs trong ProseMirror
    this.editor.commands.command(({ tr }: any) => {
      tr.setNodeMarkup(this.getPos(), undefined, {
        ...this.node.attrs,
        width: `${Math.min(widthPercentage, 100)}%`, // Lưu chiều rộng dưới dạng %
        height: `${heightPx}px`,
      });
      return true;
    });
  }

  // Không bỏ qua nội dung con trong figcaption
  ignoreMutation(mutation: any) {
    if (mutation.type === 'characterData' || mutation.type === 'childList') {
      return false;
    }
    return true;
  }
}
