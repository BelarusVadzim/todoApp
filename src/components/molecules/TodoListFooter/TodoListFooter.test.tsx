import { render } from '@testing-library/react';
import TodoListFooter from './TodoListFooter';

jest.mock('./TodoListFooter.module.scss', () => ({
  todoListFooter: 'todoListFooterStyle',
}));

jest.mock('components/atoms', () => ({
  Label: jest.fn(({ className, children }) => {
    return <div className={className}>{children}</div>;
  }),
}));

describe('<TodoListFooter />', () => {
  it('should render properly', () => {
    const component = render(<TodoListFooter />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
