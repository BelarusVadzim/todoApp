import { ChangeEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteEditor from './NoteEditor';

const dispatchTodoItemCreated = jest.fn();
const dispatchTodoItemEdited = jest.fn();

jest.mock('./NoteEditor.module.scss', () => ({
  noteEditor: 'noteEditorStyle',
  leftField: 'leftFieldStyle',
  rightField: 'rightFieldStyle',
}));

jest.mock('hooks', () => ({
  useTodoStateService: () => ({
    dispatchTodoItemCreated,
    dispatchTodoItemEdited,
  }),
}));

type MockTextboxProps = {
  onReturn?: (text: string) => void;
  test?: string;
};

jest.mock('components/atoms', () => ({
  Textbox: jest.fn(({ onReturn, test }: MockTextboxProps) => {
    const onChangeHandler = (arg: ChangeEvent<HTMLInputElement>) => {
      if (onReturn) {
        onReturn(arg.target.value);
      }
    };

    return <input type="text" onChange={onChangeHandler} id={test} />;
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<NoteEditor />', () => {
  it('should render properly', () => {
    const component = render(<NoteEditor />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when className specified should render properly', () => {
    const component = render(<NoteEditor className="extraClass" />);

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('when edit exited note finished should call expected functions with expected values', () => {
    render(<NoteEditor note={{ text: '' }} />);

    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, '1{Enter}');

    expect(dispatchTodoItemCreated).toBeCalledTimes(0);
    expect(dispatchTodoItemEdited).toBeCalledTimes(1);
  });

  it('when edit new note finished should call expected functions with expected values', () => {
    render(<NoteEditor />);

    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, '1{Enter}');

    expect(dispatchTodoItemCreated).toBeCalledTimes(1);
    expect(dispatchTodoItemEdited).toBeCalledTimes(0);
  });
});
