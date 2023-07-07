import { TodoNote } from 'types';

const getMaxTodoId = (allTodos: TodoNote[]): number =>
  allTodos
    .map((x) => x.id ?? 0)
    .reduce((prev, current) => {
      return prev <= current ? current : prev;
    }, 0);

export default getMaxTodoId;
