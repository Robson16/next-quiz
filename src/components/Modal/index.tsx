import { ReactNode } from 'react';
import { Container, Overlay } from './styles';

interface IModalProps {
  children: ReactNode;
  type?: 'default' | 'hit' | 'miss';
  className?: string;
}

export function Modal({ children, type, className = '' }: IModalProps) {
  return (
    <Overlay>
      <Container type={type} className={className}>
        {children}
      </Container>
    </Overlay>
  );
}
