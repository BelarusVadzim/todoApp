import React, { PropsWithChildren } from 'react';
import style from './Title.module.scss';

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className={style.title}>{children}</span>;
};

export default Title;
