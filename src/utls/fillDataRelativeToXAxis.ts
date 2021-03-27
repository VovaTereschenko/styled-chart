import { IDataItem } from '../types'
import {
  fillMissingValues,
  removeExtraValues,
  generateUID,
} from '.'


const fillDataRelativeToXAxis = (data: IDataItem[], xAxisTicksNum: number) =>  {
  const dataWithUniqueIDs = data.map(
    dataItem => !dataItem.dataItemUID
    ? Object.assign(dataItem, {dataItemUID: generateUID()})
    : dataItem)

  if (xAxisTicksNum > data.length) return fillMissingValues(dataWithUniqueIDs, xAxisTicksNum, 100)
  else if (xAxisTicksNum < data.length) removeExtraValues(dataWithUniqueIDs, xAxisTicksNum)
  return dataWithUniqueIDs
}

export default fillDataRelativeToXAxis
