import { IChartData } from '../../models/crypto';

export const getChartOptions = (
  data: IChartData,
  selectedChart: string,
  selectedTime: number,
  time: number
) => {
  const zoomMinMax = (isMax: boolean, arr: number[]) => {
    if (isMax) {
      const max = Math.max.apply(Math, arr);
      return max + max / 20;
    } else {
      const min = Math.min.apply(Math, arr);
      return min - min / 20;
    }
  };

  const zoomOptions = {
    limits: {
      x: { min: 0, max: Date.now(), minRange: 1 },
      y: {
        min: data
          ? zoomMinMax(
              false,
              data?.[selectedChart as keyof IChartData].map((el) => el[1])
            )
          : 0,
        max: data
          ? zoomMinMax(
              true,
              data?.[selectedChart as keyof IChartData].map((el) => el[1])
            )
          : 100000,
        minRange: data
          ? data?.[selectedChart as keyof IChartData][1][1] / 100
          : 1,
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

  return {
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
            return new Date(parseInt(context[0].label)).toUTCString();
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
            return data?.[selectedChart as keyof IChartData].map((el) =>
              selectedTime > time
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
};
