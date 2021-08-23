import Link from 'next/link';
import { RiCloseCircleLine } from 'react-icons/ri';

import styles from './styles.module.scss';

interface IQuestionHeaderProps {
  title: string;
}

export function QuestionHeader({ title }: IQuestionHeaderProps) {
  return (
    <header className={styles.questionHeader}>
      <h2>{title}</h2>
      <Link href="/">
        <a>
          <RiCloseCircleLine size={18} />
          Close
        </a>
      </Link>
    </header>
  );
}
