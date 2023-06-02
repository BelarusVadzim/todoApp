import { renderHook } from '@testing-library/react';
import useRadioGroup from './useRadioGroup';

const groupName = 'groupName';
const dispatchFilterChanged = jest.fn();
let todoFilter: string = 'All';
let useAppStateServiceMock: jest.Mock;

jest.mock('hooks', () => {
  useAppStateServiceMock = jest.fn();

  return ({
    useAppStateService: useAppStateServiceMock,
  });
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

    useAppStateServiceMock.mockReturnValueOnce(hookResult);

    const { result } = renderHook(() => useRadioGroup(groupName));
    const [createNewRadioButton] = result.current;
    const onChange = (value: string) => {
      dispatchFilterChanged(value);
    };

    const isRadiobuttonSelected = true;
    const radiobuttonValue = 'value';

    const newRadioButtonProps = createNewRadioButton(
      radiobuttonValue,
      isRadiobuttonSelected,
    );
    const expected = {
      onChange,
      id: '0',
      groupName,
      value: radiobuttonValue,
      selectedValue: todoFilter,
    };

    expect(JSON.stringify(newRadioButtonProps)).toEqual(JSON.stringify(expected));
  });

  it('when call onChange should call expected functions with expected values', async () => {
    const hookResult = {
      isAppInitialized: true,
      dispatchFilterChanged,
      todoFilter,
    };

    useAppStateServiceMock.mockReturnValueOnce(hookResult);

    const { result } = renderHook(() => useRadioGroup(groupName));
    const [createNewRadioButton] = result.current;
    const filter = 'filter';

    const isRadiobuttonSelected = true;
    const radiobuttonValue = 'value';

    const { onChange } = createNewRadioButton(
      radiobuttonValue,
      isRadiobuttonSelected,
    );

    expect(onChange).toBeTruthy();

    onChange!(filter);

    expect(dispatchFilterChanged).toBeCalledTimes(1);
    expect(dispatchFilterChanged).toBeCalledWith(filter);
  });
});
