import { render } from '@testing-library/react';
import Spinner from './Spinner';

afterEach(() => {
  jest.clearAllMocks();
});

describe('<Spinner />', () => {
  it('should render properly', () => {
    const component = render(<Spinner visible={true} />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when visible is false should render properly ', () => {
    const component = render(<Spinner />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
