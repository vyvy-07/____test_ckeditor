import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import { Editor } from '@ckeditor/ckeditor5-core';
import { ButtonView } from 'ckeditor5';

interface InsertGridOptions {
  rows: number;
  cols: number;
}

class InsertGridCommand extends Command {
  execute(options: InsertGridOptions) {
    const { rows, cols } = options;

    // HTML cho lưới sử dụng display: grid
    const gridHtml = `
            <div style="
                display: grid;
                grid-template-columns: repeat(${cols}, 1fr);
                grid-template-rows: repeat(${rows}, 1fr);
                gap: 5px;
                width: 100%;
                height: auto;
            ">
                ${Array.from({ length: rows * cols })
                  .map(
                    () =>
                      '<div style="border: 1px solid #ddd; min-height: 30px;">&nbsp;</div>'
                  )
                  .join('')}
            </div>
        `;

    // Chèn grid vào editor
    this.editor.model.change((writer) => {
      const gridElement = writer.createElement('htmlEmbed', {
        htmlContent: gridHtml,
      });
      this.editor.model.insertContent(gridElement);
    });
  }
}

export default class InsertGrid extends Plugin {
  static get requires() {
    return [InsertGridCommand];
  }

  init() {
    const editor = this.editor as Editor;
    editor.commands.add('insertGrid', new InsertGridCommand(editor));

    editor.ui.componentFactory.add('insertGrid', (locale) => {
      const view = new ButtonView(locale);
      view.set({
        label: 'Insert Grid',
        withText: true,
        tooltip: true,
      });

      view.on('execute', () => {
        const rows = parseInt(prompt('Number of rows:', '3') || '3');
        const cols = parseInt(prompt('Number of columns:', '3') || '3');
        editor.execute('insertGrid', { rows, cols });
      });

      return view;
    });
  }
}
