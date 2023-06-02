import React from 'react';
import { Button, Checkbox, Label } from 'components/atoms';
import style from './TodoItem.module.scss';
import { TodoNote } from 'types';
import { useTodoStateService } from 'hooks';

export type TodoItemProps = {
  note: TodoNote;
};

const TodoItem: React.FC<TodoItemProps> = ({ note }) => {
  const { dispatchTodoItemEdited, dispatchTodoItemDeleted } =
    useTodoStateService();

  const labelClass = note.done ? style.labelLineThrough : style.label;
  const deleteButtonClick = () => {
    if (note.id) dispatchTodoItemDeleted(note.id);
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
      <Label draggable lineThrough={note.done} className={labelClass}>
        {note.text}
      </Label>
      <Button
        glyph
        className={style.closeButton}
        value={'close'}
        onClick={deleteButtonClick}
      />
    </div>
  );
};

export default TodoItem;
