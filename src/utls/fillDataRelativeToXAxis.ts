import { IDataItem, INotUniqueDataItem } from '../types'
import {
  fillMissingValues,
  removeExtraValues,
  generateUID,
} from '.'


const fillDataRelativeToXAxis = (data: INotUniqueDataItem[], xAxisTicksNum: number): IDataItem[] =>  {
  const dataCopy = [...data]
  const dataWithUniqueIDs = dataCopy.map(
    dataItem => !dataItem.dataItemUID
      ? Object.assign(dataItem, {dataItemUID: generateUID()})
      : dataItem)

  if (xAxisTicksNum > data.length) return fillMissingValues(dataWithUniqueIDs, xAxisTicksNum, 100) as IDataItem[]
  else if (xAxisTicksNum < data.length) return removeExtraValues(dataWithUniqueIDs, xAxisTicksNum) as IDataItem[]
  return dataWithUniqueIDs  as IDataItem[]
}

export default fillDataRelativeToXAxis
