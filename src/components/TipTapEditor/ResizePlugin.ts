import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

export const ResizablePlugin = Extension.create({
  name: 'resizablePlugin',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('resizablePlugin'),
        props: {
          handleDOMEvents: {
            mouseup: (view, event) => {
              // Lấy figure chứa ảnh
              const target = (event.target as HTMLElement).closest('figure');
              if (target) {
                // Đảm bảo là ảnh trong figure
                const img = target.querySelector('img') as HTMLImageElement;
                if (img) {
                  const width = target.style.width || 'auto';
                  const height = target.style.height || 'auto';

                  // Kiểm tra node hiện tại có phải là figure hay không
                  const { from } = view.state.selection;
                  const node = view.state.doc.nodeAt(from);

                  if (node && node.type.name === 'figureImage') {
                    // Nếu node là figureImage, cập nhật thuộc tính width và height
                    view.dispatch(
                      view.state.tr.setNodeMarkup(from, undefined, {
                        ...node.attrs,
                        width,
                        height,
                      })
                    );
                  }
                }
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
