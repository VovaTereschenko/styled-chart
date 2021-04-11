import * as React from 'react'

import {
  BarGroup,
  EmptyBar,
  InvisibleBarGroupWrapper,
  BarChartBarsWrapper,
} from '../components'

import {
  IConfig,
  IDataItem,
  IDataItemProperty,
  ILegend,
  IReactComponent,
  ITooltip,
  ITooltipData,
} from '../types'

import {
  findInnerComponentsKeys,
  findTooltipKeys,
  isRichDataObject,
  buildTooltip,
  getBarHeight,
  getInnerBarHeight,
} from '../utls'

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

    const barHeight = getBarHeight(Number(value), maxYAxis, minYAxis)

    const componentProps = {
      onMouseEnter: () =>  {
        tooltipData && dataConfigKey !== ILegend.empty && setTooltipData(tooltipData)
        toggleTooltip(true) },
      style: {
        height: `${barHeight > 100 ? 100 : barHeight}%`,
        width: `${100}%`,
      },
    } as {
      style: object,
      onMouseEnter: () => {},
      children: typeof children,
    }
  
    if (!isRichDataObject(dataItemProp)) componentProps.children = children

    return (
      <InvisibleBarGroupWrapper
        key={`invisible_${dataItem.dataItemUID}_${dataConfigKey}`}
        width={ `${100/barsNum}%`}
        onMouseEnter= {() => {
          tooltipData && dataConfigKey !== ILegend.empty && setTooltipData(tooltipData)
          toggleTooltip(true) }}
      >
        {React.cloneElement(
          component,
          componentProps,
        )}
      </InvisibleBarGroupWrapper>
    )
  }
}

const buildBasicBar = (
  dataConfigKey: string,
  dataItem: IDataItem,
  dataItemProp: IDataItemProperty,
  config: IConfig,
  innerSum: number,
  minYValue: number,
) => {
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
        height: getInnerBarHeight(Number(value), innerSum, minYValue),
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

interface IBarChartBars {
  uiniqueKeysData: IDataItem[]
  config: IConfig
  xAxisValues: IDataItemProperty[]
  maxValue: number
  minValue: number
  tooltip?: ITooltip
}

const BarChartBars = ({
  uiniqueKeysData,
  config,
  xAxisValues,
  minValue,
  maxValue,
  tooltip,
}: IBarChartBars) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)
  const isStackedBarChart = Object.entries(config).map(item => item[1]).some(item => item.isParent)

  return (
    <BarChartBarsWrapper onMouseLeave={() => { toggleTooltip(false)}}>
      {React.useMemo(() => uiniqueKeysData.map((dataItem: IDataItem, index) => {
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

        const children = Object.keys(dataItem).map((dataConfigKey) =>
          buildBasicBar(
            dataConfigKey,
            dataItem,
            dataItem[dataConfigKey],
            config,
            innerBarsSum,
            minValue,
          ))

        const parent = Object.keys(dataItem).map((dataConfigKey) => 
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
          ))

        return parent
      }), [uiniqueKeysData])}
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
    </BarChartBarsWrapper>
  )
}
  

export default BarChartBars
