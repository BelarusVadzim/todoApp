/* istanbul ignore file */
import { SortableElement } from 'react-sortable-hoc';
import { TodoItem } from '../TodoItem';
import { TodoItemProps } from '../TodoItem/TodoItem';

export default SortableElement<TodoItemProps>(TodoItem);
