import React from 'react'

import { 
  SVG,
  ChartWrapper,
  ChartWithXAxisWrapper,
  ChartVisualsWrapper,
  InvisibleBarGroup,
  InvisibleBarsSection,
  InvisibleBar,
  HintPoint,
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
  INotUniqueDataItem,
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
  getInnerBarHeight,
  getXAxisValues,
  fillDataRelativeToXAxis,
} from '../../utls'

interface ILineChart {
  config: IConfig
  data: INotUniqueDataItem[]
  yAxis: IYAxis
  xAxis: IXAxis
  tooltip?: ITooltip
  height?: number | string
  resizeDependency?: any[]
}

const buildParentBar = (
  max: number,
  barsNum: number,
  maxYAxis: number,
  minYAxis: number,
  setTooltipData: React.Dispatch<ITooltipData | null>,
  toggleTooltip: React.Dispatch<boolean>,
  dataItem: IDataItem,
  tooltipData?: ITooltipData,
  children?: (false | React.ReactElement<any, string | React.JSXElementConstructor<any>>)[],
) => {
    const component = <InvisibleBarGroup key={dataItem.dataItemUID}>{children}</InvisibleBarGroup>
    const componentProps = {
      onMouseEnter: () =>  { tooltipData && setTooltipData(tooltipData); toggleTooltip(true) },
      style: {
        height: getBarHeight(max, maxYAxis, minYAxis),
        width: `${100/barsNum}%`,
      },
    } as {
      style: object,
      onMouseEnter: () => {},
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
  dataItemProp: IDataItemProperty,
  dataItem: IDataItem,
  config: IConfig,
  innerSum: number,
  tooltip?: ITooltip,
) =>  {
  if (config[dataConfigKey]) {
    const point = tooltip && tooltip.hints && tooltip.hints[dataConfigKey] || <HintPoint />
    const component = isRichDataObject(dataItemProp)
      ? <InvisibleBar>
          {point}
          {dataItemProp.component()}
        </InvisibleBar>
      : <InvisibleBar>
          {point}
        </InvisibleBar>
    const value = isRichDataObject(dataItemProp)
      ? dataItemProp.value
      : dataItemProp

    const componentProps = {
      style: {
        height: getInnerBarHeight(Number(value), innerSum),
      },
    }
    
    return (
      <React.Fragment key={`inner_${dataItem.dataItemUID}_${dataConfigKey}`}>
        {React.cloneElement(
          component,
          componentProps,
        )}
      </React.Fragment>
    )
  }
}

const LineChart = ({ data, config, yAxis, xAxis, tooltip, height, resizeDependency }: ILineChart) => {
  const [SVGWidth, setSVGWidth] = React.useState<number>(0)
  const [SVGHeight, setSVGHeight] = React.useState<number>(0)
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)
  const cellsNumber = data.length
  const wrapperRef = React.useRef<SVGSVGElement>(null)

  const {
    step = 1,
    ticksNum: xAxisTicksNum = data.length,
    key: xAxisKey,
  } = xAxis


  const essentialWidthFactor =  data.length / xAxisTicksNum

  const uiniqueKeysData = fillDataRelativeToXAxis(data, xAxisTicksNum)


  const xAxisValues = data.map(dataItem => dataItem[xAxisKey])

  React.useLayoutEffect(() => {
    if (wrapperRef.current) {
      const {clientWidth, clientHeight} = wrapperRef.current
      setSVGWidth(clientWidth * essentialWidthFactor)
      setSVGHeight(clientHeight)
    }
  }, resizeDependency)

  useResize(() => {
    if (wrapperRef.current) {
      setSVGWidth(wrapperRef.current.clientWidth * essentialWidthFactor)
    }
  })

  const keys = uiniqueKeysData.map((item) => findInnerComponentsKeys(item, config))

  /**
   * @example {
   *    [x, y]
   * }
   */
  const uniqueKeys = keys.reduce((acum, item) => {
    const uniqueIterationKeys = item.filter(key => acum.indexOf(key) === -1)
    return [...acum, ...uniqueIterationKeys]
  }, [])

  /**
   * @example {
   *    x: [1, 2, 3],
   *    y: [2, 0, 1],
   * }
   */
  const dataSlices = uiniqueKeysData.reduce((acum, dataItem) => {
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

  /**
   * @example [
   *    [1, 2, 3],
   *    [2, 0, 1],
   * ]
   */
  const valuesArrays =  Object.entries(dataSlices).map(item => item[1])

  /**
   * @example [
   *    1, 2, 3, 2, 0, 1,
   * ]
   */
  const arrayOfAllValues = valuesArrays.reduce((acum, item) =>
    [...acum, ...item]
  , [])

  const {
    maxValue = Math.max(...arrayOfAllValues),
    minValue = 0,
    ticksNum : yAxisTicksNum = 3,
  } = yAxis
  

  const yAxisValues = getXAxisValues(yAxisTicksNum, maxValue, minValue)

  return (
    <ChartWrapper height={height}>
      {buildYAxis(yAxis, yAxisValues)}
      <ChartWithXAxisWrapper onMouseLeave={() => {toggleTooltip(false)}}>
        <ChartVisualsWrapper>
          <SVG ref={wrapperRef}>
            {Object.entries(dataSlices).map(dataSlice => {
              const d = dataSlice[1].reduce((acum, item, i) => {
                const deltaValue = 50,
                  deltaSmall = deltaValue / 3,
                  deltaLarge = deltaValue / 3 * 2
                const calcY = (val: number) => 
                  SVGHeight - SVGHeight/(maxValue - minValue) * (val - minValue)
          
                const
                  prevItem = dataSlice[1][i - 1] || 0,
                  prevIndex = i > 1 ? i - 1 : 0,
                  prevY = calcY(prevItem),
                  prevX = SVGWidth/(cellsNumber - 1) * prevIndex

                const
                  x = SVGWidth/(cellsNumber - 1) * i,
                  y = calcY(item),
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

              return buildPath(
                dataSlice[0],
                config,
                d, 
              )
            })}
          </SVG>

          <InvisibleBarsSection dataLength={data.length}>
            {uiniqueKeysData.map((dataItem: IDataItem, index) => {
              const tooltipKeys = findTooltipKeys(dataItem, config)
              const tooltipValues = tooltipKeys.reduce((acum, key) => {
                const tooltipItemValues = {
                  label: config[key].label,
                  key,
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
                  dataItem,
                  config,
                  maxPathValue,
                  tooltip,
                ))

              return buildParentBar(
                maxPathValue,
                data.length,
                maxValue,
                minValue,
                setTooltipData,
                toggleTooltip,
                dataItem,
                {
                  xAxisValue: xAxisValues[index],
                  dataConfigKey: '',
                  tooltipValues,
                  barIndex: index,
                  barValue: maxPathValue,
                },
                children as (false | IReactComponent)[],
              )
            })}
          </InvisibleBarsSection>


          {tooltip && tooltip.isVisible && tooltipData
            && buildTooltip(
              tooltipData,
              data.length,
              maxValue,
              minValue,
              tooltipIsOpen,
              tooltip,
            )}
        </ChartVisualsWrapper>
        {buildXAxis(xAxis, uiniqueKeysData, step, true)}
      </ChartWithXAxisWrapper>
    </ChartWrapper>
  )
}

export default LineChart
