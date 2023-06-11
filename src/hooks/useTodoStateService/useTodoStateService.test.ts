import { renderHook } from '@testing-library/react';
import { RootState } from 'store';
import useTodoStateService from './useTodoStateService';
import { TodoNote } from 'types';
import { filterTypes } from 'constants/filterTypes';

const todosUpdatedResult = 'todosUpdatedResult';
const readyInitializeTodoStatResult = 'readyInitializeTodoStatResult';
const filter = 'filter';
const appInitialized = true;
const maxTodoNoteId = 3;
const todoNote1: TodoNote = { id: 1, text: 'todoNote1', done: true };
const todoNote2: TodoNote = { id: 2, text: 'todoNote2', done: false };
const todoNote3: TodoNote = {
  id: maxTodoNoteId,
  text: 'todoNote3',
  done: false,
};
const todos = [todoNote1, todoNote2, todoNote3];

let useAppDispatchMock: jest.Mock;
let useAppSelectorMock: jest.Mock;

let readyInitializeTodoStateMock: jest.Mock;
let todosUpdatedMock: jest.Mock;

let appDispatchMock = jest.fn();
let getMaxTodoIdMock: jest.Mock;

const initState = (todoNotes: TodoNote[], filterValue: string): RootState => ({
  todos: todoNotes,
  filter: filterValue,
});

jest.mock('./utils', () => {
  getMaxTodoIdMock = jest.fn(() => maxTodoNoteId);

  return {
    getMaxTodoId: getMaxTodoIdMock,
  };
});

jest.mock('store', () => {
  console.log('init mock');
  useAppDispatchMock = jest.fn(() => appDispatchMock);
  useAppSelectorMock = jest.fn().mockImplementation((fn) => {
    const state = initState(todos, filter);

    return fn(state);
  });

  return {
    useAppDispatch: useAppDispatchMock,
    useAppSelector: useAppSelectorMock,
  };
});

jest.mock('store/thunks', () => {
  readyInitializeTodoStateMock = jest.fn(() => readyInitializeTodoStatResult);
  todosUpdatedMock = jest.fn(() => todosUpdatedResult);

  return {
    readyInitializeTodoState: readyInitializeTodoStateMock,
    todosUpdated: todosUpdatedMock,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useTodoStateService', () => {
  it('dispatchReadyInitializeTodoState should call expected function with expected value', () => {
    const { result } = renderHook(useTodoStateService);

    const dispatchReadyInitializeTodoState =
      result.current.dispatchReadyInitializeTodoState;

    dispatchReadyInitializeTodoState();

    expect(appDispatchMock).toBeCalledTimes(1);
    expect(appDispatchMock).toBeCalledWith(readyInitializeTodoStatResult);
  });

  it('dispatchTodoListChanged should call expected function with expected value', () => {
    const newTodoList: TodoNote[] = [];
    const { result } = renderHook(useTodoStateService);

    const dispatchTodoListChanged = result.current.dispatchTodoListChanged;

    dispatchTodoListChanged(newTodoList);

    expect(todosUpdatedMock).toBeCalledTimes(1);
    expect(todosUpdatedMock).toBeCalledWith(newTodoList);
    expect(appDispatchMock).toBeCalledTimes(1);
    expect(appDispatchMock).toBeCalledWith(todosUpdatedResult);
  });

  it('dispatchTodoItemCreated should call expected function with expected value', () => {
    const newTodo = { text: 'newTodoNote' };
    const { result } = renderHook(useTodoStateService);

    const dispatchTodoItemCreated = result.current.dispatchTodoItemCreated;

    dispatchTodoItemCreated({ text: 'newTodoNote' });

    expect(todosUpdatedMock).toBeCalledTimes(1);
    expect(todosUpdatedMock).toBeCalledWith([
      ...todos,
      { ...newTodo, id: maxTodoNoteId + 1 },
    ]);
  });

  it('dispatchTodoItemEdited should call expected function with expected value', () => {
    const updatedTodo = { ...todoNote2, text: 'newTodoNote' };
    const { result } = renderHook(useTodoStateService);

    const dispatchTodoItemEdited = result.current.dispatchTodoItemEdited;

    dispatchTodoItemEdited(updatedTodo);

    expect(todosUpdatedMock).toBeCalledTimes(1);
    expect(todosUpdatedMock).toBeCalledWith([
      todoNote1,
      updatedTodo,
      todoNote3,
    ]);
  });

  it('dispatchTodoItemDeleted should call expected function with expected value', () => {
    const deletedTodoNotedId = todoNote2.id;
    const { result } = renderHook(useTodoStateService);

    const dispatchTodoItemDeleted = result.current.dispatchTodoItemDeleted;

    dispatchTodoItemDeleted(deletedTodoNotedId!);

    expect(todosUpdatedMock).toBeCalledTimes(1);
    expect(todosUpdatedMock).toBeCalledWith([todoNote1, todoNote3]);
  });

  it('dispatchCompletedTodosDeleted should call expected function with expected value', () => {
    const { result } = renderHook(useTodoStateService);

    const dispatchCompletedTodosDeleted =
      result.current.dispatchCompletedTodosDeleted;

    dispatchCompletedTodosDeleted();

    expect(todosUpdatedMock).toBeCalledTimes(1);
    expect(todosUpdatedMock).toBeCalledWith([todoNote2, todoNote3]);
  });

  it('when filter value is All todos should have expected value', () => {
    useAppSelectorMock.mockImplementation((fn) => {
      const state: RootState = initState(todos, filterTypes.All);

      return fn(state);
    });

    const { result } = renderHook(useTodoStateService);
    console.log(result.current);

    let filteredTodos = result.current.todos;

    expect(filteredTodos).toEqual(todos);
  });

  it('when filter value is Active todos should have expected value', async () => {
    useAppSelectorMock.mockImplementation((fn) => {
      const state: RootState = initState(todos, filterTypes.Active);

      return fn(state);
    });

    const { result } = renderHook(useTodoStateService);

    let filteredTodos = result.current.todos;

    expect(filteredTodos).toEqual([todoNote2, todoNote3]);
  });

  it('when filter value is Completed todos should have expected value', () => {
    useAppSelectorMock.mockImplementation((fn) => {
      const state: RootState = initState(todos, filterTypes.Completed);

      return fn(state);
    });

    const { result } = renderHook(useTodoStateService);

    let filteredTodos = result.current.todos;

    expect(filteredTodos).toEqual([todoNote1]);
  });
});
