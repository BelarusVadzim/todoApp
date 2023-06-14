import { render, screen } from '@testing-library/react';
import { TodoItem } from './TodoItem';
import userEvent from '@testing-library/user-event';

const dispatchTodoItemEdited = jest.fn();
const dispatchTodoItemDeleted = jest.fn();

const textPLaceTestId = 'textPLace';
const checkboxTestId = 'checkbox';
const deleteButtonTestId = 'delete-button';

jest.mock('hooks', () => ({
  useTodoStateService: () => ({
    dispatchTodoItemEdited,
    dispatchTodoItemDeleted,
  }),
}));

jest.mock('components/atoms', () => ({
  Button: jest.fn(({ value, className, onClick }) => {
    return (
      <div
        data-testid={deleteButtonTestId}
        className={className}
        onClick={onClick}
      >
        {value}
      </div>
    );
  }),
  Checkbox: jest.fn(({ checked, className, onToggle }) => {
    return (
      <div
        data-testid={checkboxTestId}
        className={className}
        onClick={onToggle}
      >
        {checked}
      </div>
    );
  }),
  TextPlace: jest.fn(({ draggable, lineThrough, className }) => {
    return (
      <div data-testid={textPLaceTestId} className={className}>
        <div>draggable: {draggable}</div>
        <div>lineThrough: {lineThrough}</div>
      </div>
    );
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<TodoItem />', () => {
  it('should render properly', () => {
    const component = render(<TodoItem note={{ text: 'todoItemText' }} />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when todo done should render properly', () => {
    const component = render(
      <TodoItem note={{ text: 'todoItemText', done: true }} />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when delete button click should call expected functions with expected values', () => {
    const todoNoteId = 1;
    render(
      <TodoItem note={{ text: 'todoItemText', done: true, id: todoNoteId }} />
    );

    const inputElement = screen.getByTestId(deleteButtonTestId);

    userEvent.click(inputElement);

    expect(dispatchTodoItemDeleted).toBeCalledTimes(1);
    expect(dispatchTodoItemDeleted).toBeCalledWith(todoNoteId);
  });

  it('when checkbox toggle should call expected functions with expected values', () => {
    const todoNote = { text: 'todoItemText', done: true };
    render(<TodoItem note={todoNote} />);

    const inputElement = screen.getByTestId(checkboxTestId);

    userEvent.click(inputElement);

    expect(dispatchTodoItemEdited).toBeCalledTimes(1);
    expect(dispatchTodoItemEdited).toBeCalledWith({
      ...todoNote,
      done: !todoNote.done,
    });
  });
});
