import React from 'react'
import {
  isRichDataObject,
  getBarHeight,
} from '../utls'

import {
  ITooltipData,
  ITooltip,
  IConfig,
} from '../types'

import {
  TooltipWrapper,
  TooltipList,
  TooltipListItem,
  TooltipLabel,
  TooltipValue,
  TooltipXAxisValue,
} from '../components'

const buildTooltip = (
  tooltipData: ITooltipData,
  barsNum: number,
  maxYAxis: number,
  minYAxis: number,
  tooltipIsOpen: boolean,
  tooltip: ITooltip,
  config: IConfig,
) =>  {
  const children =
    <>
      <TooltipList>
        {tooltipData.tooltipValues.map((tooltipItemData) => {
          const denoteAs = config[tooltipItemData.key] && config[tooltipItemData.key].denoteAs
            ? config[tooltipItemData.key].denoteAs
            : ''
          return (
            <React.Fragment key={tooltipItemData.key}>
              <TooltipListItem>
                {tooltip.hints && tooltip.hints[tooltipItemData.key]}
                <TooltipLabel>
                  {tooltipItemData.label}
                </TooltipLabel>
                <TooltipValue>
                  {!isRichDataObject(tooltipItemData.value)
                    ? `${tooltipItemData.value}${denoteAs}`
                    : `${tooltipItemData.value.value}${denoteAs}`
                  }
                </TooltipValue>
              </TooltipListItem>
            </React.Fragment>
          )
        })}
      </TooltipList>
      <TooltipXAxisValue>{tooltipData.xAxisValue}</TooltipXAxisValue>
    </>

  const component = tooltip.component || <TooltipWrapper /> 

  const componentProps = {
    style: {
      left: `${100/barsNum * tooltipData.barIndex + 100/barsNum/2}%`,
      transform: 'translateX(-50%) translateY(-8px)',
      bottom: getBarHeight(Number(tooltipData.barValue), maxYAxis, minYAxis),
    } as {[key: string]: string | number},
    children,
  }

  if (!tooltipIsOpen) {
    componentProps.style.opacity = 0 // so it can be specified by user
    componentProps.style.width = 0
    componentProps.style.fontSize = 0
  }
  return React.cloneElement(
    component,
    componentProps,
  )
}

export default buildTooltip
