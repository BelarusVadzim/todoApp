import React, { PropsWithChildren } from 'react';
import style from './Title.module.scss';

// const Title: React.FC<PropsWithChildren> = ({ children }) => {
//   return <span className={style.title}>{children}</span>;
// };

const Title: React.FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={style.title}>{children}</h1>;
};

export default Title;
