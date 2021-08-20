import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { Category } from '../components/Category';
import { api } from '../services/api';

import styles from '../styles/Home.module.scss';

interface ICategoryProps {
  id: number;
  name: string;
}

interface IHomeProps {
  categories: ICategoryProps[];
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('api_category.php');

  return {
    props: {
      categories: data.trivia_categories,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default function Home({ categories }: IHomeProps) {
  return (
    <div className={styles.homepage}>
      <div className={styles.container}>

        <h2>Categorias</h2>

        <div className={styles.categoriesGrid}>

          {categories.map((category) => {
            return (
              <Link href={"/"} key={category.id}>
                <a className={styles.category}>
                  <span>{category.name}</span>
                </a>
              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
}
