import { Node, mergeAttributes, NodeViewRendererProps } from '@tiptap/core';
import katex from 'katex';
import 'katex/dist/katex.min.css';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fx: {
      /**
       * Insert a mathematical formula.
       */
      insertFx: (formula: string) => ReturnType;
    };
  }
}
export const FxNode = Node.create({
  name: 'fx',

  group: 'inline',
  inline: true,

  addAttributes() {
    return {
      formula: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-formula'),
        renderHTML: (attributes) => ({
          'data-formula': attributes.formula,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-fx]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-fx': true,
        style: 'font-family: monospace; color: blue;',
      }),
      HTMLAttributes['data-formula'],
    ];
  },

  addNodeView() {
    return ({ node, getPos }: NodeViewRendererProps) => {
      const container = document.createElement('span');
      const formula = node.attrs.formula;

      try {
        katex.render(formula, container, {
          throwOnError: false,
          displayMode: false,
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
        container.textContent = formula;
      }

      return {
        dom: container, // Đây là DOM node sẽ được hiển thị
        update: (updatedNode) => {
          if (updatedNode.type.name !== this.name) {
            return false;
          }
          const newFormula = updatedNode.attrs.formula;
          if (newFormula !== formula) {
            try {
              katex.render(newFormula, container, {
                throwOnError: false,
                displayMode: false,
              });
            } catch (err) {
              console.error('KaTeX rendering error:', err);
              container.textContent = newFormula;
            }
          }
          return true;
        },
      };
    };
  },

  addCommands() {
    return {
      insertFx:
        (formula) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { formula },
          });
        },
    };
  },
});
