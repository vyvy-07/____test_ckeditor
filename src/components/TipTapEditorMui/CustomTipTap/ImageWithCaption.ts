import { Node } from '@tiptap/core';

export const ImageWithCaption = Node.create({
  name: 'imageWithCaption',

  group: 'block', // Là một node block
  content: 'image caption?', // Chứa image và tùy chọn caption (block)

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'figure',
      { class: 'image-with-caption' },
      ['img', HTMLAttributes],
      ['figcaption', 0],
    ];
  },

  addNodeView() {
    return ({ node, getPos }) => {
      const dom = document.createElement('figure');
      dom.classList.add('image-with-caption');

      const img = document.createElement('img');
      img.setAttribute('src', node.attrs.src);
      if (node.attrs.alt) img.setAttribute('alt', node.attrs.alt);
      if (node.attrs.title) img.setAttribute('title', node.attrs.title);

      const caption = document.createElement('figcaption');
      caption.contentEditable = 'true';
      caption.textContent = node.textContent;

      dom.append(img, caption);

      return {
        dom,
        contentDOM: caption,
      };
    };
  },
});
