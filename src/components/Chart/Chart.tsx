import React, { useState } from 'react';
import useDataFromPromise from '../../hooks/useDataFromPromise';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CryptoController from '../../controllers/crypto.controller';
import { useParams } from 'react-router-dom';
import zoomPlugin from 'chartjs-plugin-zoom';
import cls from './Chart.module.scss';
import { IChartData } from '../../models/crypto';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getChartOptions } from './ChartSettings';
import Loader from '../UI/Loader/Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const Chart = () => {
  const { coinId } = useParams();
  const [selectedTime, setSelectedTime] = useState<number>(86400);
  const [selectedChart, setSelectedChart] = useState<string>('prices');

  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );

  const time = {
    h1: 3600,
    h24: 86400,
    d7: 604800,
    d30: 2629743,
    y1: 31556926,
  };

  const { data, isLoading } = useDataFromPromise(
    CryptoController.getChartData,
    [
      coinId,
      selectedCurrency,
      `${Math.floor(Date.now() / 1000) - selectedTime}`,
      `${Math.floor(Date.now() / 1000)}`,
    ],
    [selectedTime, coinId, selectedCurrency]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (data && data[selectedChart as keyof IChartData].length) {
    const chartData = {
      labels: data?.[selectedChart as keyof IChartData].map((el) => el[0]),
      datasets: [
        {
          label: 'Price',
          data: data?.[selectedChart as keyof IChartData].map((el) => el[1]),
          borderColor: 'rgba(99,130,255,0.5)',
        },
      ],
    };

    const options = getChartOptions(data, selectedChart, selectedTime, time.d7);

    return (
      <div className={cls.chart}>
        <div className={cls.chart__button_list}>
          <button
            onClick={() => {
              setSelectedTime(time.h1);
            }}
            className={
              selectedTime === time.h1
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            1h
          </button>
          <button
            onClick={() => {
              setSelectedTime(time.h24);
            }}
            className={
              selectedTime === time.h24
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            24h
          </button>
          <button
            onClick={() => {
              setSelectedTime(time.d7);
            }}
            className={
              selectedTime === time.d7
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            7d
          </button>
          <button
            onClick={() => {
              setSelectedTime(time.d30);
            }}
            className={
              selectedTime === time.d30
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            1m
          </button>
          <button
            onClick={() => {
              setSelectedTime(time.y1);
            }}
            className={
              selectedTime === time.y1
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            1y
          </button>
        </div>
        <div className={cls.chart__button_list}>
          <button
            onClick={() => {
              setSelectedChart('prices');
            }}
            className={
              selectedChart === 'prices'
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            Price
          </button>
          <button
            onClick={() => {
              setSelectedChart('market_caps');
            }}
            className={
              selectedChart === 'market_caps'
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            Market cap
          </button>
          <button
            onClick={() => {
              setSelectedChart('total_volumes');
            }}
            className={
              selectedChart === 'total_volumes'
                ? cls.chart__button_active
                : cls.chart__button
            }
          >
            Total volume
          </button>
        </div>
        <Line
          type={'line'}
          //@ts-ignore
          options={options}
          data={chartData}
        />
      </div>
    );
  } else {
    return <div className="App__no_data">No data</div>;
  }
};

export default Chart;
