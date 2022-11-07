import React, { useEffect, useState } from 'react';
import cls from '../styles/pagesStyle/CoinList.module.scss';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import { useParams } from 'react-router-dom';
import List from '../components/List/List';
import ExtendedCoinItem from '../components/List/ListItems/ExtendedCoinItem/ExtendedCoinItem';
import { IFlatExtendedCoin } from '../models/crypto';
import ListHeader from '../components/List/ListHeader/ListHeader';
import Pagination from '../components/Pagination/Pagination';

const CoinList = () => {
    const { page } = useParams();
    const [coins, setCoins] = useState<IFlatExtendedCoin[]>([]);
    const [sort, setSort] = useState<{ column: string; isDesc: boolean }>({
        column: 'market_cap',
        isDesc: true,
    });

    const listHeaders = [
        {
            title: 'Name',
            sort: 'name',
            width: window.innerWidth < 1000 ? 108 : 210,
        },
        { title: 'Price', sort: 'price', width: 97 },
        { title: '24h', sort: 'price24h', width: 92 },
        { title: '7d', sort: 'price7d', width: 95 },
        { title: '30d', sort: 'price30d', width: 85 },
        { title: 'Market cap', sort: 'market_cap', width: 135 },
        { title: 'MC 24h', sort: 'market_cap_24h', width: 80 },
        { title: 'FDV', sort: 'fdv', width: 130 },
        { title: 'MC/FDV', sort: 'mc_fdv', width: 60 },
    ];

    const { data, isLoading } = useDataFromPromise(
        CryptoController.getAllCrypto,
        [page],
        [page]
    );

    useEffect(() => {
        if (data?.data) {
            const temp: IFlatExtendedCoin[] = [];
            data.data.map((el) => {
                temp.push(CryptoController.extendedCoinNormalizer(el));
            });
            setCoins(temp);
        }
    }, [data?.data]);

    useEffect(() => {
        setCoins(sortArr(coins, sort.column, sort.isDesc));
    }, [sort]);

    const sortArr = (arr: any[], property: string, isDesc: boolean) => {
        return [...arr].sort((a, b) => {
            return (
                (a[property] < b[property]
                    ? -1
                    : a[property] > b[property]
                    ? 1
                    : 0) * (isDesc ? -1 : 1)
            );
        });
    };

    if (!data) {
        return <div>no data</div>;
    }

    return (
        <div className={cls.coin_list}>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <div className={cls.coin_list__container}>
                    <div className={cls.coin_item}>
                        <ListHeader
                            listHeaders={listHeaders}
                            setSort={setSort}
                        />
                    </div>
                    <List
                        items={coins}
                        renderItem={(item) => (
                            <ExtendedCoinItem coin={item} key={item.id} />
                        )}
                    />
                    {data?.headers.total ? (
                        <Pagination
                            total={parseInt(data?.headers.total)}
                            perPage={50}
                        />
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoinList;