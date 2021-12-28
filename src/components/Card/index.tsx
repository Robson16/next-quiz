import { ReactNode } from "react";
import { Container } from './styles';

interface ICardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: ICardProps) {
  return (
    <Container className={className}>
      {children}
    </Container>
  );
}
