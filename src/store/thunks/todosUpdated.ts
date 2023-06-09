import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoDbService } from 'services';
import { TodoNote } from 'types';

export const todosUpdated = createAsyncThunk(
  'todos/setAllTodos',
  async (todoList: TodoNote[]) => {
    console.log('todosUpdated thunk');
    return todoDbService.putTodos(todoList);
  }
);
