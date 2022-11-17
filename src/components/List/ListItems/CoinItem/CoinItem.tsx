import React, { FC } from 'react';
import { ICoin } from '../../../../models/crypto';
import cls from './CoinItem.module.scss';
import { Link } from 'react-router-dom';
import PriceChange from '../../../UI/PriceChange/PriceChange';

interface CoinItemProps {
  crypto: ICoin;
}

const CoinItem: FC<CoinItemProps> = ({ crypto }) => {
  return (
    <div className={cls.coin_item}>
      <Link to={`/coins/${crypto.id}/overview`}>
        <img
          className={cls.coin_item__image}
          src={crypto.image}
          alt={`${crypto.name} image`}
        />
      </Link>
      <div className={cls.coin_item__name}>{crypto.name}</div>
      <div className={cls.coin_item__price}>
        <PriceChange
          priceValue={crypto.price_change_percentage_24h}
          specialSymbol={' %'}
          digits={2}
        />
      </div>
    </div>
  );
};

export default CoinItem;
