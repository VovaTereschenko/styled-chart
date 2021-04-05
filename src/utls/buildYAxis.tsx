import * as React from 'react'

import {
  IYAxis,
} from '../types'

import {
  YAxisItem,
  YAxisWrapper,
} from '../components'

export const buildYAxisItems = (
  yAxis: IYAxis,
  index: number,
  val?: number,
) => {
  const resultingValue = `${val}${yAxis.denoteAs ? yAxis.denoteAs : ''}`
  return (
    yAxis.component
      ? <React.Fragment key={index}>
        {React.cloneElement(
          yAxis.component,
          {
            children: resultingValue,
          }
        )}
      </React.Fragment> 
      : <YAxisItem key={index}>{resultingValue}</YAxisItem>
  )
}

export const buildYAxis = (
  yAxis: IYAxis,
  data: number[],
) => {
  const children = data.map((item, index) => buildYAxisItems(yAxis, index, item))
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
    