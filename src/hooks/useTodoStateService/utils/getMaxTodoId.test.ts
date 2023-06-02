import getMaxTodoId from './getMaxTodoId';

const todos = [
  { id: 5, text: 'todoNote1', done: true },
  { id: 2, text: 'todoNote2', done: false },
  { id: 3, text: 'todoNote3', done: false },
  { id: 4, text: 'todoNote3', done: false },
  { text: 'todoNote3', done: false },
  { id: 1, text: 'todoNote3', done: false },
];

describe('getMaxTodoId', () => {
  it('should return expected value', () => {
    const result = getMaxTodoId(todos);

    expect(result).toEqual(5);
  });
});
