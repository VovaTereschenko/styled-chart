import React from 'react'

import { 
  SVG,
  ChartWrapper,
  ChartWithXAxisWrapper,
  ChartVisualsWrapper,
  InvisibleBarGroup,
  InvisibleBarsSection,
  InvisibleBar,
} from '../'

import { 
  IXAxis,
  IYAxis,
  IDataItem,
  IConfig,
  IDataSlice,
  ILegend,
  ITooltip,
  IDataItemProperty,
  ITooltipData,
  IReactComponent,
} from '../../types'

import {
  findInnerComponentsKeys,
  useResize,
  buildYAxis,
  buildXAxis,
  isRichDataObject,
  buildPath,
  buildTooltip,
  findTooltipKeys,
  getBarHeight,
  fillMissingValues,
  removeExtraValues,
} from '../../utls'

interface ILineChart {
  config: IConfig
  data: IDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
}

const buildParentBar = (
  max: number,
  barsNum: number,
  maxYAxis: number,
  tooltipData?: ITooltipData,
  setTooltipData?: any,
  toggleTooltip?: any,
  children?: (false | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[],
) => {
    const component = <InvisibleBarGroup>{children}</InvisibleBarGroup>
    const componentProps = {
      onMouseOver: () =>  { console.log("yes"); tooltipData && setTooltipData(tooltipData); toggleTooltip(true) },
      style: {
        height: getBarHeight(max, maxYAxis),
        width: `${100/barsNum}%`,
      },
    } as {
      style: object,
      onMouseOver: () => {},
    }

    return (
      React.cloneElement(
        component,
        componentProps
      )
    )
}

const buildBasicBar = (
  dataConfigKey: string,
  dataItem: IDataItemProperty,
  config: IConfig,
  innerSum: number,
) =>  {
  if (config[dataConfigKey]) {
    const component = isRichDataObject(dataItem)
      ? <InvisibleBar>
            {dataItem.component()}
        </InvisibleBar>
      : <InvisibleBar />
    const value = isRichDataObject(dataItem)
      ? dataItem.value
      : dataItem

    const componentProps = {
      style: {
        height: getBarHeight(Number(value), innerSum),
      },
    }
    
    return React.cloneElement(
      component,
      componentProps,
    )
  }
}

const LineChart = ({ data, config, yAxis, xAxis, tooltip }: ILineChart) => {
  const resizeDependency = undefined
  const [SVGWidth, setSVGWidth] = React.useState<number>(0)
  const [SVGHeight, setSVGHeight] = React.useState<number>(0)
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)
  const cellsNumber = data.length
  const wrapperRef = React.useRef<SVGSVGElement>(null)

  const {
    step = 1,
    ticksNum = data.length,
  } = xAxis

  const essentialWidthFactor =  data.length / ticksNum

  if (ticksNum > data.length) {
    data = fillMissingValues(data, ticksNum, 100)
  } else if (ticksNum < data.length) {
    data = removeExtraValues(data, ticksNum)
  }



  React.useLayoutEffect(() => {
    if (wrapperRef.current) {
      const {clientWidth, clientHeight} = wrapperRef.current
      setSVGWidth(clientWidth * essentialWidthFactor)
      setSVGHeight(clientHeight)
    }
  }, [resizeDependency])

  useResize(() => {
    if (wrapperRef.current) {
      setSVGWidth(wrapperRef.current.clientWidth * essentialWidthFactor)
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
  

  const yAxisValues = Array.from({length: valuesCount}, (_, i) => {
    const step = (maxValue - minValue) / (valuesCount - 1)
    if (!i) return minValue
    if (i === valuesCount) return maxValue
    return Math.round(step * i)
  }).reverse()

  return (
    <ChartWrapper>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper onMouseLeave={() => {toggleTooltip(false)}}>
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
                    ? `c 0 0 ${delta * deltaLarge} 0 ${x - prevX} ${y - prevY} V ${SVGHeight - 1} H 0`
                    : undefined

                return acum += lastSlice || ponintsSlice
              }, '')

              return buildPath(
                dataSlice[0],
                config,
                d, 
              )
            })}
          </SVG>

          <InvisibleBarsSection widthFactor={100/data.length}>
            {data.map((dataItem: IDataItem, index) => {
              const tooltipKeys = findTooltipKeys(dataItem, config)
              const tooltipValues = tooltipKeys.reduce((acum, key) => {
                const tooltipItemValues = {
                  label: config[key].label,
                  value: dataItem[key],
                }
                acum.push(tooltipItemValues)
                return acum
              }, [] as ITooltipData['tooltipValues'])

              const valuesEachArray =
                valuesArrays
                  .map(array => array
                  .find((_, sliceIndex) => sliceIndex === index))
                  .map(val => Number(val))

              const maxPathValue = Math.max(...valuesEachArray) 
  
              const children = Object.keys(dataItem).map((dataConfigKey) =>
                buildBasicBar(
                  dataConfigKey,
                  dataItem[dataConfigKey],
                  config,
                  maxPathValue,
                ))

              return buildParentBar(
                maxPathValue,
                data.length,
                maxValue,
                {
                  dataConfigKey: '',
                  tooltipValues,
                  barIndex: index,
                  barValue: maxPathValue,
                },
                setTooltipData,
                toggleTooltip,
                children as (false | IReactComponent)[],
              )
            })}
          </InvisibleBarsSection>


          {tooltip && tooltip.isVisible && tooltipData
            && buildTooltip(
              tooltipData,
              data.length,
              maxValue,
              tooltipIsOpen,
              tooltip,
            )}
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, data, step, true)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default LineChart
