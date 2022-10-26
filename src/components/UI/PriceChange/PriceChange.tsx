import React, { FC } from 'react';
import cls from './PriceChange.module.scss';
import TriangleArrow from '../TriangleArrow/TriangleArrow';

interface PriceChangeProps {
    priceValue: number;
    specialSymbol?: string;
    digits?: number;
}

const PriceChange: FC<PriceChangeProps> = ({
    priceValue,
    specialSymbol = '',
    digits,
}) => {
    return (
        <>
            {priceValue > 0 ? (
                <span className={[cls.price_green, cls.price].join(' ')}>
                    <span>
                        {parseFloat(priceValue.toFixed(digits)) + specialSymbol}
                    </span>
                    <TriangleArrow isUp={true} />
                </span>
            ) : (
                <span className={[cls.price_red, cls.price].join(' ')}>
                    <span>
                        {parseFloat(priceValue.toFixed(digits)) + specialSymbol}
                    </span>

                    <TriangleArrow isUp={false} />
                </span>
            )}
        </>
    );
};

export default PriceChange;
