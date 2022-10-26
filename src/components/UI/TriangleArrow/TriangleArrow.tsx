import React, { FC } from 'react';
import cls from './TriangleArrow.module.scss';

interface TriangleArrowProps {
    isUp: boolean;
}

const TriangleArrow: FC<TriangleArrowProps> = ({ isUp }) => {
    return <span className={isUp ? cls.arrow_up : cls.arrow_down} />;
};

export default TriangleArrow;
