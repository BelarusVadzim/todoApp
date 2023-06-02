import { createSlice } from '@reduxjs/toolkit';
import {
  readyInitializeTodoState,
  todosUpdated,
} from 'store/thunks';
import { TodoNote } from 'types';

type TodoState = {
  todos: TodoNote[];
};

function getInitialState(): TodoState {
  return {
    todos: [],
  };
}

const initialState = getInitialState();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readyInitializeTodoState.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(todosUpdated.pending, (state, action) => {
        state.todos = action.meta.arg;
      })
      .addCase(todosUpdated.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export default todoSlice.reducer;
