import { Node, mergeAttributes } from '@tiptap/core';
import { CommandProps } from '@tiptap/react';

type VideoAttributes = {
  src: string;
  width?: string;
  height?: string;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customVideo: {
      /**
       * Insert a video node with the specified attributes
       */
      addVideo: (options: VideoAttributes) => ReturnType;
      /**
       * Insert a video URL dynamically
       */
      insertVideoUrl: (url: string) => ReturnType;
    };
  }
}

export const CustomVideo = Node.create({
  name: 'customVideo',

  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: '100%',
      },
      height: {
        default: '100%',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video[src]',
      },
      {
        tag: 'iframe[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, width, height } = HTMLAttributes as VideoAttributes;

    // Check if it's a YouTube, Vimeo, or iframe URL
    const isIframe =
      src.includes('youtube') ||
      src.includes('vimeo') ||
      src.includes('iframe');

    if (isIframe) {
      return [
        'iframe',
        mergeAttributes({
          src,
          width,
          height,
          frameborder: '0',
          allow:
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: 'true',
        }),
      ];
    }

    return [
      'video',
      mergeAttributes({
        src,
        width,
        height,
        controls: 'true',
      }),
    ];
  },

  addCommands() {
    return {
      addVideo:
        (options: VideoAttributes) =>
        ({ chain }: CommandProps) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: options,
            })
            .run();
        },

      insertVideoUrl:
        (url: string) =>
        ({ chain }: CommandProps) => {
          const videoProviders = [
            {
              name: 'youtube',
              regex:
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/([a-zA-Z0-9\-_]+)(?:[?&][^&]+)*)|(?:youtu\.be\/([a-zA-Z0-9\-_]+)))/,
              embedUrl: (url: string) => {
                const videoId = url.match(
                  /(?:v|e(?:mbed)?)\/([a-zA-Z0-9\-_]+)|(?:youtu\.be\/([a-zA-Z0-9\-_]+))/
                )?.[1];
                return `https://www.youtube.com/embed/${videoId}`;
              },
            },
            {
              name: 'vimeo',
              regex: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/,
              embedUrl: (url: string) => {
                const videoId = url.match(/(?:vimeo\.com\/)(\d+)/)?.[1];
                return `https://player.vimeo.com/video/${videoId}`;
              },
            },
            {
              name: 'directVideo',
              regex:
                /(?:https?:\/\/)[\w\-\.]+\.[a-z]{2,3}(?:\/[\w\-\/]*)?\.(mp4|avi|mov|wmv)/i,
              embedUrl: (url: string) => url, // Direct video URL
            },
          ];

          let videoUrl = null;

          // Match against providers
          for (const provider of videoProviders) {
            if (provider.regex.test(url)) {
              videoUrl = provider.embedUrl(url);
              break;
            }
          }

          if (videoUrl) {
            return chain()
              .insertContent({
                type: this.name,
                attrs: {
                  src: videoUrl,
                },
              })
              .run();
          }

          return chain().run();
        },
    };
  },
});
