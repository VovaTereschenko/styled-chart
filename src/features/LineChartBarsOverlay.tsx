import * as React from 'react'
import { 
  InvisibleBarGroup,
  InvisibleBarsSection,
  InvisibleBarGroupWrapper,
  InvisibleBar,
  HintPoint,
} from '../components'

import { 
  IDataItem,
  IConfig,
  ITooltip,
  IDataItemProperty,
  ITooltipData,
  IReactComponent,
} from '../types'

import {
  isRichDataObject,
  findTooltipKeys,
  getBarHeight,
  getInnerBarHeight,
  buildTooltip,
} from '../utls'

interface ILineChartBarsOverlay {
  uiniqueKeysData: IDataItem[]
  config: IConfig
  valuesArrays: number[][]
  xAxisValues: IDataItemProperty[]
  maxValue: number
  minValue: number
  tooltip?: ITooltip
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
  const component = <InvisibleBarGroup>{children}</InvisibleBarGroup>
  const height = getBarHeight(max, maxYAxis, minYAxis)
  const componentProps = {
    onMouseEnter: () =>  { tooltipData && setTooltipData(tooltipData); toggleTooltip(true) },
    style: {
      height: `${height || 30}%`,
     
    },
  } as {
      style: object,
      onMouseEnter: () => {},
    }

  return (
    <InvisibleBarGroupWrapper
      width={`${100/barsNum}%`}
      key={dataItem.dataItemUID}
      onMouseEnter={() =>  { tooltipData && setTooltipData(tooltipData); toggleTooltip(true) }}>
      {React.cloneElement(
        component,
        componentProps
      )}
    </InvisibleBarGroupWrapper>
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
    if (!dataItemProp) return

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

const LineChartBarsOverlay = ({
  uiniqueKeysData,
  config,
  valuesArrays,
  tooltip,
  xAxisValues,
  maxValue,
  minValue,
}:ILineChartBarsOverlay) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] =  React.useState(false)
  return (
    <>
      <InvisibleBarsSection dataLength={uiniqueKeysData.length} onMouseLeave={() => {toggleTooltip(false)}}>
        {uiniqueKeysData.map((dataItem: IDataItem, index) => {
          const tooltipKeys = findTooltipKeys(dataItem, config)
          const tooltipLabels = tooltipKeys.map(key => config[key].label)
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
              .filter(val => val && val)

          const maxPathValue = valuesEachArray.length ? Math.max(...valuesEachArray) : 0

          const children = React.useMemo(() => Object.keys(dataItem).map((dataConfigKey) =>
            buildBasicBar(
              dataConfigKey,
              dataItem[dataConfigKey],
              dataItem,
              config,
              maxPathValue,
              tooltip,
            )), [])
              
          const tooltipData = {
            xAxisValue: xAxisValues[index],
            dataConfigKey: '',
            tooltipValues,
            barIndex: index,
            barValue: maxPathValue,
          }

          return React.useMemo(() => buildParentBar(
            maxPathValue,
            uiniqueKeysData.length,
            maxValue,
            minValue,
            setTooltipData,
            toggleTooltip,
            dataItem,
            tooltipData,
            children as (false | IReactComponent)[],
          ), [uiniqueKeysData])
  
        })}
      </InvisibleBarsSection>
      {tooltip && tooltip.isVisible && tooltipData
        && buildTooltip(
          tooltipData,
          uiniqueKeysData.length,
          maxValue,
          minValue,
          tooltipIsOpen,
          tooltip,
          config,
        )}
    </>
  )
}

export default LineChartBarsOverlay
