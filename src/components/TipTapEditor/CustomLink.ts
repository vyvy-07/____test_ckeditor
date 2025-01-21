// LinkEx.ts

import { Extension } from '@tiptap/core';
import { Link } from '@tiptap/extension-link';
import { Plugin } from '@tiptap/pm/state';
// tiptap-commands.d.ts

import { Commands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands {
    // Adding custom command setLinkEx to the Commands interface
    setLinkEx: (href: string, tooltip: string) => void;
  }
}

const LinkEx = Link.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: true, // Customize behavior of the link
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      tooltip: {
        default: '',
        renderHTML: (attributes) => {
          if (attributes.tooltip) {
            return {
              'data-tooltip': attributes.tooltip,
            };
          }
          return {};
        },
      },
    };
  },

  addCommands() {
    return {
      setLinkEx:
        (href: string, tooltip: string) =>
        ({ commands }) => {
          // Use the setLink command to apply the link with tooltip
          return commands.setLink({ href, tooltip });
        },
    };
  },

  addProseMirrorPlugins() {
    const plugin = new Plugin({
      props: {
        handleDOMEvents: {
          mouseover: (view, event) => {
            const target = event.target as HTMLElement;
            if (target && target.tagName === 'A' && target.dataset.tooltip) {
              const tooltipText = target.dataset.tooltip;
              console.log(tooltipText); // Tooltip display logic (use a library like tippy.js)
            }
            return false;
          },
        },
      },
    });

    return [plugin];
  },
});

export default LinkEx;
