import Link from 'next/link';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Container } from './styles';

interface IQuestionHeaderProps {
  title: string;
}

export function QuestionHeader({ title }: IQuestionHeaderProps) {
  return (
    <Container>
      <h2>{title}</h2>
      <Link href='/'>
        <a>
          <RiCloseCircleLine size={18} />
          Close
        </a>
      </Link>
    </Container>
  );
}
