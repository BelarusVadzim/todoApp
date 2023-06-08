import Label from './Label';
import { render } from '@testing-library/react';

jest.mock('./Label.module.scss', () => ({
  labelLineThrough: 'labelLineThroughstyle',
  label: 'labelStyle',
}));

describe('<Label />', () => {
  it('should render properly', () => {
    const component = render(<Label>LabelChild</Label>);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when draggable lineThrough className specified should render properly', () => {
    const component = render(
      <Label draggable lineThrough className="testClass">
        LabelChild
      </Label>
    );

    expect(component.asFragment()).toMatchSnapshot();
  });
});
