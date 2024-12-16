'use client';
import {
  AlignCenterIcon,
  AlignJustyIcon,
  AlignLeftIcon,
  AlignRigthIcon,
  BackLeftIcon,
  BackRigthIcon,
  BlockBoxBlueSVG,
  BlockCodeIcon,
  BoldIcon,
  BoxQuotesGreenSVG,
  BoxQuotesGreySVG,
  CheckListIcon,
  ClearFormatIcon,
  ItalicIcon,
  LineHorizontal,
  LineParallel,
  ListDotIcon,
  ListNumberIcon,
  Quotes,
  QuotesWithIconSVG,
  RemoveLink,
  StrikeIcon,
  UnderlineIcon,
} from '@/constant/icons';
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Dropcursor from '@tiptap/extension-dropcursor';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import React, { useCallback } from 'react';
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
import './editor.css';
import { ResizableImage } from './CustomTipTap/ResizeImageTool';
import { FontSize } from './CustomTipTap/FontSize';
import styled from 'styled-components';
const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const ButtonCustomCss = styled.button`
  cursor: pointer;
`;
const arrHeading = [1, 2, 3, 4];
const arrBlockquotes = [
  { name: 'BlockquoteBoxBlue', icon: BlockBoxBlueSVG },
  { name: 'BlockquoteBoxGreen', icon: BoxQuotesGreenSVG },
  { name: 'BlockquoteBoxGrey', icon: BoxQuotesGreySVG },
  { name: 'BlockquoteLineX', icon: LineHorizontal },
  { name: 'BlockquoteLineY', icon: LineParallel },
  { name: 'BlockquoteWithIcon', icon: QuotesWithIconSVG },
];
const arrTextAlign = [
  { name: 'left', icon: AlignLeftIcon },
  { name: 'center', icon: AlignCenterIcon },
  { name: 'right', icon: AlignRigthIcon },
  { name: 'justify', icon: AlignJustyIcon },
];
const arrFontFamily = [
  'Inter',
  'Comic Sans MS, Comic Sans',
  'serif',
  'monospace',
  'cursive',
  'var(--title-font-family)',
  '"Comic Sans MS", "Comic Sans"',
  '"Exo 2"',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Verdana',
  'Tahoma',
  '"Courier New", Courier',
  'Helvetica',
  '"Lucida Console", Monaco',
  '"Gill Sans", "Gill Sans MT"',
];
const arrFontSize = ['12', '14', '16', '18', '20'];
export default () => {
  const [heading, setHeading] = React.useState('Heading');
  const [iconQuotes, setIconQuotes] = React.useState(Quotes);
  const [colorCurrent, setColorCurrent] = React.useState('black');
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (event: SelectChangeEvent) => {
    if (typeof event.target.value == 'number') {
      setHeading(event.target.value);
    } else {
      setIconQuotes(event.target.value);
    }
  };

  const editor: any = useEditor({
    extensions: [
      Underline,
      TextStyle,
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch (error) {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch (error) {
            return false;
          }
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      BlockquoteLineY.configure({
        HTMLAttributes: { class: 'blockquoteLineY' },
      }),
      BlockquoteLineX.configure({
        HTMLAttributes: { class: ' blockquoteLineX' },
      }),
      BlockquoteWithIcon.configure({
        HTMLAttributes: { class: ' blockquoteWithIcon' },
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

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      FontFamily,
      Image,
      Dropcursor,
      ResizableImage,
      FontSize,
    ],

    content: `
      <p>
        Nothing is impossible, the word itself says “I’m possible!”
      </p>
      <p>Audrey Hepburn</p>
    `,
    immediatelyRender: false,
  });
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);
  const removeFormat = () => {
    if (!editor) return;

    editor.chain().focus().unsetAllMarks().run();

    editor.chain().focus().clearNodes().run();
  };
  const addImage = useCallback(() => {
    if (!editor) return;

    const url = prompt('Nhập URL ảnh:');
    const width = prompt('Nhập chiều rộng (px hoặc %):', '300px');
    const height = prompt('Nhập chiều cao (px hoặc %):', 'auto');

    if (url) {
      editor.chain().focus().setImage({ src: url, width, height }).run();
    }
  }, [editor]);
  const changeFontSize = (size: string) => {
    if (!editor) return;
    console.log('size :>> ', size);

    editor.chain().focus().setFontSize(size).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="control-group">
        <div className="button-group flex gap-4 p-3 items-center h-[50px] justify-start ">
          {/* Undo/Redo */}
          {/* <button onClick={() => changeFontSize('12px')}>12px</button>
          <button onClick={() => changeFontSize('16px')}>16px</button>
          <button onClick={() => changeFontSize('24px')}>24px</button> */}
          <ButtonCustomCss
            onClick={setLink}
            className={editor.isActive('link') ? 'is-active' : ''}
          >
            Set link
          </ButtonCustomCss>
          <ButtonCustomCss
            className="remove-tool"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            <span dangerouslySetInnerHTML={{ __html: RemoveLink }}></span>
          </ButtonCustomCss>
          <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none text-[14px] h-[40px]"
              value="16"
              onChange={handleChange}
            >
              <MenuItem disabled value="Heading">
                <span className="text-slate-400">Heading</span>
              </MenuItem>
              {arrFontSize?.length > 0 &&
                arrFontSize?.map((item: string, index) => {
                  return (
                    <MenuItem key={item || index} value={item}>
                      <ButtonCustomCss
                        className="w-full"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          if (!editor.isFocused) {
                            editor.chain().focus().run(); // Ensure focus
                          }
                          changeFontSize(item);
                        }}
                      >
                        {item}
                      </ButtonCustomCss>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <ButtonCustomCss
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (!editor.isFocused) {
                editor.chain().focus().run(); // Ensure focus
              }
              removeFormat();
            }}
            disabled={!editor?.isEditable}
            className={`${
              !editor?.isEditable && 'disabled:opacity-50'
            } cursor-pointer`}
          >
            <span dangerouslySetInnerHTML={{ __html: ClearFormatIcon }}></span>
          </ButtonCustomCss>
          |
          <ButtonCustomCss
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (!editor.isFocused) {
                editor.chain().focus().run(); // Ensure focus
              }
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
          >
            <span dangerouslySetInnerHTML={{ __html: BackLeftIcon }}></span>
          </ButtonCustomCss>
          <ButtonCustomCss
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (!editor.isFocused) {
                editor.chain().focus().run(); // Ensure focus
              }
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
          >
            <span dangerouslySetInnerHTML={{ __html: BackRigthIcon }}></span>
          </ButtonCustomCss>
          |{/* Heading */}
          <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none text-[14px] h-[40px]"
              value={heading || 'Heading'}
              onChange={handleChange}
            >
              <MenuItem disabled value="Heading">
                <span className="text-slate-400">Heading</span>
              </MenuItem>
              {arrHeading?.length > 0 &&
                arrHeading?.map((item, index) => {
                  return (
                    <MenuItem key={item || index} value={item}>
                      <ButtonEditor
                        editor={editor}
                        element="heading"
                        extension="Heading"
                        icon={`Heading ${item}`}
                        param={{ level: item }}
                      />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          |{/* text TextAlign */}
          <ButtonEditor
            editor={editor}
            element="strike"
            extension="Strike"
            icon={StrikeIcon}
          />
          <ButtonEditor
            editor={editor}
            element="underline"
            extension="Underline"
            icon={UnderlineIcon}
          />
          <ButtonEditor
            editor={editor}
            element="bold"
            extension="Bold"
            icon={BoldIcon}
          />
          <ButtonEditor
            editor={editor}
            element="italic"
            extension="Italic"
            icon={ItalicIcon}
          />
          <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none form-fontFamily text-[14px] w-[70px] h-[40px]"
              value={alignment}
              onChange={handleChange}
              defaultValue="monica"
            >
              {arrFontFamily?.map((item, index) => (
                <MenuItem value={item} key={item || index}>
                  <ButtonEditor
                    editor={editor}
                    extension="FontFamily"
                    element="textStyle"
                    icon={item}
                    type={item}
                    param={{ fontFamily: item }}
                    setFunc={true}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none text-[14px] w-[70px] h-[40px]"
              value={alignment}
              onChange={handleChange}
              defaultValue="left"
            >
              {arrTextAlign?.map((align, index) => (
                <MenuItem value={align?.name} key={align?.name || index}>
                  <ButtonEditor
                    editor={editor}
                    element="textAlign"
                    extension="TextAlign"
                    icon={align?.icon}
                    param={align?.name}
                    setFunc={true}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          |
          <ButtonEditor
            editor={editor}
            element="bulletList"
            extension="BulletList"
            icon={ListDotIcon}
          />
          <ButtonEditor
            editor={editor}
            element="orderedList"
            extension="OrderedList"
            icon={ListNumberIcon}
          />
          <ButtonEditor
            editor={editor}
            element="taskList"
            extension="TaskList"
            icon={CheckListIcon}
          />
          |
          <ButtonEditor
            editor={editor}
            element="codeBlock"
            extension="CodeBlock"
            icon={BlockCodeIcon}
          />
          <ButtonEditor
            editor={editor}
            element="horizontalRule"
            extension="HorizontalRule"
            icon={`___`}
            setFunc={true}
          />
          <div className="flex relative justify-center items-center cursor-pointer">
            <input
              type="color"
              onChange={(event: any) => {
                if (!editor.isFocused) {
                  editor.chain().focus().run();
                }

                editor.chain().focus().setColor(event.target.value).run();
                setColorCurrent(event.target.value);
                console.log('event.target.value :>> ', event.target.value);
              }}
              value={editor.getAttributes('textStyle').color || '#000000'}
              data-testid="setColor"
              className="block  w-[30px] h-[30px] cursor-pointer"
            />
            <span className="block absolute r-0 z-1 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="white"
              >
                <path d="M15.2459 14H8.75407L7.15407 18H5L11 3H13L19 18H16.8459L15.2459 14ZM14.4459 12L12 5.88516L9.55407 12H14.4459ZM3 20H21V22H3V20Z"></path>
              </svg>
            </span>
          </div>
          <ButtonEditor
            editor={editor}
            element="s"
            extension="HorizontalRule"
            icon={`123`}
            setFunc={true}
          />
          {/* <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={addImage}
            disabled={!editor?.isEditable}
          >
            Chèn ảnh
          </button> */}
          <button onClick={addImage}>Set image</button>
          {/* blockquote */}
          <FormControl
            className="formControl blockquote"
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select
              className="blockquote_select outline-none text-[14px] w-[80px] h-[40px]"
              value={iconQuotes}
              onChange={handleChange}
            >
              <MenuItem value={iconQuotes}>
                <ButtonEditor
                  editor={editor}
                  extension="Blockquote"
                  icon={Quotes}
                />
              </MenuItem>

              {arrBlockquotes?.length > 0 &&
                arrBlockquotes?.map((item, index) => {
                  return (
                    <MenuItem key={item?.name || index} value={item?.icon}>
                      <ButtonEditor
                        editor={editor}
                        extension={item?.name}
                        icon={`${item?.icon}`}
                      />
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
      </div>

      <EditorContent className="p-5" editor={editor} />
    </div>
  );
};
