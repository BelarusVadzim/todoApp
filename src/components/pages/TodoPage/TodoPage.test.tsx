import { render } from '@testing-library/react';
import TodoPage from './TodoPage';

jest.mock('components/templates', () => ({
  TodoTemplate: jest.fn(() => <div>TodoTemplate</div>),
}));

describe('<TodoPage />', () => {
  it('should render properly', () => {
    const component = render(<TodoPage />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
