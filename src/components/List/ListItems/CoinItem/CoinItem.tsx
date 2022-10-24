import React, { FC } from 'react';
import { ICoin } from '../../../../models/crypto';
import cls from './CoinItem.module.scss';
import { Link } from 'react-router-dom';

interface CoinItemProps {
    crypto: ICoin;
}

const CoinItem: FC<CoinItemProps> = ({ crypto }) => {
    return (
        <div className={cls.coin_item}>
            <Link to={`/coins/${crypto.id}`}>
                <img
                    className={cls.coin_item__image}
                    src={crypto.image}
                    alt={`${crypto.name} image`}
                />
            </Link>
            <div className={cls.coin_item__name}>{crypto.name}</div>
            <div>
                {crypto.price_change_percentage_24h > 0 ? (
                    <div className={cls.coin_item__price}>
                        <div className={cls.coin_item__arrow_up} />
                        <div className={cls.coin_item__price_green}>
                            {crypto.price_change_percentage_24h}
                        </div>
                    </div>
                ) : (
                    <div className={cls.coin_item__price}>
                        <div className={cls.coin_item__arrow_down} />
                        <div className={cls.coin_item__price_red}>
                            {crypto.price_change_percentage_24h}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinItem;
