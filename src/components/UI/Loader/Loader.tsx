import React from 'react';
import cls from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls['lds-ring']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
