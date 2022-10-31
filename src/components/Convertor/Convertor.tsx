import React, { FC, useState } from 'react';
import { IPrice } from '../../models/crypto';
import cls from './Convertor.module.scss';
import TriangleArrow from '../UI/TriangleArrow/TriangleArrow';
import { useOutsideClick } from '../../hooks/useClickOutside';
import reverse from '../../content/svg/Reverse.svg';

interface ConvertorProps {
    price: IPrice;
    symbol: string;
}

const Convertor: FC<ConvertorProps> = ({ price, symbol }) => {
    const [amount, setAmount] = useState<number>(1);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [isCoinToCurr, setIsCoinToCurr] = useState<boolean>(true);

    const ref = React.useRef<HTMLButtonElement>(null);

    useOutsideClick(() => {
        setShowDropDown(false);
    }, ref);

    return (
        <div className={cls.convertor}>
            {isCoinToCurr ? (
                <h1 className={cls.bald_text}>
                    FROM {symbol.toUpperCase()} TO{' '}
                    {selectedCurrency.toUpperCase()}
                </h1>
            ) : (
                <h1 className={cls.bald_text}>
                    FROM {selectedCurrency.toUpperCase()} TO{' '}
                    {symbol.toUpperCase()}
                </h1>
            )}
            <button
                className={cls.convertor__replace}
                onClick={() => setIsCoinToCurr(!isCoinToCurr)}
            >
                Replace
                <img src={reverse} alt="" />
            </button>
            <div className={cls.convertor__wrapper}>
                <input
                    onChange={(e) => setAmount(+e.target.value)}
                    type="number"
                    className={cls.convertor__input}
                />
                <div className={cls.convertor__dropdown}>
                    <button
                        onClick={() => setShowDropDown(true)}
                        className={cls.convertor__selected_currency}
                        ref={ref}
                    >
                        {selectedCurrency.toUpperCase()}
                        <TriangleArrow color="black" isUp={showDropDown} />
                    </button>
                    <div
                        className={cls.convertor__dropdown_content}
                        style={
                            showDropDown
                                ? { visibility: 'visible' }
                                : { visibility: 'hidden' }
                        }
                    >
                        {Object.keys(price).map((curr) => (
                            <button
                                onClick={() => setSelectedCurrency(curr)}
                                key={curr}
                                className={[
                                    cls.convertor__dropdown_item,
                                    cls.convertor__button,
                                ].join(' ')}
                            >
                                {curr.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={cls.convertor__output}>
                    {isCoinToCurr
                        ? amount * price[selectedCurrency as keyof IPrice]
                        : amount / price[selectedCurrency as keyof IPrice]}
                </div>
            </div>
        </div>
    );
};

export default Convertor;
