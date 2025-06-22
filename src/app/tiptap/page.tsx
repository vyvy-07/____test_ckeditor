'use client';

import TipTapEditorMui from '@/components/TipTapEditorMui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSource } from '@/components/SourceContext';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const TipTapEditor = () => {
  const { setDataHtml, dataHtml } = useSource() || {};
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TipTapEditorMui />
    </ThemeProvider>
  );
};

export default TipTapEditor;
