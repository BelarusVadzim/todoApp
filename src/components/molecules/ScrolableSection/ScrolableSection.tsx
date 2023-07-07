import React from 'react';
import style from './ScrolableSection.module.scss';
import { arrayMoveImmutable } from 'array-move';
import { SortEvent, SortEventWithTag } from 'react-sortable-hoc';
import { useTodoStateService } from 'hooks';
import { filterTypes } from 'constants/filterTypes';
import { SortableSection } from '../SortableSection';

type SortEndArg = { oldIndex: number; newIndex: number };

const ScrolableSection: React.FC = () => {
  const { todos, dispatchTodoListChanged, todoFilter } = useTodoStateService();

  const onSortEnd = ({ oldIndex, newIndex }: SortEndArg) => {
    const todoList = arrayMoveImmutable(todos, oldIndex, newIndex);
    dispatchTodoListChanged(todoList);
  };

  const checkIsElementDraggable = (element: Element) => {
    return !!element.getAttribute('data-draggable');
  };
  const shouldCancelDrag = (event: SortEvent | SortEventWithTag) =>
    todoFilter === filterTypes.Active ||
    todoFilter === filterTypes.Completed ||
    todos.length < 2 ||
    !checkIsElementDraggable(event.target as Element);

  return (
    <div className={style.scrolableSection}>
      <SortableSection
        onSortEnd={onSortEnd}
        shouldCancelStart={shouldCancelDrag}
      />
    </div>
  );
};

export default ScrolableSection;
