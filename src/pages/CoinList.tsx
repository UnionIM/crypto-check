import React from 'react';
import cls from '../styles/pagesStyle/CoinList.module.scss';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import { useParams } from 'react-router-dom';
import List from '../components/List/List';
import ExtendedCoinItem from '../components/List/ListItems/ExtendedCoinItem/ExtendedCoinItem';

const CoinList = () => {
    const { page } = useParams();

    const { data, isLoading } = useDataFromPromise(
        CryptoController.getAllCrypto,
        [page]
    );

    if (!data) {
        return <div>no data</div>;
    }

    return (
        <div className={cls.coin_list}>
            <div className={cls.coin_item}>
                <div className={cls.coin_item__name_info}>Name</div>
                <div className={cls.coin_item__price}>Price</div>
                <div className={cls.coin_item__percentage}>24h</div>
                <div className={cls.coin_item__percentage}>7d</div>
                <div className={cls.coin_item__percentage}>30d</div>
                <div className={cls.coin_item__market_cap}>Market cap</div>
                <div className={cls.coin_item__percentage}>MC 24h</div>
                <div className={cls.coin_item__max_market_cap}>FDV</div>
                <div className={cls.coin_item__part_of_market_cap}>MC/FDV</div>
            </div>
            <List
                items={data}
                renderItem={(item) => (
                    <ExtendedCoinItem coin={item} key={item.id} />
                )}
            />
        </div>
    );
};

export default CoinList;
