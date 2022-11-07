import React, { FC } from 'react';
import './MarketItem.module.scss';
import { IFlatTickers } from '../../../../models/crypto';
import cls from './MarketItem.module.scss';

interface MarketItemProps {
    market: IFlatTickers;
}

const MarketItem: FC<MarketItemProps> = ({ market }) => {
    return (
        <div className={cls.market_item}>
            <a className={cls.market_item__name} href={market.trade_url}>
                {market.market}
            </a>
            <span className={cls.market_item__target}>
                {market.target.length > 7 ? 'No data' : market.target}
            </span>
            <span
                className={cls.market_item__trust_score}
                style={{ backgroundColor: `${market.trust_score || 'grey'}` }}
            >
                {market.trust_score || 'No data'}
            </span>
            <span className={cls.market_item__price}>
                {market.converted_last.toString().slice(0, 8)} USD
            </span>
            <span className={cls.market_item__date}>
                {market.last_fetch_at.slice(0, 19).split('T').join(' ')}
            </span>
        </div>
    );
};

export default MarketItem;
