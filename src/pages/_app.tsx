import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';

import { ReportProvider } from '../contexts/ReportContext';

import { Header } from '../components/Header';

import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}
