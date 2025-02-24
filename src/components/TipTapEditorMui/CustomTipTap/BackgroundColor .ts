import { Extension } from '@tiptap/core';

export type BackgroundColorOptions = {
  /**
   * The types where the background color can be applied
   * @default ['textStyle']
   * @example ['heading', 'paragraph']
   */
  types: string[];
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    backgroundColor: {
      /**
       * Set the background color of the text
       * @param color The background color to set
       * @example editor.commands.setBackgroundColor('red')
       */
      setBackgroundColor: (color: string) => ReturnType;

      /**
       * Unset the background color of the text
       * @example editor.commands.unsetBackgroundColor()
       */
      unsetBackgroundColor: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to change the background color of your text.
 * @see https://tiptap.dev/api/extensions/color
 */
export const BackgroundColor = Extension.create<BackgroundColorOptions>({
  name: 'backgroundColor',

  addOptions() {
    return {
      types: ['textStyle'], // You can change this to apply to other types like 'paragraph', 'heading', etc.
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) =>
              element.style.backgroundColor?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackgroundColor:
        (color) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { backgroundColor: color }).run();
        },
      unsetBackgroundColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { backgroundColor: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
