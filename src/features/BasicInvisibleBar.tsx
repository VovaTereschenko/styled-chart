import * as React from 'react';
import { InvisibleBar, HintPoint } from '../components';

import { IConfig, ITooltip, IDataItemProperty } from '../types';

import { isRichDataObject, getInnerBarHeight } from '../utls';

interface IBasicBar {
  dataConfigKey: string;
  dataItemProp: IDataItemProperty;
  config: IConfig;
  innerSum: number;
  minYValue?: number;
  tooltip?: ITooltip;
}

const BasicInvisibleBar = ({
  dataConfigKey,
  dataItemProp,
  config,
  innerSum,
  minYValue,
  tooltip,
}: IBasicBar) => {
  if (config[dataConfigKey]) {
    const point = (tooltip &&
      tooltip.hints &&
      tooltip.hints[dataConfigKey]) || <HintPoint />;

    if (!dataItemProp) return <></>;

    const component = isRichDataObject(dataItemProp) ? (
      <InvisibleBar>
        {point}
        {dataItemProp.component()}
      </InvisibleBar>
    ) : (
      <InvisibleBar>{point}</InvisibleBar>
    );
    const value = isRichDataObject(dataItemProp)
      ? dataItemProp.value
      : dataItemProp;

    const componentProps = {
      style: {
        height: getInnerBarHeight(Number(value), innerSum, minYValue),
      },
    };

    return (
      <React.Fragment>
        {React.cloneElement(component, componentProps)}
      </React.Fragment>
    );
  }
  return <></>;
};

export default BasicInvisibleBar;
