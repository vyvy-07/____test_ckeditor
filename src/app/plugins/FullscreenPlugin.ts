// /plugins/FullscreenPlugin.ts
import { FullScreenIcon } from '@/constant/iconCkeditor';
import { Editor } from '@ckeditor/ckeditor5-core';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
// import FullscreenIcon from '@ckeditor/ckeditor5-core/theme/icons/fullscreen.svg';
import {
  // Other imports
  Plugin,
} from 'ckeditor5';
class TimePlugin extends Plugin {
  init() {
    const editor = this.editor;
    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('time', () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView();

      button.set({
        label: 'time',
        withText: true,
      });

      return button;
    });
  }
}

export default TimePlugin;
