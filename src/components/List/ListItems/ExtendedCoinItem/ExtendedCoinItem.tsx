import React, { FC } from 'react';
import cls from './ExtendedCoinItem.module.scss';
import { IExtendedCoin } from '../../../../models/crypto';
import PriceChange from '../../../UI/PriceChange/PriceChange';
import { pricePrettier } from '../../../Utils/Utils';
import { Link } from 'react-router-dom';

interface ExtendedCoinItemProps {
    coin: IExtendedCoin;
}

const ExtendedCoinItem: FC<ExtendedCoinItemProps> = ({ coin }) => {
    return (
        <div className={cls.coin_item}>
            <Link
                to={`/coins/${coin.id}/overview`}
                className={cls.coin_item__name_info}
            >
                <img
                    src={coin.image.thumb}
                    alt=""
                    className={cls.coin_item__img}
                />
                <div className={cls.coin_item__name}>{coin.name}</div>
                <div className={[cls.grey_text].join(' ')}>
                    {coin.symbol.toUpperCase()}
                </div>
            </Link>
            <div className={cls.coin_item__price}>
                {coin.market_data.current_price.usd}
            </div>
            <PriceChange
                priceValue={coin.market_data.price_change_percentage_24h}
                digits={2}
                specialSymbol={' %'}
            />
            <PriceChange
                priceValue={coin.market_data.price_change_percentage_7d}
                digits={2}
                specialSymbol={' %'}
            />
            <PriceChange
                priceValue={coin.market_data.price_change_percentage_30d}
                digits={2}
                specialSymbol={' %'}
            />
            <div className={cls.coin_item__market_cap}>
                {pricePrettier(coin.market_data.market_cap.usd)}
            </div>
            <PriceChange
                priceValue={coin.market_data.market_cap_change_percentage_24h}
                digits={2}
                specialSymbol={' %'}
            />
            <div className={cls.coin_item__max_market_cap}>
                {pricePrettier(
                    parseFloat(coin.market_data.total_supply) *
                        coin.market_data.current_price.usd
                )}
            </div>
            <div className={cls.coin_item__part_of_market_cap}>
                {pricePrettier(
                    coin.market_data.market_cap.usd /
                        (parseFloat(coin.market_data.total_supply) *
                            coin.market_data.current_price.usd)
                )}
            </div>
        </div>
    );
};

export default ExtendedCoinItem;
