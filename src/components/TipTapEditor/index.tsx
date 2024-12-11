// 'use client';
// import Blockquote from '@tiptap/extension-blockquote';
// import Document from '@tiptap/extension-document';
// import Heading from '@tiptap/extension-heading';
// import Paragraph from '@tiptap/extension-paragraph';

// import Text from '@tiptap/extension-text';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import './style.css';
// import {
//   BlockquoteBoxBlue,
//   BlockquoteBoxGreen,
//   BlockquoteBoxGrey,
//   BlockquoteLineX,
//   BlockquoteLineY,
//   BlockquoteWithIcon,
// } from './QuotesLine';
// import ButtonEditor from '../ButtonEditor';
// import {
//   BoxQuotesBlueSVG,
//   BoxQuotesGreenSVG,
//   BoxQuotesGreySVG,
//   LineHorizontal,
//   LineParallel,
//   Quotes,
//   QuotesWithIconSVG,
// } from '@/constant/iconCkeditor';
// export default () => {
//   const editor: any = useEditor({
//     extensions: [
//       Document,
//       Paragraph,
//       Text,
//       Blockquote,
//       BlockquoteLineY.configure({
//         HTMLAttributes: { class: 'quote-lines' },
//       }),
//       BlockquoteLineX.configure({
//         HTMLAttributes: { class: 'custom-quote-button' },
//       }),
//       BlockquoteWithIcon.configure({
//         HTMLAttributes: { class: 'quotes-with-icon-button' },
//       }),
//       BlockquoteBoxBlue.configure({
//         HTMLAttributes: { class: 'box-quotes-blue' },
//       }),
//       BlockquoteBoxGreen.configure({
//         HTMLAttributes: { class: 'box-quotes-green' },
//       }),
//       BlockquoteBoxGrey.configure({
//         HTMLAttributes: { class: 'box-quotes-grey' },
//       }),

//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//     ],
//     content: `
//       <blockquote>
//         Nothing is impossible, the word itself says “I’m possible!”
//       </blockquote>
//       <p>Audrey Hepburn</p>
//     `,
//     immediatelyRender: false,
//   });

//   if (!editor) {
//     return null;
//   }
//   console.log('editor :>> ', editor?.callbacks?.extensionStorage);

//   return (
//     <div>
//       <div className="control-group">
//         <div className="button-group flex gap-5 p-3 items-center h-[50px]">
//           <ul className=""></ul>
//           <ButtonEditor editor={editor} extension="Heading" icon="H1" />
//           <ButtonEditor editor={editor} extension="Heading" icon="H2" />
//           <ButtonEditor editor={editor} extension="Heading" icon="H3" />
//           <ButtonEditor editor={editor} extension="Heading" icon="H4" />
//           <ButtonEditor editor={editor} extension="Blockquote" icon={Quotes} />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteLineX"
//             icon={LineHorizontal}
//           />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteLineY"
//             icon={LineParallel}
//           />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteWithIcon"
//             icon={QuotesWithIconSVG}
//           />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteBoxBlue"
//             icon={BoxQuotesBlueSVG}
//           />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteBoxGreen"
//             icon={BoxQuotesGreenSVG}
//           />
//           <ButtonEditor
//             editor={editor}
//             extension="BlockquoteBoxGrey"
//             icon={BoxQuotesGreySVG}
//           />
//         </div>
//       </div>

//       <EditorContent className="p-5" editor={editor} />
//     </div>
//   );
// };
