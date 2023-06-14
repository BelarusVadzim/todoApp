import React from 'react';
import { PropsWithChildren } from 'react';
import style from './TextPlace.module.scss';
import { PropsWithClassName } from 'types';

type TextPlaceProps = PropsWithChildren &
  PropsWithClassName & {
    lineThrough?: boolean;
    draggable?: boolean;
  };

const TextPlace: React.FC<TextPlaceProps> = ({
  children,
  lineThrough,
  className = '',
  draggable,
}) => {
  let combinedClassName = lineThrough
    ? style.textPlaceLineThrough
    : style.textPlace;
  combinedClassName = className
    ? `${combinedClassName} ${className}`
    : combinedClassName;

  return (
    <div
      {...(draggable ? { 'data-draggable': 'true' } : {})}
      className={combinedClassName}
    >
      {children}
    </div>
  );
};

export default TextPlace;
