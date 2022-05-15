import { INotUniqueDataItem } from '../types';

const removeExtraValues = (
  data: INotUniqueDataItem[],
  cellsNum: number
): INotUniqueDataItem[] => data.slice(data.length - cellsNum, data.length);

export default removeExtraValues;
