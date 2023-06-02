import React from 'react';
import { Title } from 'components/atoms/Title';
import { PropsWithChildren } from 'react';
import style from './TodoTitle.module.scss';
import { PropsWithClassName } from 'types';

type TodoTitleProps = PropsWithChildren & PropsWithClassName;

const TodoTitle: React.FC<TodoTitleProps> = ({ children, className }) => {
  const combinedClasses = className
    ? `${style.todoTitle} ${className}`
    : style.todoTitle;

  return (
    <div className={combinedClasses}>
      <Title>{children}</Title>
    </div>
  );
};

export default TodoTitle;
