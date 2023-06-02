import { render } from '@testing-library/react';
import Title from './Title';

jest.mock('./Title.module.scss', () => ({ title: 'titleStyle' }));

describe('<Title />', () => {
  it('should render properly', () => {
    const component = render(<Title>Title text</Title>);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
