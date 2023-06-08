import { renderHook } from '@testing-library/react';
import useAppStateService from './useAppStateService';
import { RootState } from 'store';

const setFilterResult = 'setFilterResult';
const setAppInitializedResult = 'setAppInitializedResult';
const filter = 'filter';
const appInitialized = true;

let useAppDispatchMock: jest.Mock;
let useAppSelectorMock: jest.Mock;

let setAppInitializedMock: jest.Mock;
let setFilterMock: jest.Mock;

let appDispatchMock = jest.fn();

jest.mock('store', () => {
  useAppDispatchMock = jest.fn(() => appDispatchMock);
  useAppSelectorMock = jest.fn((fn) => {
    const state: RootState = {
      todo: { todos: [] },
      application: {
        appInitialized,
        filter,
      },
    };

    return fn(state);
  });

  return {
    useAppDispatch: useAppDispatchMock,
    useAppSelector: useAppSelectorMock,
  };
});

jest.mock('store/slices/applicationSlice', () => {
  setAppInitializedMock = jest.fn(() => setAppInitializedResult);
  setFilterMock = jest.fn(() => setFilterResult);

  return {
    setAppInitialized: setAppInitializedMock,
    setFilter: setFilterMock,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useAppStateService', () => {
  it('dispatchFilterChanged should call expected function with expected value', async () => {
    const { result } = renderHook(useAppStateService);

    const dispatchFilterChanged = result.current.dispatchFilterChanged;

    dispatchFilterChanged('filter');

    expect(appDispatchMock).toBeCalledTimes(1);
    expect(appDispatchMock).toBeCalledWith(setFilterResult);
  });

  it('dispatchAppInitialized should call expected function with expected value', async () => {
    const { result } = renderHook(useAppStateService);

    const dispatchAppInitialized = result.current.dispatchAppInitialized;

    dispatchAppInitialized();

    expect(appDispatchMock).toBeCalledTimes(1);
    expect(appDispatchMock).toBeCalledWith(setAppInitializedResult);
  });

  it('todoFilter should has expected value', async () => {
    const { result } = renderHook(useAppStateService);

    const todoFilter = result.current.todoFilter;

    expect(todoFilter).toEqual(filter);
  });

  it('appInitialized should has expected value', async () => {
    const { result } = renderHook(useAppStateService);

    const todoFilter = result.current.isAppInitialized;

    expect(todoFilter).toEqual(appInitialized);
  });
});
