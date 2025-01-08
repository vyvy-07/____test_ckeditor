import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';

export interface GridLayoutOptions {
  types: string[]; // List of layout types
  HTMLAttributes: Record<string, any>; // Default HTML attributes
}

export const inputRegex = /^\s*grid\s$/;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gridLayout: {
      /**
       * Toggle grid layout type
       */
      toggleGridLayout: (type: string) => ReturnType;
    };
  }
}

const getGridStyles = (type: string) => {
  switch (type) {
    case 'layout1x10x1':
      return 'display: grid; grid-template-columns: 1fr 10fr 1fr; gap: 1rem;';
    case 'layout2x8x2':
      return 'display: grid; grid-template-columns: 2fr 8fr 2fr; gap: 1rem;';
    case 'layout3x9':
      return 'display: grid; grid-template-columns: 3fr 9fr; gap: 1rem;';
    case 'layout4x4x4':
      return 'display: grid; grid-template-columns: 4fr 4fr 4fr; gap: 1rem;';
    case 'layout6x6':
      return 'display: grid; grid-template-columns: 6fr 6fr; gap: 1rem;';
    case 'layout3x6x3':
      return 'display: grid; grid-template-columns: 3fr 6fr 3fr; gap: 1rem;';
    case 'layout8x4':
      return 'display: grid; grid-template-columns: 8fr 4fr; gap: 1rem;';
    case 'layout4x8':
      return 'display: grid; grid-template-columns: 4fr 8fr; gap: 1rem;';
    case 'layout9x3':
      return 'display: grid; grid-template-columns: 9fr 3fr; gap: 1rem;';
    default:
      return '';
  }
};

export const GridLayout = Node.create<GridLayoutOptions>({
  name: 'gridLayout',

  addOptions() {
    return {
      types: [
        'layout2x8x2',
        'layout3x9',
        'layout4x4x4',
        'layout6x6',
        'layout3x6x3',
        'layout8x4',
        'layout4x8',
        'layout9x3',
      ], // New layout types
      HTMLAttributes: {},
    };
  },

  content: 'block+',

  group: 'block',

  defining: true,

  addAttributes() {
    return {
      type: {
        default: null, // Current layout type
      },
    };
  },

  parseHTML() {
    return this.options.types.map((type) => ({
      tag: `div[data-grid-type="${type}"]`,
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const { type } = node.attrs;
    const gridStyles = getGridStyles(type);

    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-grid-type': type,
        class: 'grid-layout',
        style: gridStyles,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleGridLayout:
        (type) =>
        ({ commands }) => {
          return commands.toggleWrap(this.name, { type });
        },
    };
  },

  addInputRules() {
    return this.options.types.map((type) =>
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: () => ({ type }),
      })
    );
  },
});
