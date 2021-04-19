import * as React from 'react'

import {
  BarGroup,
  EmptyBar,
  InvisibleBarGroupWrapper,
} from '../components'

import {
  IConfig,
  IDataItem,
  IDataItemProperty,
  ILegend,
  ITooltipData,
} from '../types'

import {
  isRichDataObject,
  getBarHeight,
} from '../utls'

interface IParentBar {
  dataConfigKey: string,
  dataItem: IDataItem,
  dataItemProp: IDataItemProperty,
  config: IConfig,
  barsNum: number,
  maxYAxis: number,
  minYAxis: number,
  setTooltipData: React.Dispatch<ITooltipData | null>,
  toggleTooltip: React.Dispatch<boolean>,
  children?: any
  tooltipData?: ITooltipData,
}

const ParentBar = ({
  dataConfigKey,
  dataItem,
  dataItemProp,
  config,
  barsNum,
  maxYAxis,
  minYAxis,
  setTooltipData,
  toggleTooltip,
  children,
  tooltipData,
}: IParentBar) => {
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
    style: {
      height: `${barHeight > 100 ? 100 : barHeight}%`,
      width: `${100}%`,
    },
  } as {
    style: object,
    children: typeof children,
  }

  if (!isRichDataObject(dataItemProp)) componentProps.children = children

  return (
    <InvisibleBarGroupWrapper
      width={`${100 / barsNum}%`}
      onMouseEnter={() => {
        tooltipData && dataConfigKey !== ILegend.empty && setTooltipData(tooltipData)
        toggleTooltip(true)
      }}
    >
      {React.cloneElement(
        component,
        componentProps,
      )}
    </InvisibleBarGroupWrapper>
  )
}

export default ParentBar
