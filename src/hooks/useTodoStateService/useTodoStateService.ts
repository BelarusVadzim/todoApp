/* eslint-disable @typescript-eslint/indent */
import { filterTypes } from 'constants/filterTypes';
import { useAppDispatch, useAppSelector } from 'store';
import { readyInitializeTodoState, todosUpdated } from 'store/thunks';
import { TodoNote } from 'types';
import { getMaxTodoId } from './utils';
import { setFilter } from 'store/slices/todoSlice';

const useTodoStateService = () => {
  const appDispatch = useAppDispatch();

  const allTodos = useAppSelector((state) => state.todos);

  const dispatchReadyInitializeTodoState = () => {
    appDispatch(readyInitializeTodoState());
  };

  const dispatchTodoListChanged = (todoList: TodoNote[]) => {
    appDispatch(todosUpdated(todoList));
  };

  const dispatchTodoItemCreated = (note: TodoNote) => {
    const id = getMaxTodoId(allTodos) + 1;

    const newTodo: TodoNote = { ...note, id };
    const updatedTodos = [...allTodos, newTodo];

    dispatchTodoListChanged(updatedTodos);
  };

  const dispatchTodoItemEdited = (todoItem: TodoNote) => {
    const updatedTodos = allTodos.map((x) =>
      x.id === todoItem.id ? todoItem : x
    );

    dispatchTodoListChanged(updatedTodos);
  };

  const dispatchTodoItemDeleted = (todoItemId: number) => {
    const updatedTodos = allTodos.filter((x) => x.id !== todoItemId);

    dispatchTodoListChanged(updatedTodos);
  };

  const dispatchCompletedTodosDeleted = () => {
    const updatedTodos = allTodos.filter((x) => !x.done);

    dispatchTodoListChanged(updatedTodos);
  };

  const todos = useAppSelector((state) => {
    const filter = state.filter;
    switch (filter) {
      case filterTypes.Active:
        return allTodos.filter((x) => !x.done);
      case filterTypes.Completed:
        return allTodos.filter((x) => x.done);
      default:
        return allTodos;
    }
  });

  const dispatchFilterChanged = (filter?: string) => {
    appDispatch(setFilter(filter));
  };

  const todoFilter = useAppSelector((state) => {
    return state.filter;
  });

  const pending = useAppSelector((state) => {
    return state.pending;
  });

  return {
    dispatchReadyInitializeTodoState,
    dispatchTodoListChanged,
    dispatchTodoItemCreated,
    dispatchTodoItemEdited,
    dispatchTodoItemDeleted,
    dispatchCompletedTodosDeleted,
    dispatchFilterChanged,
    todos,
    todoFilter,
    pending,
  };
};

export default useTodoStateService;
