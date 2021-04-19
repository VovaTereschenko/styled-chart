import * as React from 'react'

import {
  ChartWrapper,
  ChartVisualsWrapper,
  ChartWithXAxisWrapper,
} from '..'

import {
  IYAxis,
  IXAxis,
  IConfig,
  ITooltip,
  INotUniqueDataItem,
} from '../../types'

import {
  findStackedYAxisMax,
  findBarsYAxisMax,
  buildXAxis,
  buildYAxis,
  getYAxisValues,
  fillDataRelativeToXAxis,
  findParentBar,
  checkIfAllBarsHaveKeyOrEmpty,
  fillStackedBarChartWithParents,
  buildGrid,
  getDenotedHeight,
} from '../../utls'

import BarChartBars from '../../features/BarChartBars'

interface IStackedBarChart {
  config: IConfig
  data: INotUniqueDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
  height?: string | number
}


const BarChart = ({ height, data, config, yAxis, xAxis, tooltip }: IStackedBarChart) => {
  const isStackedBarChart = Object.entries(config).map(item => item[1]).some(item => item.isParent)

  const {
    step: xAxisStep = Math.round(data.length > 10 ? data.length / 4 : 1),
    ticksNum: xAxisTicksNum = data.length,
    key: xAxisKey,
    grid: xAxisGrid,
  } = xAxis

  let uiniqueKeysData = fillDataRelativeToXAxis(data, xAxisTicksNum)

  const parentBar = findParentBar(config)
  if (parentBar && !checkIfAllBarsHaveKeyOrEmpty(uiniqueKeysData, parentBar)) {
    uiniqueKeysData = fillStackedBarChartWithParents(uiniqueKeysData, parentBar)
  }

  const {
    maxValue = isStackedBarChart ? findStackedYAxisMax(config, uiniqueKeysData) : findBarsYAxisMax(config, uiniqueKeysData),
    minValue = 0,
    ticksNum: yAxisTicksNum = 3,
    grid: yAxisGrid,
  } = yAxis
      
  const xAxisValues = data.map(dataItem => dataItem[xAxisKey])
  const yAxisValues = getYAxisValues(yAxisTicksNum, maxValue, minValue)

  return (
    <ChartWrapper height={height && getDenotedHeight(height)}>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper>
        <ChartVisualsWrapper>
          {buildGrid(xAxisValues, xAxisGrid, yAxisValues, yAxisGrid, 'isBarChart')}
          <BarChartBars 
            uiniqueKeysData={uiniqueKeysData}
            config={config}
            xAxisValues={xAxisValues}
            minValue={minValue}
            maxValue={maxValue}
            tooltip={tooltip}
          />
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, uiniqueKeysData, xAxisStep)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default BarChart
