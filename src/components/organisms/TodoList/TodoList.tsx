import React from 'react';
import style from './TodoList.module.scss';
import {
  NoteEditor,
  ScrolableSection,
  TodoListFooter,
  TodoItemsListMenu,
} from 'components/molecules';

const TodoList: React.FC = () => {
  return (
    <div className={style.todoList}>
      <h1 className={style.todoTtitle}>TODO</h1>
      <NoteEditor className={style.noteEditor} />
      <div className={style.listContainer}>
        <ScrolableSection />
        <TodoItemsListMenu />
      </div>
      <TodoListFooter />
    </div>
  );
};

export default TodoList;
