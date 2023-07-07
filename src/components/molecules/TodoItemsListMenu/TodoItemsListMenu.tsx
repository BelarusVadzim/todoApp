import React from 'react';
import { Button } from 'components/atoms';
import style from './TodoItemsListMenu.module.scss';
import { TodoItemsListFilterSection } from '../TodoItemsListFilterSection';
import { useTodoStateService } from 'hooks';

export const TodoItemsListMenu: React.FC = () => {
  const { todos, dispatchCompletedTodosDeleted } = useTodoStateService();
  const buttonClearClick = () => dispatchCompletedTodosDeleted();

  return (
    <div className={style.todoItemsListMenu}>
      <div className={style.itemsLeftLabel}>{todos.length} items left</div>
      <TodoItemsListFilterSection className={style.filterSection} />
      <div className={style.buttonArea}>
        <Button
          value="Clear Completed"
          onClick={buttonClearClick}
          className={style.button}
        />
      </div>
    </div>
  );
};
