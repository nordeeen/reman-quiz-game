import { ReactNode, createContext, useReducer } from "react";
import { Questions as questions } from "../questionDatas";
import shuffleAnswers from "../helpers/suffleAnswers";

export enum allowedActions {
  NEXT_QUESTION,
  SELECT_ANSWER,
  RESET_GAME,
  ASK_HELP,
}

export type Action = { type: allowedActions; payload: string | null };
export type Dispatch = (action: Action) => void;
export const QuizContext = createContext<{
  state: StateInterface;
  dispatch: Dispatch;
} | null>(null);

interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  wrongAnswer: Array<string>;
}

interface StateInterface {
  questions: Array<Question>;
  currentQuestionIndex: number;
  currentQuestionAnswer: Array<string>;
  correctAnswer: string | undefined;
  selectedAnswer: string | null;
  assertedAnswerCount: number;
  helpChances: number;
  askedHelp: boolean;
  life: number;
  score: number;
  gameOver: boolean;
  isNext: boolean;
}

const initialState: StateInterface = {
  questions,
  currentQuestionIndex: 0,
  currentQuestionAnswer: shuffleAnswers([
    ...questions[0]!.wrongAnswer,
    questions[0]!.correctAnswer,
  ]),
  correctAnswer: questions[0]?.correctAnswer,
  selectedAnswer: null,
  assertedAnswerCount: 0,
  helpChances: 3,
  askedHelp: false,
  life: 3,
  score: 0,
  gameOver: false,
  isNext: true,
};

const getScore = () => {
  const score: number = Math.floor(Math.random() * (200 - 100) + 100);
  return score;
};

function QuizReducer(state: StateInterface, action: Action) {
  switch (action.type) {
    case allowedActions.NEXT_QUESTION: {
      const gameOver =
        state.questions.length - 1 === state.currentQuestionIndex;
      const currentQuestionIndex = gameOver
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;

      const nextQuestion = state.questions[currentQuestionIndex];
      const currentQuestionAnswer = nextQuestion
        ? shuffleAnswers([
            ...nextQuestion.wrongAnswer,
            nextQuestion.correctAnswer,
          ])
        : [];

      const correctAnswer = nextQuestion?.correctAnswer;

      const askedHelp = false;
      const isNext = true;

      return {
        ...state,
        currentQuestionAnswer,
        currentQuestionIndex,
        correctAnswer,
        selectedAnswer: null,
        askedHelp,
        gameOver,
        isNext,
      };
    }

    case allowedActions.SELECT_ANSWER: {
      const selectedAnswer = action.payload;

      const assertedAnswerCount =
        state.questions[state.currentQuestionIndex]?.correctAnswer ===
        selectedAnswer
          ? state.assertedAnswerCount + 1
          : state.assertedAnswerCount;

      const score =
        state.questions[state.currentQuestionIndex]?.correctAnswer ===
        selectedAnswer
          ? state.score + getScore()
          : state.score;

      const life =
        state.questions[state.currentQuestionIndex]?.correctAnswer !==
        selectedAnswer
          ? state.life - 1
          : state.life;
      const isNext = false;

      const gameOver = life <= 0 ? true : state.gameOver;

      return {
        ...state,
        selectedAnswer,
        assertedAnswerCount,
        askedHelp: false,
        score,
        life,
        gameOver,
        isNext,
      };
    }

    case allowedActions.ASK_HELP: {
      const helpChances =
        state.helpChances > 0 && !state.askedHelp && !state.selectedAnswer
          ? state.helpChances - 1
          : state.helpChances;

      return {
        ...state,
        helpChances,
        askedHelp: true,
      };
    }

    case allowedActions.RESET_GAME:
      return initialState;

    default:
      return state;
  }
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
