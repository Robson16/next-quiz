import styled from 'styled-components';

export const Homepage = styled.div`
  display: flex;
  flex: 1;

  min-height: 100vh;

  background-color: ${props => props.theme.colors.background};
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin: 0 auto;
  padding: 1rem 1rem 2rem;

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 992px) {
  }
`;

export const Category = styled.a`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  min-height: 104px;

  padding: 1rem;

  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  box-sizing: border - box;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 1px 4px ${props => props.theme.colors.boxShadow};

  cursor: pointer;

  span {
    font-size: 1.15rem;
    font-weight: 500;
    line-height: 1.485rem;
  }
`;
