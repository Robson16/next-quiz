import styled, { css } from 'styled-components';

interface IContainerProps {
  type?: 'default' | 'hit' | 'miss';
}

const modalTypeVariations = {
  default: css`
    border-color: inherit;
  `,
  hit: css`
    border-color: ${props => props.theme.colors.hit};
  `,
  miss: css`
    border-color: ${props => props.theme.colors.miss};
  `,
};

export const Overlay = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.boxShadow};
`;

export const Container = styled.div<IContainerProps>`
  position: absolute;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  top: 50%;
  right: 50%;
  bottom: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  max-width: 328px;
  max-height: 228px;

  padding: 2rem;

  border-radius: 8px;
  border: 3px solid transparent;

  background-color: ${props => props.theme.colors.white};

  box-shadow: 0px 3px 6px ${props => props.theme.colors.boxShadow};

  ${props => modalTypeVariations[props.type || 'default']}
`;
