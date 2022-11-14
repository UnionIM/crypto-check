import React, { FC, useEffect, useState } from 'react';
import ListHeader from '../List/ListHeader/ListHeader';
import List from '../List/List';
import MarketItem from '../List/ListItems/MarketItem/MarketItem';
import { ICoinSingle, IFlatTickers } from '../../models/crypto';
import { sortArr } from '../Utils/Utils';
import CryptoController from '../../controllers/crypto.controller';

interface MarketsProps {
    data: ICoinSingle;
}

const Markets: FC<MarketsProps> = ({ data }) => {
    const [sort, setSort] = useState<{ column: string; isDesc: boolean }>({
        column: '',
        isDesc: true,
    });
    const [market, setMarket] = useState<IFlatTickers[]>([]);

    useEffect(() => {
        setMarket(
            data.tickers.map((el) => {
                return CryptoController.marketNormalizer(el);
            })
        );
    }, [data]);

    useEffect(() => {
        if (sort.column) {
            setMarket(sortArr(market, sort.column, sort.isDesc));
        }
    }, [sort]);

    const listHeaders = [
        { title: 'Market', sort: 'market', width: 100 },
        { title: 'Target', sort: 'target', width: 55 },
        { title: 'Trust score', sort: 'trust_score', width: 100 },
        { title: 'Price', sort: 'converted_last', width: 80 },
        { title: 'Date UTC0', sort: 'last_fetch_at', width: 126 },
    ];

    if (!data.tickers.length) {
        return <div className="App__no_data">No data</div>;
    }

    return (
        <div>
            <ListHeader
                listHeaders={listHeaders}
                setSort={setSort}
                sort={sort}
            />
            <List
                items={market}
                renderItem={(market, index) => (
                    <MarketItem key={index} market={market} />
                )}
            />
        </div>
    );
};

export default Markets;
