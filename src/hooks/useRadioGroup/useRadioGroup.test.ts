import { renderHook } from '@testing-library/react';
import useRadioGroup from './useRadioGroup';

const groupName = 'groupName';
const dispatchFilterChanged = jest.fn();
let todoFilter: string = 'All';
let useTodoStateServiceMock: jest.Mock;

jest.mock('hooks', () => {
  useTodoStateServiceMock = jest.fn();

  return {
    useTodoStateService: useTodoStateServiceMock,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('useRadioGroup', () => {
  it('should returnexpected value', async () => {
    const hookResult = {
      isAppInitialized: false,
      dispatchFilterChanged,
      todoFilter,
    };

    useTodoStateServiceMock.mockReturnValueOnce(hookResult);

    const { result } = renderHook(() => useRadioGroup(groupName));
    const [createNewRadioButton] = result.current;
    const onChange = (value: string) => {
      dispatchFilterChanged(value);
    };

    const radiobuttonValue = 'value';

    const newRadioButtonProps = createNewRadioButton(radiobuttonValue);
    const expected = {
      onChange,
      groupName,
      value: radiobuttonValue,
      selectedValue: todoFilter,
    };

    expect(JSON.stringify(newRadioButtonProps)).toEqual(
      JSON.stringify(expected)
    );
  });

  it('when call onChange should call expected functions with expected values', async () => {
    const hookResult = {
      isAppInitialized: true,
      dispatchFilterChanged,
      todoFilter,
    };

    useTodoStateServiceMock.mockReturnValueOnce(hookResult);

    const { result } = renderHook(() => useRadioGroup(groupName));
    const [createNewRadioButton] = result.current;
    const filter = 'filter';

    const radiobuttonValue = 'value';

    const { onChange } = createNewRadioButton(radiobuttonValue);

    expect(onChange).toBeTruthy();

    onChange!(filter);

    expect(dispatchFilterChanged).toBeCalledTimes(1);
    expect(dispatchFilterChanged).toBeCalledWith(filter);
  });
});
