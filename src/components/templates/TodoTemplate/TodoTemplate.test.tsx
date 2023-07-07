import { render } from '@testing-library/react';
import TodoTemplate from './TodoTemplate';

jest.mock('components/organisms', () => ({
  TodoList: jest.fn(() => <div>TodoList</div>),
}));

describe('<TodoTemplate />', () => {
  it('should render properly', () => {
    const component = render(<TodoTemplate />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
