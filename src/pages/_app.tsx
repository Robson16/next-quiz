import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';
import { ThemeProvider } from 'styled-components';
import { Header } from '../components/Header';
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
        <Header>
          <h1>Next Quiz</h1>
        </Header>
        <ReportProvider>
          <Component {...pageProps} />
        </ReportProvider>
      </>
    </ThemeProvider>
  );
}
