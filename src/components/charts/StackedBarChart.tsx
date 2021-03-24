import React from 'react'

import {
  BarGroup,
  ChartWrapper,
  ChartVisualsWrapper,
  ChartWithXAxisWrapper,
} from '../'

import {
  IYAxis,
  IXAxis,
  IConfig,
  IDataItem,
  IDataItemProperty,
  ILegend,
  IReactComponent,
} from '../../types'

import {
  findInnerComponentsKeys,
  isRichDataObject,
  findStackedYAxisMax,
  buildXAxis,
  buildYAxis,
} from '../../utls'

interface IStackedBarChart {
  config: IConfig
  data: IDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
}

const isParentBar = (dataConfigKey: string, config: IConfig) =>
  config[dataConfigKey] && config[dataConfigKey].isParent || dataConfigKey === ILegend.empty

const buildParentBar = (
  dataConfigKey: string,
  dataItem: IDataItemProperty,
  config: IConfig,
  barsNum: number,
  maxYAxis: number,
  children?: (false | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[],
) => {
  if (isParentBar(dataConfigKey, config)) {
    const component = isRichDataObject(dataItem)
      ? dataItem.component(children) // we take the compoent right from the data item
      : config[dataConfigKey].component // we take the component from the config
    || <BarGroup /> // or we take the default one

    const value = isRichDataObject(dataItem)
      ? dataItem.value
      : dataItem

    const componentProps = {
      style: {
        height: `${Number(value) * 100/maxYAxis}%`,
        width: `${100/barsNum}%`,
      },
    } as {style: object,  children: typeof children}
  
    if (!isRichDataObject(dataItem)) componentProps.children = children

    return (
      React.cloneElement(
        component,
        componentProps
      )
    )
  }
}

const buildBasicBar = (
  dataConfigKey: string,
  dataItem: IDataItemProperty,
  config: IConfig,
  innerSum: number,
) =>  {
  if (config[dataConfigKey] && !config[dataConfigKey].isParent) {
    const component = isRichDataObject(dataItem)
      ? dataItem.component() // we take the compoent right from the data item
      : config[dataConfigKey].component // we take the component from the config
    || <BarGroup /> // or we take the default one

    const value = isRichDataObject(dataItem)
      ? dataItem.value
      : dataItem

    const componentProps = {
      style: {
        height: `${100/innerSum * Number(value)}%`
      },
    }

    return React.cloneElement(
      component,
      componentProps,
    )
  }
}

const fillMissingValues = (data: IDataItem[], cellsNum: number, maxY: number): IDataItem[] => {
  const missingArr = Array.from({length: cellsNum - data.length}, () =>
    ({
      empty: maxY
    })
  )
  return [...data, ...missingArr]
}


const StackedBarChart = ({ data, config, yAxis, xAxis }: IStackedBarChart) => {
  const maxYAxis = findStackedYAxisMax(config, data)

  const {
    maxValue = maxYAxis,
    minValue = 0,
    valuesCount = 3,
  } = yAxis
      
  const {
    step = 1,
    cellsNum = data.length,
  } = xAxis

  if (cellsNum > data.length) {
    data = fillMissingValues(data, cellsNum, maxValue)
  }

  const yAxisValues = Array.from({length: valuesCount}, (_, i) => {
    const step = (maxValue - minValue) / (valuesCount - 1)
    if (!i) return minValue
    if (i === valuesCount) return maxValue
    return Math.round(step * i)
  }).reverse()

  return (
    <ChartWrapper>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper>
        <ChartVisualsWrapper>
          {data.map((dataItem: IDataItem) => {
            const innerBarsKeys = findInnerComponentsKeys(dataItem, config)
  
            const innerBarsSum = innerBarsKeys.reduce(
              (acum, key) => {
                const dataItemProperty = dataItem[key]
                const value = isRichDataObject(dataItemProperty)
                  ? Number(dataItemProperty.value)
                  : Number(dataItemProperty)
                return acum + value
              }, 0)


            const children = Object.keys(dataItem).map((dataConfigKey) =>
              buildBasicBar(
                dataConfigKey,
                dataItem[dataConfigKey],
                config,
                innerBarsSum,
              ))

            const parent = Object.keys(dataItem).map((dataConfigKey) => 
              buildParentBar(
                dataConfigKey,
                dataItem[dataConfigKey],
                config,
                data.length,
                maxValue,
                children as (false | IReactComponent)[],
              ))

            return (
              <>
                {parent}
              </>
            )
          })}
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, data, step)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default StackedBarChart
