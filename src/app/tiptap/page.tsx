'use client';

import TipTapComponent from '@/components/TipTapEditor';
import TipTapEditorMui from '@/components/TipTapEditorMui';

const TipTapEditor = () => {
  return (
    <div className="pt-7 grid grid-cols-2 gap-3 ">
      <>
        <TipTapComponent />
      </>
      <>
        <TipTapEditorMui />
      </>
    </div>
  );
};

export default TipTapEditor;
