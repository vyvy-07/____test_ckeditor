'use client';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';

import {
  BlockBoxBlueSVG,
  BoxQuotesGreenSVG,
  BoxQuotesGreySVG,
  LineHorizontal,
  LineParallel,
  Quotes,
  QuotesWithIconSVG,
} from '@/constant/icons';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import ButtonEditor from '../ButtonEditor';
import {
  BlockquoteBoxBlue,
  BlockquoteBoxGreen,
  BlockquoteBoxGrey,
  BlockquoteLineX,
  BlockquoteLineY,
  BlockquoteWithIcon,
} from './QuotesLine';
import './style.css';
import StarterKit from '@tiptap/starter-kit';
export default () => {
  const editor: any = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
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
      BlockquoteBoxGreen.configure({
        HTMLAttributes: { class: 'box-quotes-green' },
      }),
      BlockquoteBoxGrey.configure({
        HTMLAttributes: { class: 'box-quotes-grey' },
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
  StarterKit.configure({
    heading: { levels: [1, 2, 3] }, // Limit headings to h1, h2, and h3
    codeBlock: false, // Disable code blocks
  });

  if (!editor) {
    return null;
  }
  console.log('editor :>> ', editor?.callbacks?.extensionStorage);

  return (
    <div>
      <div className="control-group">
        <div className="button-group flex gap-5  items-center min-h-[50px]">
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={` cursor-pointer ${
              editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
            }`}
          >
            h1
          </div>
          <div
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={` cursor-pointer ${
              editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
            }`}
          >
            h2
          </div>

          <ButtonEditor editor={editor} extension="Blockquote" icon={Quotes} />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteLineX"
            icon={LineHorizontal}
          />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteLineY"
            icon={LineParallel}
          />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteWithIcon"
            icon={QuotesWithIconSVG}
          />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteBoxBlue"
            icon={BlockBoxBlueSVG}
          />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteBoxGreen"
            icon={BoxQuotesGreenSVG}
          />
          <ButtonEditor
            editor={editor}
            extension="BlockquoteBoxGrey"
            icon={BoxQuotesGreySVG}
          />
        </div>
      </div>

      <EditorContent className="min-h-[500px]" editor={editor} />
    </div>
  );
};
