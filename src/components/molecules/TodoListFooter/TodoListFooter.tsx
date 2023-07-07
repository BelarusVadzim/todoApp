import React from 'react';
import { TextPlace } from 'components/atoms';
import style from './TodoListFooter.module.scss';

const TodoListFooter: React.FC = () => (
  <TextPlace className={style.todoListFooter}>
    Drag and drop to reorder list
  </TextPlace>
);
export default TodoListFooter;
