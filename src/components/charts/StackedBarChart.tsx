import React from 'react'

import {
  BarGroup,
  ChartWrapper,
  ChartVisualsWrapper,
  ChartWithXAxisWrapper,
  EmptyBar,
} from '../'

import {
  IYAxis,
  IXAxis,
  IConfig,
  IDataItem,
  IDataItemProperty,
  ILegend,
  IReactComponent,
  ITooltip,
  ITooltipData,
} from '../../types'

import {
  findInnerComponentsKeys,
  findTooltipKeys,
  isRichDataObject,
  findStackedYAxisMax,
  buildXAxis,
  buildYAxis,
  buildTooltip,
  removeExtraValues,
  fillMissingValues,
} from '../../utls'

interface IStackedBarChart {
  config: IConfig
  data: IDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
}

const getBarHeight = (barValue: number, maxYAxis: number) =>
  `${Number(barValue) * 100/maxYAxis}%`

const isParentBar = (dataConfigKey: string, config: IConfig) =>
  config[dataConfigKey] && config[dataConfigKey].isParent || dataConfigKey === ILegend.empty

const buildParentBar = (
  dataConfigKey: string,
  dataItem: IDataItemProperty,
  config: IConfig,
  barsNum: number,
  maxYAxis: number,
  children?: (false | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[],
  tooltipData?: ITooltipData,
  setTooltipData?: any,
  toggleTooltip?: any,
) => {
  if (isParentBar(dataConfigKey, config)) {
    const component = dataConfigKey === ILegend.empty
    ? config[dataConfigKey] && config[dataConfigKey].component || <EmptyBar />
    : isRichDataObject(dataItem)
        ? dataItem.component(children) // we take the compoent right from the data item
        : config[dataConfigKey].component // we take the component from the config
        || <BarGroup /> // or we take the default one

    const value = isRichDataObject(dataItem)
      ? dataItem.value
      : dataItem

    const componentProps = {
      onMouseOver: () =>  { tooltipData && dataConfigKey !== ILegend.empty && setTooltipData(tooltipData); toggleTooltip(true) },
      style: {
        height: getBarHeight(Number(value), maxYAxis),
        width: `${100/barsNum}%`,
      },
    } as {
      style: object,
      onMouseOver: () => {},
      children: typeof children,
    }
  
    if (!isRichDataObject(dataItem)) componentProps.children = children

    return (
      React.cloneElement(
        component,
        componentProps,
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
        height: getBarHeight(Number(value), innerSum),
      },
    }

    return React.cloneElement(
      component,
      componentProps,
    )
  }
}

const getDataItemValue = (dataItem: IDataItemProperty) =>
  isRichDataObject(dataItem)
    ? dataItem.value
    : dataItem

const StackedBarChart = ({ data, config, yAxis, xAxis, tooltip }: IStackedBarChart) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)

  const {
    maxValue = findStackedYAxisMax(config, data),
    minValue = 0,
    valuesCount = 3,
    // step: yAxisStep  = 1,
  } = yAxis
      
  const {
    step: xAxisStep = 1,
    ticksNum = data.length,
  } = xAxis

  if (ticksNum > data.length) {
    data = fillMissingValues(data, ticksNum, maxValue)
  } else if (ticksNum < data.length) {
    data = removeExtraValues(data, ticksNum)
  }

  const yAxisValues = Array.from({length: valuesCount}, (_, i) => {
    const yAxisStep = (maxValue - minValue) / (valuesCount - 1)
    if (!i) return minValue
    if (i === valuesCount) return maxValue
    return Math.round(yAxisStep * i)
  }).reverse()

  return (
    <ChartWrapper>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper onMouseLeave={() => {toggleTooltip(false)}}>
        <ChartVisualsWrapper>
          {data.map((dataItem: IDataItem, index) => {
            const innerBarsKeys = findInnerComponentsKeys(dataItem, config)
            const tooltipKeys = findTooltipKeys(dataItem, config)
            const tooltipValues = tooltipKeys.reduce((acum, key) => {
              const tooltipItemValues = {
                label: config[key].label,
                value: dataItem[key],
              }
              acum.push(tooltipItemValues)
              return acum
            }, [] as ITooltipData['tooltipValues'])

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
                {
                  dataConfigKey,
                  tooltipValues,
                  barIndex: index,
                  barValue: Number(getDataItemValue(dataItem[dataConfigKey])),
                },
                setTooltipData,
                toggleTooltip,
              ))

            return (
              <>
                {parent}
              </>
            )
          })}
          {tooltip && tooltip.isVisible && tooltipData
            && buildTooltip(
              tooltipData,
              data.length,
              maxValue,
              tooltipIsOpen,
              tooltip,
            )}
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, data, xAxisStep)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default StackedBarChart
