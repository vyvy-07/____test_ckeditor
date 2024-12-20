'use client';

import TipTapEditorMui from '@/components/TipTapEditorMui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const TipTapEditor = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TipTapEditorMui />
    </ThemeProvider>
  );
};

export default TipTapEditor;
