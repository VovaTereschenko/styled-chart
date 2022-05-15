import { IDataItem, IConfig } from '../types';
import { isRichDataObject } from '../utls';

const findInnerComponentsKeys = (dataItem: IDataItem, config: IConfig) =>
  Object.keys(dataItem).filter((key: string) => {
    if (!config[key] || config[key].isParent) return false;
    const dataItemProperty = dataItem[key];
    if (dataItemProperty) {
      const component = isRichDataObject(dataItemProperty)
        ? dataItemProperty.component
        : config[key].component;
      return Boolean(component);
    }
    return false;
  });

export default findInnerComponentsKeys;
