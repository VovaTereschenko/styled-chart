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
) =>  {
  const yComponent = yAxisGrid
    && isBoolean(yAxisGrid)
    ? <YGrid /> : yAxisGrid
  const xComponent = xAxisGrid
    && isBoolean(xAxisGrid)
    ? <XGrid /> : xAxisGrid
    
  const singleItemWidth = 100 / (xTicks.length - 1)

  return (
    <React.Fragment>
      {yComponent && xTicks.map((_, index) =>
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
