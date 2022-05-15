import * as React from 'react'

import { BarGroup, EmptyBar, InvisibleBarGroupWrapper } from '../components'

import { IConfig, IDataItemProperty, ILegend, ITooltipData } from '../types'

import { isRichDataObject, getBarHeight } from '../utls'



interface IParentBar {
  dataConfigKey: string;
  dataItemProp: IDataItemProperty;
  config: IConfig;
  index: number;
  barsNum: number;
  selectionArray: number[];
  setSelectionArray: React.Dispatch<number[]>;
  setSelectionInterval: any;
  clearLocalSelection: () => void;
  getSelectionMinMax: () => number[];
  selectionInterval: number[];
  maxYAxis: number;
  minYAxis: number;
  uID: string;
  setTooltipData: React.Dispatch<ITooltipData | null>;
  toggleTooltip: React.Dispatch<boolean>;
  applyBarSelection?: (id: number) => void;
  selectionHighlighter?: string;
  withSelection?: boolean;
  children?: any;
  tooltipData?: ITooltipData;
}

const ParentBar = (props: IParentBar) => {
  const {
    dataConfigKey,
    dataItemProp,
    config,
    barsNum,
    maxYAxis,
    minYAxis,
    setTooltipData,
    toggleTooltip,
    children,
    tooltipData,
    setSelectionInterval,
    selectionInterval,
    withSelection,
    selectionHighlighter,
    index,
    applyBarSelection,
    clearLocalSelection,
    selectionArray,
    getSelectionMinMax,
    setSelectionArray,
  } = props

  const component =
    dataConfigKey === ILegend.empty
      ? (config[dataConfigKey] && config[dataConfigKey].component) || (
        <EmptyBar />
      )
      : isRichDataObject(dataItemProp)
        ? dataItemProp.component(children) // we take the compoent right from the data item
        : (config[dataConfigKey] && config[dataConfigKey].component) || ( // we take the component from the config
          <BarGroup />
        ) // or we take the default one

  const value = isRichDataObject(dataItemProp)
    ? dataItemProp.value
    : dataItemProp

  const barHeight = getBarHeight(Number(value), maxYAxis, minYAxis)

  const componentProps = {
    style: {
      height: `${barHeight > 100 ? 100 : barHeight}%`,
      width: `${100}%`,
    },
  } as {
    style: object;
    children: typeof children;
  }

  if (!isRichDataObject(dataItemProp)) componentProps.children = children

  const handlePointerDown = (id: number) => {
    if (!selectionArray.length) setSelectionArray([id])
  }


  const handlePointerUp = () => {
    const [min, max] = getSelectionMinMax()
    if (selectionArray.length) {
      setSelectionInterval([min, max].sort((a, b) => a - b))
    }
    clearLocalSelection()
  }


  const handlePointerOver = (id: number) => {
    if (
      selectionArray.length &&
        (id > Math.max(...selectionArray) ||
            id < Math.min(...selectionArray))
    ) {
      const selectedIds = [...selectionArray, ...[id]]
      setSelectionArray(selectedIds)
    }
  }

  const selectedByInterval = Boolean(selectionInterval?.length && (
    selectionInterval[0] <= index && selectionInterval[1] >= index
  ))

  return (
    <InvisibleBarGroupWrapper
      onClick={applyBarSelection ? () => applyBarSelection(index) : undefined}
      isSelecting={Boolean(selectionArray.length)}
      withSelection={ withSelection}
      selectionHighlighter={selectionHighlighter}
      onPointerUp={withSelection ? () => handlePointerUp() : undefined}
      onPointerDown={withSelection ? () => handlePointerDown(index)  : undefined}
      onPointerOver={withSelection ? () => handlePointerOver(index)  : undefined}
      selected={selectionArray.includes(index)}
      selectedByInterval={selectedByInterval}
      width={`${100 / barsNum}%`}
      onMouseEnter={() => {
        tooltipData &&
          dataConfigKey !== ILegend.empty &&
          setTooltipData(tooltipData)
        toggleTooltip(true)
      }}
    >
      {React.cloneElement(component, componentProps)}
    </InvisibleBarGroupWrapper>
  )
}

export default ParentBar
