import { createAsyncThunk } from '@reduxjs/toolkit';
import { todoDbService } from 'services';

export const readyInitializeTodoState = createAsyncThunk('todos/getTodos', () =>
  todoDbService.getTodos()
);
