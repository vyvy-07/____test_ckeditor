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
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'resizable-figure',
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`, // Đảm bảo width và height vào style
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
    this.dom.style.width = node.attrs.width; // Preserve width in node.attrs
    this.dom.style.height = node.attrs.height;
    this.dom.style.resize = 'both';
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
    // Connect editable content area
    this.contentDOM = figcaption;

    // Append elements
    figure.appendChild(img);
    figure.appendChild(figcaption);
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
    } else {
      // Make the figcaption editable and show it
      figcaption.contentEditable = 'true';
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
