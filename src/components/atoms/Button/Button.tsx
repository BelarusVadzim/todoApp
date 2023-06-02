import React, { useMemo } from 'react';
import style from './Button.module.scss';
import { PropsWithClassName } from 'types';

type ButtonProps = PropsWithClassName & {
  value: string;
  onClick?: () => void;
  glyph?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  glyph,
  className,
}) => {
  let combinedClasses = useMemo(
    () => `${glyph ? 'material-icons' : ''} ${style.button}`,
    [glyph],
  );

  //ToDo: put in separated function
  combinedClasses = className
    ? `${combinedClasses} ${className}`
    : combinedClasses;

  return (
    <div onClick={onClick} className={combinedClasses}>
      {value}
    </div>
  );
};

export default Button;
