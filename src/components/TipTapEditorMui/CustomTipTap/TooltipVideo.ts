import { Node } from '@tiptap/core';

export const VideoResize = Node.create({
  name: 'video',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: { default: '' },
      style: {
        default: 'width: 100%; height: auto; cursor: pointer;',
        parseHTML: (element) =>
          element.style.cssText ||
          `width: ${element.getAttribute(
            'width'
          )}px; height: auto; cursor: pointer;`,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'video' }];
  },

  renderHTML({ node }) {
    const { src, style } = node.attrs;
    return [
      'div',
      { style: `position: relative; display: inline-block; ${style}` },
      [
        'video',
        {
          src,
          style: 'width: 100%; height: auto; cursor: pointer;',
          controls: true,
        },
      ],
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const { view } = editor;
      const { style, src } = node.attrs;
      const wrapper: any = document.createElement('div');
      const container: any = document.createElement('div');
      const video: any = document.createElement('video');

      video.src = src;
      video.controls = true;
      video.style = 'width: 100%; height: auto; cursor: pointer;';

      // Simplify: only dispatch if style changes
      const dispatchNodeView = () => {
        if (getPos) {
          view.dispatch(
            view.state.tr.setNodeMarkup(getPos(), null, {
              ...node.attrs,
              style: video.style.cssText,
            })
          );
        }
      };

      container.style = style;
      container.appendChild(video);

      // Position controller logic
      const controller: any = document.createElement('div');
      controller.style =
        'position: absolute; top: 0; left: 50%; width: 100px; z-index: 999;';
      const alignIcons = ['left', 'center', 'right'].map((align) => {
        const icon: any = document.createElement('img');
        icon.src = `path/to/${align}.svg`;
        icon.style = 'width: 24px; height: 24px; cursor: pointer;';
        icon.onclick = () => {
          video.style.margin =
            align === 'center'
              ? '0 auto'
              : `0 ${align === 'left' ? '0 0 0' : 'auto'};`;
          dispatchNodeView();
        };
        return icon;
      });

      alignIcons.forEach((icon) => controller.appendChild(icon));
      container.appendChild(controller);

      wrapper.appendChild(container);

      return { dom: wrapper };
    };
  },
});
