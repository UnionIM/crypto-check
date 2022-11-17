import React, { useEffect, useState } from 'react';
import '../styles/pagesStyle/Home.scss';
import CryptoController from '../controllers/crypto.controller';
import useDataFromPromise from '../hooks/useDataFromPromise';
import List from '../components/List/List';
import CoinItem from '../components/List/ListItems/CoinItem/CoinItem';
import { ICoin } from '../models/crypto';

const Home = () => {
  const [lowestCryptoList, setLowestCryptoList] = useState<ICoin[]>([]);
  const [highestCryptoList, setHighestCryptoList] = useState<ICoin[]>([]);

  const { data, isLoading } = useDataFromPromise(
    CryptoController.getMarketInfo,
    ['usd', '24h']
  );

  useEffect(() => {
    if (data) {
      data.sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
      );
      setHighestCryptoList(data.slice(data.length - 10, data.length).reverse());
      setLowestCryptoList(data.slice(0, 10));
    }
  }, [data]);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__hero">
          <div className="home__header">Here you can check crypto.</div>
        </div>
        <div className="home__content">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1 className="home__list_header">Best and worst crypto</h1>
              <div className="home__best_worst_list">
                <List
                  items={highestCryptoList}
                  renderItem={(crypto) => (
                    <CoinItem crypto={crypto} key={crypto.id} />
                  )}
                  equalWidth={true}
                />
                <List
                  items={lowestCryptoList}
                  renderItem={(crypto) => (
                    <CoinItem crypto={crypto} key={crypto.id} />
                  )}
                  equalWidth={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
