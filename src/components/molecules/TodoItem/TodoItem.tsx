import React from 'react';
import { Button, Checkbox, TextPlace } from 'components/atoms';
import style from './TodoItem.module.scss';
import { TodoNote } from 'types';
import { useTodoStateService } from 'hooks';

export type TodoItemProps = {
  note: TodoNote;
};

export const TodoItem: React.FC<TodoItemProps> = ({ note }) => {
  const { dispatchTodoItemEdited, dispatchTodoItemDeleted } =
    useTodoStateService();

  const todoItemTextStyle = note.done
    ? style.todoItemTextDone
    : style.todoItemText;
  const deleteButtonClick = () => {
    if (note.id) {
      dispatchTodoItemDeleted(note.id);
    }
  };
  const checkBoxToggle = () =>
    dispatchTodoItemEdited({ ...note, done: !note.done });

  return (
    <div className={style.todoItem}>
      <Checkbox
        checked={note.done}
        className={style.checkbox}
        onToggle={checkBoxToggle}
      />
      <TextPlace
        draggable
        lineThrough={note.done}
        className={todoItemTextStyle}
      >
        {note.text}
      </TextPlace>
      <Button
        glyph
        className={style.closeButton}
        value={'close'}
        onClick={deleteButtonClick}
      />
    </div>
  );
};
