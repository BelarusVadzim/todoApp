import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoDbService } from 'services';
import { TodoNote } from 'types';

export const todosUpdated = createAsyncThunk(
  'todos/setAllTodos',
  (todoList: TodoNote[]) => todoDbService.putTodos(todoList)
);
