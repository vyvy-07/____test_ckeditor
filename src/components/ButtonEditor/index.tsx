import React from 'react';

const ButtonEditor = ({
  editor,
  extension,
  icon,
}: {
  icon: string;
  editor: any;
  extension: string;
}) => {
  return (
    <>
      <div
        onClick={() =>
          editor.chain().focus()[`toggle${extension}`]({ level: 2 }).run()
        }
        className={` cursor-pointer ${
          editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
        }`}
      >
        <span
          className="w-5 h-5"
          dangerouslySetInnerHTML={{ __html: icon }}
        ></span>
      </div>
    </>
  );
};

export default ButtonEditor;
