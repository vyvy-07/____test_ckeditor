// export default ButtonEditor;
import React from 'react';
import './style.css';

const ButtonEditor = ({
  editor,
  extension,
  icon,
  type,
  param,
  element,
  className,
  fontFamily,
  setFunc = false,
}: {
  className?: string;
  icon: string;
  type?: string | number;
  editor: any;
  extension: string;
  param?: any;
  element?: string;
  setFunc?: boolean;
  fontFamily?: string;
}) => {
  return (
    <>
      <button
        onMouseDown={(e) => e.preventDefault()} // Prevent blur
        onClick={() => {
          if (!editor.isFocused) {
            editor.chain().focus().run(); // Ensure focus
          }
          const tool = extension.charAt(0).toUpperCase() + extension.slice(1);
          console.log('object :>> ', tool);
          console.log('element', `toggle${tool.trim()}`);

          if (!setFunc) {
            if (!param) {
              editor
                .chain()
                .focus()
                [`toggle${tool.trim()}`]({ level: param })
                .run();
            } else {
              editor.chain().focus()[`toggle${tool.trim()}`](param).run();
              console.log('param :>> ', param);
            }
          } else {
            console.log('type :>> ', type);

            editor
              .chain()
              .focus()
              [`set${tool.trim()}`](type || param || '')
              .run();
          }
        }}
        className={`button_toolbar cursor-pointer h-full ${className} ${
          editor.isActive(
            element || extension.toLowerCase(),
            (type && { type }) || (param && param) || undefined
          )
            ? 'is-active'
            : ''
        }`}
      >
        <span className="button_toolbar_hover">{extension}</span>
        <span
          className={`${fontFamily && `${fontFamily}`}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        ></span>
      </button>
    </>
  );
};

export default ButtonEditor;
