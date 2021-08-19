import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface IHeaderProps {
  children: ReactNode;
}

export function Header({ children }: IHeaderProps) {
  return (
    <header className={styles.headerContainer}>
      {children}
    </header>
  );
}
