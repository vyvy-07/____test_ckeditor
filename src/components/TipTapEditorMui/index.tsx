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
  FullScreenIcon,
  GridIcon,
  GridIcon1x10x1,
  GridIcon2x8x2,
  GridIcon3x6x3,
  GridIcon3x9,
  GridIcon4x4x4,
  GridIcon4x8,
  GridIcon6x6,
  GridIcon8x4,
  GridIcon9x3,
  GroupQuotes,
  IMGIcon,
  ItalicIcon,
  LineHorizontal,
  LineParallel,
  LinkSVG,
  ListDotIcon,
  ListNumberIcon,
  Quotes,
  QuotesWithIconSVG,
  RemoveTable,
  SourceHtml,
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
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
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

import { SpecialCharacters } from '@/constant/specialCharacter';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Latex from 'react-latex-next';
import styled from 'styled-components';
import ImageResize from 'tiptap-extension-resize-image';
import ButtonEditor from '../ButtonEditor';
import { CustomTable } from './CustomGridLayout';
import { CustomCell } from './CustomGridLayout/CustomCell';
import { CustomRow } from './CustomGridLayout/CustomRow';
import { BackgroundColor } from './CustomTipTap/BackgroundColor ';
import { PageBreak } from './CustomTipTap/BreakPage';
import { FontSize } from './CustomTipTap/FontSize';
import { FxNode } from './CustomTipTap/FxMath';
import { ResizableImage } from './CustomTipTap/ResizeImageTool';
import SpecialCharacter from './CustomTipTap/SpecialCharacter';
import { CustomVideo } from './CustomTipTap/URLVideoCustom';
import './editor.css';
import PopupMedia from './Popup';
import {
  BlockquoteBoxBlue,
  BlockquoteBoxGreen,
  BlockquoteBoxGrey,
  BlockquoteLineX,
  BlockquoteLineY,
  BlockquoteWithIcon,
} from './QuotesLine';
import './style.css';
import { useSource } from '../SourceContext';
import { FigureImage } from './CustomTipTap/customFigure';
import { Caption } from './CustomTipTap/Caption';
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
  { name: 'Blockquote', icon: Quotes },
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
  { name: 'layout1x10x1', icon: GridIcon1x10x1, collum: 3 },
  { name: 'layout2x8x2', icon: GridIcon2x8x2, collum: 3 },
  { name: 'layout3x9', icon: GridIcon3x9, collum: 2 },
  { name: 'layout4x4x4', icon: GridIcon4x4x4, collum: 3 },
  { name: 'layout6x6', icon: GridIcon6x6, collum: 2 },
  { name: 'layout3x6x3', icon: GridIcon3x6x3, collum: 3 },
  { name: 'layout8x4', icon: GridIcon8x4, collum: 2 },
  { name: 'layout4x8', icon: GridIcon4x8, collum: 2 },
  { name: 'layout9x3', icon: GridIcon9x3, collum: 2 },
];
const arrTextMark = [
  { name: 'bold', icon: BoldIcon },
  { name: 'underline', icon: UnderlineIcon },
  { name: 'italic', icon: ItalicIcon },
  { name: 'strike', icon: StrikeIcon },
  { name: 'BulletList', icon: ListDotIcon },
  { name: 'orderedList', icon: ListNumberIcon },
  { name: 'taskList', icon: CheckListIcon },
  // { name: 'link', icon: LinkSVG },
  { name: 'codeBlock', icon: BlockCodeIcon },
  { name: 'superscript', icon: SuperscriptIcon },
  { name: 'subscript', icon: SupscriptIcon },
];
const tableActions = [
  {
    label: 'thêm bảng',
    icon: <span dangerouslySetInnerHTML={{ __html: TableIcon }}></span>,
    action: 'insertTable',
  },
  {
    label: 'Thêm cột bên trái',
    icon: <span dangerouslySetInnerHTML={{ __html: TableLeftCol }}></span>,
    action: 'addColumnBefore',
  },
  {
    label: 'Thêm cột bên phải',
    icon: <span dangerouslySetInnerHTML={{ __html: TableRigthCol }}></span>,
    action: 'addColumnAfter',
  },
  {
    label: 'Xóa cột',
    icon: <span dangerouslySetInnerHTML={{ __html: DeleteCol }}></span>,
    action: 'deleteColumn',
  },
  {
    label: 'Thêm hàng phía trên',
    icon: <span dangerouslySetInnerHTML={{ __html: TableTop }}></span>,
    action: 'addRowBefore',
  },
  {
    label: 'Thêm hàng phía dưới',
    icon: <span dangerouslySetInnerHTML={{ __html: TableBottom }}></span>,
    action: 'addRowAfter',
  },
  {
    label: 'Xóa hàng',
    icon: <span dangerouslySetInnerHTML={{ __html: DeleteRow }}></span>,
    action: 'deleteRow',
  },
  {
    label: 'Xóa bảng',
    icon: <span dangerouslySetInnerHTML={{ __html: RemoveTable }}></span>,
    action: 'deleteTable',
  },
  {
    label: 'Gộp ô',
    icon: <span dangerouslySetInnerHTML={{ __html: TableMerge }}></span>,
    action: 'mergeCells',
  },
  {
    label: 'Tách ô',
    icon: null,
    action: 'splitCell',
  },
  {
    label: 'Bật/Tắt tiêu đề cột',
    icon: null,
    action: 'toggleHeaderColumn',
  },
  {
    label: 'Bật/Tắt tiêu đề hàng',
    icon: null,
    action: 'toggleHeaderRow',
  },
  {
    label: 'Bật/Tắt ô tiêu đề',
    icon: null,
    action: 'toggleHeaderCell',
  },
  {
    label: 'Gộp hoặc tách ô',
    icon: null,
    action: 'mergeOrSplit',
  },
  {
    label: 'Đặt thuộc tính ô',
    icon: null,
    action: 'setCellAttribute',
  },
  {
    label: 'Sửa lỗi bảng',
    icon: null,
    action: 'fixTables',
  },
  {
    label: 'Chuyển đến ô tiếp theo',
    icon: null,
    action: 'goToNextCell',
  },
  {
    label: 'Quay lại ô trước',
    icon: null,
    action: 'goToPreviousCell',
  },
];

