'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
let globalOpenPopUp: () => void;
// Khai báo kiểu dữ liệu của context
export interface MyContextType {
  isOpen: boolean;
  setIsOpen: any;
  imageSrc: string | undefined;
  setImageSrc: any;
  openPopUp: () => void;
}

// Khởi tạo context với kiểu dữ liệu
const MyContext = createContext<MyContextType | undefined>(undefined);

const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  const openPopUp = () => {
    setIsOpen(!isOpen);
  };
  globalOpenPopUp = openPopUp;
  return (
    <MyContext.Provider
      value={{ isOpen, openPopUp, setIsOpen, imageSrc, setImageSrc }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Sử dụng hook `useModel` với kiểm tra context không bị undefined
export const useModel = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useModel phải được sử dụng bên trong ModelProvider');
  }
  return context;
};

export { globalOpenPopUp };
export default ModelProvider;
