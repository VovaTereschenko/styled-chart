import React from 'react'
import {
  isRichDataObject,
  getBarHeight,
  buildTooltipTransform,
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
  isBarChart?: string | boolean,
) =>  {
  const {
    isSmartTooltipPositioning = true,
    hints,
  } = tooltip
  
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
                {hints && hints[tooltipItemData.key]}
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
  const bottom = getBarHeight(Number(tooltipData.barValue), maxYAxis, minYAxis)

  const barNumAdjustment = isBarChart ? 0 : -1
  const singleBarPersentage = 100/(barsNum + barNumAdjustment)

  const barsPersentageAdjustment = isBarChart ? singleBarPersentage : 0

  const defaultLeft = isSmartTooltipPositioning
    ? singleBarPersentage * tooltipData.barIndex
    : 100/barsNum * tooltipData.barIndex + 100/barsNum/2


  const { left, translateX, translateY, xOffset, yOffset } =
    buildTooltipTransform(
      defaultLeft,
      bottom,
      singleBarPersentage,
      barsPersentageAdjustment,
      Boolean(isBarChart),
      isSmartTooltipPositioning
    )
  
  const transform = `
    translateX(calc(${translateX}% + ${xOffset}px)) translateY(calc(${translateY}% + ${yOffset}px))
  `

  const componentProps = {
    style: {
      left: `${left}%`,
      transform,
      bottom: `${bottom}%`,
    } as {[key: string]: string | number},
    children,
  }

  if (!tooltipIsOpen) {
    componentProps.style.fontSize = 0
    componentProps.style.opacity = 0 // so it can be specified by user
    componentProps.style.maxWidth = 0
  }
  return React.cloneElement(
    component,
    componentProps,
  )
}

export default buildTooltip
