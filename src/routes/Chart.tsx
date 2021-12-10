import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  // series: [{
  //   name: "Desktops",
  //   data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  // }],

  // series: [{
  //   data: [{
  //            x: new Date(1538778600000),
  //            y: [6629.81, 6650.5, 6623.04, 6633.33]
  //          },
  //          {
  //            x: new Date(1538780400000),
  //            y: [6632.01, 6643.59, 6620, 6630.11]
  //          },

  // data?.map((price) => price.close),
  // data: data?.map((price) => [price.open,price.high,price.low,price.close,]),

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "light",
            },
            chart: {
              height: 300,
            },
            title: {
              text: "candleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
