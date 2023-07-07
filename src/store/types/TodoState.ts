import { TodoNote } from 'types';

export type TodoState = {
  todos: TodoNote[];
  filter?: string;
  pending?: boolean;
};
