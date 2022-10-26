import React, { FC, useState } from 'react';
import { IPrice } from '../../models/crypto';
import cls from './Convertor.module.scss';

interface ConvertorProps {
    price: IPrice;
    symbol: string;
}

const Convertor: FC<ConvertorProps> = ({ price, symbol }) => {
    const [amount, setAmount] = useState<number>(1);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');

    console.log(amount);
    console.log(price);
    if (isNaN(amount)) {
        setAmount(0);
    }

    return (
        <div className={cls.convertor}>
            <h1 className={cls.bald_text}>
                FROM {symbol.toUpperCase()} TO {selectedCurrency.toUpperCase()}
            </h1>
            <div className={cls.convertor__wrapper}>
                <input
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    type="text"
                    className={cls.convertor__input}
                />
                <div className={cls.convertor__dropdown}>
                    <button>{selectedCurrency}</button>
                    <div className={cls.convertor__dropdown_content}>
                        {Object.keys(price).map((curr) => (
                            <div className={cls.convertor__dropdown_item}>
                                {curr}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cls.convertor__output}>
                    {amount * price[selectedCurrency as keyof IPrice]}
                </div>
            </div>
        </div>
    );
};

export default Convertor;
