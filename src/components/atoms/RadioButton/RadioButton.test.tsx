import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButton from './RadioButton';

const groupName = 'groupName';
const value = 'value33';

describe('<RadioButton />', () => {
  it('should render properly', () => {
    const component = render(
      <RadioButton className="className" groupName={groupName} value={value}>
        LabelChild
      </RadioButton>
    );
    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when onChange raised and onChange handler specified should call expected functions with expected values', () => {
    const onChangeHandler = jest.fn();
    render(
      <RadioButton
        onChange={onChangeHandler}
        groupName={groupName}
        value={value}
      >
        radioButtonText
      </RadioButton>
    );

    const inputElement = screen.getByDisplayValue(value);

    userEvent.type(inputElement, 'typedText');

    expect(onChangeHandler).toBeCalledTimes(1);
    expect(onChangeHandler).toBeCalledWith(value);
  });
});
