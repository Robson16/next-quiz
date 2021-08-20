import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';

import { Header } from '../components/Header';

import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste Dev Frontend</title>
      </Head>
      <>
        <Header>
          <h1>Teste Dev Frontend</h1>
        </Header>
        <Component {...pageProps} />
      </>
    </>
  );
}
