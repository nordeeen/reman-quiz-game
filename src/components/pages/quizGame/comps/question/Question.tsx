import { FC, ReactElement, useContext, useState } from 'react';
import Answer from '../answer/Answer';
import ToastWarning from '../../../../readyToUseComponents/toastWarning';
import { QuizContext, allowedActions } from '../../../../contexts/QuizContext';

const Question: FC = (): ReactElement => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const quizContext = useContext(QuizContext);
  const dispatch = quizContext?.dispatch;
  const currentQuestion =
    quizContext?.state.questions[quizContext.state.currentQuestionIndex];
  const answers = quizContext?.state.currentQuestionAnswer;
  const selectedAnswer = quizContext?.state.selectedAnswer;
  const correctAnswer = quizContext?.state.correctAnswer;
  const helpChances = quizContext?.state.helpChances;
  const askedHelp = quizContext?.state.askedHelp;
  const limitHelp = 3;
  const helpDisabled =
    helpChances && helpChances <= 0 ? 'help-disabled disabled' : null;

  const handleSelectedAnswer = ({ value }: { value: string }) => {
    dispatch &&
      dispatch({
        type: allowedActions.SELECT_ANSWER,
        payload: value,
      });
  };

  const handleHelpUser = () => {
    if (clickCount < Number(limitHelp)) {
      setClickCount(clickCount + 1);
      dispatch && dispatch({ type: allowedActions.ASK_HELP, payload: null });
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };
  console.log('helpCancaes----->', helpChances);
  const handleNextQuestion = () => {
    if (selectedAnswer) {
      dispatch &&
        dispatch({
          type: allowedActions.NEXT_QUESTION,
          payload: null,
        });
      console.log('lock the answer !!!');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="question container">
        <p className="question-text">{currentQuestion?.question}</p>
        <div className="mt-[1rem] answers">
          {answers?.map((answer, index) => (
            <Answer
              answer={answer}
              key={index}
              index={index}
              onSelectAnswer={() => handleSelectedAnswer({ value: answer })}
              selectedAnswer={selectedAnswer}
              correctAnswer={correctAnswer}
              askedHelp={askedHelp}
            />
          ))}
        </div>

        <div className="flex">
          <div
            className={`help-btn action-btn cursor-pointer ${helpDisabled}`}
            onClick={handleHelpUser}
          >
            <p className="text-center leading-[2.8rem]">Help</p>
            <span
              className="help-chances"
              style={{ color: showToast ? 'red' : 'black' }}
            >
              {helpChances}
            </span>
          </div>

          <div
            className="next-btn action-btn cursor-pointer"
            onClick={handleNextQuestion}
          >
            <span className="text-center leading-[2.8rem]">Next Question</span>
          </div>
        </div>
      </div>
      {showToast && <ToastWarning message={`help has run out !!!`} />}
    </div>
  );
};

export default Question;
