import { INotUniqueDataItem } from '../types';

const fillMissingValues = (
  data: INotUniqueDataItem[],
  cellsNum: number,
  maxY: number
): INotUniqueDataItem[] => {
  const missingArr = Array.from({ length: cellsNum - data.length }, () => ({
    empty: maxY,
  }));
  return [...data, ...missingArr];
};

export default fillMissingValues;
