import React from 'react';
import { Button, TextPlace } from 'components/atoms';
import style from './TodoItemsListMenu.module.scss';
import { TodoItemsListFilterSection } from '../TodoItemsListFilterSection';
import { useTodoStateService } from 'hooks';

const TodoItemsListMenu: React.FC = () => {
  const { todos, dispatchCompletedTodosDeleted } = useTodoStateService();
  const buttonClearClick = () => dispatchCompletedTodosDeleted();

  return (
    <div className={style.todoItemsListMenu}>
      <TextPlace className={style.label}>{todos.length} items left</TextPlace>
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

export default TodoItemsListMenu;
