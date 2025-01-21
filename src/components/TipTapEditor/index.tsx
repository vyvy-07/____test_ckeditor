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
import StarterKit from '@tiptap/starter-kit';
import ButtonEditor from '../ButtonEditor';
import './style.css';
import Image from '@tiptap/extension-image';
import { useState } from 'react';
import { CustomTable } from './CustomGridLayout';
import { CustomCell } from './CustomGridLayout/CustomCell';
import { CustomRow } from './CustomGridLayout/CustomRow';
import { ResizableFigure } from './ResizeImage/ResizeOption';
import Link from '@tiptap/extension-link';

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
  const [sourceHTML, setSourceHTML] = useState('');
  const editor: any = useEditor({
    extensions: [
      Document,
      Image,
      // ImageWithCaption,
      Paragraph,
      Text,
      Blockquote,
      CustomTable,
      CustomRow,
      CustomCell,
      // ResizableFigure,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      ResizableFigure,
      Link,
    ],
    // plugins: [ResizablePlugin],
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
  const getSource = async () => {
    const source = editor.getHTML();
    if (source) {
      setSourceHTML(source);
    }
  };
  const addImage = () => {
    const src = prompt(
      'Enter image URL:',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbAKcCLLFn6XZUsNl16-pGGH1Aj6Z01s9OQ&s'
    );

    if (!src || !editor) {
      return;
    }
    editor.commands.insertContent({
      type: 'resizableFigure',
      attrs: {
        src: src,
        width: '100%',
        height: 'auto',
      },
    });
  };

  const toggleCaption = () => {
    if (editor) {
      editor.commands.toggleCaption(); // Gọi command toggleCaption
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <p>
        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIG17fqmqsBzuaowRCnhWNMnvJ6qV9vRWvw&s
      </p>
      <div className="control-group overflow-x-hidden">
        <div className="button-group flex gap-5  items-center min-h-[50px]">
          <button type="button" onClick={getSource}>
            get source
          </button>
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
          <button onClick={addImage} onMouseDown={(e) => e.preventDefault()}>
            addImage
          </button>
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
          <button onClick={toggleCaption}>Toggle Caption</button>
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
            {/* <div ref={editor?.editorView.container}>ddds</div> */}
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
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleCustomLink().run()}
        className={editor.isActive('customLink') ? 'is-active' : ''}
      >
        Toggle Link
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCustomLink().run()}
        className={editor.isActive('customLink') ? 'is-active' : ''}
      >
        Set Link
      </button>
      <EditorContent
        className="editor_tiptap max-w-[1000px] min-h-[500px]"
        editor={editor}
      />
      <pre>{sourceHTML}</pre>
    </div>
  );
};
