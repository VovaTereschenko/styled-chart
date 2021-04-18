import * as React from 'react'

import { 
  SVG,
  ChartWrapper,
  ChartWithXAxisWrapper,
  ChartVisualsWrapper,
  EmptyAreaWrapper,
} from '../'

import { 
  IXAxis,
  IYAxis,
  IConfig,
  ITooltip,
  INotUniqueDataItem,
} from '../../types'

import {
  useResize,
  buildYAxis,
  buildXAxis,
  buildPath,
  buildPathD,
  buildGrid,
  getYAxisValues,
  fillDataRelativeToXAxis,
  buildDataSlices,
  getDenotedHeight,
} from '../../utls'

import LineChartBarsOverlay from '../../features/LineChartBarsOverlay'

interface ILineChart {
  config: IConfig
  data: INotUniqueDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
  height?: number | string
  resizeDependency?: any[]
  flexure?: number | string
}

const LineChart = ({
  data,
  config,
  yAxis,
  xAxis,
  tooltip,
  height,
  resizeDependency,
  flexure = 0,
}: ILineChart) => {
  const [SVGWidth, setSVGWidth] = React.useState<number>(0)
  const [SVGHeight, setSVGHeight] = React.useState<number>(0)
  const wrapperRef = React.useRef<HTMLElement>(null)

  const {
    step = 1,
    ticksNum: xAxisTicksNum = data.length,
    key: xAxisKey,
    grid: xAxisGrid,
    emptyArea,
  } = xAxis

  const uiniqueKeysData = fillDataRelativeToXAxis(data, xAxisTicksNum)
  const essentialWidthFactor =  uiniqueKeysData.length / xAxisTicksNum


  const cellsNumber = uiniqueKeysData.length
  const xAxisValues = uiniqueKeysData.map(dataItem => dataItem[xAxisKey])

  React.useLayoutEffect(() => {
    if (wrapperRef.current) {
      const {clientWidth, clientHeight} = wrapperRef.current
      setSVGWidth(clientWidth * essentialWidthFactor)
      setSVGHeight(clientHeight)
    }
  }, resizeDependency)

  useResize(() => {
    if (wrapperRef.current) {
      setSVGWidth(wrapperRef.current.clientWidth * essentialWidthFactor)
    }
  })

  const dataSlices = buildDataSlices(uiniqueKeysData, config)
  const valuesArrays =  Object.entries(dataSlices).map(item => item[1])
  const arrayOfAllValues = valuesArrays.reduce((acum, item) =>
    [...acum, ...item]
  , [])

  const {
    maxValue: yAxisMax = Math.max(...arrayOfAllValues),
    minValue: yAxisMin = 0,
    ticksNum : yAxisTicksNum = 3,
    grid: yAxisGrid,
  } = yAxis
  
  const yAxisValues = getYAxisValues(yAxisTicksNum, yAxisMax, yAxisMin)
  const width = SVGWidth * (data.length / cellsNumber) // SVG Should cut the extra paths

  return (
    <ChartWrapper height={height && getDenotedHeight(height)}>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper>
        <ChartVisualsWrapper ref={wrapperRef}>
          {buildGrid(xAxisValues, xAxisGrid, yAxisValues, yAxisGrid)}
          <SVG style={{width:`${width}px`}} >
            {Object.entries(dataSlices).map(dataSlice => {
              const d = buildPathD(
                dataSlice[0],
                dataSlice[1],
                config,
                SVGHeight,
                SVGWidth,
                cellsNumber,
                yAxisMax,
                yAxisMin,
                flexure,
              )
              return buildPath(
                dataSlice[0],
                config,
                d, 
              )
            })}
          </SVG>
          {emptyArea && data.length / cellsNumber < 1 && <EmptyAreaWrapper>
            {emptyArea}
          </EmptyAreaWrapper>}
          <LineChartBarsOverlay 
            uiniqueKeysData={uiniqueKeysData}
            config={config}
            valuesArrays={valuesArrays}
            xAxisValues={xAxisValues}
            maxValue={yAxisMax}
            minValue={yAxisMin}
            tooltip={tooltip}
          />
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, uiniqueKeysData, step, true)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default LineChart
