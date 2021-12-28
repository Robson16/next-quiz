import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

interface IModalProps {
  type?: 'default' | 'hit' | 'miss';
};

const modalIconVariations = {
  default: css`
    background-color: ${props => props.theme.colors.button};
  `,
  hit: css`
    background-color: ${props => props.theme.colors.hit};
  `,
  miss: css`
    background-color: ${props => props.theme.colors.miss};
  `,
};

export const Container = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;

  height: 100%;
  min-height: 100vh;

  margin: 0 auto;
  padding: 1rem 1rem 2rem;

  @media (min-width: 768px) {
    max-width: 700px;
  }
`;

export const QuestionHeader = styled(Header)`
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    margin: 0 0 1rem;
    line-height: 2rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.25rem;

    line-height: 2rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: ${props => props.theme.colors.link};
  }
`;

export const QuestionCard = styled(Card)`
  padding: 1.875rem 2.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-family: "Nunito", sans-serif;
      font-size: 1.125rem;
      line-height: 1.5rem;
    }

    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      padding: 0.25rem 0.5rem;

      text-transform: capitalize;
      color: ${props => props.theme.colors.highlighted};

      border-radius: 14px;
      background: ${props => lighten(0.6, props.theme.colors.highlighted)};

      i {
        font-size: 0;
      }
    }
  }

  p {
    line-height: 1.172rem;
    margin-bottom: 3rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    div {
      width: 100%;
    }

    label {
      display: flex;
      align-items: center;

      width: 100%;
      min-height: 3.75rem;

      padding: 1rem;

      line-height: 1.5rem;

      border: 1px solid ${props => props.theme.colors.borderGrey};

      box-shadow: 0px 1px 2px ${props => props.theme.colors.boxShadow};
      border-radius: 8px;

      cursor: pointer;
    }

    input {
      display: none;
    }

    input:checked + label {
      border: 3px solid ${props => props.theme.colors.button};
    }

    button {
      margin-top: 3rem;

      width: 100%;
      height: 2.75rem;

      font-family: "Nunito", sans-serif;
      line-height: 1.5rem;
      color: ${props => props.theme.colors.white};

      border: none;
      border-radius: 8px;

      background-color:  ${props => props.theme.colors.button};;

      transition: filter 0.4s;

      &:hover {
        filter: brightness(0.85);
      }

      &:disabled {
        background-color: ${props => props.theme.colors.buttonDisabled};

        cursor: not-allowed;
      }

      @media (min-width: 992px) {
        max-width: 9.313rem;
      }
    }
  }
`;

export const ModalResult = styled(Modal)`
  i {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.938rem;
    min-height: 2.938rem;

    border-radius: 50%;

    font-size: 0;
    line-height: 0;
    color: ${props => props.theme.colors.white};

    ${props => modalIconVariations[props.type || 'default']}
  }

  p {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    color: ${props => props.theme.colors.highlighted};
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    padding: 0.688rem 1.5rem;

    font-weight: 700;
    line-height: 1.5rem;

    border: none;
    border-radius: 8px;

    color: ${props => props.theme.colors.white};

    background-color: ${props => props.theme.colors.button};
  }
`;
