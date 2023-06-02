import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ApplicationState = {
  appInitialized: boolean;
  filter?: string;
};

function getInitialState(): ApplicationState {
  return {
    appInitialized: false,
    filter: 'All',
  };
}

const initialState = getInitialState();

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string | undefined>): ApplicationState => 
      ({ ...state, filter: action.payload }),
    setAppInitialized: (state): ApplicationState => ({ ...state, appInitialized: true }),
  },
});

export const { setFilter, setAppInitialized } = applicationSlice.actions;
export default applicationSlice.reducer;
