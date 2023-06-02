import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoDbService } from 'services';
import { TodoNote } from 'types';

export const todosUpdated = createAsyncThunk(
  'todos/setAllTodos',
  async (todoList: TodoNote[]) => {
    return todoDbService.putTodos(todoList);
  },
);