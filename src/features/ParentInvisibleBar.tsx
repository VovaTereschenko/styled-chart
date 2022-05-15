import * as React from 'react';
import { InvisibleBarGroup, InvisibleBarGroupWrapper } from '../components';

import { ITooltipData } from '../types';

import { getBarHeight } from '../utls';

interface IParentBar {
  max: number;
  barsNum: number;
  maxYAxis: number;
  minYAxis: number;
  setTooltipData: React.Dispatch<ITooltipData | null>;
  toggleTooltip: React.Dispatch<boolean>;
  tooltipData?: ITooltipData;
  children?: (
    | false
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  )[];
}

const ParentInvisibleBar = ({
  max,
  barsNum,
  maxYAxis,
  minYAxis,
  setTooltipData,
  toggleTooltip,
  tooltipData,
  children,
}: IParentBar) => {
  const component = <InvisibleBarGroup>{children}</InvisibleBarGroup>;
  const height = getBarHeight(max, maxYAxis, minYAxis);
  const componentProps = {
    onMouseEnter: () => {
      tooltipData && setTooltipData(tooltipData);
      toggleTooltip(true);
    },
    style: {
      height: `${height || 30}%`,
    },
  } as {
    style: object;
    onMouseEnter: () => {};
  };

  return (
    <InvisibleBarGroupWrapper
      width={`${100 / barsNum}%`}
      onMouseEnter={() => {
        tooltipData && tooltipData.xAxisValue && setTooltipData(tooltipData);
        toggleTooltip(true);
      }}
    >
      {React.cloneElement(component, componentProps)}
    </InvisibleBarGroupWrapper>
  );
};

export default React.memo(ParentInvisibleBar);
