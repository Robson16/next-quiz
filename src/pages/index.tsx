import type { NextPage } from 'next'

import styles from '../styles/Home.module.scss'

export default function Home({ }: NextPage) {
  return (
    <div className={styles.homepage}>
      <h1>Olá Mundo!</h1>
    </div>
  );
}
