import { ILegend, IConfig, IDataItem } from '../types';
import { isRichDataObject } from '../utls';

const findStackedYAxisMax = (config: IConfig, data: IDataItem[]) => {
  const parentBar = Object.entries(config).find(
    (configItem) => configItem[1][ILegend.isParent]
  );

  if (!parentBar || !parentBar[0]) {
    throw new Error('Stacked bar chart must have a parent bar.');
  }

  const parentBarKey = parentBar[0];

  const maxYAxis = Math.max(
    ...data.map((dataItem) => {
      const dataItemProperty = dataItem[parentBarKey];
      if (typeof dataItemProperty === 'undefined') return 0;
      return isRichDataObject(dataItemProperty)
        ? Number(dataItemProperty.value)
        : Number(dataItemProperty);
    })
  );

  return maxYAxis;
};

export default findStackedYAxisMax;
