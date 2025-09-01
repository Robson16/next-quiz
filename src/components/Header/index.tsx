import { ReactNode } from 'react';
import { Container } from './styles';

interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

export function Header({ children, className = '' }: IHeaderProps) {
  return <Container className={className}>{children}</Container>;
}
