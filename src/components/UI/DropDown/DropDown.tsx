import React, { FC, useRef, useState } from 'react';
import cls from './DropDown.module.scss';
import TriangleArrow from '../TriangleArrow/TriangleArrow';
import { useOutsideClick } from '../../../hooks/useClickOutside';

interface DropDownProps {
  textInButton?: string;
  content: any;
  grid: string;
  transform: string;
}

const DropDown: FC<DropDownProps> = ({
  textInButton = '',
  content,
  grid,
  transform,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(() => {
    setShowDropDown(false);
  }, ref);

  return (
    <div className={cls.dropdown}>
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className={cls.dropdown__selected_currency}
        ref={ref}
      >
        {textInButton}
        <TriangleArrow color="black" isUp={showDropDown} />
      </button>
      <div
        style={
          showDropDown
            ? {
                visibility: 'visible',
                gridTemplate: grid,
                transform: `translate(${transform})`,
              }
            : { visibility: 'hidden' }
        }
        className={cls.dropdown__content}
      >
        {content}
      </div>
    </div>
  );
};

export default DropDown;
