import React from 'react';
import { Textbox } from 'components/atoms';
import style from './NoteEditor.module.scss';
import { PropsWithClassName, TodoNote } from 'types';
import { useTodoStateService } from 'hooks';

type NoteEditorProps = PropsWithClassName & {
  note?: TodoNote;
};

const NoteEditor: React.FC<NoteEditorProps> = ({ className = '', note }) => {
  const combinedClassNames = `${style.noteEditor} ${className}`;

  const { dispatchTodoItemCreated, dispatchTodoItemEdited } =
    useTodoStateService();

  const editFinished = (text: string) => {
    if (text)
      if (note)
        dispatchTodoItemEdited({ ...note, text });
      else dispatchTodoItemCreated({ text });
  };

  return (
    <div className={combinedClassNames}>
      <div className={style.leftField} />
      <Textbox onReturn={editFinished} />
      <div className={style.rightField} />
    </div>
  );
};

export default NoteEditor;
