// import { mergeAttributes, Node, wrappingInputRule } from '@tiptap/core';

// export interface BlockquoteOptions {
//   /**
//    * HTML attributes to add to the blockquote element.
//    * @default {}
//    */
//   HTMLAttributes: Record<string, any>;
// }

// /**
//  * Matches a blockquote to a `>` as input.
//  */
// export const inputRegex = /^\s*>\s$/;

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     blockQuoteLineY: {
//       toggleBlockquoteLineY: () => ReturnType;
//     };
//     blockQuoteLineX: {
//       toggleBlockquoteLineX: () => ReturnType;
//     };
//     blockquoteBoxBlue: {
//       toggleBlockquoteBoxBlue: () => ReturnType;
//     };
//     blockquoteWithIcon: {
//       toggleBlockBoxGreen: () => ReturnType;
//     };
//     blockquoteBoxGreen: {
//       toggleBlockquoteWithIcon: () => ReturnType;
//     };
//     blockquoteBoxGrey: {
//       toggleBlockquoteBoxGrey: () => ReturnType;
//     };
//   }
// }

// export const createBlockquoteExtension = (name: string, shortcut: string) =>
//   Node.create<BlockquoteOptions>({
//     name,

//     addOptions() {
//       return {
//         HTMLAttributes: {},
//       };
//     },

//     content: 'block+',

//     group: 'block',

//     defining: true,

//     parseHTML() {
//       return [{ tag: 'blockquote' }];
//     },

//     renderHTML({ HTMLAttributes }) {
//       return [
//         'blockquote',
//         mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
//         0,
//       ];
//     },

//     addCommands() {
//       return {
//         [`set${name}`]:
//           () =>
//           ({ commands }: { commands: any }) => {
//             return commands.wrapIn(this.name);
//           },
//         [`toggle${name}`]:
//           () =>
//           ({ commands }: { commands: any }) => {
//             return commands.toggleWrap(this.name);
//           },
//         [`unset${name}`]:
//           () =>
//           ({ commands }: { commands: any }) => {
//             return commands.lift(this.name);
//           },
//       };
//     },

//     addKeyboardShortcuts() {
//       const toggleCommand =
//         `toggle${this.name}` as keyof typeof this.editor.commands;

//       return {
//         shortcut: () => {
//           const command = this.editor.commands[toggleCommand];

//           // Ensure the command exists and is callable
//           if (typeof command === 'function') {
//             try {
//               // Use a switch case to handle different commands based on this.name or other criteria
//               switch (this.name) {
//                 case 'BlockquoteBoxGreen':
//                   // Call specific command for LineY, e.g., toggling blockquote
//                   return this.editor.commands.toggleBlockBoxGreen();
//                 case 'BlockquoteBoxGrey':
//                   // Call specific command for LineX, e.g., toggling blockquote with another style
//                   return this.editor.commands.toggleBlockquoteBoxGrey();
//                 case 'BlockquoteWithIcon':
//                   // Handle BlockquoteWithIcon: use the shortcut 'Mod-Shift-i'
//                   return this.editor.commands.toggleBlockquoteWithIcon();
//                 case 'BlockquoteBoxBlue':
//                   // Handle BlockquoteBoxBlue: use the shortcut 'Mod-Shift-k'
//                   return this.editor.commands.toggleBlockquoteBoxBlue();
//                 case 'LineY':
//                   // Call specific command for LineY, e.g., toggling blockquote
//                   return this.editor.commands.toggleBlockquoteLineY();
//                 case 'LineX':
//                   // Call specific command for LineX, e.g., toggling blockquote with another style
//                   return this.editor.commands.toggleBlockquoteLineX();
//               }
//             } catch (error) {
//               console.error(`Error executing command ${toggleCommand}:`, error);
//               return false;
//             }
//           }

//           console.error(
//             `Command ${toggleCommand} is not a function or does not exist.`
//           );
//           return false;
//         },
//       };
//     },
//     addInputRules() {
//       return [
//         wrappingInputRule({
//           find: inputRegex,
//           type: this.type,
//         }),
//       ];
//     },
//   });

// // Extensions
// export const BlockquoteLineY = createBlockquoteExtension(
//   'BlockquoteLineY',
//   'Mod-Shift-b'
// );
// export const BlockquoteLineX = createBlockquoteExtension(
//   'BlockquoteLineX',
//   'Mod-Shift-l'
// );
// export const BlockquoteWithIcon = createBlockquoteExtension(
//   'BlockquoteWithIcon',
//   'Mod-Shift-i'
// );
// export const BlockquoteBoxBlue = createBlockquoteExtension(
//   'BlockquoteBoxBlue',
//   'Mod-Shift-k'
// );

// export const BlockquoteBoxGrey = createBlockquoteExtension(
//   'BlockquoteBoxGrey',
//   'Mod-Shift-d'
// );
// export const BlockquoteBoxGreen = createBlockquoteExtension(
//   'BlockquoteBoxGreen',
//   'Mod-Shift-z'
// );
