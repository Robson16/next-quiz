import { ReactNode } from 'react';
import { Container } from './styles';

interface INavbarProps {
  children: ReactNode;
}

export function Navbar({ children }: INavbarProps) {
  return <Container>{children}</Container>;
}
