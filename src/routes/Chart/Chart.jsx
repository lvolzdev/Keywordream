import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { getChart } from "../../lib/apis/chartApi";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from "react-financial-charts";

export default function StockChart() {
  const stockCode = useParams().stockCode;
  const [chartData, setChartData] = useState([]);
  const [isCandle, setIsCandle] = useState(false);
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(350); // 초기값

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await getChart(stockCode);
        const data = response.data.t8412OutBlock1.map((res) => ({
          date: `${res.date.slice(0, 4)}-${res.date.slice(
            4,
            6
          )}-${res.date.slice(6, 8)}T${res.time.slice(0, 2)}:${res.time.slice(
            2,
            4
          )}:00.000Z`,
          open: Number(res.open),
          close: Number(res.close),
          high: Number(res.high),
          low: Number(res.low),
        }));
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, [stockCode]);

  useEffect(() => {
    // 차트 너비 설정
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.clientWidth);
    }
  }, [chartContainerRef.current]);

  // Line Chart (default)
  const lineChart = chartData.map((data) => {
    // TODO
    return {
      x: data.date,
      y: data.close,
    };
  });

  // Candle Chart
  const ScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d) => new Date(d.date)
    );
  const height = 530;
  const margin = { left: 0, right: 48, top: 15, bottom: 24 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => {
      d.ema12 = c;
    })
    .accessor((d) => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor((d) => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(chartData)));
  const { data, xScale, xAccessor, displayXAccessor } =
    ScaleProvider(chartData);
  const pricesDisplayFormat = format(".2f");
  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max + 5];

  const gridHeight = height - margin.top - margin.bottom;

  const elderRayHeight = 100;
  const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
  const barChartHeight = gridHeight / 4;
  const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
  const chartHeight = gridHeight - elderRayHeight;
  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data) => {
    return data.volume;
  };

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  return (
    <div className="chart-container">
      <Button
        size="small"
        sx={{
          backgroundColor: "white",
          color: "black",
          borderColor: "black",
          minWidth: "10%",
          "&:hover": { backgroundColor: "#F0F0F0", borderColor: "black" },
        }}
        onClick={() => setIsCandle(!isCandle)}
      >
        {isCandle ? "[간단한 차트 보기]" : "[자세한 차트 보기]"}
      </Button>

      {isCandle ? (
        <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }}>
          {chartWidth && (
            <ChartCanvas
              height={height}
              ratio={3}
              width={chartWidth}
              margin={margin}
              data={data}
              displayXAccessor={displayXAccessor}
              seriesName="Data"
              xScale={xScale}
              xAccessor={xAccessor}
              xExtents={xExtents}
              zoomAnchor={lastVisibleItemBasedZoomAnchor}
            >
              <Chart
                id={2}
                height={barChartHeight}
                origin={barChartOrigin}
                yExtents={barChartExtents}
              >
                <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
              </Chart>

              <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
                <XAxis showGridLines showTickLabel={false} />
                <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                <CandlestickSeries />
                <LineSeries
                  yAccessor={ema26.accessor()}
                  strokeStyle={ema26.stroke()}
                />
                <CurrentCoordinate
                  yAccessor={ema26.accessor()}
                  fillStyle={ema26.stroke()}
                />
                <LineSeries
                  yAccessor={ema12.accessor()}
                  strokeStyle={ema12.stroke()}
                />
                <CurrentCoordinate
                  yAccessor={ema12.accessor()}
                  fillStyle={ema12.stroke()}
                />
                <MouseCoordinateY
                  rectWidth={margin.right}
                  displayFormat={pricesDisplayFormat}
                />
                <EdgeIndicator
                  itemType="last"
                  rectWidth={margin.right}
                  fill={openCloseColor}
                  lineStroke={openCloseColor}
                  displayFormat={pricesDisplayFormat}
                  yAccessor={yEdgeIndicator}
                />
                <MovingAverageTooltip
                  origin={[8, 24]}
                  options={[
                    {
                      yAccessor: ema26.accessor(),
                      type: "EMA",
                      stroke: ema26.stroke(),
                      windowSize: ema26.options().windowSize,
                    },
                    {
                      yAccessor: ema12.accessor(),
                      type: "EMA",
                      stroke: ema12.stroke(),
                      windowSize: ema12.options().windowSize,
                    },
                  ]}
                />

                <ZoomButtons />
                <OHLCTooltip origin={[8, 16]} />
              </Chart>
              <Chart
                id={4}
                height={elderRayHeight}
                yExtents={[0, elder.accessor()]}
                origin={elderRayOrigin}
                padding={{ top: 8, bottom: 8 }}
              >
                <ElderRaySeries yAccessor={elder.accessor()} />

                <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
                <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

                <MouseCoordinateX displayFormat={timeDisplayFormat} />
                <MouseCoordinateY
                  rectWidth={margin.right}
                  displayFormat={pricesDisplayFormat}
                />

                <SingleValueTooltip
                  yAccessor={elder.accessor()}
                  yLabel="Elder Ray"
                  yDisplayFormat={(d) =>
                    `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                      d.bearPower
                    )}`
                  }
                  origin={[8, 16]}
                />
              </Chart>
              <CrossHairCursor />
            </ChartCanvas>
          )}
        </div>
      ) : (
        <div>
          <p>문구</p>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: lineChart,
              },
            ]}
            options={{
              chart: {
                height: 500,
                width: "100%",
                toolbar: {
                  tools: {},
                },
                background: "transparent",
                animations: {
                  enabled: false,
                },
              },
              fill: {
                type: "solid",
              },
              stroke: {
                curve: "smooth",
                width: 2.8,
              },
              grid: {
                show: false,
              },
              xaxis: {
                type: "datetime",
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                show: false,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
