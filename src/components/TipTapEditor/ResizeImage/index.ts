import Image from '@tiptap/extension-image';

export const ImageResize = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: 'width: 100%; height: auto; cursor: pointer;',
        parseHTML: (element) => {
          const width = element.getAttribute('width');
          return width
            ? `width: ${width}px; height: auto; cursor: pointer;`
            : `${element.style.cssText}`;
        },
      },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const {
        view,
        options: { editable },
      } = editor;
      const { style } = node.attrs;
      const $wrapper = document.createElement('div');
      const $container = document.createElement('div');
      const $img = document.createElement('img');
      const iconStyle = 'width: 24px; height: 24px; cursor: pointer;';

      const dispatchNodeView = () => {
        const position = getPos();
        if (position !== undefined && position !== null) {
          const newAttrs = {
            ...node.attrs,
            style: `${$img.style.cssText}`,
          };

          // Ensure the node exists before dispatching
          if (newAttrs) {
            view.dispatch(
              view.state.tr.setNodeMarkup(position, null, newAttrs)
            );
          }
        }

        if (typeof getPos === 'function') {
          const newAttrs = {
            ...node.attrs,
            style: `${$img.style.cssText}`,
          };
          view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
        }
      };

      const paintPositionContoller = () => {
        const $postionController = document.createElement('div');
        const $leftController = document.createElement('img');
        const $centerController = document.createElement('img');
        const $rightController = document.createElement('img');

        const controllerMouseOver = (e: any) => {
          e.target.style.opacity = 0.3;
        };

        const controllerMouseOut = (e: any) => {
          e.target.style.opacity = 1;
        };

        $postionController.setAttribute(
          'style',
          'position: absolute; top: 0%; left: 50%; width: 100px; height: 25px; z-index: 999; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; border: 2px solid #6C6C6C; cursor: pointer; transform: translate(-50%, -50%); display: flex; justify-content: space-between; align-items: center; padding: 0 10px;'
        );

        $leftController.setAttribute(
          'src',
          'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_left/default/20px.svg'
        );
        $leftController.setAttribute('style', iconStyle);
        $leftController.addEventListener('mouseover', controllerMouseOver);
        $leftController.addEventListener('mouseout', controllerMouseOut);

        $centerController.setAttribute(
          'src',
          'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_center/default/20px.svg'
        );
        $centerController.setAttribute('style', iconStyle);
        $centerController.addEventListener('mouseover', controllerMouseOver);
        $centerController.addEventListener('mouseout', controllerMouseOut);

        $rightController.setAttribute(
          'src',
          'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/format_align_right/default/20px.svg'
        );
        $rightController.setAttribute('style', iconStyle);
        $rightController.addEventListener('mouseover', controllerMouseOver);
        $rightController.addEventListener('mouseout', controllerMouseOut);

        $leftController.addEventListener('click', () => {
          $img.setAttribute(
            'style',
            `${$img.style.cssText} margin: 0 auto 0 0;`
          );
          dispatchNodeView();
        });
        $centerController.addEventListener('click', () => {
          $img.setAttribute('style', `${$img.style.cssText} margin: 0 auto;`);
          dispatchNodeView();
        });
        $rightController.addEventListener('click', () => {
          $img.setAttribute(
            'style',
            `${$img.style.cssText} margin: 0 0 0 auto;`
          );
          dispatchNodeView();
        });

        $postionController.appendChild($leftController);
        $postionController.appendChild($centerController);
        $postionController.appendChild($rightController);

        $container.appendChild($postionController);
      };

      $wrapper.setAttribute('style', `display: flex;`);
      $wrapper.appendChild($container);

      $container.setAttribute('style', `${style}`);
      $container.appendChild($img);

      Object.entries(node.attrs).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        $img.setAttribute(key, value);
      });

      if (!editable) return { dom: $container };

      const isMobile = document.documentElement.clientWidth < 768;
      const dotPosition = isMobile ? '-8px' : '-4px';
      const dotsPosition = [
        `top: ${dotPosition}; left: ${dotPosition}; cursor: nwse-resize;`, // top-left
        `top: ${dotPosition}; right: ${dotPosition}; cursor: nesw-resize;`, // top-right
        `bottom: ${dotPosition}; left: ${dotPosition}; cursor: nesw-resize;`, // bottom-left
        `bottom: ${dotPosition}; right: ${dotPosition}; cursor: nwse-resize;`, // bottom-right
      ];

      let isResizing = false;
      let startX: number,
        startY: number,
        startWidth: number,
        startHeight: number;

      Array.from({ length: 4 }, (_, index) => {
        const $dot = document.createElement('div');
        $dot.setAttribute(
          'style',
          `position: absolute; width: ${isMobile ? 16 : 9}px; height: ${
            isMobile ? 16 : 9
          }px; border: 1.5px solid #6C6C6C; border-radius: 50%; ${
            dotsPosition[index]
          }`
        );

        const getResizeDirection = () => {
          if (index === 0) return { directionX: 'left', directionY: 'top' };
          if (index === 1) return { directionX: 'right', directionY: 'top' };
          if (index === 2) return { directionX: 'left', directionY: 'bottom' };
          if (index === 3) return { directionX: 'right', directionY: 'bottom' };
        };

        $dot.addEventListener('mousedown', (e) => {
          e.preventDefault();
          isResizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = $container.offsetWidth;
          startHeight = $container.offsetHeight;

          const { directionX, directionY } = getResizeDirection() || {};

          const onMouseMove = (e: any) => {
            if (!isResizing) return;
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newX = $container.offsetLeft;
            let newY = $container.offsetTop;

            // Calculate width and height based on direction
            if (directionX === 'left') {
              const deltaX = e.clientX - startX;
              newWidth = startWidth - deltaX;
              newX = $container.offsetLeft + deltaX; // Move the container left
            } else if (directionX === 'right') {
              const deltaX = e.clientX - startX;
              newWidth = startWidth + deltaX;
            }

            if (directionY === 'top') {
              const deltaY = e.clientY - startY;
              newHeight = startHeight - deltaY;
              newY = $container.offsetTop + deltaY; // Move the container up
            } else if (directionY === 'bottom') {
              const deltaY = e.clientY - startY;
              newHeight = startHeight + deltaY;
            }

            // Apply the new width, height, and position
            $container.style.width = `${newWidth}px`;
            $container.style.height = `${newHeight}px`;
            $container.style.left = `${newX}px`;
            $container.style.top = `${newY}px`;

            // Apply the same size change to the image (and any other element inside)
            $img.style.width = `${newWidth}px`;
            $img.style.height = `${newHeight}px`;

            dispatchNodeView();
          };

          const onMouseUp = () => {
            if (isResizing) {
              isResizing = false;
            }
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });

        $dot.addEventListener(
          'touchstart',
          (e) => {
            e.cancelable && e.preventDefault();
            isResizing = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startWidth = $container.offsetWidth;
            startHeight = $container.offsetHeight;

            const { directionX, directionY } = getResizeDirection() || {};

            const onTouchMove = (e: any) => {
              if (!isResizing) return;
              let newWidth = startWidth;
              let newHeight = startHeight;
              let newX = $container.offsetLeft;
              let newY = $container.offsetTop;

              // Calculate width and height based on direction
              if (directionX === 'left') {
                const deltaX = e.touches[0].clientX - startX;
                newWidth = startWidth - deltaX;
                newX = $container.offsetLeft + deltaX; // Move the container left
              } else if (directionX === 'right') {
                const deltaX = e.touches[0].clientX - startX;
                newWidth = startWidth + deltaX;
              }

              if (directionY === 'top') {
                const deltaY = e.touches[0].clientY - startY;
                newHeight = startHeight - deltaY;
                newY = $container.offsetTop + deltaY; // Move the container up
              } else if (directionY === 'bottom') {
                const deltaY = e.touches[0].clientY - startY;
                newHeight = startHeight + deltaY;
              }

              // Apply the new width, height, and position
              $container.style.width = `${newWidth}px`;
              $container.style.height = `${newHeight}px`;
              $container.style.left = `${newX}px`;
              $container.style.top = `${newY}px`;

              // Apply the same size change to the image (and any other element inside)
              $img.style.width = `${newWidth}px`;
              $img.style.height = `${newHeight}px`;

              dispatchNodeView();
            };

            const onTouchEnd = () => {
              if (isResizing) {
                isResizing = false;
              }
              document.removeEventListener('touchmove', onTouchMove);
              document.removeEventListener('touchend', onTouchEnd);
            };

            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
          },
          { passive: false }
        );

        $container.appendChild($dot);
      });

      paintPositionContoller();
      return { dom: $wrapper };
    };
  },
});
