import TodoPage from 'components/pages';
import { useAppStateService, useTodoStateService } from 'hooks';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const { isAppInitialized, dispatchAppInitialized } = useAppStateService();
  const { dispatchReadyInitializeTodoState } = useTodoStateService();

  useEffect(() => {
    if (!isAppInitialized) {
      dispatchAppInitialized();
      dispatchReadyInitializeTodoState();
    }
  });

  return <TodoPage />;
};

export default App;
