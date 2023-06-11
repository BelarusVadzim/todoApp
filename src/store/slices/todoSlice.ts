import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { readyInitializeTodoState, todosUpdated } from 'store/thunks';
import { TodoState } from 'store/types/TodoState';
import { TodoNote } from 'types';

function getInitialState(): TodoState {
  return {
    todos: [],
    filter: 'All',
  };
}

const initialState = getInitialState();
let previousState: TodoNote[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<string | undefined>
    ): TodoState => ({
      ...state,
      filter: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(readyInitializeTodoState.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      // This case is added to instantly display changes on the UI
      .addCase(todosUpdated.pending, (state, action) => {
        previousState = current(state).todos;

        return { ...state, todos: action.meta.arg, pending: true };
      })
      // In case of a successful update of the data in databse, the UI will remain unchanged,
      .addCase(todosUpdated.fulfilled, (state, action) => {
        previousState = [];

        return {
          ...state,
          todos: action.payload,
          pending: false,
        };
      })
      // In case of failure, the list will return to the previous state.
      .addCase(todosUpdated.rejected, (state, action) => {
        console.log('rejected');
        console.error(action.error.message);

        const restoredState = {
          ...state,
          todos: previousState,
          pending: false,
        };

        previousState = [];

        return restoredState;
      });
  },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
