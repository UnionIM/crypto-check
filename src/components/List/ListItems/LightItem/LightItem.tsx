import React, { FC } from 'react';
import cls from './LightItem.module.scss';
import { ISearchedCoin } from '../../../../models/crypto';

interface LightItemProps {
    coin: ISearchedCoin;
}

const LightItem: FC<LightItemProps> = ({ coin }) => {
    return (
        <div className={cls.light_item}>
            <img src={coin.thumb} alt="" />
            <div className={cls.light_item__coin_name}>
                {coin.name.length >= 10 ? coin.symbol : coin.name}
            </div>
        </div>
    );
};

export default LightItem;
