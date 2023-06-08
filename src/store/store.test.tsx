import { setAppInitialized, setFilter } from './slices/applicationSlice';
import store from './store';
import { readyInitializeTodoState, todosUpdated } from './thunks';
import { TodoNote } from 'types';

let putTodosMock: jest.Mock;
let getTodosMock: jest.Mock;

jest.mock('services', () => {
  putTodosMock = jest.fn();
  getTodosMock = jest.fn();

  return {
    todoDbService: {
      putTodos: putTodosMock,
      getTodos: getTodosMock,
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('store', () => {
  it('should initially set states to default values', () => {
    const applicationState = store.getState().application;
    const todoState = store.getState().todo;

    expect(applicationState.appInitialized).toEqual(false);
    expect(applicationState.filter).toEqual('All');

    expect(todoState.todos).toEqual([]);
  });

  it('Should be able to get todos list', async () => {
    const todonotes = [{ text: 'todoNote1' }];

    getTodosMock.mockReturnValueOnce(Promise.resolve(todonotes));

    const readyInitializeTodoStateResult = await store.dispatch(
      readyInitializeTodoState()
    );

    const todos = readyInitializeTodoStateResult.payload as TodoNote[];

    expect(readyInitializeTodoStateResult.type).toBe(
      'todos/getTodos/fulfilled'
    );
    expect(todos).toEqual(todonotes);

    const state = store.getState().todo;
    expect(state).toEqual({ todos });
  });

  it('Should be able to update todos list', async () => {
    const todonotes: TodoNote[] = [
      { text: 'todoNote1' },
      { text: 'todoNote2' },
    ];

    putTodosMock.mockImplementationOnce((value) => value);

    const todosUpdatedResult = await store.dispatch(todosUpdated(todonotes));

    const todos = todosUpdatedResult.payload as TodoNote[];

    expect(todosUpdatedResult.type).toBe('todos/setAllTodos/fulfilled');
    expect(todos).toEqual(todonotes);

    const state = store.getState().todo;
    expect(state).toEqual({ todos });
  });

  it('Should be able to update filter', async () => {
    const filterNewValue = 'newValue';
    const setFilterResult = store.dispatch(setFilter(filterNewValue));

    const filter = setFilterResult.payload;

    expect(setFilterResult.type).toBe('application/setFilter');
    expect(filter).toEqual(filterNewValue);

    const state = store.getState().application;
    expect(state.filter).toEqual(filter);
  });

  it('Should be able to set appInitialized flag', async () => {
    const setAppInitializedResult = store.dispatch(setAppInitialized());

    expect(setAppInitializedResult.type).toBe('application/setAppInitialized');

    const state = store.getState().application;
    expect(state.appInitialized).toBeTruthy();
  });
});
