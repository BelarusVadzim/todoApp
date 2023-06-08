import { render } from '@testing-library/react';
import TodoItemsListFilterSection from './TodoItemsListFilterSection';

let createNewRadioButton = jest.fn();

jest.mock('./TodoItemsListFilterSection.module.scss', () => ({
  radioButton: 'radioButtonStyle',
}));

jest.mock('hooks', () => ({
  useRadioGroup: () => [createNewRadioButton],
}));

jest.mock('components/atoms', () => ({
  RadioButton: jest.fn(({ className, children }) => {
    return <div className={className}>{children}</div>;
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<TodoItemsListFilterSection />', () => {
  it('should render properly', () => {
    const component = render(
      <TodoItemsListFilterSection className="mockClassName" />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when className not specified should render properly', () => {
    const component = render(<TodoItemsListFilterSection />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
