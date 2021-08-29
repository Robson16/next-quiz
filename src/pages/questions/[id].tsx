import { FormEvent, useState, useEffect, useRef, useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { RiStarSFill } from 'react-icons/ri';
import { HiCheck, HiX, HiOutlineArrowRight } from 'react-icons/hi';

import { ReportContext } from '../../contexts/ReportContext';

import { api } from '../../services/api';
import { newQuestion } from '../../utils/newQuestion';
import { QuestionHeader } from '../../components/QuestionHeader';

import styles from './question.module.scss';

interface ICategory {
  id: number;
  name: string;
}

interface IQuestion {
  category: string;
  type: string;
  difficultyName: string;
  difficultyNumber: number;
  questionText: string;
  correctAnswer: string;
  alternatives: string[];
}

interface ISequences {
  hit: number;
  miss: number;
}

interface IScore {
  easy: {
    hit: number;
    miss: number;
  },
  medium: {
    hit: number;
    miss: number;
  },
  hard: {
    hit: number;
    miss: number;
  }
}

interface IQuestionsProps {
  categoryId: number;
  responseCode: number;
  questions: IQuestion[];
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('api_category.php');
  const categories = data.trivia_categories;

  const paths = categories.map((category: ICategory) => {
    return {
      params: {
        id: String(category.id),
      }
    }
  });

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  const data = await newQuestion({
    categoryId: Number(id),
    categoryDifficulty: 'medium'
  });

  return {
    props: {
      categoryId: Number(id),
      responseCode: data.responseCode,
      questions: data.questions,
    },
    revalidate: 60 * 5 // 5 Minutes
  }
}

export default function Questions({ categoryId, responseCode, questions }: IQuestionsProps) {
  const { saveReport } = useContext(ReportContext);

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [question, setQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<Boolean | undefined>(undefined);
  const [questionsCount, setQuestionsCount] = useState(1);
  const [currentDifficulty, setCurrentDifficulty] = useState(question.difficultyName);
  const [isQuestionsResultModalOpen, setIsQuestionsResultModalOpen] = useState(false);
  const [sequences, setSequences] = useState<ISequences>({ hit: 0, miss: 0 });
  const [score, setScore] = useState<IScore>({ easy: { hit: 0, miss: 0 }, medium: { hit: 0, miss: 0 }, hard: { hit: 0, miss: 0 } });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let newScore = score;
    switch (question.difficultyName) {
      case 'easy':
        (isAnswerCorrect) ? newScore.easy.hit++ : newScore.easy.miss++;
        break;

      case 'medium':
        (isAnswerCorrect) ? newScore.medium.hit++ : newScore.medium.miss++;
        break;

      case 'hard':
        (isAnswerCorrect) ? newScore.hard.hit++ : newScore.hard.miss++;
        break;

      default:
        break;
    }
    setScore(newScore);

    let newSequences = sequences;
    if (isAnswerCorrect) {
      newSequences.miss = 0;
      if (newSequences.hit < 2) newSequences.hit++;
    } else {
      newSequences.hit = 0;
      if (newSequences.miss < 2) newSequences.miss++;
    }
    setSequences(newSequences);

    if (sequences.hit === 2) {
      switch (currentDifficulty) {
        case 'easy':
          setCurrentDifficulty('medium');
          setSequences({
            hit: 0,
            miss: 0,
          });
          break;

        case 'medium':
          setCurrentDifficulty('hard');
          setSequences({
            hit: 0,
            miss: 0,
          });
          break;

        default:
          break;
      }
    }

    if (sequences.miss === 2) {
      switch (currentDifficulty) {
        case 'hard':
          setCurrentDifficulty('medium');
          setSequences({
            hit: 0,
            miss: 0,
          });
          break;

        case 'medium':
          setCurrentDifficulty('easy');
          setSequences({
            hit: 0,
            miss: 0,
          });
          break;

        default:
          break;
      }
    }

    setIsQuestionsResultModalOpen(true);
  }

  function handleAnswerToggle(answer: string) {
    setAnswer(answer);

    if (answer === question.correctAnswer) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  }

  async function handleNextQuestion() {
    if (questionsCount >= 10) {
      saveReport({
        categoryId,
        score,
      });

      router.push(`/reports/${categoryId}`);
    }

    const data = await newQuestion({
      categoryId,
      categoryDifficulty: currentDifficulty,
    });

    setQuestion(data.questions[0]);
    setIsQuestionsResultModalOpen(false);
    setQuestionsCount(questionsCount + 1);
    setAnswer('');
  }

  useEffect(() => {
    if (!formRef.current) {
      return;
    }

    formRef.current.reset();
  }, [question]);

  return (
    <>
      <div className={styles.questionsContainer}>
        {responseCode === 1 ? (
          <QuestionHeader title='No questions in this category' />
        ) : (
          <>
            <QuestionHeader title={question.category} />
            <div className={styles.questionCard} >
              <header>
                <h3>Question {questionsCount}</h3>
                <span>
                  <i>
                    {[...Array(question.difficultyNumber)].map((e, i) => {
                      return <RiStarSFill size={14} key={i} />
                    })}
                  </i>
                  {question.difficultyName}
                </span>
              </header>

              <p dangerouslySetInnerHTML={{ __html: question.questionText }} />

              <form onSubmit={handleSubmit} ref={formRef}>
                {question.alternatives.map((alternative, index) => {
                  return (
                    <div key={index}>
                      <input
                        type='radio'
                        name='alternative'
                        id={`alternative-${index}`}
                        onClick={() => handleAnswerToggle(alternative)}
                      />
                      <label
                        htmlFor={`alternative-${index}`}
                        dangerouslySetInnerHTML={{ __html: alternative }}
                      />
                    </div>
                  );
                })}

                <button
                  type='submit'
                  disabled={!answer.length}
                >
                  Reply
                </button>
              </form>

            </div>
          </>
        )}
      </div>

      {isQuestionsResultModalOpen && (
        <div className={styles.questionResultModal}>
          <div className={styles.questionResultModalOverlay}>
            <div
              className={`
                ${styles.questionResultModalContainer}
                ${(isAnswerCorrect) ? styles.hit : styles.miss}
              `}
            >
              {isAnswerCorrect
                ? <i><HiCheck size={32} /></i>
                : <i><HiX size={32} /></i>}
              <p>
                {isAnswerCorrect ? 'You\'re right!' : 'You missed!'}
              </p>
              <button type='button' onClick={handleNextQuestion}>
                <span>Advance</span>
                <HiOutlineArrowRight size={24} />
              </button>
            </div>
          </div>
        </div >
      )}
    </>
  );
}
