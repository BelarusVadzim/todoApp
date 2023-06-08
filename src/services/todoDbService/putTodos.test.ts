import { putTodos } from './putTodos';

const todos = [
  { id: 1, text: 'todoNote3', done: false },
  { id: 2, text: 'todoNote2', done: false },
  { id: 3, text: 'todoNote3', done: false },
  { id: 4, text: 'todoNote3', done: false },
];

const data = JSON.stringify(todos);

jest.mock('./getTodos', () => {
  return {
    getTodos: jest.fn(() => Promise.resolve(todos)),
  };
});

jest.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = jest.fn(() => data);

describe('putTodos', () => {
  it('should return expected value', async () => {
    const result = await putTodos(todos);

    expect(result).toEqual(todos);
  });
});
