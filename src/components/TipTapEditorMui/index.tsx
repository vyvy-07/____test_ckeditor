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
  BreakPage,
  CheckListIcon,
  ClearFormatIcon,
  DeleteCol,
  DeleteRow,
  FileVideoIcon,
  GridIcon2x8x2,
  GridIcon3x6x3,
  GridIcon3x9,
  GridIcon4x4x4,
  GridIcon4x8,
  GridIcon6x6,
  GridIcon8x4,
  GridIcon9x3,
  IMGIcon,
  ItalicIcon,
  LineHorizontal,
  LineParallel,
  LinkSVG,
  ListDotIcon,
  ListNumberIcon,
  Quotes,
  QuotesWithIconSVG,
  RemoveLink,
  RemoveTable,
  StrikeIcon,
  SuperscriptIcon,
  SupscriptIcon,
  TableBottom,
  TableIcon,
  TableLeftCol,
  TableMerge,
  TableRigthCol,
  TableTop,
  UnderlineIcon,
  VideoIcon,
} from '@/constant/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Dropcursor from '@tiptap/extension-dropcursor';
import FontFamily from '@tiptap/extension-font-family';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import 'katex/dist/katex.min.css';

import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import ImageResize from 'tiptap-extension-resize-image';
import ButtonEditor from '../ButtonEditor';
import { FontSize } from './CustomTipTap/FontSize';
import { GridLayout } from './CustomTipTap/GridLayout';
import { ResizableImage } from './CustomTipTap/ResizeImageTool';
import { CustomVideo } from './CustomTipTap/URLVideoCustom';
import './editor.css';
import {
  BlockquoteBoxBlue,
  BlockquoteBoxGreen,
  BlockquoteBoxGrey,
  BlockquoteLineX,
  BlockquoteLineY,
  BlockquoteWithIcon,
} from './QuotesLine';
import './style.css';
import { BackgroundColor } from './CustomTipTap/BackgroundColor ';
import { FxNode } from './CustomTipTap/FxMath';
import { PageBreak } from './CustomTipTap/BreakPage';
import { VideoResize } from './CustomTipTap/TooltipVideo';
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
const arrLayouts = [
  { name: 'layout2x8x2', icon: GridIcon2x8x2 },
  { name: 'layout3x9', icon: GridIcon3x9 },
  { name: 'layout4x4x4', icon: GridIcon4x4x4 },
  { name: 'layout6x6', icon: GridIcon6x6 },
  { name: 'layout3x6x3', icon: GridIcon3x6x3 },
  { name: 'layout8x4', icon: GridIcon8x4 },
  { name: 'layout4x8', icon: GridIcon4x8 },
  { name: 'layout9x3', icon: GridIcon9x3 },
];
// const arrTextMark = ['bold', 'underline', 'italic', 'strike'];

