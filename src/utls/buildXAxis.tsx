import React from 'react'

import {
  IXAxis,
  IDataItem,
} from '../types'

import {
  XAxisBarWrapper,
  XAxisWrapper,
  XAxisItem,
} from '../components'

export const buildXAxis = (
  xAxis: IXAxis,
  data: IDataItem[],
  step: number,
  isLineChart?: boolean
) => {
  const children = data.map((item, index) => buildXAxisItems(xAxis, step, index, item[xAxis.key]))
  return (
    xAxis.sectionComponent
      ? React.cloneElement(
        xAxis.sectionComponent, 
        {
          children,
        },
      )
      : isLineChart
        ? <XAxisWrapper>{children}</XAxisWrapper>
        : <XAxisBarWrapper>{children}</XAxisBarWrapper>
  )
}

export const buildXAxisItems = (
  xAxis: IXAxis,
  step: number,
  index: number,
  children?: any, // to pass anything to xAxis values
) =>
  xAxis.component
    ? React.cloneElement(
      xAxis.component,
      {
        children,
        style: {
          opacity: (index) % step ? 0 : 1
        }
      })
    : <XAxisItem>{children}</XAxisItem>

