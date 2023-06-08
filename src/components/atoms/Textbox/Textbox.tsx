import React, { KeyboardEvent, ChangeEvent, useState } from 'react';
import style from './Textbox.module.scss';

type TextboxProps = {
  onReturn?: (text: string) => void;
};

const EnterKey = 'Enter';

const Textbox: React.FC<TextboxProps> = ({ onReturn }) => {
  const [text, setText] = useState('');

  const keyDownHandler = (
    keyboardEventArg: KeyboardEvent<HTMLInputElement>
  ) => {
    if (EnterKey === keyboardEventArg.key) {
      if (onReturn) onReturn(keyboardEventArg.currentTarget.value);
      setText('');
    }
  };

  const changeHandler = (changeEventArg: ChangeEvent<HTMLInputElement>) => {
    setText(changeEventArg.target.value);
  };

  return (
    <input
      type="text"
      className={style.textbox}
      onChange={changeHandler}
      onKeyDown={keyDownHandler}
      value={text}
      maxLength={50}
    />
  );
};

export default Textbox;
