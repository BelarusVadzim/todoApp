import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textbox from './Textbox';

const textValue = 'textValue';
jest.mock('./Textbox.module.scss', () => ({ textbox: 'textboxStyle' }));
let mockSetText: jest.Mock;
jest.mock('react', () => {
  mockSetText = jest.fn();
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useState: jest.fn().mockReturnValue([textValue, mockSetText]),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('<Textbox />', () => {
  it('should render properly', () => {
    const component = render(<Textbox />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when text typed witn out Enter key should call expected functions with expected values', () => {
    const onReturnHandler = jest.fn();
    const typedText = 'typedText';
    render(<Textbox onReturn={onReturnHandler} />);

    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, typedText);

    expect(onReturnHandler).toBeCalledTimes(0);
    expect(mockSetText).toBeCalledTimes(typedText.length);
  });

  it('when Enter key entered should call expected functions with expected values', () => {
    const onReturnHandler = jest.fn();
    const typedText = 'typedText';

    render(<Textbox onReturn={onReturnHandler} />);

    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, `${typedText}{Enter}`);

    expect(onReturnHandler).toBeCalledTimes(1);
    expect(onReturnHandler).toBeCalledWith(typedText);
    expect(mockSetText).toBeCalledTimes(typedText.length + 1);
    expect(mockSetText).toBeCalledWith('');
  });
});
