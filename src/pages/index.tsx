import type { NextPage } from 'next'

import { Header } from '../components/Header'

import styles from '../styles/Home.module.scss'

export default function Home({ }: NextPage) {
  return (
    <div className={styles.homepage}>
      <Header>
        <h1>Teste Dev Frontend</h1>
      </Header>
    </div>
  );
}
