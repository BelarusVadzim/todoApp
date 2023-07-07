import React, { MouseEventHandler } from 'react';
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

  /*
  This approach allows the component to be highlighted when navigating with the keyboard, but not when using the mouse.
  Using the onChange event did not help with removing the highlight on mouse click. 
  */
  const click: MouseEventHandler = (event) => {
    event.preventDefault();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <label className={`material-icons ${combinedClassName}`} onClick={click}>
      {materialIconName}
      <input type="checkbox" className={style.input} defaultChecked={checked} />
    </label>
  );
};

export default Checkbox;
