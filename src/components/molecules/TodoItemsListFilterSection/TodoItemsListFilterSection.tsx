import React from 'react';
import { RadioButton } from 'components/atoms';
import style from './TodoItemsListFilterSection.module.scss';
import { useRadioGroup } from 'hooks';
import { PropsWithClassName } from 'types';
import { filterTypes } from 'constants/filterTypes';

const radioGroupName = 'radioGroup1';

const TodoItemsListFilterSection: React.FC<PropsWithClassName> = ({
  className = '',
}) => {
  const [createNewRadioButton] = useRadioGroup(radioGroupName);

  const allRadioButtonProps = createNewRadioButton(filterTypes.All, true);
  const activeRadioButtonProps = createNewRadioButton(filterTypes.Active);
  const completedRadioButtonProps = createNewRadioButton(filterTypes.Completed);

  return (
    <div className={className}>
      <RadioButton className={style.radioButton} {...allRadioButtonProps}>
        All
      </RadioButton>
      <RadioButton className={style.radioButton} {...activeRadioButtonProps}>
        Active
      </RadioButton>
      <RadioButton className={style.radioButton} {...completedRadioButtonProps}>
        Completed
      </RadioButton>
    </div>
  );
};

export default TodoItemsListFilterSection;
