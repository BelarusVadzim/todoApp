import TodoPage from 'components/pages';
import { useTodoStateService } from 'hooks';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const { dispatchReadyInitializeTodoState } = useTodoStateService();

  useEffect(() => {
    dispatchReadyInitializeTodoState();
  }, []);

  return <TodoPage />;
};

export default App;
