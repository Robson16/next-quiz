import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'normalize.css';

import '../styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste Dev Frontend</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
