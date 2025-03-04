'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const arrWidget = [
    'FooterA',
    'FooterB',
    'FooterC',
    'HomeZ',
    'HomeA',
    'HomeB',
  ];
  const [dataWidget, setDataWidget] = useState<any>([]);
  const [contentWidget, setContentWidget] = React.useState<any>([]);
  const handlegetWidget = async () => {
    try {
      const results = await Promise.all(
        arrWidget?.map(async (item) => {
          const res: any = await axios.get(
            `https://api.nongthonviet.com.vn/public/widget/getSlot/${item}`
          );
          const data = res?.data?.result;
          if (data) {
            return data;
          }
        })
      );
      if (results) {
        setDataWidget(results);
        const arrUseWidget = results?.map((item) => item?.useWidget);
        if (arrUseWidget) {
          handleGetContentWidget(arrUseWidget);
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  useEffect(() => {
    handlegetWidget();
  }, []);
  const handleGetContentWidget = async (arrDataWidget: any[]) => {
    try {
      const dataContent = await Promise.all(
        arrDataWidget?.map(async (item: string) => {
          const res: any = await axios.get(
            `https://api.nongthonviet.com.vn/public/widget/${item}`
          );
          const data = res?.data?.result;
          return data;
        })
      );
      if (dataContent?.length > 0) {
        setContentWidget(dataContent);
      }
      console.log('dataContent :>> ', dataContent);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto my-0 px-5">
      {contentWidget?.length > 0 &&
        contentWidget?.map((item: any, index: any) => {
          return (
            <div key={item?.id || index}>
              <p className="blob"> {item?.name}</p>
              <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
            </div>
          );
        })}
    </div>
  );
}
