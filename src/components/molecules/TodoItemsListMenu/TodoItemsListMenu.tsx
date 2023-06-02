import React from 'react';
import { Button, Label } from 'components/atoms';
import style from './TodoItemsListMenu.module.scss';
import { TodoItemsListFilterSection } from '../TodoItemsListFilterSection';
import { useTodoStateService } from 'hooks';

const TodoItemsListMenu: React.FC = () => {
  const { todos, dispatchCompletedTodosDeleted } = useTodoStateService();
  const buttonClearClick = () => dispatchCompletedTodosDeleted();

  return (
    <div className={style.todoItemsListMenu}>
      <Label className={style.label}>{todos.length} items left</Label>
      <TodoItemsListFilterSection className={style.filterSection} />
      <Button
        className={style.button}
        value="Clear Completed"
        onClick={buttonClearClick}
      />
    </div>
  );
};

export default TodoItemsListMenu;
