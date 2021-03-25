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
        ? <XAxisLineWrapper>{children}</XAxisLineWrapper>
        : <XAxisBarWrapper>{children}</XAxisBarWrapper>
  )
}

export const buildXAxisItems = (
  xAxis: IXAxis,
  step: number,
  index: number,
  children?: any,
) =>
  React.cloneElement(
    xAxis.component || <XAxisItem />,
    {
      children,
      style: {
        opacity: (index) % step ? 0 : 1
      }
    })

