import { DATA_IMAGE } from '@/constant/DataImg';
import { useState } from 'react';
const PopupMedia = ({ image }: { image: (src: string) => void }) => {
  const [sourceImage, setSourceImage] = useState('');
  console.log('sourceImage :>> ', sourceImage);
  return (
    <div className="fixed w-full h-full bg-white z-[90] px-2">
      <p
        onClick={() => image(sourceImage)}
        className="block w-full cursor-pointer text-[24px] top-0 text-end P-3 "
      >
        X
      </p>
      <div className="grid grid-cols-4 grid-rows-auto  gap-4">
        {DATA_IMAGE?.map((item) => (
          <div
            key={item?.src}
            onClick={() => setSourceImage(item?.src)}
            className=" cursor-pointer"
          >
            <img
              src={item?.src}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupMedia;
