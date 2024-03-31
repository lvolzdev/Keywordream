import React from "react";
import {
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
} from "react-financial-charts";

const CandleChartComponent = ({
  chartContainerRef,
  height,
  chartWidth,
  margin,
  data,
  xScale,
  displayXAccessor,
  xAccessor,
  xExtents,
  barChartHeight,
  barChartOrigin,
  barChartExtents,
  volumeColor,
  volumeSeries,
  chartHeight,
  candleChartExtents,
  pricesDisplayFormat,
  ema26,
  ema12,
  openCloseColor,
  yEdgeIndicator,
  elderRayHeight,
  elder,
  elderRayOrigin,
  timeDisplayFormat,
}) => {
  return (
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
  );
};

export default CandleChartComponent;
