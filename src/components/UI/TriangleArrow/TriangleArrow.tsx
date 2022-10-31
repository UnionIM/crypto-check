import React, { FC } from 'react';
import cls from './TriangleArrow.module.scss';

interface TriangleArrowProps {
    isUp: boolean;
    color?: string;
}

const TriangleArrow: FC<TriangleArrowProps> = ({
    isUp,
    color = isUp ? 'green ' : 'red',
}) => {
    return (
        <span
            className={isUp ? cls.arrow_up : cls.arrow_down}
            style={{
                [isUp ? 'borderBottom' : 'borderTop']: `5px solid ${color}`,
            }}
        />
    );
};

export default TriangleArrow;
