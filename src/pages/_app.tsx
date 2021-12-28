import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { Navbar } from '../components/Navbar';
import { ReportProvider } from '../contexts/ReportContext';
import GlobalStyle from '../styles/globals';
import theme from '../styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>Next Quiz</title>
      </Head>
      <>
        <Navbar>
          <h1>Next Quiz</h1>
        </Navbar>
        <ReportProvider>
          <Component {...pageProps} />
        </ReportProvider>
      </>
    </ThemeProvider>
  );
}
