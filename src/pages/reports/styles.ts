import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;

  height: 100%;
  min-height: 100vh;

  margin: 0 auto;
  padding: 2rem 1rem 2rem;

  @media (min-width: 768px) {
    max-width: 700px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Nunito", sans-serif;

  border-radius: 8px;

  background-color: ${props => props.theme.colors.white};

  box-shadow: 0px 1px 4px ${props => props.theme.colors.boxShadow};

  header {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 4rem;

    min-height: 237px;

    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    background-color: ${props => props.theme.colors.backgroundCardHeader};

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      gap: 1rem;

      padding: 1.5rem 1rem;

      @media (min-width: 576px) {
        flex-direction: row;
      }

      p {
        margin: 0;

        font-size: 1.125rem;
        line-height: 1.5rem;
        text-align: center;
        color: ${props => props.theme.colors.white};

        @media (min-width: 576px) {
          text-align: left;
        }

        &:first-child {
          font-size: 2.25rem;
          line-height: 3rem;
        }
      }
    }

    & > span {
      margin: 0 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 5px;

      background-color: ${props => props.theme.colors.white};

      box-shadow: 0px 4px 4px ${props => props.theme.colors.boxShadow};

      font-weight: bold;
      text-align: center;

      transform: translateY(45%);
    }
  }

  button {
    margin: 3rem auto 1.5rem;
    padding: 0.688rem 1.5rem;

    border: none;
    border-radius: 8px;

    color: ${props => props.theme.colors.white};

    background-color: ${props => props.theme.colors.button};
  }
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  .total {
    display: flex;
    gap: 2.5rem;

    padding: 0.5rem 2.5rem;

    border-radius: 10px;
    background-color: ${props => props.theme.colors.background};

    span {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      font-size: 1.75rem;
      font-weight: bold;
      line-height: 2.25rem;
      text-align: center;

      small {
        font-size: 0.813rem;
        line-height: 1.125rem;
      }
    }
  }

  .difficulties {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    min-width: 100%;

    padding: 0 1rem;

    @media (min-width: 576px) {
      flex-direction: row;
    }

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (min-width: 576px) {
        &:not(:last-child) {
          border-right: 1px solid ${props => props.theme.colors.borderGrey};
        }
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;

      @media (min-width: 576px) {
        text-align: left;
      }
    }

    li {
      line-height: 1.5rem;

      &:first-child {
        font-weight: bold;
        color: ${props => props.theme.colors.link};
      }
    }
  }
`;
