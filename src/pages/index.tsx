import { useContext } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { ReportContext } from '../contexts/ReportContext';

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
  const categories = data.trivia_categories;

  return {
    props: {
      categories,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export default function Home({ categories }: IHomeProps) {
  const router = useRouter();
  const { reports } = useContext(ReportContext);

  function handleSelectCategory(categoryId: number) {
    const categoryAlreadyHasReport = reports.find(
      (report) => report.categoryId === categoryId,
    );

    if (categoryAlreadyHasReport) {
      router.push(`/reports/${categoryId}`);
    } else {
      router.push(`/questions/${categoryId}`);
    }
  }

  return (
    <div className={styles.homepage}>
      <div className={styles.container}>
        <h2>Categories</h2>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <a
              key={category.id}
              className={styles.category}
              onClick={() => handleSelectCategory(category.id)}
            >
              <span>{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
