import { fireEvent, render, screen } from '@testing-library/react';
import ScrolableSection from './ScrolableSection';
import { TodoNote } from 'types';

const dispatchTodoListChanged = jest.fn();
let shouldCancelStartValue: boolean;
const todo1 = { text: 'todo1' };
const todo2 = { text: 'todo2' };
const todos: TodoNote[] = [ todo1, todo2];
const sortedTodos: TodoNote[] = [ todo2, todo1 ];
const todoFilter = 'todoFilter';

jest.mock('./ScrolableSection.module.scss', () => ({
  scrolableSection: 'scrolableSectionStyle',
}));

jest.mock('hooks', () => ({
  useTodoStateService: () => ({
    dispatchTodoListChanged,
    todos,
  }),
  useAppStateService: () => ({ todoFilter }),
}));

jest.mock('array-move', () => ({
  arrayMoveImmutable: jest.fn(() => sortedTodos),
}));

jest.mock('../SortableSection', () => ({
  SortableSection: jest.fn(({ onSortEnd, shouldCancelStart }) =>  {
    const onClickHandler = () => {
      shouldCancelStartValue = shouldCancelStart({ 
        target: { 
          getAttribute: () => true,
        }, 
      });
    };
    
    return (<div data-testid="sortable-section" onDrop={onSortEnd} onClick={onClickHandler} />);
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<ScrolableSection />', () => {
  it('should render properly', () => {
    const component = render(<ScrolableSection />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when slected element is draggable shouldCancelStart should be falsy', () => {
    render(<ScrolableSection />);

    const inputElement = screen.getByTestId('sortable-section');

    fireEvent.click(inputElement);

    expect(shouldCancelStartValue).toBeFalsy();
  });

  it('when sorting finished should call expected functions with expected values', () => {
    render(<ScrolableSection />);

    const inputElement = screen.getByTestId('sortable-section');

    fireEvent.drop(inputElement);

    expect(dispatchTodoListChanged).toBeCalledTimes(1);
    expect(dispatchTodoListChanged).toBeCalledWith(sortedTodos);
  });
});
