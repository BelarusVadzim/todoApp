import React from 'react';
import { Label } from 'components/atoms';
import style from './TodoListFooter.module.scss';

const TodoListFooter: React.FC = () => (
  <Label className={style.todoListFooter}>Drag and drop to reorder list</Label>
);
export default TodoListFooter;
