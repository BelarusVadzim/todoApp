import { render, screen } from '@testing-library/react';
import TodoItemsListMenu from './TodoItemsListMenu';
import { TodoNote } from 'types';
import userEvent from '@testing-library/user-event';

const dispatchCompletedTodosDeleted = jest.fn();
const clearCompletedButtonTestId = 'clear-completed-button-test-id';
const todo1 = { text: 'todo1' };
const todo2 = { text: 'todo2' };
const todos: TodoNote[] = [todo1, todo2];

jest.mock('hooks', () => ({
  useTodoStateService: () => ({ todos, dispatchCompletedTodosDeleted }),
}));

jest.mock('components/atoms', () => ({
  TextPlace: jest.fn(({ className, children }) => {
    return <div className={className}>{children}</div>;
  }),
  Button: jest.fn(({ value, className, onClick }) => {
    return (
      <div
        data-testid={clearCompletedButtonTestId}
        className={className}
        onClick={onClick}
      >
        {value}
      </div>
    );
  }),
}));

jest.mock('../TodoItemsListFilterSection', () => ({
  TodoItemsListFilterSection: jest.fn(({ className }) => {
    return <div className={className} />;
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<TodoItemsListMenu />', () => {
  it('should render properly', () => {
    const component = render(<TodoItemsListMenu />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when Clear Completed button click should call expected functions with expected values', () => {
    render(<TodoItemsListMenu />);

    const inputElement = screen.getByTestId(clearCompletedButtonTestId);

    userEvent.click(inputElement);

    expect(dispatchCompletedTodosDeleted).toBeCalledTimes(1);
  });
});
