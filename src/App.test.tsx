import { render } from '@testing-library/react';
import App from 'App';

const dispatchReadyInitializeTodoState = jest.fn();
const dispatchAppInitialized = jest.fn();
let isAppInitialized: boolean;

jest.mock('hooks', () => ({
  useTodoStateService: () => ({
    dispatchReadyInitializeTodoState,
  }),
  useAppStateService: () => ({
    isAppInitialized,
    dispatchAppInitialized,
  }),
}));

jest.mock('components/pages', () => 
  jest.fn(() => (<div>TodoPage</div>)),
);

describe('<App />', () => {
  it('should render properly', () => {
    const component = render(<App />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});