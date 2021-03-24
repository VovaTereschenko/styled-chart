import React from 'react'

import { 
  SVG,
  ChartWrapper,
  ChartWithXAxisWrapper,
  ChartVisualsWrapper,
} from '../'

import { 
  IXAxis,
  IYAxis,
  IDataItem,
  IConfig,
  IDataSlice,
  ILegend,
} from '../../types'

import {
  findInnerComponentsKeys,
  useResize,
  buildYAxis,
  buildXAxis,
  isRichDataObject,
  buildPath,
} from '../../utls'

interface ILineChart {
  config: IConfig
  data: IDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
}

const fillMissingValues = (data: IDataItem[], cellsNum: number, maxY: number): IDataItem[] => {
  const missingArr = Array.from({length: cellsNum - data.length}, () =>
    ({
      empty: maxY,
    })
  )
  return [...data, ...missingArr]
}


const LineChart = ({ data, config, yAxis, xAxis }: ILineChart) => {
  const resizeDependency = undefined
  const [SVGWidth, setSVGWidth] = React.useState<number>(0)
  const [SVGHeight, setSVGHeight] = React.useState<number>(0)
  const cellsNumber = data.length
  const wrapperRef = React.useRef<SVGSVGElement>(null)


  React.useLayoutEffect(() => {
    if (wrapperRef.current) {
      const {clientWidth, clientHeight} = wrapperRef.current
      setSVGWidth(clientWidth)
      setSVGHeight(clientHeight)
    }
  }, [resizeDependency])

  useResize(() => {
    if (wrapperRef.current) {
      setSVGWidth(wrapperRef.current.clientWidth)
    }
  })

  const keys = data.map((item) => findInnerComponentsKeys(item, config))

  const uniqueKeys = keys.reduce((acum, item) => {
    const uniqueIterationKeys = item.filter(key => acum.indexOf(key) === -1)
    return [...acum, ...uniqueIterationKeys]
  }, [])

  const dataSlices = data.reduce((acum, dataItem) => {
    uniqueKeys.forEach((key) => {
      if (!acum[key]) acum[key] = []
      const dataItemProperty = dataItem[key]
  
      if (dataItemProperty) {
        const value = isRichDataObject(dataItemProperty)
          ? Number(dataItemProperty.value)
          : Number(dataItemProperty)

        acum[key].push(value)
      }
    
    })
    return acum
  }, {} as IDataSlice)

  
  const valuesArrays =  Object.entries(dataSlices).map(item => item[1])

  const arrayOfAllValues = valuesArrays.reduce((acum, item) => {
    return [...acum, ...item]
  }, [])

  const {
    maxValue = Math.max(...arrayOfAllValues),
    minValue = 0,
    valuesCount = 3,
  } = yAxis
      
  const {
    step = 1,
    cellsNum = data.length,
  } = xAxis

  if (cellsNum > data.length) {
    data = fillMissingValues(data, cellsNum, maxValue)
  }

  const yAxisValues = Array.from({length: valuesCount}, (_, i) => {
    const step = (maxValue - minValue) / (valuesCount - 1)
    if (!i) return minValue
    if (i === valuesCount) return maxValue
    return Math.round(step * i)
  }).reverse()

  return (
    <ChartWrapper>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper>
        <ChartVisualsWrapper>
          <SVG ref={wrapperRef}>
            {Object.entries(dataSlices).map(dataSlice => {
              const d = dataSlice[1].reduce((acum, item, i) => {
                const deltaValue = 50,
                  deltaSmall = deltaValue / 3,
                  deltaLarge = deltaValue / 3 * 2

                const
                  prevItem = dataSlice[1][i - 1] || 0,
                  prevIndex = i > 1 ? i - 1 : 0,
                  prevY = SVGHeight - SVGHeight/maxValue * prevItem,
                  prevX = SVGWidth/(cellsNumber - 1) * prevIndex

                const
                  x = SVGWidth/(cellsNumber - 1) * i,
                  y = SVGHeight - SVGHeight/maxValue * item,
                  delta = (x - prevX) / deltaValue

                const ponintsSlice = i === 0
                  ? `m ${x} ${y} `
                  : `c ${delta * deltaSmall} 0 ${delta * deltaLarge} ${y - prevY} ${x - prevX} ${y - prevY} ` 
                
                const lastSlice =
                  i === dataSlice[1].length - 1
                  && config[dataSlice[0]][ILegend.isFilled]
                    // We build the full chart is isFilled flag is provided
                    ? `c 0 0 ${delta * deltaLarge} 0 ${x - prevX} ${y - prevY} V ${SVGHeight} H 0`
                    : undefined

                return acum += lastSlice || ponintsSlice
              }, '')

              return buildPath(dataSlice[0], config, d)
            })}
          </SVG>
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, data, step, true)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default LineChart
