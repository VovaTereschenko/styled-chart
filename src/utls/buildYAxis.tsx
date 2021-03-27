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
  val?: number,
) => {
  return (
    yAxis.component
      ? <React.Fragment key={val}>
          {React.cloneElement(
            yAxis.component,
            {
              children: val,
            }
          )}
        </React.Fragment> 
      : <YAxisItem key={val}>{val}</YAxisItem>
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
    