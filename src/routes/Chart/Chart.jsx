// Chart.jsx

import React, { useEffect, useState, useRef, useMemo } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import styles from "./Chart.module.css";
import { Link } from "react-router-dom";
import { getChart } from "../../lib/apis/chartApi";
import { useParams } from "react-router-dom";
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
} from "react-financial-charts";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import LineChartComponent from "./LineChart";
import CandleChartComponent from "./CandleChart";

export default function StockChart() {
  const stockCode = useParams().stockCode;
  const [chartData, setChartData] = useState([]);
  const [isCandle, setIsCandle] = useState(false);
  const chartContainerRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(350); // 초기값
  const colors = useMemo(() => ["#FE2F4D", "#1545FF"], []);
  const [chartColor, setChartColor] = useState(colors[0]);

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
          open: res.open !== null ? Number(res.open) : null,
          close: res.open !== null ? Number(res.close) : null,
          high: res.open !== null ? Number(res.high) : null,
          low: res.open !== null ? Number(res.low) : null,
        }));
        setChartData(data);

        // 시세 데이터 추세에 따라 라인 그래프 색상 변경
        var maxVal = data[0].close;
        var minVal = data[0].close;
        var maxDate = new Date(data[0].date);
        var minDate = new Date(data[0].date);

        data.forEach((data) => {
          if (data.close !== null && data.close > maxVal) {
            maxVal = data.close;
            maxDate = new Date(data.date);
          }
          if (data.close !== null && data.close < minVal) {
            maxVal = data.close;
            maxDate = new Date(data.date);
          }
        });

        setChartColor(maxDate > minDate ? colors[0] : colors[1]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, [stockCode, colors]);

  // useEffect(() => {
  //   joinRoom(stockCode);

  //   return () => {
  //     leaveRoom(stockCode);
  //   };
  // }, [stockCode]);

  // useEffect(() => {
  //   receiveStockPriceList(stockCode, updateChartData);
  // }, [realChartData]);

  // const updateChartData = (newData) => {
  //   setRealChartData(realChartData.concat(newData));
  // };

  // // 실시간 데이터
  // // TODO
  // // const

  useEffect(() => {
    // 차트 너비 설정
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.clientWidth);
    }
  }, [chartContainerRef.current]);

  // Line Chart (default)
  const lineChart = chartData.map((data) => {
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

  const height = 530;
  const margin = { left: 0, right: 48, top: 15, bottom: 24 };

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

  // Button
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "white",
    color: "black",
    borderColor: "black",
    borderWidth: "1px",
    borderStyle: "solid",
    minWidth: "10%",
    "&:hover": {
      backgroundColor: "#F0F0F0",
      borderColor: "black",
    },
  }));

  return (
    <div className="chart-container">
      <StyledButton
        className={styles.btn}
        size="small"
        onClick={() => setIsCandle(!isCandle)}
      >
        {isCandle ? "간단한 차트 보기" : "자세한 차트 보기"}
      </StyledButton>

      {isCandle ? (
        <CandleChartComponent
          chartContainerRef={chartContainerRef}
          height={height}
          chartWidth={chartWidth}
          margin={margin}
          data={data}
          xScale={xScale}
          displayXAccessor={displayXAccessor}
          xAccessor={xAccessor}
          xExtents={xExtents}
          barChartHeight={barChartHeight}
          barChartOrigin={barChartOrigin}
          barChartExtents={barChartExtents}
          volumeColor={volumeColor}
          volumeSeries={volumeSeries}
          chartHeight={chartHeight}
          candleChartExtents={candleChartExtents}
          pricesDisplayFormat={pricesDisplayFormat}
          ema26={ema26}
          ema12={ema12}
          openCloseColor={openCloseColor}
          yEdgeIndicator={yEdgeIndicator}
          elderRayHeight={elderRayHeight}
          elder={elder}
          timeDisplayFormat={timeDisplayFormat}
          elderRayOrigin={elderRayOrigin}
        ></CandleChartComponent>
      ) : (
        <>
          <LineChartComponent
            lineChart={lineChart}
            chartColor={chartColor}
          ></LineChartComponent>
          <div className="btn-container" style={{ textAlign: "center" }}>
            <Link
              to={`/detail/${stockCode}/chart/market/daily`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "black",
                  minWidth: "80%",
                  "&:hover": {
                    backgroundColor: "#F0F0F0",
                    borderColor: "black",
                  },
                }}
              >
                일별 & 실시간 시세
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
