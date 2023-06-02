import React from 'react';
import { PropsWithClassName } from 'types';
import { SortableContainer } from 'react-sortable-hoc';
import { useTodoStateService } from 'hooks';
import { SortableTodoItem } from '../SortableTodoItem';

const SortableSection: React.FC<PropsWithClassName> = () => {
  const { todos } = useTodoStateService();

  return (
    <div>
      {todos.map((value, index) => (
        <SortableTodoItem key={`item-${index}`} index={index} note={value} />
      ))}
    </div>
  );
};

export default SortableContainer<PropsWithClassName>(SortableSection);
