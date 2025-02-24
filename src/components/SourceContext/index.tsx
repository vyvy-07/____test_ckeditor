'use client';
interface DataContext {
  dataHtml: string;
  setDataHtml: any;
}
import React, { createContext, useContext, type ReactNode } from 'react';
const SourceContext = createContext<DataContext>({} as DataContext);

const SourceProvider = ({ children }: { children: ReactNode }) => {
  const [dataHtml, setDataHtml] = React.useState('');
  return (
    <SourceContext.Provider value={{ dataHtml, setDataHtml }}>
      {children}
    </SourceContext.Provider>
  );
};
export const useSource = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return context;
};
export default SourceProvider;