const TiptapMUI = () => {
  const [heading, setHeading] = React.useState('Heading');
  const [iconQuotes, setIconQuotes] = React.useState('quotes');
  const [colorCurrent, setColorCurrent] = React.useState('black');
  const [bgColorCurrent, setBgColorCurrent] = React.useState();
  const [alignment, setAlignment] = React.useState('left');
  const [fontFamily, setFontFamily] = React.useState('monica');
  const [gridlayout, setGridLayout] = React.useState('Grid Layout');
  const [width, setWidth] = React.useState();
  const [widget, setWidget] = React.useState('Widget');
  const [dataWidget, setDataWidget] = React.useState([]);
  const [openSpecialChar, setOpenSpecialChar] = React.useState(false);
  const [sourceHTML, setSourceHTML] = React.useState('');
  const [token, setToken] = React.useState('');
  const [isOpenPopUp, setIsOpenPopUp] = React.useState(false);
  const route = useRouter();

  const [openToolTable, setOpenToolTable] = React.useState(false);

  const editor: any = useEditor({
    extensions: [
      Underline,
      // Caption,
      // ImageWithCaption,
      SpecialCharacter,
      CustomTable,
      // Caption,
      CustomRow,
      CustomCell,
      TextStyle,
      Color,
      Typography,
      ImageResize,
      BackgroundColor,
      Subscript,
      FxNode,
      FigureImage,
      StarterKit.configure({
        // heading: {
        //   levels: [1, 2, 3, 4],
        // },
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

      PageBreak,
      HorizontalRule,
    ],

    content: `
      <p>
        Nothing is impossible, the word itself says “I’m possible!”
      </p>
      <p>Audrey Hepburn</p>
    `,
    immediatelyRender: false,
  });
  // const token = `${process.env.NEXT_TOKEN}`;

  useEffect(() => {
    const handleGetWidget = async () => {
      try {
        // console.log('token :>> ', token);
        if (token) {
          const res = await axios.get(
            'https://cms-api.ngn.vn/private/widget/list?websiteId=5fbe1d9ee6434b04bd32386a&limit=-1&skip=0&keyword=',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('res :>> ', res);

          if (res?.data?.result) {
            setDataWidget(res?.data?.result);
          }
        }
      } catch (error) {
        console.log('error :>> ', error);
      }
    };
    handleGetWidget();
  }, [token]);

  if (!editor) {
    return null;
  }
  const addYoutubeVideo = () => {
    if (!editor) return;

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
      editor?.commands.insertFx(formula);
    }
  };
  const removeFormat = () => {
    if (!editor) return;

    editor.chain().focus().unsetAllMarks().run();

    editor.chain().focus().clearNodes().run();
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (typeof event.target.value == 'number') {
      setHeading(event.target.value);
    } else {
      setIconQuotes(event.target.value);
    }
  };
  const handleChangeFontFamily = (e: SelectChangeEvent) => {
    if (e.target.value) {
      setFontFamily(e.target.value);
    }
  };
  const handleWidget = (e: SelectChangeEvent) => {
    if (e.target.value) {
      setWidget(e.target.value);

      const findFunc: any = dataWidget.find(
        (item: any) => item?.name === e.target.value
      );
      console.log('findFunc :>> ', findFunc);
      editor.chain().focus().insertContent(findFunc?.content).run();
    }
  };
  const handleChangeAlignment = (e: SelectChangeEvent) => {
    if (e.target.value) {
      setAlignment(e.target.value);
    }
  };
  const handleChangeGridLayout = (e: SelectChangeEvent) => {
    if (e.target.value) {
      console.log('e.target.value :>> ', e.target.value);
      setGridLayout(e.target.value);
    }
  };
  const changeFontSize = (size: string) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(size).run();
  };
  // const { setDataHtml, dataHtml } = useSource() || {};
  const handleInsertVideo = () => {
    const url = prompt('Enter a video URL:');
    if (url) {
      editor?.commands.insertVideoUrl(url);
    }
  };
  const handleInsertCharacter = (character: any) => {
    editor.chain().focus().insertContent(`${character}`).run();
  };
  const toggleFullscreen = () => {
    const editorElement: any = document.querySelector('.tiptap__editor');
    editorElement.classList.toggle('active');
  };
  //handle get src image
  const getSource = async () => {
    const source = editor.getHTML();
    if (source) {
      // setDataHtml(source);
      setSourceHTML(source);
      // return route.push('/html');
    }
  };
  const handleGetImage = (src: string) => {
    setIsOpenPopUp(false);
    addImage(src);
  };
  // const addImage = (url: string) => {
  //   if (url) {
  //     editor.chain().focus().setImage({ src: url }).run();
  //   }
  // };
  const addImage = (src: string) => {
    // const src = prompt(
    //   'Enter image URL:',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbAKcCLLFn6XZUsNl16-pGGH1Aj6Z01s9OQ&s'
    // );

    if (!src || !editor) {
      return;
    }
    editor.commands.setFigureImage({
      src: src, // URL hình ảnh
      alt: 'Sample Image', // Mô tả thay thế
    });

    console.log('Image inserted with src: ', src);
  };
  return (
    <>
      {isOpenPopUp && <PopupMedia image={handleGetImage} />}
      <div className="tiptap__editor">
        <div>
          <label className="block">Token for widget</label>
          <input
            onChange={(e) => {
              setToken(e.target.value);
              console.log('token :>> ', e.target.value);
            }}
            className="outline-none border h-[40px] max-w-[400px] p-1"
            type="text"
          />
        </div>
        <div className=" control-group h-full relative">
          <div className="button-group flex gap-4 p-3 items-center h-full flex-wrap justify-start ">
            <ButtonCustomCss
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!editor.isFocused) {
                  editor.chain().focus().run();
                }
                removeFormat();
              }}
              disabled={!editor?.isEditable}
              className={`${
                !editor?.isEditable && 'disabled:opacity-50'
              } cursor-pointer`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: ClearFormatIcon }}
              ></span>
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
            {/* undo / redo */}
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
            <FormControl className="formControl" sx={{ m: 1, minWidth: 150 }}>
              <Select
                className="outline-none text-[14px] min-w-[150px] h-[40px]"
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
            |{/*text alignment */}
            <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none text-[14px] w-[70px] h-[40px]"
                value={alignment}
                onChange={handleChangeAlignment}
                defaultValue="left"
                style={{ fontFamily: `${alignment}` }}
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
            {/* FontSize */}
            <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none text-[14px] h-[40px]"
                value="16"
                onChange={handleChange}
              >
                <MenuItem disabled value="Heading">
                  <span className="text-slate-400">FontSize</span>
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
            |
            {arrTextMark?.slice(0, 4).map((item, index) => (
              <ButtonEditor
                editor={editor}
                key={item?.name || index}
                element={item?.name}
                extension={item?.name}
                icon={item?.icon}
              />
            ))}
            <ButtonCustomCss
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!editor.isFocused) {
                  editor.chain().focus().run(); // Ensure focus
                }
                editor.chain().focus().redo().run();
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: LinkSVG }}></span>
            </ButtonCustomCss>
            |{/*  FontFamily */}
            <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none form-fontFamily text-[14px] w-fit h-[40px]"
                value={fontFamily}
                onChange={handleChangeFontFamily}
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
            {/* text color */}
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
            {/* background color */}
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
            |
            <button
              onClick={() => setIsOpenPopUp(true)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span dangerouslySetInnerHTML={{ __html: IMGIcon }}></span>
            </button>
            <button
              onClick={handleInsertVideo}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span dangerouslySetInnerHTML={{ __html: VideoIcon }}></span>
            </button>
            {/* add Link Youtube Video */}
            <ButtonCustomCss
              onMouseDown={(e) => e.preventDefault()}
              onClick={addYoutubeVideo}
              className={editor.isActive('link') ? 'is-active' : ''}
            >
              <span dangerouslySetInnerHTML={{ __html: FileVideoIcon }}></span>
            </ButtonCustomCss>{' '}
            |
            {arrTextMark?.slice(4, 8).map((item, index) => (
              <ButtonEditor
                editor={editor}
                key={item?.name || index}
                element={item?.name}
                extension={item?.name}
                icon={item?.icon}
              />
            ))}
            |
            {arrTextMark?.slice(8, arrTextMark.length).map((item, index) => (
              <ButtonEditor
                editor={editor}
                key={item?.name || index}
                element={item?.name}
                extension={item?.name}
                icon={item?.icon}
              />
            ))}
            <button
              onClick={insertFx}
              className=""
              onMouseDown={(e) => e.preventDefault()}
            >
              <Latex>$f x$</Latex>
            </button>
            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().setPageBreak().run()}
            >
              <span dangerouslySetInnerHTML={{ __html: BreakPage }}></span>
            </button>
            <div className="tiptap__table relative">
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setOpenToolTable(!openToolTable);
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: TableIcon }}></span>
              </button>
              {openToolTable && (
                <div className="tiptap__table absolute grid grid-cols-2 text-start w-[300px] gap-3 bg-white z-50">
                  {tableActions?.map((act, index) => {
                    return (
                      <button
                        className=""
                        onMouseDown={(e) => e.preventDefault()}
                        key={act?.action || index}
                        onClick={() => {
                          if (!editor.chain().focus()) {
                            return null;
                          }
                          editor.chain().focus()[act?.action]().run();
                        }}
                      >
                        {act?.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            |
            <button
              onClick={toggleFullscreen}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span dangerouslySetInnerHTML={{ __html: FullScreenIcon }}></span>
            </button>
            <div className="relative">
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setOpenSpecialChar(!openSpecialChar)}
              >
                ∑
              </button>
              {openSpecialChar && (
                <div className="special-character-picker bg-white z-50 w-[150px] border p-2 text-[14px] max-h-[250px] overflow-auto absolute flex items-center flex-wrap gap-2 ">
                  {SpecialCharacters.map((char) => (
                    <button
                      key={char}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleInsertCharacter(char)}
                      className="special-character-button block"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Grid Layout */}
            <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none text-[14px] w-fit h-[40px]"
                value={gridlayout}
                onChange={handleChangeGridLayout}
              >
                <MenuItem disabled value={'Grid Layout'}>
                  <span dangerouslySetInnerHTML={{ __html: GridIcon }}></span>
                </MenuItem>
                {arrLayouts?.length > 0 &&
                  arrLayouts?.map((item, index) => {
                    return (
                      <MenuItem key={item?.name || index} value={item?.icon}>
                        <ButtonCustomCss
                          className="w-full"
                          onMouseDown={(e) => e.preventDefault()}
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
                        </ButtonCustomCss>
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            |{/*text alignment */}
            <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none text-[14px] w-[70px] h-[40px]"
                value={alignment}
                onChange={handleChangeAlignment}
                defaultValue="left"
                style={{ fontFamily: `${alignment}` }}
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
            {/* blockquote */}
            <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
              <Select
                className=" outline-none text-[14px] w-fit h-[40px]"
                value={iconQuotes}
                onChange={handleChange}
              >
                <MenuItem disabled value={'quotes'}>
                  <span
                    dangerouslySetInnerHTML={{ __html: GroupQuotes }}
                  ></span>
                </MenuItem>
                {arrBlockquotes?.length > 0 &&
                  arrBlockquotes?.map((item, index) => {
                    return (
                      <MenuItem key={item?.name || index} value={item?.icon}>
                        <ButtonEditor
                          editor={editor}
                          extension={item?.name}
                          icon={item?.icon}
                        />
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {/* Widget */}
            <button onClick={getSource} onMouseDown={(e) => e.preventDefault()}>
              <span dangerouslySetInnerHTML={{ __html: SourceHtml }}></span>
            </button>
            <FormControl className="formControl " sx={{ m: 1, minWidth: 120 }}>
              <Select
                className="outline-none form-fontFamily text-[14px] w-fit h-[40px]"
                onChange={handleWidget}
                defaultValue="Widget"
              >
                <MenuItem value="Widget" disabled>
                  Widget
                </MenuItem>
                {dataWidget?.map((item: any, index) => (
                  <MenuItem value={item?.name} key={item?.name || index}>
                    <ButtonCustomCss onMouseDown={(e) => e.preventDefault()}>
                      <span>{item?.name}</span>
                    </ButtonCustomCss>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ButtonCustomCss
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (!editor.isFocused) {
                  editor.chain().focus().run();
                }
                editor.chain().focus().setHorizontalRule().run();
              }}
            >
              <span>___</span>
            </ButtonCustomCss>
          </div>
        </div>

        <EditorContent
          id="source-output"
          className="content__editor-tiptap min-h-[300px] overflow-hidden"
          editor={editor}
        />
        <pre
          style={{
            backgroundColor: '#f4f4f4',
            padding: '10px',
            border: '1px solid #ddd',
            marginTop: '20px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {sourceHTML}
        </pre>
      </div>

      {/* <div onClick={getSource}>Xem trên Web</div> */}
    </>
  );
};
export default TiptapMUI;
