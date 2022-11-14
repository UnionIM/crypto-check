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

    const time = {
        h1: 3600,
        h24: 86400,
        d7: 604800,
        d30: 2629743,
        y1: 31556926,
    };

    const { data } = useDataFromPromise(
        CryptoController.getChartData,
        [
            coinId,
            'usd',
            `${Math.floor(Date.now() / 1000) - selectedTime}`,
            `${Math.floor(Date.now() / 1000)}`,
        ],
        [selectedTime, coinId]
    );

    const zoomMinMax = (isMax: boolean, arr: number[]) => {
        if (isMax) {
            const max = Math.max.apply(Math, arr);
            return Math.round(max + max / 20);
        } else {
            const min = Math.min.apply(Math, arr);
            return Math.round(min - min / 20);
        }
    };

    const zoomOptions = {
        limits: {
            x: { min: 0, max: 200, minRange: 50 },
            y: {
                min: data
                    ? zoomMinMax(
                          false,
                          data?.[selectedChart as keyof IChartData].map(
                              (el) => el[1]
                          )
                      )
                    : 0,
                max: data
                    ? zoomMinMax(
                          true,
                          data?.[selectedChart as keyof IChartData].map(
                              (el) => el[1]
                          )
                      )
                    : 100000,
                minRange: 50,
            },
        },
        pan: {
            enabled: true,
            mode: 'xy',
        },
        zoom: {
            wheel: {
                enabled: true,
            },
            pinch: {
                enabled: true,
            },
            mode: 'xy',
        },
    };

    const options = {
        responsive: true,
        interaction: {
            intersect: false,
            mode: 'index' as 'index',
        },
        elements: {
            point: {
                radius: 1,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            zoom: zoomOptions,
            tooltip: {
                callbacks: {
                    title: function (context: any) {
                        return new Date(
                            parseInt(context[0].label)
                        ).toUTCString();
                    },
                    label: function (context: any) {
                        return 'Price: ' + context.raw;
                    },
                },
            },
            x: {
                callback: function (context: any) {
                    return new Date(parseInt(context[0].label)).toUTCString();
                },
            },
        },
        scales: {
            xAxes: {
                ticks: {
                    callback: function (index: number) {
                        return data?.[selectedChart as keyof IChartData].map(
                            (el) =>
                                selectedTime > time.d7
                                    ? new Date(el[0]).toLocaleDateString()
                                    : new Date(el[0]).toLocaleTimeString()
                        )[index];
                    },
                },
                scaleLabel: {
                    display: true,
                    labelString: 'value',
                },
            },
        },
    };

    const chartData = {
        labels: data?.[selectedChart as keyof IChartData].map((el) => el[0]),
        datasets: [
            {
                label: 'Price',
                data: data?.[selectedChart as keyof IChartData].map(
                    (el) => el[1]
                ),
                borderColor: 'rgba(99,130,255,0.5)',
            },
        ],
    };

    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div>
            {chartData ? (
                <div>
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
            ) : (
                <div>Loading</div>
            )}
        </div>
    );
};

export default Chart;