const arrTextMark = [
  { name: 'bold', icon: BoldIcon },
  { name: 'underline', icon: UnderlineIcon },
  { name: 'italic', icon: ItalicIcon },
  { name: 'strike', icon: StrikeIcon },
  { name: 'BulletList', icon: ListDotIcon },
  { name: 'orderedList', icon: ListNumberIcon },
  { name: 'taskList', icon: CheckListIcon },
  { name: 'link', icon: LinkSVG },
  { name: 'codeBlock', icon: BlockCodeIcon },
  { name: 'superscript', icon: SuperscriptIcon },
  { name: 'subscript', icon: SupscriptIcon },
];
export default () => {
  const [heading, setHeading] = React.useState('Heading');
  const [iconQuotes, setIconQuotes] = React.useState(Quotes);
  const [colorCurrent, setColorCurrent] = React.useState('black');
  const [bgColorCurrent, setBgColorCurrent] = React.useState();
  const [alignment, setAlignment] = React.useState('monica');
  const [width, setWidth] = React.useState(640);

  const handleChange = (event: SelectChangeEvent) => {
    if (typeof event.target.value == 'number') {
      setHeading(event.target.value);
    } else {
      setIconQuotes(event.target.value);
    }
  };
  const handleChangeAlignment = (e: SelectChangeEvent) => {
    if (e.target.value) {
      setAlignment(e.target.value);
    }
  };

  const editor: any = useEditor({
    extensions: [
      Underline,
      TextStyle,
      Color,
      Typography,
      ImageResize,
      BackgroundColor,
      Subscript,
      FxNode,
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
      CustomVideo,
      Dropcursor,
      ResizableImage,
      FontSize,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Superscript,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      GridLayout.configure({
        types: ['layout1', 'layout2', 'layout3'], // Các kiểu layout
      }),
      PageBreak,
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
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(`${width}`, 10)) || 640,
        height: Math.max(180, parseInt(`${width}`, 10)) || 480,
      });
    }
  };

  const insertFx = () => {
    const formula = prompt('');
    if (formula) {
      console.log('formula :>> ', formula);
      editor?.commands.insertFx(formula);
    }
  };
  const removeFormat = () => {
    if (!editor) return;

    editor.chain().focus().unsetAllMarks().run();

    editor.chain().focus().clearNodes().run();
  };
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = prompt('Nhập URL ảnh:');
    const width = prompt('Nhập chiều rộng (px hoặc %):', '100%');
    const height = prompt('Nhập chiều cao (px hoặc %):', 'auto');

    if (url) {
      editor.chain().focus().setImage({ src: url, width, height }).run();
    }
  }, [editor]);
  const changeFontSize = (size: string) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(size).run();
  };

  if (!editor) {
    return null;
  }
  const handleInsertVideo = () => {
    const url = prompt('Enter a video URL:');
    if (url) {
      // Insert the video based on the provided URL
      editor?.commands.insertVideoUrl(url);
    }
  };
  return (
    <div>
      <div className="control-group h-full">
        <div className="button-group flex gap-4 p-3 items-center h-full flex-wrap justify-start ">
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
          |{/* Undo/Redo */}
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
          {/* text TextAlign */}
          {arrTextMark?.map((item, index) => (
            <ButtonEditor
              editor={editor}
              key={item?.name || index}
              element={item?.name}
              extension={item?.name}
              icon={item?.icon}
            />
          ))}
          <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none form-fontFamily text-[14px] w-fit h-[40px]"
              value={alignment}
              onChange={handleChangeAlignment}
              defaultValue="monica"
            >
              <MenuItem value="monica" disabled>
                monica
              </MenuItem>
              {arrFontFamily?.map((item, index) => (
                <MenuItem value={item} key={item || index}>
                  <ButtonEditor
                    editor={editor}
                    extension="FontFamily"
                    element="textStyle"
                    icon={item}
                    type={item}
                    fontFamily={item}
                    param={{ fontFamily: item }}
                    setFunc={true}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
            <Select
              className="outline-none text-[14px] h-[40px]"
              value="16"
              onChange={handleChange}
            >
              <MenuItem disabled value="Heading">
                <span className="text-slate-400">Grid Layout</span>
              </MenuItem>
              {arrLayouts?.length > 0 &&
                arrLayouts?.map((item, index) => {
                  return (
                    <MenuItem key={item?.name || index} value={item?.name}>
                      <ButtonCustomCss
                        className="w-full"
                        // onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          editor.commands.toggleGridLayout(item?.name);
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: item?.icon }}
                        ></span>
                      </ButtonCustomCss>
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          |
          <button onClick={insertFx} className="font-serif">
            Fx
          </button>
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
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            <span dangerouslySetInnerHTML={{ __html: TableIcon }}></span>
          </button>
          <div className="control-table opacity-0 absolute top-0">
            <button onClick={() => editor.chain().focus().setPageBreak().run()}>
              <span dangerouslySetInnerHTML={{ __html: BreakPage }}></span>
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              <span dangerouslySetInnerHTML={{ __html: TableLeftCol }}></span>
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              <span dangerouslySetInnerHTML={{ __html: TableRigthCol }}></span>
            </button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()}>
              <span dangerouslySetInnerHTML={{ __html: DeleteCol }}></span>
            </button>
            <button onClick={() => editor.chain().focus().addRowBefore().run()}>
              <span dangerouslySetInnerHTML={{ __html: TableTop }}></span>
            </button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()}>
              <span dangerouslySetInnerHTML={{ __html: TableBottom }}></span>
            </button>
            <button onClick={() => editor.chain().focus().deleteRow().run()}>
              <span dangerouslySetInnerHTML={{ __html: DeleteRow }}></span>
            </button>
            <button onClick={() => editor.chain().focus().deleteTable().run()}>
              <span dangerouslySetInnerHTML={{ __html: RemoveTable }}></span>
            </button>
            <button onClick={() => editor.chain().focus().mergeCells().run()}>
              <span dangerouslySetInnerHTML={{ __html: TableMerge }}></span>
            </button>
            <button onClick={() => editor.chain().focus().splitCell().run()}>
              Split cell
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              Toggle header column
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              Toggle header row
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              Toggle header cell
            </button>
            <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
              Merge or split
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setCellAttribute('colspan', 2).run()
              }
            >
              Set cell attribute
            </button>
            <button onClick={() => editor.chain().focus().fixTables().run()}>
              Fix tables
            </button>
            <button onClick={() => editor.chain().focus().goToNextCell().run()}>
              Go to next cell
            </button>
            <button
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
            >
              Go to previous cell
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setCellAttribute('colspan', 2).run()
              }
            >
              Set cell attribute
            </button>
          </div>
          |
          <button onClick={addImage}>
            <span dangerouslySetInnerHTML={{ __html: IMGIcon }}></span>
          </button>
          <button onClick={handleInsertVideo}>
            <span dangerouslySetInnerHTML={{ __html: VideoIcon }}></span>
          </button>
          <ButtonCustomCss
            onClick={addYoutubeVideo}
            className={editor.isActive('link') ? 'is-active' : ''}
          >
            <span dangerouslySetInnerHTML={{ __html: FileVideoIcon }}></span>
          </ButtonCustomCss>
          <div className="relative ">
            <span className="block  relative z-10 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill={colorCurrent}
              >
                <path d="M15.2459 14H8.75407L7.15407 18H5L11 3H13L19 18H16.8459L15.2459 14ZM14.4459 12L12 5.88516L9.55407 12H14.4459ZM3 20H21V22H3V20Z"></path>
              </svg>
            </span>
            <input
              type="color"
              onMouseDown={(e) => e.preventDefault()}
              onInput={(event: any) => {
                if (!editor.chain().focus()) {
                  return null;
                }
                if (event.target.value) {
                  setColorCurrent(event.target.value);
                  editor.chain().focus().setColor(event.target.value).run();
                }
              }}
              value={editor.getAttributes('textStyle').color || colorCurrent}
              className="w-6 h-6 pt-6 absolute bottom-0 pointer-events-auto"
            />
          </div>
          <div className="relative ">
            <span className="block  relative z-10 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M19.2277 18.7323L20.9955 16.9645L22.7632 18.7323C23.7395 19.7086 23.7395 21.2915 22.7632 22.2678C21.7869 23.2441 20.204 23.2441 19.2277 22.2678C18.2514 21.2915 18.2514 19.7086 19.2277 18.7323ZM8.87861 1.07971L20.1923 12.3934C20.5828 12.7839 20.5828 13.4171 20.1923 13.8076L11.707 22.2929C11.3165 22.6834 10.6833 22.6834 10.2928 22.2929L1.80754 13.8076C1.41702 13.4171 1.41702 12.7839 1.80754 12.3934L9.58572 4.61525L7.4644 2.49393L8.87861 1.07971ZM10.9999 6.02946L3.92886 13.1005H18.071L10.9999 6.02946Z"></path>
              </svg>
            </span>
            <input
              type="color"
              onMouseDown={(e) => e.preventDefault()}
              onInput={(event: any) => {
                if (!editor.chain().focus()) {
                  return null;
                }
                if (event.target.value) {
                  setBgColorCurrent(event.target.value);
                  editor
                    .chain()
                    .focus()
                    .setBackgroundColor(event.target.value)
                    .run();
                }
              }}
              value={
                editor.getAttributes('textStyle').backgroundColor ||
                bgColorCurrent ||
                'white'
              }
              className={`w-6 h-6 pt-6 absolute bottom-0 pointer-events-auto 
              `}
            />
          </div>
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
