import { RadioButtonProps } from 'components/atoms/RadioButton/RadioButton';
import { useAppStateService } from 'hooks';

const useRadioGroup = (groupName: string) => {
  const { dispatchFilterChanged, todoFilter } = useAppStateService();

  const onChange = (value: string) => {
    console.log('filterChanged');
    dispatchFilterChanged(value);
  };

  let newId = 0;

  const createNewRadioButton = (value: string): RadioButtonProps => {
    const id = newId.toString();
    newId++;

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
