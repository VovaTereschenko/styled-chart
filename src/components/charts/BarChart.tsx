import React from 'react'

import {
  BarGroup,
  ChartWrapper,
  ChartVisualsWrapper,
  ChartWithXAxisWrapper,
  EmptyBar,
} from '..'

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
  INotUniqueDataItem,
} from '../../types'

import {
  findInnerComponentsKeys,
  findTooltipKeys,
  isRichDataObject,
  findStackedYAxisMax,
  findBarsYAxisMax,
  buildXAxis,
  buildYAxis,
  buildTooltip,
  getBarHeight,
  getInnerBarHeight,
  getXAxisValues,
  fillDataRelativeToXAxis,
  findParentBar,
  checkIfAllBarsHaveKeyOrEmpty,
  fillStackedBarChartWithParents,
  buildGrid,
} from '../../utls'

interface IStackedBarChart {
  config: IConfig
  data: INotUniqueDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
  height?: string | number
}

const isParentBar = (dataConfigKey: string, config: IConfig) =>
  config[dataConfigKey] && config[dataConfigKey].isParent || dataConfigKey === ILegend.empty

const buildParentBar = (
  isStackedBarChart: boolean,
  dataConfigKey: string,
  dataItem: IDataItem,
  dataItemProp: IDataItemProperty,
  config: IConfig,
  barsNum: number,
  maxYAxis: number,
  minYAxis: number,
  setTooltipData: React.Dispatch<ITooltipData | null>,
  toggleTooltip: React.Dispatch<boolean>,
  children?: (false | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[],
  tooltipData?: ITooltipData,
) => {


  if (isParentBar(dataConfigKey, config)
    || (!isStackedBarChart
      && config[dataConfigKey]
      && config[dataConfigKey].component)
  ) {

    const component = dataConfigKey === ILegend.empty
      ? config[dataConfigKey] && config[dataConfigKey].component || <EmptyBar />
      : isRichDataObject(dataItemProp)
        ? dataItemProp.component(children) // we take the compoent right from the data item
        : config[dataConfigKey] && config[dataConfigKey].component // we take the component from the config
        || <BarGroup /> // or we take the default one

    const value = isRichDataObject(dataItemProp)
      ? dataItemProp.value
      : dataItemProp

    const componentProps = {
      onMouseEnter: () =>  {
        tooltipData && dataConfigKey !== ILegend.empty && setTooltipData(tooltipData)
        toggleTooltip(true) },
      style: {
        height: `${getBarHeight(Number(value), maxYAxis, minYAxis)}%`,
        width: `${100/barsNum}%`,
      },
    } as {
      style: object,
      onMouseEnter: () => {},
      children: typeof children,
    }
  
    if (!isRichDataObject(dataItemProp)) componentProps.children = children

    return (
      <React.Fragment key={dataItem.dataItemUID}>
        {React.cloneElement(
          component,
          componentProps,
        )}
      </React.Fragment>
    )
  }
}

const buildBasicBar = (
  dataConfigKey: string,
  dataItem: IDataItem,
  dataItemProp: IDataItemProperty,
  config: IConfig,
  innerSum: number,
) =>  {
  if (config[dataConfigKey] && !config[dataConfigKey].isParent) {
    const component = isRichDataObject(dataItemProp)
      ? dataItemProp.component() // we take the compoent right from the data item
      : config[dataConfigKey].component // we take the component from the config
    || <BarGroup /> // or we take the default one

    const value = isRichDataObject(dataItemProp)
      ? dataItemProp.value
      : dataItemProp

    const componentProps = {
      style: {
        height: getInnerBarHeight(Number(value), innerSum),
      },
    }

    return (
      <React.Fragment key={`inner_${dataItem.dataItemUID}_${dataConfigKey}`}>
        {React.cloneElement(
          component,
          componentProps,
        )}
      </React.Fragment>
    )
  }
}

const getDataItemValue = (dataItem: IDataItemProperty) =>
  isRichDataObject(dataItem)
    ? dataItem.value
    : dataItem

const BarChart = ({ height, data, config, yAxis, xAxis, tooltip }: IStackedBarChart) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)
  const isStackedBarChart = Object.entries(config).map(item => item[1]).some(item => item.isParent)

  const {
    step: xAxisStep = 1,
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
  const yAxisValues = getXAxisValues(yAxisTicksNum, maxValue, minValue)

  return (
    <ChartWrapper height={height}>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper
        onMouseLeave={() => { toggleTooltip(false)}}
      >
        <ChartVisualsWrapper>
          {buildGrid(xAxisValues, xAxisGrid, yAxisValues, yAxisGrid)}
          {uiniqueKeysData.map((dataItem: IDataItem, index) => {
            const innerBarsKeys = findInnerComponentsKeys(dataItem, config)
            const tooltipKeys = findTooltipKeys(dataItem, config)
            const tooltipValues = tooltipKeys.reduce((acum, key) => {
              const tooltipItemValues = {
                label: config[key].label,
                key,
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

            const children = React.useMemo(() => Object.keys(dataItem).map((dataConfigKey) =>
              buildBasicBar(
                dataConfigKey,
                dataItem,
                dataItem[dataConfigKey],
                config,
                innerBarsSum,
              )), [])

            const parent = React.useMemo(() =>  Object.keys(dataItem).map((dataConfigKey) => 
              buildParentBar(
                isStackedBarChart,
                dataConfigKey,
                dataItem,
                dataItem[dataConfigKey],
                config,
                uiniqueKeysData.length,
                maxValue,
                minValue,
                setTooltipData,
                toggleTooltip,
                children as (false | IReactComponent)[],
                {
                  xAxisValue: xAxisValues[index],
                  dataConfigKey,
                  tooltipValues,
                  barIndex: index,
                  barValue: Number(getDataItemValue(dataItem[dataConfigKey])),
                },
              )), [])

            return parent
          })}
          {tooltip && tooltip.isVisible && tooltipData
            && buildTooltip(
              tooltipData,
              uiniqueKeysData.length,
              maxValue,
              minValue,
              tooltipIsOpen,
              tooltip,
              config,
              'isBarChart',
            )}
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, uiniqueKeysData, xAxisStep)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default BarChart
