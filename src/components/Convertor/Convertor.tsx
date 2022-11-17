import React, { FC, useState } from 'react';
import { IPrice } from '../../models/crypto';
import cls from './Convertor.module.scss';
import reverse from '../../content/svg/Reverse.svg';
import DropDown from '../UI/DropDown/DropDown';

interface ConvertorProps {
  price: IPrice;
  symbol: string;
}

const Convertor: FC<ConvertorProps> = ({ price, symbol }) => {
  const [amount, setAmount] = useState<string>('1');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd');
  const [isCoinToCurr, setIsCoinToCurr] = useState<boolean>(true);

  return (
    <div className={cls.convertor}>
      {isCoinToCurr ? (
        <h1 className={cls.bald_text}>
          FROM {symbol.toUpperCase()} TO {selectedCurrency.toUpperCase()}
        </h1>
      ) : (
        <h1 className={cls.bald_text}>
          FROM {selectedCurrency.toUpperCase()} TO {symbol.toUpperCase()}
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
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className={cls.convertor__input}
          value={amount}
        />
        <DropDown
          textInButton={selectedCurrency.toUpperCase()}
          grid={'1fr/ 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}
          transform={'-160px, 13px'}
          content={Object.keys(price).map((curr) => (
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
        />
        <div className={cls.convertor__output}>
          {isCoinToCurr
            ? +amount * price[selectedCurrency as keyof IPrice]
            : +amount / price[selectedCurrency as keyof IPrice]}
        </div>
      </div>
    </div>
  );
};

export default Convertor;
