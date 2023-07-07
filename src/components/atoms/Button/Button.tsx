import React from 'react';
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
  let combinedClasses = `${glyph ? 'material-icons' : ''} ${style.button}`;

  combinedClasses = className
    ? `${combinedClasses} ${className}`
    : combinedClasses;

  return (
    <button onClick={onClick} className={combinedClasses} value={value}>
      {value}
    </button>
  );
};

export default Button;
