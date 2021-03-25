import React from 'react'
import {
  isRichDataObject,
  getBarHeight,
} from '../utls'

import {
  ITooltipData,
  ITooltip,
} from '../types'

import {
  TooltipWrapper,
  TooltipList,
  TooltipListItem,
  TooltipLabel,
  TooltipValue,
} from '../components'

const buildTooltip = (
  tooltipData: ITooltipData,
  barsNum: number,
  maxYAxis: number,
  tooltipIsOpen: boolean,
  tooltipConfig: ITooltip,
) =>  {

  const children =
    <TooltipList>
      {tooltipData.tooltipValues.map((tooltipItemData) => 
        <TooltipListItem>
          <TooltipLabel>{tooltipItemData.label}</TooltipLabel>
          <TooltipValue>
            {!isRichDataObject(tooltipItemData.value)
              ? tooltipItemData.value
              : tooltipItemData.value.value}
          </TooltipValue>
        </TooltipListItem>
      )}
    </TooltipList>

  const component = tooltipConfig.component || <TooltipWrapper /> 

  const componentProps = {
    style: {
      left: `${100/barsNum * tooltipData.barIndex + 100/barsNum/2}%`,
      transform: 'translateX(-50%) translateY(-8px)',
      bottom: getBarHeight(Number(tooltipData.barValue), maxYAxis),
    } as {[key: string]: string | number},
    children,
  }

  if (!tooltipIsOpen) componentProps.style.opacity = 0 // so it can be specified by user
  return React.cloneElement(
    component,
    componentProps,
  )
}

export default buildTooltip
