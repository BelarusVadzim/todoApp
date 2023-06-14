import TextPlace from './TextPlace';
import { render } from '@testing-library/react';

describe('<TextPlace />', () => {
  it('should render properly', () => {
    const component = render(<TextPlace>LabelChild</TextPlace>);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when draggable lineThrough className specified should render properly', () => {
    const component = render(
      <TextPlace draggable lineThrough className="testClass">
        LabelChild
      </TextPlace>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
