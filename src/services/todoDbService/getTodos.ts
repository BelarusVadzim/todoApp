import { TodoNote } from 'types';
import { TODOS } from './constants';
import { delayEmulator } from './delayEmulator';

export const getTodos = async (): Promise<TodoNote[]> => {
  const data = localStorage.getItem(TODOS);
  await delayEmulator.sleep(100);
    
  return data ? JSON.parse(data) : [];
};