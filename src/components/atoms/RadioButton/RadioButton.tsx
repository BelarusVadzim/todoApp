import React, { ChangeEvent } from 'react';
import { PropsWithChildren } from 'react';
import style from './RadioButton.module.scss';
import { PropsWithClassName } from 'types';

export type RadioButtonProps = PropsWithChildren &
  PropsWithClassName & {
    groupName: string;
    selectedValue?: string;
    onChange?: (value: string) => void;
    id?: string;
    value: string;
  };

const RadioButton: React.FC<RadioButtonProps> = ({
  children,
  groupName,
  selectedValue,
  onChange,
  id,
  value,
  className = '',
}) => {
  const combinedClassName = `${style.radioButton} ${className}`;
  const inputOnChange = (val: ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(val.target.value);

  return (
    <label className={combinedClassName} htmlFor={id}>
      <input
        id={id}
        type="radio"
        name={groupName}
        value={value as string}
        checked={value === selectedValue}
        onChange={inputOnChange}
      />
      <span>{children}</span>
    </label>
  );
};

export default RadioButton;
