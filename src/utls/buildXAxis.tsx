import * as React from 'react'

import {
  IXAxis,
  IDataItem,
} from '../types'

import {
  XAxisBarWrapper,
  XAxisLineWrapper,
  XAxisItem,
} from '../components'

export const buildXAxis = (
  xAxis: IXAxis,
  data: IDataItem[],
  step: number,
  isLineChart?: boolean
) => {
  const children = data.map((item, index) =>
    buildXAxisItem(xAxis, step, index, item, data.length, isLineChart, item[xAxis.key]))
  return (
    xAxis.sectionComponent
      ? React.cloneElement(
        xAxis.sectionComponent,
        {
          children,
        },
      )
      : isLineChart
        ? <XAxisLineWrapper>{children}</XAxisLineWrapper>
        : <XAxisBarWrapper>{children}</XAxisBarWrapper>
  )
}

export const buildXAxisItem = (
  xAxis: IXAxis,
  step: number,
  index: number,
  dataItem: IDataItem,
  itemsNum: number,
  isLineChart?: boolean,
  children?: any,
) => {
  const stepCoef = Math.floor(itemsNum / step) - 1
  const removeAllAfter = Math.floor(stepCoef * step)
  const singleItemWidth = isLineChart ?  100 / (itemsNum - 1) : 100 / itemsNum

  return (
    <React.Fragment key={dataItem.dataItemUID}>
      {((index) % step || index > removeAllAfter) && index !== itemsNum - 1  ? undefined : React.cloneElement(
        xAxis.component || <XAxisItem key={index} />,
        {
          children,
          style: {
            left: `${index * singleItemWidth }%`,
            width: isLineChart ? 'auto' : `${singleItemWidth}%`,
          }
        })}
    </React.Fragment>
  )
}
