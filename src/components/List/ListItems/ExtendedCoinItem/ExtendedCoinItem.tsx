import React, { FC } from 'react';
import cls from './ExtendedCoinItem.module.scss';
import { IFlatExtendedCoin } from '../../../../models/crypto';
import PriceChange from '../../../UI/PriceChange/PriceChange';
import { pricePrettier } from '../../../Utils/Utils';
import { Link } from 'react-router-dom';

interface ExtendedCoinItemProps {
    coin: IFlatExtendedCoin;
}

const ExtendedCoinItem: FC<ExtendedCoinItemProps> = ({ coin }) => {
    return (
        <div className={cls.coin_item}>
            <Link
                to={`/coins/${coin.id}/overview`}
                className={cls.coin_item__name_info}
            >
                <img src={coin.image} alt="" className={cls.coin_item__img} />
                <div className={cls.coin_item__name}>{coin.name}</div>
                <div className={[cls.grey_text].join(' ')}>
                    {coin.symbol.toUpperCase()}
                </div>
            </Link>
            <div className={cls.coin_item__price}>{coin.price || 'N/A'}</div>
            <PriceChange
                priceValue={coin.price24h}
                digits={2}
                specialSymbol={' %'}
            />
            <PriceChange
                priceValue={coin.price7d}
                digits={2}
                specialSymbol={' %'}
            />
            <PriceChange
                priceValue={coin.price30d}
                digits={2}
                specialSymbol={' %'}
            />
            <div className={cls.coin_item__market_cap}>
                {coin.market_cap ? pricePrettier(coin.market_cap) : 'N/A'}
            </div>
            <PriceChange
                priceValue={coin.market_cap_24h}
                digits={2}
                specialSymbol={' %'}
            />
            <div className={cls.coin_item__max_market_cap}>
                {coin.fdv === -1 ? 'N/A' : pricePrettier(coin.fdv)}
            </div>
            <div className={cls.coin_item__part_of_market_cap}>
                {coin.mc_fdv === -1 ? 'N/A' : pricePrettier(coin.mc_fdv)}
            </div>
        </div>
    );
};

export default ExtendedCoinItem;
