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
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<TodoList />', () => {
  it('should render properly', () => {
    const component = render(<TodoList />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
