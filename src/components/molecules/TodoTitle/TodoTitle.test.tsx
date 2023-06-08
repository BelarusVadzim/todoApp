import { render } from '@testing-library/react';
import TodoTitle from './TodoTitle';

jest.mock('./TodoListFooter.module.scss', () => ({
  todoListFooter: 'todoListFooterStyle',
}));

jest.mock('components/atoms', () => ({
  Title: jest.fn(({ children }) => {
    return <div>{children}</div>;
  }),
}));

describe('<TodoTitle />', () => {
  it('should render properly', () => {
    const component = render(<TodoTitle />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when className specified should render properly', () => {
    const component = render(<TodoTitle className="testClassName" />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
