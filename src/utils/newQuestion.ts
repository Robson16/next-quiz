import { api } from '../services/api';
import Shuffle from './shuffle';

interface IQuestionAPI {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
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

interface INewQuestionData {
  categoryId: number;
  categoryDifficulty: string;
}

interface INewQuestionDTO {
  responseCode: number;
  questions: IQuestion[];
}

export const newQuestion = async ({ categoryId, categoryDifficulty }: INewQuestionData): Promise<INewQuestionDTO> => {
  const { data } = await api.get('api.php', {
    params: {
      amount: 1,
      category: categoryId,
      difficulty: categoryDifficulty,
      type: 'multiple',
    }
  });

  const difficultyNames = ['easy', 'medium', 'hard'];

  const questions = data.results.map((question: IQuestionAPI): IQuestion => {
    return {
      category: question.category,
      type: question.type,
      difficultyName: question.difficulty,
      difficultyNumber: difficultyNames.indexOf(question.difficulty, 0) + 1,
      questionText: question.question,
      correctAnswer: question.correct_answer,
      alternatives: Shuffle([...question.incorrect_answers, question.correct_answer]),
    };
  });

  return {
    responseCode: data.response_code,
    questions,
  }
}
