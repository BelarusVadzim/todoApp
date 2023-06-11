import { render } from '@testing-library/react';
import TodoList from './TodoList';

jest.mock('components/molecules', () => ({
  ScrolableSection: jest.fn(() => <div>ScrolableSection</div>),
  TodoListFooter: jest.fn(() => <div>TodoListFooter</div>),
  TodoItemsListMenu: jest.fn(() => <div>TodoItemsListMenu</div>),
  NoteEditor: jest.fn(({ className }) => {
    return <div className={className} />;
  }),
  TodoTitle: jest.fn(({ className, children }) => {
    return <div className={className}>{children}</div>;
  }),
  Spinner: jest.fn(() => <div>Spinner</div>),
}));

let useTodoStateServiceMock: jest.Mock;

jest.mock('hooks', () => {
  useTodoStateServiceMock = jest.fn();

  return {
    useTodoStateService: useTodoStateServiceMock,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('<TodoList />', () => {
  it('should render properly', () => {
    const hookResult = {
      pending: true,
    };
    useTodoStateServiceMock.mockReturnValueOnce(hookResult);
    const component = render(<TodoList />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
