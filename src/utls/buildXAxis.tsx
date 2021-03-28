import React from 'react'

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
    buildXAxisItem(xAxis, step, index, item, item[xAxis.key]))
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
  children?: any,
) =>
  <React.Fragment key={dataItem.dataItemUID}>
    {React.cloneElement(
      xAxis.component || <XAxisItem key={index}/>,
      {
        children,
        style: {
          opacity: (index) % step ? 0 : 1
        }
      })}
  </React.Fragment>
