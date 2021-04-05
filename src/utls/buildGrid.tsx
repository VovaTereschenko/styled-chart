import * as React from 'react'

import { isBoolean } from '.'

import {
  XGrid,
  YGrid,
} from '../components'

import {
  IXAxis,
  IYAxis,
} from '../types'

const buildGrid = (
  xTicks: any[],
  xAxisGrid: IXAxis['grid'],
  yAxisValues: number[],
  yAxisGrid: IYAxis['grid'],
  isBarChart?: string
) =>  {
  const yComponent = yAxisGrid
    && isBoolean(yAxisGrid)
    ? <YGrid /> : yAxisGrid
  const xComponent = xAxisGrid
    && isBoolean(xAxisGrid)
    ? <XGrid /> : xAxisGrid
  
  const xMap = Array.from(Array(isBarChart ? xTicks.length + 1 : xTicks.length).keys())
  const singleItemWidth = 100 / (isBarChart ? xTicks.length : xTicks.length - 1)

  return (
    <React.Fragment>
      {yComponent && xMap.map((_, index) =>
        <React.Fragment key={index}>
          {React.cloneElement(yComponent, {
            style: {
              left: `calc(${index * singleItemWidth}%)`
            } 
          })}
        </React.Fragment>
      )}
      {xComponent && yAxisValues.map((_, index) => 
        <React.Fragment key={index}>
          {React.cloneElement(xComponent, {
            style: {
              bottom: `${index * 100 / (yAxisValues.length - 1)}%`
            } 
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default buildGrid
