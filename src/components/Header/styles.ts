import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;

  min-height: 56px;

  padding-right: 1.625rem;
  padding-left: 1.625rem;

  background-color: ${props => props.theme.colors.backgroundHeader};

  h1 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 500;
    line-height: 1.485rem;
    color: ${props => props.theme.colors.white};
  }
`;
