import { render } from '@testing-library/react';
import { TodoNote } from 'types';
import SortableSection from './SortableSection';

const todo1 = { text: 'todo1' };
const todo2 = { text: 'todo2' };
const todos: TodoNote[] = [todo1, todo2];

jest.mock('hooks', () => ({
  useTodoStateService: () => ({
    todos,
  }),
}));

jest.mock('../SortableTodoItem', () => ({
  SortableTodoItem: jest.fn(({ note }: { key: string; note: TodoNote }) => {
    return <div>{note.text}</div>;
  }),
}));

describe('<SortableSection />', () => {
  it('should render properly', () => {
    const component = render(<SortableSection />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
