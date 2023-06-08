import { render } from '@testing-library/react';
import Checkbox from './Checkbox';

jest.mock('./Checkbox.module.scss', () => ({
  checkboxChecked: 'checkboxCheckedStyle',
  checkboxUnchecked: 'checkboxUncheckedStyle',
}));

describe('<Checkbox />', () => {
  it('should render properly', () => {
    const component = render(<Checkbox />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when checked and classname specified should render properly ', () => {
    const component = render(<Checkbox checked className="extClassName" />);

    expect(component.asFragment()).toMatchSnapshot();
  });
});
