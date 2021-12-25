import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ReportContext } from '../contexts/ReportContext';
import { api } from '../services/api';
import { CategoriesGrid, Category, Container, Homepage } from '../styles/Home';

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
    <Homepage>
      <Container>
        <h2>Categories</h2>

        <CategoriesGrid>
          {categories.map((category) => (
            <Category
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
            >
              <span>{category.name}</span>
            </Category>
          ))}
        </CategoriesGrid>
      </Container>
    </Homepage>
  );
}
