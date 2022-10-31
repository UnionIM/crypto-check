import React from 'react';
import { useParams } from 'react-router-dom';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import List from '../components/List/List';

const SearchedCoins = () => {
    const { searchValue } = useParams();

    const { data, isLoading } = useDataFromPromise(
        CryptoController.searchForCrypto,
        [searchValue],
        [searchValue]
    );

    if (!data) {
        return <div style={{ paddingTop: '60px' }}>No data</div>;
    }

    return (
        <div style={{ paddingTop: '60px' }}>
            <List
                items={data.coins}
                renderItem={(coin) => <div>{coin.name}</div>}
            />
        </div>
    );
};

export default SearchedCoins;
