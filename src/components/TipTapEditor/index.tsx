'use client';
import Blockquote from '@tiptap/extension-blockquote';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';

import {
  BlockBoxBlueSVG,
  BoxQuotesGreenSVG,
  BoxQuotesGreySVG,
  GridIcon2x8x2,
  GridIcon3x6x3,
  GridIcon3x9,
  GridIcon4x4x4,
  GridIcon4x8,
  GridIcon6x6,
  GridIcon8x4,
  GridIcon9x3,
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
// import { CustomTable } from './CustomTable';
// import { CustomCell } from './CustomTable/CustomCell';
// import { CustomRow } from './CustomTable/CustomRow';
import Image from '@tiptap/extension-image';
import { CustomTable } from './CustomGridLayout';
import { CustomRow } from './CustomGridLayout/CustomRow';
import { CustomCell } from './CustomGridLayout/CustomCell';
const arrLayouts = [
  { name: 'layout2x8x2', icon: GridIcon2x8x2, collum: 3 },
  { name: 'layout3x9', icon: GridIcon3x9, collum: 2 },
  { name: 'layout4x4x4', icon: GridIcon4x4x4, collum: 3 },
  { name: 'layout6x6', icon: GridIcon6x6, collum: 2 },
  { name: 'layout3x6x3', icon: GridIcon3x6x3, collum: 3 },
  { name: 'layout8x4', icon: GridIcon8x4, collum: 2 },
  { name: 'layout4x8', icon: GridIcon4x8, collum: 2 },
  { name: 'layout9x3', icon: GridIcon9x3, collum: 2 },
];
export const TiptapDefault = () => {
  const editor: any = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      CustomTable,
      CustomRow,
      Image,
      CustomCell,
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
  const addImage = () => {
    const url = window.prompt('URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

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
          <div className="">
            {arrLayouts?.length > 0 &&
              arrLayouts?.map((item, index) => {
                return (
                  <button
                    key={item?.name || index}
                    className="px-2"
                    onClick={() =>
                      editor.commands.insertCustomTable(
                        item?.name,
                        item?.collum
                      )
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item?.icon }}
                    ></span>
                  </button>
                );
              })}
            sa||||||||||||||||||
            <button onClick={addImage}>ImageaddImage</button>
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
