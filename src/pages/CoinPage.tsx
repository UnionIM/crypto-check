import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import cls from '../styles/pagesStyle/CoinPage.module.scss';
import PriceChange from '../components/UI/PriceChange/PriceChange';
import List from '../components/List/List';
import NameValueItem from '../components/List/ListItems/NameValueItem/NameValueItem';
import { IFlatTickers, INameValue } from '../models/crypto';
import MarketItem from '../components/List/ListItems/MarketItem/MarketItem';
import Convertor from '../components/Convertor/Convertor';
import ListHeader from '../components/List/ListHeader/ListHeader';
import { sortArr } from '../components/Utils/Utils';

const CoinPage = () => {
    const [list, setList] = useState<INameValue[]>([]);
    const [market, setMarket] = useState<IFlatTickers[]>([]);
    const { coinId, path } = useParams();
    const [sort, setSort] = useState<{ column: string; isDesc: boolean }>({
        column: 'market_cap',
        isDesc: true,
    });

    const { data, isLoading } = useDataFromPromise(
        CryptoController.getCoinById,
        [coinId],
        [coinId]
    );

    useEffect(() => {
        if (data) {
            const temp: IFlatTickers[] = [];
            setList(CryptoController.coinNormalizer(data));
            data.tickers.map((el) => {
                temp.push(CryptoController.marketNormalizer(el));
            });
            setMarket(temp);
        }
    }, [data]);

    useEffect(() => {
        setMarket(sortArr(market, sort.column, sort.isDesc));
    }, [sort]);

    const listHeaders = [
        { title: 'Market', sort: 'market', width: 100 },
        { title: 'Target', sort: 'target', width: 55 },
        { title: 'Trust score', sort: 'trust_score', width: 100 },
        { title: 'Price', sort: 'converted_last', width: 80 },
        { title: 'Date UTC0', sort: 'last_fetch_at', width: 126 },
    ];

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
                    <div className={cls.coin_page__description}>
                        {data.description.en.replace(/<[^>]+>/g, '')}
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
                                    <ListHeader
                                        listHeaders={listHeaders}
                                        setSort={setSort}
                                        sort={sort}
                                        key={listHeaders[0].sort}
                                    />
                                    <List
                                        items={market}
                                        renderItem={(market) => (
                                            <MarketItem
                                                key={Math.random()}
                                                market={market}
                                            />
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
