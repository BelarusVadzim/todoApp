import { getTodos } from './getTodos';

const todos = [
  { id: 1, text: 'todoNote3', done: false },
  { id: 2, text: 'todoNote2', done: false },
  { id: 3, text: 'todoNote3', done: false },
  { id: 4, text: 'todoNote3', done: false },
];

const data = JSON.stringify(todos);
// let getItemMock: jest.mock;

// jest.spyOn(Storage.prototype, 'getItem');


describe('getTodos', () => {
  it('should return expected value', async () => {
    Storage.prototype.getItem = jest.fn(() => data);
    const result = await getTodos();

    expect(result).toEqual(todos);
  });

  it('when storage is empty should return empty array', async () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const result = await getTodos();

    expect(result).toEqual([]);
  });
});
