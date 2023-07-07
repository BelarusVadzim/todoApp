import { render } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  it('should render properly', () => {
    const component = render(<Button value="buttonValue" />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when glyph className specified should render properly', () => {
    const component = render(
      <Button glyph={true} value="buttonValue" className="testClassName" />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
