import React, { useEffect, useState } from 'react';
import cls from '../styles/pagesStyle/CoinList.module.scss';
import useDataFromPromise from '../hooks/useDataFromPromise';
import CryptoController from '../controllers/crypto.controller';
import { useParams } from 'react-router-dom';
import List from '../components/List/List';
import ExtendedCoinItem from '../components/List/ListItems/ExtendedCoinItem/ExtendedCoinItem';
import { ICoinList } from '../models/crypto';
import ListHeader from '../components/List/ListHeader/ListHeader';
import Pagination from '../components/Pagination/Pagination';
import { sortArr } from '../components/Utils/Utils';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Loader from '../components/UI/Loader/Loader';
import useWindowDimensions from '../hooks/useWindowDimensions';

const CoinList = () => {
  const { page } = useParams();
  const [coins, setCoins] = useState<ICoinList[]>([]);
  const [sort, setSort] = useState<{ column: string; isDesc: boolean }>({
    column: 'market_cap',
    isDesc: true,
  });

  const { width } = useWindowDimensions();

  const listHeaders = [
    {
      title: 'Name',
      sort: 'name',
      width: width < 1000 ? (width < 500 ? 50 : 114) : 210,
      disappearWidth: 0,
    },
    { title: 'Price', sort: 'price', width: 97, disappearWidth: 0 },
    {
      title: '24h',
      sort: 'price24h',
      width: width < 740 ? 85 : 95,
      disappearWidth: 0,
    },
    { title: '7d', sort: 'price7d', width: 95, disappearWidth: 1000 }, //1000
    { title: '30d', sort: 'price30d', width: 85, disappearWidth: 1000 }, //1000
    {
      title: 'Market cap',
      sort: 'market_cap',
      width: width < 740 ? 100 : 135,
      disappearWidth: 0,
    },
    { title: 'MC 24h', sort: 'market_cap_24h', width: 80, disappearWidth: 740 }, //740
    { title: 'FDV', sort: 'fdv', width: 130, disappearWidth: 640 }, //640
    { title: 'MC/FDV', sort: 'mc_fdv', width: 60, disappearWidth: 400 },
  ];

  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );

  const { data, isLoading } = useDataFromPromise(
    CryptoController.getAllCrypto,
    [page, selectedCurrency],
    [page, selectedCurrency]
  );

  useEffect(() => {
    if (data?.data) {
      const temp: ICoinList[] = [];
      data.data.map((el) => {
        temp.push(
          CryptoController.extendedCoinNormalizer(el, selectedCurrency)
        );
      });
      setCoins(temp);
    }
  }, [data?.data, selectedCurrency]);

  useEffect(() => {
    setCoins([]);
  }, [page]);

  useEffect(() => {
    setCoins(sortArr(coins, sort.column, sort.isDesc));
  }, [sort]);

  return (
    <div className={cls.coin_list}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={cls.coin_list__container}>
          <div>
            {data?.data.length ? (
              <div>
                <div className={cls.coin_item}>
                  <ListHeader
                    listHeaders={listHeaders}
                    setSort={setSort}
                    sort={sort}
                  />
                </div>
                <List
                  items={coins}
                  renderItem={(item) => (
                    <ExtendedCoinItem coin={item} key={item.id} />
                  )}
                />
                {/*Because Coin Gecko api doesn't support "TOTAL" header, a static number was passed to the props*/}
                <Pagination total={8200} perPage={50} />
              </div>
            ) : (
              <div className="App__no_data">No data</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinList;
