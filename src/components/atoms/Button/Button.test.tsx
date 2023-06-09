import { render } from '@testing-library/react';
import Button from './Button';

//jest.mock('./Button.module.scss', () => ({ button: 'buttonStyle' }));

describe('<Button />', () => {
  it('should render properly', () => {
    const component = render(<Button value="buttonValue" />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when glyph className specified should render properly', () => {
    const component = render(
      <Button glyph={true} value="buttonValue" className="className" />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
