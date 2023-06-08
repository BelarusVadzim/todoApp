import React from 'react';
import style from './Checkbox.module.scss';
import { PropsWithClassName } from 'types';

type CheckboxProps = PropsWithClassName & {
  checked?: boolean;
  onToggle?: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onToggle,
  className,
}) => {
  const materialIconName = checked ? 'check_circle' : 'radio_button_unchecked';
  let combinedClassName = checked
    ? style.checkboxChecked
    : style.checkboxUnchecked;
  combinedClassName = className
    ? `${combinedClassName} ${className}`
    : combinedClassName;

  return (
    <div className={`material-icons ${combinedClassName}`} onClick={onToggle}>
      {materialIconName}
    </div>
  );
};

export default Checkbox;
