import { DATA } from '@/constant/DataImg';
import { useModel } from '../ModelContext';

const PopUpModel = ({ editor }: { editor: any }) => {
  // const [imageSrc, setImageSrc] = useState('');
  const { isOpen, setIsOpen, imageSrc, setImageSrc } = useModel();
  const chooseImage = (src: string) => {
    setImageSrc(src);
  };
  console.log('imageSrc :>> ', imageSrc);
  const closePopUp = () => {
    if (imageSrc && editor) {
      editor.model.change((writer: any) => {
        const imageElement = writer.createElement('imageBlock', {
          src: imageSrc,
        });
        editor.model.insertContent(
          imageElement,
          editor.model.document.selection
        );
      });
    }
    console.log('1 :>> ', 1);

    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-[900] top-0 w-full h-full bg-orange-200">
          <div className="flex justify-between p-3 border">
            <div>
              <h1 className="text-[24px] ">MEDIA</h1>
            </div>
            <div
              className="w-[30px] h-[30px] cursor-pointer "
              onClick={closePopUp}
            >
              chèn
              <img
                className="w-full h-full object-cover"
                src="../img.svg"
                alt=""
              />
            </div>
          </div>
          <div className=" grid grid-cols-4 gap-5  ">
            {DATA?.length > 0 &&
              DATA?.map((item, index) => (
                <div key={index}>
                  <div
                    onClick={() => chooseImage(item?.src)}
                    className={`max-h-[300px] p-1 overflow-hidden ${
                      imageSrc == item?.src && 'border border-black'
                    }`}
                  >
                    <img src={item?.src} alt={item?.alt} />
                  </div>
                  {item?.fileName}
                </div>
              ))}
          </div>
        </div>
      )}{' '}
    </div>
  );
};

export default PopUpModel;
