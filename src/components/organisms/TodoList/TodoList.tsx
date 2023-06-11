import style from './TodoList.module.scss';
import {
  NoteEditor,
  ScrolableSection,
  TodoListFooter,
  TodoItemsListMenu,
  Spinner,
} from 'components/molecules';
import { useTodoStateService } from 'hooks';

const TodoList: React.FC = () => {
  const { pending } = useTodoStateService();

  return (
    <div className={style.todoList}>
      <h1 className={style.todoTtitle}>TODO</h1>
      <NoteEditor className={style.noteEditor} />
      <div className={style.listContainer}>
        <ScrolableSection />
        <TodoItemsListMenu />
      </div>
      <Spinner visible={pending} />
      <TodoListFooter />
    </div>
  );
};

export default TodoList;
