import { useAppDispatch, useAppSelector } from 'store';
import { setAppInitialized, setFilter } from 'store/slices/applicationSlice';

const useAppStateService = () => {
  const appDispatch = useAppDispatch();

  const dispatchFilterChanged = (filter?: string) => {
    appDispatch(setFilter(filter));
  };

  const dispatchAppInitialized = () => {
    appDispatch(setAppInitialized());
  };

  const todoFilter = useAppSelector((state) => {
    return state.application.filter;
  });

  const isAppInitialized = useAppSelector((state) => {
    return state.application.appInitialized;
  });

  return {
    dispatchFilterChanged,
    dispatchAppInitialized,
    todoFilter,
    isAppInitialized,
  };
};

export default useAppStateService;
