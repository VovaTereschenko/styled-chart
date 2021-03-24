import React from 'react'

import {
  IYAxis,
} from '../types'

import {
  YAxisItem,
  YAxisWrapper,
} from '../components'

export const buildYAxisItems = (
  yAxis: IYAxis,
  children?: number,
) => {
  return (
    yAxis.component
      ? React.cloneElement(
        yAxis.component,
        {
          children,
        })
      : <YAxisItem>{children}</YAxisItem>
  )
}

export const buildYAxis = (
  yAxis: IYAxis,
  data: number[],
) => {
  const children = data.map((item) => buildYAxisItems(yAxis, item))
  return (
    yAxis.sectionComponent
      ? React.cloneElement(
        yAxis.sectionComponent, 
        {
          children,
        },
      )
      : <YAxisWrapper>{children}</YAxisWrapper>
  )
}
    