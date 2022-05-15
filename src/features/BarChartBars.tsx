import * as React from 'react'

import { BarChartBarsWrapper } from '../components'

import {
  IConfig,
  IDataItem,
  IDataItemProperty,
  ILegend,
  ITooltip,
  ITooltipData,
  ISelection,
} from '../types'

import {
  findInnerComponentsKeys,
  findTooltipKeys,
  isRichDataObject,
  buildTooltip,
} from '../utls'

import ParentBar from './ParentBar'
import BasicBar from './BasicBar'

const isParentBar = (dataConfigKey: string, config: IConfig) =>
  (config[dataConfigKey] && config[dataConfigKey].isParent) ||
  dataConfigKey === ILegend.empty

const getDataItemValue = (dataItem: IDataItemProperty) =>
  isRichDataObject(dataItem) ? dataItem.value : dataItem

interface IBarChartBars {
  uiniqueKeysData: IDataItem[];
  config: IConfig;
  xAxisValues: IDataItemProperty[];
  maxValue: number;
  minValue: number;
  tooltip?: ITooltip;
  selection?: ISelection;
}

const BarChartBars = ({
  uiniqueKeysData,
  config,
  xAxisValues,
  minValue,
  maxValue,
  tooltip,
  selection,
}: IBarChartBars) => {
  const [tooltipData, setTooltipData] = React.useState<ITooltipData | null>(
    null
  )
  const [selectionArray, setSelectionArray] = React.useState<number[]>([])
  const [tooltipIsOpen, toggleTooltip] = React.useState(false)
  const isStackedBarChart = Object.entries(config)
    .map((item) => item[1])
    .some((item) => item.isParent)

  const selectionInterval = selection?.selectionInterval || []
  const setSelectionInterval = selection?.setSelectionInterval  || function () { }
  const selectionHighlighter = selection?.selectionHighlighter


  const applyBarSelection = (id: number) => {
    const selectedBarsLengthMap = {
      0: () => setSelectionInterval([id]),
      1: () =>
        setSelectionInterval(
          [...selectionInterval, ...[id]].sort((a, b) => a - b)
        ),
      2: () => setSelectionInterval([id])
    }
    // @ts-ignore
    selectedBarsLengthMap[selectedBars.length]()
  }

  const handlePointerLeave = () => {
    if (!selection) return
  
    const [min, max] = getSelectionMinMax()
    if (selectionArray.length > 1) {
      setSelectionInterval([min, max])
      clearLocalSelection()
    }
  }

  const getSelectionMinMax = () => {
    const min = Math.min(...selectionArray)
    const max = Math.max(...selectionArray)
    return [min, max]
  }

  const clearLocalSelection = () => {
    setSelectionArray([])
  }

  const withSelection = Boolean(selection)

  return (
    <BarChartBarsWrapper
      onPointerLeave={() => selection ? handlePointerLeave() : undefined}
      onMouseLeave={() => {
        toggleTooltip(false)
        setTooltipData(null)
      }}
    >
      {React.useMemo(
        () =>
          uiniqueKeysData.map((dataItem: IDataItem, index) => {
            const innerBarsKeys = findInnerComponentsKeys(dataItem, config)
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

            const innerBarsSum = innerBarsKeys.reduce((acum, key) => {
              const dataItemProperty = dataItem[key]
              const value = isRichDataObject(dataItemProperty)
                ? Number(dataItemProperty.value)
                : Number(dataItemProperty)
              return acum + value
            }, 0)

            const children = Object.keys(dataItem).map((dataConfigKey) => {
              if (config[dataConfigKey] && !config[dataConfigKey].isParent) {
                return (
                  <BasicBar
                    key={`inner_${dataItem.dataItemUID}_${dataConfigKey}`}
                    dataConfigKey={dataConfigKey}
                    dataItem={dataItem}
                    dataItemProp={dataItem[dataConfigKey]}
                    config={config}
                    innerSum={innerBarsSum}
                    minYValue={minValue}
                  />
                )
              }
            })

            return Object.keys(dataItem).map((dataConfigKey) => {
              if (
                isParentBar(dataConfigKey, config) ||
                (!isStackedBarChart &&
                  config[dataConfigKey] &&
                  config[dataConfigKey].component)
              ) {
                return (
                  <ParentBar
                    withSelection={withSelection}
                    selectionHighlighter={selectionHighlighter}
                    getSelectionMinMax={getSelectionMinMax}
                    clearLocalSelection={clearLocalSelection}
                    selectionArray={selectionArray}
                    applyBarSelection={withSelection ? applyBarSelection : undefined}
                    setSelectionArray={setSelectionArray}
                    selectionInterval={selectionInterval}
                    setSelectionInterval={setSelectionInterval}
                    index={index}
                    uID={dataItem.dataItemUID}
                    key={`invisible_${dataItem.dataItemUID}_${dataConfigKey}`}
                    dataConfigKey={dataConfigKey}
                    dataItemProp={dataItem[dataConfigKey]}
                    config={config}
                    barsNum={uiniqueKeysData.length}
                    maxYAxis={maxValue}
                    minYAxis={minValue}
                    setTooltipData={setTooltipData}
                    toggleTooltip={toggleTooltip}
                    tooltipData={{
                      xAxisValue: xAxisValues[index],
                      dataConfigKey,
                      tooltipValues,
                      barIndex: index,
                      barValue: Number(
                        getDataItemValue(dataItem[dataConfigKey])
                      ),
                    }}
                  >
                    {children}
                  </ParentBar>
                )
              }
            })
          }),
        [uiniqueKeysData, minValue, maxValue, selectionArray, selection]
      )}

      {tooltip &&
        tooltip.isVisible &&
        tooltipData &&
        buildTooltip(
          tooltipData,
          uiniqueKeysData.length,
          maxValue,
          minValue,
          tooltipIsOpen,
          tooltip,
          config,
          'isBarChart'
        )}
    </BarChartBarsWrapper>
  )
}

export default BarChartBars
