import { useAppDispatch, useAppSelector } from 'store';
import { setFilter } from 'store/slices/applicationSlice';

const useAppStateService = () => {
  const appDispatch = useAppDispatch();

  const dispatchFilterChanged = (filter?: string) => {
    appDispatch(setFilter(filter));
  };

  const todoFilter = useAppSelector((state) => {
    return state.application.filter;
  });

  return {
    dispatchFilterChanged,
    todoFilter,
  };
};

export default useAppStateService;
