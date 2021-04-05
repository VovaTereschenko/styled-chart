import * as React from 'react'

import { 
  SVG,
  ChartWrapper,
  ChartWithXAxisWrapper,
  ChartVisualsWrapper,
} from '../'

import { 
  IXAxis,
  IYAxis,
  IConfig,
  ILegend,
  ITooltip,
  INotUniqueDataItem,
} from '../../types'

import {
  useResize,
  buildYAxis,
  buildXAxis,
  buildPath,
  buildGrid,
  getXAxisValues,
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
  flexure = 20,
}: ILineChart) => {
  const [SVGWidth, setSVGWidth] = React.useState<number>(0)
  const [SVGHeight, setSVGHeight] = React.useState<number>(0)
  const wrapperRef = React.useRef<SVGSVGElement>(null)

  const {
    step = 1,
    ticksNum: xAxisTicksNum = data.length,
    key: xAxisKey,
    grid: xAxisGrid,
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

  /**
   * @example [
   *    [1, 2, 3],
   *    [2, 0, 1],
   * ]
   */
  const valuesArrays =  Object.entries(dataSlices).map(item => item[1])

  /**
   * @example [
   *    1, 2, 3, 2, 0, 1,
   * ]
   */
  const arrayOfAllValues = valuesArrays.reduce((acum, item) =>
    [...acum, ...item]
  , [])

  const {
    maxValue = Math.max(...arrayOfAllValues),
    minValue = 0,
    ticksNum : yAxisTicksNum = 3,
    grid: yAxisGrid,
  } = yAxis
  
  const yAxisValues = getXAxisValues(yAxisTicksNum, maxValue, minValue)

  return (
    <ChartWrapper height={height && getDenotedHeight(height)}>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper>
        <ChartVisualsWrapper>
          {buildGrid(xAxisValues, xAxisGrid, yAxisValues, yAxisGrid)}
          <SVG ref={wrapperRef}>
            {Object.entries(dataSlices).map(dataSlice => {
              const d = dataSlice[1].reduce((acum, item, i) => {              
                const calcY = (val: number) => 
                  SVGHeight - SVGHeight/(maxValue - minValue) * (val - minValue)
          
                const
                  prevItem = dataSlice[1][i - 1] || 0,
                  prevIndex = i > 1 ? i - 1 : 0,
                  prevY = calcY(prevItem),
                  prevX = SVGWidth/(cellsNumber - 1) * prevIndex

                const
                  x = SVGWidth/(cellsNumber - 1) * i,
                  y = calcY(item)

                flexure = config[dataSlice[0]] && config[dataSlice[0]].flexure || flexure
                if (Number(flexure) >= 0 || Number(flexure) <= 100) {
                  flexure = Number(flexure)
                } else {
                  throw new Error('Flexure must be between 0 and 100')
                }

                const reservedStrokeWidth = 100

                const
                  deltaPull = 100,
                  deltaSmall = flexure,
                  deltaLarge = 100 - flexure

                const delta = (x - prevX) / deltaPull

                const ponintsSlice = i === 0
                  ? `m ${x} ${y} `
                  : `c ${delta * deltaSmall} 0 ${delta * deltaLarge} ${y - prevY} ${x - prevX} ${y - prevY} ` 
                
                const lastSlice =
                  i === dataSlice[1].length - 1
                  && config[dataSlice[0]][ILegend.isFilled]
                    // We build the full chart is isFilled flag is provided
                    ? `c ${delta * deltaSmall} 0 ${delta * deltaLarge} ${y - prevY} ${x - prevX} ${y - prevY} V ${SVGHeight + reservedStrokeWidth} H 0`
                    : undefined

                return acum += lastSlice || ponintsSlice
              }, '')

              return buildPath(
                dataSlice[0],
                config,
                d, 
              )
            })}
          </SVG>

          <LineChartBarsOverlay 
            uiniqueKeysData={uiniqueKeysData}
            config={config}
            valuesArrays={valuesArrays}
            xAxisValues={xAxisValues}
            maxValue={maxValue}
            minValue={minValue}
            tooltip={tooltip}
          />
          
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, uiniqueKeysData, step, true)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default LineChart
