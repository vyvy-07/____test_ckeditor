import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'specialCharacter',

  group: 'inline',

  inline: true,

  atom: true, // Không thể chỉnh sửa trực tiếp ký tự đặc biệt

  addAttributes() {
    return {
      character: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-special-character]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-special-character': true }),
      HTMLAttributes.character,
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('span');
      dom.className = 'special-character';
      dom.textContent = node.attrs.character;
      return { dom };
    };
  },
});
