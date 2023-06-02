import { render } from '@testing-library/react';
import TodoTemplate from './TodoTemplate';

jest.mock('./TodoTemplate.module.scss', () => ({
  background: 'backgroundStyle',
  backgroudImage: 'backgroudImageStyle',
  page: 'pageStyle',
  main: 'mainStyle',
}));

jest.mock('components/organisms', () => ({
  TodoList: jest.fn(() => (<div>TodoList</div>)),
}));

describe('<TodoTemplate />', () => {
  it('should render properly', () => {
    const component = render(<TodoTemplate />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
