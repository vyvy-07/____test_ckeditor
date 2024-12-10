'use client';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';

import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './style.css';
import {
  BlockquoteBoxBlue,
  BlockquoteLineX,
  BlockquoteLineY,
  BlockquoteWithIcon,
} from './QuotesLine';
export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      StarterKit,
      BlockquoteLineY.configure({
        HTMLAttributes: { class: 'quote-lines' },
      }),
      BlockquoteLineX.configure({
        HTMLAttributes: { class: 'custom-quote-button' },
      }),
      BlockquoteWithIcon.configure({
        HTMLAttributes: { class: 'quotes-with-icon-button' },
      }),
      BlockquoteBoxBlue.configure({
        HTMLAttributes: { class: 'box-quotes-blue' },
      }),

      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: `
      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>Audrey Hepburn</p>
    `,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group flex gap-5">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
            }
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive('blockquote') ? 'is-active horizone' : ''
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M4.58341 17.3211C3.55316 16.2274 3 15 3 13.0103C3 9.51086 5.45651 6.37366 9.03059 4.82318L9.92328 6.20079C6.58804 8.00539 5.93618 10.346 5.67564 11.822C6.21263 11.5443 6.91558 11.4466 7.60471 11.5105C9.40908 11.6778 10.8312 13.159 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0095 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2274 13 15 13 13.0103C13 9.51086 15.4565 6.37366 19.0306 4.82318L19.9233 6.20079C16.588 8.00539 15.9362 10.346 15.6756 11.822C16.2126 11.5443 16.9156 11.4466 17.6047 11.5105C19.4091 11.6778 20.8312 13.159 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0095 14.5834 17.3211Z"></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquoteLineY().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            y
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleBlockquoteBoxBlue().run()
            }
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            blue
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleBlockquoteWithIcon().run()
            }
            className={
              editor.isActive('blockquote') ? 'is-active horizone' : ''
            }
          >
            icon
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquoteLineX().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            x
          </button>
        </div>
      </div>

      <EditorContent className="p-5" editor={editor} />
    </>
  );
};
