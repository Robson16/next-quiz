import { ReactNode } from 'react';
import { Container } from './styles';

interface IHeaderProps {
  children: ReactNode;
}

export function Header({ children }: IHeaderProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
