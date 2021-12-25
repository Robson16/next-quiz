import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FormEvent, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { HiCheck, HiOutlineArrowRight, HiX } from 'react-icons/hi';
import { RiStarSFill } from 'react-icons/ri';
import { QuestionHeader } from '../../components/QuestionHeader';
import { ReportContext } from '../../contexts/ReportContext';
import { api } from '../../services/api';
import { newQuestion } from '../../utils/newQuestion';
import { Card, Container, ModalResult } from './styles';

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

interface IPoint {
  hit: number,
  miss: number,
}

interface IDifficultyPoints {
  easy: IPoint,
  medium: IPoint,
  hard: IPoint,
}

interface IState {
  count: number,
  currentDifficulty: string,
  sequences: IPoint,
  points: IDifficultyPoints,
}

interface IAction {
  type: 'hit' | 'miss' | 'count'
}

interface IQuestionsProps {
  categoryId: number;
  responseCode: number;
  questions: IQuestion[];
}

interface IParams extends ParsedUrlQuery {
  id: string
}

const initialState = {
  points: {
    easy: {
      hit: 0,
      miss: 0
    },
    medium: {
      hit: 0,
      miss: 0
    },
    hard: {
      hit: 0,
      miss: 0
    },
  },
  sequences: {
    hit: 0,
    miss: 0
  },
  count: 1,
  currentDifficulty: 'medium',
};

const reducer = (state: IState, action: IAction): IState => {
  const { count, points, currentDifficulty, sequences } = state;

  let newPoints: IDifficultyPoints = {} as IDifficultyPoints;
  let newSequences: IPoint = {} as IPoint;
  let newDifficulty = currentDifficulty;

  switch (action.type) {
    case 'hit':
      if (currentDifficulty === 'easy') {
        newPoints = { ...points, easy: { ...points.easy, hit: points.easy.hit + 1 } }
      }
      if (currentDifficulty === 'medium') {
        newPoints = { ...points, medium: { ...points.medium, hit: points.medium.hit + 1 } }
      }
      if (currentDifficulty === 'hard') {
        newPoints = { ...points, hard: { ...points.hard, hit: points.hard.hit + 1 } }
      }

      newSequences = { ...sequences, hit: sequences.hit + 1, miss: 0 };

      if (newSequences.hit >= 2) {
        if (currentDifficulty === "easy") {
          newSequences = { ...sequences, hit: 0, miss: 0 };
          newDifficulty = "medium";
        }
        if (currentDifficulty === "medium") {
          newSequences = { ...sequences, hit: 0, miss: 0 };
          newDifficulty = "hard";
        }
      }

      return {
        ...state,
        points: newPoints,
        sequences: newSequences,
        currentDifficulty: newDifficulty,
      };

    case 'miss':
      if (currentDifficulty === 'easy') {
        newPoints = { ...points, easy: { ...points.easy, miss: points.easy.miss + 1 } }
      }
      if (currentDifficulty === 'medium') {
        newPoints = { ...points, medium: { ...points.medium, miss: points.medium.miss + 1 } }
      }
      if (currentDifficulty === 'hard') {
        newPoints = { ...points, hard: { ...points.hard, miss: points.hard.miss + 1 } }
      }

      newSequences = { ...sequences, miss: sequences.miss + 1, hit: 0 };

      if (newSequences.miss >= 2) {
        if (currentDifficulty === "hard") {
          newSequences = { ...sequences, hit: 0, miss: 0 };
          newDifficulty = "medium";
        }
        if (currentDifficulty === "medium") {
          newSequences = { ...sequences, hit: 0, miss: 0 };
          newDifficulty = "easy";
        }
      }

      return {
        ...state,
        points: newPoints,
        sequences: newSequences,
        currentDifficulty: newDifficulty,
      };

    case 'count':
      return {
        ...state,
        count: count + 1,
      }

    default:
      return state;
  }
};

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
  const [isQuestionsResultModalOpen, setIsQuestionsResultModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch({ type: (isAnswerCorrect) ? 'hit' : 'miss' });
    setIsQuestionsResultModalOpen(true);
  }

  function handleAnswerToggle(answer: string) {
    setAnswer(answer);
    (answer === question.correctAnswer) ? setIsAnswerCorrect(true) : setIsAnswerCorrect(false);
  }

  async function handleNextQuestion() {
    if (state.count >= 10) {
      saveReport({
        categoryId,
        points: state.points,
      });

      router.push(`/reports/${categoryId}`);
    }

    const data = await newQuestion({
      categoryId,
      categoryDifficulty: state.currentDifficulty,
    });

    dispatch({ type: 'count' });
    setQuestion(data.questions[0]);
    setIsQuestionsResultModalOpen(false);
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
      <Container>
        {responseCode === 1 ? (
          <QuestionHeader title='No questions in this category' />
        ) : (
          <>
            <QuestionHeader title={question.category} />
            <Card>
              <header>
                <h3>Question {state.count}</h3>
                <span>
                  <i>
                    {[...Array(question.difficultyNumber)].map((e, i) => {
                      return <RiStarSFill size={14} key={i} />
                    })}
                  </i>
                  {state.currentDifficulty}
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
            </Card>
          </>
        )}
      </Container>

      {isQuestionsResultModalOpen && (
        <ModalResult type={isAnswerCorrect ? 'hit' : 'miss'}>
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
        </ModalResult>
      )}
    </>
  );
}
