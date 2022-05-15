import * as React from 'react';
import {
  isRichDataObject,
  getBarHeight,
  buildTooltipTransform,
  findParentBar,
} from '../utls';

import { ITooltipData, ITooltip, IConfig } from '../types';

import {
  TooltipWrapper,
  TooltipList,
  TooltipListItem,
  TooltipLabel,
  TooltipValue,
  TooltipXAxisValue,
  TooltipParentItem,
  TooltipListItemTextContent,
} from '../components';

const buildTooltip = (
  tooltipData: ITooltipData,
  barsNum: number,
  maxYAxis: number,
  minYAxis: number,
  tooltipIsOpen: boolean,
  tooltip: ITooltip,
  config: IConfig,
  isBarChart?: string | boolean
) => {
  const { isSmartTooltipPositioning = true, hints } = tooltip;

  let tooltipValues = tooltipData.tooltipValues;
  const parentKey = findParentBar(config);
  if (parentKey && isBarChart) {
    tooltipValues = [
      ...tooltipData.tooltipValues.filter((item) => item.key !== parentKey),
    ];
  }

  const parentItem =
    parentKey && isBarChart
      ? tooltipData.tooltipValues.find((item) => item.key === parentKey)
      : undefined;

  const getDenotation = (key: string) =>
    config[key] && config[key].denoteAs ? config[key].denoteAs : '';

  const children = (
    <>
      <TooltipList>
        {parentItem && (
          <TooltipListItem>
            <TooltipParentItem>
              <TooltipLabel>{parentItem.label}</TooltipLabel>
              <TooltipValue>
                {!isRichDataObject(parentItem.value)
                  ? `${parentItem.value}${getDenotation(parentItem.key)}`
                  : `${parentItem.value.value}${getDenotation(parentItem.key)}`}
              </TooltipValue>
            </TooltipParentItem>
          </TooltipListItem>
        )}
        {tooltipValues.map((tooltipItemData) => {
          const denoteAs = getDenotation(tooltipItemData.key);
          return (
            <React.Fragment key={tooltipItemData.key}>
              <TooltipListItem>
                {hints && hints[tooltipItemData.key]}
                <TooltipListItemTextContent>
                  <TooltipLabel>{tooltipItemData.label}</TooltipLabel>
                  <TooltipValue>
                    {!isRichDataObject(tooltipItemData.value)
                      ? `${tooltipItemData.value}${denoteAs}`
                      : `${tooltipItemData.value.value}${denoteAs}`}
                  </TooltipValue>
                </TooltipListItemTextContent>
              </TooltipListItem>
            </React.Fragment>
          );
        })}
      </TooltipList>
      <TooltipXAxisValue>{tooltipData.xAxisValue}</TooltipXAxisValue>
    </>
  );

  const component = tooltip.component || <TooltipWrapper />;
  const bottom = getBarHeight(Number(tooltipData.barValue), maxYAxis, minYAxis);

  const barNumAdjustment = isBarChart ? 0 : -1;
  const singleBarPersentage = 100 / (barsNum + barNumAdjustment);

  const barsPersentageAdjustment = isBarChart ? singleBarPersentage : 0;

  const defaultLeft = isSmartTooltipPositioning
    ? singleBarPersentage * tooltipData.barIndex
    : (100 / barsNum) * tooltipData.barIndex + 100 / barsNum / 2;

  const { left, translateX, translateY, xOffset, yOffset } =
    buildTooltipTransform(
      defaultLeft,
      bottom,
      singleBarPersentage,
      barsPersentageAdjustment,
      Boolean(isBarChart),
      isSmartTooltipPositioning
    );

  const floatingBottom = bottom < 0 ? 0 : bottom > 100 ? 100 : bottom;
  const floatingTranslateY = floatingBottom === 100 ? 100 : translateY;
  const transform = `
    translateX(calc(${translateX}% + ${xOffset}px)) translateY(calc(${floatingTranslateY}% + ${yOffset}px))
  `;
  const componentProps = {
    style: {
      left: `${left}%`,
      transform,
      bottom: `${floatingBottom}%`,
    } as { [key: string]: string | number },
    children,
  };

  if (!tooltipIsOpen) {
    componentProps.style.opacity = 0;
  }
  return React.cloneElement(component, componentProps);
};

export default buildTooltip;
