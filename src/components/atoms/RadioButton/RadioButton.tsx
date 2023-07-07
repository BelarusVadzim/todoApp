import React, { ChangeEvent } from 'react';
import { PropsWithChildren } from 'react';
import style from './RadioButton.module.scss';
import { PropsWithClassName } from 'types';

export type RadioButtonProps = PropsWithChildren &
  PropsWithClassName & {
    groupName: string;
    selectedValue?: string;
    onChange?: (value: string) => void;
    value: string;
  };

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  groupName,
  selectedValue,
  onChange,
  value,
  className = '',
}) => {
  const combinedClassName = `${style.radioButton} ${className}`;
  const inputOnChange = (val: ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(val.target.value);

  return (
    <label className={combinedClassName}>
      <input
        type="radio"
        name={groupName}
        value={value}
        checked={value === selectedValue}
        onChange={inputOnChange}
      />
      <span>{children}</span>
    </label>
  );
};

export default RadioButton;
