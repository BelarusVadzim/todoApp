import { RadioButtonProps } from 'components/atoms/RadioButton/RadioButton';
import { useTodoStateService } from 'hooks';

const useRadioGroup = (groupName: string) => {
  const { dispatchFilterChanged, todoFilter } = useTodoStateService();

  const onChange = (value: string) => {
    dispatchFilterChanged(value);
  };

  const createNewRadioButton = (value: string): RadioButtonProps => {
    return {
      onChange,
      groupName,
      value,
      selectedValue: todoFilter,
    };
  };

  return [createNewRadioButton] as const;
};

export default useRadioGroup;
