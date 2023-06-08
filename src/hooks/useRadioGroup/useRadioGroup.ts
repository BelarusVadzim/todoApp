import { RadioButtonProps } from 'components/atoms/RadioButton/RadioButton';
import { useAppStateService } from 'hooks';
import { useEffect } from 'react';

const useRadioGroup = (groupName: string) => {
  const { dispatchFilterChanged, todoFilter, isAppInitialized } =
    useAppStateService();

  const onChange = (value: string) => {
    dispatchFilterChanged(value);
  };

  let newId = 0;
  let filter = '';

  useEffect(() => {
    if (!isAppInitialized) dispatchFilterChanged(filter);
  }, [dispatchFilterChanged, isAppInitialized, filter]);

  const createNewRadioButton = (
    value: string,
    selected?: boolean
  ): RadioButtonProps => {
    const id = newId.toString();
    newId++;

    if (selected) filter = value;

    return {
      onChange,
      id,
      groupName,
      value,
      selectedValue: todoFilter,
    };
  };

  return [createNewRadioButton] as const;
};

export default useRadioGroup;
