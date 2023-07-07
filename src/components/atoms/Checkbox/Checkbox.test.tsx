import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';
import userEvent from '@testing-library/user-event';

const onToggleHandlerMock = jest.fn();

describe('<Checkbox />', () => {
  it('should render properly', () => {
    const component = render(<Checkbox />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when checked and classname specified should render properly ', () => {
    const component = render(<Checkbox checked className="extClassName" />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when onChanged fired should call expected functions', () => {
    render(
      <Checkbox
        checked
        className="extClassName"
        onToggle={onToggleHandlerMock}
      />
    );

    const checkbox = screen.getByText('check_circle');

    userEvent.click(checkbox);

    expect(onToggleHandlerMock).toBeCalledTimes(1);

    userEvent.keyboard('{space}');

    expect(onToggleHandlerMock).toBeCalledTimes(2);

    userEvent.keyboard('{enter}');

    expect(onToggleHandlerMock).toBeCalledTimes(2);
  });
});
