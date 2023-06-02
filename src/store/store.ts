import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: { ...rootReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

export default store;