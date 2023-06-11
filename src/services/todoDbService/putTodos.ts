import { TodoNote } from 'types';
import { TODOS } from './constants';
import { delayEmulator } from './delayEmulator';
import { getTodos } from './getTodos';

export const putTodos = async (todos: TodoNote[]) => {
  await delayEmulator.sleep(1500);
  throw new Error(
    `Don't worry, this is not a real exception, just a demonstration.`
  );

  localStorage.setItem(TODOS, JSON.stringify(todos));

  const updatedTodos = await getTodos();

  return updatedTodos;
};
