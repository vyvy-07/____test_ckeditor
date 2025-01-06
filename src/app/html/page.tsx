'use client';
import { useState } from 'react';

const RenderHTML = () => {
  const [data, setData] = useState('');
  const [hide, setHide] = useState(true);

  return (
    <>
      <span
        onClick={() => setHide(!hide)}
        className="block w-fit px-2 m-1 rounded-sm bg-red-300"
      >
        {hide ? 'Ẩn' : 'hiện'} input
      </span>
      {hide && (
        <>
          <div className="m-5 ">
            <label>Nhập Html</label>
            <textarea
              onChange={(e) => setData(e.target.value)}
              className=" h-[40px] w-full border outline-none mt-1"
            />
          </div>
          <hr className="h-1 bg-red-400" />
        </>
      )}
      {data && (
        <div className="mt-9" dangerouslySetInnerHTML={{ __html: data }}></div>
      )}
    </>
  );
};

export default RenderHTML;
