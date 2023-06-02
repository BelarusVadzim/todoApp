import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoDbService } from 'services';

export const readyInitializeTodoState = createAsyncThunk(
  'todos/getTodos',
  async () => {
    console.log('getTodos thunk');

    return todoDbService.getTodos();
  },
);