import { setFilter } from './slices/todoSlice';
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
    const todoState = store.getState();

    expect(todoState.filter).toEqual('All');
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

    const state = store.getState().todos;
    expect(state).toEqual(todos);
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

    const state = store.getState().todos;
    expect(state).toEqual(todos);
  });

  it('when update rejected should restore previous state', async () => {
    const todonotes: TodoNote[] = [
      { text: 'todoNote1' },
      { text: 'todoNote2' },
    ];

    putTodosMock.mockImplementationOnce((value) => value);

    await store.dispatch(todosUpdated(todonotes));

    const testExceptionMessage = 'test exception';
    const newTodonotes = [{ text: 'todoNote1' }];

    putTodosMock.mockImplementationOnce(() => {
      throw new Error(testExceptionMessage);
    });

    const todosUpdatedResult = (await store.dispatch(
      todosUpdated(newTodonotes)
    )) as {
      error: { message: string };
      type: string;
    };

    expect(todosUpdatedResult.type).toBe('todos/setAllTodos/rejected');
    expect(todosUpdatedResult.error.message).toEqual(testExceptionMessage);

    const state = store.getState().todos;
    expect(state).toEqual(todonotes);
  });

  it('Should be able to update filter', async () => {
    const filterNewValue = 'newValue';
    const setFilterResult = store.dispatch(setFilter(filterNewValue));

    const filter = setFilterResult.payload;

    expect(setFilterResult.type).toBe('todos/setFilter');
    expect(filter).toEqual(filterNewValue);

    const state = store.getState();
    expect(state.filter).toEqual(filter);
  });
});
