import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import cls from '../styles/pagesStyle/CoinPage.module.scss';
import PriceChange from '../components/UI/PriceChange/PriceChange';
import List from '../components/List/List';
import NameValueItem from '../components/List/ListItems/NameValueItem/NameValueItem';
import { INameValue } from '../models/crypto';
import MarketItem from '../components/List/ListItems/MarketItem/MarketItem';
import Convertor from '../components/Convertor/Convertor';

const CoinPage = () => {
    const [list, setList] = useState<INameValue[]>([]);
    const { coinId, path } = useParams();

    const { data, isLoading } = useDataFromPromise(
        CryptoController.getCoinById,
        [coinId],
        [coinId]
    );

    useEffect(() => {
        if (data) {
            setList(CryptoController.coinNormalizer(data));
        }
    }, [data]);

    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div className={cls.coin_page}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className={cls.coin_page__content}>
                    <div className={cls.coin_page__identifier}>
                        <div className={cls.coin_page__image}>
                            <img src={`${data.image.thumb}`} alt="" />
                        </div>
                        <div
                            className={[
                                cls.bald_text,
                                cls.coin_page__coin_name,
                            ].join(' ')}
                        >
                            {data.name}{' '}
                            <span className={cls.grey_text}>
                                {data.symbol.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className={cls.coin_page__price_details}>
                        <div className={cls.coin_page__price_info}>
                            <span>
                                {data.market_data.current_price.usd} USD{' '}
                            </span>
                            <PriceChange
                                priceValue={data.market_data.price_change_24h}
                                digits={
                                    Math.abs(
                                        data.market_data.price_change_24h
                                    ) < 0.0001
                                        ? 8
                                        : 4
                                }
                            />
                        </div>
                        <PriceChange
                            priceValue={
                                data.market_data.price_change_percentage_24h
                            }
                            specialSymbol={' %'}
                            digits={2}
                        />
                    </div>
                    <div>
                        <List
                            items={list}
                            renderItem={(item) => (
                                <NameValueItem item={item} key={item.name} />
                            )}
                        />
                    </div>
                    <div>
                        <nav className={cls.coin_page__list_container}>
                            <ul className={cls.coin_page__list}>
                                <li>
                                    <Link
                                        className={[
                                            cls.default_text,
                                            path === 'overview'
                                                ? cls.coin_page__list_item_active
                                                : cls.coin_page__list_item,
                                        ].join(' ')}
                                        to={`/coins/${data.id}/overview`}
                                    >
                                        Overview
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={[
                                            cls.default_text,
                                            path === 'markets'
                                                ? cls.coin_page__list_item_active
                                                : cls.coin_page__list_item,
                                        ].join(' ')}
                                        to={`/coins/${data.id}/markets`}
                                    >
                                        Markets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={[
                                            cls.default_text,
                                            path === 'conversion'
                                                ? cls.coin_page__list_item_active
                                                : cls.coin_page__list_item,
                                        ].join(' ')}
                                        to={`/coins/${data.id}/conversion`}
                                    >
                                        Conversion
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            {path === 'overview' && <div>Overview</div>}
                            {path === 'markets' && (
                                <div
                                    className={cls.coin_page__market_container}
                                >
                                    <div
                                        className={[
                                            cls.market_item,
                                            cls.market_item__header,
                                        ].join(' ')}
                                    >
                                        <span className={cls.market_item__name}>
                                            Market
                                        </span>
                                        <span
                                            className={cls.market_item__target}
                                        >
                                            Target
                                        </span>
                                        <span
                                            className={
                                                cls.market_item__trust_score
                                            }
                                        >
                                            Trust score
                                        </span>
                                        <span
                                            className={cls.market_item__price}
                                        >
                                            Price
                                        </span>
                                        <span className={cls.market_item__date}>
                                            Date UTC0
                                        </span>
                                    </div>
                                    <List
                                        items={data.tickers}
                                        renderItem={(market) => (
                                            <MarketItem market={market} />
                                        )}
                                    />
                                </div>
                            )}
                            {path === 'conversion' && (
                                <Convertor
                                    price={data.market_data.current_price}
                                    symbol={data.symbol}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinPage;
