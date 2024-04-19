import type { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UniversalProvider } from './components/contexts/UniversalContext';
import Quizcore from './components/pages/quizGame/comps/QuizCore';
import { QuizProvider } from './components/contexts/QuizContext';
import Topics from './components/pages/chooseTopic/Topics';
import NotFound from './components/readyToUseComponents/NotFound';

const App: FC = (): ReactElement => {
  return (
    <>
      <UniversalProvider topic="" isSelected={true}>
        <Routes>
          <Route path="/" element={<Topics />}></Route>
          <Route
            path="/play"
            element={
              <QuizProvider>
                <Quizcore />
              </QuizProvider>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UniversalProvider>
    </>
  );
};

export default App;
