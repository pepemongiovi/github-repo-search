import '@/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Stack } from '@mui/material';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Stack>
      <Header />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </Stack>
  );
}
