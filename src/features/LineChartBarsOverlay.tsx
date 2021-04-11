import * as React from 'react'
import {
  InvisibleBarsSection,
} from '../components'

import BasicInvisibleBar from './BasicInvisibleBar'
import ParentInvisibleBar from './ParentInvisibleBar'

import {
  IDataItem,
  IConfig,
  ITooltip,
  IDataItemProperty,
  ITooltipData,
} from '../types'

import {
  findTooltipKeys,
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

const LineChartBarsOverlay = ({
  uiniqueKeysData,
  config,
  valuesArrays,
  tooltip,
  xAxisValues,
  maxValue,
  minValue,
}: ILineChartBarsOverlay) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(null)
  const [tooltipIsOpen, toggleTooltip] = React.useState(false)
  return (
    <>
      <InvisibleBarsSection dataLength={uiniqueKeysData.length} onMouseLeave={() => { toggleTooltip(false) }}>
        {React.useMemo(() => uiniqueKeysData.map((dataItem: IDataItem, index) => {
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
              .filter(val => val && val)

          const maxPathValue = valuesEachArray.length ? Math.max(...valuesEachArray) : 0

          const children = Object.keys(dataItem).map((dataConfigKey) =>
            <BasicInvisibleBar
              key={`inner_${dataItem.dataItemUID}_${dataConfigKey}`}
              dataConfigKey={dataConfigKey}
              dataItemProp={dataItem[dataConfigKey]}
              config={config}
              innerSum={maxPathValue}
              tooltip={tooltip}
              minYValue={minValue}
            />
          )

          const tooltipData = {
            xAxisValue: xAxisValues[index],
            dataConfigKey: '',
            tooltipValues,
            barIndex: index,
            barValue: maxPathValue,
          }

          return (
            <ParentInvisibleBar
              key={dataItem.dataItemUID}
              max={maxPathValue}
              barsNum={uiniqueKeysData.length}
              maxYAxis={maxValue}
              minYAxis={minValue}
              setTooltipData={setTooltipData}
              toggleTooltip={toggleTooltip}
              tooltipData={tooltipData}
            >
              {children}
            </ParentInvisibleBar>)
        }), [uiniqueKeysData])}
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
