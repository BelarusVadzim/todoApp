import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ApplicationState = {
  filter?: string;
};

function getInitialState(): ApplicationState {
  return {
    filter: 'All',
  };
}

const initialState = getInitialState();

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<string | undefined>
    ): ApplicationState => ({
      ...state,
      filter: action.payload,
    }),
  },
});

export const { setFilter } = applicationSlice.actions;
export default applicationSlice.reducer;
